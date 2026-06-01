from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from phone_verify.api import VerificationViewSet
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from users.openapi.auth import token_refresh_schema, logout_schema, sms_verification_schema_view
from users.serializers import CustomSMSVerificationSerializer
from users.services import get_tokens_for_user, set_refresh_cookie


@sms_verification_schema_view
class SMSVerificationViewSet(VerificationViewSet):

    @action(
        detail=False,
        methods=["POST"],
        serializer_class=CustomSMSVerificationSerializer,
    )
    def verify(self, request):
        serializer = CustomSMSVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data['phone_number']
        role = serializer.validated_data.get('role', 'student')
        if role not in ['student', 'instructor']:
            return Response(
                {'detail': 'Role must be student or instructor'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # create or get user
        user, created = get_user_model().objects.get_or_create(
            phone_number=phone_number,
        )

        # set user group
        group_name = role.capitalize()
        group = Group.objects.get(name=group_name)
        user.groups.add(group)

        # create token
        tokens = get_tokens_for_user(user)

        # create response and set refresh in cookie
        response = Response({
            'access_token': str(tokens.get('access')),
            'is_user_created': created,
            'phone_number': str(phone_number),
        }, status=status.HTTP_200_OK)
        set_refresh_cookie(response, tokens.get('refresh'))

        return response


@token_refresh_schema
class CustomTokenRefreshView(TokenRefreshView):

    def post(self, request, *args, **kwargs):
        # read refresh token from httponly cookie
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            request.data['refresh'] = refresh_token

        # verify and get response
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            new_refresh_token = response.data.get('refresh')
            if new_refresh_token:
                set_refresh_cookie(response, new_refresh_token)
                # delete refresh token from response body
                del response.data['refresh']

        return response


@logout_schema
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response(
                {'detail': 'refresh token is required'},
                status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except TokenError:
            return Response(
                {'detail': 'invalid token'},
                status.HTTP_400_BAD_REQUEST,
            )

        response = Response(
            {"detail": "Successfully logged out"},
            status=status.HTTP_200_OK
        )

        response.delete_cookie('refresh_token')

        return response
