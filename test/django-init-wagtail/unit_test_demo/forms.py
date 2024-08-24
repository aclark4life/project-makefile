from django import forms
from .models import UnitTestDemoModel

class UnitTestDemoForm(forms.ModelForm):
    class Meta:
        model = UnitTestDemoModel
        fields = ["field1", "field2"]
