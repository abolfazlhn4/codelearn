from django.urls import path
from rest_framework.routers import DefaultRouter

from users.views.auth import SMSVerificationViewSet, CustomTokenRefreshView, LogoutView
from users.views.dashboard import ProfileView, InstructorVerificationView


router = DefaultRouter()
router.register('auth/phone', SMSVerificationViewSet, basename='phone-auth')

urlpatterns = [
    path('auth/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('me/logout/', LogoutView.as_view(), name='logout'),
    path('me/profile/', ProfileView.as_view(), name='profile'),
    path('me/profile/verify/', InstructorVerificationView.as_view(), name='verify'),
]

urlpatterns += router.urls