<!-- BACK -->
python manage.py loaddata Data.json
http://127.0.0.1:8000/api/login/token/

                { 
    "username":"ariel",
    "password":123
}


# back tasks
        Pass login - DONE
        checkers- DONE
        Crude - In progress (Countries,users,tickets,flights,ailines,customers)-DONE
        Connect databases with which other(ForeignKey)- DONE
        Data time - DONE
        Add dema data - In progress
        User with a register-Not yet(not a must)
        Add a picture - Not yet


# accounts
- Administrator
- Airline Company
- Customer
- Anonymous

# Database
- Flights
        Id: bigint ,Primay key ,auto
        Airline_Company_Id:bigint ,Foreign key (Airline_Companies)
        Origin_Country_Id: int ,Foreign key (Countries)
        Destenation_Country_Id :int ,Foreign key (Countries)
        Departure_Time : datatime
        Landing_Time: datatime  
        Remaining_Ticets: int


- Countries 
        Id: int ,Primay key ,auto
        Name: text ,unique 
        <!-- Flag: text (picture) -->


- Tickets
        Id: bigint ,Primay key ,auto
        Flight_Id: bigint ,Foreign key(Flights) ,unique
        Customer_id: bigint ,Foreign key (Customers),unique


- Airline_Companies  
        Id: bigint ,Primay key ,auto
        Name: text ,unique
        Country_Id: int ,Foreign key (Countries)
        User_Id: bigint ,unique ,Foreign key (Users)


- Customers
        Id: bigint ,Primay key ,auto
        First_name: text
        Last_name: text
        address: text
        Phone_No: text ,unique          
        Credit_card_No: text ,unique
        User_id: bigint ,unique ,Foreign key(Users) 


- Users    
        built in 


- User_Roles
        Id: int Primay key ,auto
        Role_Name: text ,unique (customer,airline or admin)


- Administrator 
        Id: int Primay key ,auto
        First_Name: text   
        Last_Name: text 
        User_id: bigint unique ,Foreign key (Users)               




<!-- FRONT -->

# Anonymos user
        See avilable flights
        See airlines
        Log in

# User
        See airlines
        See flights
        See avilable flights
        See airlines
        Become a customer
        Log out
- If customer
        
        Buy tickets
        See profile
        See purchased flights
        Cancel flight 

# Airline company (staff)

        See airlines
        See flights
        Add flights
        See which customer are on the flight (flight dits)
        Remove customers from flights
        Log out

# Admin

        God upon all of  mankind (basically all of the above)
        Remove a customer
        Remove airlines
        Ban (maybe)




<!-- FRONT -->
- learn css
- start basic routing
- connect api
- connec redux
- connect login 
- show more or less base on customer level
- done?