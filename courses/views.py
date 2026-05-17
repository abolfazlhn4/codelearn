from django.db.models import Count
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from courses.models import Course, Category
from courses.openapi import category_list_schema, course_list_schema, course_instructor_schema_view

from courses.permissions import IsVerifiedInstructor
from courses.serializers import CourseInstructorSerializer, CategorySerializer, CourseListSerializer
from users.permissions import IsInstructor, ReadOnly


@category_list_schema
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser | ReadOnly]
    pagination_class = None


@course_instructor_schema_view
class CourseInstructorViewSet(viewsets.ModelViewSet):
    serializer_class = CourseInstructorSerializer

    def get_queryset(self):
        return Course.objects.filter(instructor=self.request.user)

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            permission_classes = [IsInstructor]
        else:
            permission_classes = [IsVerifiedInstructor]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(
            status='draft',
            instructor=self.request.user,
        )

    @action(detail=True, methods=['post'])
    def submit_for_review(self, request):
        course = self.get_object()

        if course.status != 'DR':
            return Response(
                {'detail': 'Course is not draft.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not course.sections.exists():
            return Response(
                {'detail': 'course should have at least one section.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        for section in course.sections.all():
            if section.lessons.count() == 0:
                return Response(
                    {'detail': f'section {section.title} should have at least one lesson.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            for lesson in section.lessons.all():
                if lesson.video is None:
                    return Response(
                        {'detail': f'lesson {lesson.title} should have video.'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

        course.status = 'PE'
        course.submitted_at = timezone.now()
        course.save(update_fields=['status', 'submitted_at', 'updated_at'])

        return Response(
            {'detail': 'course successfully sended to admin.', 'status': course.status},
            status=status.HTTP_200_OK
        )


@course_list_schema
class CourseListView(generics.ListAPIView):
    serializer_class = CourseListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'is_free']
    search_fields = ['title', 'short_description', 'description']
    ordering_fields = ['published_at', 'price']


    def get_queryset(self):
        return Course.objects.filter(status='PU').annotate(
            student_count=Count('students'),
        )