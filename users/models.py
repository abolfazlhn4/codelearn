from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField


def avatar_field_path(instance, filename):
    return f'users/{instance.id}/avatars/{filename}'

def national_card_field_path(instance, filename):
    return f'users/{instance.user.id}/national_card/{filename}'

def identity_card_field_path(instance, filename):
    return f'users/{instance.user.id}/identity_card/{filename}'

def resume_field_path(instance, filename):
    return f'users/{instance.user.id}/resume/{filename}'


class User(AbstractUser):
    SEX_CHOICES = (
        ('F', _('female')),
        ('M', _('male')),
    )

    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
        null=True,
        blank=True,
    )
    birth_date = models.DateField(_('birth date'), null=True, blank=True)
    sex = models.CharField(_('sex'),max_length=1, choices=SEX_CHOICES, null=True, blank=True)
    avatar = models.ImageField(_('avatar'),upload_to=avatar_field_path, null=True, blank=True)
    bio = models.TextField(_('biography'),null=True, blank=True)
    phone_number = PhoneNumberField(verbose_name=_('phone number'), unique=True)
    national_code = models.CharField(_('national code'),max_length=10, null=True, blank=True)

    def is_complete_profile(self):
        required_fields = [
            'first_name',
            'last_name',
            'email',
            'birth_date',
            'sex',
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

    @property
    def is_verified(self):
        verify = InstructorVerification.objects.filter(user=self)
        return verify.exists() and verify.last().status == 'A'

    def is_instructor(self):
        self.groups.filter(name='Instructor').exists()

    def __str__(self):
        return self.get_full_name() or str(self.phone_number)

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')


class InstructorVerification(models.Model):
    STATUS_CHOICES = (
        ('pending', _('pending')),
        ('approved', _('approved')),
        ('rejected', _('regected')),
    )

    user = models.OneToOneField(
        User,
        verbose_name=_('user'),
        on_delete=models.CASCADE,
        related_name='verification',
        limit_choices_to={'groups__name': 'Instructor'},
    )
    reviewed_by = models.ForeignKey(
        User,
        verbose_name=_('reviewed by'),
        on_delete=models.SET_NULL,
        limit_choices_to={'is_staff': True},
        null=True,
        blank=True,
    )
    national_card = models.ImageField(_('national card'),upload_to=national_card_field_path, null=True, blank=True)
    identity_card = models.ImageField(_('identity card'),upload_to=identity_card_field_path, null=True, blank=True)
    resume = models.FileField(_('resume'),upload_to=resume_field_path)
    status = models.CharField(_('status'), choices=STATUS_CHOICES, max_length=10, default='pending')
    reject_reason = models.TextField(_('reject reason'), null=True, blank=True)
    submitted_at = models.DateTimeField(_('submitted at'), auto_now_add=True)
    reviewed_at = models.DateTimeField(_('reviewed at'), null=True, blank=True)

    def __str__(self):
        return self.user.get_full_name()

    class Meta:
        verbose_name = _('instructor verification')
        verbose_name_plural = _('instructor verifications')