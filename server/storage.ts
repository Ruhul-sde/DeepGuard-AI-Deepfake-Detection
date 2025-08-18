import { type User, type InsertUser, type AnalysisResult, type InsertAnalysisResult, type DailyStats, type InsertDailyStats } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult>;
  getAnalysisResult(id: string): Promise<AnalysisResult | undefined>;
  getRecentAnalysisResults(limit?: number): Promise<AnalysisResult[]>;
  
  getDailyStats(date?: string): Promise<DailyStats | undefined>;
  updateDailyStats(stats: InsertDailyStats): Promise<DailyStats>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private analysisResults: Map<string, AnalysisResult>;
  private dailyStats: Map<string, DailyStats>;

  constructor() {
    this.users = new Map();
    this.analysisResults = new Map();
    this.dailyStats = new Map();
    
    // Initialize today's stats
    const today = new Date().toISOString().split('T')[0];
    this.dailyStats.set(today, {
      id: randomUUID(),
      date: today,
      filesAnalyzed: 47,
      authentic: 32,
      manipulated: 15,
      accuracyRate: 98.3,
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAnalysisResult(insertResult: InsertAnalysisResult): Promise<AnalysisResult> {
    const id = randomUUID();
    const result: AnalysisResult = { 
      ...insertResult,
      fileDuration: insertResult.fileDuration || null,
      fileResolution: insertResult.fileResolution || null,
      frameRate: insertResult.frameRate || null,
      codec: insertResult.codec || null,
      manipulationType: insertResult.manipulationType || null,
      modelDetected: insertResult.modelDetected || null,
      facialAnomalies: insertResult.facialAnomalies || null,
      skinTextureStatus: insertResult.skinTextureStatus || null,
      eyeMovementStatus: insertResult.eyeMovementStatus || null,
      microExpressionStatus: insertResult.microExpressionStatus || null,
      voiceCloningScore: insertResult.voiceCloningScore || null,
      lipSyncAccuracy: insertResult.lipSyncAccuracy || null,
      backgroundNoiseStatus: insertResult.backgroundNoiseStatus || null,
      compressionArtifacts: insertResult.compressionArtifacts || null,
      processingTime: insertResult.processingTime || null,
      analysisSteps: Array.isArray(insertResult.analysisSteps) ? insertResult.analysisSteps : null,
      id, 
      createdAt: new Date() 
    };
    this.analysisResults.set(id, result);
    
    // Update daily stats
    const today = new Date().toISOString().split('T')[0];
    const stats = await this.getDailyStats(today);
    if (stats) {
      const filesAnalyzed = (stats.filesAnalyzed || 0) + 1;
      const manipulated = (stats.manipulated || 0) + (insertResult.isManipulated ? 1 : 0);
      const authentic = (stats.authentic || 0) + (insertResult.isManipulated ? 0 : 1);
      
      stats.filesAnalyzed = filesAnalyzed;
      stats.manipulated = manipulated;
      stats.authentic = authentic;
      stats.accuracyRate = Math.round(((authentic + manipulated) / filesAnalyzed) * 100 * 10) / 10;
    }
    
    return result;
  }

  async getAnalysisResult(id: string): Promise<AnalysisResult | undefined> {
    return this.analysisResults.get(id);
  }

  async getRecentAnalysisResults(limit: number = 10): Promise<AnalysisResult[]> {
    const results = Array.from(this.analysisResults.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
    return results;
  }

  async getDailyStats(date?: string): Promise<DailyStats | undefined> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    return this.dailyStats.get(targetDate);
  }

  async updateDailyStats(insertStats: InsertDailyStats): Promise<DailyStats> {
    const existing = this.dailyStats.get(insertStats.date);
    if (existing) {
      Object.assign(existing, {
        ...insertStats,
        filesAnalyzed: insertStats.filesAnalyzed || existing.filesAnalyzed,
        authentic: insertStats.authentic || existing.authentic,
        manipulated: insertStats.manipulated || existing.manipulated,
        accuracyRate: insertStats.accuracyRate || existing.accuracyRate
      });
      return existing;
    } else {
      const id = randomUUID();
      const stats: DailyStats = { 
        ...insertStats,
        filesAnalyzed: insertStats.filesAnalyzed || 0,
        authentic: insertStats.authentic || 0,
        manipulated: insertStats.manipulated || 0,
        accuracyRate: insertStats.accuracyRate || 0,
        id 
      };
      this.dailyStats.set(insertStats.date, stats);
      return stats;
    }
  }
}

export const storage = new MemStorage();
