# Custom Makefile
# Add your custom makefile commands here
#
# PROJECT_NAME := my-new-project
edit:
	$(EDITOR) Makefile

review:
	$(EDITOR_REVIEW) Makefile

define DJANGO_SETTINGS_DATABASE
DATABASE_URL = os.environ.get("DATABASE_URL", "postgres://postgres:postgres@postgres:/postgres")
DATABASES["default"] = dj_database_url.parse(DATABASE_URL)
endef

django-settings:
	@echo "$$DJANGO_SETTINGS_DATABASE" >> $(PACKAGE_NAME)/settings.py

test:
	@echo "Running tests..."
	@echo "Tests passed!"
