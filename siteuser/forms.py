from django import forms
from django.contrib.auth.forms import UserChangeForm
from .models import User


class SiteUserForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = ()

    bio = forms.CharField(widget=forms.Textarea(attrs={"id": "editor"}), required=False)
