import os
import re
from datetime import datetime
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
URL=os.getenv('VITE_SERVICE_API_URL')
KEY=os.getenv('VITE_SERVICE_API_KEY')

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['WTF_CSRF_ENABLED'] = False
app.config['SECRET_KEY'] = '8787'
app.config['SECURITY_PASSWORD_SALT'] = 'salt'
app.config['SECURITY_PASSWORD_HASH'] = 'sha256_crypt'

app.config['DEBUG'] = False

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# Remove any characters that could be used in an injection or scripting attack
def sanitize_input(input_text):
    """Remove potentially dangerous characters."""
    return re.sub(r"[<>'\";]", "", input_text)



@app.route('/api/question', methods=['POST'])
def question_api():
    # GetFormData
    FormData = request.get_json()
    print(FormData)    
    # Sanitize inputs
    sanitized_data = {
        'phone': sanitize_input(FormData.get('phone', '')),
        'name': sanitize_input(FormData.get('name', '')),
        'comment': sanitize_input(FormData.get('comment', '')),
        'reason': sanitize_input(FormData.get('reason', ''))
    }

    # GetTime
    now = datetime.now()
    dt_string = now.strftime("%d.%m.%Y %H:%M:%S")

    # ReSendPost
    headers = {
        'Content-type': 'application/json',
        'X-Auth-Key': f'{KEY}'
    }
    json = {
        "agreement_id": 6565,
        "reason_id": 10,
        "phone": sanitized_data['phone'],
        "destination_time": dt_string,
        "comment": '\n' + 'ФИО: ' + sanitized_data['name'] + '\n' + 'Причина: ' + (sanitized_data['comment'] if sanitized_data['comment'] else sanitized_data['reason'])
    }

    response = requests.post(URL, json=json, headers=headers)
    print(response.text)
    
    return ""

if __name__ == "__main__":
    app.run()
