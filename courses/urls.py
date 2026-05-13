from django.urls import path
from rest_framework.routers import DefaultRouter

from courses.views import CategoryListView, CourseViewSet


router = DefaultRouter()
router.register('', CourseViewSet, basename='courses')

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='categories'),
]

urlpatterns += router.urls