from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema, OpenApiResponse
from phone_verify.api import VerificationViewSet
from phone_verify.serializers import SMSVerificationSerializer
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenRefreshView

from users.services import get_tokens_for_user, set_refresh_cookie


@extend_schema(
    tags=['Authentication'],
    summary='Send OTP code to the student phone number.',
)
class SMSVerificationViewSet(VerificationViewSet):

    @extend_schema(
        summary='Verify OTP and get tokens',
        description='This endpoint verifies the OTP code sent to the user\'s phone number. '
                    'If valid, it authenticates the user and returns access token. '
                    'Refresh token is set as HttpOnly cookie.',
        request={
            'application/json': {
                'type': 'object',
                'properties': {
                    'phone_number': {
                        'type': 'string',
                        'example': '+989123456789',
                        'description': 'User\'s phone number'
                    },
                    'security_code': {
                        'type': 'string',
                        'example': '123456',
                        'description': '6-digit OTP code'
                    },
                    'session_token': {
                        'type': 'string',
                        'example': 'eyJhbGciOiJIUzI1NiIs...',
                        'description': 'Session token from send endpoint'
                    },
                },
                'required': ['phone_number', 'security_code', 'session_token']
            }
        },
        responses={
            200: OpenApiResponse(
                description='Successfully verified - Access token returned',
                response={
                    'type': 'object',
                    'properties': {
                        'access_token': {
                            'type': 'string',
                            'description': 'JWT access token for API authorization'
                        },
                        'is_user_created': {
                            'type': 'boolean',
                            'description': 'True if new user was created'
                        },
                        'user_id': {
                            'type': 'integer',
                            'description': 'User ID',
                        }
                    }
                }
            ),
            400: OpenApiResponse(
                description='Bad request - Invalid phone number, code, or session token',
                response={
                    'type': 'object',
                    'properties': {
                        'status': {'type': 'integer'},
                        'message': {'type': 'string'}
                    }
                }
            ),
            404: OpenApiResponse(
                description='Session not found or expired'
            ),
        }
    )
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

        # create token
        tokens = get_tokens_for_user(user)

        # create response and set refresh in cookie
        response = Response({
            'access_token': str(tokens.get('access')),
            'is_user_created': created,
            'phone_number': phone_number,
        }, status=status.HTTP_200_OK)
        set_refresh_cookie(response, tokens.get('refresh'))

        return response


@extend_schema(
    tags=['Authentication'],
    summary='Refresh access token',
    description='This endpoint accepts a refresh token (from HttpOnly cookie) and returns a new access token. '
                'The refresh token is automatically read from the cookie and rotated.',
    request=None,  # No request body needed - refresh token is read from cookie
    responses={
        200: OpenApiResponse(
            description='New access token generated successfully',
            response={
                'type': 'object',
                'properties': {
                    'access': {
                        'type': 'string',
                        'description': 'New JWT access token'
                    },
                    'access_token_expires_in': {
                        'type': 'integer',
                        'description': 'Token lifetime in seconds'
                    }
                }
            }
        ),
        401: OpenApiResponse(
            description='Invalid or expired refresh token',
            response={
                'type': 'object',
                'properties': {
                    'code': {'type': 'string'},
                    'messages': {
                        'type': 'array',
                        'items': {
                            'type': 'object',
                            'properties': {
                                'token_class': {'type': 'string'},
                                'token_type': {'type': 'string'},
                                'message': {'type': 'string'}
                            }
                        }
                    }
                }
            }
        ),
    }
)
class CustomTokenRefreshView(TokenRefreshView):

    def post(self, request, *args, **kwargs):
        # read refresh token from httponly cookie
        refresh_token = request.data.get('refresh_token')
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