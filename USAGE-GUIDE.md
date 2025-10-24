# 🎮 Guía de Uso - Dead Cells Save Editor

## 📋 Opciones de Generación

### ⚡ user.dat REAL (RECOMENDADO)
**Estado:** ✅ Funcional - Basado en análisis real del formato del juego

**Características:**
- Magic Header auténtico: `DE AD CE 11`
- Compresión zlib estándar: `78 DA`
- Serialización Haxe compatible con el motor del juego
- Estructura interna idéntica al formato real
- Mapeo correcto de IDs internos de items

**Cuándo usar:**
- Primera opción recomendada
- Máxima compatibilidad con Dead Cells v3.5.x
- Si quieres que el archivo funcione directamente

**Cómo funciona:**
```
1. Analiza la estructura interna real del juego
2. Crea objetos User, UserStats, ItemProgress, etc.
3. Serializa usando formato Haxe
4. Comprime con zlib (78 DA)
5. Agrega header mágico (DE AD CE 11)
```

### 🎮 user.dat Experimental
**Estado:** ⚠️ Experimental - Simulación del formato binario

**Características:**
- Simulación del formato binario
- Estructura básica compatible
- Checksums simplificados
- Puede mostrar errores de compatibilidad

**Cuándo usar:**
- Solo para pruebas y comparación
- Si el método REAL falla (poco probable)
- Para entender diferencias de formato

### 📋 Backup Alternativo
**Estado:** ✅ Siempre funciona - Formatos estándar

**Archivos generados:**
- `.json` - Datos estructurados completos
- `.txt` - Lista legible de items
- `.csv` - Datos tabulares para análisis

**Cuándo usar:**
- Si ambos user.dat fallan
- Para usar con herramientas de modding
- Como backup de referencia
- Para análisis de datos

**Herramientas compatibles:**
- Cheat Engine con scripts de Dead Cells
- Trainers de la comunidad
- Mods que soporten importación JSON

## 🚀 Flujo recomendado

### 1. Primer intento: user.dat REAL ⚡
```
1. Selecciona tus items
2. Configura opciones (células, oro, etc.)
3. Clic en "⚡ Generar user.dat REAL"
4. Descarga el archivo user_REAL_[timestamp].dat
5. Haz backup de tu user.dat original
6. Reemplaza con el archivo generado
7. Prueba en Dead Cells
```

### 2. Si falla: Backup Alternativo 📋
```
1. Clic en "📋 Generar Backup Alternativo"
2. Descarga los 3 archivos (JSON/TXT/CSV)
3. Usa herramientas de modding:
   - Cheat Engine + scripts
   - Trainers de la comunidad
   - Mods con importación JSON
```

### 3. Plan C: Experimental 🎮
```
1. Clic en "🎮 Generar user.dat (Experimental)"
2. Prueba como último recurso
3. Menor probabilidad de éxito
```

## ⚠️ Solución de problemas

### "La partida guardada no es compatible"
1. **Primero:** Verifica que usaste el método REAL
2. **Segundo:** Prueba con menos items seleccionados
3. **Tercero:** Usa el backup alternativo
4. **Último recurso:** Usa herramientas de la comunidad

### El juego no detecta el archivo
1. Verifica la ubicación del archivo:
   - Windows: `%USERPROFILE%\Documents\Motion Twin\Dead Cells\save\`
2. Asegúrate de que se llame exactamente `user.dat`
3. Verifica que tienes permisos de escritura
4. Cierra Dead Cells completamente antes de reemplazar

### Items no aparecen desbloqueados
1. El archivo se cargó pero los mapeos pueden estar incorrectos
2. Algunos items pueden requerir condiciones específicas
3. Usa el archivo TXT para verificar qué items seleccionaste
4. Prueba con items básicos primero

## 🔧 Información técnica

### Análisis del formato real
Basado en ingeniería inversa del archivo user.dat real:

```
Header: DE AD CE 11 [magic]
Versión: 32 bits little endian  
Tamaño: 32 bits little endian
Datos: zlib compressed (78 DA header)
  ├── Serialización Haxe
  ├── User object (progreso del jugador)
  ├── UserStats (estadísticas)
  ├── tool.ItemProgress (items desbloqueados)
  ├── tool.ItemMetaManager (metadatos)
  └── Otras clases del motor
```

### Mapeo de items
Los IDs internos del juego son diferentes a los nombres mostrados:
- `rusty_sword` → `RustySword`
- `blood_sword` → `BloodSword`
- `hunters_longbow` → `HunterBow`

El generador REAL incluye mapeos completos para todos los items.

## 📞 Soporte

Si tienes problemas:
1. Lee esta guía completamente
2. Prueba las 3 opciones en orden
3. Consulta `COMPATIBILITY.md` para más detalles
4. Usa la comunidad de Dead Cells para herramientas adicionales

---

**¡Disfruta tu aventura personalizada en Dead Cells! 🧟‍♂️⚔️**