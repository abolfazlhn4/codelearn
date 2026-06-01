from django.contrib.auth import get_user_model
from phone_verify.serializers import SMSVerificationSerializer
from rest_framework import serializers

from users.models import Role, InstructorVerification


class CustomSMSVerificationSerializer(SMSVerificationSerializer):
    role = serializers.ChoiceField(choices=[Role.student, Role.instructor], default=Role.student)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = [
            'password',
            'is_staff',
            'is_superuser',
            'is_active',
            'groups',
            'user_permissions',
        ]

class InstructorVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstructorVerification
        exclude = ['user', 'reviewed_by']
        read_only_fields = [
            'status',
            'reject_reason',
            'reviewed_at',
        ]