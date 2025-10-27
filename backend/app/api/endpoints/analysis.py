from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import magic
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
        file_type = magic.from_buffer(content, mime=True)
        
        if not any(file.filename.lower().endswith(ext) for ext in settings.ALLOWED_EXTENSIONS):
            raise HTTPException(status_code=400, detail="File type not supported")
        
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