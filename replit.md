# Media Authenticity Analyzer

## Overview
A full-stack web application that detects deepfakes, AI-generated media, and edited content using machine learning and forensic analysis. Built with FastAPI backend and React/Vite frontend.

**Current State**: Fully functional with stub ML implementations for demonstration purposes. Both frontend and backend are running successfully.

## Recent Changes (October 27, 2025)
- Removed heavy ML dependencies (TensorFlow, PyTorch) and replaced with stub implementations
- Fixed OpenCV dependency issues by using opencv-python-headless
- Configured PYTHONPATH to resolve ml_models import issues
- Created missing utility files (metadata_extractor.py, video_processor.py)
- Configured workflows for frontend (port 5000) and backend (port 8000)
- Set up deployment configuration for VM deployment

## Project Architecture

### Backend (FastAPI)
- **Location**: `backend/`
- **Port**: 8000 (development), 5000 (production)
- **Framework**: FastAPI with async support
- **Key Components**:
  - `app/main.py`: Main application entry point with CORS configuration
  - `app/api/endpoints/analysis.py`: Analysis endpoints for media upload and processing
  - `app/services/analysis_service.py`: Core analysis service integrating ML models
  - `app/utils/`: Utility modules for metadata extraction and video processing
  - `ml_models/`: ML model implementations (deepfake, AI-generated, forensics)

### Frontend (React + Vite)
- **Location**: `frontend/`
- **Port**: 5000 (development and production)
- **Framework**: React 18 with Vite
- **Key Components**:
  - `src/App.jsx`: Main application component with routing
  - `src/components/MediaUpload.jsx`: Drag-and-drop file upload interface
  - `src/components/AnalysisResults.jsx`: Display analysis results
  - `src/components/Dashboard.jsx`: Main dashboard component

### ML Models (Stub Implementations)
- **Location**: `ml_models/`
- **Models**:
  - `deepfake_detector.py`: Deepfake detection using facial features
  - `ai_generated_detector.py`: AI-generated content detection
  - `image_forensics.py`: Image manipulation detection (ELA, noise analysis)
  - `metadata_extractor.py`: Extract EXIF and metadata
  - `video_processor.py`: Video frame extraction and processing

**Note**: ML models currently use stub implementations that return mock data for demonstration. In production, these would use actual trained models with TensorFlow/PyTorch.

## Dependencies

### Backend
- FastAPI
- Uvicorn
- OpenCV (headless version)
- Pillow
- NumPy (pinned to <2.0.0 for compatibility)
- python-multipart

### Frontend
- React 18
- Vite
- Axios
- React Router DOM

## Development Workflow

### Starting the Application
Both workflows are configured and start automatically:
- **Frontend**: Runs on port 5000 using `npm run dev`
- **Backend**: Runs on port 8000 using uvicorn with auto-reload

### Environment Variables
- `PYTHONPATH=/home/runner/workspace` - Required for ml_models imports
- Backend binds to localhost:8000 in development
- Frontend uses environment-based backend URL

## Deployment
Configured for VM deployment:
- **Build**: Builds frontend production bundle
- **Run**: Starts both backend (port 8000) and frontend preview (port 5000)
- **Deployment Type**: VM (maintains state, always running)

## Known Limitations
- ML models are stub implementations and return mock data
- No actual deepfake detection models loaded (would require large model files)
- Video processing is simplified for demonstration
- No authentication or user management implemented

## Future Enhancements
- Integrate actual trained ML models for deepfake detection
- Add TensorFlow/PyTorch support for real analysis
- Implement user authentication
- Add database for storing analysis history
- Support batch processing of media files
- Add API rate limiting and quota management
