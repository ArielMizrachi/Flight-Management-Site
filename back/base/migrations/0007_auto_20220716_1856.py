# Generated by Django 3.2.8 on 2022-07-16 15:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_alter_tickets_flight_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='airline_companies',
            old_name='Country_Id',
            new_name='country_id',
        ),
        migrations.RenameField(
            model_name='airline_companies',
            old_name='User_Id',
            new_name='user_id',
        ),
        migrations.RenameField(
            model_name='customers',
            old_name='Credit_card_No',
            new_name='credit_card_no',
        ),
        migrations.RenameField(
            model_name='customers',
            old_name='First_name',
            new_name='first_name',
        ),
        migrations.RenameField(
            model_name='customers',
            old_name='Last_name',
            new_name='last_name',
        ),
        migrations.RenameField(
            model_name='customers',
            old_name='Phone_No',
            new_name='phone_no',
        ),
        migrations.RenameField(
            model_name='customers',
            old_name='User_id',
            new_name='user_id',
        ),
        migrations.RenameField(
            model_name='flights',
            old_name='Remaining_Ticets',
            new_name='Remaining_ticets',
        ),
        migrations.RenameField(
            model_name='flights',
            old_name='Airline_Company_Id',
            new_name='airline_Company_id',
        ),
        migrations.RenameField(
            model_name='flights',
            old_name='Departure_Time',
            new_name='departure_time',
        ),
        migrations.RenameField(
            model_name='flights',
            old_name='Destenation_Country_Id',
            new_name='destenation_Country_id',
        ),
        migrations.RenameField(
            model_name='flights',
            old_name='Landing_Time',
            new_name='landing_time',
        ),
        migrations.RenameField(
            model_name='flights',
            old_name='Origin_Country_Id',
            new_name='origin_Country_id',
        ),
        migrations.RenameField(
            model_name='tickets',
            old_name='Customer_id',
            new_name='customer_id',
        ),
        migrations.RenameField(
            model_name='tickets',
            old_name='Flight_Id',
            new_name='flight_id',
        ),
    ]
