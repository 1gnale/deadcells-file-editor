# Dead Cells Save Editor - Guía de Compatibilidad

## 🎮 Sobre esta aplicación

Esta aplicación web te permite crear archivos de guardado personalizados para Dead Cells con los desbloqueos que elijas. Debido a la complejidad del formato binario nativo del juego, ofrecemos dos opciones:

## 📁 Tipos de archivos generados

### 1. user.dat (Experimental)
- **Descripción**: Archivo binario que intenta replicar el formato nativo de Dead Cells
- **Versión objetivo**: Dead Cells v3.5.x
- **Estado**: Experimental - puede mostrar errores de compatibilidad
- **Uso**: Reemplazar directamente el archivo user.dat del juego

### 2. Backup Alternativo (Recomendado)
- **Descripción**: Archivos en formatos estándar para usar con herramientas de modding
- **Formatos incluidos**:
  - `.json` - Datos estructurados completos
  - `.txt` - Lista legible de items desbloqueados
  - `.csv` - Datos tabulares para análisis
- **Estado**: Estable y compatible
- **Uso**: Importar con herramientas de la comunidad

## ⚠️ Mensaje de error: "La partida guardada no es compatible"

Si ves este error al intentar usar el archivo user.dat generado, significa que:

1. **El formato binario no coincide** exactamente con las expectativas del juego
2. **La versión del juego** podría haber cambiado el formato interno
3. **Faltan datos específicos** que el juego requiere para validar el archivo

### Soluciones recomendadas:

#### Opción 1: Usar Backup Alternativo
1. Genera los archivos de backup (botón naranja)
2. Usa herramientas de la comunidad como:
   - **Cheat Engine** con scripts específicos para Dead Cells
   - **Trainers** que permiten modificar el progreso
   - **Mods** que soportan importación de datos JSON

#### Opción 2: Edición manual
1. Usa el archivo `.txt` como referencia
2. Desbloquea los items manualmente en el juego
3. O usa códigos/mods que permitan desbloques específicos

#### Opción 3: Herramientas existentes
- **Dead Cells Save Editor** (aplicaciones de escritorio)
- **Trainers** de sitios como CheatHappens
- **Mods** de la comunidad en Nexus Mods

## 🛠️ Información técnica

### Estructura del user.dat real
El archivo user.dat de Dead Cells usa:
- Formato binario propietario
- Compresión custom
- Checksums específicos
- Metadatos de versión estrictos
- Validación de integridad compleja

### Nuestro enfoque
- **Ingeniería inversa** del formato basada en análisis
- **Simulación** de la estructura binaria
- **Compatibilidad best-effort** con v3.5.x
- **Fallback** a formatos alternativos

## 📋 Cómo usar los archivos de backup

### Con Cheat Engine:
1. Abre Dead Cells
2. Carga el script de la comunidad para Dead Cells
3. Importa los datos del archivo JSON
4. Aplica los cambios

### Con Trainers:
1. Ejecuta un trainer compatible
2. Usa las opciones de "unlock all" o similares
3. Referencia el archivo TXT para verificar qué desbloquear

### Con Mods:
1. Instala mods que soporten importación de datos
2. Coloca el archivo JSON en la carpeta del mod
3. Sigue las instrucciones específicas del mod

## 🔄 Actualizaciones futuras

Estamos trabajando en:
- Mejor análisis del formato user.dat
- Compatibilidad con más versiones del juego
- Integración con herramientas populares de la comunidad
- Validación mejorada de datos

## 📞 Soporte

Si tienes problemas:
1. Prueba primero con los archivos de backup
2. Verifica que tienes la versión correcta del juego
3. Consulta la comunidad de Dead Cells para herramientas actualizadas
4. Usa el archivo como referencia para desbloques manuales

---

**Recuerda siempre hacer backup de tu archivo user.dat original antes de usar cualquier herramienta de modificación de guardados.**