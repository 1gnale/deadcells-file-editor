// create_deadcells_save.js
// Crea un archivo user.dat desde cero usando la estructura real de Dead Cells
// Requiere: npm install pako

const fs = require('fs');
const path = require('path');
const pako = require('pako');

// Implementación básica de Haxe Serializer
class HaxeSerializer {
  constructor() {
    this.buf = '';
    this.cache = new Map();
    this.scount = 0;
    this.shash = new Map();
  }

  serialize(obj) {
    this.buf = '';
    this.cache.clear();
    this.scount = 0;
    this.shash.clear();
    
    this.run(obj);
    return this.buf;
  }

  run(obj) {
    if (obj === null) {
      this.buf += 'n';
    } else if (obj === true) {
      this.buf += 't';
    } else if (obj === false) {
      this.buf += 'f';
    } else if (typeof obj === 'number') {
      if (Number.isInteger(obj)) {
        this.buf += 'i' + obj;
      } else {
        this.buf += 'd' + obj;
      }
    } else if (typeof obj === 'string') {
      this.serializeString(obj);
    } else if (Array.isArray(obj)) {
      this.buf += 'a';
      for (const item of obj) {
        this.run(item);
      }
      this.buf += 'h';
    } else if (typeof obj === 'object') {
      this.buf += 'o';
      for (const [key, value] of Object.entries(obj)) {
        this.serializeString(key);
        this.run(value);
      }
      this.buf += 'g';
    }
  }

  serializeString(s) {
    const cached = this.shash.get(s);
    if (cached !== undefined) {
      this.buf += 'R' + cached;
      return;
    }
    
    this.shash.set(s, this.scount++);
    this.buf += 'y' + s.length + ':' + s;
  }
}

// Estructura de datos de Dead Cells basada en el análisis
function createDeadCellsData(options = {}) {
  return {
    // Header de versión Haxe
    version: 2,
    format: 22, // Versión del formato de Dead Cells
    
    // Datos principales
    HXS: 1, // Haxe Serialization
    
    // Objetos principales del juego
    User: {
      flags: options.flags || 0x80,
      userId: options.userId || generateUserId(),
      deathMoney: options.gold || 0,
      deathCells: options.cells || 0,
      bossRuneActivated: Math.min(options.bossCell || 0, 5),
      tutorial: 0xFF, // Tutorial completado
      counters: {},
      story: 0x7F,
      itemMeta: {},
      userStats: {},
      activeMods: [],
      heroSkin: "Beheaded",
      meta: {},
      metaItems: [],
      npcs: {},
      deathItem: null,
      heroHeadSkin: "default",
      consecutiveCompletedRuns: options.runs || 0
    },
    
    MonsterStat: {},
    BiomeStat: {},
    
    UserStats: {
      runs: options.runs || 0,
      scoringRuns: options.runs || 0,
      runsCompleted: options.runs || 0,
      greaterQuantityGold: options.gold || 0,
      greaterQuantityCell: options.cells || 0,
      teleportation: 0,
      goldEarned: (options.gold || 0) * 2,
      goldSpent: options.gold || 0,
      cellsEarned: (options.cells || 0) * 2,
      cellsSpent: options.cells || 0,
      healUsed: 0,
      curseSurvived: 0,
      dailyRunWon: 0,
      lastDailyRunWon: 0,
      weaponBlueprintBring: 0,
      activeBlueprintBring: 0,
      perksBlueprintBring: 0,
      normalChestOpened: (options.runs || 0) * 10,
      cursedChestOpened: (options.runs || 0) * 2,
      secretPortalOpened: 0,
      challengeSucceeded: 0,
      challengeFailed: 0,
      biomes: {},
      perfectKillsChallSucceeded: 0,
      perfectKillsChallFailed: 0,
      timedDoorsOpened: 0
    },
    
    "tool.ItemProgress": createItemProgress(options.unlockedItems || []),
    "tool.ItemMetaManager": createItemMeta(options.unlockedItems || []),
    "tool.SpeedrunData": {
      bestTime: options.bestTime || 999999,
      runs: options.runs || 0
    },
    "tool.StoryManager": {
      completed: true,
      flags: 0x7F
    },
    "tool.Tutorial": {
      completed: 0xFF
    },
    "tool.bossRush.BossRushData": {
      unlocked: true,
      bestTime: 999999
    }
  };
}

