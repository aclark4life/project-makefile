all: lint update push
db: clean migrate su
lint: yapf flake wc

project = project
app = app

clean:
	-rm -f db.sqlite3
	-git add db.sqlite3
	-dropdb $(project)
	-createdb $(project)
flake:
	-flake8 $(project)/*.py
	-flake8 $(project)/$(app)/*.py
	-flake8 $(project)/$(app)/migrations/*.py
update:
	git commit -a -m "Update"
push: push-origin
push-origin:
	git push
push-heroku:
	git push heroku
yapf:
	-yapf -i $(project)/*.py
	-yapf -i $(project)/$(app)/*.py
	-yapf -i $(project)/$(app)/migrations/*.py
migrate:
	rm -rf $(project)/$(app)/migrations
	python manage.py makemigrations $(app)
	python manage.py migrate
review:
	open -a "Sublime Text 2" `find $(project) -name \*.py | grep -v __init__.py`
start:
	-mkdir -p $(project)/$(app)
	-django-admin startproject $(project) .
	-django-admin startapp $(app) $(project)/$(app)
su:
	python manage.py createsuperuser
wc:
	wc -l $(project)/*.py
	wc -l $(project)/$(app)/*.py
