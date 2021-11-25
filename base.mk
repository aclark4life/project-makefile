# Project Makefile
# ================
#
# A generic Makefile for projects
#
# - https://github.com/project-makefile/project-makefile
#
#
# License
# ------------------------------------------------------------------------------ 
#
# Copyright 2016—2021 Jeffrey A. Clark, "Alex"
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
#
#
# Overview of concepts
# ------------------------------------------------------------------------------ 
#
# Goal
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
# 
# "By default, the goal is the first target in the makefile (not counting targets
# that start with a period). Therefore, makefiles are usually written so that the
# first target is for compiling the entire program or programs they describe. If
# the first rule in the makefile has several targets, only the first target in the
# rule becomes the default goal, not the whole list. You can manage the selection
# of the default goal from within your makefile using the .DEFAULT_GOAL variable
# (see Other Special Variables)."
# 
# - https://www.gnu.org/software/make/manual/html_node/Goals.html
#
# Default goal
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   
#  
# "Sets the default goal to be used if no targets were specified on the command 
# line (see Arguments to Specify the Goals). The .DEFAULT_GOAL variable allows
# you to discover the current default goal, restart the default goal selection
# algorithm by clearing its value, or to explicitly set the default goal."
#
# - https://www.gnu.org/software/make/manual/html_node/Special-Variables.html#Special-Variables
#
# Variables
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
# "A variable is a name defined in a makefile to represent a string of text, called
# the variable's value. These values are substituted by explicit request into targets,
# prerequisites, recipes, and other parts of the makefile."
#
# - https://www.gnu.org/software/make/manual/html_node/Using-Variables.html
#
# Flavors
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
# "The first flavor of variable is a recursively expanded variable. Variables of
# this sort are defined by lines using ‘=’ (see Setting Variables) or by the
# define directive (see Defining Multi-Line Variables). The value you specify
# is installed verbatim; if it contains references to other variables, these
# references are expanded whenever this variable is substituted (in the course
# of expanding some other string). When this happens, it is called recursive expansion.
#
# To avoid all the problems and inconveniences of recursively expanded variables,
# there is another flavor: simply expanded variables.
#
# Simply expanded variables are defined by lines using ‘:=’ or ‘::=’ (see Setting
# Variables). Both forms are equivalent in GNU make; however only the ‘::=’ form
# is described by the POSIX standard (support for ‘::=’ was added to the POSIX
# standard in 2012, so older versions of make won’t accept this form either)."
#
# - https://www.gnu.org/software/make/manual/html_node/Flavors.html#Flavors
#
# Rules
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
# "A rule appears in the makefile and says when and how to remake certain files,
# called the rule's targets (most often only one per rule). It lists the other
# files that are the prerequisites of the target, and the recipe to use to
# create or update the target."
#
# - https://www.gnu.org/software/make/manual/html_node/Rules.html
#
# Overrides
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
# "Sometimes it is useful to have a makefile that is mostly just like another makefile.
# You can often use the ‘include’ directive to include one in the other, and add more
# targets or variable definitions. However, it is invalid for two makefiles to give
# different recipes for the same target. But there is another way."
#
# - https://www.gnu.org/software/make/manual/html_node/Overriding-Makefiles.html
#
# Includes
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
# "The include directive tells make to suspend reading the current makefile and
#  read one or more other makefiles before continuing.
# 
# - https://www.gnu.org/software/make/manual/html_node/Include.html

# Phony Targets
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
# "A phony target is one that is not really the name of a file; rather it is
#  just a name for a recipe to be executed when you make an explicit request.
#  There are two reasons to use a phony target: to avoid a conflict with a file
#  of the same name, and to improve performance."
#
# - https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html
#

# Variables
# ------------------------------------------------------------------------------  
#
.DEFAULT_GOAL := usage
COMMIT_MESSAGE := Update
PROJECT_NAME := project

# Rules
# ------------------------------------------------------------------------------  
#
# AWS Elastic Beanstalk
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
# 

eb-init-default:
	eb init
eb-deploy-default:
	eb deploy
eb-create-default: eb-check-env
	eb create $(ENV_NAME) -p $(PLATFORM) --elb-type $(LB_TYPE) -i $(INSTANCE_TYPE) --vpc --vpc.id $(VPC_ID) --vpc.ec2subnets $(VPC_SUBNET_EC2) --vpc.elbsubnets $(VPC_SUBNET_ELB) --vpc.securitygroups $(VPC_SG) -k $(SSH_KEY) --vpc.elbpublic --vpc.publicip