function createItemProgress(items) {
  const progress = {};
  items.forEach(item => {
    const gameId = mapItemToGameId(item);
    if (gameId) {
      progress[gameId] = {
        unlocked: true,
        discovered: true,
        level: 0
      };
    }
  });
  return progress;
}

function createItemMeta(items) {
  const meta = {};
  items.forEach(item => {
    const gameId = mapItemToGameId(item);
    if (gameId) {
      meta[gameId] = {
        discovered: true,
        unlocked: true
      };
    }
  });
  return meta;
}

// Mapeo simplificado de items (expandir según necesidades)
function mapItemToGameId(itemId) {
  const mapping = {
    'rusty_sword': 'RustySword',
    'blood_sword': 'BloodSword',
    'balanced_blade': 'BalancedBlade',
    'cursed_sword': 'CursedSword',
    'assassins_dagger': 'AssassinDagger',
    'twin_daggers': 'TwinDaggers',
    'crowbar': 'Crowbar',
    'hunters_longbow': 'HunterBow',
    'tactical_crossbow': 'CrossBow',
    'ice_bow': 'IceBow',
    'wooden_shield': 'WoodenShield',
    'bloodthirsty_shield': 'BloodthirstyShield',
    'fire_grenade': 'FireGrenade',
    'ice_grenade': 'IceGrenade'
  };
  return mapping[itemId] || itemId;
}

function generateUserId() {
  return Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase();
}

// Crear archivo user.dat completo
function createUserDat(options) {
  // 1. Crear estructura de datos
  const gameData = createDeadCellsData(options);
  
  // 2. Serializar con Haxe
  const serializer = new HaxeSerializer();
  const serializedData = serializer.serialize(gameData);
  
  // 3. Comprimir con zlib
  const compressed = pako.deflate(Buffer.from(serializedData, 'utf8'));
  
  // 4. Crear header del archivo
  const header = Buffer.alloc(16);
  let offset = 0;
  
  // Magic header DE AD CE 11
  header.writeUInt8(0xDE, offset++);
  header.writeUInt8(0xAD, offset++);
  header.writeUInt8(0xCE, offset++);
  header.writeUInt8(0x11, offset++);
  
  // Versión del archivo (little endian)
  header.writeUInt32LE(50, offset);
  offset += 4;
  
  // Tamaño de datos comprimidos
  header.writeUInt32LE(compressed.length, offset);
  offset += 4;
  
  // Reserved
  header.writeUInt32LE(0, offset);
  
  // 5. Combinar header + datos comprimidos
  const fullFile = Buffer.concat([header, compressed]);
  
  return {
    data: fullFile,
    metadata: {
      headerSize: header.length,
      compressedSize: compressed.length,
      uncompressedSize: serializedData.length,
      totalSize: fullFile.length
    }
  };
}

// Función principal
function main() {
  const options = {
    gold: 50000,
    cells: 1000,
    runs: 100,
    bossCell: 5,
    bestTime: 1800, // 30 minutos
    unlockedItems: [
      'rusty_sword', 'blood_sword', 'balanced_blade', 'cursed_sword',
      'hunters_longbow', 'tactical_crossbow', 'ice_bow',
      'wooden_shield', 'bloodthirsty_shield',
      'fire_grenade', 'ice_grenade'
    ]
  };
  
  console.log('Generando archivo user.dat...');
  const result = createUserDat(options);
  
  // Guardar archivo
  const outputPath = path.join(__dirname, 'user_generated.dat');
  fs.writeFileSync(outputPath, result.data);
  
  console.log('Archivo generado:', outputPath);
  console.log('Metadatos:', result.metadata);
  console.log('¡Listo para probar en Dead Cells!');
  console.log('IMPORTANTE: Haz backup de tu user.dat original antes de reemplazar');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { createUserDat, HaxeSerializer };