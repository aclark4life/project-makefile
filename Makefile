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
# https://www.gnu.org/software/make/manual/html_node/Goals.html
# https://www.gnu.org/software/make/manual/html_node/Special-Variables.html#Special-Variables
# 
# By default, the goal is the first target in the makefile (not counting targets
# that start with a period). Therefore, makefiles are usually written so that the
# first target is for compiling the entire program or programs they describe. If
# the first rule in the makefile has several targets, only the first target in the
# rule becomes the default goal, not the whole list. You can manage the selection
# of the default goal from within your makefile using the .DEFAULT_GOAL variable
# (see Other Special Variables). 

.DEFAULT_GOAL=git-commit-auto-push

# Variables

# A variable is a name defined in a makefile to represent a string of text, called
# the variable's value. These values are substituted by explicit request into targets,
# prerequisites, recipes, and other parts of the makefile.
#
# https://www.gnu.org/software/make/manual/html_node/Using-Variables.html

APP=app
NAME="Alex Clark"
PROJECT=project
TMP:=$(shell echo `tmp`)
UNAME:=$(shell uname)

# Rules
#
# A rule appears in the makefile and says when and how to remake certain files,
# called the rule's targets (most often only one per rule). It lists the other
# files that are the prerequisites of the target, and the recipe to use to
# create or update the target. 
#
# https://www.gnu.org/software/make/manual/html_node/Rules.html
#
# (Note I am not using Make's implicit rules to remake files, because there are no
# files to manage, just tasks to perform. Also note the terms "Alias" and "Chain"
# in the comments below are mine, not Make's. In particular, I'm not referring to
# Make's Implicit Chaining feature. Rather, a "Chain" as I've defined it is a series
# of prerequisites required to satisfy the target. And an "Alias" is a target that
# only exists to define a shorter name for its prerequisite.)

# ABlog
ablog: ablog-wipe ablog-install ablog-init ablog-build ablog-serve  # Chain
ablog-wipe:
	-rm conf.py index.rst
ablog-init:
	bin/ablog start
ablog-install:
	@echo "ablog\n" > requirements.txt
	@$(MAKE) python-virtualenv
	@$(MAKE) python-install
ablog-build:
	bin/ablog build
ablog-serve:
	bin/ablog serve

# Django
db: django-db-wipe django-db-wipe
django: django-dp-wipe django-proj-wipe django-install django-init django-migrate django-su django-serve  # Chain
django-debug: django-shell  # Alias
django-db-wipe: django-sql-wipe  # Alias
django-init: django-db-init django-proj-init  # Chain
django-db-init: django-sql-init  # Alias
django-pg-wipe:  # PostgreSQL
	-dropdb $(PROJECT)
django-proj-wipe:
	@-rm -rvf $(PROJECT)
	@-rm -v manage.py
django-sql-wipe:  # SQLite
	-rm db.sqlite3
django-pg-init:  # PostgreSQL
	-createdb $(PROJECT)
django-proj-init:
	-mkdir -p $(PROJECT)/$(APP)
	-django-admin startproject $(PROJECT) .
	-django-admin startapp $(APP) $(PROJECT)/$(APP)
django-sql-init:  # SQLite
	-touch db.sqlite3
django-install:
	@echo "Django\n" > requirements.txt
	@$(MAKE) python-virtualenv
	@$(MAKE) python-install
django-migrate:
	bin/python manage.py migrate
django-migrations:
	bin/python manage.py makemigrations $(APP)
django-serve:
	bin/python manage.py runserver 0.0.0.0:8000
django-test:
	bin/python manage.py test
django-shell:
	bin/python manage.py shell
django-static:
	bin/python manage.py collectstatic --noinput
django-su:
	bin/python manage.py createsuperuser
