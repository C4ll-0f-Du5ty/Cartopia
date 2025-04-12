# users/permissions.py
from rest_framework.permissions import BasePermission

class IsMerchant(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.user_type == 'merchant' or request.user.is_superuser)

class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type == 'customer'
