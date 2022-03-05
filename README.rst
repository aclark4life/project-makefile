Project Makefile
================

A generic makefile for projects.

Why
---

I like typing ``make <target>`` to perform tasks. 🤷

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

	$ project-makefile <project_dir>
	$ cd <project_dir>
	$ make
	Project Makefile
	Usage:

		make <target>

	Help:

		make help

Example
-------

::

	$ project-makefile .
	$ make django-init
