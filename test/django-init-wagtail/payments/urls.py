from django.urls import path
from .views import (
    CheckoutView,
    SuccessView,
    CancelView,
    ProductListView,
    ProductDetailView,
)

urlpatterns = [
    path("", ProductListView.as_view(), name="product_list"),
    path("product/<int:pk>/", ProductDetailView.as_view(), name="product_detail"),
    path("checkout/", CheckoutView.as_view(), name="checkout"),
    path("success/", SuccessView.as_view(), name="success"),
    path("cancel/", CancelView.as_view(), name="cancel"),
]
