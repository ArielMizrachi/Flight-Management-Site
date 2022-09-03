from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from datetime import datetime

from base.models import Flights,Countries,Airline_Companies
from base.api.Flights.flights_serializer import FlightsSerializer

# get all the urls path
@api_view(['GET','POST','PUT','DELETE'])
def GetRoutes(request):
    routes = [
        'GetFlight/',
        'AddFlights/',
        'DelFlights/',
        'PutFlight/',
        'GetMyFlights/',
    ]
 
    return Response(routes)
 

# getting all of the flights
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def GetFlight(request,id=-1):
    if int(id) > -1:
        try:
            return Response(FlightsSerializer().GetFlightsById(id))
        except ObjectDoesNotExist as e:
            return Response(str(e))

    else:
        return Response(FlightsSerializer().GetAllFlights())
  

  # getting all of my flights
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetMyFlights(request): 
        user= request.user 
        airline= Airline_Companies.objects.get(user = user)     
        try:
            return Response({"my_flights":FlightsSerializer().GetMyFlights(airline),"company_name":airline.name})
        except ObjectDoesNotExist as e:
            return Response(str(e))

# adding a flight
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddFlights(request): 
    try:
        if(request.data['airline_company'] == ""
           or request.data['origin_country'] == "" 
           or request.data['destenation_country'] == "" 
           or len(request.data['landing_time']) == 1 
           or len(request.data['departure_time']) == 1):
            return Response(400)
        # getting all the forign keys elemnts
        airline_company= Airline_Companies.objects.get(name = request.data['airline_company'])
        origin_country= Countries.objects.get(name = request.data['origin_country'])
        destenation_country= Countries.objects.get(name = request.data['destenation_country'])

        # data time handling
        dtime=request.data['departure_time']
        departure_time = datetime.strptime(dtime, '%d/%m/%y %H:%M')

        ltime=request.data['landing_time']
        landing_time = datetime.strptime(ltime, '%d/%m/%y %H:%M')


        # the creation of a new flight
        Flights.objects.create( airline_company=airline_company, 
                                origin_country=origin_country,
                                destenation_country=destenation_country,
                                departure_time=departure_time,
                                landing_time= landing_time,
                                remaining_ticets=request.data['remaining_ticets'])

        return Response({"POST":request.data['airline_company']})

    except IntegrityError as e:
        return Response(str(e))


# deleting a flight
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DelFlights(request,id=-1): 
    try:
        temp= Flights.objects.get(id = id)
        temp.delete()
        return Response({'DELETE': id})

    except ObjectDoesNotExist as e:
        return Response(str(e))


# updating a flight
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def PutFlight(request,id=-1):

    try:
        if(request.data['airline_company'] == ""
           or request.data['origin_country'] == "" 
           or request.data['destenation_country'] == "" 
           or len(request.data['landing_time']) == 1 
           or len(request.data['departure_time']) == 1):
            return Response(400)
        # creation of temp flight   
        temp=Flights.objects.get(id = id)
        # setting all the forign keys
        airline_company= Airline_Companies.objects.get(name = request.data['airline_company'])
        origin_country= Countries.objects.get(name = request.data['origin_country'])
        destenation_country= Countries.objects.get(name = request.data['destenation_country'])

         # data time handling
        dtime=request.data['departure_time']
        departure_time = datetime.strptime(dtime, '%d/%m/%y %H:%M')

        ltime=request.data['landing_time']
        landing_time = datetime.strptime(ltime, '%d/%m/%y %H:%M')

        # updating the flight
        temp.airline_company =airline_company
        temp.origin_country =origin_country
        temp.destenation_country =destenation_country
        temp.departure_time =departure_time
        temp.landing_time =landing_time
        temp.remaining_ticets =request.data['remaining_ticets']
        temp.save()
        return Response({'PUT IN': id})

    except ObjectDoesNotExist as e:
            return Response(str(e))    

    except IntegrityError as e:
        return Response(str(e))
    
