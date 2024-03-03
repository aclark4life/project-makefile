from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.conf import settings

class User(AbstractUser):
    groups = models.ManyToManyField(Group, related_name='siteuser_set', blank=True)
    user_permissions = models.ManyToManyField(
        Permission, related_name='siteuser_set', blank=True
    )
    
    user_theme_preference = models.CharField(max_length=10, choices=settings.THEMES, default='light')
    
    bio = models.TextField(blank=True, null=True)
    rate = models.FloatField(blank=True, null=True)
