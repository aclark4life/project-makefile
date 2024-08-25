from django.conf import settings
from django.urls import include, path
from django.contrib import admin

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.documents import urls as wagtaildocs_urls

from search import views as search_views

urlpatterns = [
    path("django/", admin.site.urls),
    path("wagtail/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("search/", search_views.search, name="search"),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if settings.DEBUG:
    urlpatterns += [path("__debug__/", include("debug_toolbar.urls"))]
urlpatterns += [path("accounts/", include("allauth.urls"))]
urlpatterns += [path("user/", include("siteuser.urls"))]
urlpatterns += [path("model-form-demo/", include("model_form_demo.urls"))]
urlpatterns += [path("logging-demo/", include("logging_demo.urls"))]

from rest_framework import routers  # noqa
from .api import UserViewSet, api  # noqa

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)
# urlpatterns += [path("api/", include(router.urls))]
urlpatterns += [path("api/", api.urls)]
urlpatterns += [
    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    path("", include("wagtail.urls")),
    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    path("pages/", include("wagtail.urls"),
]
