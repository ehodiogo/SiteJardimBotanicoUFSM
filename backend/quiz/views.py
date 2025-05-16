from rest_framework import viewsets
from .models import QuizAmostra
from .serializers import QuizAmostraSerializer


class QuizAmostraViewSet(viewsets.ModelViewSet):
    queryset = QuizAmostra.objects.all()
    serializer_class = QuizAmostraSerializer
