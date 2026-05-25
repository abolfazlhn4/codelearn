from django.contrib.auth.models import AnonymousUser
from rest_framework import permissions


class IsVerifiedUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return not isinstance(request.user, AnonymousUser) and request.user.is_verified