from django.db import migrations
import os
import secrets
import logging

logger = logging.getLogger(__name__)


def generate_default_key():
    return "sk_test_" + secrets.token_hex(24)


def set_stripe_api_keys(apps, schema_editor):
    # Get the Stripe API Key model
    APIKey = apps.get_model("djstripe", "APIKey")

    # Fetch the keys from environment variables or generate default keys
    test_secret_key = os.environ.get("STRIPE_TEST_SECRET_KEY", generate_default_key())
    live_secret_key = os.environ.get("STRIPE_LIVE_SECRET_KEY", generate_default_key())

    logger.info("STRIPE_TEST_SECRET_KEY: %s", test_secret_key)
    logger.info("STRIPE_LIVE_SECRET_KEY: %s", live_secret_key)

    # Check if the keys are not already in the database
    if not APIKey.objects.filter(secret=test_secret_key).exists():
        APIKey.objects.create(secret=test_secret_key, livemode=False)
        logger.info("Added test secret key to the database.")
    else:
        logger.info("Test secret key already exists in the database.")

    if not APIKey.objects.filter(secret=live_secret_key).exists():
        APIKey.objects.create(secret=live_secret_key, livemode=True)
        logger.info("Added live secret key to the database.")
    else:
        logger.info("Live secret key already exists in the database.")


class Migration(migrations.Migration):

    dependencies = [
        ("payments", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(set_stripe_api_keys),
    ]
