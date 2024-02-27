import json

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import DetailView
from django.views.generic.edit import UpdateView
from django.urls import reverse_lazy

from siteuser.models import User


class UserProfileView(LoginRequiredMixin, DetailView):
    model = User
    template_name = "profile.html"

    def get_object(self, queryset=None):
        return self.request.user


@method_decorator(csrf_exempt, name="dispatch")
class UpdateThemePreferenceView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body.decode("utf-8"))
            new_theme = data.get("theme")

            # Perform the logic to update the theme preference in your database or storage

            # Assuming you have a logged-in user, get the user instance
            user = request.user

            # Update the user's theme preference
            user.user_theme_preference = new_theme
            user.save()

            # For demonstration purposes, we'll just return the updated theme in the response
            response_data = {"theme": new_theme}

            return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            return JsonResponse({"error": e}, status=400)

    def http_method_not_allowed(self, request, *args, **kwargs):
        return JsonResponse({"error": "Invalid request method"}, status=405)


class UserEditView(LoginRequiredMixin, UpdateView):
    model = User
    template_name = 'user_edit.html'  # Create this template in your templates folder
    fields = ['username', 'email', 'user_theme_preference', 'bio']  # Specify the fields you want to edit

    def get_success_url(self):
        return reverse_lazy('user-profile', kwargs={'pk': self.object.pk})
