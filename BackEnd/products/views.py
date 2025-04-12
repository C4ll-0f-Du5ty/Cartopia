from django.shortcuts import render
from rest_framework import generics
from .models import Category, Product, ProductImage, Inventory
from users.models import MerchantProfile
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
import json
from users.serializers import MerchantProfileSerializer
from users.permissions import IsMerchant
# Create your views here.

class categoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class productList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

# a view to add The new product
@api_view(['POST', 'GET'])
@permission_classes([IsMerchant])
def addProduct(request):
    try:
        # Body:
        product_name = request.POST['name']
        description = request.POST['description']
        price = request.POST['price']
        size = request.POST['size']
        quantity_in_stock = request.POST['quantity_in_stock']
        reorder_threshold = request.POST['reorder_threshold']

        images = request.FILES.getlist('images')
        category_id = request.POST['category']
        is_active = True if request.POST['is_active'] == 'true' else False 
        merchant_id = request.POST['merchant']
        
        # getting the merchant
        merchant = MerchantProfile.objects.get(merchant=merchant_id)
        category = Category.objects.get(id=category_id)

        # Creating the Product:
        new_product = Product.objects.create(
            name=product_name,
            merchant=merchant,
            description=description,
            price=price,
            category=category,
            size=size if size else None,
            is_active=is_active
        )

        # creating the inventory
        Inventory.objects.create(
            product=new_product,
            quantity_in_stock=quantity_in_stock,
            reorder_threshold=reorder_threshold
        )

        # adding the images for the created product
        for index, image in enumerate(images):
            ProductImage.objects.create(
                product=new_product,
                image=image,
                is_main=(index == 0)
            )
        # print(images)
        return Response({'message',"The Product was Added successfully"},status.HTTP_201_CREATED)
    except MerchantProfile.DoesNotExist:
        return Response({"error": "Merchant not found"}, status=status.HTTP_400_BAD_REQUEST)
    except Category.DoesNotExist:
        return Response({"error": "Category not found"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("The Error: ", e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['Get'])
@permission_classes([IsMerchant])
def temp(request):
    return Response({"message": str(request.user.user_type)}, status=status.HTTP_200_OK)
