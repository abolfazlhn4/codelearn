from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAdminUser

from courses.models import Course, Category
from courses.openapi import category_list_schema, course_viewset_schema

from courses.permissions import IsVerifiedInstructor
from courses.serializers import CourseInstructorSerializer, CategorySerializer, CourseListSerializer
from users.permissions import IsInstructor


@category_list_schema
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]


@course_viewset_schema
class CourseInstructorViewSet(viewsets.ModelViewSet):
    serializer_class = CourseInstructorSerializer

    def get_queryset(self):
        return Course.objects.filter(instructor=self.request.user)

    def get_permissions(self):
        if self.request.method == 'GET':
            return IsInstructor
        return IsVerifiedInstructor


class CourseListView(generics.ListAPIView):
    serializer_class = CourseListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']
    search_fields = ['title', 'short_description', 'description']
    ordering_fields = ['published_at', 'price']


    def get_queryset(self):
        return Course.objects.filter(status='PU').annotate(
            student_count=Count('students'),
        )