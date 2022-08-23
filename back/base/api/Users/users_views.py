from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from base.api.Users.users_serializer import UserSerializer


# get all the urls path
@api_view(['GET','POST','PUT','DELETE'])
def GetRoutes(request):
    routes = [
        'GetUsers/',
        'RegisterUser/',
        'DelUser/',
        'PutUser/',
    ]
 
    return Response(routes)
 

# get users
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetUsers(request,id=-1):

    if int(id) > -1:
        try: 
            # get specific user
            return Response(UserSerializer().GetUserById(id))
        except ObjectDoesNotExist as e:
            return Response(str(e))
    else:
        return Response(UserSerializer().GetAllUser())
  

# add user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def RegisterUser(request):

    try:  
        # let django handle the password 
        password = make_password(request.data['password']) 
        User.objects.create(username=request.data['username'] ,
                            password=password,
                            email=request.data['email'],
                            is_staff=request.data['is_staff'])

        return Response({"add": request.data['username']})

    except IntegrityError as e:
        return Response(str(e))

    except ObjectDoesNotExist as e:
            return Response(str(e))       


# delete user
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DelUser(request,id=-1): 
    try:
        temp= User.objects.get(id = id)
        temp.delete()
        return Response({'DELETE': id})

    except ObjectDoesNotExist as e:
        return Response(str(e))


# update user
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def PutUser(request,id=-1):

    try:   
        # creation of temp user
        temp=User.objects.get(id = id)

        temp.username =request.data['username']  
        temp.password =request.data['password'] 
        temp.email =request.data['email'] 
        temp.is_staff =request.data['is_staff']    
        temp.save()
        return Response({'PUT IN': id})

    except ObjectDoesNotExist as e:
            return Response(str(e))    

    except IntegrityError as e:
        return Response(str(e))
    


