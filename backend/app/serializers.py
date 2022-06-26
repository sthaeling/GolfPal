from rest_framework import serializers
from .models import User, GolfClub, GolfCourse, Hole, UserHoleScore


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            '_firstName',
            '_lastName',
            '_email',
            '_password',
            '_handicap',
            '_phoneNumber'
        )


class GolfClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = GolfClub
        fields = (
            'id',
            '_name',
            '_streetHouseNumber',
            '_zip',
            '_city',
            '_website',
            '_email',
            '_phoneNumber',
            '_imageUrl'
        )


class GolfCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = GolfCourse
        fields = (
            'id',
            '_golfClub',
            '_name',
            '_holesAmount'
        )


class HoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hole
        fields = (
            'id',
            '_golfCourse',
            '_courseNameIdentifier',
            '_holeNumber',
            '_par',
            '_distance',
            '_hcp'
        )


class UserHoleScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserHoleScore
        fields = (
            'id',
            '_user',
            '_hole',
            '_date',
            '_score'
        )
