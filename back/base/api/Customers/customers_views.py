from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError

from base.models import Customers
from base.api.Customers.customers_serializer import CustomersSerializer

# get all the urls path
@api_view(['GET','POST','PUT','DELETE'])
def GetRoutes(request):
    routes = [
        'GetCustomers/',
        'AddCustomers/',
        'DelCustomers/',
        'PutCustomers/',
        'IsCustomer/',
        
    ]
 
    return Response(routes)
 

# getting all of the customers 
@api_view(['GET'])
def GetCustomers(request,id=-1):

    if int(id) > -1:
        try:
            # getting specific customer
            return Response(CustomersSerializer().GetCustomerById(id))
        except ObjectDoesNotExist as e:
            return Response(str(e))

    else:
        return Response(CustomersSerializer().GetAllCustomers())
  
  
# check if he is a customer 
@api_view(['GET'])
def IsCustomer(request):
    user= request.user
    customer_id = ""
    if (hasattr(user, 'customers') == True):
        customer= Customers.objects.get(user = user)
        customer_id = customer.id

    return Response({'is_cutomer':hasattr(user, 'customers') , 'customer_id' :customer_id})


# add customer
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddCustomers(request):
    try:
        if(request.data['first_name'] == ""
           or request.data['last_name'] == "" 
           or request.data['address'] == "" 
           or type(request.data['phone_no']) == 'int'
           or request.data['credit_card_no'] == ""):
            return Response(400)
        user= request.user
        Customers.objects.create(first_name=request.data['first_name'], 
                                 last_name=request.data['last_name'],
                                 address=request.data['address'],
                                 phone_no=request.data['phone_no'],
                                 credit_card_no=request.data['credit_card_no'],
                                 user = user)

        return Response({"POST":request.data['first_name']})

    except IntegrityError as e:
            print (e)
            if (str(e) == "UNIQUE constraint failed: base_customers.phone_no"):
                return Response (1) 
            if (str(e) == "UNIQUE constraint failed: base_customers.credit_card_no"):
                return Response (3)      
            return Response(999)  

# delete customer
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DelCustomers(request,id=-1):
    try:
        temp= Customers.objects.get(id = id)
        temp.delete()
        return Response({'DELETE': id})

    except ObjectDoesNotExist as e:
        return Response(str(e))


# update customer
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def PutCustomers(request,id=-1):
    print(request.data)
    try: 
        if(request.data['first_name'] == ""
           or request.data['last_name'] == "" 
           or request.data['address'] == "" 
           or type(request.data['phone_no']) == 'int'
           or request.data['credit_card_no'] == ""):
            return Response(400)
        # creation of temp customer   
        temp=Customers.objects.get(id = id)

        temp.first_name =request.data['first_name']
        temp.last_name =request.data['last_name']
        temp.address =request.data['address']
        temp.phone_no =request.data['phone_no']
        temp.credit_card_no =request.data['credit_card_no']
        temp.save()
        return Response({'PUT IN': id})

    except ObjectDoesNotExist as e:
            return Response(str(e))    

    except IntegrityError as e:
            print (e)
            if (str(e) == "UNIQUE constraint failed: base_customers.phone_no"):
                return Response (1) 
            if (str(e) == "UNIQUE constraint failed: base_customers.credit_card_no"):
                return Response (3)      
            return Response(999)  
    
