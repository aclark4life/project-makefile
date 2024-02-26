from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-2c^n5#iblhk^k@^dy@_z)2hbn4t30w5^k1w^35!(zvy-@ga2*!"

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ["*"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


try:
    from .local import *
except ImportError:
    pass
INSTALLED_APPS.append("debug_toolbar")
MIDDLEWARE.append("debug_toolbar.middleware.DebugToolbarMiddleware")
MIDDLEWARE.append("hijack.middleware.HijackUserMiddleware")
INTERNAL_IPS = [
    "127.0.0.1",
]
