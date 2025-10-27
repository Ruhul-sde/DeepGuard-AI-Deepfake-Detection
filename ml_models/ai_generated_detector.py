import numpy as np
import cv2
from typing import Dict, Any
from PIL import Image

class AIGeneratedDetector:
    def __init__(self):
        self.setup_detector()
    
    def setup_detector(self):
        """Setup AI generation detection model"""
        # In production, load models like CLIP-based detectors or GAN-specific detectors
        print("AI Generation detector initialized")
    
    async def analyze_image(self, image: np.ndarray) -> Dict[str, Any]:
        """Analyze image for AI generation indicators"""
        try:
            # Multiple detection strategies
            gan_artifacts = self._detect_gan_artifacts(image)
            frequency_analysis = self._frequency_domain_analysis(image)
            statistical_analysis = self._statistical_analysis(image)
            
            # Combine results
            ai_probability = self._combine_detection_scores(
                gan_artifacts, frequency_analysis, statistical_analysis
            )
            
            confidence = self._calculate_detection_confidence(
                gan_artifacts, frequency_analysis, statistical_analysis
            )
            
            return {
                "is_ai_generated": ai_probability > 0.5,
                "probability": float(ai_probability),
                "confidence": float(confidence),
                "detection_methods": {
                    "gan_artifacts": gan_artifacts,
                    "frequency_analysis": frequency_analysis,
                    "statistical_analysis": statistical_analysis
                }
            }
            
        except Exception as e:
            return {
                "is_ai_generated": False,
                "probability": 0.0,
                "confidence": 0.0,
                "error": str(e)
            }
    
    def _detect_gan_artifacts(self, image: np.ndarray) -> float:
        """Detect GAN-specific artifacts"""
        # Analyze for common GAN artifacts like:
        # - Repetitive patterns
        # - Asymmetric features
        # - Unnatural textures
        
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        
        # Fourier analysis for repetitive patterns
        f_transform = np.fft.fft2(gray)
        f_shift = np.fft.fftshift(f_transform)
        magnitude_spectrum = np.log(np.abs(f_shift) + 1)
        
        # Analyze symmetry in frequency domain
        height, width = magnitude_spectrum.shape
        center_y, center_x = height // 2, width // 2
        
        # Check quadrant symmetry
        q1 = magnitude_spectrum[center_y:, center_x:]
        q2 = magnitude_spectrum[center_y:, :center_x]
        q3 = magnitude_spectrum[:center_y, :center_x]
        q4 = magnitude_spectrum[:center_y, center_x:]
        
        symmetry_score = (
            np.abs(np.mean(q1) - np.mean(q2)) +
            np.abs(np.mean(q3) - np.mean(q4))
        ) / (2 * np.mean(magnitude_spectrum))
        
        artifact_score = min(symmetry_score, 1.0)
        return float(artifact_score)
    
    def _frequency_domain_analysis(self, image: np.ndarray) -> float:
        """Analyze frequency domain characteristics"""
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        
        # Discrete Cosine Transform
        dct = cv2.dct(np.float32(gray) / 255.0)
        
        # Analyze high-frequency components
        h, w = dct.shape
        high_freq_energy = np.sum(dct[h//2:, w//2:] ** 2)
        total_energy = np.sum(dct ** 2)
        
        high_freq_ratio = high_freq_energy / total_energy if total_energy > 0 else 0
        
        return float(high_freq_ratio)
    
    def _statistical_analysis(self, image: np.ndarray) -> float:
        """Perform statistical analysis for AI detection"""
        # Analyze color distribution
        color_std = np.std(image, axis=(0, 1))
        color_consistency = np.mean(color_std) / 255.0
        
        # Analyze local entropy
        gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        entropy = self._calculate_local_entropy(gray)
        
        # AI-generated images often have different entropy distributions
        entropy_std = np.std(entropy)
        entropy_score = min(entropy_std / 2.0, 1.0)
        
        combined_score = (color_consistency + entropy_score) / 2
        return float(combined_score)
    
    def _calculate_local_entropy(self, image, kernel_size=7):
        """Calculate local entropy"""
        from scipy.ndimage import uniform_filter
        from scipy.stats import entropy
        
        # Pad image
        pad_size = kernel_size // 2
        padded = np.pad(image, pad_size, mode='reflect')
        
        entropy_map = np.zeros_like(image, dtype=np.float32)
        
        for i in range(image.shape[0]):
            for j in range(image.shape[1]):
                window = padded[i:i+kernel_size, j:j+kernel_size]
                hist, _ = np.histogram(window, bins=256, range=(0, 256))
                prob = hist / hist.sum()
                entropy_map[i, j] = entropy(prob[prob > 0])
        
        return entropy_map
    
    def _combine_detection_scores(self, *scores) -> float:
        """Combine multiple detection scores"""
        return float(np.mean(scores))
    
    def _calculate_detection_confidence(self, *scores) -> float:
        """Calculate confidence based on score consistency"""
        variance = np.var(scores)
        confidence = max(0.0, 1.0 - variance * 2)
        return float(confidence)