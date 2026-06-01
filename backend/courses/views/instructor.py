from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from courses.models import Course
from courses.openapi import course_instructor_schema_view
from courses.permissions import IsVerifiedUser
from courses.serializers import CourseInstructorSerializer
from users.permissions import IsInstructor, ReadOnly


@course_instructor_schema_view
class CourseInstructorViewSet(viewsets.ModelViewSet):
    serializer_class = CourseInstructorSerializer

    def get_queryset(self):
        return Course.objects.filter(instructor=self.request.user)

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            permission_classes = [IsInstructor]
        else:
            permission_classes = [IsInstructor, IsVerifiedUser]
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