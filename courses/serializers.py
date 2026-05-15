from rest_framework import serializers

from courses.models import Course, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CourseInstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class CourseListSerializer(serializers.ModelSerializer):
    instructor = serializers.StringRelatedField(read_only=True)
    student_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Course
        fields = [
            'id',
            'thumbnail',
            'title',
            'short_description',
            'instructor',
            'student_count',
            'price',
            'is_free'
        ]


class CourseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'thumbnail',
            'trailer',
            'title',
            'short_description',
            'description',
            'is_free'
        ]