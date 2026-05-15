from django.urls import path
from rest_framework.routers import DefaultRouter

from courses.views import CategoryListView, CourseInstructorViewSet, CourseListView

router = DefaultRouter()
router.register('me', CourseInstructorViewSet, basename='courses')

urlpatterns = [
    path('', CourseListView.as_view(), name='course-list'),
    path('categories/', CategoryListView.as_view(), name='categories'),
]

urlpatterns += router.urls