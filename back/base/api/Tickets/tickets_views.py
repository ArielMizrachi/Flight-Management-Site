from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from base.api.Airline_Companies.airline_companies_serializer import AirlineCompaniesSerializer

from base.models import Tickets,Flights,Customers
from base.api.Tickets.tickets_serializer import TicketsSerializer

# get all the urls path
@api_view(['GET','POST','PUT','DELETE'])
def GetRoutes(request):
    routes = [
        'GetTickets/',
        'AddTickets/',
        'DelTicets/',
        'PutTickets/',
    ]
 
    return Response(routes)
 

# getting all of the customers 
@api_view(['GET'])
def GetTickets(request,id=-1):

    if int(id) > -1:
        try:
            # getting specific ticket
            return Response(TicketsSerializer().GetTicketById(id))
        except ObjectDoesNotExist as e:
            return Response(str(e))

    else:
        return Response(TicketsSerializer().GetAllTickets())
  

# add a ticket
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddTickets(request): 
    try:
        # get the forigen key elemnts
        flight= Flights.objects.get(id = request.data['flights_id'])
        customer= Customers.objects.get(id = request.data['customer_id'])

        Tickets.objects.create(flight=flight,
                               customer=customer)

        return Response({"POST":'tickets'})

    except IntegrityError as e:
        return Response(str(e))


# delete a ticket
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DelTicets(request,id=-1): 
    try:
        temp= Tickets.objects.get(id = id)
        temp.delete()
        return Response({'DELETE': id})

    except ObjectDoesNotExist as e:
        return Response(str(e))


# update a ticket
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def PutTickets(request,id=-1):

    try:  
        # getting the customer 
        temp=Tickets.objects.get(id = id)

        flight= Flights.objects.get(id = request.data['flights_id'])
        customer= Customers.objects.get(id = request.data['customer_id'])

        temp.flight =flight
        temp.customer =customer

        temp.save()
        return Response({'PUT IN': id})

    except ObjectDoesNotExist as e:
            return Response(str(e))    

    except IntegrityError as e:
        return Response(str(e))
    
