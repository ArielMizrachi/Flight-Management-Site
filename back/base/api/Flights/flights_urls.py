from django.urls import path
from base.api.Flights import flights_views


urlpatterns = [
    path('', flights_views.GetRoutes),
    path('GetFlight/', flights_views.GetFlight),
    path('GetFlight/<id>', flights_views.GetFlight),
    path('GetMyFlights/', flights_views.GetMyFlights),
    path('AddFlights/', flights_views.AddFlights),
    path('DelFlights/', flights_views.DelFlights),
    path('DelFlights/<id>', flights_views.DelFlights),
    path('PutFlight/', flights_views.PutFlight),
    path('PutFlight/<id>', flights_views.PutFlight),  
]

