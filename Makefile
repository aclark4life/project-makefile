# https://github.com/aclark4life/project-makefile
#
# The MIT License (MIT)
#
# Copyright (c) 2016 Alex Clark
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.


# Default Goal
# 
# https://www.gnu.org/software/make/manual/html_node/Goals.html, https://www.gnu.org/software/make/manual/html_node/Special-Variables.html#Special-Variables
# 
# By default, the goal is the first target in the makefile (not counting targets that start with a period). Therefore, makefiles are usually written so that the first target is for compiling the entire program or programs they describe. If the first rule in the makefile has several targets, only the first target in the rule becomes the default goal, not the whole list. You can manage the selection of the default goal from within your makefile using the .DEFAULT_GOAL variable (see Other Special Variables). 
#
.DEFAULT_GOAL=git-commit-auto-push


APP=app
PROJECT=project
TMP:=$(shell echo `tmp`)

#db: django-migrate django-su
#db-init: django-db-init-postgres
#django-start: django-init
#fe-init: npm-init npm-install grunt-init grunt-serve
#fe: npm-install grunt-serve
#freeze: python-pip-freeze
#heroku: heroku-push
#install: python-virtualenv python-install
#migrate: django-migrate
#push: git-push
#package-init: python-package-init
#package-test: python-package-test
#plone-start: plone-init
#python-test: python-package-test
#readme-test: python-package-readme-test
#release: python-package-release
#release-test: python-package-release-test
#remote: heroku-remote
#serve: python-serve
#sphinx-start: sphinx-init
#static: django-static
#test: python-test
#vm: vagrant-up
#vm-down: vagrant-suspend

# ABlog
ablog-init:
	ablog start
ablog-build:
	ablog build
ablog-serve:
	ablog serve

# Django
django-db-init-postgres:
	-dropdb $(PROJECT)-$(APP)
	-createdb $(PROJECT)-$(APP)
django-db-init-sqlite:
	-rm -f $(PROJECT)-$(APP).sqlite3
django-init:
	-mkdir -p $(PROJECT)/$(APP)
	-django-admin startproject $(PROJECT) .
	-django-admin startapp $(APP) $(PROJECT)/$(APP)
django-migrate:
	python manage.py migrate
django-migrations:
	python manage.py makemigrations $(APP)
django-migrations-init:
	rm -rf $(PROJECT)/$(APP)/migrations
	$(MAKE) django-migrations
django-serve:
	python manage.py runserver
django-test:
	python manage.py test
django-shell:
	python manage.py shell
django-static:
	python manage.py collectstatic --noinput
django-su:
	python manage.py createsuperuser

# Git
MESSAGE="Update"
REMOTES=`\
	git branch -a |\
	grep remote |\
	grep -v HEAD |\
	grep -v master`
co: git-checkout
commit: git-commit
commit-edit: git-commit-edit
git-checkout:
	-for i in $(REMOTES) ; do \
        git checkout -t $$i ; done
git-commit-auto-push: git-commit git-push
git-commit:
	git commit -a -m $(MESSAGE)
git-commit-edit:
	git commit -a
git-push:
	git push
push: git-push

# Heroku
heroku-debug-on:
	heroku config:set DEBUG=1
heroku-debug-off:
	heroku config:unset DEBUG
heroku-web-on:
	heroku ps:scale web=1
heroku-web-off:
	heroku ps:scale web=0
heroku-push:
	git push heroku
heroku-shell:
	heroku run bash
heroku-remote:
	git remote add heroku

# Init
init: python-virtualenv

# Misc (http://stackoverflow.com/a/26339924)
help:
	@echo "Usage: make [TARGET]\nAvailable targets:\n"
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F:\
        '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}'\
        | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs | tr ' ' '\n' | awk\
        '{print "    - "$$0}'
	@echo "\n"

uname := $(shell uname)
review:

ifeq ($(uname), Darwin)
	@open -a $(EDITOR) `find $(PROJECT) -name \*.py | grep -v __init__.py`\
		`find $(PROJECT) -name \*.html`
else
	@echo "Unsupported"
endif

# Node
npm-init:
	npm init
npm-install:
	npm install
grunt-init:
	npm install grunt
	grunt-init Gruntfile
grunt-serve:
	grunt serve

# Plone
plone-heroku:
	-@createuser -s plone > /dev/null 2>&1
	-@createdb -U plone plone > /dev/null 2>&1
	@export PORT=8080 && \
		export USERNAME=admin && \
		export PASSWORD=admin && \
		bin/buildout -c heroku.cfg
plone-init:
	plock --force --no-cache --no-virtualenv .
plone-db-sync:
	bin/buildout -c database.cfg
plone-serve:
	@echo "Zope about to handle requests here:\n\n\thttp://localhost:8080\n"
	@bin/plone fg

# Python
lint: python-flake python-yapf python-wc
python-clean-pyc:
	find . -name \*.pyc | xargs rm -v
python-flake:
	-flake8 *.py
	-flake8 $(PROJECT)/*.py
	-flake8 $(PROJECT)/$(APP)/*.py
python-package-init:
	mkdir -p $(PROJECT)/$(APP)
	touch $(PROJECT)/$(APP)/__init__.py
	touch $(PROJECT)/__init__.py
python-package-lint:
	check-manifest
	pyroma .
python-package-readme-test:
	rst2html.py README.rst > readme.html; open readme.html
python-package-release:
	python setup.py sdist --format=gztar,zip upload
python-package-release-test:
	python setup.py sdist --format=gztar,zip upload -r test
python-package-test:
	python setup.py test
python-pip-freeze:
	bin/pip freeze | sort > $(TMP)/requirements.txt
	mv -f $(TMP)/requirements.txt .
python-install:
	bin/pip install -r requirements.txt
python-serve:
	@echo "\n\tServing HTTP on http://0.0.0.0:8000\n"
	python -m SimpleHTTPServer
python-virtualenv:
	virtualenv .
python-yapf:
	-yapf -i *.py
	-yapf -i -e $(PROJECT)/urls.py $(PROJECT)/*.py
	-yapf -i $(PROJECT)/$(APP)/*.py
python-wc:
	-wc -l *.py
	-wc -l $(PROJECT)/*.py
	-wc -l $(PROJECT)/$(APP)/*.py

# Sphinx
sphinx-init:
	sphinx-quickstart -q -p "Python Project" -a "Alex Clark" -v 0.0.1 doc
sphinx-serve:
	@echo "\nServing HTTP on http://0.0.0.0:8085 ...\n"
	pushd _build/html; python -m SimpleHTTPServer 8085; popd

# Vagrant
vagrant-box-update:
	vagrant box update
vagrant-down:
	vagrant suspend
vagrant-init:
	vagrant destroy
	vagrant init ubuntu/trusty64
	vagrant up --provider virtualbox
vagrant-up:
	vagrant up --provision
