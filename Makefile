env:
	virtualenv env
	env/bin/pip install -r requirements.txt

run: env
	env/bin/python scrty.py

clean:
	rm -rf env
