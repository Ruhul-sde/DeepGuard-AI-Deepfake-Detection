import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle, TrendingUp, Activity } from "lucide-react";

export function ThreatIndicators() {
  const threats = [
    {
      level: "LOW",
      count: 0,
      color: "text-success",
      bgColor: "bg-green-50",
      description: "No active threats detected"
    },
    {
      level: "MEDIUM",
      count: 2,
      color: "text-warning",
      bgColor: "bg-yellow-50",
      description: "Suspicious patterns identified"
    },
    {
      level: "HIGH",
      count: 0,
      color: "text-alert",
      bgColor: "bg-red-50",
      description: "Critical threats detected"
    }
  ];

  const recentAlerts = [
    {
      time: "2 hours ago",
      message: "Face swap model signature detected",
      severity: "medium"
    },
    {
      time: "5 hours ago", 
      message: "Unusual compression patterns",
      severity: "low"
    }
  ];

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4 flex items-center">
          <Shield className="text-trust mr-2 h-5 w-5" />
          Threat Intelligence
        </h3>

        {/* Threat Levels */}
        <div className="space-y-3 mb-6">
          {threats.map((threat, index) => (
            <div key={index} className={`p-3 rounded-lg ${threat.bgColor}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className={`h-4 w-4 ${threat.color}`} />
                  <span className={`font-medium ${threat.color}`}>
                    {threat.level}
                  </span>
                </div>
                <span className={`font-bold ${threat.color}`}>
                  {threat.count}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{threat.description}</p>
            </div>
          ))}
        </div>

        {/* Global Threat Level */}
        <div className="border-t pt-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Global Threat Level</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm font-medium text-success">MINIMAL</span>
            </div>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div className="bg-success h-2 rounded-full" style={{ width: '15%' }}></div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <Activity className="text-trust mr-1 h-4 w-4" />
            Recent Activity
          </h4>
          <div className="space-y-2">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-2 text-xs">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  alert.severity === 'medium' ? 'bg-warning' : 'bg-gray-400'
                }`}></div>
                <div className="flex-1">
                  <p className="text-gray-900">{alert.message}</p>
                  <p className="text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">AI Defense Systems</span>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
              <span className="text-success font-medium">ACTIVE</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}