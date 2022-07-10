from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView)
from base.api.Countries import views
 
urlpatterns = [
    path('', views.getRoutes),
    path('getCountries/', views.getCountries),
    path('getCountries/<id>', views.getCountries),

    
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

