# 🧟 Dead Cells Save Editor

Una aplicación web para crear archivos de guardado personalizados de Dead Cells con desbloqueos específicos.

## ✨ Características

- **Interface intuitiva**: Selecciona fácilmente los items que quieres desbloquear
- **Categorías organizadas**: Armas, arcos, escudos, skills, outfits y runas
- **Personalización completa**: Configura células, oro, runs completadas y Boss Cell level
- **Descarga múltiple**: Genera archivos .save compatibles y .json legibles
- **Diseño responsive**: Funciona en desktop y móvil
- **Efectos visuales**: Interface moderna con animaciones

## 🎮 Categorías de Items

### ⚔️ Armas
- Espadas básicas y avanzadas
- Dagas y armas rápidas
- Látigos y armas de alcance
- Martillos y armas pesadas

### 🏹 Armas a Distancia
- Arcos de diferentes tipos
- Ballestas explosivas y pesadas
- Armas arrojadizas
- Proyectiles mágicos

### 🛡️ Escudos
- Escudos defensivos
- Escudos de contraataque
- Escudos elementales
- Escudos especiales

### 💥 Skills y Granadas
- Granadas explosivas
- Trampas y torretas
- Skills especiales
- Habilidades tácticas

### 🎭 Outfits
- Trajes temáticos
- Outfits de unlock
- Skins especiales

### 🏛️ Runas
- Runas de movimiento
- Runas de exploración
- Runas de desafío

## 🚀 Cómo usar

1. **Abrir**: Abre `index.html` en tu navegador
2. **Seleccionar**: Haz clic en los items que quieres desbloquear
3. **Configurar**: Ajusta células, oro y otras opciones
4. **Generar**: Haz clic en "Generar Archivo de Guardado"
5. **Descargar**: Se descargarán automáticamente los archivos

## 📁 Archivos generados

- **`.save`**: Archivo principal compatible con Dead Cells
- **`.json`**: Versión legible para debug y verificación

## ⚠️ Importante

1. **Backup**: Siempre haz backup de tu guardado original
2. **Ubicación**: Coloca el archivo en la carpeta correcta de guardados
3. **Nombre**: Asegúrate de usar el nombre correcto del slot
4. **Versión**: Compatible con las versiones actuales de Dead Cells

## 📂 Estructura del proyecto

```
dead-cells-file-editor/
├── index.html          # Página principal
├── styles.css          # Estilos y diseño
├── dead-cells-data.js  # Datos de items del juego
├── save-generator.js   # Lógica de generación de guardados
├── app.js             # Aplicación principal
└── README.md          # Este archivo
```

## 🛠️ Tecnologías

- **HTML5**: Estructura y semántica
- **CSS3**: Estilos, animaciones y responsive design
- **JavaScript ES6+**: Lógica de aplicación y generación de archivos
- **File API**: Descarga de archivos generados

## 🎨 Diseño

- **Tema oscuro**: Inspirado en la estética de Dead Cells
- **Colores**: Paleta basada en el juego (rojos, azules, verdes)
- **Tipografía**: Fuentes modernas y legibles
- **Animaciones**: Transiciones suaves y efectos hover
- **Icons**: Emojis temáticos para mejor UX

## 🔧 Funcionalidades técnicas

### Generación de guardados
- Estructura JSON completa
- Mapeo de IDs internos del juego
- Checksum de integridad
- Formato base64 para compatibilidad

### Interface
- Selección múltiple de items
- Búsqueda y filtrado (futuro)
- Estadísticas en tiempo real
- Validación de inputs

### Compatibilidad
- Responsive design
- Cross-browser compatibility
- Manejo de errores robusto
- Fallbacks para funcionalidades

## 📋 Roadmap

- [ ] Importar guardados existentes
- [ ] Búsqueda y filtrado de items
- [ ] Presets de configuración
- [ ] Más opciones de personalización
- [ ] Soporte para DLCs
- [ ] Validación de archivos
- [ ] Modo claro/oscuro
- [ ] Múltiples idiomas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## ⚡ Quick Start

```bash
# Clonar el repositorio
git clone [url-del-repo]

# Entrar al directorio
cd dead-cells-file-editor

# Abrir en navegador
open index.html
```

## 📞 Soporte

Si tienes problemas o sugerencias:
- Abre un issue en GitHub
- Revisa la consola del navegador para errores
- Verifica que tienes JavaScript habilitado

---

**⚠️ Disclaimer**: Este es un proyecto no oficial. Dead Cells es propiedad de Motion Twin/Evil Empire. Usa bajo tu propia responsabilidad.