from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Participant, Interview
from .serializers import ParticipantSerializer, InterviewSerializer, UserSerializer


# Register User
# class RegisterView(APIView):
#     def post(self, request):
#         # Ensure passwords match
#         password1 = request.data.get("password")
#         password2 = request.data.get("password2")

#         if password1 != password2:
#             return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)
        
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # Login User
# class LoginView(APIView):
#     def post(self, request):
#         username = request.data.get("username")
#         password = request.data.get("password")
        
#         if not username or not password:
#             return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)
        
#         user = authenticate(username=username, password=password)
#         if user:
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 "refresh": str(refresh),
#                 "access": str(refresh.access_token),
#                 "message": "Login successful!",
#             })
#         return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
class RegisterView(APIView):
    def post(self, request):
        password1 = request.data.get("password")
        password2 = request.data.get("password2")

        if password1 != password2:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login User
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Login successful!",
            })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# Participant ViewSet
class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer


# Interview ViewSet
class InterviewViewSet(viewsets.ModelViewSet):
    queryset = Interview.objects.all().distinct()  # Ensure no duplicates
    serializer_class = InterviewSerializer
class EventDetailsView(APIView):
    def get(self, request, event_id):
        # Fetch the event by ID
        event = get_object_or_404(Interview, id=event_id)
        
        # Fetch participant names by their IDs
        participants = event.participants.all()
        
        # Prepare a list of participant names
        participant_names = [participant.name for participant in participants]
        
        # Prepare the response
        response = {
            "id": event.id,
            "title": event.title,
            "start_time": event.start_time,
            "end_time": event.end_time,
            "participants": participant_names
        }
        
        # Return the response as JSON
        return JsonResponse(response)