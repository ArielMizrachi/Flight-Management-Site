# Generated by Django 3.2.8 on 2022-08-21 15:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0015_auto_20220723_1927'),
    ]

    operations = [
        migrations.RenameField(
            model_name='flights',
            old_name='Remaining_ticets',
            new_name='remaining_ticets',
        ),
    ]