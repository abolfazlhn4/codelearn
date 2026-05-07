from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


def avatar_field_path(instance, filename):
    return f'users/{instance.id}/avatars/{filename}'

def national_card_field_path(instance, filename):
    return f'users/{instance.user.id}/national_card/{filename}'

def identity_card_field_path(instance, filename):
    return f'users/{instance.user.id}/identity_card/{filename}'

def resume_field_path(instance, filename):
    return f'users/{instance.user.id}/resume/{filename}'

class Role(models.TextChoices):
    student = 'student'
    instructor = 'instructor'
    support = 'support'
    admin = 'admin'


class User(AbstractUser):
    SEX_CHOICES = (
        ('F', 'female'),
        ('M', 'male'),
    )

    birth_date = models.DateField(null=True, blank=True)
    sex = models.CharField(max_length=1, choices=SEX_CHOICES, null=True, blank=True)
    role = models.CharField(max_length=10, choices=Role.choices, default='student', editable=False)
    avatar = models.ImageField(upload_to=avatar_field_path, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    phone_number = PhoneNumberField()
    national_code = models.CharField(max_length=10, null=True, blank=True)

    def is_complete_profile(self):
        required_fields = [
            'first_name',
            'last_name',
            'email',
            'birth_date',
            'sex',
            'role',
            'bio',
            'phone_number',
            'national_code',
            'avatar',
        ]

        for field in required_fields:
            value = getattr(self, field)
            if not value:
                return False

        return True


    def __str__(self):
        return self.get_full_name()

    class Meta:
        unique_together = ('phone_number', 'role')


class InstructorVerification(models.Model):
    STATUS_CHOICES = (
        ('P', 'pending'),
        ('A', 'approved'),
        ('R', 'regected'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='verification')
    reviewed_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        limit_choices_to={'is_staff': True},
        null=True,
        blank=True,
    )
    national_card = models.ImageField(upload_to=national_card_field_path, null=True, blank=True)
    identity_card = models.ImageField(upload_to=identity_card_field_path, null=True, blank=True)
    resume = models.FileField(upload_to=resume_field_path)
    status = models.CharField(choices=STATUS_CHOICES, max_length=10, default='P')
    reject_reason = models.TextField(null=True, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.get_full_name()