# 🧠 Image & Video Authenticity Analyzer

A full-stack project for detecting deepfakes and AI-generated media using machine learning and forensic analysis.

## Structure
```
image-video-authenticity-analyzer/
├── backend/           # FastAPI backend
├── frontend/          # React/Vite frontend
├── ml_models/         # ML model scripts for authenticity detection
├── docker-compose.yml # Combined service orchestration
└── README.md          # Project documentation
```

## 🚀 Quick Start
```bash
# Create environment and install backend deps
cd backend
pip install -r requirements.txt

# Run backend
uvicorn app.main:app --reload

# Frontend setup
cd ../frontend
npm install
npm run dev
```
