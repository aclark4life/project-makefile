from django import forms
from django.contrib.auth.forms import UserChangeForm
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit
from .models import User


class SiteUserForm(UserChangeForm):
    bio = forms.CharField(widget=forms.Textarea(attrs={"id": "editor"}), required=False)

    class Meta(UserChangeForm.Meta):
        model = User
        fields = ("username", "user_theme_preference", "bio", "rate")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = "post"
        self.helper.layout = Layout(
            Fieldset(
                "Edit Your Profile",
                "username",
                "user_theme_preference",
                "bio",
                "rate",
            ),
            ButtonHolder(Submit("submit", "Save", css_class="btn btn-primary")),
        )
