from django.urls import path
from .views import UserProfileView, UpdateThemePreferenceView

urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('update_theme_preference/', UpdateThemePreferenceView.as_view(), name='update_theme_preference'),
]
