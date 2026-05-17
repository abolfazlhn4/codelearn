from django.contrib.auth.models import AnonymousUser
from rest_framework import permissions


class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS

class IsInstructor(permissions.BasePermission):
    def has_permission(self, request, view):
        return not isinstance(request.user, AnonymousUser) and request.user.role == 'instructor'
    
    def has_object_permission(self, request, view, obj):
        return not isinstance(request.user, AnonymousUser) and request.user.role == 'instructor'


class IsCompleteProfile(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_complete_profile()

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)