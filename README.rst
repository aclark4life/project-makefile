Project Makefile
================

A generic makefile for projects.

Why
---

- I like typing ``make <target>`` to perform tasks. 🤷

Slides
------

- https://slides.com/aclark/project-makefile

Installation
------------

::

    pip install project-makefile

.. slides

    Slides
    ------

    .. image:: screenshot.png

    - https://slides.com/aclark/project-makefile#/

Usage
-----

Requires ``curl`` in ``PATH``


::

    $ project-makefile <project_dir>
    $ cd <project_dir>
    $ make
    Project Makefile
    Usage:

        make <target>

    Help:

        make help

::

    $ make help
    make align
    make all
    make all-default
    make black-default
    make ce
    make clean
    make commit
    make commit-edit
    make commit-push
    make cp
    make d
    make db-init
    make deploy-default
    make django-graph
    make django-init
    make django-init-hub
    make django-loaddata-default
    make django-migrate-default
    make django-migrations-default
    make django-npm-install-default
    make django-project
    make django-serve-default
    make django-serve-webpack-default
    make django-settings
    make django-shell
    make django-shell-default
    make django-static-default
    make django-su-default
    make django-test-default
    make django-user-default
    make django-webpack-init
    make eb-create-default
    make flake-default
    make freeze
    make git-branches
    make git-commit
    make git-commit-edit
    make git-prune
    make git-push-default
    make git-set-upstream-default
    make gitignore
    make graph
    make h
    make help
    make install-default
    make install-test-default
    make isort-default
    make loaddata
    make lock
    make make
    make migrate
    make migrations
    make my-init-default
    make npm-install
    make p
    make pdf-default
    make pg-init-default
    make pip-freeze-default
    make pip-init
    make pip-install-default
    make pip-install-django
    make pip-install-sphinx
    make pip-install-test
    make pip-install-upgrade
    make pip-install-wagtail
    make pip-lock-default
    make pip-up
    make pip-upgrade
    make pipeline
    make pipenv-install-default
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
    make shell
    make sphinx-build-default
    make sphinx-init
    make sphinx-serve-default
    make static
    make su
    make test
    make tidelift-align
    make tidelift-align-save
    make tidelift-request-all
    make usage
    make user
    make v
    make vagrant
    make vagrant-init
    make vagrant-up
    make venv
    make virtualenv
    make vm
    make vm-up
    make wagtail-home
    make wagtail-init
    make wagtail-init-hub
    make wagtail-project
