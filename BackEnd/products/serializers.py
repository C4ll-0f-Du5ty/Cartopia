from rest_framework import serializers
from .models import Category, Product, ProductImage, Inventory


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent_category']

    parent_category = serializers.SerializerMethodField()
    
    def get_parent_category(self, obj):
        if obj.parent_category:
            return (CategorySerializer(obj.parent_category).data)
        return None


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    photos = ProductImageSerializer(many=True, read_only=True)
    stock = InventorySerializer(read_only=True)
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'merchant',
            'description',
            'price',
            'category',
            'size',
            'is_active',
            'photos',
            'stock'
            ]
