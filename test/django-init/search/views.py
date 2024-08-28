from django.views.generic import ListView
from django.db import models
from django.db.models import Q 
from .forms import SearchForm
from .utils import get_search_models


class SearchView(ListView):
    template_name = "your_app/search_results.html"
    context_object_name = "results"
    paginate_by = 10

    def get_queryset(self):
        form = SearchForm(self.request.GET)
        query = None
        results = []

        if form.is_valid():
            query = form.cleaned_data["query"]
            search_models = get_search_models()

            for model in search_models:
                fields = [f.name for f in model._meta.fields if isinstance(f, (models.CharField, models.TextField))]
                queries = [Q(**{f"{field}__icontains": query}) for field in fields]
                model_results = model.objects.filter(queries.pop())

                for item in queries:
                    model_results = model_results.filter(item)

                results.extend(model_results)

        return results

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = SearchForm(self.request.GET)
        context["query"] = self.request.GET.get("query", "")
        return context
