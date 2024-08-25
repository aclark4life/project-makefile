from django.urls import path
from .views import logging_demo

urlpatterns = [
    path("", logging_demo, name="logging_demo"),
]
