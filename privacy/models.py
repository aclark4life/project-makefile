from wagtail.models import Page
from wagtail.admin.panels import FieldPanel
from wagtailmarkdown.fields import MarkdownField


class PrivacyPage(Page):
    """
    A Wagtail Page model for the Privacy Policy page.
    """

    template = "privacy_page.html"

    body = MarkdownField()

    content_panels = Page.content_panels + [
        FieldPanel("body", classname="full"),
    ]

    class Meta:
        verbose_name = "Privacy Page"
