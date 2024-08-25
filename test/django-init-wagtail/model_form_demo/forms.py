from django import forms
from .models import ModelFormDemo


class ModelFormDemoForm(forms.ModelForm):
    class Meta:
        model = ModelFormDemo
        fields = ["name", "email", "age", "is_active"]
