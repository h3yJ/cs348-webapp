# app.py
from flask import Flask, jsonify, request, session, make_response
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = b'TESTKEY'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message="How's it going? Let's get this party started!!!")

if __name__ == '__main__':
    app.run(port=5555, debug=True)