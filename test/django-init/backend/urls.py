from django.contrib import admin
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path("django/", admin.site.urls),
]
if settings.DEBUG:
    urlpatterns += [path("__debug__/", include("debug_toolbar.urls"))]
urlpatterns += [path("accounts/", include("allauth.urls"))]
urlpatterns += [path("user/", include("siteuser.urls"))]
urlpatterns += [path("", include("home.urls"))]
from rest_framework import routers  # noqa
from .api import UserViewSet, api  # noqa

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)
# urlpatterns += [path("api/", include(router.urls))]
urlpatterns += [path("api/", api.urls)]
