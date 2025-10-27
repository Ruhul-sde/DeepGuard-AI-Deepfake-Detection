import sys
import os
import cv2
import numpy as np
from PIL import Image, ImageFilter
import io
import tempfile
from typing import Dict, Any, List
import json
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../..'))

from ml_models.deepfake_detector import DeepFakeDetector
from ml_models.ai_generated_detector import AIGeneratedDetector
from ml_models.image_forensics import ImageForensicsAnalyzer
from app.utils.metadata_extractor import MetadataExtractor
from app.utils.video_processor import VideoProcessor

class AnalysisService:
    def __init__(self):
        self.deepfake_detector = DeepFakeDetector()
        self.ai_detector = AIGeneratedDetector()
        self.forensics_analyzer = ImageForensicsAnalyzer()
        self.metadata_extractor = MetadataExtractor()
        self.video_processor = VideoProcessor()
    
    async def analyze_media(self, file, content, file_type: str) -> Dict[str, Any]:
        analysis_id = self._generate_analysis_id()
        
        # Extract basic metadata
        metadata = await self.metadata_extractor.extract(file, content)
        
        # Initialize result structure
        result = {
            "analysis_id": analysis_id,
            "filename": file.filename,
            "file_type": file_type,
            "file_size": len(content),
            "timestamp": datetime.utcnow().isoformat(),
            "metadata": metadata,
            "authenticity_analysis": {},
            "technical_analysis": {},
            "risk_assessment": {},
            "confidence_scores": {}
        }
        
        # Perform type-specific analysis
        if file_type.startswith('image'):
            analysis_result = await self._analyze_image(content)
        elif file_type.startswith('video'):
            analysis_result = await self._analyze_video(file, content)
        else:
            raise ValueError("Unsupported file type")
        
        result.update(analysis_result)
        
        # Generate overall risk assessment
        result["risk_assessment"] = self._assess_risk(result)
        
        return result
    
    async def _analyze_image(self, content: bytes) -> Dict[str, Any]:
        # Convert to PIL Image
        image = Image.open(io.BytesIO(content))
        image_np = np.array(image)
        
        # Perform various analyses
        deepfake_analysis = await self.deepfake_detector.analyze_image(image_np)
        ai_analysis = await self.ai_detector.analyze_image(image_np)
        forensics_analysis = await self.forensics_analyzer.analyze(image_np)
        
        return {
            "authenticity_analysis": {
                "is_authentic": deepfake_analysis.get("is_authentic", False),
                "deepfake_probability": deepfake_analysis.get("probability", 0),
                "ai_generated_probability": ai_analysis.get("probability", 0),
                "editing_indicators": forensics_analysis.get("editing_indicators", []),
                "compression_artifacts": forensics_analysis.get("compression_artifacts", {})
            },
            "technical_analysis": {
                "image_dimensions": image.size,
                "color_mode": image.mode,
                "dpi": image.info.get('dpi', (72, 72)),
                "format": image.format
            },
            "confidence_scores": {
                "overall_confidence": self._calculate_overall_confidence(
                    deepfake_analysis.get("probability", 0),
                    ai_analysis.get("probability", 0),
                    forensics_analysis.get("confidence", 0)
                ),
                "deepfake_confidence": deepfake_analysis.get("confidence", 0),
                "ai_generation_confidence": ai_analysis.get("confidence", 0),
                "forensics_confidence": forensics_analysis.get("confidence", 0)
            }
        }
    
    async def _analyze_video(self, file, content: bytes) -> Dict[str, Any]:
        # Save to temporary file for processing
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_file:
            temp_file.write(content)
            temp_path = temp_file.name
        
        try:
            # Extract frames for analysis
            frames = await self.video_processor.extract_frames(temp_path)
            
            # Analyze multiple frames
            frame_analyses = []
            for frame in frames[:10]:  # Analyze first 10 frames
                frame_analysis = await self._analyze_video_frame(frame)
                frame_analyses.append(frame_analysis)
            
            # Aggregate results
            aggregated = self._aggregate_video_analysis(frame_analyses)
            
            # Additional video-specific analysis
            video_metadata = await self.video_processor.analyze_video_metadata(temp_path)
            
            return {
                "authenticity_analysis": aggregated,
                "technical_analysis": video_metadata,
                "confidence_scores": {
                    "overall_confidence": aggregated.get("overall_confidence", 0),
                    "temporal_consistency": aggregated.get("temporal_consistency", 0)
                }
            }
            
        finally:
            # Cleanup
            if os.path.exists(temp_path):
                os.unlink(temp_path)
    
    def _calculate_overall_confidence(self, *scores):
        return sum(scores) / len(scores) if scores else 0
    
    def _assess_risk(self, analysis_result: Dict) -> Dict[str, Any]:
        auth_analysis = analysis_result.get("authenticity_analysis", {})
        confidence = analysis_result.get("confidence_scores", {}).get("overall_confidence", 0)
        
        deepfake_prob = auth_analysis.get("deepfake_probability", 0)
        ai_prob = auth_analysis.get("ai_generated_probability", 0)
        editing_indicators = auth_analysis.get("editing_indicators", [])
        
        risk_score = (deepfake_prob + ai_prob) / 2
        
        if risk_score > 0.8 or len(editing_indicators) > 3:
            risk_level = "HIGH"
        elif risk_score > 0.5 or len(editing_indicators) > 1:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"
        
        return {
            "risk_level": risk_level,
            "risk_score": risk_score,
            "factors": [
                f"Deepfake probability: {deepfake_prob:.2f}",
                f"AI generation probability: {ai_prob:.2f}",
                f"Editing indicators found: {len(editing_indicators)}"
            ]
        }
    
    def _generate_analysis_id(self) -> str:
        return f"analysis_{datetime.utcnow().strftime('%Y%m%d_%H%M%S_%f')}"
    
    async def _analyze_video_frame(self, frame: np.ndarray) -> Dict[str, Any]:
        deepfake_analysis = await self.deepfake_detector.analyze_image(frame)
        ai_analysis = await self.ai_detector.analyze_image(frame)
        forensics_analysis = await self.forensics_analyzer.analyze(frame)
        
        return {
            "deepfake_probability": deepfake_analysis.get("probability", 0),
            "ai_generated_probability": ai_analysis.get("probability", 0),
            "editing_indicators": forensics_analysis.get("editing_indicators", []),
            "confidence": self._calculate_overall_confidence(
                deepfake_analysis.get("confidence", 0),
                ai_analysis.get("confidence", 0),
                forensics_analysis.get("confidence", 0)
            )
        }
    
    def _aggregate_video_analysis(self, frame_analyses: List[Dict]) -> Dict[str, Any]:
        if not frame_analyses:
            return {
                "is_authentic": True,
                "deepfake_probability": 0,
                "ai_generated_probability": 0,
                "overall_confidence": 0,
                "temporal_consistency": 0
            }
        
        avg_deepfake = np.mean([fa.get("deepfake_probability", 0) for fa in frame_analyses])
        avg_ai = np.mean([fa.get("ai_generated_probability", 0) for fa in frame_analyses])
        avg_confidence = np.mean([fa.get("confidence", 0) for fa in frame_analyses])
        
        deepfake_variance = np.var([fa.get("deepfake_probability", 0) for fa in frame_analyses])
        temporal_consistency = 1.0 - min(deepfake_variance, 1.0)
        
        all_editing_indicators = []
        for fa in frame_analyses:
            all_editing_indicators.extend(fa.get("editing_indicators", []))
        
        unique_indicators = list(set(all_editing_indicators))
        
        return {
            "is_authentic": avg_deepfake < 0.5 and avg_ai < 0.5,
            "deepfake_probability": float(avg_deepfake),
            "ai_generated_probability": float(avg_ai),
            "editing_indicators": unique_indicators,
            "overall_confidence": float(avg_confidence),
            "temporal_consistency": float(temporal_consistency),
            "frames_analyzed": len(frame_analyses)
        }