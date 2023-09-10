from django.shortcuts import render
from .models import Person, Time, Table
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
holder = {}
tableAvailability = [0, 1, 2, 0, 1, 0, 0, 0, 1]
def index(request):
    return render(request, "Reservation/index.html")

@csrf_exempt
def saveReservation(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        date = data.get("date")
        partySize = data.get("partySize")
        time = data.get("time")

        inputReservation(name, date, int(time), int(partySize))
    return JsonResponse(holder)

def getReservations(request):
    date = request.GET.get("date")
    size = int(request.GET.get("size"))

    arr = checkForTimes(date, size)
    return JsonResponse(arr, safe=False)

def get_table_size(party_size):
    if party_size == 1:
        return 1
    elif party_size <= 2:
        return 2
    elif party_size <= 4:
        return 4
    else:  # party_size <= 8
        return 8
    
def checkForTimes(date, size):
    tableSize = get_table_size(size)
 #Check if date has already been made, if not makes it
    if not (date in holder):
        holder[date] = dict()
        #Creates times for each date
        for i in range(24):
            holder[date][i] = dict()
    # Loop through all times:
    availableTimes = list()
    tableLimit = tableAvailability[tableSize] #Gets total tables for size from table
    #Checks how many people at every time are also using the same table
    for i, v in holder[date].items():
        filledTables = 0
        for _, value in v.items():
            filledTables += 1 if value['size'] == tableSize else 0
    
        if filledTables < tableLimit:
            availableTimes.append(i)

    return availableTimes

def inputReservation(name, date, time, size):
    tableSize = get_table_size(size)
    holder[date][time][name] = dict(size = tableSize)