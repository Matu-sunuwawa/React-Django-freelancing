from django.urls import path
from .views import Home, CartPage, CheckoutPage

urlpatterns = [
    path('',Home.as_view(),name='home'),
    path('cart/', CartPage.as_view(), name='cart'),
    path('checkout/', CheckoutPage.as_view(), name='checkout'),
]