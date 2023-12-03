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
