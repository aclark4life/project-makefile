from django import forms
from django.contrib.auth.forms import UserChangeForm
from .models import User

class SiteUserForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = ("username", "user_theme_preference", "bio", "rate")

    bio = forms.CharField(widget=forms.Textarea(attrs={"id": "editor"}), required=False)
