from wagtail.models import Page


class BasicPage(Page):
    template = "basicpage/basic_page.html"

    class Meta:
        verbose_name = "Basic Page"
