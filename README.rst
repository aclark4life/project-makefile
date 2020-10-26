Project Makefile
================

A generic Makefile for Django projects

Why
---

- I like typing ``make <target>`` to perform tasks.

Installation
------------

::

    curl -O https://raw.githubusercontent.com/aclark4life/project-makefile/master/base.mk
    curl -O https://raw.githubusercontent.com/aclark4life/project-makefile/master/Makefile

Slides
------

- https://slides.com/aclark/project-makefile#/

Usage
-----

::

    $ make
    Project Makefile
    Usage:

        make <target>

    Help:

        make help

::

    $ make help
    make ce
    make commit
    make commit-edit
    make commit-push
    make commit-push-up
    make cp
    make d
    make deploy-default
    make django-config
    make django-graph
    make django-init
    make django-loaddata-default
    make django-migrate-default
    make django-migrations-default
    make django-serve-default
    make django-shell
    make django-start
    make django-static
    make django-su
    make django-test
    make django-wc
    make django-yapf
    make freeze
    make git-branches
    make git-commit
    make git-commit-edit
    make git-ignore
    make git-init
    make git-prune
    make git-push
    make git-push-up
    make graph
    make h
    make help
    make loaddata
    make make
    make migrate
    make migrations
    make my-init-default
    make p
    make pg-init-default
    make pip-freeze-default
    make pip-install-default
    make pip-install-django
    make pip-install-sphinx
    make pip-install-test
    make pip-upgrade-default
    make push
    make python-serve-default
    make python-virtualenv-2-6-default
    make python-virtualenv-2-7-default
    make python-virtualenv-3-8-default
    make python-virtualenv-3-9-default
    make r
    make rand
    make readme
    make review
    make sphinx-build-default
    make sphinx-init
    make sphinx-serve-default
    make static
    make su
    make test
    make usage
    make vagrant
    make vagrant-init
    make vagrant-up
    make vm
    make vm-up
