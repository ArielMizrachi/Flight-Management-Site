from rest_framework import serializers
from base.models import Flights 




class FlightsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flights
        fields = ('id','airline_company','origin_country','destenation_country','departure_time','landing_time')


    def GetFlights(self,obj):
        return {
            "id": obj.id,
            "airline_company": obj.airline_company.name,
            "origin_country": obj.origin_country.name,
            "destenation_country": obj.destenation_country.name,
            "departure_time": obj.departure_time,
            "landing_time": obj.landing_time, 
            "remaining_ticets": obj.remaining_ticets, 

            }

    def GetFlightsById(self,id):
        flight= Flights.objects.get(id = id)
        return {
            "id": flight.id,
            "airline_company": flight.airline_company.name,
            "origin_country": flight.origin_country.name,
            "destenation_country": flight.destenation_country.name,
            "departure_time": flight.departure_time,
            "landing_time": flight.landing_time,
            "remaining_ticets": flight.remaining_ticets,  
            }

    def GetAllFlights(self):
        res=[] 
        for flight in Flights.objects.all(): 
            res.append(self.GetFlights(flight))
        return res


    def GetMyFlights(self,airline):
        res=[] 
        MyFlights = airline.flights_set.all()
        for flight in MyFlights: 
            res.append(self.GetFlights(flight))
        return res    