from getpass import getuser
from rest_framework import serializers
from django.contrib.auth.models import User





class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','password','email','is_superuser','is_staff')


    def GetUser(self,obj):
        return {
            "id": obj.id,
            "username": obj.username,
            "email": obj.email,
            "is_superuser": obj.is_superuser,
            "is_staff": obj.is_staff,

            }

    def GetUserById(self,id):
        user= User.objects.get(id = id)
        return {"id": user.id,
                "username": user.username,
                "email": user.email,
                "is_superuser": user.is_superuser,
                "is_staff": user.is_staff,}

    def GetAllUser(self):
        res=[] 
        for user in User.objects.all(): 
         
            res.append(self.GetUser(user))
        return res