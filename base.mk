# Project Makefile
# ================
#
# A generic makefile for projects
#
# - https://github.com/project-makefile/project-makefile
#
#
# License
# ------------------------------------------------------------------------------ 
#
# Copyright 2016—2023 Jeffrey A. Clark (Alex)
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

GIT_MESSAGE := Update

# http://unix.stackexchange.com/a/37316
GIT_BRANCHES = `git branch -a \
	| grep remote \
	| grep -v HEAD \
	| grep -v main \
	| grep -v master`

PROJECT_NAME := project

# https://stackoverflow.com/a/589260/185820
RANDIR := $(shell openssl rand -base64 12 | sed 's/\///g')

# https://stackoverflow.com/a/589260/185820
TMPDIR := $(shell mktemp -d)

# https://stackoverflow.com/a/589260/185820
UNAME := $(shell uname)

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
    <a href="/" class="text-decoration-none text-dark"><h1 class="display-3">Hello, world!</h1></a>
    <p>This is a template for a simple marketing or informational website. It includes a large callout called a
      jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
    <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
      <a type="button" class="btn btn-primary" href="{% url 'admin:index' %}" role="button">Django Admin</a>
      <a type="button" class="btn btn-primary" href="/api" target="_blank" role="button">Web Browseable API</a>
	  <a type="button" class="btn btn-primary" href="{% url 'account_login' %}" role="button">Login</a>
    </div>
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
define JENKINS_FILE
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
define AUTHENTICATION_BACKENDS
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]
endef
define ALL_AUTH
from django.conf import settings
from django.urls import include, path
from django.contrib import admin

from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from search import views as search_views

from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

