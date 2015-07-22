from flask import Flask, render_template
from random import randint
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('spa.html')

if __name__ == '__main__':
    app.run()
