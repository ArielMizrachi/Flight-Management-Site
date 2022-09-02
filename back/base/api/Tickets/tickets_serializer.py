from rest_framework import serializers
from base.models import Tickets
from base.models import Flights




class TicketsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tickets
        fields = ('id','flight','customer')


    def GetTicket(self,obj):
        flight= Flights.objects.get(id = obj.flight.id)
        return {
            "id": obj.id,
            "flight":obj.flight.id,
            "origin_country":flight.origin_country.name,
            "destenation_country":flight.destenation_country.name,
            "customer":obj.customer.first_name
            
            }

    def GetTicketById(self,id):
        ticket= Tickets.objects.get(id = id)
        flight= Flights.objects.get(id = ticket.flight.id)
        return {
            "id": ticket.id,
            "flight":ticket.flight.id,
            "origin_country":flight.origin_country.name,
            "destenation_country":flight.destenation_country.name,
            "customer":ticket.customer.first_name
            }

    def GetAllTickets(self):
        res=[] 
        for ticket in Tickets.objects.all(): 
            res.append(self.GetTicket(ticket))
        return res