urlpatterns = [
	path('accounts/', include('allauth.urls')),
    path('admin/', admin.site.urls),
    path('cms/', include(wagtailadmin_urls)),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# https://www.django-rest-framework.org/#example
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = urlpatterns + [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns = urlpatterns + [
    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    path("", include(wagtail_urls)),

    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    path("pages/", include(wagtail_urls)),
]
endef
define REST_FRAMEWORK
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}
endef
export HOME_PAGE
export JENKINS_FILE
export ALL_AUTH
export REST_FRAMEWORK
export AUTHENTICATION_BACKENDS

# Rules
# ------------------------------------------------------------------------------  
#
# AWS Elastic Beanstalk
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
# 

# https://stackoverflow.com/a/4731504/185820
eb-check-env:
ifndef ENV_NAME
	$(error ENV_NAME is undefined)
endif
ifndef INSTANCE_TYPE
	$(error INSTANCE_TYPE is undefined)
endif
ifndef LB_TYPE
	$(error LB_TYPE is undefined)
endif
ifndef SSH_KEY
	$(error SSH_KEY is undefined)
endif
ifndef VPC_ID
	$(error VPC_ID is undefined)
endif
ifndef VPC_SG
	$(error VPC_SG is undefined)
endif
ifndef VPC_SUBNET_EC2
	$(error VPC_SUBNET_EC2 is undefined)
endif
ifndef VPC_SUBNET_ELB
	$(error VPC_SUBNET_ELB is undefined)
endif

eb-create-default: eb-check-env
	eb create $(ENV_NAME) \
		-i $(INSTANCE_TYPE) \
		-k $(SSH_KEY) \
		-p $(PLATFORM) \
		--elb-type $(LB_TYPE) \
		--vpc \
		--vpc.id $(VPC_ID) \
		--vpc.elbpublic \
		--vpc.ec2subnets $(VPC_SUBNET_EC2) \
		--vpc.elbsubnets $(VPC_SUBNET_ELB) \
		--vpc.publicip \
		--vpc.securitygroups $(VPC_SG)

eb-deploy-default:
	eb deploy

eb-init-default:
	eb init

#
# Django
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

django-graph-default:
	python manage.py graph_models $(PROJECT_NAME) -o graph_models_$(PROJECT_NAME).png

django-loaddata-default:
	python manage.py loaddata

django-migrate-default:
	python manage.py migrate

django-migrations-default:
	python manage.py makemigrations
	git add $(PROJECT_NAME)/migrations/*.py

django-project-default:
	mkdir -p $(PROJECT_NAME)/templates
	touch $(PROJECT_NAME)/templates/base.html
	django-admin startproject $(PROJECT_NAME) .

django-serve-default:
	cd frontend; npm run watch &
	python manage.py runserver 0.0.0.0:8000

django-serve-prod-default:
	cd frontend; npm run watch &
	python manage.py runserver 0.0.0.0:8000 --settings=$(PROJECT_NAME).settings.production

django-settings-default:
	echo "\n# $(PROJECT_NAME)\n" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "ALLOWED_HOSTS = ['*']\n" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "import dj_database_url, os" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "DATABASE_URL = os.environ.get('DATABASE_URL', \
		'postgres://$(DB_USER):$(DB_PASS)@$(DB_HOST):$(DB_PORT)/$(PROJECT_NAME)')" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "DATABASES['default'] = dj_database_url.parse(DATABASE_URL)" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "INSTALLED_APPS.append('webpack_boilerplate')" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "INSTALLED_APPS.append('rest_framework')" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "INSTALLED_APPS.append('allauth')" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "INSTALLED_APPS.append('allauth.account')" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "INSTALLED_APPS.append('allauth.socialaccount')" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "MIDDLEWARE.append('allauth.account.middleware.AccountMiddleware')" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "STATICFILES_DIRS = [os.path.join(BASE_DIR, 'frontend/build')]" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "WEBPACK_LOADER = { 'MANIFEST_FILE': os.path.join(BASE_DIR, 'frontend/build/manifest.json'), }" >> \
		$(PROJECT_NAME)/$(SETTINGS)
	echo "$$REST_FRAMEWORK" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "LOGIN_REDIRECT_URL = '/'" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'" >> $(PROJECT_NAME)/$(SETTINGS)
	echo "$$AUTHENTICATION_BACKENDS" >> $(PROJECT_NAME)/$(SETTINGS)

django-shell-default:
	python manage.py shell

django-static-default:
	python manage.py collectstatic --noinput

django-su-default:
	python manage.py shell -c "from django.contrib.auth.models import User; \
		User.objects.create_superuser('admin', '', 'admin')"

django-test-default:
	python manage.py test

django-user-default:
	python manage.py shell -c "from django.contrib.auth.models import User; \
		User.objects.create_user('user', '', 'user')"

django-urls-default:
	echo "$$ALL_AUTH" > $(PROJECT_NAME)/$(URLS)

django-npm-install-default:
	cd frontend; npm install

django-npm-test-default:
	cd frontend; npm run test

django-npm-build-default:
	cd frontend; npm run build

django-open-default:
	open http://0.0.0.0:8000

#
# Git
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

gitignore-default:
	echo "bin/\nlib/\nlib64\nshare/\npyvenv.cfg\n__pycache__\n.elasticbeanstalk/\n_build/" > .gitignore
	git add .gitignore
	git commit -a -m "Add .gitignore"
	git push

git-branches-default:
	-for i in $(GIT_BRANCHES) ; do \
        git checkout -t $$i ; done

git-commit-default:
	git commit -a -m $(GIT_MESSAGE)

git-commit-edit-default:
	git commit -a

git-commit-push-default: git-commit git-push

git-edit-push-default: git-commit-edit git-push

git-prune-default:
	git remote update origin --prune

git-push-default:
	git push

git-set-upstream-default:
	git push --set-upstream origin main

git-commit-empty-default:
	git commit --allow-empty -m "Empty-Commit" ; git push

#
# iOS
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

xcodegen:
	xcodegen -p $(PROJECT)

#
# Misc
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

build-default:
	$(MAKE) readme-build

black-default:
	-black *.py
	-black $(PROJECT_NAME)/*.py
	-black $(PROJECT_NAME)/*/*.py
	-black $(PROJECT_NAME)/*/*/*.py
	-git commit -a -m "A one time black event"
	git push

djlint-default:
	-djlint --reformat *.html
	-djlint --reformat $(PROJECT_NAME)/*.html
	-djlint --reformat $(PROJECT_NAME)/*/*.html
	-djlint --reformat $(PROJECT_NAME)/*/*/*.html
	-git commit -a -m "A one time djlint event"
	git push

flake-default:
	-flake8 *.py
	-flake8 $(PROJECT_NAME)/*.py
	-flake8 $(PROJECT_NAME)/*/*.py
	-flake8 $(PROJECT_NAME)/*/*/*.py

help-default:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F:\
        '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}'\
        | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs | tr ' ' '\n' | awk\
        '{print "make "$$0}' | less  # http://stackoverflow.com/a/26339924

isort-default:
	-isort *.py
	-isort $(PROJECT_NAME)/*.py
	-isort $(PROJECT_NAME)/*/*.py
	-git commit -a -m "A one time isort event"
	git push

jenkins-file:
	@echo "$$JENKINS_FILE" > Jenkinsfile

my-init-default:
	-mysqladmin -u root drop $(PROJECT_NAME)
	-mysqladmin -u root create $(PROJECT_NAME)

pg-init-default:
	-dropdb $(PROJECT_NAME)
	-createdb $(PROJECT_NAME)

python-serve-default:
	@echo "\n\tServing HTTP on http://0.0.0.0:8000\n"
	python -m http.server

rand-default:
	@openssl rand -base64 12 | sed 's/\///g'

review-default:
ifeq ($(UNAME), Darwin)
	@open -a $(REVIEW_EDITOR) `find $(PROJECT_NAME) -name \*.py | grep -v migrations`\
		`find $(PROJECT_NAME) -name \*.html` `find $(PROJECT_NAME) -name \*.js`
else
	@echo "Unsupported"
endif

usage-default:
	@echo "Project Makefile"
	@echo "Usage:\n"
	@echo "\tmake <project_dir>\n"
	@echo "Help:\n"
	@echo "\tmake help"

make-default:
	git add base.mk
	git add Makefile
	git commit -a -m "Add project-makefile files"
	git push

init-default: gitignore make pip-init readme-init 

serve-default: django-serve

serve-prod-default: django-serve-prod

open-default: django-open

ruff-default:
	-ruff *.py
	-ruff $(PROJECT_NAME)/*.py
	-ruff $(PROJECT_NAME)/*/*.py
	-git commit -a -m "A one time ruff event"
	git push

#
# Pip
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

pip-freeze-default:
	pip3 freeze | sort > $(TMPDIR)/requirements.txt
	mv -f $(TMPDIR)/requirements.txt .
	git add requirements.txt
	git commit -a -m "Freezing requirements."
	git push

pip-install-default: pip-upgrade
	pip3 install wheel
	pip3 install -r requirements.txt

pip-install-test-default:
	pip3 install -r requirements-test.txt

pip-install-dev-default:
	pip3 install -r requirements-dev.txt

pip-install-upgrade-default:
	cat requirements.txt | awk -F \= '{print $$1}' > $(TMPDIR)/requirements.txt
	mv -f $(TMPDIR)/requirements.txt .
	pip3 install -U -r requirements.txt
	$(MAKE) pip-freeze

pip-upgrade:
	pip3 install -U pip

pip-init-default:
	touch requirements.txt
	-git add requirements.txt

#
# Readme
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

readme-init-default:
	@echo $(PROJECT_NAME) > README.rst
	@echo "================================================================================\n" >> README.rst
	@git add README.rst
	git commit -a -m "Add readme"
	git push

readme-edit-default:
	vi README.rst

readme-open-default:
	open README.pdf

readme-build-default:
	rst2pdf README.rst

#
# Sphinx
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

sphinx-init:
	$(MAKE) sphinx-install
	sphinx-quickstart -q -p $(PROJECT_NAME) -a $(USER) -v 0.0.1 $(RANDIR)
	mv $(RANDIR)/* .
	rmdir $(RANDIR)

sphinx-install:
	echo "Sphinx\n" > requirements.txt
	@$(MAKE) pip-install
	@$(MAKE) pip-freeze
	-git add requirements.txt

sphinx-build-default:
	sphinx-build -b html -d _build/doctrees . _build/html

sphinx-build-pdf-default:
	sphinx-build -b rinoh . _build/rinoh

sphinx-serve-default:
	cd _build/html;python -m http.server

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

wagtail-init-default: db-init wagtail-install
	wagtail start $(PROJECT_NAME) .
	$(MAKE) pip-freeze
	export SETTINGS=settings/base.py; $(MAKE) django-settings
	export URLS=urls.py; $(MAKE) django-urls
	-git add $(PROJECT_NAME)
	-git add requirements.txt
	-git add manage.py
	-git add Dockerfile
	-git add .dockerignore
	-git add home
	-git add search
	@$(MAKE) django-migrate
	@$(MAKE) su
	@echo "$$HOME_PAGE" > home/templates/home/home_page.html
	python manage.py webpack_init --skip-checks
	-git add frontend
	-git commit -a -m "Add frontend"
	@$(MAKE) django-npm-install
	-@$(MAKE) cp
	@$(MAKE) isort
	@$(MAKE) black
	-@$(MAKE) cp
	@$(MAKE) flake
	@$(MAKE) serve

wagtail-install-default:
	pip3 install dj-database-url django-allauth djangorestframework psycopg2-binary python-webpack-boilerplate wagtail

#
# .PHONY
# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
#

# django --------------------------------------------------------------------------------

.PHONY: django-init
django-init: wagtail-init

.PHONY: loaddata
loaddata: django-loaddata

.PHONY: load
load: loaddata

.PHONY: migrate
migrate: django-migrate

.PHONY: migrations
migrations: django-migrations

.PHONY: npm-install
npm-install: django-npm-install

.PHONY: static
static: django-static

.PHONY: su
su: django-su

.PHONY: test
test: django-test

.PHONY: user
user: django-user

.PHONY: pack
pack: django-npm-build

# misc --------------------------------------------------------------------------------

.PHONY: readme
readme: readme-init

.PHONY: s
s: serve

.PHONY: sp
sp: serve-prod

.PHONY: b
b: build

# readme --------------------------------------------------------------------------------

.PHONY: edit
edit: readme-edit

.PHONY: e
e: edit

.PHONY: o
o: open

# git --------------------------------------------------------------------------------

.PHONY: ce
ce: git-commit-edit git-push

.PHONY: cp
cp: git-commit-push

.PHONY: e
empty: git-commit-empty

# pip --------------------------------------------------------------------------------

.PHONY: freeze
freeze: pip-freeze

.PHONY: install
install: pip-install

.PHONY: install-test
install-test: pip-install-test

.PHONY: install-dev
install-dev: pip-install-dev

# --------------------------------------------------------------------------------

.PHONY: db-init
db-init: pg-init

# --------------------------------------------------------------------------------

.PHONY: deploy
deploy: eb-deploy
.PHONY: d
d: deploy

# --------------------------------------------------------------------------------

.PHONY: h
h: help

# --------------------------------------------------------------------------------

.PHONY: r
r: rand

# Overrides
# ------------------------------------------------------------------------------  
#
# https://stackoverflow.com/a/49804748
%: %-default
	@ true
