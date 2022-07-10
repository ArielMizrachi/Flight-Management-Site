from rest_framework import serializers
from django.contrib.auth.models import User

from base.models import Countries




class CountriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Countries
        fields = ('id','name','flag')


    def GetCountry(self,obj):
        return {
            "id": obj.id,
            "name": obj.name,
            "flag": obj.flag,
            }

    def GetCountryById(self,id):
        country= Countries.objects.get(_id = id)
        return {
            "id": country.id,
            "name": country.name,
            "flag": country.flag,
            }

    def GetAllProducts(self):
        res=[] 
        for Country in Countries.objects.all(): 
            res.append(self.GetCountry(Country))
        return res