# users/serializers.py
from rest_framework import serializers
from .models import User, CustomerProfile, MerchantProfile

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         exclude = ['password', 'user_type', 'joined']
#         read_only_fields = ['last_modified', 'profile_picture', 'date_joined', 'is_active']
#         extra_kwargs = {
#             'username': {'required': False}
#         }

from rest_framework import serializers
from .models import User, CustomerProfile, MerchantProfile

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    user_type = serializers.ChoiceField(choices=User.Type_choices, required=True)

    class Meta:
        model = User
        exclude = ['joined']
        read_only_fields = ['last_modified', 'profile_picture', 'is_active']

    def create(self, validated_data):
        password = validated_data.pop('password')  # Extract password
        user = User(**validated_data)  # Create user object
        user.set_password(password)  # Hash password
        user.save()  # Save user to DB
        return user

class CustomerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = CustomerProfile
        fields = ['user']

class MerchantProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = MerchantProfile
        fields = ['user', 'business_name', 'website']
