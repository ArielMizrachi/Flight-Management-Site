from django.urls import path
from base.api.Tickets import tickets_views


urlpatterns = [
    path('', tickets_views.GetRoutes),
    path('GetTickets/', tickets_views.GetTickets),
    path('GetTickets/<id>', tickets_views.GetTickets),
    path('GetCustomerTickets/', tickets_views.GetCustomerTickets),
    path('AddTickets/', tickets_views.AddTickets),
    path('DelTicets/', tickets_views.DelTicets),
    path('DelTicets/<id>', tickets_views.DelTicets),
    path('PutTickets/', tickets_views.PutTickets),
    path('PutTickets/<id>', tickets_views.PutTickets),

    
]

