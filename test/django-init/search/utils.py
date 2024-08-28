from django.apps import apps
from django.conf import settings

def get_search_models():
    models = []
    for model_path in settings.SEARCH_MODELS:
        app_label, model_name = model_path.split(".")
        model = apps.get_model(app_label, model_name)
        models.append(model)
    return models
