from datetime import timedelta

from django.contrib.auth import get_user_model
from django.utils import timezone
from oauth2_provider.models import Application, AccessToken, RefreshToken
from oauthlib.common import generate_token
from phone_verify.api import VerificationViewSet
from phone_verify.serializers import SMSVerificationSerializer
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from code_learn.settings import OAUTH2_PROVIDER


class SMSVerificationViewSet(VerificationViewSet):

    @action(
        detail=False,
        methods=["POST"],
        serializer_class=SMSVerificationSerializer,
    )
    def verify(self, request):
        serializer = SMSVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data["phone_number"]

        # create or get user
        user, created = get_user_model().objects.get_or_create(
            phone_number=phone_number,
            defaults={
                'role': 'student',
            }
        )

        # send OAuth2 token
        application = Application.objects.get(name='webapp')

        access_token = AccessToken.objects.create(
            user=user,
            token=generate_token(),
            application=application,
            expires= timezone.now() + timedelta(seconds=OAUTH2_PROVIDER.get('ACCESS_TOKEN_EXPIRE_SECONDS')),
            scope='read write',
        )

        refresh_token = RefreshToken.objects.create(
            user=user,
            application=application,
            access_token=access_token,
            token=generate_token(),
        )

        return Response({
            'access_token': access_token.token,
            'refresh_token': refresh_token.token,
            'token_type': 'Bearer',
            'expires_in': access_token.expires,
            'user_id': user.id,
            'role': user.role,
            'is_new_user': created,
        }, status=status.HTTP_200_OK)