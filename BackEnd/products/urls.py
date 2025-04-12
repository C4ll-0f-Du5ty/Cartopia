
from django.urls import path
from . import views
urlpatterns = [
    path('category/', views.categoryList.as_view()),
    path('', views.productList.as_view()),
    path('add/', views.addProduct),
    path('temp/', views.temp),

]
