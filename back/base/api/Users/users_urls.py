from django.urls import path
from base.api.Users import users_views
 
urlpatterns = [
    path('', users_views.GetRoutes),
    path('GetUsers/', users_views.GetUsers),
    path('GetUsers/<id>', users_views.GetUsers),
    path('GetUsersName/', users_views.GetUsersName),
    path('RegisterUser/', users_views.RegisterUser),
    path('DelUser/', users_views.DelUser),
    path('DelUser/<id>', users_views.DelUser),
    path('PutUser/', users_views.PutUser),
    path('PutUser/<id>', users_views.PutUser),


    
]

