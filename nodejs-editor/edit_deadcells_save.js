// edit_deadcells_save.js
// Uso: node edit_deadcells_save.js path/to/user.dat
// Requiere: npm install pako

const fs = require('fs');
const path = require('path');
const pako = require('pako');

if (process.argv.length < 3) {
  console.error('Uso: node edit_deadcells_save.js path/to/user.dat');
  process.exit(1);
}

const inPath = process.argv[2];
const backupPath = inPath + '.bak';

if (!fs.existsSync(inPath)) {
  console.error('Archivo no encontrado:', inPath);
  process.exit(1);
}

// 1) Leer archivo completo (buffer)
const fileBuf = fs.readFileSync(inPath);
console.log('Tamaño archivo original:', fileBuf.length);

// 2) Buscar inicio del bloque zlib: 0x78 0x9C o 0x78 0xDA (común)
let start = fileBuf.indexOf(Buffer.from([0x78, 0x9C]));
if (start === -1) start = fileBuf.indexOf(Buffer.from([0x78, 0xDA]));
if (start === -1) {
  console.error('No se encontró bloque zlib (0x78 0x9C / 0x78 0xDA). Aborting.');
  process.exit(1);
}
console.log('Bloque zlib detectado en offset:', start);

// 3) Extraer el bloque comprimido (hasta el final del archivo normalmente)
const compressedBuf = fileBuf.slice(start);
console.log('Tamaño bloque comprimido extraído:', compressedBuf.length);

// 4) Descomprimir con pako
let decompressed;
try {
  decompressed = pako.inflate(compressedBuf);
  console.log('Descompresión OK. Tamaño descomprimido:', decompressed.length);
} catch (err) {
  console.error('Error al descomprimir con pako:', err.message);
  process.exit(1);
}

// 5) Ver una vista previa (texto). Muchas partes son legibles ASCII.
const plain = Buffer.from(decompressed).toString('latin1');
console.log('--- PREVIEW (primeros 800 chars) ---');
console.log(plain.slice(0, 800));
console.log('-------------------------------------');

// 6) MODIFICAR el contenido descomprimido
let modifiedDecompressed = Buffer.from(decompressed);

// Función para buscar y reemplazar valores numéricos después de una clave
function replaceNumericValue(buffer, key, newValue) {
  const needle = key;
  const hay = Buffer.from(buffer);
  const idx = hay.indexOf(Buffer.from(needle, 'utf8'));
  
  if (idx !== -1) {
    console.log(`Encontrada clave "${needle}" en offset ${idx}`);
    
    // Buscar patrón numérico después de la clave
    const after = hay.slice(idx, idx + 300);
    const regex = new RegExp(`${key}[\\s\\:\\"]*[^0-9]*([0-9]{1,9})`);
    const match = after.toString('latin1').match(regex);
    
    if (match) {
      const oldValStr = match[1];
      const newValStr = newValue.toString();
      console.log(`Reemplazando ${oldValStr} por ${newValStr} en ${key}`);
      
      // Reemplazo cuidadoso manteniendo estructura
      const beforeMatch = after.toString('latin1').indexOf(oldValStr);
      if (beforeMatch !== -1) {
        const beforeStr = after.toString('latin1').slice(0, beforeMatch);
        const afterStr = after.toString('latin1').slice(beforeMatch + oldValStr.length);
        const newAfter = beforeStr + newValStr + afterStr;
        
        // Escribir de vuelta
        const newAfterBuf = Buffer.from(newAfter, 'latin1');
        hay.set(newAfterBuf, idx);
        return hay;
      }
    } else {
      console.warn(`No encontré patrón numérico después de ${key}`);
    }
  } else {
    console.warn(`Clave "${needle}" no encontrada`);
  }
  
  return buffer;
}

// Modificar valores específicos
const modifications = {
  deathMoney: 50000,
  deathCells: 1000,
  bossRuneActivated: 5
};

for (const [key, value] of Object.entries(modifications)) {
  modifiedDecompressed = replaceNumericValue(modifiedDecompressed, key, value);
}

// 7) Recomprimir con pako
let recompressed;
try {
  recompressed = pako.deflate(modifiedDecompressed);
  console.log('Recompresión OK. Tamaño recomprimido:', recompressed.length);
} catch (err) {
  console.error('Error al recomprimir:', err.message);
  process.exit(1);
}

// 8) Construir nuevo buffer
const newFileBuf = Buffer.concat([fileBuf.slice(0, start), Buffer.from(recompressed)]);
console.log('Nuevo tamaño total archivo:', newFileBuf.length);

// 9) Guardar backup y nuevo archivo
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(inPath, backupPath);
  console.log('Backup creado en', backupPath);
}

const outPath = path.join(path.dirname(inPath), 'user_modified.dat');
fs.writeFileSync(outPath, newFileBuf);
console.log('Archivo modificado guardado en', outPath);
console.log('Probá cargarlo en Dead Cells (REINICIAR juego antes de reemplazar).');