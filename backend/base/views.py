from django.shortcuts import render
from django.http import JsonResponse
from .products import products

from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/products/', '/api/products/create/', '/api/products/upload/',
        '/api/products/<id>/reviews/', '/api/products/top/',
        '/api/products/<id>/', '/api/products/delete/<id>',
        '/api/products/<update>/<id>'
    ]
    return Response(routes)


@api_view(['GET'])
def get_all_products(request):
    return Response(products)


@api_view(['GET'])
def get_single_product(request, pk):
    product = filter(lambda p: p["_id"] == pk, products)
    return Response(product)