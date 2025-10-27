import React from 'react';
import './AnalysisResults.css';

const AnalysisResults = ({ data }) => {
  if (!data) return null;

  const { authenticity_analysis, risk_assessment, confidence_scores, technical_analysis } = data;

  const getRiskColor = (level) => {
    switch (level) {
      case 'HIGH':
        return '#ef4444';
      case 'MEDIUM':
        return '#f59e0b';
      case 'LOW':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getAuthenticityStatus = () => {
    if (authenticity_analysis?.is_authentic) {
      return { text: 'Likely Authentic', color: '#10b981' };
    } else {
      return { text: 'Potentially Manipulated', color: '#ef4444' };
    }
  };

  const status = getAuthenticityStatus();

  return (
    <div className="analysis-results">
      <h2 className="results-title">Analysis Results</h2>
      
      <div className="result-section authenticity-section">
        <h3>Authenticity Assessment</h3>
        <div className="status-badge" style={{ background: status.color }}>
          {status.text}
        </div>
        
        <div className="probability-grid">
          <div className="prob-card">
            <span className="prob-label">Deepfake Probability</span>
            <span className="prob-value">
              {((authenticity_analysis?.deepfake_probability || 0) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="prob-card">
            <span className="prob-label">AI Generated Probability</span>
            <span className="prob-value">
              {((authenticity_analysis?.ai_generated_probability || 0) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div className="result-section risk-section">
        <h3>Risk Assessment</h3>
        <div className="risk-level" style={{ background: getRiskColor(risk_assessment?.risk_level) }}>
          {risk_assessment?.risk_level || 'UNKNOWN'}
        </div>
        <div className="risk-score">
          Risk Score: {((risk_assessment?.risk_score || 0) * 100).toFixed(1)}%
        </div>
        {risk_assessment?.factors && risk_assessment.factors.length > 0 && (
          <div className="factors-list">
            <h4>Factors:</h4>
            <ul>
              {risk_assessment.factors.map((factor, idx) => (
                <li key={idx}>{factor}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="result-section confidence-section">
        <h3>Confidence Scores</h3>
        <div className="confidence-grid">
          <div className="confidence-item">
            <span className="confidence-label">Overall Confidence</span>
            <div className="confidence-bar">
              <div 
                className="confidence-fill"
                style={{ width: `${(confidence_scores?.overall_confidence || 0) * 100}%` }}
              ></div>
            </div>
            <span className="confidence-percent">
              {((confidence_scores?.overall_confidence || 0) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="confidence-item">
            <span className="confidence-label">Deepfake Detection</span>
            <div className="confidence-bar">
              <div 
                className="confidence-fill"
                style={{ width: `${(confidence_scores?.deepfake_confidence || 0) * 100}%` }}
              ></div>
            </div>
            <span className="confidence-percent">
              {((confidence_scores?.deepfake_confidence || 0) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {authenticity_analysis?.editing_indicators && authenticity_analysis.editing_indicators.length > 0 && (
        <div className="result-section indicators-section">
          <h3>Editing Indicators</h3>
          <ul className="indicators-list">
            {authenticity_analysis.editing_indicators.map((indicator, idx) => (
              <li key={idx} className="indicator-item">{indicator}</li>
            ))}
          </ul>
        </div>
      )}

      {technical_analysis && (
        <div className="result-section technical-section">
          <h3>Technical Details</h3>
          <div className="tech-grid">
            {Object.entries(technical_analysis).map(([key, value]) => (
              <div key={key} className="tech-item">
                <span className="tech-label">{key.replace(/_/g, ' ')}</span>
                <span className="tech-value">{typeof value === 'object' ? JSON.stringify(value) : value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
