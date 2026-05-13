from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated

from users.models import InstructorVerification
from users.openapi.dashboard import instructor_verification_schema_view
from users.openapi.dashboard import profile_schema_view
from users.permissions import IsInstructor, IsCompleteProfileOrReadOnly
from users.serializers import ProfileSerializer, InstructorVerificationSerializer


@profile_schema_view
class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    lookup_field = 'id'

    def get_queryset(self):
        user = self.request.user
        return get_user_model().objects.filter(id=user.id)

    def get_object(self):
        return self.request.user


@instructor_verification_schema_view
class InstructorVerificationView(ListCreateAPIView):
    permission_classes = [IsInstructor, IsCompleteProfileOrReadOnly]
    serializer_class = InstructorVerificationSerializer

    def get_queryset(self):
        user = self.request.user
        return InstructorVerification.objects.filter(user__id=user.id)

    def get_object(self):
        return self.request.user

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        super().perform_create(serializer)