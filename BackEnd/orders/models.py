from django.db import models
from users.models import CustomerProfile
from products.models import Product
# Create your models here.
class Cart(models.Model):
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)


class Order(models.Model):
    choices = [
                ('pending', 'Pending'),
                ('completed', 'Completed')
                ]
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=choices)
    created_at = models.DateTimeField(auto_now_add=True)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)


class WishList(models.Model):
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)
