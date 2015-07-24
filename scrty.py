from flask import Flask, render_template
from random import randint
import jinja2
from flask.ext.assets import Environment, Bundle
from htmlmin.minify import html_minify

app = Flask(__name__)
assets = Environment(app)

# Routes
@app.route("/")
def index():
    return html_minify(unicode(render_template('index.html')).encode('utf-8'))

if __name__ == '__main__':
    Environment.auto_build = True
    app.run(host='0.0.0.0', port=5000, debug=True)
