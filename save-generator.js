// Generador de archivos de guardado de Dead Cells
class DeadCellsSaveGenerator {
    constructor() {
        this.selectedItems = new Set();
        this.saveOptions = {
            cells: 0,
            gold: 0,
            runs: 0,
            bossCell: 0,
            deaths: 0,
            kills: 0,
            totalPlayTime: 0
        };
        this.userDatGenerator = new DeadCellsUserDatGenerator();
    }

    // Genera datos de guardado en formato user.dat
    generateUserDatSave() {
        const selectedItemsArray = Array.from(this.selectedItems);
        const userDatFile = this.userDatGenerator.generateUserDatFile(selectedItemsArray, this.saveOptions);
        
        return userDatFile;
    }

    // Genera un archivo de guardado básico en formato JSON (para debug)
    generateSaveData() {
        const saveData = {
            version: "1.10.x",
            format: "user.dat_compatible",
            timestamp: Date.now(),
            saveInfo: {
                cells: this.saveOptions.cells,
                gold: this.saveOptions.gold,
                runs: this.saveOptions.runs,
                deaths: this.saveOptions.deaths || 0,
                kills: this.saveOptions.kills || 0,
                bossCellLevel: this.saveOptions.bossCell,
                totalPlayTime: this.saveOptions.totalPlayTime || 0,
                playTime: this.formatPlayTime(this.saveOptions.totalPlayTime || 0)
            },
            unlockedItems: this.generateUnlockedItemsData(),
            progress: this.generateProgressData(),
            settings: this.generateDefaultSettings(),
            metadata: {
                itemCount: this.selectedItems.size,
                dlcItems: this.countDLCItems(),
                categories: this.getCategoryBreakdown()
            }
        };

        return saveData;
    }

    generateUnlockedItemsData() {
        const unlockedItems = {};
        
        // Procesar items seleccionados
        this.selectedItems.forEach(itemId => {
            // Buscar el item en todas las categorías
            for (const [category, items] of Object.entries(DEAD_CELLS_DATA)) {
                const item = items.find(i => i.id === itemId);
                if (item && SAVE_DATA_MAPPING[category] && SAVE_DATA_MAPPING[category][itemId]) {
                    if (!unlockedItems[category]) {
                        unlockedItems[category] = [];
                    }
                    unlockedItems[category].push({
                        id: SAVE_DATA_MAPPING[category][itemId],
                        name: item.name,
                        unlocked: true,
                        upgrades: 0
                    });
                }
            }
        });

        return unlockedItems;
    }

    generateProgressData() {
        return {
            currentBiome: "PrisonStart",
            completedBiomes: ["PrisonStart"],
            killedBosses: this.generateBossProgress(),
            foundSecrets: Math.floor(this.selectedItems.size * 0.3), // Aproximado
            totalDeaths: this.saveOptions.deaths || 0,
            bestTime: this.saveOptions.bestTime || "99:99:99",
            achievements: this.generateAchievements(),
            runesCollected: this.getSelectedRunes(),
            bossCellsOwned: this.saveOptions.bossCell || 0
        };
    }

    generateBossProgress() {
        const bossCellLevel = this.saveOptions.bossCell || 0;
        const bosses = [];
        
        if (bossCellLevel >= 1) bosses.push("The Concierge");
        if (bossCellLevel >= 2) bosses.push("Conjunctivius");
        if (bossCellLevel >= 3) bosses.push("The Time Keeper");
        if (bossCellLevel >= 4) bosses.push("The Hand of the King");
        if (bossCellLevel >= 5) bosses.push("The Giant");
        
        return bosses;
    }

    generateAchievements() {
        const achievements = [];
        const itemCount = this.selectedItems.size;
        
        if (itemCount >= 10) achievements.push("Collector");
        if (itemCount >= 50) achievements.push("Hoarder");
        if (itemCount >= 100) achievements.push("Completionist");
        if (this.saveOptions.bossCell >= 3) achievements.push("Boss Cell Expert");
        if (this.saveOptions.runs >= 100) achievements.push("Persistent");
        
        return achievements;
    }

    getSelectedRunes() {
        const runes = [];
        this.selectedItems.forEach(itemId => {
            const rune = DEAD_CELLS_DATA.runes?.find(r => r.id === itemId);
            if (rune) {
                runes.push(rune.name);
            }
        });
        return runes;
    }

    countDLCItems() {
        let dlcCount = 0;
        this.selectedItems.forEach(itemId => {
            for (const [category, items] of Object.entries(DEAD_CELLS_DATA)) {
                const item = items.find(i => i.id === itemId);
                if (item && item.dlc) {
                    dlcCount++;
                    break;
                }
            }
        });
        return dlcCount;
    }

    getCategoryBreakdown() {
        const breakdown = {};
        for (const [category, items] of Object.entries(DEAD_CELLS_DATA)) {
            breakdown[category] = items.filter(item => this.selectedItems.has(item.id)).length;
        }
        return breakdown;
    }

    formatPlayTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    generateDefaultSettings() {
        return {
            difficulty: "Normal",
            assistMode: false,
            language: "en",
            soundVolume: 1.0,
            musicVolume: 1.0
        };
    }

    // Convierte los datos a formato de archivo user.dat real
    generateUserDatFile() {
        const userDatFile = this.generateUserDatSave();
        return userDatFile.content;
    }

    // Genera un archivo compatible con Dead Cells (user.dat)
    generateCompatibleSave() {
        const userDatFile = this.generateUserDatSave();
        
        // El contenido ya está en formato binario simulado
        return userDatFile.content;
    }

    // Genera archivo de debug en formato JSON
    generateDebugSave() {
        const saveData = this.generateSaveData();
        return JSON.stringify(saveData, null, 2);
    }

    // Actualiza las opciones del guardado
    updateSaveOptions(options) {
        this.saveOptions = { ...this.saveOptions, ...options };
    }

    // Añade item seleccionado
    addSelectedItem(itemId) {
        this.selectedItems.add(itemId);
    }

    // Remueve item seleccionado
    removeSelectedItem(itemId) {
        this.selectedItems.delete(itemId);
    }

    // Limpia todos los items seleccionados
    clearSelectedItems() {
        this.selectedItems.clear();
    }

    // Selecciona todos los items
    selectAllItems() {
        for (const [category, items] of Object.entries(DEAD_CELLS_DATA)) {
            items.forEach(item => {
                this.selectedItems.add(item.id);
            });
        }
    }

    // Obtiene estadísticas del guardado
    getSaveStats() {
        return {
            totalItemsSelected: this.selectedItems.size,
            totalItemsAvailable: Object.values(DEAD_CELLS_DATA).reduce((sum, items) => sum + items.length, 0),
            selectedByCategory: this.getSelectedByCategory()
        };
    }

    getSelectedByCategory() {
        const stats = {};
        for (const [category, items] of Object.entries(DEAD_CELLS_DATA)) {
            stats[category] = items.filter(item => this.selectedItems.has(item.id)).length;
        }
        return stats;
    }
}

// Función para descargar el archivo
function downloadSaveFile(content, filename) {
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Función para exportar como JSON (para debug)
function downloadJSON(data, filename) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}