# https://stackoverflow.com/a/4731504/185820
eb-check-env:
ifndef ENV_NAME
	$(error ENV_NAME is undefined)
endif
ifndef LB_TYPE
	$(error LB_TYPE is undefined)
endif
ifndef INSTANCE_TYPE
	$(error INSTANCE_TYPE is undefined)
endif
ifndef VPC_ID
	$(error VPC_ID is undefined)
endif
ifndef VPC_SUBNET_EC2
	$(error VPC_SUBNET_EC2 is undefined)
endif
ifndef VPC_SUBNET_ELB
	$(error VPC_SUBNET_ELB is undefined)
endif
ifndef VPC_SG
	$(error VPC_SG is undefined)
endif
ifndef SSH_KEY
	$(error SSH_KEY is undefined)
endif

#
# Django
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
django-project:
	-mkdir -p $(PROJECT_NAME)/templates
	-touch $(PROJECT_NAME)/templates/base.html
	-django-admin startproject $(PROJECT_NAME) .
django-init:
	@$(MAKE) pip-install-django
	@$(MAKE) pg-init
	@$(MAKE) django-project
	export SETTINGS=settings.py; $(MAKE) django-settings
	git add $(PROJECT_NAME)
	git add manage.py
django-init-hub:
	git init
	hub create -p
	@$(MAKE) django-init
	@$(MAKE) make
	@$(MAKE) readme
	@$(MAKE) gitignore
	@$(MAKE) git-commit
	@$(MAKE) git-set-upstream
	@$(MAKE) git-push
	hub browse
django-migrate-default:
	python manage.py migrate
