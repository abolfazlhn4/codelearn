# apps/users/auth.py
from drf_spectacular.utils import (
    extend_schema,
    extend_schema_view,
    OpenApiExample,
    OpenApiResponse,
)
from rest_framework import status

register_schema = extend_schema(
    summary='Request OTP verification code',
    description="""
    Send a 6-digit OTP verification code to the provided phone number via SMS.

    **Features:**
    - Validates phone number format (maximum 15 digits, starts with +98 for Iran)
    - Max failed attempts is 5 requests
    - OTP code expires after 2 minutes
    - Code is sent via SMS using configured backend (sms.ir)

    **Process:**
    1. User enters phone number
    2. Backend sends 6-digit code via SMS
    3. User enters code in verify endpoint
    """,
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'phone_number': {
                    'type': 'string',
                    'example': '+989123456789',
                    'description': 'Phone number in E164 format (maximum 15 digits)',
                    'pattern': '^09[0-9]{9}$'
                },
            },
            'required': ['phone_number']
        }
    },
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            description='OTP code sent successfully',
            response={
                'type': 'string',
                'properties': {
                    'session_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            }
        ),
        status.HTTP_400_BAD_REQUEST: OpenApiResponse(
            description='Validation error - Invalid phone number format',
            response={
                'type': 'object',
                'properties': {
                    'phone_number': {
                        'type': 'array',
                        'items': {'type': 'string'},
                        'example': ['Enter a valid phone number.']
                    }
                }
            }
        ),
        status.HTTP_429_TOO_MANY_REQUESTS: OpenApiResponse(
            description='Rate limit exceeded - Too many attempts',
            response={
                'type': 'object',
                'properties': {
                    'detail': {'type': 'string', 'example': 'Too many requests. Please try again later.'}
                }
            }
        ),
    },
    tags=['Authentication'],
    examples=[
        OpenApiExample(
            name='Valid request - International format',
            description='Request OTP with international format',
            value={
                'phone_number': '+989123456789'
            },
            request_only=True,
        ),
        OpenApiExample(
            name='Successful response',
            description='Response after successfully sending OTP',
            value={
                'session_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            },
            response_only=True,
        ),
        OpenApiExample(
            name='Error - Invalid phone number',
            description='Response when phone number format is invalid',
            value={
                'phone_number': ['Enter a valid phone number.']
            },
            response_only=True,
        ),
    ],
)

# ========== Schema for verify otp ==========
verify_schema = extend_schema(
    summary='Verify OTP code and login',
    description="""
    Verify the OTP code and login or create a user account.

    **Process:**
    1. User receives OTP code via SMS
    2. User submits session key + phone number + code + role
    3. Backend verifies the code
    4. If valid:
       - Creates new user (if doesn't exist) with specified role
       - Generates JWT tokens
       - Sets refresh_token in HTTP-only cookie
       - Returns access_token in response body

    **Security:**
    - OTP codes expire after 2 minutes
    - Each code can only be used once
    """,
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'session_token': {
                    'type': 'string',
                    'example': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    'description': 'session key that send in past step',
                },
                'phone_number': {
                    'type': 'string',
                    'example': '+989123456789',
                    'description': 'Phone number that received the OTP'
                },
                'role': {
                    'type': 'string',
                    'enum': ['student', 'instructor'],
                    'example': 'student',
                    'description': 'User role (student or instructor)'
                },
                'security_code': {
                    'type': 'integer',
                    'example': 123456,
                    'description': '6 digit security code',
                },
            },
            'required': ['phone_number', 'role']
        }
    },
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            description='Login successful - JWT tokens issued',
            response={
                'type': 'object',
                'properties': {
                    'access_token': {
                        'type': 'string',
                        'description': 'JWT access token (send in Authorization header)',
                        'example': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                    },
                    'is_user_created': {
                        'type': 'boolean',
                        'description': 'Whether a new user account was created',
                        'example': False
                    },
                    'phone_number': {
                        'type': 'string',
                        'description': 'Verified phone number',
                        'example': '+989123456789'
                    },
                    'role': {
                        'type': 'string',
                        'description': 'User role',
                        'enum': ['student', 'instructor'],
                        'example': 'student'
                    },
                }
            }
        ),
        status.HTTP_400_BAD_REQUEST: OpenApiResponse(
            description='Validation error - Invalid phone number, role, or OTP code',
            response={
                'type': 'object',
                'properties': {
                    'phone_number': {'type': 'array', 'items': {'type': 'string'}},
                    'role': {'type': 'array', 'items': {'type': 'string'}},
                    'non_field_errors': {'type': 'array', 'items': {'type': 'string'}},
                }
            }
        ),
        status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
            description='Invalid or expired OTP code',
            response={
                'type': 'object',
                'properties': {
                    'detail': {'type': 'string', 'example': 'Invalid or expired verification code'}
                }
            }
        ),
    },
    tags=['Authentication'],
    examples=[
        OpenApiExample(
            name='Student login - New user',
            description='Login as a new student (account will be created automatically)',
            value={
                'phone_number': '+989123456789',
                'role': 'student',
                'session_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3...',
                'security_code': 123456,
            },
            request_only=True,
        ),
        OpenApiExample(
            name='Instructor login - Existing user',
            description='Login as an existing instructor',
            value={
                'phone_number': '+989123456789',
                'role': 'instructor',
                'session_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3...',
                'security_code': 123456,
            },
            request_only=True,
        ),
        OpenApiExample(
            name='Successful response - Existing user',
            description='Response when user already exists',
            value={
                'access_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3...',
                'is_user_created': False,
                'phone_number': '+989123456789',
                'role': 'student'
            },
            response_only=True,
        ),
        OpenApiExample(
            name='Successful response - New user created',
            description='Response when a new user account was created',
            value={
                'access_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsImV4cCI6MTc...',
                'is_user_created': True,
                'phone_number': '+989123456789',
                'role': 'student'
            },
            response_only=True,
        ),
        OpenApiExample(
            name='Error - Invalid role',
            description='Response when role is not student or instructor',
            value={
                'Error': ['"admin" is not a valid choice.']
            },
            response_only=True,
        ),
    ],
)

