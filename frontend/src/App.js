import React, { useState } from 'react';
import './App.css';
import MediaUpload from './components/MediaUpload';
import AnalysisResults from './components/AnalysisResults';
import Dashboard from './components/Dashboard';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    setLoading(false);
  };

  const handleAnalysisStart = () => {
    setLoading(true);
    setAnalysisResult(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Media Authenticity Analyzer</h1>
        <p>Advanced AI-powered detection of edited, AI-generated, and deepfake content</p>
      </header>

      <div className="app-container">
        <div className="main-content">
          <MediaUpload 
            onAnalysisStart={handleAnalysisStart}
            onAnalysisComplete={handleAnalysisComplete}
          />
          
          {loading && (
            <div className="loading-section">
              <div className="spinner"></div>
              <p>Analyzing media content...</p>
            </div>
          )}

          {analysisResult && !loading && (
            <AnalysisResults data={analysisResult} />
          )}
        </div>

        <div className="sidebar">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;