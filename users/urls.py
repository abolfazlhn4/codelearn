from rest_framework.routers import DefaultRouter

from users.views import SMSVerificationViewSet


router = DefaultRouter()
router.register('auth/phone', SMSVerificationViewSet, basename='phone-auth')
urlpatterns = router.urls