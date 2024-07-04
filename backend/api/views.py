from django.shortcuts import render
from django.http import JsonResponse

from django.http import Http404 


  
from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated 
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status 
from rest_framework.permissions import AllowAny

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
            'cartitems': cart_total_serializer.data,
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

    def post(self, request, format=None):
        data = request.data
        print('data:', data)
        customername = data['username']
        customeremail = data['customemail']

        customer = Customer.objects.get(name=customername, email=customeremail)

        if (data['customeraddress'] != '' and data['customercity'] != '' and data['customerpcode']!='' and data['customerpnumber']!=''):
            customerAddressInfo = CustomerAddress.objects.get_or_create(customer=customer)

            customerAddress = CustomerAddress.objects.filter(customer=customer).update(
                address=data['customeraddress'],
                city=data['customercity'],
                postal_code=data['customerpcode'],
                phone_number=data['customerpnumber']
            )
        else:
            print('it is empty')
        return Response(status=status.HTTP_202_ACCEPTED)

    

class ChapaCallBack(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
            
            try:
                # Assuming Chapa sends JSON data in the query parameters
                callback_data = request.query_params

                # Process the callback_data here
                # Example: Extract relevant information from callback_data
                # tx_ref = callback_data.get('tx_ref')
                # amount = callback_data.get('amount')
                # callback_status = callback_data.get('status')

                # You can update your database, send confirmation emails, etc. based on 'status'

                # Log the callback data
                print('chapa-callback:', callback_data)

                callback_status = callback_data['status']
                print('callback_status:', callback_status)


                            
                orderItem = OrderItem.objects.all()
                if callback_status == 'success':
                    orderItem.delete()
                    # message = 'Cha-ching! Payment successful. You are officially poorer, but happier!'
                    message = 'successful'
                else:
                    # message = 'Payment failed or pending, order not updated.'
                    message = 'not successful'

                return Response({'message': message})
            except Exception as e:
                print(e)
                return Response({'message': 'Payment failed or pending, order not updated. ayyyy'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



#-----------------------------FETCHING DATA WHICH SENT TO BACKEND DJANGO---------------------
# -callback_data = request.data   ==>Commonly used in Django Rest Framework (DRF) views.
        #Description: This accesses the parsed data from the request body. It supports various content types like JSON, form data, etc.
# -callback_data = json.loads(request.body)  ==>Standard Django views without DRF.
# -callback_data = request.query_params  ==>Commonly used in Django Rest Framework (DRF) views.
        #Description: This accesses the query parameters from the URL. It works similar to request.GET in standard Django.