import { Link } from "wouter";
import { Shield, Home } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-trust rounded-lg flex items-center justify-center mr-4">
            <Shield className="text-white h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-trust">DeepGuard</h1>
            <p className="text-sm text-gray-500">AI Deepfake Detection</p>
          </div>
        </div>
        
        <h2 className="text-6xl font-bold text-gray-900 mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <Link href="/">
          <Button className="bg-trust hover:bg-blue-700 text-white font-medium">
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}