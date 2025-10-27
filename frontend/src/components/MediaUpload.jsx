import React, { useCallback, useState } from 'react';
import './MediaUpload.css';

const MediaUpload = ({ onAnalysisStart, onAnalysisComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/avi', 'video/mov'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image or video file');
      return;
    }

    // Validate file size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
      alert('File size must be less than 100MB');
      return;
    }

    setSelectedFile(file);
  };

  const analyzeMedia = async () => {
    if (!selectedFile) return;

    onAnalysisStart();
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const backendUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:8000'
        : `https://${window.location.hostname.replace('-00-', '-8000-00-')}`;
      
      const response = await fetch(`${backendUrl}/api/v1/analyze-media`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      onAnalysisComplete(result);
    } catch (error) {
      console.error('Error analyzing media:', error);
      alert('Analysis failed. Please try again.');
      onAnalysisComplete(null);
    }
  };

  return (
    <div className="media-upload">
      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          <div className="upload-icon">📁</div>
          <h3>Drag & Drop your media file</h3>
          <p>Supports: JPG, PNG, MP4, AVI, MOV (Max 100MB)</p>
          <input
            type="file"
            id="file-input"
            onChange={handleFileInput}
            accept=".jpg,.jpeg,.png,.mp4,.avi,.mov"
            style={{ display: 'none' }}
          />
          <button 
            className="browse-btn"
            onClick={() => document.getElementById('file-input').click()}
          >
            Browse Files
          </button>
        </div>
      </div>

      {selectedFile && (
        <div className="file-info">
          <div className="file-details">
            <span className="file-name">{selectedFile.name}</span>
            <span className="file-size">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>
          <button className="analyze-btn" onClick={analyzeMedia}>
            Analyze Authenticity
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;