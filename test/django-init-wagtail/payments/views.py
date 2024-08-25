from django.conf import settings
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import TemplateView, View, ListView, DetailView
import stripe
from .models import Product, Order

stripe.api_key = settings.STRIPE_TEST_SECRET_KEY


class ProductListView(ListView):
    model = Product
    template_name = "payments/product_list.html"
    context_object_name = "products"


class ProductDetailView(DetailView):
    model = Product
    template_name = "payments/product_detail.html"
    context_object_name = "product"


class CheckoutView(View):
    template_name = "payments/checkout.html"

    def get(self, request, *args, **kwargs):
        products = Product.objects.all()
        return render(request, self.template_name, {"products": products})

    def post(self, request, *args, **kwargs):
        product_id = request.POST.get("product_id")
        product = get_object_or_404(Product, id=product_id)

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": product.name,
                        },
                        "unit_amount": int(product.price * 100),
                    },
                    "quantity": 1,
                }
            ],
            mode="payment",
            success_url="http://localhost:8000/payments/success/",
            cancel_url="http://localhost:8000/payments/cancel/",
        )

        Order.objects.create(product=product, stripe_checkout_session_id=session.id)
        return redirect(session.url, code=303)


class SuccessView(TemplateView):

    template_name = "payments/success.html"


class CancelView(TemplateView):

    template_name = "payments/cancel.html"
