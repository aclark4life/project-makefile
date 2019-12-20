# https://github.com/aclark4life/makefile
#
# The MIT License (MIT)
#
# Copyright (c) 2016–2020 Alex Clark
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

#-------------------------------------------------------------------------------

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

.DEFAULT_GOAL=usage

#-------------------------------------------------------------------------------

# Variables

# A variable is a name defined in a makefile to represent a string of text, called
# the variable's value. These values are substituted by explicit request into targets,
# prerequisites, recipes, and other parts of the makefile.
#
# https://www.gnu.org/software/make/manual/html_node/Using-Variables.html

COMMIT_MESSAGE = "Update"
PROJECT = project
APP = app
# https://stackoverflow.com/a/589260/185820
TMPDIR := $(shell mktemp -d)
UNAME := $(shell uname)
# http://unix.stackexchange.com/a/37316
REMOTE_BRANCHES = `git branch -a | grep remote | grep -v HEAD | grep -v master`

#-------------------------------------------------------------------------------

# Additional Concepts
#
# Unique to Project Makefile
#
# "Alias" - A new target definition that only exists to create a shorter target 
# name for another target that already exists.
#
# "Multi-target Alias" - Like an "Alias", but with multiple targets.
#
# "BBB" - For backwards compatibility. Via
# https://docs.plone.org/appendices/glossary.html

#-------------------------------------------------------------------------------

# Overrides
#
# https://www.gnu.org/software/make/manual/html_node/Overriding-Makefiles.html

#-------------------------------------------------------------------------------

# Rules
#
# A rule appears in the makefile and says when and how to remake certain files,
# called the rule's targets (most often only one per rule). It lists the other
# files that are the prerequisites of the target, and the recipe to use to
# create or update the target. 
#
# https://www.gnu.org/software/make/manual/html_node/Rules.html

django-app-init:
	-mkdir -p $(PROJECT)/$(APP)/templates
	-touch $(PROJECT)/$(APP)/templates/base.html
	-django-admin startproject $(PROJECT) .
	-django-admin startapp $(APP) $(PROJECT)/$(APP)
django-db-drop:  # PostgreSQL
	-dropdb $(PROJECT)
django-db-init:  # PostgreSQL
	$(MAKE) django-db-drop
	-createdb $(PROJECT)
db-init: django-db-init  # Alias
django-graph:
	python manage.py graph_models $(APP) -o graph_models_$(PROJECT)_$(APP).png 
django-init: 
	@$(MAKE) django-db-init
	@$(MAKE) django-app-init
	@$(MAKE) django-settings
	git add $(PROJECT)
	git add manage.py
	@$(MAKE) commit-push
django-install:
	@echo "Django\ndj-database-url\npsycopg2-binary\n" > requirements.txt
	@$(MAKE) pip-install
	@$(MAKE) freeze
	-git add requirements.txt
	-@$(MAKE) commit-push
django-migrate:
	python manage.py migrate
