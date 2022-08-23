from rest_framework import serializers
from base.models import Tickets




class TicketsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tickets
        fields = ('id','flight','customer')


    def GetTicket(self,obj):
        return {
            "id": obj.id,
            "flight":obj.flight.id,
            "customer":obj.customer.first_name
            
            }

    def GetTicketById(self,id):
        ticket= Tickets.objects.get(id = id)
        return {
            "id": ticket.id,
            "flight":ticket.flight.id,
            "customer":ticket.customer.first_name
            }

    def GetAllTickets(self):
        res=[] 
        for ticket in Tickets.objects.all(): 
            res.append(self.GetTicket(ticket))
        return res