import numpy as np
import cv2
from typing import Dict, Any, List
from PIL import Image, ImageFilter

class ImageForensicsAnalyzer:
    def __init__(self):
        self.setup_forensics_tools()
    
    def setup_forensics_tools(self):
        """Setup forensic analysis tools"""
        print("Image forensics analyzer initialized")
    
    async def analyze(self, image: np.ndarray) -> Dict[str, Any]:
        """Perform comprehensive forensic analysis"""
        try:
            # Multiple forensic analyses
            ela_analysis = self._error_level_analysis(image)
            noise_analysis = self._noise_consistency_analysis(image)
            cfa_analysis = self._cfa_artifact_analysis(image)
            compression_analysis = self._compression_artifact_analysis(image)
            
            # Detect editing indicators
            editing_indicators = self._detect_editing_indicators(
                ela_analysis, noise_analysis, cfa_analysis, compression_analysis
            )
            
            confidence = self._calculate_forensics_confidence(
                ela_analysis, noise_analysis, cfa_analysis, compression_analysis
            )
            
            return {
                "is_authentic": len(editing_indicators) == 0,
                "editing_indicators": editing_indicators,
                "compression_artifacts": compression_analysis,
                "confidence": float(confidence),
                "detailed_analysis": {
                    "error_level_analysis": ela_analysis,
                    "noise_consistency": noise_analysis,
                    "cfa_artifacts": cfa_analysis
                }
            }
            
        except Exception as e:
            return {
                "is_authentic": True,
                "editing_indicators": [],
                "compression_artifacts": {},
                "confidence": 0.0,
                "error": str(e)
            }
    
    def _error_level_analysis(self, image: np.ndarray) -> Dict[str, float]:
        """Error Level Analysis for JPEG compression artifacts"""
        try:
            # Convert to PIL Image
            pil_image = Image.fromarray(image)
            
            # Save at different quality levels
            pil_image.save('temp_high.jpg', 'JPEG', quality=95)
            pil_image.save('temp_low.jpg', 'JPEG', quality=75)
            
            # Load and compare
            high_qual = np.array(Image.open('temp_high.jpg'))
            low_qual = np.array(Image.open('temp_low.jpg'))
            
            # Calculate difference
            diff = np.abs(high_qual.astype(float) - low_qual.astype(float))
            ela_score = np.mean(diff) / 255.0
            
            import os
            os.remove('temp_high.jpg')
            os.remove('temp_low.jpg')
            
            return {"ela_score": float(ela_score)}
            
        except Exception as e:
            return {"ela_score": 0.0, "error": str(e)}
    
    def _noise_consistency_analysis(self, image: np.ndarray) -> Dict[str, float]:
        """Analyze noise consistency across the image"""
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        
        # Calculate noise pattern using wavelet transform
        coeffs = self._wavelet_transform(gray)
        
        # Analyze noise consistency in different regions
        regions = [
            gray[:h//2, :w//2], gray[:h//2, w//2:],
            gray[h//2:, :w//2], gray[h//2:, w//2:]
        ]
        
        region_noise_levels = [self._estimate_noise_level(region) for region in regions]
        noise_consistency = np.std(region_noise_levels) / np.mean(region_noise_levels) if np.mean(region_noise_levels) > 0 else 0
        
        return {
            "noise_consistency": float(noise_consistency),
            "average_noise_level": float(np.mean(region_noise_levels))
        }
    
    def _wavelet_transform(self, image):
        """Simple wavelet-like transform"""
        # Using Laplacian pyramid as approximation
        level1 = cv2.pyrDown(image)
        level2 = cv2.pyrDown(level1)
        return level2
    
    def _estimate_noise_level(self, image):
        """Estimate noise level in image region"""
        # Using median absolute deviation
        median = np.median(image)
        mad = np.median(np.abs(image - median))
        return float(mad)
    
    def _cfa_artifact_analysis(self, image: np.ndarray) -> Dict[str, float]:
        """Analyze Color Filter Array artifacts"""
        # CFA interpolation creates specific patterns
        # Analyze Bayer pattern consistency
        
        green_channel = image[:, :, 1]  # Green channel often shows CFA artifacts
        
        # Calculate variance in green pixel patterns
        pattern_variance = np.var([
            green_channel[::2, ::2],  # Different Bayer pattern positions
            green_channel[::2, 1::2],
            green_channel[1::2, ::2],
            green_channel[1::2, 1::2]
        ])
        
        cfa_score = min(pattern_variance / 1000.0, 1.0)
        return {"cfa_artifact_score": float(cfa_score)}
    
    def _compression_artifact_analysis(self, image: np.ndarray) -> Dict[str, Any]:
        """Analyze compression artifacts"""
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        
        # Detect block artifacts (common in JPEG)
        block_artifacts = self._detect_block_artifacts(gray)
        
        # Detect ringing artifacts
        ringing_artifacts = self._detect_ringing_artifacts(gray)
        
        return {
            "block_artifacts": float(block_artifacts),
            "ringing_artifacts": float(ringing_artifacts),
            "compression_level": "high" if block_artifacts > 0.7 else "medium" if block_artifacts > 0.3 else "low"
        }
    
    def _detect_block_artifacts(self, image):
        """Detect JPEG block artifacts"""
        # Calculate horizontal and vertical differences at block boundaries
        h, w = image.shape
        
        block_size = 8  # Standard JPEG block size
        horizontal_artifacts = 0
        vertical_artifacts = 0
        
        for i in range(block_size, h, block_size):
            row_diff = np.mean(np.abs(image[i, :] - image[i-1, :]))
            horizontal_artifacts += row_diff
        
        for j in range(block_size, w, block_size):
            col_diff = np.mean(np.abs(image[:, j] - image[:, j-1]))
            vertical_artifacts += col_diff
        
        total_artifacts = (horizontal_artifacts + vertical_artifacts) / (h + w)
        return float(total_artifacts / 255.0)
    
    def _detect_ringing_artifacts(self, image):
        """Detect ringing artifacts around edges"""
        # Use Laplacian to find edges
        edges = cv2.Laplacian(image, cv2.CV_64F)
        edge_mask = np.abs(edges) > np.mean(np.abs(edges)) * 2
        
        # Analyze oscillations near edges
        ringing_score = 0.0
        if np.any(edge_mask):
            # Simple approximation - in real implementation, use more sophisticated methods
            ringing_score = np.mean(np.abs(edges[edge_mask])) / np.max(np.abs(edges))
        
        return float(ringing_score)
    
    def _detect_editing_indicators(self, *analyses) -> List[str]:
        """Compile list of editing indicators"""
        indicators = []
        
        ela_score = analyses[0].get("ela_score", 0)
        noise_consistency = analyses[1].get("noise_consistency", 0)
        cfa_score = analyses[2].get("cfa_artifact_score", 0)
        compression_artifacts = analyses[3]
        
        if ela_score > 0.1:
            indicators.append("High error level variation detected")
        if noise_consistency > 0.3:
            indicators.append("Inconsistent noise patterns")
        if cfa_score > 0.5:
            indicators.append("CFA interpolation artifacts detected")
        if compression_artifacts["block_artifacts"] > 0.5:
            indicators.append("Heavy compression artifacts")
        
        return indicators
    
    def _calculate_forensics_confidence(self, *analyses) -> float:
        """Calculate confidence in forensic analysis"""
        # Base confidence on consistency of indicators
        scores = [
            analyses[0].get("ela_score", 0),
            analyses[1].get("noise_consistency", 0),
            analyses[2].get("cfa_artifact_score", 0)
        ]
        
        # Higher variance in scores indicates lower confidence
        variance = np.var(scores)
        confidence = max(0.0, 1.0 - variance * 3)
        return float(confidence)