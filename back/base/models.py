from django.db import models
from django.contrib.auth.models import User
from datetime import datetime , date
 


class Countries(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    name = models.CharField(max_length=50,blank=True,null=True,unique=True)
    flag = models.ImageField(null=True,blank=True,default='/placeholder.png')
    # flag = models.CharField(max_length=50,blank=True,null=True,unique=True)
    

    fields =['id','name','flag']
    def __str__(self):
     	   return self.name




class Airline_Companies(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    name = models.CharField(max_length=50,null=True,blank=True,unique=True)
    country = models.ForeignKey(Countries,on_delete=models.CASCADE,null=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

    fields =['id','name','country','user']
    def __str__(self):
     	   return self.name



class Flights(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    airline_company =models.ForeignKey(Airline_Companies,on_delete=models.CASCADE,null=True)
    origin_country = models.ForeignKey(Countries,on_delete=models.CASCADE,null=True,related_name='origin_country')
    destenation_country = models.ForeignKey(Countries,on_delete=models.CASCADE,null=True,related_name='destenation_country')
    departure_time=models.DateTimeField(auto_now_add=False,auto_now=False)   
    landing_time=models.DateTimeField(auto_now_add=False,auto_now=False)
    remaining_ticets=models.IntegerField(null=True,blank=True)

    fields =['id','airline_company','origin_country','destenation_country','departure_time','landing_time']
    def __str__(self):
     	   return str(self.id)            



class Customers(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    first_name =models.CharField(max_length=50,blank=True,null=True)
    last_name =models.CharField(max_length=50,blank=True,null=True)
    address = models.CharField(max_length=50,blank=True,null=True)
    phone_no=models.IntegerField(null=True,blank=True,unique=True)  
    credit_card_no=models.CharField(max_length=50,blank=True,null=True,unique=True)
    user=models.OneToOneField(User,on_delete=models.CASCADE,null=True)

    fields =['id','first_name','last_name','address','phone_no','credit_card_no','user']
    def __str__(self):
     	   return str(self.id)    




class Tickets(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    flight = models.ForeignKey(Flights,on_delete=models.CASCADE,null=True)
    customer = models.ForeignKey(Customers,on_delete=models.CASCADE,null=True)

    fields =['id','flight','customer']
    def __str__(self):
     	   return str(self.id)                   