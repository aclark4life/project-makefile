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

APP=app
PROJECT=project
TMP:=$(shell echo `tmp`)
UNAME:=$(shell uname)

#fe-init: npm-init npm-install grunt-init grunt-serve
#fe: npm-install grunt-serve
#freeze: python-pip-freeze
#install: python-virtualenv python-install
#package-init: python-package-init
#package-test: python-package-test
#python-test: python-package-test
#readme-test: python-package-readme-test
#release: python-package-release
#release-test: python-package-release-test
#serve: python-serve
#test: python-test
#vm: vagrant-up
#vm-down: vagrant-suspend

# ABlog
ablog: ablog-clean ablog-install ablog-init ablog-build ablog-serve
ablog-clean:
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
django: django-clean django-init django-migrate django-su django-serve
django-clean:
	-rm -rf $(PROJECT)
	-rm manage.py
	-dropdb $(PROJECT)-$(APP)
	-createdb $(PROJECT)-$(APP)
	-rm db.sqlite3
django-clean-migrations:
	rm -rf $(PROJECT)/$(APP)/migrations
	$(MAKE) django-migrations
django-init:
	-mkdir -p $(PROJECT)/$(APP)
	-django-admin startproject $(PROJECT) .
	-django-admin startapp $(APP) $(PROJECT)/$(APP)
django-install:
	@echo "Django\n" > requirements.txt
	@$(MAKE) python-virtualenv
	@$(MAKE) python-install
django-migrate:
	python manage.py migrate
django-migrations:
	python manage.py makemigrations $(APP)
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
	grep remote   |\
	grep -v HEAD  |\
	grep -v master`  # http://unix.stackexchange.com/a/37316
co: git-checkout-remotes  # Alias
commit: git-commit  # Alias
commit-auto: git-commit-auto  # Alias
commit-edit: git-commit-edit  # Alias
git-commit: git-commit-auto  # Alias
git-commit-auto-push: git-commit-auto git-push  # Chain
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
	@echo "Now serving: http://0.0.0.0:9000"
	grunt serve

# Help
h: help  # Alias
he: help  # Alias
help:
	@echo "Usage: make [TARGET]\nAvailable targets:\n"
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F:\
        '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}'\
        | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs | tr ' ' '\n' | awk\
        '{print "    - "$$0}' | less
	@echo "\n"  # http://stackoverflow.com/a/26339924

# Heroku
heroku: heroku-init
heroku-debug-on:
	heroku config:set DEBUG=1
heroku-debug-off:
	heroku config:unset DEBUG
heroku-init:
	heroku apps:create $(PROJECT)-$(APP)	
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

# Node Package Manager
npm: npm-init npm-install
npm-init:
	npm init
npm-install:
	npm install

# Plone
plone: plone-install plone-init plone-serve
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
	@echo "Zope about to handle requests here:\n\n\thttp://localhost:8080\n"
	@bin/plone fg

# Python
install: python-install  # Alias
lint: python-flake python-yapf python-wc  # Chain
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

# Review
review:
ifeq ($(UNAME), Darwin)
	@open -a $(EDITOR) `find $(PROJECT) -name \*.py | grep -v __init__.py`\
		`find $(PROJECT) -name \*.html`
else
	@echo "Unsupported"
endif

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
