from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import os
from typing import Dict, Any

from app.services.analysis_service import AnalysisService
from app.core.config import settings

router = APIRouter()
analysis_service = AnalysisService()

@router.post("/analyze-media")
async def analyze_media(file: UploadFile = File(...)):
    try:
        # Validate file type
        content = await file.read()
        
        if not any(file.filename.lower().endswith(ext) for ext in settings.ALLOWED_EXTENSIONS):
            raise HTTPException(status_code=400, detail="File type not supported")
        
        # Determine file type from content_type or filename
        file_type = file.content_type or "application/octet-stream"
        if file.filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            file_type = "image/jpeg"
        elif file.filename.lower().endswith(('.mp4', '.avi', '.mov')):
            file_type = "video/mp4"
        
        # Reset file pointer
        await file.seek(0)
        
        # Perform analysis
        analysis_result = await analysis_service.analyze_media(file, content, file_type)
        
        return JSONResponse(content=analysis_result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.get("/analysis/{analysis_id}")
async def get_analysis(analysis_id: str):
    # Implementation for retrieving previous analysis
    pass