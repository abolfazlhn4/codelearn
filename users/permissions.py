from rest_framework import permissions


class IsInstructor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'instructor'
    
    def has_object_permission(self, request, view, obj):
        return request.user and request.user.role == 'instructor'


class IsCompleteProfileOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_complete_profile()

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)