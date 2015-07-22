from flask import Flask, render_template
from random import randint
app = Flask(__name__)

@app.route('/')
def hello_world():
    a = randint(0,100)
    b = 40
    return render_template('hello.html', i=a, j=b)

if __name__ == '__main__':
    app.run()
