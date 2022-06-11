from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import viewsets

from .serializers import UserSerializer,\
    GolfClubSerializer, \
    GolfCourseSerializer, \
    HoleSerializer, \
    UserHoleScoreSerializer

from .models import User, GolfClub, GolfCourse, Hole, UserHoleScore

from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class GolfClubView(viewsets.ModelViewSet):
    serializer_class = GolfClubSerializer
    queryset = GolfClub.objects.all()


class GolfCourseView(viewsets.ModelViewSet):
    serializer_class = GolfCourseSerializer
    queryset = GolfCourse.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['_golfClub']


class HoleView(viewsets.ModelViewSet):
    serializer_class = HoleSerializer
    queryset = Hole.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['_golfCourse']


class UserHoleScoreView(viewsets.ModelViewSet):
    serializer_class = UserHoleScoreSerializer
    queryset = UserHoleScore.objects.all()


def index(request):
    return HttpResponse('<h1>Index!</h1>')
