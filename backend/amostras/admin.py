from django.contrib import admin
from .models import DadosCientificos, Amostra

admin.site.register(DadosCientificos)
admin.site.register(Amostra)

admin.site.site_header = "Painel de Administração - Jardim Botânico UFSM"
admin.site.site_title = "Jardim Botânico UFSM"
admin.site.index_title = "Painel de Administração"
