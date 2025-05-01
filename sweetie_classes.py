# Classes for sweeties
from main import db

class Torte(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  sweetie_name = db.Column(db.String(250), nullable=False)
  description_text = db.Column(db.Text, nullable=False)
  sweetie_img = db.Column(db.String(250), nullable=False)
class Mus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sweetie_name = db.Column(db.String(250), nullable=False)
    description_text = db.Column(db.Text, nullable=False)
    sweetie_img = db.Column(db.String(250), nullable=False)
class Casice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sweetie_name = db.Column(db.String(250), nullable=False)
    description_text = db.Column(db.Text, nullable=False)
    sweetie_img = db.Column(db.String(250), nullable=False)
class Sitni(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sweetie_name = db.Column(db.String(250), nullable=False)
    description_text = db.Column(db.Text, nullable=False)
    sweetie_img = db.Column(db.String(250), nullable=False)
class Mini(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sweetie_name = db.Column(db.String(250), nullable=False)
    description_text = db.Column(db.Text, nullable=False)
    sweetie_img = db.Column(db.String(250), nullable=False)
class Lux(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sweetie_name = db.Column(db.String(250), nullable=False)
    description_text = db.Column(db.Text, nullable=False)
    sweetie_img = db.Column(db.String(250), nullable=False)
class Tart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sweetie_name = db.Column(db.String(250), nullable=False)
    description_text = db.Column(db.Text, nullable=False)
    sweetie_img = db.Column(db.String(250), nullable=False)
class Medenjaci(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sweetie_name = db.Column(db.String(250), nullable=False)
    description_text = db.Column(db.Text, nullable=False)
    sweetie_img = db.Column(db.String(250), nullable=False)
class Bombone(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sweetie_name = db.Column(db.String(250), nullable=False)
    description_text = db.Column(db.Text, nullable=False)
    sweetie_img = db.Column(db.String(250), nullable=False)
# db.create_all()  # In case the user table doesn't exist already. Otherwise, remove it.

