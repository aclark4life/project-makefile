from setuptools import find_packages
from setuptools import setup

VERSION = "0.0.1"

setup(
    author="Alex Clark",
    author_email="aclark@aclark.net",
    classifiers=[],
    description="A generic makefile for projects.",
    keywords="",
    license="",
    include_package_data=True,
    install_requires=[],
    long_description=open("README.rst").read() + "\n" + open("CHANGES.rst").read(),
    name="project-makefile",
    namespace_packages=[],
    packages=find_packages(),
    test_suite="",
    url="",
    version=VERSION,
    zip_safe=False,
    # scripts=['project/makefile/project-makefile.py'],
    entry_points={
        "console_scripts": ["project-makefile=project.makefile.project_makefile:main"],
    },
)
