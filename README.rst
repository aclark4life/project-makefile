Project Makefile
================

A generic makefile for projects.

Why
---

I like to type ``make <task>`` to perform tasks. 🤷

Installation
------------

::

	pip install project-makefile

Runtime dependencies
--------------------

Requires ``curl`` in ``PATH``.

Usage
-----

::

    Project Makefile
    Usage:
    
    	make <project_dir>
    
    Help:
    
    	make help

Example
-------

::

	project-makefile .
	make django-init


Troubleshooting
---------------

::

    $ make --debug
    GNU Make 3.81
    Copyright (C) 2006  Free Software Foundation, Inc.
    This is free software; see the source for copying conditions.
    There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A
    PARTICULAR PURPOSE.

    This program built for i386-apple-darwin11.3.0
    Reading makefiles...
    Updating goal targets....
     File `git-commit-push' does not exist.
       File `git-commit-push-default' does not exist.
         File `git-commit' does not exist.
           File `git-commit-default' does not exist.
          Must remake target `git-commit-default'.
    git commit -a -m Update
    [main a5fe753] Update
     1 file changed, 8 insertions(+)
          Successfully remade target file `git-commit-default'.
        Must remake target `git-commit'.
        Successfully remade target file `git-commit'.
         File `git-push' does not exist.
           File `git-push-default' does not exist.
          Must remake target `git-push-default'.
    git push
    Enumerating objects: 5, done.
    Counting objects: 100% (5/5), done.
    Delta compression using up to 8 threads
    Compressing objects: 100% (3/3), done.
    Writing objects: 100% (3/3), 322 bytes | 322.00 KiB/s, done.
    Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
    remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
    To github.com:project-makefile/project-makefile.git
       12e6f1c..a5fe753  main -> main
          Successfully remade target file `git-push-default'.
        Must remake target `git-push'.
        Successfully remade target file `git-push'.
      Must remake target `git-commit-push-default'.
      Successfully remade target file `git-commit-push-default'.
    Must remake target `git-commit-push'.
    Successfully remade target file `git-commit-push'.


References
----------

- https://unix.stackexchange.com/a/37316
- https://stackoverflow.com/a/589260/185820
- https://stackoverflow.com/a/4731504/185820
- https://stackoverflow.com/a/26339924
- https://stackoverflow.com/a/49804748
