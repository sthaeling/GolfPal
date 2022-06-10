from django.db import models


class User(models.Model):
    _firstName = models.CharField(max_length=48)
    _lastName = models.CharField(max_length=48)
    _email = models.EmailField(max_length=128, blank=True, null=True)
    _password = models.CharField(max_length=128)
    _handicap = models.IntegerField()
    _phoneNumber = models.CharField(max_length=32, blank=True, null=True)

    def __str__(self):
        return self._firstName + ' ' + self._lastName


class GolfClub(models.Model):
    _name = models.CharField(max_length=128)
    _streetHouseNumber = models.CharField(max_length=128, blank=True, null=True)
    _zip = models.CharField(max_length=24, blank=True, null=True)
    _city = models.CharField(max_length=128, blank=True, null=True)
    _website = models.URLField(max_length=64, blank=True, null=True)
    _email = models.EmailField(max_length=128, blank=True, null=True)
    _phoneNumber = models.CharField(max_length=32, blank=True, null=True)
    _imageUrl = models.CharField(max_length=256, blank=True, null=True)

    def __str__(self):
        return self._name


class GolfCourse(models.Model):
    _golfClub = models.ForeignKey(GolfClub, on_delete=models.CASCADE)
    _name = models.CharField(max_length=128)
    _holesAmount = models.IntegerField()

    def __str__(self):
        return self._name


class Hole(models.Model):
    _golfCourse = models.ForeignKey(GolfCourse, on_delete=models.CASCADE)
    _courseNameIdentifier = models.CharField(max_length=128, blank=True, null=True)
    _holeNumber = models.IntegerField()
    _par = models.IntegerField()
    _distance = models.IntegerField()
    _hcp = models.IntegerField(blank=True, null=True)

    def __str__(self):
        if self._courseNameIdentifier != '' or self._courseNameIdentifier:
            return 'Course:' + str(self._courseNameIdentifier) + ', Hole: ' + str(self._holeNumber)
        else:
            return str(self._holeNumber)


class UserHoleScore(models.Model):
    _user = models.ForeignKey(User, on_delete=models.CASCADE)
    _hole = models.ForeignKey(Hole, on_delete=models.CASCADE)
    _date = models.DateTimeField(blank=True, null=True)
    _score = models.IntegerField()

    def __str__(self):
        return str(self._score)

    def __int__(self):
        return self._score
