from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView)
from base.api.Login import login_view

urlpatterns = [  

    path('', login_view.GetRoutes),
    path('token/', login_view.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
