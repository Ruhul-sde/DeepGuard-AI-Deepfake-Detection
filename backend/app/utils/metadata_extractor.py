from typing import Dict, Any
from datetime import datetime


class MetadataExtractor:
    async def extract(self, file, content: bytes) -> Dict[str, Any]:
        return {
            "filename": file.filename,
            "content_type": file.content_type,
            "size": len(content),
            "upload_timestamp": datetime.utcnow().isoformat(),
            "exif_data": {},
            "camera_info": "Not available",
            "software_info": "Not available"
        }
