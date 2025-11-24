from django.contrib import admin
from .models import Especie, Mascota, PerfilUsuario

@admin.register(Especie)
class EspecieAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')   
    search_fields = ('nombre',)

@admin.register(Mascota)
class MascotaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'especie', 'publicador', 'vacunado', 'edad')
    list_filter = ('especie', 'vacunado')
    search_fields = ('nombre', 'descripcion')

@admin.register(PerfilUsuario)
class PerfilUsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'bio')   
    search_fields = ('user__username',)
