from drf_spectacular.utils import extend_schema
from rest_framework import viewsets

from courses.models import Course
from courses.permissions import IsInstructorOrReadOnly
from courses.serializers import CourseSerializer


@extend_schema(
    tags=['Courses'],
    summary='Operation on courses',
)
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsInstructorOrReadOnly]


    def create(self, request, *args, **kwargs):
        pass