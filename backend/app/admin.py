from django.contrib import admin
from .models import User
from .models import GolfClub
from .models import GolfCourse
from .models import Hole
from .models import UserHoleScore


class UserAdmin(admin.ModelAdmin):
    list_display = (
        '_firstName',
        '_lastName',
        '_handicap',
        '_phoneNumber'
    )


class GolfClubAdmin(admin.ModelAdmin):
    list_display = (
        '_name',
        '_streetHouseNumber',
        '_zip',
        '_city',
        '_website',
        '_email',
        '_phoneNumber'
    )


class GolfCourseAdmin(admin.ModelAdmin):
    list_display = (
        '_golfClub',
        '_name',
        '_holesAmount',
    )


class HoleAdmin(admin.ModelAdmin):
    list_display = (
        '_golfCourse',
        '_courseNameIdentifier',
        '_holeNumber',
        '_par',
        '_distance',
        '_hcp'
    )


class UserHoleScoreAdmin(admin.ModelAdmin):
    list_display = (
        '_user',
        '_hole',
        '_score'
    )


admin.site.register(User, UserAdmin)
admin.site.register(GolfClub, GolfClubAdmin)
admin.site.register(GolfCourse, GolfCourseAdmin)
admin.site.register(Hole, HoleAdmin)
admin.site.register(UserHoleScore, UserHoleScoreAdmin)
