from django.contrib import admin
from unfold.admin import ModelAdmin

from users.models import User

class UserAdmin(ModelAdmin):
    list_display = ['id', 'phone_number', 'role', 'avatar', 'date_joined']


admin.site.register(User, UserAdmin)