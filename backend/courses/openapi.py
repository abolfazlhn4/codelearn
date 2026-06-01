# courses/openapi.py
from drf_spectacular.utils import (
    extend_schema,
    extend_schema_view,
    OpenApiResponse,
    OpenApiExample,
    OpenApiParameter,
)
from rest_framework import status

from .serializers import CategorySerializer, CourseInstructorSerializer, CourseListSerializer

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
course_instructor_schema_view = extend_schema_view(
    list=extend_schema(
        summary="List instructor's own courses",
        description="Returns all courses where the current user is the instructor. "
                    "No filtering, searching, or ordering is applied by default – "
                    "you can implement them manually if needed.",
        responses={
            status.HTTP_200_OK: OpenApiResponse(
                description="List of courses owned by the instructor",
                response=CourseInstructorSerializer(many=True),
            ),
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(description="Authentication required"),
            status.HTTP_403_FORBIDDEN: OpenApiResponse(description="User is not an instructor"),
        },
        tags=["Instructor Courses"],
    ),
    create=extend_schema(
        summary="Create a new course (draft)",
        description="""
        Creates a course in `draft` status.  
        - `instructor` is set automatically to the current user.  
        - `status` is forced to `DR` (draft).  
        - You can optionally provide nested `sections` and `lessons` in a single request.  
        - Read‑only fields (`id`, `published_at`, `archived_at`, `price`, etc.) are ignored if sent.

        **Nested creation example** (see example below).
        """,
        request=CourseInstructorSerializer,
        responses={
            status.HTTP_201_CREATED: CourseInstructorSerializer,
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(description="Invalid data"),
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(description="Authentication required"),
            status.HTTP_403_FORBIDDEN: OpenApiResponse(description="User is not a verified instructor"),
        },
        tags=["Instructor Courses"],
        examples=[
            OpenApiExample(
                "Create course with sections and lessons",
                value={
                    "title": "Django Advanced",
                    "category": 5,
                    "real_price": 780000,
                    "discount": 20,
                    "short_description": "Master Django",
                    "sections": [
                        {
                            "title": "Introduction",
                            "order": 0,
                            "lessons": [
                                {"title": "Setup", "order": 0, "video": None},
                                {"title": "First steps", "order": 1}
                            ]
                        }
                    ]
                },
                request_only=True,
            )
        ],
    ),
    retrieve=extend_schema(
        summary="Retrieve a single course",
        description="Get full details of a course owned by the instructor.",
        responses={
            status.HTTP_200_OK: CourseInstructorSerializer,
            status.HTTP_404_NOT_FOUND: OpenApiResponse(description="Course not found"),
        },
        tags=["Instructor Courses"],
    ),
    update=extend_schema(
        summary="Fully update a course",
        description="Replace all fields (PUT). Read‑only fields are ignored.",
        request=CourseInstructorSerializer,
        responses={
            status.HTTP_200_OK: CourseInstructorSerializer,
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(description="Invalid data"),
        },
        tags=["Instructor Courses"],
    ),
    partial_update=extend_schema(
        summary="Partially update a course",
        description="Update specific fields (PATCH).",
        request=CourseInstructorSerializer,
        responses={
            status.HTTP_200_OK: CourseInstructorSerializer,
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(description="Invalid data"),
        },
        tags=["Instructor Courses"],
    ),
    destroy=extend_schema(
        summary="Delete a course",
        description="Permanently delete a course and all its sections and lessons.",
        responses={
            status.HTTP_204_NO_CONTENT: OpenApiResponse(description="Course deleted"),
            status.HTTP_403_FORBIDDEN: OpenApiResponse(description="Not allowed"),
            status.HTTP_404_NOT_FOUND: OpenApiResponse(description="Course not found"),
        },
        tags=["Instructor Courses"],
    ),
    submit_for_review=extend_schema(
        summary="Submit draft course for admin review",
        description="""
        Changes the course status from `DR` (draft) to `PE` (pending) after validation.

        **Validation rules:**
        - Course must be in `draft` status.
        - At least one section must exist.
        - Each section must have at least one lesson.
        - Each lesson must have a video file (not `None`).

        If validation fails, a `400 Bad Request` is returned with a descriptive error message.
        """,
        request=None,
        responses={
            status.HTTP_200_OK: OpenApiResponse(
                description="Successfully submitted",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {"type": "string", "example": "course successfully sended to admin."},
                        "status": {"type": "string", "example": "PE"},
                    }
                }
            ),
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(
                description="Validation error (e.g., missing sections, lessons, or video)",
                response={
                    "type": "object",
                    "properties": {
                        "detail": {"type": "string"},
                    }
                }
            ),
            status.HTTP_401_UNAUTHORIZED: OpenApiResponse(description="Authentication required"),
            status.HTTP_403_FORBIDDEN: OpenApiResponse(description="User is not a verified instructor"),
            status.HTTP_404_NOT_FOUND: OpenApiResponse(description="Course not found"),
        },
        tags=["Instructor Courses"],
        examples=[
            OpenApiExample(
                "Success response",
                value={"detail": "course successfully sended to admin.", "status": "PE"},
                response_only=True,
            ),
            OpenApiExample(
                "Missing section error",
                value={"detail": "course should have at least one section."},
                response_only=True,
            ),
        ],
    ),
)


# ========== Schema for CourseListView (public) ==========
course_list_schema = extend_schema(
    summary="List published courses (public)",
    description="""
    Returns all courses with `status = 'PU'` (published).  
    Supports filtering, searching, and ordering as defined below.

    **Filtering** (`?category=1&is_free=true`):
    - `category`: Exact match by category ID.
    - `is_free`: `true` or `false`.

    **Search** (`?search=python`):
    - Searches in `title`, `short_description`, and `description` (case‑insensitive partial match).

    **Ordering** (`?ordering=price` or `?ordering=-published_at`):
    - `published_at` (ascending), `-published_at` (newest first).
    - `price` (cheapest first), `-price` (most expensive first).

    Additionally, the response includes an annotated `student_count` (number of enrolled students).
    """,
    parameters=[
        OpenApiParameter(
            name="category",
            type=int,
            location='query',
            description="Filter by category ID",
            required=False,
        ),
        OpenApiParameter(
            name="is_free",
            type=bool,
            location='query',
            description="Filter free (`true`) or paid (`false`) courses",
            required=False,
        ),
        OpenApiParameter(
            name="search",
            type=str,
            location='query',
            description="Search in title, short description, or full description",
            required=False,
        ),
        OpenApiParameter(
            name="ordering",
            type=str,
            location='query',
            description="Order by `published_at` or `price`. Prefix with `-` for descending.",
            required=False,
        ),
    ],
    responses={
        status.HTTP_200_OK: OpenApiResponse(
            description="List of published courses with student count",
            response=CourseListSerializer(many=True),
        ),
    },
    tags=["Public Courses"],
)
