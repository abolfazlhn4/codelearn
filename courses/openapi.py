# courses/openapi.py
from drf_spectacular.utils import (
    extend_schema,
    extend_schema_view,
    OpenApiResponse,
    OpenApiExample,
    OpenApiParameter,
)
from drf_spectacular.types import OpenApiTypes
from rest_framework import status

from .serializers import CategorySerializer, CourseInstructorSerializer

# ========== Schema for CategoryListView ==========
category_list_schema = extend_schema(
    summary="Get all categories",
    description="""
    Retrieve a list of all course categories.

    **Features:**
    - Categories can have parent-child relationships
    - Use `parent` field to get hierarchical structure
    - Categories are used to organize courses

    **Example response structure:**
    - Programming (parent=null)
        - Python (parent=1)
        - JavaScript (parent=1)
    - Design (parent=null)
        - UI/UX (parent=5)
    """,
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            description="List of categories retrieved successfully",
            response=CategorySerializer(many=True),
            examples=[
                OpenApiExample(
                    "Example response",
                    value=[
                        {
                            "id": 1,
                            "label": "برنامه‌نویسی",
                            "description": "دوره‌های آموزش برنامه‌نویسی",
                            "parent": None
                        },
                        {
                            "id": 2,
                            "label": "Python",
                            "description": "دوره‌های آموزش پایتون",
                            "parent": 1
                        }
                    ],
                    response_only=True,
                )
            ],
        ),
        status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
            description="Authentication required"
        ),
    },
    tags=["Categories"],
)

# ========== Schema for CourseInstructorViewSet ==========
course_list_schema = extend_schema(
    summary="List instructor's courses",
    description="""
    Retrieve all courses created by the currently authenticated instructor.

    **Permissions:**
    - User must have `instructor` role
    - Instructor must be verified (`is_verified` = True)

    **Returns only courses where:**
    - `instructor` = currently authenticated user

    **Course statuses:**
    - `DR`: Draft (not published yet)
    - `PU`: Published (visible to students)
    - `AR`: Archived (hidden)
    """,
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            description="List of courses retrieved successfully",
            response=CourseInstructorSerializer(many=True),
        ),
        status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
            description="Authentication required"
        ),
        status.HTTP_403_FORBIDDEN: OpenApiResponse(
            description="Access denied - User must be a verified instructor"
        ),
    },
    tags=["Instructor Courses"],
)

course_create_schema = extend_schema(
    summary="Create a new course",
    description="""
    Create a new course as a verified instructor.

    **Required fields:**
    - `title` (max 25 characters)
    - `category`
    - `real_price` (price in Toman)

    **Optional fields:**
    - `description`
    - `thumbnail` (course cover image)
    - `trailer` (introduction video)
    - `short_description` (max 100 characters)
    - `discount` (percentage, e.g., 20 for 20% off)
    - `requirements` (prerequisites for students)
    - `is_free` (if True, price will be 0)

    **Notes:**
    - `price` is calculated automatically: `real_price * (100 - discount) // 100`
    - New courses are created as `draft` by default
    - Instructor must be verified before creating courses
    """,
    request=CourseInstructorSerializer,
    responses={
        status.HTTP_201_CREATED: OpenApiResponse(
            description="Course created successfully",
            response=CourseInstructorSerializer,
        ),
        status.HTTP_400_BAD_REQUEST: OpenApiResponse(
            description="Invalid data provided",
            response={
                "type": "object",
                "properties": {
                    "title": {"type": "array", "items": {"type": "string"}},
                    "category": {"type": "array", "items": {"type": "string"}},
                }
            }
        ),
        status.HTTP_401_UNAUTHORIZED: OpenApiResponse(
            description="Authentication required"
        ),
        status.HTTP_403_FORBIDDEN: OpenApiResponse(
            description="Access denied - User must be a verified instructor"
        ),
    },
    tags=["Instructor Courses"],
    examples=[
        OpenApiExample(
            "Create paid course example",
            value={
                "title": "دوره مقدماتی پایتون",
                "description": "در این دوره با مفاهیم پایه پایتون آشنا می‌شوید",
                "short_description": "آموزش پایتون از صفر",
                "category": 1,
                "real_price": 500000,
                "discount": 20,
                "requirements": "آشنایی اولیه با کامپیوتر",
                "is_free": False
            },
            request_only=True,
        ),
        OpenApiExample(
            "Create free course example",
            value={
                "title": "آموزش رایگان Git",
                "description": "آموزش کامل Git و GitHub",
                "category": 1,
                "is_free": True,
                "real_price": 0
            },
            request_only=True,
        ),
    ],
)

