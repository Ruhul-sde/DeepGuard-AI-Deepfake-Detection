import { Shield, Brain, Settings, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-trust rounded-lg flex items-center justify-center">
              <Shield className="text-white h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-trust">DeepGuard</h1>
                <Badge variant="outline" className="text-xs border-trust text-trust">
                  AI Enhanced
                </Badge>
              </div>
              <p className="text-xs text-gray-500">Advanced Deepfake Detection v2.1</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-trust font-medium border-b-2 border-trust pb-1 flex items-center">
              <Brain className="mr-1 h-4 w-4" />
              AI Analysis
            </a>
            <a href="#" className="text-gray-600 hover:text-trust transition-colors">History</a>
            <a href="#" className="text-gray-600 hover:text-trust transition-colors">Reports</a>
            <a href="#" className="text-gray-600 hover:text-trust transition-colors flex items-center">
              <Settings className="mr-1 h-4 w-4" />
              Settings
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* AI Status Indicator */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">AI Online</span>
            </div>
            
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium">Dr. Sarah Chen</div>
              <div className="text-xs text-gray-500">Senior Forensic Analyst</div>
            </div>
            <div className="w-8 h-8 bg-trust rounded-full flex items-center justify-center">
              <User className="text-white h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}