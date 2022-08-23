from django.urls import path
from base.api.Customers import customers_views


urlpatterns = [
    path('', customers_views.GetRoutes),
    path('GetCustomers/', customers_views.GetCustomers),
    path('GetCustomers/<id>', customers_views.GetCustomers),
    path('AddCustomers/', customers_views.AddCustomers),
    path('DelCustomers/', customers_views.DelCustomers),
    path('DelCustomers/<id>', customers_views.DelCustomers),
    path('PutCustomers/', customers_views.PutCustomers),
    path('PutCustomers/<id>', customers_views.PutCustomers),

    
]

