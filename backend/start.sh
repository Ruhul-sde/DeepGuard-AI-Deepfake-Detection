#!/bin/bash
export PYTHONPATH=/home/runner/workspace:$PYTHONPATH
cd /home/runner/workspace/backend
python -m uvicorn app.main:app --host localhost --port 8000 --reload
