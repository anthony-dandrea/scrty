from flask import Flask, render_template, jsonify, request, make_response
from random import randint
import jinja2
from flask.ext.assets import Environment, Bundle
from htmlmin.minify import html_minify
from flask.ext.bcrypt import Bcrypt

app = Flask(__name__)
assets = Environment(app)
bcrypt = Bcrypt(app)

# Routes
@app.route("/")
def index():
    return html_minify(unicode(render_template('index.html')).encode('utf-8'))

# Endpoints
@app.route("/encrypt-password", methods=['POST'])
def encrypt_password():
    """
    Encrypts plain text
    No validation... yet
    Does not store anything... yet
    https://flask-bcrypt.readthedocs.org/en/latest/
    """
    from jinja2 import utils
    response = dict()
    plain_pass = str(utils.escape(request.form['password']))
    encrypt_pass = bcrypt.generate_password_hash(plain_pass)
    response["success"] = True
    response["encrypted_password"] = encrypt_pass
    return jsonify(response)

if __name__ == '__main__':
    Environment.auto_build = True
    app.run(host='0.0.0.0', port=5000, debug=True)
