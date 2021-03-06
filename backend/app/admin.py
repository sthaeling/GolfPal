from django.contrib import admin
from .models import User, GolfClub, GolfCourse, Hole, UserHoleScore


class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        '_firstName',
        '_lastName',
        '_email',
        '_handicap',
        '_phoneNumber'
    )


class GolfClubAdmin(admin.ModelAdmin):
    list_display = (
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


class GolfCourseAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        '_golfClub',
        '_name',
        '_holesAmount',
    )


class HoleAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        '_golfCourse',
        '_courseNameIdentifier',
        '_holeNumber',
        '_par',
        '_distance',
        '_hcp'
    )


class UserHoleScoreAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        '_user',
        '_hole',
        '_date',
        '_score'
    )


admin.site.register(User, UserAdmin)
admin.site.register(GolfClub, GolfClubAdmin)
admin.site.register(GolfCourse, GolfCourseAdmin)
admin.site.register(Hole, HoleAdmin)
admin.site.register(UserHoleScore, UserHoleScoreAdmin)