django-user: django-su  # Alias
django-yapf:
	-yapf -i *.py
	-yapf -i -e $(PROJECT)/urls.py $(PROJECT)/*.py  # Don't format urls.py
	-yapf -i $(PROJECT)/$(APP)/*.py

# Git
MESSAGE="Update"
REMOTES=`\
	git branch -a |\
	grep remote   |\
	grep -v HEAD  |\
	grep -v master`  # http://unix.stackexchange.com/a/37316
co: git-checkout-remotes  # Alias
commit: git-commit  # Alias
commit-auto: git-commit-auto-push  # Alias
commit-edit: git-commit-edit-push  # Alias
git-commit: git-commit-auto  # Alias
git-commit-auto-push: git-commit-auto git-push  # Chain
git-commit-edit-push: git-commit-edit git-push  # Chain
push: git-push
git-checkout-remotes:
	-for i in $(REMOTES) ; do \
        git checkout -t $$i ; done
git-commit-auto:
	git commit -a -m $(MESSAGE)
git-commit-edit:
	git commit -a
git-push:
	git push

# Grunt
grunt: grunt-init grunt-serve
grunt-init: grunt-install grunt-file
grunt-file:
	curl -O https://raw.githubusercontent.com/gruntjs/grunt-init-gruntfile/master/template.js
	node_modules/grunt-init/bin/grunt-init --force gruntfile
	@echo "***Add to GruntFile:***\n\n\tgrunt.loadNpmTasks('grunt-serve');\n\n"
grunt-install:
	npm install grunt-init grunt-serve
grunt-serve:  
	@echo "\nServing HTTP on http://0.0.0.0:9000 ...\n"
	grunt serve

# Help
h: help  # Alias
he: help  # Alias
help:
	@echo "Usage: make [TARGET]\nAvailable targets:\n"
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F:\
        '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}'\
        | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs | tr ' ' '\n' | awk\
        '{print "    - "$$0}' | less  # http://stackoverflow.com/a/26339924
	@echo "\n"

# Heroku
heroku: heroku-init
heroku-debug-on:
	heroku config:set DEBUG=1
heroku-debug-off:
	heroku config:unset DEBUG
heroku-django-migrate:
	heroku run python manage.py migrate
heroku-init:
	heroku apps:create $(PROJECT)-$(APP)	
heroku-maint-on:
	heroku maintenance:on
heroku-maint-off:
	heroku maintenance:off
heroku-push:
	git push heroku
heroku-remote:
	git remote add heroku
heroku-shell:
	heroku run bash
heroku-web-on:
	heroku ps:scale web=1
heroku-web-off:
	heroku ps:scale web=0

# Misc

pdf:
	rst2pdf README.rst

# Node Package Manager
npm: npm-init npm-install
npm-init:
	npm init
npm-install:
	npm install

# Pip
freeze: pip-freeze
pip-freeze:
	bin/pip freeze | sort > $(TMP)/requirements.txt
	mv -f $(TMP)/requirements.txt .

# Plone
plone: plone-install plone-init plone-serve  # Chain
plone-heroku:
	-@createuser -s plone > /dev/null 2>&1
	-@createdb -U plone plone > /dev/null 2>&1
	@export PORT=8080 && \
		export USERNAME=admin && \
		export PASSWORD=admin && \
		bin/buildout -c heroku.cfg
plone-install:
	@echo plock > requirements.txt
	@$(MAKE) python-virtualenv
	@$(MAKE) python-install
plone-init:
	plock --force --no-cache --no-virtualenv .
plone-serve:
	@echo "\n\tServing HTTP on http://0.0.0.0:8080\n"
	@bin/plone fg

# Python
install: python-virtualenv python-install  # Alias
lint: python-lint  # Alias
serve: python-serve  # Alias
test: python-test  # Alias
python-wipe:
	find . -name \*.pyc | xargs rm -v
python-flake:
	-flake8 *.py
	-flake8 $(PROJECT)/*.py
	-flake8 $(PROJECT)/$(APP)/*.py
python-install:
	bin/pip install -r requirements.txt
python-lint: python-yapf python-flake python-wc  # Chain
python-serve:
	@echo "\n\tServing HTTP on http://0.0.0.0:8000\n"
	bin/python -m SimpleHTTPServer
package-test:
	bin/python setup.py test
python-virtualenv:
	virtualenv .
python-yapf:
	-yapf -i *.py
	-yapf -i $(PROJECT)/*.py
	-yapf -i $(PROJECT)/$(APP)/*.py
python-wc:
	-wc -l *.py
	-wc -l $(PROJECT)/*.py
	-wc -l $(PROJECT)/$(APP)/*.py

# Python Package
package: package-init  # Alias
release: package-release  # Alias
release-test: package-release-test  # Alias
package-check-manifest:
	check-manifest
package-init:
	mkdir -p $(PROJECT)/$(APP)
	touch $(PROJECT)/$(APP)/__init__.py
	touch $(PROJECT)/__init__.py
	@echo "setup(){}" > setup.py
package-lint: package-check-manifest package-pyroma  # Chain
package-pyroma:
	pyroma .
package-readme:
	rst2html.py README.rst > readme.html; open readme.html
package-release:
	bin/python setup.py sdist --format=gztar,zip upload
package-release-test:
	bin/python setup.py sdist --format=gztar,zip upload -r test

# Review
review:
ifeq ($(UNAME), Darwin)
	@open -a $(EDITOR) `find $(PROJECT) -name \*.py | grep -v __init__.py`\
		`find $(PROJECT) -name \*.html`
else
	@echo "Unsupported"
endif

# Sphinx
sphinx: sphinx-wipe sphinx-install sphinx-init sphinx-build sphinx-serve  # Chain
sphinx-wipe:
	@rm -rvf $(PROJECT)
sphinx-build:
	bin/sphinx-build -b html -d $(PROJECT)/_build/doctrees $(PROJECT) $(PROJECT)/_build/html
sphinx-install:
	@echo "ablog\n" > requirements.txt
	@$(MAKE) python-install
sphinx-init:
	bin/sphinx-quickstart -q -p $(PROJECT)-$(APP) -a $(NAME) -v 0.0.1 $(PROJECT)
sphinx-serve:
	@echo "\nServing HTTP on http://0.0.0.0:8000 ...\n"
	pushd $(PROJECT)/_build/html
	bin/python -m SimpleHTTPServer
	popd

# Vagrant
vagrant: vagrant-wipe vagrant-init vagrant-up  # Chain
vm: vagrant  # Alias
vagrant-wipe:
	-rm Vagrantfile
	-vagrant destroy
vagrant-down:
	vagrant suspend
vagrant-init:
	vagrant init ubuntu/trusty64
vagrant-up:
	vagrant up --provider virtualbox
vagrant-update:
	vagrant box update
