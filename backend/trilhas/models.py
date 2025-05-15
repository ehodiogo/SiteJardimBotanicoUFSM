from django.db import models

class Ponto(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()

    descricao = models.TextField(blank=True, null=True)

    # could have
    guia = models.ForeignKey('GuiaTrilha', on_delete=models.SET_NULL, null=True)

    # could have 
    order = models.IntegerField(blank=True, null=True)

    # imagem
    imagem = models.ImageField(upload_to='trilhas/', blank=True, null=True)

    def __str__(self):
        return f"{self.latitude}, {self.longitude}"
    
    class Meta:
        verbose_name_plural = 'Pontos'
    
class GuiaTrilha(models.Model):
    descricao = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.descricao
    
    class Meta:
        verbose_name_plural = 'Guias de Trilhas'


class Trilha(models.Model):
    nome = models.CharField(max_length=150)
    pontos = models.ManyToManyField(Ponto)
    duracao = models.CharField(max_length=50, blank=True, null=True)
    dificuldade = models.PositiveSmallIntegerField(blank=True, null=True)

    # tags da trilha
    tags = models.ManyToManyField('tag.Tag')

    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name_plural = 'Trilhas'