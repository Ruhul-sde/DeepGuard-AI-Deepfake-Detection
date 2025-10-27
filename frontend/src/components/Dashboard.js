import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h3 className="dashboard-title">Detection Methods</h3>
      
      <div className="method-card">
        <div className="method-icon">🔍</div>
        <h4>Deepfake Detection</h4>
        <p>Advanced neural networks analyze facial features and temporal consistency</p>
      </div>

      <div className="method-card">
        <div className="method-icon">🤖</div>
        <h4>AI Generation Detection</h4>
        <p>Identifies artifacts specific to AI-generated images using GAN analysis</p>
      </div>

      <div className="method-card">
        <div className="method-icon">🔬</div>
        <h4>Forensic Analysis</h4>
        <p>Examines compression artifacts, noise patterns, and editing indicators</p>
      </div>

      <div className="method-card">
        <div className="method-icon">📊</div>
        <h4>Metadata Extraction</h4>
        <p>Analyzes EXIF data and file properties for authenticity clues</p>
      </div>

      <div className="info-section">
        <h4>About This Tool</h4>
        <p>
          Our Media Authenticity Analyzer uses state-of-the-art machine learning 
          and forensic techniques to detect manipulated, AI-generated, and deepfake content.
        </p>
        <p className="disclaimer">
          Note: No detection system is perfect. Results should be used as indicators 
          and verified through additional means when critical.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
