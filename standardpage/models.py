from wagtail.models import Page


class StandardPage(Page):
    template = "standardpage/standard_page.html"

    class Meta:
        verbose_name = "Standard Page"
