from django.contrib import admin
from .models import Airline_Companies,Countries,Flights,Customers,Tickets
 

admin.site.register(Airline_Companies)
admin.site.register(Countries)
admin.site.register(Flights)
admin.site.register(Customers)
admin.site.register(Tickets)

