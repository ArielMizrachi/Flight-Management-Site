from django.urls import path
from base.api.Airline_Companies import airline_companies_views
 
urlpatterns = [
    path('', airline_companies_views.GetRoutes),
    path('GetAirlines/', airline_companies_views.GetAirlines),
    path('GetAirlines/<id>', airline_companies_views.GetAirlines),
    path('GetAirlinesName/', airline_companies_views.GetAirlinesName),
    path('AddAirline/', airline_companies_views.AddAirline),
    path('DelAirline/', airline_companies_views.DelAirline),
    path('DelAirline/<id>', airline_companies_views.DelAirline),
    path('PutAirline/', airline_companies_views.PutAirline),
    path('PutAirline/<id>', airline_companies_views.PutAirline),


    
]

