from django.contrib import admin

from users.models import User, InstructorVerification


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'phone_number', 'role', 'avatar', 'date_joined']


admin.site.register(User, UserAdmin)
admin.site.register(InstructorVerification)