from rest_framework import serializers

from courses.models import Course, Category, Lesson, Section


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, required=False)

    class Meta:
        model = Section
        fields = '__all__'


class CourseInstructorSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, required=False)

    class Meta:
        model = Course
        fields = '__all__'
        read_only_fields = [
            'id',
            'instructor',
            'students',
            'published_at',
            'archived_at',
            'status',
            'discount',
            'price',
        ]


class CourseListSerializer(serializers.ModelSerializer):
    instructor = serializers.StringRelatedField(read_only=True)
    student_count = serializers.IntegerField(read_only=True)
    category = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Course
        fields = [
            'id',
            'thumbnail',
            'title',
            'short_description',
            'instructor',
            'student_count',
            'category',
            'price',
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