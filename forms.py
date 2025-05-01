# Description: Forms for login, insert sweeties and send message
from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms import StringField, SubmitField, TextAreaField, EmailField, PasswordField
from wtforms.validators import DataRequired, InputRequired, Email


# FORM FOR LOGIN
class LoginForm(FlaskForm):
  email = EmailField("Email Adress", validators = [InputRequired()])
  password = PasswordField("Password", validators = [InputRequired()])
  login = SubmitField("Login")

# FORM FOR INSERT SWEETIES
class SweetieAddForm(FlaskForm):
  sweetie_name_form = StringField("Naziv slatkiša", validators=[InputRequired(message="Naziv slatkiša je obavezan")])
  description_text_form = TextAreaField("Opis slatkiša", validators=[DataRequired(message="Potrebno je uneti opis slatkiša")])
  sweetie_img = FileField("Slika", name="sweetie-img", validators=[DataRequired(message="Potrebno je uneti sliku")])
  save = SubmitField("Sačuvaj slatkiš")

# FORM FOR MESSAGE
class Client_Message(FlaskForm):
  client_name = StringField("Vaše Ime", validators = [InputRequired(), DataRequired()])
  client_email = EmailField("Email Adresa", validators = [ DataRequired(), Email()])
  client_message = TextAreaField("Poruka", validators = [InputRequired(), DataRequired()])
  last_name = StringField("", render_kw={"style":"display:none"})
  send = SubmitField("Pošalji")