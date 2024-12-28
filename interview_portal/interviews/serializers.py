# from django.contrib.auth.models import User
# from django.contrib.auth.password_validation import validate_password
# from rest_framework import serializers
# from .models import Interview, Participant

# # Serializer for User Registration
# class UserSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, validators=[validate_password])

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password']

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             password=validated_data['password'],
#         )
#         return user

# # Serializer for Participant Model
# class ParticipantSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Participant
#         fields = ['id', 'name', 'email']

# # Serializer for Interview Model
# class InterviewSerializer(serializers.ModelSerializer):
#     participants = ParticipantSerializer(many=True)  # Nested Participant Serializer

#     class Meta:
#         model = Interview
#         fields = ['id', 'title', 'start_time', 'end_time', 'participants']
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Participant, Interview

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             password=validated_data['password']
#         )
#         return user
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = ['id', 'name', 'email']

#class InterviewSerializer(serializers.ModelSerializer):
    # participants = ParticipantSerializer(many=True)  # Nested serializer for participants

    # class Meta:
    #     model = Interview
    #     fields = ['id', 'title', 'start_time', 'end_time', 'participants']

    # def create(self, validated_data):
    #     participants_data = validated_data.pop('participants', [])
    #     interview = Interview.objects.create(**validated_data)
    #     for participant_data in participants_data:
    #         # Check if participant exists, otherwise create
    #         participant, created = Participant.objects.get_or_create(
    #             email=participant_data['email'],  # Assuming email is unique
    #             defaults={'name': participant_data['name']}
    #         )
    #         interview.participants.add(participant)
    #     return interview
# class InterviewSerializer(serializers.ModelSerializer):
#    participants = ParticipantSerializer(many=True)  # This serializes the participant data (including name)

#    class Meta:
#         model = Interview
#         fields = ['id', 'title', 'start_time', 'end_time', 'participants']

class InterviewSerializer(serializers.ModelSerializer):
    participants = serializers.SlugRelatedField(
        queryset=Participant.objects.all(),
        slug_field='name',  # This will serialize the participant as a simple string (name)
        many=True  # Serialize multiple participants
    )

    class Meta:
        model = Interview
        fields = ['id', 'title', 'start_time', 'end_time', 'participants']
