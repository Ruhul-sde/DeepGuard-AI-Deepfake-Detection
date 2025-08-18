import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CloudUpload, Search, Loader2, Brain, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Progress } from "@/components/ui/progress";

export function UploadArea({ onAnalysisStart, onAnalysisComplete, isAnalyzing, analysisMode = 'standard' }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/quicktime', 'image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 100 * 1024 * 1024; // 100MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload MP4, AVI, MOV, JPG, PNG, or WEBP files only.",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 100MB.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const simulateProgress = () => {
    const steps = [
      { step: 'Uploading file...', progress: 20 },
      { step: 'Preprocessing data...', progress: 40 },
      { step: analysisMode === 'enhanced' ? 'Running enhanced AI models...' : 'Running analysis...', progress: 60 },
      { step: analysisMode === 'enhanced' ? 'Computing ensemble results...' : 'Computing results...', progress: 80 },
      { step: 'Finalizing analysis...', progress: 100 }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setAnalysisStep(steps[currentStep].step);
        setUploadProgress(steps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, analysisMode === 'enhanced' ? 1000 : 800);

    return interval;
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to analyze.",
        variant: "destructive",
      });
      return;
    }

    try {
      onAnalysisStart();
      setUploadProgress(0);
      setAnalysisStep('Initializing...');
      
      const progressInterval = simulateProgress();

      const formData = new FormData();
      formData.append('file', selectedFile);

      const endpoint = analysisMode === 'enhanced' ? '/api/enhanced-analysis' : '/api/analyze';
      const response = await apiRequest('POST', endpoint, formData);
      const result = await response.json();

      clearInterval(progressInterval);
      setUploadProgress(100);
      setAnalysisStep('Complete!');

      onAnalysisComplete(result);
      
      toast({
        title: "Analysis complete",
        description: `${analysisMode === 'enhanced' ? 'Enhanced AI' : 'Standard'} analysis finished. Confidence: ${result.overallConfidence}%`,
      });
      
      // Reset after a delay
      setTimeout(() => {
        setUploadProgress(0);
        setAnalysisStep('');
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "An error occurred during analysis. Please try again.",
        variant: "destructive",
      });
      console.error('Analysis error:', error);
      setUploadProgress(0);
      setAnalysisStep('');
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
          dragActive 
            ? 'border-trust bg-blue-50 scale-105' 
            : 'border-gray-300 hover:border-trust hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CloudUpload className={`mx-auto h-12 w-12 mb-4 transition-colors ${
          dragActive ? 'text-trust' : 'text-gray-400'
        }`} />
        <p className="text-gray-600 mb-2 font-medium">
          {selectedFile ? selectedFile.name : "Drop your media file here"}
        </p>
        <p className="text-sm text-gray-500">or click to browse</p>
        <p className="text-xs text-gray-400 mt-2">
          Supports: MP4, AVI, MOV, JPG, PNG, WEBP (Max 100MB)
        </p>
        
        {selectedFile && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">File Size:</span>
              <span className="font-mono">{(selectedFile.size / (1024 * 1024)).toFixed(1)} MB</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600">Type:</span>
              <span className="font-mono uppercase">{selectedFile.type.split('/')[1]}</span>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".mp4,.avi,.mov,.jpg,.jpeg,.png,.webp"
        onChange={handleFileSelect}
      />

      {/* Analysis Progress */}
      {isAnalyzing && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{analysisStep}</span>
            <span className="font-mono text-trust">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
          {analysisMode === 'enhanced' && (
            <div className="flex items-center justify-center space-x-2 text-xs text-trust">
              <Brain className="h-3 w-3 animate-pulse" />
              <span>Enhanced AI processing active</span>
            </div>
          )}
        </div>
      )}

      <Button
        onClick={handleAnalyze}
        disabled={!selectedFile || isAnalyzing}
        className={`w-full font-medium text-white transition-all duration-200 ${
          analysisMode === 'enhanced' 
            ? 'bg-gradient-to-r from-trust to-blue-700 hover:from-blue-700 hover:to-blue-800' 
            : 'bg-trust hover:bg-blue-700'
        }`}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {analysisMode === 'enhanced' ? 'Enhanced AI Processing...' : 'Analyzing...'}
          </>
        ) : (
          <>
            {analysisMode === 'enhanced' ? (
              <Brain className="mr-2 h-4 w-4" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            {analysisMode === 'enhanced' ? 'Start Enhanced Analysis' : 'Start Analysis'}
          </>
        )}
      </Button>
      
      {analysisMode === 'enhanced' && !isAnalyzing && (
        <p className="text-xs text-center text-gray-500">
          Enhanced mode uses 12 AI models for maximum accuracy
        </p>
      )}
    </div>
  );
}