project = project
app = app

all: help
clean: clean-sqlite
clean-migrations:
	rm -rf $(project)/$(app)/migrations
clean-postgres:
	-dropdb $(project)-$(app)
	-createdb $(project)-$(app)
clean-sqlite:
	-rm -f db.sqlite3
	-git add db.sqlite3
commit:
	git commit -a
commit-update:
	git commit -a -m "Update"
db: migrate su
flake:
	-flake8 $(project)/*.py
	-flake8 $(project)/$(app)/*.py
# http://stackoverflow.com/a/26339924
.PHONY: help
help:
	@echo "\nPlease call with one of these targets:\n"
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs | tr ' ' '\n' | awk '{print "    - "$$0}'
	@echo "\n"
install:
	virtualenv .
	bin/pip install -r requirements.txt
lint: yapf flake wc
migrate:
	python manage.py migrate
migrations:
	python manage.py makemigrations $(app)
push: push-origin
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
test:
	python manage.py test
update: commit-update
up: commit-update push
wc:
	wc -l $(project)/*.py
	wc -l $(project)/$(app)/*.py
yapf:
	-yapf -i -e $(project)/urls.py $(project)/*.py
	-yapf -i $(project)/$(app)/*.py
