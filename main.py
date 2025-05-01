from flask import Flask, render_template, request, url_for, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import table, column
import os
from dotenv import load_dotenv, find_dotenv
from flask_login import UserMixin, login_user, LoginManager, current_user, logout_user
from werkzeug.security import check_password_hash
from forms import LoginForm, SweetieAddForm, Client_Message
from flask import session
from werkzeug.utils import secure_filename
from flask_mail import Mail, Message

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
app.config['MAIL_USE_TLS'] = True
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

# for flask_mail
mail = Mail(app)


# Define allowed file extensions for image uploads
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_filename(filename):
  return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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
    sweetie_value = session.get("sweetie")

    # upload image
    if form.validate_on_submit():
      if request.files:
        image = request.files.get["sweetie-img"]
        
        if not image or image.filename == "":
          flash("Please select an image.")
          return redirect(url_for("section", sweetie=sweetie_value))
        
        if not allowed_filename(image.filename):
          flash("Allowed image types are: png, jpg, jpeg, gif, webp")
          return redirect(url_for("section", sweetie=sweetie_value))
        
        filename = secure_filename(image.filename)
        filepath = os.path.join(app.config["IMAGE_UPLOADS"], filename)

        if not os.path.exists(filepath):
          image.save(filepath)

        else:
          flash("Image already exists. Please change the name of the image and try again.")
          return redirect(url_for("section", sweetie=sweetie_value))
    # insert in database new sweetie
      new_sweetie = type_of_sweetie(sweetie_name = form.sweetie_name_form.data, description_text = form.description_text_form.data, sweetie_img = image.filename)
      db.session.add(new_sweetie)
      db.session.commit()

      
      return redirect(url_for("section", sweetie=sweetie_value))

# Load admin user
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# main page whit form for sending message
@app.route('/', methods=["POST", "GET"])
def home():
    message_client_form = Client_Message()

    if message_client_form.validate_on_submit():

    # check if honeypot field is filled
      if message_client_form.last_name.data !="" or request.form.get("middle_name", "") != "":
        flash("Invalid form submission detected.")
        return redirect(url_for("home"))
    

      html_message = render_template(
            "email_template.html",
            name=message_client_form.client_name.data,
            email=message_client_form.client_email.data,
            message=message_client_form.client_message.data
        )

      subject = f"Pitanje posetioca sajta Gaginislatkisi.com: {message_client_form.client_name.data}"
      recipient = MAIL_GAGINI_SLATKISI

      msg = Message(
          subject=subject,
          recipients=[recipient],
          html=html_message,
          sender=app.config['MAIL_USERNAME']
        )

      try:
        mail.send(msg)
        flash("Message is sent successfully!")
      except Exception:
        flash("Message is not sent!")
        
      return redirect(url_for("home"))
    
    # Ako forma nije validna, prikaži greške
    if message_client_form.errors:
        for field, errors in message_client_form.errors.items():
            for error in errors:
                flash(f"{error}")

    return render_template("index.html", message_client_form=message_client_form, admin=current_user)


# route for displaying sweeties from database
@app.route('/section/<sweetie>', methods=["POST", "GET"])
def section(sweetie):
  session["sweetie"] = sweetie
  form = SweetieAddForm()
  sweetie_data = {}
  from sweetie_info import sweetie_info
  sweetie_data = sweetie_info[sweetie]
  
 
  # get data from dictionary
  subheading = sweetie_data["subheading"]
  secondary_heading = sweetie_data["secondary_heading"]
  type_of_sweetie = sweetie_data["type_of_sweetie"]
  SweetieHandle.sweetie_handle(type_of_sweetie, form)
  # get all sweeties from database
  all_sweeties = db.session.query(type_of_sweetie).all()
  

  return render_template("section.html", subheading=subheading, secondary_heading=secondary_heading, all_sweeties=all_sweeties, form=form, admin=current_user, sweetie=sweetie)



@app.route("/login", methods=["POST", "GET"])
def login():
  login_form = LoginForm()
  last_sweetie = session.get("sweetie")

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

    if last_sweetie:
       return redirect(url_for("section", sweetie=last_sweetie))
    else:
      return redirect(url_for("home"))
  return render_template("login.html", login_form = login_form, admin=current_user)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))


@app.route("/delete/<sweetie>/<int:sweetie_id>")
def delete_sweetie(sweetie,sweetie_id):
  # get table from database
  sweetie_table = table(sweetie, column("id"),column("sweetie_img"))
  # get image name from database
  select_query =  sweetie_table.select().where(sweetie_table.c.id == sweetie_id)
  result = db.session.execute(select_query)
  sweetie_img_name = result.fetchone()[1]
  # delete image from folder
  os.remove(os.path.join(app.config["IMAGE_UPLOADS"], sweetie_img_name))

  # delete sweetie information from database
  delete_query = sweetie_table.delete().where(sweetie_table.c.id == sweetie_id)
  db.session.execute(delete_query)
  db.session.commit()
  return redirect(url_for("section", sweetie=sweetie))

if __name__ == "__main__":
  app.run(host= "0.0.0.0",debug=True)
  