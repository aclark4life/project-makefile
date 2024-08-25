from django.contrib.admin import AdminSite


class CustomAdminSite(AdminSite):
    site_header = "Project Makefile"
    site_title = "Project Makefile"
    index_title = "Project Makefile"


custom_admin_site = CustomAdminSite(name="custom_admin")
