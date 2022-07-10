from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
 
from base.models import Countries
from base.api.Countries.Countries_Serializer import CountriesSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...
        print(token)
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/token',
        '/token/refresh',
        '/getCountries'
    ]
 
    return Response(routes)
 
# getting all of the countries 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCountries(request,id=-1):
    if int(id) > -1:
        return Response(CountriesSerializer().GetCountryById(id))
    else:
        return Response(CountriesSerializer().GetAllProducts())
  
 

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getCars(request):
#     print("innnn")
#     user = request.user
#     print(user)
#     cars = user.car_set.all()
#     print(cars)
#     serializer = CarSerializer(cars, many=True)
#     return Response(serializer.data)
 
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def addNote(request):
#     user = request.user
#     Note.objects.create(body=request.data['newnote'],user=user)
#     print(user)
#     notes = user.note_set.all()
#     print(notes)
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data)




# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def addCar(request):
#     print(request.data)
#     user = request.user
#     Car.objects.create(color=request.data["color"],model=request.data["model"],user=user)
#     print(user)
#     return Response({'car':'added'})