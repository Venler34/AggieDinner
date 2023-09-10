from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("saveReservation", views.saveReservation, name="saveReservation"),
    path("getReservation", views.getReservations, name="getReservation"),
    path("removeReservation", views.removeReservation, name="removeReservation"),
    path("getReservationForDateTime", views.getReservationForDateTime, name="getReservationForDateTime")
]