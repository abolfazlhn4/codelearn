from django.db.models import Count, F
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions
from rest_framework.filters import SearchFilter, OrderingFilter

from courses.models import Course, Category
from courses.openapi import category_list_schema, course_list_schema

from courses.serializers import CategorySerializer, CourseListSerializer
from users.permissions import ReadOnly


@category_list_schema
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser | ReadOnly]
    pagination_class = None


class CourseFilter(filters.FilterSet):
    price = filters.RangeFilter()
    is_free = filters.BooleanFilter(method='filter_by_price')

    def filter_by_price(self, queryset, name, value):
        if value:
            return queryset.filter(price=0)
        return queryset.filter(price__gt=0)

    class Meta:
        model = Course
        fields = ['category']


@course_list_schema
class CourseListView(generics.ListAPIView):
    serializer_class = CourseListSerializer
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter
    ]
    filterset_class = CourseFilter
    search_fields = ['title', 'short_description', 'description']
    ordering_fields = ['published_at', 'price']
    ordering = ['published_at']


    def get_queryset(self):
        return Course.objects.filter(status='PU').annotate(
            student_count=Count('students'),
        )