from django.urls import path
from .views import (
    ModelFormDemoListView,
    ModelFormDemoCreateView,
    ModelFormDemoUpdateView,
    ModelFormDemoDetailView,
)

urlpatterns = [
    path("", ModelFormDemoListView.as_view(), name="model_form_demo_list"),
    path("create/", ModelFormDemoCreateView.as_view(), name="model_form_demo_create"),
    path(
        "<int:pk>/update/",
        ModelFormDemoUpdateView.as_view(),
        name="model_form_demo_update",
    ),
    path("<int:pk>/", ModelFormDemoDetailView.as_view(), name="model_form_demo_detail"),
]
