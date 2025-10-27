import cv2
import numpy as np
from typing import List, Dict, Any


class VideoProcessor:
    async def extract_frames(self, video_path: str, max_frames: int = 10) -> List[np.ndarray]:
        frames = []
        cap = cv2.VideoCapture(video_path)
        
        if not cap.isOpened():
            return frames
        
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        if total_frames == 0:
            return frames
        
        frame_interval = max(1, total_frames // max_frames)
        
        frame_count = 0
        while len(frames) < max_frames:
            cap.set(cv2.CAP_PROP_POS_FRAMES, frame_count * frame_interval)
            ret, frame = cap.read()
            if not ret:
                break
            frames.append(frame)
            frame_count += 1
        
        cap.release()
        return frames
    
    async def analyze_video_metadata(self, video_path: str) -> Dict[str, Any]:
        cap = cv2.VideoCapture(video_path)
        
        if not cap.isOpened():
            return {
                "duration": 0,
                "fps": 0,
                "resolution": "0x0",
                "codec": "unknown"
            }
        
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        duration = frame_count / fps if fps > 0 else 0
        
        cap.release()
        
        return {
            "duration": duration,
            "fps": fps,
            "resolution": f"{width}x{height}",
            "frame_count": frame_count,
            "codec": "unknown"
        }
