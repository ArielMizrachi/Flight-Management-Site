from django.urls import path
from base.api.Countries import countries_views


urlpatterns = [
    path('', countries_views.GetRoutes),
    path('GetCountries/', countries_views.GetCountries),
    path('GetCountries/<id>', countries_views.GetCountries),
    path('GetCountriesName/', countries_views.GetCountriesName),
    path('AddCountries/', countries_views.AddCountries),
    path('DelCountries/', countries_views.DelCountries),
    path('DelCountries/<id>', countries_views.DelCountries),
    path('PutCountries/', countries_views.PutCountries),
    path('PutCountries/<id>', countries_views.PutCountries),

    
]

