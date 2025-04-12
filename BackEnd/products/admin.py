from django.contrib import admin
from .models import Category, Product, Inventory, ProductImage
# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('__str__',)
    search_fields = ("name",)
    

admin.site.register(Category, CategoryAdmin)


admin.site.register(Product)
admin.site.register(Inventory)
admin.site.register(ProductImage)
