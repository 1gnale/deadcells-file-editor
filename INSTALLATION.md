# 📋 Guía de Instalación de Guardados - Dead Cells

## 📂 Ubicación de archivos de guardado

### Windows
```
%USERPROFILE%\Documents\Motion Twin\Dead Cells\save\
```
**Ruta completa típica:**
```
C:\Users\[TuUsuario]\Documents\Motion Twin\Dead Cells\save\
```

### Steam (Windows)
```
%USERPROFILE%\Documents\My Games\Dead Cells\save\
```
**O también:**
```
C:\Users\[TuUsuario]\AppData\Local\Motion Twin\Dead Cells\save\
```

### Linux
```
~/.local/share/Motion Twin/Dead Cells/save/
```

### macOS
```
~/Library/Application Support/Motion Twin/Dead Cells/save/
```

## 📝 Nombres de archivos

Los archivos de guardado tienen nombres específicos según el slot:

- **Slot 1:** `save_0.dat` o `save_0.save`
- **Slot 2:** `save_1.dat` o `save_1.save`  
- **Slot 3:** `save_2.dat` o `save_2.save`

## 🔧 Instrucciones de instalación

### 1. Hacer backup
```bash
# Copia tu guardado original a un lugar seguro
cp save_0.dat save_0.dat.backup
```

### 2. Cerrar Dead Cells
- Asegúrate de que el juego esté completamente cerrado
- Cierra Steam si es necesario

### 3. Reemplazar archivo
- Renombra el archivo generado (`.save`) al nombre correcto
- Ejemplo: `deadcells-save-2024-10-23.save` → `save_0.dat`
- Coloca el archivo en la carpeta de guardados

### 4. Verificar permisos
- En Linux/macOS: `chmod 644 save_0.dat`
- En Windows: Verificar que no esté marcado como solo lectura

### 5. Iniciar juego
- Abre Dead Cells
- Selecciona el slot correspondiente
- Verifica que los items estén desbloqueados

## ⚠️ Problemas comunes

### Archivo no reconocido
- **Causa:** Nombre incorrecto o ubicación errónea
- **Solución:** Verificar ruta y nombre exacto

### Guardado corrupto  
- **Causa:** Archivo mal formateado
- **Solución:** Usar backup original y regenerar

### Items no aparecen
- **Causa:** IDs incorrectos en el archivo
- **Solución:** Verificar mapeo de items en el código

### Permisos denegados
- **Causa:** Sistema de archivos protegido
- **Solución:** Ejecutar como administrador o cambiar permisos

## 🛠️ Verificación del guardado

### Comprobar integridad
```bash
# Verificar que el archivo no esté corrupto
file save_0.dat
```

### Verificar contenido (si es JSON)
```bash
# Si el archivo es legible
cat save_0.dat | jq .
```

### Tamaño del archivo
- Los guardados normales: 10-100 KB
- Guardados muy pequeños (< 1KB) pueden estar corruptos
- Guardados muy grandes (> 1MB) pueden tener problemas

## 🔍 Debug y troubleshooting

### Logs del juego
**Windows:**
```
%USERPROFILE%\AppData\Local\Motion Twin\Dead Cells\logs\
```

**Steam:**
```
Steam\logs\content_log.txt
```

### Verificar Steam Cloud
- Deshabilitar sincronización Steam Cloud temporalmente
- Propiedades del juego → General → Desmarcar "Keep games saves in the Steam Cloud"

### Modo de compatibilidad
- En Windows: Ejecutar Dead Cells como administrador
- Verificar que no esté en modo de compatibilidad

## 📊 Estructura del archivo

### Formato personalizado (este editor)
```
DEADCELLS_SAVE_V1
{JSON content}
CHECKSUM:{hash}
```

### Formato original del juego
- Binario propietario
- No directamente editable
- Requiere herramientas específicas

## 🚀 Tips avanzados

### Múltiples guardados
- Mantén varios archivos backup
- Usa nombres descriptivos: `save_0_speedrun.dat`

### Sincronización
- Deshabilitar Steam Cloud para control manual
- Usar herramientas de sincronización propias

### Mods y compatibilidad
- Algunos mods pueden afectar guardados
- Verificar compatibilidad antes de usar

### Testing
- Prueba primero en slot vacío
- Verifica funcionamiento antes de reemplazar guardado principal

## 📞 Soporte adicional

### Si nada funciona:
1. Verificar versión de Dead Cells
2. Comprobar integridad de archivos (Steam)
3. Reinstalar el juego si es necesario
4. Consultar foros oficiales

### Logs útiles:
- Activar logging detallado en el juego
- Revisar archivos de crash
- Documentar errores específicos

---

**⚠️ Recordatorio importante:** Siempre haz backup de tus guardados originales antes de usar archivos generados por herramientas externas.