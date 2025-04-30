from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AmostraViewSet, DadosCientificosViewSet

router = DefaultRouter()
router.register(r'amostras', AmostraViewSet)
router.register(r'dados-cientificos', DadosCientificosViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
