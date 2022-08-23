from django.test import TestCase
from base.models import Countries


class AnimalTestCase(TestCase):
    fixtures = ['Country_data.json']
