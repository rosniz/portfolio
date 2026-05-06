from rest_framework import serializers
from .models import (
    Profile, SkillCategory, Skill, Project,
    Experience, Education, Certification, ContactMessage
)


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'level']


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'icon', 'order', 'skills']


class ProfileSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    cv_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id', 'name', 'title', 'bio', 'location',
            'email', 'phone', 'github', 'linkedin',
            'portfolio_url', 'photo_url', 'cv_url'
        ]

    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.photo.url) if request else obj.photo.url
        return None

    def get_cv_url(self, obj):
        if obj.cv:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.cv.url) if request else obj.cv.url
        return None


class ProjectSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'technologies',
            'github_url', 'live_url', 'image_url',
            'featured', 'start_date', 'end_date', 'order'
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id', 'title', 'company', 'start_date',
            'end_date', 'description', 'technologies', 'order'
        ]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'degree', 'school', 'start_year', 'end_year', 'description', 'order']


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ['id', 'title', 'issuer', 'description', 'order']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
