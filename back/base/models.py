from django.db import models
from django.contrib.auth.models import User
 


class Countries(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    name = models.CharField(max_length=50,blank=True,null=True,unique=True)
    flag = models.CharField(max_length=50,blank=True,null=True)

    fields =['_id','name','flag']
    def __str__(self):
     	   return self.name




class Airline_Companies(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    name = models.CharField(max_length=50,null=True,blank=True,unique=True)
    Country_Id = models.ForeignKey(Countries,on_delete=models.SET_NULL,null=True)
    User_Id = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)

    fields =['_id','name','Country_Id','User_Id']
    def __str__(self):
     	   return self.name



class Flights(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    Airline_Company_Id =models.ForeignKey(Airline_Companies,on_delete=models.SET_NULL,null=True)
    Origin_Country_Id = models.ForeignKey(Countries,on_delete=models.SET_NULL,null=True)
    Destenation_Country_Id = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    Departure_Time=models.DateTimeField(auto_now_add=True)   
    Landing_Time=models.DateTimeField(auto_now_add=True)

    # need to correct later
    Remaining_Ticets=models.IntegerField(null=True,blank=True)

    fields =['id','Airline_Company_Id','Origin_Country_Id','Destenation_Country_Id','Departure_Time','Landing_Time']
    def __str__(self):
     	   return str(self.id)            



class Customers(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    First_name =models.CharField(max_length=50,blank=True,null=True)
    Last_name =models.CharField(max_length=50,blank=True,null=True)
    address = models.CharField(max_length=50,blank=True,null=True)
    Phone_No=models.IntegerField(null=True,blank=True,unique=True)  
    Credit_card_No=models.CharField(max_length=50,blank=True,null=True,unique=True)
    User_id=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)

    fields =['id','First_name','Last_name','address','Departure_Time','Phone_No','User_id']
    def __str__(self):
     	   return str(self.First_name)    




class Tickets(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    Flight_Id = models.ForeignKey(Flights,on_delete=models.SET_NULL,null=True)
    Customer_id = models.ForeignKey(Customers,on_delete=models.SET_NULL,null=True)

    fields =['_id','Flight_Id','Customer_id']
    def __str__(self):
     	   return str(self.id)                   