from wagtail.models import Page


class BasicPage(Page):
    template = "defaultpage/default_page.html"

    class Meta:
        verbose_name = "Default Page"
