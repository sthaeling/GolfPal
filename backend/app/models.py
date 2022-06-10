from django.db import models


class User(models.Model):
    _firstName = models.CharField(max_length=48)
    _lastName = models.CharField(max_length=48)
    _handicap = models.IntegerField()
    _phoneNumber = models.CharField(max_length=32)

    def __str__(self):
        return self._firstName + ' ' + self._lastName


class GolfClub(models.Model):
    _name = models.CharField(max_length=128)
    _streetHouseNumber = models.CharField(max_length=128)
    _zip = models.CharField(max_length=24)
    _city = models.CharField(max_length=128)
    _website = models.CharField(max_length=64)
    _email = models.CharField(max_length=128)
    _phoneNumber = models.CharField(max_length=32)

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
    _courseNameIdentifier = models.CharField(max_length=128)
    _holeNumber = models.IntegerField()
    _par = models.IntegerField()
    _distance = models.IntegerField()
    _hcp = models.IntegerField()

    def __str__(self):
        if self._courseNameIdentifier != '' or self._courseNameIdentifier:
            return 'Course:' + str(self._courseNameIdentifier) + ', Hole: ' + str(self._holeNumber)
        else:
            return str(self._holeNumber)


class UserHoleScore(models.Model):
    _user = models.ForeignKey(User, on_delete=models.CASCADE)
    _hole = models.ForeignKey(Hole, on_delete=models.CASCADE)
    _score = models.IntegerField()

    def __int__(self):
        return self._score
