from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError

from base.models import Countries
from base.api.Countries.countries_serializer import CountriesSerializer


# get all the urls path
@api_view(['GET','POST','PUT','DELETE'])
def GetRoutes(request):
    routes = [
        'GetCountries/',
        'AddCountries/',
        'DelCountries/',
        'PutCountries/',
    ]
 
    return Response(routes)
 

# getting all of the countries 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetCountries(request,id=-1):

    if int(id) > -1:
        try:
            # get specific country
            return Response(CountriesSerializer().GetCountryById(id))
        except ObjectDoesNotExist as e:
            return Response(str(e))

    else:
        return Response(CountriesSerializer().GetAllCountries())
  


# add country
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddCountries(request): 
    try:
         Countries.objects.create(name=request.data['name'] ,flag=request.data['flag'])
         return Response({"POST":request.data['name']})

    except IntegrityError as e:
        return Response(str(e))


# delete country
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DelCountries(request,id=-1): 
    try:
        temp= Countries.objects.get(id = id)
        temp.delete()
        return Response({'DELETE': id})

    except ObjectDoesNotExist as e:
        return Response(str(e))



# update country
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def PutCountries(request,id=-1):

    try:
        # creation of temp country   
        temp=Countries.objects.get(id = id)

        temp.name =request.data['name']
        temp.flag =request.data['flag']
        temp.save()
        return Response({'PUT IN': id})

    except ObjectDoesNotExist as e:
            return Response(str(e))    

    except IntegrityError as e:
        return Response(str(e))
    
