import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Media Authenticity Analyzer"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Model paths
    DEEPTRACE_MODEL_PATH: str = os.getenv("DEEPTRACE_MODEL_PATH", "./models/deeptrace.h5")
    MESONET_MODEL_PATH: str = os.getenv("MESONET_MODEL_PATH", "./models/mesonet.h5")
    FORENSICS_MODEL_PATH: str = os.getenv("FORENSICS_MODEL_PATH", "./models/forensics.pth")
    
    # Analysis thresholds
    DEEPFAKE_THRESHOLD: float = 0.7
    AI_GENERATED_THRESHOLD: float = 0.6
    EDITING_THRESHOLD: float = 0.5
    
    # File settings
    MAX_FILE_SIZE: int = 100 * 1024 * 1024  # 100MB
    ALLOWED_EXTENSIONS: list = [".jpg", ".jpeg", ".png", ".mp4", ".avi", ".mov"]
    
    class Config:
        case_sensitive = True

settings = Settings()