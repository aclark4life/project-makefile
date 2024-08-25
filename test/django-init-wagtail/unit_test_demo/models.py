from django.db import models

class UnitTestDemoModel(models.Model):
    field1 = models.CharField(max_length=100)
    field2 = models.CharField(max_length=100)

    def __str__(self):
        return "Expected String Representation"
