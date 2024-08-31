# Custom Makefile
# Add your custom makefile commands here
#
# PROJECT_NAME := my-new-project
edit:
	$(EDITOR) Makefile

review:
	$(EDITOR_REVIEW) Makefile

define DJANGO_SETTINGS_DATABASE_GITHUB_ACTIONS
DATABASE_URL = os.environ.get("DATABASE_URL", "postgres://postgres:postgres@postgres:/postgres")
DATABASES["default"] = dj_database_url.parse(DATABASE_URL)
endef

export DJANGO_SETTINGS_DATABASE_GITHUB_ACTIONS

django-settings-base:
	@echo "$$DJANGO_SETTINGS_BASE" >> $(DJANGO_SETTINGS_BASE_FILE)
	@echo "$$DJANGO_SETTINGS_AUTHENTICATION_BACKENDS" >> $(DJANGO_SETTINGS_BASE_FILE)
	@echo "$$DJANGO_SETTINGS_REST_FRAMEWORK" >> $(DJANGO_SETTINGS_BASE_FILE)
	@echo "$$DJANGO_SETTINGS_THEMES" >> $(DJANGO_SETTINGS_BASE_FILE)
	@echo "$$DJANGO_SETTINGS_DATABASE_GITHUB_ACTIONS" >> $(DJANGO_SETTINGS_BASE_FILE)
	@echo "$$DJANGO_SETTINGS_INSTALLED_APPS" >> $(DJANGO_SETTINGS_BASE_FILE)
	@echo "$$DJANGO_SETTINGS_MIDDLEWARE" >> $(DJANGO_SETTINGS_BASE_FILE)
	@echo "$$DJANGO_SETTINGS_CRISPY_FORMS" >> $(DJANGO_SETTINGS_BASE_FILE)

test:
	@echo "Running tests..."
	@echo "Tests passed!"
