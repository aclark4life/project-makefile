all: lint commit push
db: clean migrate su
lint: yapf flake wc
push: push-origin

project = project
app = app

clean:
	-rm -f db.sqlite3
	-git add db.sqlite3
	-dropdb $(project)
	-createdb $(project)
commit:
	git commit -a
flake:
	-flake8 $(project)/*.py
	-flake8 $(project)/$(app)/*.py
install:
	virtualenv .
	bin/pip install -r requirements.txt
migrate:
	rm -rf $(project)/$(app)/migrations
	python manage.py makemigrations $(app)
	python manage.py migrate
push-heroku:
	git push heroku
push-origin:
	git push
review:
	open -a "Sublime Text 2" `find $(project) -name \*.py | grep -v __init__.py` `find $(project) -name \*.html`
serve:
	python manage.py runserver
start:
	-mkdir -p $(project)/$(app)
	-django-admin startproject $(project) .
	-django-admin startapp $(app) $(project)/$(app)
su:
	python manage.py createsuperuser
wc:
	wc -l $(project)/*.py
	wc -l $(project)/$(app)/*.py
yapf:
	-yapf -i -e $(project)/urls.py $(project)/*.py
	-yapf -i $(project)/$(app)/*.py
