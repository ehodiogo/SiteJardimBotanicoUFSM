from django.db import models

class Bolsista(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    matricula = models.CharField(max_length=25, unique=True)
    curso = models.CharField(max_length=100)
    periodo = models.CharField(max_length=10)

    def __str__(self):
        return self.matricula
    
class HorarioBolsista(models.Model):
    bolsista = models.ForeignKey(Bolsista, on_delete=models.CASCADE)
    dia_semana = models.IntegerField()
    horario_inicio = models.TimeField()
    horario_fim = models.TimeField()

    def __str__(self):
        return f"{self.bolsista} - {self.dia_semana} - {self.horario_inicio} - {self.horario_fim}"
