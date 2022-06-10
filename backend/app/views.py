from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import viewsets

from .serializers import UserSerializer,\
    GolfClubSerializer, \
    GolfCourseSerializer, \
    HoleSerializer, \
    UserHoleScoreSerializer

from .models import User, GolfClub, GolfCourse, Hole, UserHoleScore


# Create your views here.

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


def index(request):
    return HttpResponse('<h1>Index!</h1>')
