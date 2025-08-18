
import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { UploadArea } from "../components/upload-area";
import { AnalysisResults } from "../components/analysis-results";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../components/ui/card";
import { Shield, BarChart3, History } from "lucide-react";

export default function Dashboard() {
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Area */}
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="text-trust mr-2 h-5 w-5" />
                  Upload Media
                </h2>
                <UploadArea 
                  onAnalysisStart={() => setIsAnalyzing(true)}
                  onAnalysisComplete={handleAnalysisComplete}
                  isAnalyzing={isAnalyzing}
                />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <BarChart3 className="text-trust mr-2 h-5 w-5" />
                  Today's Statistics
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
                </div>
              </CardContent>
            </Card>

            {/* Recent Files */}
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
                      </div>
                    </div>
                  ))}
                  {(!recentAnalyses || recentAnalyses.length === 0) && (
                    <p className="text-sm text-gray-500 text-center py-4">No recent analyses</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {currentAnalysis ? (
              <AnalysisResults analysis={currentAnalysis} />
            ) : (
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-12 text-center">
                  <Shield className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Welcome to DeepGuard
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Upload a video or image file to begin deepfake detection analysis.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-medium text-trust mb-1">Facial Analysis</div>
                      <div className="text-gray-600">Advanced detection of facial inconsistencies and artifacts</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-medium text-trust mb-1">Audio Sync</div>
                      <div className="text-gray-600">Analysis of audio-visual synchronization patterns</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-medium text-trust mb-1">Temporal Analysis</div>
                      <div className="text-gray-600">Detection of temporal inconsistencies in video frames</div>
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
