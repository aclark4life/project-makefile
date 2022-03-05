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

Example
-------

::

	$ project-makefile .
	$ make django-init
