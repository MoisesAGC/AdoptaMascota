from django.db import models
from django.contrib.auth.models import User 

class Especie(models.Model):
    # VARCHAR(50)
    nombre = models.CharField(max_length=50) 
    
    def __str__(self):
        return self.nombre
    
class Mascota(models.Model):
    nombre = models.CharField(max_length=100) 
    descripcion = models.TextField()
    edad = models.PositiveIntegerField()
    vacunado = models.BooleanField(default=False)
    fecha_reporte = models.DateField(auto_now_add=True)
    imagen = models.ImageField(upload_to='mascotas/')
    
    especie = models.ForeignKey(Especie, on_delete=models.CASCADE)
    publicador = models.ForeignKey(User, on_delete=models.CASCADE)
    sexo = models.CharField(
        max_length=10,
        choices=[('macho', 'Macho'), ('hembra', 'Hembra')],
        default='macho',          
    )
    ubicacion = models.CharField(
        max_length=100,
        default='Sin especificar',  
        blank=True,
    )
    
    def __str__(self):
        return self.nombre
    
class PerfilUsuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='perfiles/', null=True, blank=True)
        
    def __str__(self):
        return self.user.username
    
