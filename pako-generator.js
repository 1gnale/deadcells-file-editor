// Integración del generador Node.js con pako para el navegador
// Este archivo permite usar la estructura real de Dead Cells en el navegador

// Importar pako desde CDN o incluir en el HTML:
// <script src="https://unpkg.com/pako@2.1.0/dist/pako.min.js"></script>

class RealDeadCellsWebGenerator {
    constructor() {
        this.version = 50;
        this.magicHeader = [0xDE, 0xAD, 0xCE, 0x11];
    }

    // Implementación de Haxe Serializer para navegador
    serializeHaxe(obj) {
        const serializer = new HaxeWebSerializer();
        return serializer.serialize(obj);
    }

    // Crear estructura de datos real de Dead Cells
    createGameData(selectedItems, options = {}) {
        return {
            version: 2,
            format: 22,
            HXS: 1,
            
            User: {
                flags: options.flags || 0x80,
                userId: this.generateUserId(),
                deathMoney: options.gold || 0,
                deathCells: options.cells || 0,
                bossRuneActivated: Math.min(options.bossCell || 0, 5),
                tutorial: 0xFF,
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
            
            "tool.ItemProgress": this.createItemProgress(selectedItems),
            "tool.ItemMetaManager": this.createItemMeta(selectedItems),
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

    createItemProgress(items) {
        const progress = {};
        items.forEach(item => {
            const gameId = this.mapItemToGameId(item);
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

    createItemMeta(items) {
        const meta = {};
        items.forEach(item => {
            const gameId = this.mapItemToGameId(item);
            if (gameId) {
                meta[gameId] = {
                    discovered: true,
                    unlocked: true
                };
            }
        });
        return meta;
    }

    // Mapeo extendido de items (basado en análisis real)
    mapItemToGameId(itemId) {
        const mapping = {
            // Armas cuerpo a cuerpo
            'rusty_sword': 'RustySword',
            'blood_sword': 'BloodSword',
            'broad_sword': 'BroadSword',
            'balanced_blade': 'BalancedBlade',
            'cursed_sword': 'CursedSword',
            'shovel': 'Shovel',
            'hayabusa_gauntlets': 'HayabusaGauntlets',
            'hayabusa_boots': 'HayabusaBoots',
            'assassins_dagger': 'AssassinDagger',
            'twin_daggers': 'TwinDaggers',
            'stiletto': 'Stiletto',
            'crowbar': 'Crowbar',
            'nutcracker': 'Nutcracker',
            'valmont_whip': 'ValmontWhip',
            'torch': 'Torch',
            'tentacle': 'Tentacle',
            'meat_skewer': 'MeatSkewer',
            'bone_sword': 'BoneSword',
            'pure_nail': 'PureNail',
            'war_spear': 'WarSpear',
            'impaler': 'Impaler',
            'sadists_stiletto': 'SadistStiletto',
            'phaser': 'Phaser',
            'vorpan': 'Vorpan',
            'toothpick': 'Toothpick',
            'electric_whip': 'ElectricWhip',
            'spite_sword': 'SpiteSword',
            'flashing_fans': 'FlashingFan',
            'scythe_claw': 'ScytheClaw',
            'ferrymans_lantern': 'FerrymanLantern',
            'rhythm_bouzouki': 'RhythmNBouzouki',
            'hand_of_the_king': 'HandOfTheKing',
            'queen_rapier': 'QueenRapier',
            'giant_killer': 'GiantKiller',
            'katana': 'Katana',

            // Armas a distancia
            'hunters_longbow': 'HunterBow',
            'tactical_crossbow': 'CrossBow',
            'throwing_knife': 'ThrowingKnife',
            'boomerang': 'Boomerang',
            'magic_missiles': 'MagicMissile',
            'ice_bow': 'IceBow',
            'heavy_crossbow': 'HeavyCrossBow',
            'repeater_crossbow': 'RepeaterCrossBow',
            'explosive_crossbow': 'ExplosiveCrossBow',
            'quick_bow': 'QuickBow',
            'duplex_bow': 'DuplexBow',
            'alchemic_carbine': 'AlchemicCarbine',
            'hokutos_bow': 'HokutoBow',
            'firebrands': 'Firebrand',
            'ice_shards': 'IceShards',
            'lightning_bolt': 'LightningBolt',
            'flame_thrower': 'FlameThrower',
            'frost_blast': 'FrostBlast',
            'barnacle': 'Barnacle',
            'blowgun': 'BlowGun',
            'infantry_bow': 'InfantryBow',
            'sonic_carbine': 'SonicCarbine',
            'boy_axe': 'BoyAxe',
            'crossb_omatic': 'CrossbOMatic',
            'marksmans_bow': 'MarksmanBow',
            'casting_shot': 'CastingShot',
            'ivory_bow': 'IvoryBow',

            // Escudos
            'wooden_shield': 'WoodenShield',
            'cudgel': 'Cudgel',
            'bloodthirsty_shield': 'BloodthirstyShield',
            'punishment': 'Punishment',
            'spike_shield': 'SpikeShield',
            'rampart': 'Rampart',
            'assault_shield': 'AssaultShield',
            'knockback_shield': 'KnockbackShield',
            'parry_shield': 'ParryShield',
            'front_line_shield': 'FrontLineShield',
            'force_shield': 'ForceShield',
            'ice_shield': 'IceShield',
            'thunder_shield': 'ThunderShield',
            'armadillopack': 'Armadillopack',
            'defenders_buckler': 'DefenderBuckler',
            'blood_shield': 'BloodShield',

            // Skills
            'fire_grenade': 'FireGrenade',
            'ice_grenade': 'IceGrenade',
            'cluster_grenade': 'ClusterGrenade',
            'magnetic_grenade': 'MagneticGrenade',
            'toxic_cloud': 'ToxicCloud',
            'stun_grenade': 'StunGrenade',
            'wolf_trap': 'WolfTrap',
            'turret': 'Turret',
            'crusher': 'Crusher',
            'grappling_hook': 'GrapplingHook',
            'war_drum': 'WarDrum',
            'vampirism': 'Vampirism',
            'emergency_door': 'EmergencyDoor',
            'corrupted_power': 'CorruptedPower',
            'laceration': 'Laceration',
            'knife_storm': 'KnifeStorm',
            'lightning_rods': 'LightningRods',
            'crow_feathers': 'CrowFeather',
            'caltrops': 'Caltrops',
            'cocoon': 'Cocoon',
            'lacerating_aura': 'LaceratingAura',
            'tesla_coil': 'TeslaCoil',
            'tornado': 'Tornado',
            'cleaver': 'Cleaver',
            'bone': 'Bone',
            'explosive_decoy': 'ExplosiveDecoy',
            'ceiling_turret': 'CeilingTurret',
            'mushroom_boi': 'MushroomBoi',
            'wave_of_denial': 'WaveOfDenial',
            'giant_whistle': 'GiantWhistle'
        };
        
        return mapping[itemId] || itemId;
    }

    generateUserId() {
        return Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase();
    }

    // Generar archivo user.dat real usando pako
    generateRealUserDat(selectedItems, options = {}) {
        try {
            // 1. Crear estructura de datos
            const gameData = this.createGameData(selectedItems, options);
            
            // 2. Serializar con Haxe
            const serializedData = this.serializeHaxe(gameData);
            
            // 3. Convertir a Uint8Array para pako
            const dataBuffer = new TextEncoder().encode(serializedData);
            
            // 4. Comprimir con pako (zlib)
            const compressed = pako.deflate(dataBuffer);
            
            // 5. Crear header del archivo
            const header = new ArrayBuffer(16);
            const headerView = new DataView(header);
            let offset = 0;
            
            // Magic header DE AD CE 11
            this.magicHeader.forEach(byte => {
                headerView.setUint8(offset++, byte);
            });
            
            // Versión del archivo (little endian)
            headerView.setUint32(offset, this.version, true);
            offset += 4;
            
            // Tamaño de datos comprimidos
            headerView.setUint32(offset, compressed.length, true);
            offset += 4;
            
            // Reserved
            headerView.setUint32(offset, 0, true);
            
            // 6. Combinar header + datos comprimidos
            const fullFile = new Uint8Array(header.byteLength + compressed.length);
            fullFile.set(new Uint8Array(header), 0);
            fullFile.set(compressed, header.byteLength);
            
            return {
                content: fullFile,
                metadata: {
                    headerSize: header.byteLength,
                    compressedSize: compressed.length,
                    uncompressedSize: dataBuffer.length,
                    totalSize: fullFile.length,
                    version: this.version,
                    itemCount: selectedItems.length,
                    format: "Dead Cells Real Binary with pako zlib"
                }
            };
            
        } catch (error) {
            console.error('Error generating real user.dat:', error);
            throw new Error(`Failed to generate real user.dat: ${error.message}`);
        }
    }
}

// Implementación de Haxe Serializer para navegador
class HaxeWebSerializer {
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

// Exportar para uso global
window.RealDeadCellsWebGenerator = RealDeadCellsWebGenerator;