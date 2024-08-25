from django import forms


class PaymentsForm(forms.Form):
    stripeToken = forms.CharField(widget=forms.HiddenInput())
    amount = forms.DecimalField(
        max_digits=10, decimal_places=2, widget=forms.HiddenInput()
    )
