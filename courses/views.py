from rest_framework import generics, viewsets

from courses.models import Course, Category

from courses.permissions import IsVerifiedInstructor
from courses.serializers import CourseSerializer, CategorySerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CourseViewSet(viewsets.ViewSet):
    serializer_class = CourseSerializer
    permission_classes = [IsVerifiedInstructor]

    def get_queryset(self):
        return Course.objects.filter(instructor=self.request.user)