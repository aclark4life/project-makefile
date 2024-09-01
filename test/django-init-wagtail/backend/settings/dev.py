# project-makefile
from .base import *  # noqa

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ["*"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

try:
    from .local import *  # noqa
except ImportError:
    pass

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "DEBUG",
            "propagate": True,
        },
    },
}

INTERNAL_IPS = [
    "127.0.0.1",
]

MIDDLEWARE.append("debug_toolbar.middleware.DebugToolbarMiddleware")  # noqa
MIDDLEWARE.append("hijack.middleware.HijackUserMiddleware")  # noqa
INSTALLED_APPS.append("django.contrib.admindocs")  # noqa
SECRET_KEY = "j3RfAyitwvrFtHS+OGrZExgasm7poofFkav1b2/r1PAN8nz003I7G7eZWdV7hPcf"