django-migrations-default:
	python manage.py makemigrations
	git add $(PROJECT_NAME)/migrations/*.py
django-serve-default:
	python manage.py runserver 0.0.0.0:8000
django-serve-webpack-default:
	cd frontend; npm run watch &
	python manage.py runserver
django-test-default:
	python manage.py test
django-shell-default:
	python manage.py shell
django-static-default:
	python manage.py collectstatic --noinput
django-su-default:
	python manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('admin', '', 'admin')"
django-user-default:
	python manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_user('user', '', 'user')"
django-loaddata-default:
	python manage.py loaddata
django-graph:
	python manage.py graph_models $(PROJECT_NAME) -o graph_models_$(PROJECT_NAME).png
django-settings:
	echo "\n# $(PROJECT_NAME)\n" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "ALLOWED_HOSTS = ['*']\n" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "import dj_database_url" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "DATABASE_URL = os.environ.get('DATABASE_URL', 'postgres://$(DB_USER):$(DB_PASS)@$(DB_HOST):$(DB_PORT)/$(PROJECT_NAME)')" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "DATABASES['default'] = dj_database_url.parse(DATABASE_URL)" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "INSTALLED_APPS.append('webpack_loader')" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "STATICFILES_DIRS.append(os.path.join(BASE_DIR, 'frontend/build'))" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "WEBPACK_LOADER = { 'MANIFEST_FILE': os.path.join(BASE_DIR, 'frontend/build/manifest.json'), }" >> $(PROJECT_NAME)/$(SETTINGS)
django-webpack-init:
	python manage.py webpack_init
django-npm-install-default:
	cd frontend; npm install
django-shell:
	python manage.py shell
.PHONY: shell
shell: django-shell
.PHONY: graph
graph: django-graph
.PHONY: migrate
migrate: django-migrate
.PHONY: migrations
migrations: django-migrations
.PHONY: static
static: django-static
.PHONY: su
su: django-su
.PHONY: user
user: django-user
.PHONY: loaddata
loaddata: django-loaddata
.PHONY: npm-install
npm-install: django-npm-install
#
# Git
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

gitignore:
	echo "bin/\nlib/\npyvenv.cfg\n__pycache__" > .gitignore
	git add .gitignore
git-branches:
	-for i in $(BRANCHES) ; do \
        git checkout -t $$i ; done
git-prune:
	git remote update origin --prune
git-commit:
	git commit -a -m $(COMMIT_MESSAGE)
git-commit-edit:
	git commit -a
git-push-default:
	git push
git-set-upstream-default:
	git push --set-upstream origin main
.PHONY: commit
commit: git-commit
.PHONY: ce
ce: commit-edit
.PHONY: cp
cp: commit-push
.PHONY: push
push: git-push
.PHONY: p
p: push
.PHONY: commit-push
commit-push: git-commit git-push
.PHONY: commit-edit
commit-edit: git-commit-edit git-push

# http://unix.stackexchange.com/a/37316
BRANCHES = `git branch -a | grep remote | grep -v HEAD | grep -v master`

#
# Jenkins
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

define PIPELINE
pipeline {
    agent any
    stages {
        stage('') {
            steps {
                echo ''
            }
        }
	}
}
endef

export PIPELINE
pipeline:
	@echo "$$PIPELINE" > Jenkinsfile

#
# Misc
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
rand:
	@openssl rand -base64 12 | sed 's/\///g'
.PHONY: r
r: rand
#
.PHONY: review
review:
ifeq ($(UNAME), Darwin)
	@open -a $(EDITOR) `find $(PROJECT_NAME) -name \*.py | grep -v __init__.py | grep -v migrations`\
		`find $(PROJECT_NAME) -name \*.html` `find $(PROJECT_NAME) -name \*.js`
else
	@echo "Unsupported"
endif
#
list-targets-default:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F:\
        '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}'\
        | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs | tr ' ' '\n' | awk\
        '{print "make "$$0}' | less  # http://stackoverflow.com/a/26339924
.PHONY: help
help: list-targets
.PHONY: h
h: list-targets
#
usage:
	@echo "Project Makefile"
	@echo "Usage:\n"
	@echo "\tmake <target>\n"
	@echo "Help:\n"
	@echo "\tmake help"
#
make:
	git add base.mk
	git add Makefile

#.PHONY: d
#d: eb-deploy

# https://stackoverflow.com/a/589260/185820
UNAME := $(shell uname)

#
# MySQL
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
my-init-default:
	-mysqladmin -u root drop $(PROJECT_NAME)
	-mysqladmin -u root create $(PROJECT_NAME)

#
# Pipenv
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
pip-env-lock-default:
	pipenv lock
pip-env-install-default:
	pipenv install
#
# Pip
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
pip-freeze-default:
	pip3 freeze | sort > $(TMPDIR)/requirements.txt
	mv -f $(TMPDIR)/requirements.txt .
pip-install-default: pip-upgrade
	pip3 install wheel
	pip3 install -r requirements.txt
pip-install-test:
	pip3 install -r requirements-test.txt
pip-install-django:
	@echo "Django\ndj-database-url\npsycopg2-binary\nwhitenoise\n" > requirements.txt
	@$(MAKE) pip-install
	@$(MAKE) freeze
	-git add requirements.txt
pip-install-sphinx:
	echo "Sphinx\n" > requirements.txt
	@$(MAKE) pip-install
	@$(MAKE) freeze
	-git add requirements.txt
pip-install-wagtail:
	pip3 install dj-database-url psycopg2-binary whitenoise wagtail python-webpack-boilerplate
pip-install-upgrade-default:
	cat requirements.txt | awk -F \= '{print $$1}' > $(TMPDIR)/requirements.txt
	mv -f $(TMPDIR)/requirements.txt .
	pip3 install -U -r requirements.txt
	$(MAKE) pip-freeze
pip-upgrade:
	pip3 install -U pip
pip-init:
	touch requirements.txt
	-git add requirements.txt
.PHONY: freeze
freeze: pip-freeze
.PHONY: pip-up
pip-up: pip-upgrade
.PHONY: lock
lock: pip-lock
#install-default: pip-install
install-test-default: pip-install-test

# https://stackoverflow.com/a/589260/185820
TMPDIR := $(shell mktemp -d)

#
# PostgreSQL
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
pg-init-default:
	-dropdb $(PROJECT_NAME)
	-createdb $(PROJECT_NAME)

.PHONY: db-init
db-init: pg-init

#
# Project Makefile
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

dev:
	python setup.py develop

#
# Python
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
black-default:
	-black *.py
#	-black $(PROJECT_NAME)/*.py
#	-black $(PROJECT_NAME)/*/*.py
isort-default:
	-isort *.py
	-isort $(PROJECT_NAME)/*.py
	-isort $(PROJECT_NAME)/*/*.py