course_retrieve_schema = extend_schema(
    summary="Get course details",
    description="""
    Retrieve detailed information about a specific course.

    **Includes:**
    - Basic course information
    - Sections and lessons (through related fields)
    - Instructor information
    - Enrollment status (if student is authenticated)
    """,
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            description="Course details retrieved successfully",
            response=CourseInstructorSerializer,
        ),
        status.HTTP_404_NOT_FOUND: OpenApiResponse(
            description="Course not found"
        ),
    },
    tags=["Instructor Courses"],
)

course_update_schema = extend_schema(
    summary="Update course (full update)",
    description="""
    Update all fields of an existing course (PUT method).

    **Note:** 
    - Only the instructor who created the course can update it
    - Send all fields, even those you don't want to change
    - Use PATCH for partial updates
    """,
    request=CourseInstructorSerializer,
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            description="Course updated successfully",
            response=CourseInstructorSerializer,
        ),
        status.HTTP_400_BAD_REQUEST: OpenApiResponse(
            description="Invalid data provided"
        ),
        status.HTTP_403_FORBIDDEN: OpenApiResponse(
            description="You don't have permission to update this course"
        ),
        status.HTTP_404_NOT_FOUND: OpenApiResponse(
            description="Course not found"
        ),
    },
    tags=["Instructor Courses"],
)

course_partial_update_schema = extend_schema(
    summary="Update course (partial update)",
    description="""
    Update specific fields of an existing course (PATCH method).

    **Example use cases:**
    - Change only the `status` from draft to published
    - Update `discount` without changing other fields
    - Modify `description` only
    """,
    request=CourseInstructorSerializer,
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            description="Course updated successfully",
            response=CourseInstructorSerializer,
        ),
        status.HTTP_400_BAD_REQUEST: OpenApiResponse(
            description="Invalid data provided"
        ),
        status.HTTP_403_FORBIDDEN: OpenApiResponse(
            description="You don't have permission to update this course"
        ),
        status.HTTP_404_NOT_FOUND: OpenApiResponse(
            description="Course not found"
        ),
    },
    tags=["Instructor Courses"],
)

course_delete_schema = extend_schema(
    summary="Delete course",
    description="""
    Delete a course permanently.

    **Warning:** This action is irreversible. All sections, lessons, and enrollments related to this course will also be deleted (due to CASCADE).

    **Recommendation:** Instead of deleting, consider archiving the course by setting `status` to `AR` (archived).
    """,
    responses={
        status.HTTP_204_NO_CONTENT: OpenApiResponse(
            description="Course deleted successfully"
        ),
        status.HTTP_403_FORBIDDEN: OpenApiResponse(
            description="You don't have permission to delete this course"
        ),
        status.HTTP_404_NOT_FOUND: OpenApiResponse(
            description="Course not found"
        ),
    },
    tags=["Instructor Courses"],
)

# ========== Schema View for ViewSet ==========
course_viewset_schema = extend_schema_view(
    list=course_list_schema,
    create=course_create_schema,
    retrieve=course_retrieve_schema,
    update=course_update_schema,
    partial_update=course_partial_update_schema,
    destroy=course_delete_schema,
)