from django.http import HttpResponse
import logging

logger = logging.getLogger(__name__)


def logging_demo(request):
    logger.debug("Hello, world!")
    return HttpResponse("Hello, world!")
