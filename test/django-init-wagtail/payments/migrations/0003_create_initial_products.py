from django.db import migrations


def create_initial_products(apps, schema_editor):
    Product = apps.get_model("payments", "Product")
    Product.objects.create(name="T-shirt", description="A cool T-shirt", price=20.00)
    Product.objects.create(name="Mug", description="A nice mug", price=10.00)
    Product.objects.create(name="Hat", description="A stylish hat", price=15.00)


class Migration(migrations.Migration):
    dependencies = [
        (
            "payments",
            "0002_set_stripe_api_keys",
        ),
    ]

    operations = [
        migrations.RunPython(create_initial_products),
    ]
