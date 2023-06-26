from flask import Flask, render_template, request, url_for, redirect, flash
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv, find_dotenv
import smtplib
from flask_login import UserMixin, login_user, LoginManager, login_required, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from forms import LoginForm, SweetieAddForm, Client_Message

app = Flask(__name__)

load_dotenv(find_dotenv())


app.config["IMAGE_UPLOADS"] = os.getenv('IMAGE_UPLOADS_FOLDER')


MAIL_GAGINI_SLATKISI = "ivan.ravic88@gmail.com"
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sweetie_table.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

app.config['DEBUG'] = True
app.config['TESTING'] = False
app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TTL'] = True
app.config['MAIL_USE_SSL'] = False
# app.config['MAIL_DEBUG'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_MAX_EMAILS'] = None
# app.config['MAIL_SUPRESS_SEND'] = False
app.config['MAIL_ASCII_ATTACHMENT'] = False

login_manager = LoginManager()
login_manager.init_app(app)

# DATABASE
class User(UserMixin, db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

# INSERT FIRST USER IN DATABASE

# db.create_all()
# hash_and_salted_password = generate_password_hash(
#             os.getenv('LOGIN_PASSWORD_FOR_ADMIN'),
#             method='pbkdf2:sha256',
#             salt_length=8
#         )
# new_user = User(email=os.getenv('EMAIL_FOR_ADMIN'),
#             password=hash_and_salted_password)
# db.session.add(new_user)
# db.session.commit()






# HANDLE PAGE FOR SWEETIES
class SweetieHandle():
  def sweetie_handle(type_of_sweetie, form):
    # upload image
    if form.validate_on_submit():
      if request.files:
        image = request.files["sweetie-img"]
        image.save(os.path.join(app.config["IMAGE_UPLOADS"], image.filename))
    # insert in database new sweetie
      new_sweetie = type_of_sweetie(sweetie_name = form.sweetie_name_form.data, description_text = form.description_text_form.data, sweetie_img = image.filename)
      db.session.add(new_sweetie)
      db.session.commit()

# Load admin user
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# main page whit form for sending message
@app.route('/', methods=["POST", "GET"])
def home():
  message_client_form = Client_Message()
  if message_client_form.validate_on_submit():
        with smtplib.SMTP(app.config['MAIL_SERVER'], port=app.config['MAIL_PORT']) as connection:
          connection.starttls()
          connection.login(user=app.config['MAIL_USERNAME'], password=app.config['MAIL_PASSWORD'])
          connection.sendmail(from_addr=app.config['MAIL_USERNAME'], to_addrs=f"{MAIL_GAGINI_SLATKISI}",
                              msg=f"Subject:{message_client_form.client_name.data}\n\n{message_client_form.client_message.data}\n\nClient email address: {message_client_form.client_email.data}")
        return redirect(url_for("home"))
  return render_template("index.html", message_client_form=message_client_form, admin=current_user)

# route for displaying sweeties from database
@app.route('/section/<sweetie>', methods=["POST", "GET"])
def section(sweetie):

  form = SweetieAddForm()
  sweetie_data = {}
  from sweetie_info import sweetie_info
  sweetie_data = sweetie_info[sweetie]
  
  if sweetie_data:
    # get data from dictionary
    subheading = sweetie_data["subheading"]
    secondary_heading = sweetie_data["secondary_heading"]
    type_of_sweetie = sweetie_data["type_of_sweetie"]
    # get all sweeties from database
    all_sweeties = db.session.query(type_of_sweetie).all()
    SweetieHandle.sweetie_handle(type_of_sweetie, form)

    return render_template("section.html", subheading=subheading, secondary_heading=secondary_heading, all_sweeties=all_sweeties, form=form, admin=current_user, sweetie=sweetie)



@app.route("/login", methods=["POST", "GET"])
def login():
  login_form = LoginForm()
  if login_form.validate_on_submit():
    email = login_form.email.data
    password = login_form.password.data

    user = User.query.filter_by(email=email).first()

    if not user:
      flash("That email does not exist in database, please try again.")
      return redirect(url_for('login'))
    elif not check_password_hash(user.password, password):
      flash('Password incorrect, please try again.')
      return redirect(url_for('login'))
    else:
      login_user(user)

    return redirect(url_for("home"))
  return render_template("login.html", login_form = login_form, admin=current_user)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))


@app.route("/delete/<sweetie>/<int:sweetie_id>")
def delete_sweetie(sweetie,sweetie_id):
  sweetie_to_delete = db.session.query(sweetie).get(sweetie_id)
  print(sweetie_to_delete)
  db.session.delete(sweetie_to_delete)
  db.session.commit()
  return redirect(url_for('home'))

if __name__ == "__main__":
  app.run(debug=True)
  