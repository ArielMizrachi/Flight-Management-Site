from email.policy import default
from logging import PlaceHolder
from rest_framework.response import Response
from rest_framework import status
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
        'GetCountriesName/',
    ]
 
    return Response(routes)
 
# get countries name
@api_view(['GET'])
def GetCountriesName(request):
        try:
            # get specific user
            return Response(CountriesSerializer().GetAllCountriesName())

        except ObjectDoesNotExist as e:
            return Response(str(e)) 

# getting all of the countries 
@api_view(['GET'])
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
        newdict = request.data.dict()
        if newdict['name'] == '':
            return Response(400)      
        try:
            if newdict['flag'] == '':
                Countries.objects.create(name=newdict['name'])                           
                return Response({"POST":newdict['name']})
            else:
                Countries.objects.create(name=newdict['name'],
                                             flag=newdict['flag'])                           
                return Response({"POST":newdict['name']})   
        except IntegrityError as e:
            print (e)
            if (str(e) == "UNIQUE constraint failed: base_countries.name"):
                return Response (2)     
        return Response(999)  

# delete country
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DelCountries(request,id=-1): 
    try:
        temp= Countries.objects.get(id = id)
        if temp.flag:
            if temp.flag != '/placeholder.png': 
               temp.flag.delete()
        temp.delete()
        return Response({'DELETE': id})

    except ObjectDoesNotExist as e:
        return Response(str(e))



# update country
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def PutCountries(request,id=-1):
    newdict = request.data.dict()
    temp=Countries.objects.get(id = id)

    if newdict['name'] == '':
                return Response(400)      
    try:
        if newdict['flag'] == '':
            temp.name =request.data['name'] 
            temp.save()                          
            return Response({'PUT IN': id})
        else:
            temp.name =request.data['name']
            temp.flag =request.data['flag']                           
            temp.save()
            return Response({'PUT IN': id})   
    except IntegrityError as e:
            print (e)
            if (str(e) == "UNIQUE constraint failed: base_countries.name"):
                return Response (2)  
    return Response(999)  
    