django-migrations-default:
	python manage.py makemigrations $(APP)
	git add $(PROJECT)/$(APP)/migrations/*.py
django-serve-default:
	python manage.py runserver 0.0.0.0:8000
django-test:
	python manage.py test
django-settings:
	echo "STATIC_ROOT = 'static'" >> $(PROJECT)/settings.py
	echo "ALLOWED_HOSTS = ['*']" >> $(PROJECT)/settings.py
	echo "AUTH_PASSWORD_VALIDATORS = [{'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', }, { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },]" >> $(PROJECT)/settings.py
	echo "import dj_database_url; DATABASES = { 'default': dj_database_url.config(default=os.environ.get( 'DATABASE_URL', 'postgres://%s:%s@%s:%s/%s' % (os.environ.get('DB_USER', ''), os.environ.get('DB_PASS', ''), os.environ.get('DB_HOST', 'localhost'), os.environ.get('DB_PORT', '5432'), os.environ.get('DB_NAME', 'project_app'))))}" >> $(PROJECT)/settings.py
django-shell:
	python manage.py shell
django-static:
	python manage.py collectstatic --noinput
django-su:
	python manage.py createsuperuser
django-loaddata-default:
	python manage.py loaddata
graph: django-graph
migrate: django-migrate  # Alias
migrations: django-migrations  # Alias
static: django-static  # Alias
su: django-su  # Alias
test: django-test  # Alias
loaddata: django-loaddata  # Alias

# Git
git-init:
	git init
	hub create `openssl rand -base64 12`
	-$(MAKE) make
	-$(MAKE) readme
	$(MAKE) git-push-up
	hub browse
git-branches:
	-for i in $(REMOTE_BRANCHES) ; do \
        git checkout -t $$i ; done
git-prune:
	git remote update origin --prune
git-commit:
	git commit -a -m $(COMMIT_MESSAGE)
git-commit-edit:
	git commit -a
git-push:
	git push
git-push-up:
	git push --set-upstream origin master
commit: git-commit  # Alias
ce: commit-edit  # Alias
cp: commit-push  # Alias
push: git-push  # Alias
p: push  # Alias
commit-push: git-commit git-push  # Multi-target Alias
commit-edit: git-commit-edit git-push  # Multi-target Alias
git-commit-auto-push: commit-push  # BBB
git-commit-edit-push: commit-edit-push  # BBB

# List targets
list-targets:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F:\
        '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}'\
        | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs | tr ' ' '\n' | awk\
        '{print "make "$$0}'  # http://stackoverflow.com/a/26339924
help: list-targets  # Alias
h: list-targets  # Alias

# Usage
usage:
	@echo "Project Makefile"
	@echo "Usage:\n"
	@echo "\tmake <target>\n"
	@echo "Examples:\n"
	@echo "\tmake help"

# Makefile
make:
	git add Makefile
	@$(MAKE) commit-push

# Beanstalk
deploy-default:
	eb deploy
d: deploy  # Alias
pdf:
	rst2pdf README.rst

# Node
npm-init:
	npm init -y
npm-install:
	npm install
npm-run:
	npm run

# Pip
freeze: pip-freeze
pip-freeze-default:
	pip freeze | sort > $(TMPDIR)/requirements.txt
	mv -f $(TMPDIR)/requirements.txt .
pip-upgrade-default:
	cat requirements.txt | awk -F \= '{print $1}' > $(TMPDIR)/requirements.txt
	mv -f $(TMPDIR)/requirements.txt .
	pip install -U -r requirements.txt
	$(MAKE) pip-freeze

# Python
lint: python-lint  # Alias
serve: python-serve  # Alias
python-clean:
	find . -name \*.pyc | xargs rm -v
python-flake:
	-flake8 *.py
	-flake8 $(PROJECT)/*.py
	-flake8 $(PROJECT)/$(APP)/*.py
pip-install:
	pip install -r requirements.txt
pip-install-test:
	pip install -r requirements-test.txt
python-lint: python-black python-flake python-wc  # Multi-target Alias
python-serve:
	@echo "\n\tServing HTTP on http://0.0.0.0:8000\n"
	python -m SimpleHTTPServer
package-test:
	python setup.py test
python-virtualenv-2-7:
	virtualenv --python=python2.7 .
python-virtualenv-3-6:
	virtualenv --python=python3.6 .
python-virtualenv-3-7:
	virtualenv --python=python3.7 .
python-virtualenv: python-virtualenv-3-7  # Alias
python-yapf:
	-yapf -i *.py
	-yapf -i $(PROJECT)/*.py
	-yapf -i $(PROJECT)/$(APP)/*.py
python-black:
	black $(PROJECT)
python-wc:
	-wc -l *.py
	-wc -l $(PROJECT)/*.py
	-wc -l $(PROJECT)/$(APP)/*.py
python-pipenv:
	pipenv install
	git add Pipfile
	git add Pipfile.lock
	git commit -a -m "Add pipenv"; git push
virtualenv: python-virtualenv-3-7  # Alias
virtualenv-2: python-virtualenv-2-7  # Alias
pipenv: python-pipenv # Alias

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
package-lint: package-check-manifest package-pyroma  # Multi-target Alias
package-pyroma:
	pyroma .
package-readme:
	rst2html.py README.rst > readme.html; open readme.html
package-release:
	python setup.py sdist --format=gztar,zip upload
package-release-test:
	python setup.py sdist --format=gztar,zip upload -r test

# Redhat
redhat-update:
	sudo yum update
	sudo yum upgrade -y

# Readme
readme:
	echo "Creating README.rst"
	@echo $(PROJECT)-$(APP) > README.rst
	@echo ================================================================================ >> README.rst
	echo "Done."
	git add README.rst
	@$(MAKE) commit-push

# Review
review:
ifeq ($(UNAME), Darwin)
	@open -a $(EDITOR) `find $(PROJECT) -name \*.py | grep -v __init__.py | grep -v migrations`\
		`find $(PROJECT) -name \*.html` `find $(PROJECT) -name \*.js`
else
	@echo "Unsupported"
endif

# Sphinx
sphinx-build:
	sphinx-build -b html -d $(DOC)/_build/doctrees $(DOC) $(DOC)/_build/html
sphinx-init:
	sphinx-quickstart -q -p $(PROJECT)-$(APP) -a $(USER) -v 0.0.1 $(DOC)
sphinx-install:
	@echo "Sphinx\n" > requirements.txt
	@$(MAKE) pip-install
# https://stackoverflow.com/a/32302366/185820
sphinx-serve:
	@echo "\n\tServing HTTP on http://0.0.0.0:8000\n"
	pushd $(DOC)/_build/html; python3 -m http.server

# Ubuntu
ubuntu-update:
	sudo aptitude update
	sudo aptitude upgrade -y

# Vagrant
vagrant: vagrant-clean vagrant-init vagrant-up  # Multi-target Alias
vm: vagrant  # Alias
vagrant-clean:
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

# Webpack
webpack-init:
	touch index.js
	echo "module.exports = { entry: './index.js', output: { filename: 'bundle.js' } }" > webpack.config.js
webpack-install:
	npm install --save-dev webpack
webpack-run:
	npm run bundle  # Requires bundle script in package.json to call webpack
pack: webpack-run


#-------------------------------------------------------------------------------

# Custom
# https://stackoverflow.com/a/49804748
%: %-default
	@ true

#PROJECT = project
#APP = app
#.DEFAULT_GOAL=commit-push
#install: pip-install
