from django.urls import path
from rest_framework.routers import SimpleRouter

from users.views.auth import SMSVerificationViewSet, CustomTokenRefreshView, LogoutView


router = SimpleRouter()
router.register('auth/phone', SMSVerificationViewSet, basename='phone-auth')

urlpatterns = [
    path('auth/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('me/logout/', LogoutView.as_view(), name='logout'),
]

urlpatterns += router.urls