from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AmostraViewSet, DadosCientificosViewSet
from trilhas.views import TrilhaViewSet

router = DefaultRouter()
router.register(r'amostras', AmostraViewSet)
router.register(r'dados-cientificos', DadosCientificosViewSet)
router.register(r"trilhas", TrilhaViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
