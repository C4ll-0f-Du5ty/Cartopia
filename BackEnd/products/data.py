from .models import Category

def create_categories():
    # Electronics branch
    electronics = Category.objects.create(name="Electronics")
    
    # First level children
    computers = Category.objects.create(name="Computers", parent_category=electronics)
    phones = Category.objects.create(name="Phones", parent_category=electronics)
    audio = Category.objects.create(name="Audio", parent_category=electronics)
    
    # Second level children
    laptops = Category.objects.create(name="Laptops", parent_category=computers)
    desktops = Category.objects.create(name="Desktops", parent_category=computers)
    tablets = Category.objects.create(name="Tablets", parent_category=computers)
    
    smartphones = Category.objects.create(name="Smartphones", parent_category=phones)
    basic_phones = Category.objects.create(name="Basic Phones", parent_category=phones)
    phone_accessories = Category.objects.create(name="Phone Accessories", parent_category=phones)
    
    headphones = Category.objects.create(name="Headphones", parent_category=audio)
    speakers = Category.objects.create(name="Speakers", parent_category=audio)
    home_audio = Category.objects.create(name="Home Audio", parent_category=audio)
    
    print("Categories Added")
