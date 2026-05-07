from django.contrib.auth import get_user_model
from django.db import models


class Category(models.Model):
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        related_name='children',
        related_query_name='child',
        null=True,
        blank=True,
    )

    label = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.label


def course_field_path(instance, filename):
    return f'courses/{instance.id}/{filename}'

class Course(models.Model):
    STATUS_CHOICES = (
        ('DR', 'draft'),
        ('PU', 'published'),
        ('AR', 'archived'),
    )

    instructor = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'instructor'},
        related_name='courses',
        related_query_name='course',
    )
    students = models.ManyToManyField(
        get_user_model(),
        related_name='enrolled_courses',
        related_query_name='enrolled_course',
        limit_choices_to={'role': 'student'},
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='courses',
    )

    title = models.CharField(max_length=25)
    description = models.TextField(null=True, blank=True)
    thumbnail = models.ImageField(upload_to=course_field_path, null=True, blank=True)
    trailer = models.FileField(upload_to=course_field_path, null=True, blank=True)
    short_description = models.CharField(max_length=100, null=True, blank=True)
    real_price = models.PositiveIntegerField(help_text='price in toman', default=0)
    discount = models.PositiveIntegerField(null=True, blank=True, help_text='percent of discount',)
    requirements = models.TextField(null=True, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, default='draft', max_length=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
    archived_at = models.DateTimeField(null=True, blank=True)
    is_free = models.BooleanField(default=False)

    @property
    def price(self):
        return self.real_price * (100 - self.discount) // 100

    def __str__(self):
        return self.title


class Section(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='sections',
        related_query_name='section',
    )

    title = models.CharField(max_length=255)
    is_free = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


def lesson_directory_path(instance, filename):
    return f'courses/{instance.section.course.id}/{instance.section.title}/{filename}'

class Lesson(models.Model):
    section = models.ForeignKey(
        Section,
        on_delete=models.CASCADE,
        related_name='lessons',
        related_query_name='lesson',
    )

    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    video = models.FileField(upload_to=lesson_directory_path)
    is_free = models.BooleanField(default=False)

    def __str__(self):
        return self.title