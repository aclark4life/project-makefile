from django.views.generic import ListView, CreateView, UpdateView, DetailView
from .models import ModelFormDemo
from .forms import ModelFormDemoForm


class ModelFormDemoListView(ListView):
    model = ModelFormDemo
    template_name = "model_form_demo_list.html"
    context_object_name = "model_form_demos"


class ModelFormDemoCreateView(CreateView):
    model = ModelFormDemo
    form_class = ModelFormDemoForm
    template_name = "model_form_demo_form.html"

    def form_valid(self, form):
        form.instance.created_by = self.request.user
        return super().form_valid(form)


class ModelFormDemoUpdateView(UpdateView):
    model = ModelFormDemo
    form_class = ModelFormDemoForm
    template_name = "model_form_demo_form.html"


class ModelFormDemoDetailView(DetailView):
    model = ModelFormDemo
    template_name = "model_form_demo_detail.html"
    context_object_name = "model_form_demo"
