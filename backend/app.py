
import sys
import os

# Add the workspace to Python path for ml_models imports
sys.path.insert(0, '/home/runner/workspace')

import uvicorn
from app.main import app

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True
    )
