from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import EmailValidator
# Create your models here.
from django.dispatch import receiver
from django.db.models.signals import post_delete

class User(AbstractUser):
    email = models.EmailField(unique=True,
                                null=True,
                                validators=[EmailValidator],
                                error_messages={
            'unique': ('This email address is already in use.'),
        })
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True, default='profile_pictures/default.jpg')
    Type_choices = [
                ('customer','Customer'),
                ('merchant','Merchant')
            ]
    user_type = models.CharField(max_length=10, choices=Type_choices)
    joined = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.username or "None"} -> ({self.user_type or "Not Specified"})'


@receiver(post_delete, sender=User)
def remove_old_profile_image(sender, instance, **kwargs):
    if instance.profile_picture:
        instance.profile_picture.delete(save=False)


class User_address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address_line1 = models.TextField()
    address_line2 = models.TextField()
    city = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)


class CustomerProfile(models.Model):
    customer = models.OneToOneField(User, on_delete=models.CASCADE, related_name='Customer')
    
    def __str__(self):
        return self.customer.username
    


class MerchantProfile(models.Model):
    merchant = models.OneToOneField(User, on_delete=models.CASCADE, related_name="Merchant")
    business_name = models.CharField(max_length=255, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return "The Merchant: " + self.merchant.username 
