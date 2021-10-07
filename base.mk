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

MESSAGE := Update

PROJECT := project

# https://stackoverflow.com/a/589260/185820
TMPDIR := $(shell mktemp -d)
RANDIR := $(shell openssl rand -base64 12 | sed 's/\///g')
UNAME := $(shell uname)

# http://unix.stackexchange.com/a/37316
BRANCHES = `git branch -a | grep remote | grep -v HEAD | grep -v master`

# Rules
# ------------------------------------------------------------------------------  
#
# Beanstalk
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
# 
eb-create-default:
	eb create $(ENV_NAME) --elb-type $(LB_TYPE) -i $(INSTANCE_TYPE) --vpc --vpc.id $(VPC_ID) --vpc.ec2subnets $(VPC_SUBNET_EC2) --vpc.elbsubnets $(VPC_SUBNET_ELB) --vpc.securitygroups $(VPC_SG) -k $(SSH_KEY) --vpc.elbpublic --vpc.publicip

#
# Django
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
django-project:
	-mkdir -p $(PROJECT)/templates
	-touch $(PROJECT)/templates/base.html
	-django-admin startproject $(PROJECT) .
django-init:
	@$(MAKE) pip-install-django
	@$(MAKE) pg-init
	@$(MAKE) django-project
	export SETTINGS=settings.py; $(MAKE) django-settings
	git add $(PROJECT)
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
	git add $(PROJECT)/migrations/*.py
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
	python manage.py graph_models $(PROJECT) -o graph_models_$(PROJECT).png
django-settings:
	echo "\n# $(PROJECT)\n" >> $(PROJECT)/$(SETTINGS)
	echo "ALLOWED_HOSTS = ['*']\n" >> $(PROJECT)/$(SETTINGS)
	echo "import dj_database_url" >> $(PROJECT)/$(SETTINGS)
	echo "DATABASE_URL = os.environ.get('DATABASE_URL', 'postgres://$(DB_USER):$(DB_PASS)@$(DB_HOST):$(DB_PORT)/$(PROJECT)')" >> $(PROJECT)/$(SETTINGS)
	echo "DATABASES['default'] = dj_database_url.parse(DATABASE_URL)" >> $(PROJECT)/$(SETTINGS)
	echo "INSTALLED_APPS.append('webpack_loader')" >> $(PROJECT)/$(SETTINGS)
	echo "STATICFILES_DIRS.append(os.path.join(BASE_DIR, 'frontend/build'))" >> $(PROJECT)/$(SETTINGS)
	echo "WEBPACK_LOADER = { 'MANIFEST_FILE': os.path.join(BASE_DIR, 'frontend/build/manifest.json'), }" >> $(PROJECT)/$(SETTINGS)
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
.PHONY: test
test: django-test
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
	git commit -a -m $(MESSAGE)
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
readme:
	echo "Creating README.rst"
	@echo $(PROJECT) > README.rst
	@echo "================================================================================\n" >> README.rst
	echo "Done."
	git add README.rst
#
.PHONY: review
review:
ifeq ($(UNAME), Darwin)
	@open -a $(EDITOR) `find $(PROJECT) -name \*.py | grep -v __init__.py | grep -v migrations`\
		`find $(PROJECT) -name \*.html` `find $(PROJECT) -name \*.js`
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
pdf-default:
	rst2pdf README.rst > README.pdf
	git add README.pdf
	$(MAKE) commit-push
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
#
deploy-default:
	eb deploy
.PHONY: d
d: deploy
#
# MySQL
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
my-init-default:
	-mysqladmin -u root drop $(PROJECT)
	-mysqladmin -u root create $(PROJECT)
#
# Pip
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
pip-freeze-default:
	pip freeze | sort > $(TMPDIR)/requirements.txt
	mv -f $(TMPDIR)/requirements.txt .
pip-lock-default:
	pipenv lock
pip-install-default: pip-upgrade
	pip install wheel
	pip install -r requirements.txt
pipenv-install-default:
	pipenv install -r requirements.txt
pip-install-test:
	pip install -r requirements-test.txt
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
	pip install dj-database-url psycopg2-binary whitenoise wagtail python-webpack-boilerplate
pip-install-upgrade:
	cat requirements.txt | awk -F \= '{print $$1}' > $(TMPDIR)/requirements.txt
	mv -f $(TMPDIR)/requirements.txt .
	pip install -U -r requirements.txt
	$(MAKE) pip-freeze
pip-upgrade:
	pip install -U pip
pip-init:
	touch requirements.txt
	-git add requirements.txt
.PHONY: freeze
freeze: pip-freeze
.PHONY: pip-up
pip-up: pip-upgrade
.PHONY: lock
lock: pip-lock
install-default: pip-install
install-test-default: pip-install-test
#
# PostgreSQL
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
pg-init-default:
	-dropdb $(PROJECT)
	-createdb $(PROJECT)

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
	-black $(PROJECT)/*.py
	-black $(PROJECT)/*/*.py
isort-default:
	-isort *.py
	-isort $(PROJECT)/*.py
	-isort $(PROJECT)/*/*.py
flake-default:
	-flake8 *.py
	-flake8 $(PROJECT)/*.py
	-flake8 $(PROJECT)/*/*.py
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
# Sphinx
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
sphinx-build-default:
	sphinx-build -b html -d _build/doctrees . _build/html
sphinx-init:
	$(MAKE) pip-install-sphinx
	sphinx-quickstart -q -p $(PROJECT) -a $(USER) -v 0.0.1 $(RANDIR)
	mv $(RANDIR)/* .
	rmdir $(RANDIR)
sphinx-serve-default:
	cd _build/html;python -m http.server
#
# Tidelift
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

tidelift-align:
	tidelift alignment --debug
tidelift-align-save:
	tidelift alignment save --debug
tidelift-request-all:
	  tidelift request --all --debug
.PHONY: align
align: tidelift-align

#
# Vagrant
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
vagrant-init:
	vagrant init ubuntu/bionic64
	git add Vagrantfile
	$(MAKE) vagrant-up
vagrant-up:
	vagrant up --provider virtualbox
.PHONY: vagrant
vagrant: vagrant-init
.PHONY: vm
vm: vagrant-init
vm-up: vagrant-up

#
# Wagtail
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#
wagtail-project:
	wagtail start $(PROJECT) .
wagtail-init:
	@$(MAKE) pip-install-wagtail
	@$(MAKE) pg-init
	@$(MAKE) wagtail-project
	export SETTINGS=settings/base.py; $(MAKE) django-settings
	git add $(PROJECT)
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

.PHONY: all
all-default: list-targets-default

.PHONY: clean
clean: list-targets-default

# Overrides
# ------------------------------------------------------------------------------  
#
# https://stackoverflow.com/a/49804748
%: %-default
	@ true
