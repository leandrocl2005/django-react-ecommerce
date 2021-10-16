from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_routes, name="routes"),
    path('products/', views.get_all_products, name="products"),
    path('product/<str:pk>/', views.get_single_product, name="product"),
]
