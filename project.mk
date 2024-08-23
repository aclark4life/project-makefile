# Custom Makefile
# Add your custom makefile commands here
#
# PROJECT_NAME := my-new-project
edit:
	nvim Makefile

logo:
	python project_makefile/logo.py

review:
	$(EDITOR_REVIEW) Makefile
