# users/views.py
from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User, CustomerProfile, MerchantProfile
from .serializers import UserSerializer, CustomerProfileSerializer, MerchantProfileSerializer
from rest_framework.response import Response
from rest_framework import status


class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    
    def perform_create(self, serializer):
        user = serializer.save()
        
        if user.user_type == "customer":
            CustomerProfile.objects.create(customer=user)
        else:
            MerchantProfile.objects.create(merchant=user)


class ProfileView(generics.ListCreateAPIView):
    # queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        if self.request.user.username:
            return User.objects.filter(username=self.request.user.username)
        return User.objects.all()



class ProfilePicture(generics.CreateAPIView):
    
    serializer_class = UserSerializer
    # permission_classes = [permissions.AllowAny]
    def post(self, request):
        try:
            user = User.objects.get(username=self.request.user.username)
            if 'profile_picture' in request.FILES:
                user.profile_picture.delete()
                user.profile_picture = request.FILES['profile_picture']
                print("HERE: ",request.FILES['profile_picture'])
                user.save()
                return Response({'message': 'Profile imgage Updated Sucessfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'No image Provided'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'message': 'the User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

