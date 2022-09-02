from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError

from base.models import Airline_Companies, Countries
from base.api.Airline_Companies.airline_companies_serializer import AirlineCompaniesSerializer


# get all the urls path
@api_view(['GET','POST','PUT','DELETE'])
def GetRoutes(request):
    routes = [
        'GetAirlines/',
        'AddAirline/',
        'DelAirline/',
        'PutAirline/',
        'GetAirlinesName/',
    ]
 
    return Response(routes)

# get airlines name
@api_view(['GET'])
def GetAirlinesName(request):
        try:
            # get specific user
            return Response(AirlineCompaniesSerializer().GetAllAirlinesName())

        except ObjectDoesNotExist as e:
            return Response(str(e)) 

# get airlines
@api_view(['GET'])
def GetAirlines(request,id=-1):
    if int(id) > -1:
        try: 
            # get specific airline
            return Response(AirlineCompaniesSerializer().GetAirlineById(id))
        except ObjectDoesNotExist as e:
            return Response(str(e))
    else:
        return Response(AirlineCompaniesSerializer().GetAllAirlines())
  

# add arieline
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddAirline(request):
    try: 
        if(request.data['name'] == ""
           or request.data['country'] == "" ):
            return Response(400) 
        # getting the user from the request and country from db  
        country= Countries.objects.get(name = request.data['country'])
        user= request.user

        Airline_Companies.objects.create(name=request.data['name'] ,country=country,user=user)
        return Response({"add": request.data['name']})

    except IntegrityError as e:
            if (str(e) == "UNIQUE constraint failed: base_airline_companies.name"):
                return Response (2)  

    except ObjectDoesNotExist as e:
        print(e)
        return Response(1)       

# delete arieline
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DelAirline(request,id=-1): 
    try:
        temp= Airline_Companies.objects.get(id = id)
        temp.delete()
        return Response({'DELETE': id})

    except ObjectDoesNotExist as e:
        return Response(str(e))


# update arieline
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def PutAirline(request,id=-1):
    try:  
        if(request.data['name'] == ""
           or request.data['country'] == "" ):
            return Response(400) 
        # creation of temp airline  
        temp=Airline_Companies.objects.get(id = id)

        temp.name =request.data['name']  
        # getting a country   
        country= Countries.objects.get(name = request.data['country'])
        temp.country =country
        temp.save()
        return Response({'PUT IN': id})

    except ObjectDoesNotExist as e:
            return Response(str(e))    

    except IntegrityError as e:
            if (str(e) == "UNIQUE constraint failed: base_airline_companies.name"):
                return Response (2)  
    


