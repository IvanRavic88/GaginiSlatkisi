# Description: Forms for login, insert sweeties and send message
from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms import StringField, SubmitField, TextAreaField, EmailField, PasswordField
from wtforms.validators import DataRequired, InputRequired


# FORM FOR LOGIN
class LoginForm(FlaskForm):
  email = EmailField("Email Adress", validators = [InputRequired()])
  password = PasswordField("Password", validators = [InputRequired()])
  login = SubmitField("Login")

# FORM FOR INSERT SWEETIES
class SweetieAddForm(FlaskForm):
  sweetie_name_form = StringField("Naziv slatkiša", validators=[InputRequired(message="Potrebno je uneti naziv")])
  description_text_form = TextAreaField("Opis slatkiša", validators=[DataRequired()])
  sweetie_img = FileField("Slika", name="sweetie-img", validators=[DataRequired()])
  save = SubmitField("Sačuvaj slatkiš")

# FORM FOR MESSAGE
class Client_Message(FlaskForm):
  client_name = StringField("Vaše Ime", validators = [InputRequired()])
  client_email = EmailField("Email Adresa", validators = [InputRequired()])
  client_message = TextAreaField("Poruka", validators = [InputRequired()])
  send = SubmitField("Pošalji")