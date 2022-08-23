from rest_framework import serializers
from base.models import Customers




class CustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ('id','first_name','last_name','phone_no','credit_card_no','user')


    def GetCustomer(self,obj):
        return {
            "id": obj.id,
            "first_name": obj.first_name,
            "last_name": obj.last_name,
            "address": obj.address,
            "phone_no": obj.phone_no,
            "credit_card_no": obj.credit_card_no,
            "user": obj.user.username,  
            }

    def GetCustomerById(self,id):
        customer= Customers.objects.get(id = id)
        return {
            "id": customer.id,
            "first_name": customer.first_name,
            "last_name": customer.last_name,
            "address": customer.address,
            "phone_no": customer.phone_no,
            "credit_card_no": customer.credit_card_no,
            "user": customer.user.username, 
            }

    def GetAllCustomers(self):
        res=[] 
        for customer in Customers.objects.all(): 
            res.append(self.GetCustomer(customer))
        return res