# ========== complete schema for viewset ==========
sms_verification_schema_view = extend_schema_view(
    # schema for register method (send OTP)
    register=register_schema,

    # schema for verify method (verify OTP and login)
    verify=verify_schema,
)

# ========== Schema for CustomTokenRefreshView ==========
token_refresh_schema = extend_schema(
    tags=['Authentication'],
    summary='Refresh JWT access token',
    description="""
    Refresh the access token using the refresh token stored in HTTP-only cookie.

    - Reads refresh_token from cookie automatically
    - Returns new access token
    - Sets new refresh_token cookie if rotated
    """,
    request=None,  # Request body is not needed as token comes from cookie
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            description='Token refreshed successfully',
            response={
                'type': 'object',
                'properties': {
                    'access': {'type': 'string', 'description': 'New access token'},
                }
            }
        ),
        status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
            description="Invalid or expired refresh token",
            response={
                'type': 'object',
                'properties': {
                    'detail': {'type': 'string', 'description': 'Error message'},
                    'code': {'type': 'string', 'description': 'Error code'},
                }
            }
        ),
    },
)

# ========== Schema for LogoutView ==========
logout_schema = extend_schema(
    summary='Logout user',
    description="""
    Logout the currently authenticated user.

    - Blacklists the refresh token
    - Deletes the refresh_token cookie
    - Invalidates the user's session
    """,
    request=None,
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            description='Logout successful',
            response={
                'type': 'object',
                'properties': {
                    'detail': {'type': 'string', 'example': 'Successfully logged out'},
                }
            }
        ),
        status.HTTP_400_BAD_REQUEST: OpenApiResponse(
            description='Refresh token missing',
            response={
                'type': 'object',
                'properties': {
                    'detail': {'type': 'string', 'example': 'refresh token is required'},
                }
            }
        ),
        status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
            description='User not authenticated',
            response={
                'type': 'object',
                'properties': {
                    'detail': {'type': 'string', 'example': 'Authentication credentials were not provided.'},
                }
            }
        ),
    },
    tags=['Authentication'],
)

