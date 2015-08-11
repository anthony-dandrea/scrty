from flask import Flask, render_template, jsonify, request, make_response, session, redirect, abort
from flask.ext.launchkey import LaunchKeyManager, login_required, current_user
from flask.ext.assets import Environment, Bundle
import jinja2, config, random, string
from htmlmin.minify import html_minify

###################
## Configuration
###################
app = Flask(__name__)
assets = Environment(app)
app.config.from_pyfile('config.py')

# LaunchKey Config
launchkey = LaunchKeyManager(app)
launchkey.login_view = '/login'

###################
## Routes
###################
@app.route('/')
def index():
    # Send users to login if they are not authenticated
    if current_user.is_anonymous():
        return redirect('/login')
    else:
        return html_minify(unicode(render_template('index.html')).encode('utf-8'))

@app.route('/login')
def login():
    return html_minify(unicode(render_template('login.html')).encode('utf-8'))

###################
## Endpoints
###################
@app.route('/login', methods=['POST'])
def login_endpoint():
    username = str(jinja2.utils.escape(request.form['username']))
    auth_request = launchkey.authorize(username)
    return jsonify({'response': auth_request})

@app.route('/poll', methods=['GET'])
def poll():
    # Check for a user response to login request
    poll_response = launchkey.poll_request()
    return jsonify({'response': poll_response })

@app.route('/remote-logout', methods=['GET'])
def logout_poll():
    # Check if user logged out on app
    poll_response = launchkey.poll_request()
    if poll_response is False:
        launchkey.logout()
    return jsonify({'response': poll_response })

@app.route('/isauthorized', methods=['GET'])
def is_authorized():
    # Check if the user is authorized
    auth_response = launchkey.is_authorized()
    if auth_response:
        # User has been authorized, so log them in
        launchkey.login()
    return jsonify({'response': auth_response })

@app.route('/logout', methods=['GET'])
def deauth_user():
    # Logout user from both LaunchKey as well as Flask-Login
    success = launchkey.logout()
    return jsonify({'response': success})

@app.route('/encrypt-password', methods=['POST'])
def encrypt_password():
    """
    Encrypts plain text
    http://stackoverflow.com/questions/12524994/encrypt-decrypt-using-pycrypto-aes-256
    """
    import base64
    from Crypto.Cipher import AES
    from Crypto import Random
    from jinja2 import utils
    response = dict()
    plain_pass = str(utils.escape(request.form['password']))
    BS = 16
    pad = lambda s: s + (BS - len(s) % BS) * chr(BS - len(s) % BS)
    raw = pad(plain_pass)
    iv = Random.new().read( AES.block_size )
    cipher = AES.new( app.config['SECRET_KEY'], AES.MODE_CBC, iv )
    response['success'] = True
    response['encrypted_password'] = base64.b64encode( iv + cipher.encrypt( raw ) )
    return jsonify(response)

@app.route('/decrypt-password', methods=['POST'])
def decrypt_password():
    """
    Decrypts encrypted string
    http://stackoverflow.com/questions/12524994/encrypt-decrypt-using-pycrypto-aes-256
    """
    import base64
    from Crypto.Cipher import AES
    from Crypto import Random
    from jinja2 import utils
    response = dict()
    encrypted_password = str(utils.escape(request.form['password']))
    unpad = lambda s : s[:-ord(s[len(s)-1:])]
    enc = base64.b64decode(encrypted_password)
    iv = enc[:16]
    cipher = AES.new(app.config['SECRET_KEY'], AES.MODE_CBC, iv )
    response['success'] = True
    response['decrypted_password'] = unpad(cipher.decrypt( enc[16:] ))
    return jsonify(response)


###################
## CSRF Protection
###################

# @app.before_request
# def csrf_protect():
#     if request.method == 'POST':
#         token = session.pop('_csrf_token', None)
#         if not token or token != request.form.get('_csrf_token'):
#             abort(403)

def generate_csrf_token():
    if '_csrf_token' not in session:
        session['_csrf_token'] = ''.join(random.choice(string.ascii_uppercase + string.digits) for c in range(30))
    return session['_csrf_token']

app.jinja_env.globals['csrf_token'] = generate_csrf_token

if __name__ == '__main__':
    Environment.auto_build = True
    app.run(host='0.0.0.0', port=5000, debug=True)
