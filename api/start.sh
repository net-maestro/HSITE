#!/bin/bash
export FLASK_ENV=production
cd /hsite/api
source env/bin/activate
python3.10 app.py
