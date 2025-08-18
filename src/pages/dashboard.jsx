import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { UploadArea } from "../components/upload-area";
import { AnalysisResults } from "../components/analysis-results";
import { AIInsights } from "../components/ai-insights";
import { ThreatIndicators } from "../components/threat-indicators";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../components/ui/card";
import { Shield, BarChart3, History, Brain, Zap, Activity } from "lucide-react";

export default function Dashboard() {
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisMode, setAnalysisMode] = useState('standard'); // 'standard' or 'enhanced'

  const { data: dailyStats } = useQuery({
    queryKey: ["/api/stats/daily"],
  });

  const { data: recentAnalyses } = useQuery({
    queryKey: ["/api/recent-analyses"],
  });

  const handleAnalysisComplete = (result) => {
    setCurrentAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-bg-main">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced AI Status Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Brain className="text-trust mr-3 h-6 w-6" />
                <div>
                  <p className="text-sm text-gray-600">AI Models</p>
                  <p className="text-lg font-bold">12 Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Zap className="text-warning mr-3 h-6 w-6" />
                <div>
                  <p className="text-sm text-gray-600">Processing Speed</p>
                  <p className="text-lg font-bold">2.3s avg</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Activity className="text-success mr-3 h-6 w-6" />
                <div>
                  <p className="text-sm text-gray-600">System Health</p>
                  <p className="text-lg font-bold">98.7%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Shield className="text-trust mr-3 h-6 w-6" />
                <div>
                  <p className="text-sm text-gray-600">Threat Level</p>
                  <p className="text-lg font-bold text-success">LOW</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Enhanced Upload Area */}
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="text-trust mr-2 h-5 w-5" />
                  Upload Media
                </h2>
                
                {/* Analysis Mode Selector */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Analysis Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setAnalysisMode('standard')}
                      className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                        analysisMode === 'standard' 
                          ? 'bg-trust text-white border-trust' 
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      onClick={() => setAnalysisMode('enhanced')}
                      className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                        analysisMode === 'enhanced' 
                          ? 'bg-trust text-white border-trust' 
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Enhanced AI
                    </button>
                  </div>
                </div>
                
                <UploadArea 
                  onAnalysisStart={() => setIsAnalyzing(true)}
                  onAnalysisComplete={handleAnalysisComplete}
                  isAnalyzing={isAnalyzing}
                  analysisMode={analysisMode}
                />
              </CardContent>
            </Card>

            {/* Enhanced Stats */}
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <BarChart3 className="text-trust mr-2 h-5 w-5" />
                  Today's Analytics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Files Analyzed</span>
                    <span className="font-semibold">{dailyStats?.filesAnalyzed || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Authentic</span>
                    <span className="font-semibold text-success">{dailyStats?.authentic || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Manipulated</span>
                    <span className="font-semibold text-alert">{dailyStats?.manipulated || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy Rate</span>
                    <span className="font-semibold text-trust">{dailyStats?.accuracyRate || 0}%</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">AI Confidence</span>
                      <span className="font-semibold text-trust">94.7%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Files with Enhanced Info */}
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <History className="text-trust mr-2 h-5 w-5" />
                  Recent Analysis
                </h3>
                <div className="space-y-3">
                  {recentAnalyses?.slice(0, 3).map((analysis) => (
                    <div key={analysis.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                         onClick={() => setCurrentAnalysis(analysis)}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        analysis.isManipulated ? 'bg-alert' : 'bg-success'
                      }`}>
                        <span className="text-white text-xs">
                          {analysis.isManipulated ? '⚠' : '✓'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{analysis.fileName}</p>
                        <p className="text-xs text-gray-500">
                          {analysis.isManipulated ? 'Manipulated' : 'Authentic'} • {analysis.overallConfidence}%
                        </p>
                        {analysis.aiFeatures && (
                          <p className="text-xs text-trust">AI Enhanced</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!recentAnalyses || recentAnalyses.length === 0) && (
                    <p className="text-sm text-gray-500 text-center py-4">No recent analyses</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Threat Indicators */}
            <ThreatIndicators />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {currentAnalysis ? (
              <div className="space-y-6">
                <AnalysisResults analysis={currentAnalysis} />
                {currentAnalysis.aiFeatures && (
                  <AIInsights analysis={currentAnalysis} />
                )}
              </div>
            ) : (
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-12 text-center">
                  <Shield className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Welcome to DeepGuard Enhanced AI
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Upload a video or image file to begin advanced deepfake detection analysis with our enhanced AI models.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-medium text-trust mb-1">Advanced Facial Analysis</div>
                      <div className="text-gray-600">Multi-model ensemble detection of facial inconsistencies</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-medium text-trust mb-1">Enhanced Audio Sync</div>
                      <div className="text-gray-600">Deep learning analysis of audio-visual patterns</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-medium text-trust mb-1">Temporal Consistency</div>
                      <div className="text-gray-600">Advanced frame-by-frame temporal analysis</div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center justify-center space-x-2">
                        <Brain className="text-trust h-5 w-5" />
                        <span className="text-gray-600">12 AI Models Active</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Zap className="text-warning h-5 w-5" />
                        <span className="text-gray-600">Real-time Processing</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}