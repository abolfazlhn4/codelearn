# users/openapi.py
from drf_spectacular.utils import (
    extend_schema,
    extend_schema_view,
    OpenApiResponse,
    OpenApiExample,
)
from drf_spectacular.types import OpenApiTypes
from rest_framework import status

# ========== Schema برای ProfileView ==========
profile_schema_view = extend_schema_view(
    get=extend_schema(
        summary="Get current user profile",
        description="""
        Retrieve the profile information of the currently authenticated user.

        **Security:**
        - User must be authenticated (JWT token required)
        - Returns only non-sensitive fields (password, is_staff, is_superuser, etc. are excluded)
        """,
        responses={
            status.HTTP_200_OK: OpenApiResponse(
                description="Profile retrieved successfully",
                response={
                    "type": "object",
                    "properties": {
                        "id": {"type": "integer", "example": 1},
                        "username": {"type": "string", "example": "john_doe"},
                        "email": {"type": "string", "example": "john@example.com"},
                        "first_name": {"type": "string", "example": "John"},
                        "last_name": {"type": "string", "example": "Doe"},
                        "birth_date": {"type": "string", "format": "date", "nullable": True},
                        "sex": {"type": "string", "enum": ["F", "M"], "nullable": True},
                        "role": {"type": "string", "enum": ["student", "instructor", "support", "admin"]},
                        "avatar": {"type": "string", "format": "uri", "nullable": True},
                        "bio": {"type": "string", "nullable": True},
                        "phone_number": {"type": "string", "example": "+989123456789"},
                        "national_code": {"type": "string", "nullable": True},
                    }
                }
            ),
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
                description="Authentication credentials not provided or invalid"
            ),
        },
        tags=["User Profile"],
    ),
    put=extend_schema(
        summary="Update profile (full update)",
        description="""
        Update all profile fields. This is a full update (PUT method).

        **Note:** Fields like `id`, `username`, `role` are read-only and cannot be changed.
        """,
        request={
            "multipart/form-data": {
                "type": "object",
                "properties": {
                    "first_name": {"type": "string"},
                    "last_name": {"type": "string"},
                    "email": {"type": "string"},
                    "birth_date": {"type": "string", "format": "date"},
                    "sex": {"type": "string", "enum": ["F", "M"]},
                    "avatar": {"type": "string", "format": "binary"},
                    "bio": {"type": "string"},
                    "national_code": {"type": "string"},
                },
                "required": ["first_name", "last_name"],
            },
            "application/json": {
                "type": "object",
                "properties": {
                    "first_name": {"type": "string"},
                    "last_name": {"type": "string"},
                    "email": {"type": "string"},
                    "birth_date": {"type": "string", "format": "date"},
                    "sex": {"type": "string", "enum": ["F", "M"]},
                    "bio": {"type": "string"},
                    "national_code": {"type": "string"},
                }
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
        summary="Update profile (partial update)",
        description="""
        Partially update profile fields. Only send the fields you want to change (PATCH method).

        **Note:** Fields like `id`, `username`, `role` are read-only and cannot be changed.
        """,
        request={
            "multipart/form-data": {
                "type": "object",
                "properties": {
                    "first_name": {"type": "string"},
                    "last_name": {"type": "string"},
                    "email": {"type": "string"},
                    "birth_date": {"type": "string", "format": "date"},
                    "sex": {"type": "string", "enum": ["F", "M"]},
                    "avatar": {"type": "string", "format": "binary"},
                    "bio": {"type": "string"},
                    "national_code": {"type": "string"},
                },
            },
            "application/json": {
                "type": "object",
                "properties": {
                    "first_name": {"type": "string"},
                    "last_name": {"type": "string"},
                    "email": {"type": "string"},
                    "birth_date": {"type": "string", "format": "date"},
                    "sex": {"type": "string", "enum": ["F", "M"]},
                    "bio": {"type": "string"},
                    "national_code": {"type": "string"},
                }
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

# ========== Schema برای InstructorVerificationView ==========
instructor_verification_schema_view = extend_schema_view(
    get=extend_schema(
        summary="Get instructor verification requests",
        description="""
        Retrieve the verification request(s) for the currently authenticated instructor.

        **Security:**
        - User must have role `instructor`
        - Profile must be complete for POST requests (read-only access is allowed for GET)

        **Status values:**
        - `P`: Pending - Waiting for admin review
        - `A`: Approved - Verification successful, can create courses
        - `R`: Rejected - Verification failed, see `reject_reason` for details
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
                            "national_card": {"type": "string", "format": "uri", "nullable": True},
                            "identity_card": {"type": "string", "format": "uri", "nullable": True},
                            "resume": {"type": "string", "format": "uri"},
                            "status": {"type": "string", "enum": ["P", "A", "R"]},
                            "reject_reason": {"type": "string", "nullable": True},
                            "submitted_at": {"type": "string", "format": "date-time"},
                            "reviewed_at": {"type": "string", "format": "date-time", "nullable": True},
                        }
                    }
                }
            ),
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(description="Authentication required"),
            status.HTTP_403_FORBIDDEN: OpenApiResponse(
                description="Access denied - User must have instructor role"
            ),
        },
        tags=["Instructor Verification"],
    ),
    post=extend_schema(
        summary="Submit instructor verification request",
        description="""
        Submit documents for instructor verification.

        **Requirements:**
        - User must have role `instructor`
        - Profile must be complete (all fields: first_name, last_name, birth_date, sex, bio, national_code, avatar)
        - No pending or approved verification request should already exist

        **Documents to upload:**
        - `national_card`: Image of national card
        - `identity_card`: Image of identity card  
        - `resume`: Resume/CV file (PDF or DOC)

        After submission, the `status` will be set to `P` (pending) and admin will review it.
        """,
        request={
            "multipart/form-data": {
                "type": "object",
                "properties": {
                    "national_card": {
                        "type": "string",
                        "format": "binary",
                        "description": "National card image (JPEG, PNG)",
                    },
                    "identity_card": {
                        "type": "string",
                        "format": "binary",
                        "description": "Identity card image (JPEG, PNG)"
                    },
                    "resume": {
                        "type": "string",
                        "format": "binary",
                        "description": "Resume/CV file (PDF, DOC, DOCX)"
                    },
                },
                "required": ["resume"],
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
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(
                description="Invalid data or missing files"
            ),
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
                description="Authentication required"
            ),
            status.HTTP_403_FORBIDDEN: OpenApiResponse(
                description="Access denied - Profile incomplete or existing verification request"
            ),
            status.HTTP_409_CONFLICT: OpenApiResponse(
                description="A verification request is already pending or approved"
            ),
        },
        tags=["Instructor Verification"],
        examples=[
            OpenApiExample(
                "Success response example",
                value={
                    "id": 1,
                    "status": "P",
                    "submitted_at": "2024-01-15T10:30:00Z"
                },
                response_only=True,
            ),
        ],
    ),
)