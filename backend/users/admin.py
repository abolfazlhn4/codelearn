from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from users.models import User, InstructorVerification


class StatusFilter(admin.SimpleListFilter):
    title = _('status')
    parameter_name = 'status'

    def lookups(self, request, model_admin):
        return (
            ('all', _('All')),
            ('pending', _('pending')),
            ('approved', _('approved')),
            ('rejected', _('rejected')),
        )

    def queryset(self, request, queryset):
        if self.value() and self.value() != 'all':
            return queryset.filter(status=self.value())
        return queryset

    def value(self):
        value = super().value()
        if value is None:
            value = 'pending'
        return value



class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'full_name', 'phone_number', 'sex', 'roles', 'date_joined', 'is_active']
    list_filter  = ['date_joined', 'is_active', 'is_staff']

    @admin.display
    def full_name(self, obj):
        color = 'red' if obj.is_staff else 'white'
        return format_html(
            '<span style="color: {}">{}</span>',
            color,
            obj.get_full_name(),
        )

    @admin.display
    def roles(self, obj):
        return obj.groups

    full_name.short_description = _('Full name')
    roles.short_description = _('Roles')


class InstructorAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'color_status', 'reviewed_by', 'submitted_at', 'reviewed_at']
    list_filter =  [StatusFilter, 'submitted_at', 'reviewed_by', 'reviewed_at']

    @admin.display(description=_('status'))
    def color_status(self, obj):
        color = 'white'
        if obj.status == 'approved':
            color = 'green'
        elif obj.status == 'rejected':
            color = 'red'

        return format_html(
            '<span style="color: {}">{}</span>',
            color,
             obj.get_status_display(),
        )

admin.site.register(User, UserAdmin)
admin.site.register(InstructorVerification, InstructorAdmin)