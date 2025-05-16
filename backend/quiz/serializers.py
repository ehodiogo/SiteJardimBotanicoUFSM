from rest_framework import serializers
from .models import QuizAmostra


class QuizAmostraSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAmostra
        fields = "__all__"
