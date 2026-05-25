from django.apps import AppConfig
from django.db.models.signals import post_migrate
from django.utils.translation import gettext_lazy as _


def create_default_groups(sender, **kwargs):
    from django.contrib.auth.models import Group
    groups = [_('Student'), _('Instructor'), _('Support'), _('Admin')]
    for group in groups:
        Group.objects.get_or_create(name=group)

    from django.contrib.auth.models import Permission
    Group.objects.get(name='Admin').permissions.add(*list(Permission.objects.all()))


class UsersConfig(AppConfig):
    name = 'users'
    verbose_name = _('Users')
    icon = 'fa fa-users'
    priority = 10
    divider_title = _('users')

    def ready(self):
        post_migrate.connect(create_default_groups, sender=self)