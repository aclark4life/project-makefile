from wagtail.models import Page


class SitePage(Page):
    template = "sitepage/site_page.html"

    class Meta:
        verbose_name = "Site Page"
