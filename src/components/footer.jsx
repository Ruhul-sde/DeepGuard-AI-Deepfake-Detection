import { Shield, Brain, Zap, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-trust rounded-lg flex items-center justify-center">
                <Shield className="text-white h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-trust">DeepGuard</span>
              <span className="text-xs bg-trust text-white px-2 py-1 rounded">AI Enhanced</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Next-generation AI-powered deepfake detection system with advanced neural networks, 
              designed to combat sophisticated misinformation and protect media authenticity.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-500">
                <Brain className="h-4 w-4 text-trust" />
                <span>12 AI Models Active</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Zap className="h-4 w-4 text-warning" />
                <span>Real-time Processing</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Shield className="h-4 w-4 text-success" />
                <span>99.2% Accuracy Rate</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Lock className="h-4 w-4 text-trust" />
                <span>Enterprise Security</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">AI Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-trust">Model Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-trust">Training Data</a></li>
              <li><a href="#" className="text-gray-600 hover:text-trust">Performance Metrics</a></li>
              <li><a href="#" className="text-gray-600 hover:text-trust">Research Papers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-trust">API Integration</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support & Security</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-trust">24/7 Technical Support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-trust">Security Guidelines</a></li>
              <li><a href="#" className="text-gray-600 hover:text-trust">System Status</a></li>
              <li><a href="#" className="text-gray-600 hover:text-trust">Compliance Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-trust">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2024 DeepGuard AI Systems. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <p>Version 2.1.4 Enhanced</p>
            <span>•</span>
            <p>ISO 27001 & SOC 2 Certified</p>
            <span>•</span>
            <p>GDPR Compliant</p>
          </div>
        </div>
      </div>
    </footer>
  );
}