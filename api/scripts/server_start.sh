#!/bin/bash
cd /var/www/passportobject/api
source /var/www/passportobject/api/venv/bin/activate
pip install -r requirements.txt
/var/www/passportobject/api/venv/bin/uvicorn main:app --host 0.0.0.0 --port 7000 --ssl-keyfile privkey2.pem  --ssl-certfile cert2.pem 
