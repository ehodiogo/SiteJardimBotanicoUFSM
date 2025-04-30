from django.core.management.base import BaseCommand
from amostras.models import DadosCientificos, Amostra, AmostraType

class Command(BaseCommand):
    help = 'Popula o banco de dados com dados científicos e amostras'

    def handle(self, *args, **kwargs):
        dadosCientificosAnimais = [
            {
                "nomeCientifico": "Vanellus chilensis",
                "reino": "Animalia",
                "filo": "Chordata",
                "classe": "Aves",
                "ordem": "Charadriiformes",
                "familia": "Charadriidae",
                "genero": "Vanellus",
                "especie": "V. chilensis"
            }
        ]

        seres = [
            {
                "nome": "Quero-quero",
                "grupo": "Ave",
                "descricao": "Ave de campo com plumagem característica, conhecida por sua vocalização forte.",
                "descricaoAcessivel": "O quero-quero é uma ave que tem penas brancas e pretas e é bastante barulhenta. Sua chamada pode ser ouvida à distância e é comum em áreas abertas.",
                "foto": "/fotos/quero-quero.jpg",
                "dadosCientificos": dadosCientificosAnimais[0],
                "type": "Animal",
            }
        ]

        for ser in seres:
            dc_data = ser["dadosCientificos"]
            dados_cientificos_obj, created = DadosCientificos.objects.get_or_create(
                nome_cientifico=dc_data["nomeCientifico"],
                defaults={
                    "reino": dc_data["reino"],
                    "filo": dc_data["filo"],
                    "classe": dc_data["classe"],
                    "ordem": dc_data["ordem"],
                    "familia": dc_data["familia"],
                    "genero": dc_data["genero"],
                    "especie": dc_data["especie"],
                }
            )

            amostra = Amostra.objects.create(
                nome_cientifico=dc_data["nomeCientifico"],
                nome_popular=ser["nome"],
                descricao=ser["descricao"],
                descricao_acessivel=ser["descricaoAcessivel"],
                imagem_url=ser["foto"],
                dados_cientificos=dados_cientificos_obj,
                tipo=AmostraType[ser["type"].upper()]
            )

            self.stdout.write(self.style.SUCCESS(f"Amostra criada: {amostra.nome_popular}"))

