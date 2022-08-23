from rest_framework import serializers
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
        country= Countries.objects.get(id = id)
        print(country.flag)
        return {
            "id": country.id,
            "name": country.name,
            "flag": country.flag,
            }

    def GetAllCountries(self):
        res=[] 
        for Country in Countries.objects.all(): 
            res.append(self.GetCountry(Country))
        return res