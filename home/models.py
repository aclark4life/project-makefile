from django.db import models
from wagtail.models import Page
from wagtail.fields import RichTextField, StreamField
from wagtail import blocks
from wagtail.admin.panels import FieldPanel
from wagtail.images.blocks import ImageChooserBlock
from wagtail_color_panel.fields import ColorField
from wagtail_color_panel.edit_handlers import NativeColorPanel


class MarketingBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=False, help_text='Enter the block title')
    content = blocks.RichTextBlock(required=False, help_text='Enter the block content')
    images = blocks.ListBlock(ImageChooserBlock(required=False), help_text="Select one or two images for column display. Select three or more images for carousel display.")
    image = ImageChooserBlock(required=False, help_text="Select one image for background display.")
    block_class = blocks.CharBlock(
        required=False,
        help_text='Enter a CSS class for styling the marketing block',
        classname='full title',
        default='vh-100 bg-secondary',
    )
    image_class = blocks.CharBlock(
        required=False,
        help_text='Enter a CSS class for styling the column display image(s)',
        classname='full title',
        default='img-thumbnail p-5',
    )
    layout_class = blocks.CharBlock(
        required=False,
        help_text='Enter a CSS class for styling the layout.',
        classname='full title',
        default='d-flex flex-row',
    )

    class Meta:
        icon = 'placeholder'
        template = 'blocks/marketing_block.html'


class HomePage(Page):
    template = 'home/home_page.html'  # Create a template for rendering the home page
    marketing_blocks = StreamField([
        ('marketing_block', MarketingBlock()),
    ], blank=True, null=True, use_json_field=True)
    content_panels = Page.content_panels + [
        FieldPanel('marketing_blocks'),
    ]

    class Meta:
        verbose_name = 'Home Page'
