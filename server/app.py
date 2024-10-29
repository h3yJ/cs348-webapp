# app.py
from flask import Flask, jsonify, request
from models import db, Champion
from flask_migrate import Migrate
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app, origins="*")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///champions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

# Route to get all champions
@app.route('/api/champions', methods=['GET'])
def get_champions():
    champions = Champion.query.all()
    return jsonify([{
        'champion_id': champion.champion_id,
        'name': champion.name,
        'class_type': champion.class_type,
        'range_type': champion.range_type,
        'resource': champion.resource,
        'release_date': champion.release_date.strftime('%Y-%m-%d'),
        'region': champion.region
    } for champion in champions])

# Route to add a new champion
@app.route('/api/champions', methods=['POST'])
def add_champion():
    data = request.get_json()
    
    release_date = datetime.strptime(data['release_date'], "%Y-%m-%d").date()
    
    new_champion = Champion(
        name=data['name'],
        class_type=data['class_type'],
        range_type=data['range_type'],
        resource=data['resource'],
        release_date=release_date,
        region=data['region']
    )
    db.session.add(new_champion)
    db.session.commit()
    return jsonify({'message': 'Champion added successfully'})

# Route to update a champion
@app.route('/api/champions/<int:champion_id>', methods=['PUT'])
def update_champion(champion_id):
    data = request.get_json()
    champion = Champion.query.get_or_404(champion_id)
    champion.name = data['name']
    champion.class_type = data['class_type']
    champion.range_type = data['range_type']
    champion.resource = data['resource']
    if isinstance(data['release_date'], str):
        champion.release_date = datetime.strptime(data['release_date'], "%Y-%m-%d").date()
    else:
        champion.release_date = data['release_date']
    champion.region = data['region']
    db.session.commit()
    return jsonify({'message': 'Champion updated successfully'})

# Route to delete a champion
@app.route('/api/champions/<int:champion_id>', methods=['DELETE'])
def delete_champion(champion_id):
    champion = Champion.query.get_or_404(champion_id)
    db.session.delete(champion)
    db.session.commit()
    return jsonify({'message': 'Champion deleted successfully'})

if __name__ == '__main__':
    app.run(port=8000, debug=True)
