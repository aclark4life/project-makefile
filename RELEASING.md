## Releasing

# Steps

- Update version 

  - CHANGES.rst
  - install.py
  - setup.py
  - RELEASING.md

- Tag release

```
git tag 0.0.9
git push --tags
```

- Create distribution

```
python setup.py sdist --format=zip
```

- Upload distribution

```
twine upload dist/project-makefile-0.0.9.zip
```
