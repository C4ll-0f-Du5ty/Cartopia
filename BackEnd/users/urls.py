# users/urls.py
from django.urls import path
from .views import RegisterView, ProfileView, ProfilePicture
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('profile/', ProfileView.as_view(), name="profile"),
    path('picture/', ProfilePicture.as_view(), name="profile"),
    
]
