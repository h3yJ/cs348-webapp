from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Champion(db.Model):
    __tablename__ = 'champions'

    champion_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    class_type = db.Column(db.String(50), nullable=False)
    range_type = db.Column(db.String(50), nullable=False)
    resource = db.Column(db.String(50), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    region = db.Column(db.String(50), nullable=False)

    skins = db.relationship('Skin', backref='champion', lazy=True)
    abilities = db.relationship('Ability', backref='champion', lazy=True)
    stats = db.relationship('ChampionStats', backref='champion', lazy=True)

    def to_dict(self):
        return {
            "champion_id": self.champion_id,
            "name": self.name,
            "class_type": self.class_type,
            "range_type": self.range_type,
            "resource": self.resource,
            "release_date": self.release_date.strftime('%Y-%m-%d'),
            "region": self.region,
        }

class Skin(db.Model):
    __tablename__ = 'skins'

    skin_id = db.Column(db.Integer, primary_key=True)
    champion_id = db.Column(db.Integer, db.ForeignKey('champions.champion_id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    rarity = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Integer, nullable=False)

class Ability(db.Model):
    __tablename__ = 'abilities'

    ability_id = db.Column(db.Integer, primary_key=True)
    champion_id = db.Column(db.Integer, db.ForeignKey('champions.champion_id'), nullable=False)
    ability_name = db.Column(db.String(50), nullable=False)
    ability_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=True)

class ChampionStats(db.Model):
    __tablename__ = 'champion_stats'

    stat_id = db.Column(db.Integer, primary_key=True)
    champion_id = db.Column(db.Integer, db.ForeignKey('champions.champion_id'), nullable=False)
    health = db.Column(db.Float, nullable=False)
    health_growth = db.Column(db.Float, nullable=False)
    attack_damage = db.Column(db.Float, nullable=False)
    attack_growth = db.Column(db.Float, nullable=False)
    armor = db.Column(db.Float, nullable=False)
    armor_growth = db.Column(db.Float, nullable=False)
    magic_resist = db.Column(db.Float, nullable=False)
    magic_resist_growth = db.Column(db.Float, nullable=False)
    movement_speed = db.Column(db.Float, nullable=False)
    attack_range = db.Column(db.Float, nullable=False)
