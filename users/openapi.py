from drf_spectacular.utils import extend_schema, OpenApiResponse

sms_verification_schema = extend_schema(
    tags=['Authentication'],
    summary='Send OTP code to the student phone number.',
)


verify_sms_schema = extend_schema(
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


token_refresh_schema = extend_schema(
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