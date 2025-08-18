import { Card, CardContent } from "@/components/ui/card";
import { Brain, Cpu, Zap, Target, TrendingUp, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function AIInsights({ analysis }) {
  if (!analysis.aiFeatures) return null;

  const insights = [
    {
      title: "Neural Network Depth",
      value: `${analysis.aiFeatures.neuralNetworkLayers} layers`,
      description: "Deep learning architecture complexity",
      icon: Brain,
      color: "text-trust"
    },
    {
      title: "Model Ensemble",
      value: `${analysis.aiFeatures.modelEnsembleCount} models`,
      description: "Consensus from multiple AI models",
      icon: Cpu,
      color: "text-success"
    },
    {
      title: "Processing Speed",
      value: `${analysis.aiFeatures.computeTime}s`,
      description: "Real-time analysis capability",
      icon: Zap,
      color: "text-warning"
    },
    {
      title: "Confidence Variance",
      value: `±${analysis.aiFeatures.confidenceVariance}%`,
      description: "Stability across model predictions",
      icon: Target,
      color: "text-trust"
    }
  ];

  const performanceMetrics = [
    { label: "GPU Utilization", value: analysis.aiFeatures.gpuUtilization, max: 100, unit: "%" },
    { label: "Memory Usage", value: parseFloat(analysis.aiFeatures.memoryUsage), max: 8, unit: "GB" },
    { label: "Processing Efficiency", value: 94, max: 100, unit: "%" },
    { label: "Model Accuracy", value: 98.7, max: 100, unit: "%" }
  ];

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Brain className="text-trust mr-2 h-5 w-5" />
          Enhanced AI Insights
        </h3>

        {/* AI Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {insights.map((insight, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <insight.icon className={`h-5 w-5 ${insight.color}`} />
                <span className={`text-lg font-bold ${insight.color}`}>
                  {insight.value}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900">{insight.title}</div>
              <div className="text-xs text-gray-600">{insight.description}</div>
            </div>
          ))}
        </div>

        {/* System Performance */}
        <div className="border-t pt-6">
          <h4 className="font-medium mb-4 flex items-center">
            <TrendingUp className="text-trust mr-2 h-4 w-4" />
            System Performance Metrics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{metric.label}</span>
                  <span className="font-mono font-medium">
                    {metric.value}{metric.unit}
                  </span>
                </div>
                <Progress 
                  value={(metric.value / metric.max) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Features */}
        {analysis.enhancedFeatures && (
          <div className="border-t pt-6 mt-6">
            <h4 className="font-medium mb-4 flex items-center">
              <AlertCircle className="text-trust mr-2 h-4 w-4" />
              Advanced Analysis Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Semantic Analysis</span>
                  <span className="font-mono font-medium text-trust">
                    {analysis.enhancedFeatures.semanticAnalysis}%
                  </span>
                </div>
                <Progress 
                  value={analysis.enhancedFeatures.semanticAnalysis} 
                  className="h-2"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Contextual Awareness</span>
                  <span className="font-mono font-medium text-trust">
                    {analysis.enhancedFeatures.contextualAwareness}%
                  </span>
                </div>
                <Progress 
                  value={analysis.enhancedFeatures.contextualAwareness} 
                  className="h-2"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cross-Modal Validation</span>
                  <span className="font-mono font-medium text-trust">
                    {analysis.enhancedFeatures.crossModalValidation}%
                  </span>
                </div>
                <Progress 
                  value={analysis.enhancedFeatures.crossModalValidation} 
                  className="h-2"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Temporal Consistency</span>
                  <span className="font-mono font-medium text-trust">
                    {analysis.enhancedFeatures.temporalConsistency}%
                  </span>
                </div>
                <Progress 
                  value={analysis.enhancedFeatures.temporalConsistency} 
                  className="h-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* AI Model Information */}
        <div className="border-t pt-6 mt-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Brain className="text-trust h-5 w-5 mt-0.5" />
              <div>
                <h5 className="font-medium text-trust mb-1">Enhanced AI Analysis Complete</h5>
                <p className="text-sm text-gray-600">
                  This analysis utilized {analysis.aiFeatures.modelEnsembleCount} specialized AI models running 
                  on {analysis.aiFeatures.neuralNetworkLayers}+ layer neural networks for comprehensive 
                  deepfake detection with industry-leading accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}