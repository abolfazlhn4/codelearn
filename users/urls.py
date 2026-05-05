from django.urls import path
from rest_framework.routers import SimpleRouter

from users.views import SMSVerificationViewSet, CustomTokenRefreshView


router = SimpleRouter()
router.register('auth/phone', SMSVerificationViewSet, basename='phone-auth')

urlpatterns = router.urls + [
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]