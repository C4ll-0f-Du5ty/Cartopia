from django.db import models
from users.models import MerchantProfile
# Create your models here.
from django.dispatch import receiver
from django.db.models.signals import post_delete

class Category(models.Model):
    name = models.CharField(max_length=255)
    parent_category = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.get_full_path()

    def get_full_path(self):
        if self.parent_category:
            return f"{self.parent_category.get_full_path()} > {self.name}"
        return f"{self.name}"

class Product(models.Model):
    
    SIZE_CHOICES = [
    ('XS', 'Extra Small'),
    ('S', 'Small'),
    ('M', 'Medium'),
    ('L', 'Large'),
    ('XL', 'Extra Large')
]
    
    name = models.CharField(max_length=255)
    merchant = models.ForeignKey(MerchantProfile, on_delete=models.CASCADE)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    size = models.CharField(max_length=10, choices=SIZE_CHOICES, blank=True,null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} by {self.merchant.merchant}"

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='products/')
    is_main = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.product.name} by {self.product.merchant.merchant}"


@receiver(post_delete, sender=ProductImage)
def delete_image_from_s3(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(save=False)


class Inventory(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='stock')
    quantity_in_stock = models.PositiveIntegerField(default=0)
    reorder_threshold = models.PositiveIntegerField(default=10)
    
    def __str__(self):
        return f"{self.product.name} by {self.product.merchant.merchant}"
