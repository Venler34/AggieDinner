from django.db import models

# Create your models here.
class Table(models.Model):
    isFilled = models.BooleanField()
    seats = models.IntegerField()

class Time(models.Model):
    date = models.DateTimeField()
    tables = models.ManyToManyField(Table, related_name="times")

class Person(models.Model):
    table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name="name", null=True)
    name = models.CharField(max_length=64, null = True)