from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

from code_learn import settings


def get_tokens_for_user(user):
    if not user.is_active:
      raise AuthenticationFailed("User is not active")

    refresh = RefreshToken.for_user(user)

    return {
        'refresh': refresh,
        'access': refresh.access_token,
    }

def set_refresh_cookie(response, refresh_token):
    response.set_cookie(
        key='refresh_token',
        value=str(refresh_token),
        secure=not settings.DEBUG,
        httponly=True,
        expires=refresh_token.lifetime,
        samesite='Strict',
    )