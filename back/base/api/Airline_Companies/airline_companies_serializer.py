from rest_framework import serializers
from django.contrib.auth.models import User

from base.models import Airline_Companies




class AirlineCompaniesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airline_Companies
        fields = ('id','name','country','user')


    def GetAirline(self,obj):
        return {
            "id": obj.id,
            "name": obj.name,
            "country": obj.country.name,
            "user": obj.user.username,
            }

    def GetAirlineById(self,id):
        airline= Airline_Companies.objects.get(id = id)
        return {
            "id": airline.id,
            "name": airline.name,
            "country": airline.country.name,
            "user": airline.user.username,
            }

    def GetAllAirlines(self):
        res=[] 
        for Country in Airline_Companies.objects.all(): 
            res.append(self.GetAirline(Country))
        return res