flake-default:
	-flake8 *.py
	-flake8 $(PROJECT_NAME)/*.py
	-flake8 $(PROJECT_NAME)/*/*.py
python-serve-default:
	@echo "\n\tServing HTTP on http://0.0.0.0:8000\n"
	python -m http.server
python-virtualenv-2-6-default:
	virtualenv --python=python2.6 .
python-virtualenv-2-7-default:
	virtualenv --python=python2.7 .
python-virtualenv-3-8-default:
	python3.8 -m venv .
python-virtualenv-3-9-default:
	python3.9 -m venv .
.PHONY: virtualenv
virtualenv: python-virtualenv-3-8
.PHONY: v
v: virtualenv
.PHONY: venv
venv: virtualenv

#
# README
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

pdf-default:
	rst2pdf README.rst > README.pdf
	git add README.pdf
	$(MAKE) commit-push

readme-default:
	echo "Creating README.rst"
	@echo $(PROJECT_NAME) > README.rst
	@echo "================================================================================\n" >> README.rst
	echo "Done."
	git add README.rst

edit-default:
	vi README.rst

.PHONY: e
e: edit

open-default:
	open README.pdf
.PHONY: o
o: open

#
# Sphinx
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
sphinx-build-default:
	sphinx-build -b html -d _build/doctrees . _build/html
sphinx-init:
	$(MAKE) pip-install-sphinx
	sphinx-quickstart -q -p $(PROJECT_NAME) -a $(USER) -v 0.0.1 $(RANDIR)
	mv $(RANDIR)/* .
	rmdir $(RANDIR)
sphinx-serve-default:
	cd _build/html;python -m http.server

# https://stackoverflow.com/a/589260/185820
RANDIR := $(shell openssl rand -base64 12 | sed 's/\///g')

#
# Tidelift
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

tidelift-align-default:
	tidelift alignment --debug
tidelift-align-save-default:
	tidelift alignment save --debug
tidelift-request-all-default:
	tidelift request --all --debug

#
# Wagtail
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
wagtail-project:
	wagtail start $(PROJECT_NAME) .
wagtail-init:
	@$(MAKE) pip-install-wagtail
	@$(MAKE) pg-init
	@$(MAKE) wagtail-project
	export SETTINGS=settings/base.py; $(MAKE) django-settings
	git add $(PROJECT_NAME)
	git add requirements.txt
	git add manage.py
	git add Dockerfile
	git add .dockerignore
	git add home
	git add search
	@$(MAKE) freeze
	@$(MAKE) django-webpack-init
	git add frontend
	@$(MAKE) django-npm-install
	@$(MAKE) migrate
	@$(MAKE) su
	@$(MAKE) wagtail-home

wagtail-init-hub:
	git init
	hub create -p
	@$(MAKE) wagtail-init
	@$(MAKE) make
	@$(MAKE) readme
	@$(MAKE) gitignore
	git commit -m "wagtail-init by project-makefile"
	@$(MAKE) git-set-upstream
	@$(MAKE) git-push
	hub browse

# https://stackoverflow.com/a/649462/185820
define HOME_PAGE
{% extends "base.html" %}
{% load webpack_loader static %}

{% block body_class %}template-homepage{% endblock %}

{% block extra_css %}

  {% stylesheet_pack 'app' %}

{% endblock extra_css %}

{% block content %}

{% load webpack_loader static %}

<div class="jumbotron py-5">
  <div class="container">
    <h1 class="display-3">Hello, world!</h1>
    <p>This is a template for a simple marketing or informational website. It includes a large callout called a
      jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
    <p><a class="btn btn-primary btn-lg" href="{% url 'admin:index' %}" role="button">Learn more »</a></p>

    <div class="d-flex justify-content-center">
      <img src="{% static 'vendors/images/webpack.png' %}" class="img-fluid"/>
    </div>

  </div>
</div>

{% endblock content %}

{% block extra_js %}

{% javascript_pack 'app' 'app2' attrs='charset="UTF-8"' %}

{% endblock %}
endef

export HOME_PAGE
wagtail-home:
	@echo "$$HOME_PAGE" > home/templates/home/home_page.html

# Overrides
# ------------------------------------------------------------------------------  
#
# https://stackoverflow.com/a/49804748
%: %-default
	@ true
