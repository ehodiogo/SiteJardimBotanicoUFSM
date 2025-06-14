from django.db import models

class Bolsista(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    matricula = models.CharField(max_length=25, unique=True)
    curso = models.CharField(max_length=100)
    periodo = models.CharField(max_length=10)

    def __str__(self):
        return self.matricula + " - " + self.curso + " - " + self.nome
    
    class Meta:
        verbose_name = 'Bolsista do Jardim Botânico'
        verbose_name_plural = 'Bolsistas do Jardim Botânico'
    
class HorarioBolsista(models.Model):
    bolsista = models.ForeignKey(Bolsista, on_delete=models.CASCADE)
    dia_semana = models.IntegerField()
    horario_inicio = models.TimeField()
    horario_fim = models.TimeField()

    def __str__(self):
        return f"{self.bolsista} - {self.dia_semana} - {self.horario_inicio} - {self.horario_fim}"

    class Meta:
        verbose_name = 'Horário do Bolsista do Jardim Botânico'
        verbose_name_plural = 'Horários do Bolsista do Jardim Botânico'

# dia semana = 0 - domingo
# dia semana = 1 - segunda
# dia semana = 2 - terca
# dia semana = 3 - quarta
# dia semana = 4 - quinta
# dia semana = 5 - sexta
# dia semana = 6 - sabado