from rest_framework import serializers
from .models import Product, Order, OrderItem, Customer, CustomerAddress

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  # Nesting ProductSerializer to include product details
    get_total = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = '__all__'

    def get_get_total(self, obj):
        return obj.get_total

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, source='orderitem_set')  # Ensure related_name is correctly used
    get_cart_total = serializers.SerializerMethodField()
    get_cart_items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'

    def get_get_cart_total(self, obj):
        return obj.get_cart_total

    def get_get_cart_items(self, obj):
        return obj.get_cart_items
    
class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = '__all__'