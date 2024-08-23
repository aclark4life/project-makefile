from ninja import NinjaAPI
from rest_framework import viewsets
from siteuser.models import User
from .serializers import UserSerializer

api = NinjaAPI()


@api.get("/hello")
def hello(request):
    return "Hello world"


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
