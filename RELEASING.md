## Releasing

# Steps

- Update version 

  - CHANGES.rst
  - install.py
  - setup.py

- Tag release

  - `git tag X.X.X`
  - `git push --tags`

- Create distribution

  - `python setup.py sdist --form=zip`

- Upload distribution

  - `twine upload dist/project-makefile-X.X.X.zip`
