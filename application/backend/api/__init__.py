from flask import Flask
from flask_mysqldb import MySQL
from flask_restful import Api
from api.config import Config
from api.routes import initialize_routes
from flask_cors import CORS
from flask_mail import Mail, Message

def create_api():
    """
    create_api

    Create the flask app with every config needed for the website

    :return: Flask Application
    :rtype: Flask App
    """
    app = Flask(__name__)
    api = Api(app)
    db = MySQL()
    app.config.from_object(Config)
    db.init_app(app)
    initialize_routes(api)
    CORS(app)
    Mail(app)
    return app