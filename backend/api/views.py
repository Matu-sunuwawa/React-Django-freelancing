from django.shortcuts import render
from django.http import JsonResponse

from django.http import Http404 


  
from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated 
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status 

from .serializers import ProductSerializer, OrderSerializer, OrderItemSerializer, CustomerSerializer, CustomerAddressSerializer
from .models import Product, Order, Customer, OrderItem, CustomerAddress

# Create your views here.

# class Home(APIView):
#     permission_classes = (IsAuthenticated, )







#     def get(self,request):
#         ctx = {
#             'message':'Hello JWT'
#         }
#         return Response(ctx)


class Home(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self,request):
        product = Product.objects.all().order_by('-price')
        serializer = ProductSerializer(product, many=True, context={'request': request})
        order, created = Order.objects.get_or_create(customer = self.request.user.customer, complete=False)
        # cartitems = order.get_cart_items

        # cart_items = OrderItem.objects.filter(order=order)
        # cart_total_items = OrderItem.objects.all()
        # cart_items_serializer = OrderItemSerializer(cart_items, many=True, context={'request': request})
        cart_total_serializer = OrderSerializer(order, context={'request': request})

        ctx = {
            # 'cartprice': cart_items_serializer.data, #It is the same with 'carts': order_serializer.data['order_items'] on `cart` and checkout
            'products': serializer.data,
            'cartitems': cart_total_serializer.data
        }
        return Response(ctx)
    
    def post(self, request, format=None):
        data = request.data
        print('data:', data)
        productId = data['productId']
        action = data['action']
        print('productId:', productId, 'action:', action)
        product = Product.objects.get(id=productId)
        order, created = Order.objects.get_or_create(customer=request.user.customer, complete=False)
        orderItem, created = OrderItem.objects.get_or_create(order=order, product=product)

        if action == 'add':
            orderItem.quantity = orderItem.quantity + 1
        elif action == 'remove':
            orderItem.quantity = orderItem.quantity - 1

        orderItem.save()
        # serializer = OrderItemSerializer(orderItem, data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        #orderItem.delete()
        if orderItem.quantity <=0 :
            orderItem.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response(status=status.HTTP_201_CREATED)

    
class CartPage(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, format=None):
        order, created = Order.objects.get_or_create(customer = self.request.user.customer, complete=False)
        carts = order.orderitem_set.all()
        customer = self.request.user.customer
        
        order_serializer = OrderSerializer(order, context={'request': request})
        custom_serializer = CustomerSerializer(customer)

        ctx = {
            'order': order_serializer.data,
            'carts': order_serializer.data['order_items'], #There are different options you can check it on `checkout`
            'user': custom_serializer.data,
        }

        return Response(ctx)
    
class CheckoutPage(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, format=None):
        order, created = Order.objects.get_or_create(customer = self.request.user.customer, complete=False)
        customerAddress = CustomerAddress.objects.all()
        customer = self.request.user.customer

        cart_items = OrderItem.objects.filter(order=order)
        cart_items_serializer = OrderItemSerializer(cart_items, many=True, context={'request': request})

        order_serializer = OrderSerializer(order, context={'request': request})
        customerAddress_serializer = CustomerAddressSerializer(customerAddress, many=True)
        custom_serializer = CustomerSerializer(customer)

        ctx = {
            'totalprice': cart_items_serializer.data,   #totalprice and below carts are the same functionality you can use either and remove one it is by mistake!
            'carts': order_serializer.data['order_items'],
            'customeraddress': customerAddress_serializer.data,
            'user': custom_serializer.data,
        }

        return Response(ctx)