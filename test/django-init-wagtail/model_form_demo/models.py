from django.db import models
from django.shortcuts import reverse


class ModelFormDemo(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name or f"test-model-{self.pk}"

    def get_absolute_url(self):
        return reverse("model_form_demo_detail", kwargs={"pk": self.pk})
