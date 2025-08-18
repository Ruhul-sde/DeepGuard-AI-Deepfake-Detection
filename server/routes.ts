import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { insertAnalysisResultSchema } from "@shared/schema";
import { z } from "zod";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/quicktime', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only MP4, AVI, MOV, JPG, and PNG files are allowed.'));
    }
  }
});

// Simulate deepfake analysis with realistic results
function simulateAnalysis(fileName: string, fileSize: number): any {
  const isManipulated = Math.random() > 0.6; // 40% chance of manipulation
  const baseConfidence = isManipulated ? 75 + Math.random() * 20 : 85 + Math.random() * 15;
  
  const manipulationTypes = ['Face Swap', 'Entire Face Synthesis', 'Face Reenactment', 'Expression Transfer'];
  const models = ['FaceSwap v2.1', 'DeepFaceLab v3.0', 'First Order Motion v1.2', 'StyleGAN2 v2.0'];
  
  return {
    fileName,
    fileSize,
    fileDuration: "02:34",
    fileResolution: "1920x1080",
    frameRate: "29.97 fps",
    codec: "H.264",
    overallConfidence: Math.round(baseConfidence * 10) / 10,
    isManipulated,
    riskLevel: isManipulated ? (baseConfidence > 85 ? "HIGH" : "MEDIUM") : "LOW",
    manipulationType: isManipulated ? manipulationTypes[Math.floor(Math.random() * manipulationTypes.length)] : null,
    modelDetected: isManipulated ? models[Math.floor(Math.random() * models.length)] : null,
    facialAnalysis: Math.round((baseConfidence + (Math.random() - 0.5) * 10) * 10) / 10,
    audioSyncAnalysis: Math.round((baseConfidence + (Math.random() - 0.5) * 15) * 10) / 10,
    artifactsAnalysis: Math.round((baseConfidence + (Math.random() - 0.5) * 12) * 10) / 10,
    temporalAnalysis: Math.round((baseConfidence + (Math.random() - 0.5) * 8) * 10) / 10,
    facialAnomalies: isManipulated ? Math.floor(Math.random() * 100) + 20 : Math.floor(Math.random() * 10),
    skinTextureStatus: isManipulated ? "Inconsistent patterns" : "Natural patterns",
    eyeMovementStatus: isManipulated ? "Partial sync issues" : "Natural movement",
    microExpressionStatus: isManipulated ? "Unnatural patterns" : "Natural expressions",
    voiceCloningScore: Math.round((isManipulated ? 70 + Math.random() * 25 : Math.random() * 30) * 10) / 10,
    lipSyncAccuracy: Math.round((isManipulated ? 60 + Math.random() * 20 : 85 + Math.random() * 15) * 10) / 10,
    backgroundNoiseStatus: "Consistent",
    compressionArtifacts: isManipulated ? "Multiple detected" : "Normal compression",
    processingTime: `${Math.floor(Math.random() * 3) + 1}m ${Math.floor(Math.random() * 60)}s`,
    analysisSteps: [
      { step: "File uploaded and validated", timestamp: new Date(Date.now() - 180000).toLocaleTimeString(), status: "completed" },
      { step: "Preprocessing and frame extraction", timestamp: new Date(Date.now() - 165000).toLocaleTimeString(), status: "completed" },
      { step: "Neural network analysis completed", timestamp: new Date(Date.now() - 11000).toLocaleTimeString(), status: "completed" },
      { step: isManipulated ? "Manipulation detected with high confidence" : "File verified as authentic", timestamp: new Date(Date.now() - 8000).toLocaleTimeString(), status: isManipulated ? "alert" : "success" }
    ]
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Upload and analyze file
  app.post("/api/analyze", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file provided" });
      }

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      const analysisData = simulateAnalysis(req.file.originalname, req.file.size);
      
      const result = await storage.createAnalysisResult(analysisData);
      
      res.json(result);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ message: "Analysis failed" });
    }
  });

  // Get analysis result by ID
  app.get("/api/analysis/:id", async (req, res) => {
    try {
      const result = await storage.getAnalysisResult(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Analysis result not found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Get analysis error:", error);
      res.status(500).json({ message: "Failed to retrieve analysis" });
    }
  });

  // Get recent analysis results
  app.get("/api/recent-analyses", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const results = await storage.getRecentAnalysisResults(limit);
      res.json(results);
    } catch (error) {
      console.error("Get recent analyses error:", error);
      res.status(500).json({ message: "Failed to retrieve recent analyses" });
    }
  });

  // Get daily statistics
  app.get("/api/stats/daily", async (req, res) => {
    try {
      const date = req.query.date as string;
      const stats = await storage.getDailyStats(date);
      if (!stats) {
        return res.status(404).json({ message: "No statistics found for the specified date" });
      }
      res.json(stats);
    } catch (error) {
      console.error("Get daily stats error:", error);
      res.status(500).json({ message: "Failed to retrieve daily statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
