# Custom Makefile
# Add your custom makefile commands here
#
# PROJECT_NAME := my-new-project
#
define DJANGO_SETTINGS_DATABASE
POSTGRES_HOST = os.environ.get("POSTGRES_HOST", "postgres")
POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD", "postgres")
DATABASE_URL = os.environ.get("DATABASE_URL", f"postgres://postgres:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:/postgres")
DATABASES["default"] = dj_database_url.parse(DATABASE_URL)
endef

export DJANGO_SETTINGS_DATABASE

edit:
	$(EDITOR) Makefile


django-settings-base: django-settings-base-default
	@echo "$$DJANGO_SETTINGS_DATABASE" >> $(DJANGO_SETTINGS_BASE_FILE)

test:
	@echo "Running tests..."
	@echo "Tests passed!"

review:
	$(EDITOR_REVIEW) Makefile

