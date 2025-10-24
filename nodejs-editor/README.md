# 🚀 Dead Cells Save Editor - Node.js Real

Generador y editor de archivos user.dat de Dead Cells usando Node.js y la estructura real del juego.

## ⚡ Características

- **Estructura real**: Basado en análisis del formato interno de Dead Cells
- **Haxe Serialization**: Implementación del formato de serialización real
- **Compresión zlib**: Usa pako para compresión/descompresión auténtica
- **Headers mágicos**: DE AD CE 11 (formato real del juego)
- **Dos modos**: Editar archivos existentes o crear desde cero

## 📋 Requisitos

- Node.js 16+ 
- npm

## 🛠️ Instalación

```bash
# 1. Ir a la carpeta nodejs-editor
cd nodejs-editor

# 2. Instalar dependencias
npm install

# 3. ¡Listo para usar!
```

## 🎮 Uso

### Opción 1: Crear archivo desde cero (RECOMENDADO)

```bash
# Genera user_generated.dat con configuración predeterminada
node create_deadcells_save.js
```

### Opción 2: Editar archivo existente

```bash
# Modifica un archivo user.dat existente
node edit_deadcells_save.js "C:\\Users\\Usuario\\Documents\\Motion Twin\\Dead Cells\\save\\user.dat"
```

## ⚙️ Configuración personalizada

Edita `create_deadcells_save.js` en la función `main()`:

```javascript
const options = {
  gold: 50000,           // Oro del jugador
  cells: 1000,           // Células del coleccionista  
  runs: 100,             // Runs completadas
  bossCell: 5,           // Nivel de Boss Cell (0-5)
  bestTime: 1800,        // Mejor tiempo en segundos
  unlockedItems: [       // Items a desbloquear
    'rusty_sword',
    'blood_sword',
    'hunters_longbow',
    // ... agregar más items
  ]
};
```

## 🗺️ IDs de Items disponibles

### Armas cuerpo a cuerpo:
- `rusty_sword` → RustySword
- `blood_sword` → BloodSword  
- `balanced_blade` → BalancedBlade
- `cursed_sword` → CursedSword
- `assassins_dagger` → AssassinDagger
- `twin_daggers` → TwinDaggers
- `crowbar` → Crowbar

### Armas a distancia:
- `hunters_longbow` → HunterBow
- `tactical_crossbow` → CrossBow
- `ice_bow` → IceBow

### Escudos:
- `wooden_shield` → WoodenShield
- `bloodthirsty_shield` → BloodthirstyShield

### Skills:
- `fire_grenade` → FireGrenade
- `ice_grenade` → IceGrenade

## 📁 Archivos de salida

- `user_generated.dat` - Archivo creado desde cero
- `user_modified.dat` - Archivo editado (cuando usas edit_deadcells_save.js)
- `user.dat.bak` - Backup automático del archivo original

## 🔧 Estructura técnica

### Formato del archivo user.dat:

```
[Header - 16 bytes]
├── Magic: DE AD CE 11 (4 bytes)
├── Versión: 50 (4 bytes, little endian)  
├── Tamaño comprimido (4 bytes, little endian)
└── Reserved (4 bytes)

[Datos comprimidos - variable]
├── Compresión: zlib (header 78 DA/9C)
├── Contenido: Serialización Haxe
└── Objetos: User, UserStats, ItemProgress, etc.
```

### Serialización Haxe:

```
n = null
t = true  
f = false
i123 = integer 123
d123.45 = float 123.45
y5:hello = string "hello" (longitud 5)
o...g = object
a...h = array
```

## ⚠️ Instrucciones importantes

### Antes de usar:

1. **BACKUP**: Haz backup de tu `user.dat` original
2. **Cierra Dead Cells** completamente (incluyendo Steam)
3. **Ubica tu carpeta de saves**:
   - Windows: `%USERPROFILE%\\Documents\\Motion Twin\\Dead Cells\\save\\`

### Para instalar:

1. Copia el archivo generado a la carpeta de saves
2. Renómbralo a `user.dat` (reemplaza el original)
3. Inicia Dead Cells
4. ¡Disfruta tu progreso personalizado!

### Si no funciona:

1. Restaura el backup: `copy user.dat.bak user.dat`
2. Verifica que Dead Cells esté completamente cerrado
3. Prueba con menos items desbloqueados
4. Revisa la consola de Node.js para errores

## 🧪 Modo debug

Para ver el contenido interno de un archivo:

```javascript
// Agregar al final de edit_deadcells_save.js
console.log('Contenido completo:', plain);
```

## 🤝 Contribuir

Para agregar más items:

1. Analiza un user.dat real con items desbloqueados
2. Encuentra el ID interno en el contenido descomprimido  
3. Agrega el mapeo en `mapItemToGameId()`
4. Prueba el archivo generado

## 📞 Troubleshooting

### Error "No se encontró bloque zlib"
- El archivo no es un user.dat válido
- Puede estar corrupto o ser de otra versión

### Error "Error al descomprimir"  
- Archivo corrupto o formato no compatible
- Prueba con un user.dat recién generado por el juego

### El juego no carga el archivo
- Verifica que el nombre sea exactamente `user.dat`
- Asegúrate de que Dead Cells esté cerrado
- Restaura backup y prueba con configuración más simple

### Items no aparecen desbloqueados
- Los IDs de mapeo pueden estar incorrectos
- Algunos items requieren prerequisitos específicos
- Verifica el contenido con modo debug

---

**¡Este generador tiene mucha mayor probabilidad de funcionar porque usa la estructura real del juego! 🎮**