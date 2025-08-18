import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ConfidenceMeter } from "./confidence-meter";
import { 
  Microscope, Download, UserCircle, Volume2, AlertTriangle, 
  User, Bot, Brain, Zap, Activity, Shield, Eye, Clock
} from "lucide-react";
import { generateReport } from "@/lib/report-generator";

export function AnalysisResults({ analysis }) {
  const handleDownloadReport = () => {
    generateReport(analysis);
  };

  const getScoreColor = (score) => {
    if (score > 80) return 'text-alert';
    if (score > 50) return 'text-warning';
    return 'text-success';
  };

  const getScoreBg = (score) => {
    if (score > 80) return 'bg-red-100';
    if (score > 50) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Analysis Header */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Microscope className="text-trust mr-3 h-6 w-6" />
              Analysis Results: <span className="text-trust ml-2">{analysis.fileName}</span>
            </h2>
            <div className="flex items-center space-x-3">
              {analysis.aiFeatures && (
                <Badge variant="outline" className="border-trust text-trust">
                  <Brain className="mr-1 h-3 w-3" />
                  AI Enhanced
                </Badge>
              )}
              <Badge className={`text-white ${
                analysis.isManipulated ? 'bg-alert' : 'bg-success'
              }`}>
                {analysis.isManipulated ? (
                  <>
                    <AlertTriangle className="inline mr-1 h-3 w-3" />
                    MANIPULATED
                  </>
                ) : (
                  <>
                    <Shield className="inline mr-1 h-3 w-3" />
                    AUTHENTIC
                  </>
                )}
              </Badge>
              <Button 
                onClick={handleDownloadReport}
                className="bg-trust hover:bg-blue-700 text-white text-sm font-medium"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center">
                <Activity className="mr-1 h-4 w-4 text-success" />
                Analysis Complete
              </span>
              <span className="text-sm text-gray-600 flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                Processing time: {analysis.processingTime}
              </span>
            </div>
            <Progress value={100} className="h-3 mb-3" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center text-success">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Facial Analysis
              </div>
              <div className="flex items-center text-success">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Audio Consistency
              </div>
              <div className="flex items-center text-success">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Artifact Detection
              </div>
              <div className="flex items-center text-success">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Temporal Analysis
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Confidence Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Brain className="text-trust mr-2 h-5 w-5" />
              Confidence Analysis
            </h3>
            
            <ConfidenceMeter 
              confidence={analysis.overallConfidence} 
              isManipulated={analysis.isManipulated}
            />

            <div className="space-y-4 mt-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium flex items-center">
                    <Eye className="mr-1 h-4 w-4" />
                    Facial Inconsistencies
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-mono px-2 py-1 rounded ${getScoreBg(analysis.facialAnalysis)} ${getScoreColor(analysis.facialAnalysis)}`}>
                      {analysis.facialAnalysis}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={analysis.facialAnalysis} 
                  className="h-3"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium flex items-center">
                    <Volume2 className="mr-1 h-4 w-4" />
                    Audio-Visual Sync
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-mono px-2 py-1 rounded ${getScoreBg(analysis.audioSyncAnalysis)} ${getScoreColor(analysis.audioSyncAnalysis)}`}>
                      {analysis.audioSyncAnalysis}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={analysis.audioSyncAnalysis} 
                  className="h-3"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium flex items-center">
                    <Zap className="mr-1 h-4 w-4" />
                    Compression Artifacts
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-mono px-2 py-1 rounded ${getScoreBg(analysis.artifactsAnalysis)} ${getScoreColor(analysis.artifactsAnalysis)}`}>
                      {analysis.artifactsAnalysis}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={analysis.artifactsAnalysis} 
                  className="h-3"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium flex items-center">
                    <Activity className="mr-1 h-4 w-4" />
                    Temporal Inconsistencies
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-mono px-2 py-1 rounded ${getScoreBg(analysis.temporalAnalysis)} ${getScoreColor(analysis.temporalAnalysis)}`}>
                      {analysis.temporalAnalysis}%
                    </span>
                  </div>
                </div>
                <Progress 
                  value={analysis.temporalAnalysis} 
                  className="h-3"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Key Metrics */}
        <div className="space-y-4">
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Risk Level</p>
                  <p className={`text-2xl font-bold ${
                    analysis.riskLevel === 'HIGH' ? 'text-alert' : 
                    analysis.riskLevel === 'MEDIUM' ? 'text-warning' : 'text-success'
                  }`}>
                    {analysis.riskLevel}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  analysis.riskLevel === 'HIGH' ? 'bg-red-100' : 
                  analysis.riskLevel === 'MEDIUM' ? 'bg-yellow-100' : 'bg-green-100'
                }`}>
                  <AlertTriangle className={`h-8 w-8 ${
                    analysis.riskLevel === 'HIGH' ? 'text-alert' : 
                    analysis.riskLevel === 'MEDIUM' ? 'text-warning' : 'text-success'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Manipulation Type</p>
                  <p className="text-lg font-bold">{analysis.manipulationType || 'None Detected'}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-100">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">AI Model Detected</p>
                  <p className="text-lg font-bold font-mono text-trust">{analysis.modelDetected || 'N/A'}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100">
                  <Bot className="h-8 w-8 text-trust" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Detailed Analysis Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Enhanced Facial Analysis */}
        <Card className="shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <UserCircle className="text-trust mr-2 h-5 w-5" />
              Facial Analysis
            </h3>
            
            <div className="relative mb-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Analysis subject" 
                className="w-full h-48 object-cover rounded-lg"
              />
              
              {analysis.isManipulated && (
                <div className="absolute inset-0 rounded-lg">
                  <div className="absolute top-12 left-20 w-16 h-20 border-2 border-alert rounded animate-pulse"></div>
                  <div className="absolute top-16 right-16 w-12 h-16 border-2 border-warning rounded animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 bg-alert text-white px-2 py-1 rounded text-xs">
                    Anomalies Detected
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Facial Landmarks</span>
                <span className={`text-sm font-medium ${
                  analysis.facialAnomalies && analysis.facialAnomalies > 50 ? 'text-alert' : 'text-success'
                }`}>
                  {analysis.facialAnomalies ? `${analysis.facialAnomalies} anomalies` : 'Normal patterns'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Skin Texture Analysis</span>
                <span className={`text-sm font-medium ${
                  analysis.skinTextureStatus?.includes('Inconsistent') ? 'text-alert' : 'text-success'
                }`}>
                  {analysis.skinTextureStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Eye Movement Tracking</span>
                <span className={`text-sm font-medium ${
                  analysis.eyeMovementStatus?.includes('issues') ? 'text-warning' : 'text-success'
                }`}>
                  {analysis.eyeMovementStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Micro-expressions</span>
                <span className={`text-sm font-medium ${
                  analysis.microExpressionStatus?.includes('Unnatural') ? 'text-alert' : 'text-success'
                }`}>
                  {analysis.microExpressionStatus}
                </span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4 text-trust border-trust hover:bg-blue-50">
              <Eye className="mr-2 h-4 w-4" />
              View Detailed Facial Map
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Audio Analysis */}
        <Card className="shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Volume2 className="text-trust mr-2 h-5 w-5" />
              Audio Analysis
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-end justify-center space-x-1 h-24">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-1 transition-all duration-300 ${
                      Math.random() > 0.7 ? 'bg-alert' : 
                      Math.random() > 0.5 ? 'bg-warning' : 'bg-trust'
                    }`}
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-center space-x-4 text-xs text-gray-500 mt-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-alert rounded mr-1"></div>
                  Suspicious
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-warning rounded mr-1"></div>
                  Inconsistent
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-trust rounded mr-1"></div>
                  Normal
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Voice Cloning Detection</span>
                <span className={`text-sm font-medium ${
                  analysis.voiceCloningScore && analysis.voiceCloningScore > 70 ? 'text-alert' : 'text-success'
                }`}>
                  {analysis.voiceCloningScore ? `${analysis.voiceCloningScore}% synthetic` : 'Natural voice'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Lip-Sync Accuracy</span>
                <span className={`text-sm font-medium ${
                  analysis.lipSyncAccuracy && analysis.lipSyncAccuracy < 80 ? 'text-warning' : 'text-success'
                }`}>
                  {analysis.lipSyncAccuracy ? `${analysis.lipSyncAccuracy}% accuracy` : 'Perfect sync'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Background Noise</span>
                <span className="text-sm font-medium text-success">{analysis.backgroundNoiseStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Compression Artifacts</span>
                <span className={`text-sm font-medium ${
                  analysis.compressionArtifacts?.includes('Multiple') ? 'text-alert' : 'text-success'
                }`}>
                  {analysis.compressionArtifacts}
                </span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4 text-trust border-trust hover:bg-blue-50">
              <Volume2 className="mr-2 h-4 w-4" />
              Play Audio Segments
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Technical Details */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Bot className="text-trust mr-2 h-5 w-5" />
            Technical Analysis Report
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-trust">File Properties</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">File Size:</span>
                  <span className="font-mono">{(analysis.fileSize / (1024 * 1024)).toFixed(1)} MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-mono">{analysis.fileDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Resolution:</span>
                  <span className="font-mono">{analysis.fileResolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frame Rate:</span>
                  <span className="font-mono">{analysis.frameRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Codec:</span>
                  <span className="font-mono">{analysis.codec}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-trust">Analysis Timeline</h4>
              <div className="space-y-3">
                {analysis.analysisSteps?.map((step, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      step.status === 'completed' ? 'bg-success' : 
                      step.status === 'alert' ? 'bg-alert' : 'bg-trust'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium">{step.step}</p>
                      <p className="text-xs text-gray-500">{step.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-trust">System Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Analysis ID:</span>
                  <span className="font-mono text-xs">{analysis.id?.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timestamp:</span>
                  <span className="font-mono text-xs">{new Date(analysis.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <span className="font-mono">DeepGuard v2.1.4</span>
                </div>
                {analysis.aiFeatures && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">AI Models:</span>
                      <span className="font-mono">{analysis.aiFeatures.modelEnsembleCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Neural Layers:</span>
                      <span className="font-mono">{analysis.aiFeatures.neuralNetworkLayers}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}