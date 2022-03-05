Project Makefile
================

A generic makefile for projects.

Why
---

- I like typing ``make <target>`` to perform tasks. 🤷

::


     
                                     _________
             This             _.--""'-----,   `"--.._
           Makefile        .-''   _/_      ; .'"----,`-,
                         .'      :___:     ; :      ;;`.`.
                        .      _.- _.-    .' :      ::  `..
                     __;..----------------' :: ___  ::   ;;
                .--"". '           ___.....`:=(___)-' :--'`.
              .'   .'         .--''__       :       ==:    ;
          .--/    /        .'.''     ``-,   :         :   '`-.
       ."', :    /       .'-`\\       .--.\ :         :  ,   _\
      ;   ; |   ;       /:'  ;;      /__  \\:         :  :  /_\\
      |\_/  |   |      / \__//      /"--\\ \:         :  : ;|`\|    
      : "  /\__/\____//   """      /     \\ :         :  : :|'||
    ["""""""""--------........._  /      || ;      __.:--' :|//|
     "------....______         ].'|      // |--"""'__...-'`\ \//
       `| GNUMAKE |__;_...--'": :  \    //  |---"""      \__\_/
         """""""""'            \ \  \_.//  /
           `---'                \ \_     _'
                                 `--`---'  dp

Via https://www.asciiart.eu/vehicles/cars

Installation
------------

::
	pip install project-makefile

Slides
------

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
    make b
    make black-default
    make build
    make ce
    make cp
    make d
    make db-init
    make deploy
    make django-graph-default
    make django-init
    make django-loaddata-default
    make django-migrate-default
    make django-migrations-default
    make django-npm-install-default
    make django-project-default
    make django-serve-default
    make django-settings-default
    make django-shell-default
    make django-static-default
    make django-su-default
    make django-test-default
    make django-urls-default
    make django-user-default
    make e
    make eb-check-env
    make eb-create-default
    make eb-deploy-default
    make eb-init-default
    make edit
    make flake-default
    make freeze
    make git-branches-default
    make git-commit-default
    make git-commit-edit-default
    make git-commit-push-default
    make git-edit-push-default
    make git-prune-default
    make git-push-default
    make git-set-upstream-default
    make gitignore-default
    make h
    make init-default
    make install
    make install-test
    make isort-default
    make jenkins-file
    make load
    make loaddata
    make make-default
    make migrate
    make my-init-default
    make npm-install
    make o
    make open
    make pdf-build-default
    make pg-init-default
    make pip-freeze-default
    make pip-init-default
    make pip-install-default
    make pip-install-test-default
    make pip-install-upgrade-default
    make pip-upgrade
    make python-serve-default
    make r
    make rand-default
    make readme-build-default
    make readme-edit-default
    make readme-init-default
    make readme-open-default
    make review-default
    make serve
    make sphinx-build-default
    make sphinx-init
    make sphinx-install
    make sphinx-serve-default
    make static
    make su
    make test
    make tidelift-align-default
    make tidelift-align-save-default
    make tidelift-request-all-default
    make usage-default
    make user
    make wagtail-init-default
    make wagtail-install-default
