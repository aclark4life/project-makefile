from django.contrib import admin
from .models import ModelFormDemo


@admin.register(ModelFormDemo)
class ModelFormDemoAdmin(admin.ModelAdmin):
    pass