# ========== Schema for ProfileView ==========
profile_schema_view = extend_schema_view(
    get=extend_schema(
        summary="Get current user profile",
        description="""
        **Description:**  
        This endpoint returns the profile information of the currently logged-in user.  
        Sensitive fields such as `password`, `is_staff`, `is_superuser`, `is_active`, `groups`, and `user_permissions` are excluded.

        **Security Notes:**  
        - Only authenticated users (`IsAuthenticated`) can access this endpoint.
        - No need to send `id` in the URL; the current user is automatically selected.
        """,
        responses={
            status.HTTP_200_OK: OpenApiResponse(
                description="User profile retrieved successfully",
                response={
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer", "example": 1},
                        "username": {"type": "string", "example": "john_doe"},
                        "email": {"type": "string", "example": "john@example.com"},
                        "first_name": {"type": "string", "example": "John"},
                        "last_name": {"type": "string", "example": "Doe"},
                        "birth_date": {"type": "string", "format": "date", "example": "1990-01-01"},
                        "sex": {"type": "string", "enum": ["F", "M"], "example": "M"},
                        "role": {"type": "string", "enum": ["student", "instructor", "support", "admin"]},
                        "avatar": {"type": "string", "format": "uri", "example": "/media/users/1/avatars/photo.jpg"},
                        "bio": {"type": "string", "example": "I am a developer"},
                        "phone_number": {"type": "string", "example": "+989123456789"},
                        "national_code": {"type": "string", "example": "1234567890"},
                    }
                }
            ),
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(description="Authentication required"),
        },
        tags=["User Profile"],
    ),
    put=extend_schema(
        summary="Fully update user profile",
        description="Updates all editable profile fields. Fields `id`, `username`, `email`, and `role` are read-only.",
        request={
            "application/json": {
                "type": "object",
                "properties": {
                    "first_name": {"type": "string"},
                    "last_name": {"type": "string"},
                    "birth_date": {"type": "string", "format": "date"},
                    "sex": {"type": "string", "enum": ["F", "M"]},
                    "avatar": {"type": "string", "format": "binary"},
                    "bio": {"type": "string"},
                    "national_code": {"type": "string"},
                },
                "required": ["first_name", "last_name"],
            }
        },
        responses={
            status.HTTP_200_OK: OpenApiResponse(description="Profile updated successfully"),
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(description="Invalid data provided"),
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(description="Authentication required"),
        },
        tags=["User Profile"],
    ),
    patch=extend_schema(
        summary="Partially update user profile",
        description="Updates some of the profile fields (PATCH method).",
        request={
            "application/json": {
                "type": "object",
                "properties": {
                    "first_name": {"type": "string"},
                    "last_name": {"type": "string"},
                    "birth_date": {"type": "string", "format": "date"},
                    "sex": {"type": "string", "enum": ["F", "M"]},
                    "avatar": {"type": "string", "format": "binary"},
                    "bio": {"type": "string"},
                    "national_code": {"type": "string"},
                },
            }
        },
        responses={
            status.HTTP_200_OK: OpenApiResponse(description="Profile updated successfully"),
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(description="Invalid data provided"),
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(description="Authentication required"),
        },
        tags=["User Profile"],
    ),
)


# ========== Schema for InstructorVerificationView ==========
instructor_verification_schema_view = extend_schema_view(
    get=extend_schema(
        summary="Get instructor verification status and documents",
        description="""
        **Description:**  
        This endpoint returns the list of verification requests for the current instructor (usually only one record due to OneToOneField).  
        Status can be `P` (pending), `A` (approved), or `R` (rejected).

        **Permissions:**  
        - User must have `instructor` role (via `IsInstructor`).
        - User profile must be complete (`IsCompleteProfileOrReadOnly` for read access).
        """,
        responses={
            status.HTTP_200_OK: OpenApiResponse(
                description="List of verification requests",
                response={
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {"type": "integer"},
                            "user": {"type": "integer"},
                            "national_card": {"type": "string", "format": "uri"},
                            "identity_card": {"type": "string", "format": "uri"},
                            "resume": {"type": "string", "format": "uri"},
                            "status": {"type": "string", "enum": ["P", "A", "R"]},
                            "reject_reason": {"type": "string", "nullable": True},
                            "submitted_at": {"type": "string", "format": "date-time"},
                            "reviewed_at": {"type": "string", "format": "date-time"},
                        }
                    }
                }
            ),
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(description="Authentication required"),
            status.HTTP_403_FORBIDDEN: OpenApiResponse(description="Access denied (instructor role required or profile incomplete)"),
        },
        tags=["Instructor Verification"],
    ),
    post=extend_schema(
        summary="Submit new instructor verification request",
        description="""
        **Request Requirements:**  
        - User must have `instructor` role.  
        - User profile must be complete (all required fields filled).  
        - No existing request with `pending` or `approved` status should exist.  

        **Fields to submit:**  
        - `national_card` (national card image)  
        - `identity_card` (identity card image)  
        - `resume` (resume file)  

        After submission, the `status` will be set to `P` (pending) and the admin will review it.
        """,
        request={
            "multipart/form-data": {
                "type": "object",
                "properties": {
                    "national_card": {"type": "string", "format": "binary", "description": "National card image"},
                    "identity_card": {"type": "string", "format": "binary", "description": "Identity card image"},
                    "resume": {"type": "string", "format": "binary", "description": "Resume file"},
                },
                "required": ["national_card", "identity_card", "resume"],
            }
        },
        responses={
            status.HTTP_201_CREATED: OpenApiResponse(
                description="Verification request submitted successfully",
                response={
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer"},
                        "status": {"type": "string", "example": "P"},
                        "submitted_at": {"type": "string", "format": "date-time"},
                    }
                }
            ),
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(description="Invalid data or missing files"),
            status.HTTP_403_FORBIDDEN: OpenApiResponse(description="Profile incomplete or already has an approved request"),
            status.HTTP_409_CONFLICT: OpenApiResponse(description="A pending verification request already exists"),
        },
        tags=["Instructor Verification"],
        examples=[
            OpenApiExample(
                "Successful request example",
                value={
                    "national_card": "(binary file)",
                    "identity_card": "(binary file)",
                    "resume": "(binary file)",
                },
                request_only=True,
            ),
        ],
    ),
)