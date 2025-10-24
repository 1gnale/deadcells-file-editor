// Generador de archivos de guardado alternativos para Dead Cells
// Crear archivos .json compatibles que se pueden usar con herramientas de modding

class DeadCellsBackupGenerator {
    constructor() {
        this.version = "3.5.10";
        this.format = "json";
    }

    // Genera un archivo de guardado en formato JSON
    generateBackupSave(selectedItems, options = {}) {
        const saveData = {
            // Metadatos del archivo
            metadata: {
                format: "DeadCells SaveBackup",
                version: this.version,
                generated: new Date().toISOString(),
                generator: "Dead Cells Save Editor",
                compatible: "v3.5.x"
            },

            // Progreso del jugador
            progress: {
                cells: options.cells || 0,
                gold: options.gold || 0,
                runs: options.runs || 0,
                deaths: options.deaths || 0,
                kills: options.kills || 0,
                totalPlayTime: options.totalPlayTime || 0,
                bestTime: options.bestTime || "99:99:99",
                bossCellLevel: Math.max(0, Math.min(5, options.bossCell || 0))
            },

            // Items desbloqueados
            unlockedItems: this.generateUnlockedItems(selectedItems),

            // Configuración de DLC
            dlcStatus: {
                "The Bad Seed": true,
                "Fatal Falls": true,
                "The Queen and the Sea": true,
                "Return to Castlevania": true,
                "Everyone is Here": true,
                "Break the Bank": true,
                "Practice Room": true,
                "Medley of Pain": true
            },

            // Instrucciones para el usuario
            instructions: {
                notice: "Este es un archivo de backup generado por Dead Cells Save Editor",
                usage: [
                    "1. Haz backup de tu archivo user.dat original",
                    "2. Usa una herramienta de modding como Cheat Engine o similar",
                    "3. O importa estos datos usando herramientas de la comunidad",
                    "4. También puedes usar este archivo como referencia de tu progreso"
                ],
                warning: "No reemplaces directamente el user.dat con este archivo",
                alternative: "Para un user.dat real, usa la función principal del editor"
            }
        };

        return saveData;
    }

    generateUnlockedItems(selectedItems) {
        const unlockedData = {
            weapons: [],
            rangedWeapons: [],
            shields: [],
            skills: [],
            outfits: [],
            runes: [],
            mutations: [],
            total: selectedItems.length
        };

        selectedItems.forEach(itemId => {
            const item = this.findItemById(itemId);
            if (item) {
                const category = this.getCategoryForItem(itemId);
                if (unlockedData[category]) {
                    unlockedData[category].push({
                        id: itemId,
                        name: item.name,
                        description: item.description,
                        type: item.type,
                        dlc: item.dlc || null,
                        rarity: item.rarity || "Common"
                    });
                }
            }
        });

        return unlockedData;
    }

    findItemById(itemId) {
        // Buscar el item en todas las categorías
        for (const [category, items] of Object.entries(DEAD_CELLS_DATA)) {
            const item = items.find(i => i.id === itemId);
            if (item) return item;
        }
        return null;
    }

    getCategoryForItem(itemId) {
        // Determinar la categoría del item
        for (const [category, items] of Object.entries(DEAD_CELLS_DATA)) {
            if (items.find(i => i.id === itemId)) {
                return category;
            }
        }
        return 'unknown';
    }

    // Genera archivo de texto con lista de items
    generateTextList(selectedItems, options = {}) {
        let textContent = `DEAD CELLS SAVE EDITOR - LISTA DE ITEMS DESBLOQUEADOS
Generado: ${new Date().toLocaleString()}
Total de items: ${selectedItems.length}

=== PROGRESO ===
Células: ${options.cells || 0}
Oro: ${options.gold || 0}
Runs: ${options.runs || 0}
Muertes: ${options.deaths || 0}
Boss Cell Level: ${options.bossCell || 0}

=== ITEMS DESBLOQUEADOS ===
`;

        // Agrupar items por categoría
        const itemsByCategory = {};
        selectedItems.forEach(itemId => {
            const category = this.getCategoryForItem(itemId);
            const item = this.findItemById(itemId);
            
            if (!itemsByCategory[category]) {
                itemsByCategory[category] = [];
            }
            
            if (item) {
                itemsByCategory[category].push(item);
            }
        });

        // Agregar cada categoría al texto
        Object.entries(itemsByCategory).forEach(([category, items]) => {
            if (items.length > 0) {
                textContent += `\n${category.toUpperCase()} (${items.length}):\n`;
                items.forEach(item => {
                    const dlcTag = item.dlc ? ` [${item.dlc}]` : '';
                    textContent += `  • ${item.name}${dlcTag}\n`;
                });
            }
        });

        textContent += `\n=== INSTRUCCIONES ===
1. Este es un archivo de referencia generado por Dead Cells Save Editor
2. Para usar estos items en el juego, utiliza el archivo user.dat generado
3. O importa estos datos usando herramientas de modding de la comunidad

¡Disfruta tu aventura en Dead Cells! 🧟‍♂️
`;

        return textContent;
    }

    // Genera archivo CSV para análisis de datos
    generateCSV(selectedItems, options = {}) {
        let csv = "Category,Name,Type,DLC,Rarity,ID\n";
        
        selectedItems.forEach(itemId => {
            const item = this.findItemById(itemId);
            const category = this.getCategoryForItem(itemId);
            
            if (item) {
                const dlc = item.dlc || "";
                const rarity = item.rarity || "Common";
                const type = item.type || "";
                
                csv += `"${category}","${item.name}","${type}","${dlc}","${rarity}","${itemId}"\n`;
            }
        });
        
        return csv;
    }
}

// Función de utilidad para descargar archivos de backup
function downloadBackupFiles(selectedItems, options = {}) {
    const generator = new DeadCellsBackupGenerator();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    
    // Generar archivos de backup
    const jsonBackup = generator.generateBackupSave(selectedItems, options);
    const textList = generator.generateTextList(selectedItems, options);
    const csvData = generator.generateCSV(selectedItems, options);
    
    // Descargar archivos
    downloadJSON(jsonBackup, `deadcells-backup-${timestamp}.json`);
    downloadText(textList, `deadcells-items-${timestamp}.txt`);
    downloadText(csvData, `deadcells-data-${timestamp}.csv`);
    
    return {
        json: jsonBackup,
        text: textList,
        csv: csvData
    };
}

function downloadText(content, filename) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}