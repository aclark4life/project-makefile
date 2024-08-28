from django import forms


class SearchForm(forms.Form):
    query = forms.CharField(max_length=100, required=True, label="Search")

