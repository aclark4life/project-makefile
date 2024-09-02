from django.contrib import admin
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path("django/", admin.site.urls),
]
