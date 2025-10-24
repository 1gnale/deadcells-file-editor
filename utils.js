// Utilidades adicionales para el editor de guardados
class SaveUtils {
    // Función para validar archivos de guardado
    static validateSaveFile(fileContent) {
        try {
            // Verificar cabecera
            if (!fileContent.startsWith('DEADCELLS_SAVE_V1')) {
                return { valid: false, error: 'Cabecera de archivo inválida' };
            }

            // Extraer JSON
            const lines = fileContent.split('\n');
            const jsonStart = 1;
            const jsonEnd = lines.length - 1;
            const jsonContent = lines.slice(jsonStart, jsonEnd).join('\n');

            // Validar JSON
            const saveData = JSON.parse(jsonContent);
            
            // Verificar estructura básica
            if (!saveData.version || !saveData.saveInfo) {
                return { valid: false, error: 'Estructura de guardado inválida' };
            }

            return { valid: true, data: saveData };
        } catch (error) {
            return { valid: false, error: error.message };
        }
    }

    // Función para convertir guardado antiguo a nuevo formato
    static convertLegacySave(oldSaveData) {
        // Implementar conversión de formatos antiguos
        return {
            version: "1.0",
            timestamp: Date.now(),
            saveInfo: {
                cells: oldSaveData.cells || 0,
                gold: oldSaveData.gold || 0,
                runs: oldSaveData.completedRuns || 0,
                bossCellLevel: oldSaveData.difficulty || 0,
                playTime: oldSaveData.playTime || "00:00:00"
            },
            unlockedItems: oldSaveData.unlocks || {},
            progress: oldSaveData.progress || {},
            settings: oldSaveData.settings || {}
        };
    }

    // Función para generar nombres de archivo seguros
    static generateSafeFilename(baseName) {
        const timestamp = new Date().toISOString()
            .replace(/[:.]/g, '-')
            .slice(0, -5);
        return `${baseName}-${timestamp}`.replace(/[^a-zA-Z0-9-_]/g, '');
    }

    // Función para calcular estadísticas del guardado
    static calculateSaveStats(saveData) {
        const stats = {
            totalItems: 0,
            totalValue: 0,
            completionPercentage: 0,
            playtimeMinutes: 0
        };

        // Contar items desbloqueados
        if (saveData.unlockedItems) {
            Object.values(saveData.unlockedItems).forEach(categoryItems => {
                if (Array.isArray(categoryItems)) {
                    stats.totalItems += categoryItems.length;
                }
            });
        }

        // Calcular valor total
        stats.totalValue = (saveData.saveInfo?.cells || 0) + (saveData.saveInfo?.gold || 0);

        // Calcular porcentaje de completación (aproximado)
        const totalPossibleItems = Object.values(DEAD_CELLS_DATA)
            .reduce((sum, items) => sum + items.length, 0);
        stats.completionPercentage = Math.round((stats.totalItems / totalPossibleItems) * 100);

        return stats;
    }
}

// Función para crear presets populares
class SavePresets {
    static getPresets() {
        return {
            newGame: {
                name: "Nuevo Juego",
                description: "Guardado básico para empezar",
                items: ['rusty_sword', 'wooden_shield', 'grenade'],
                options: { cells: 0, gold: 50, runs: 0, bossCell: 0 }
            },
            
            speedrun: {
                name: "Speedrun Setup",
                description: "Items optimizados para speedrun",
                items: ['cursed_sword', 'assassins_dagger', 'phaser', 'vine_rune', 'teleportation_rune'],
                options: { cells: 1000, gold: 0, runs: 10, bossCell: 2 }
            },
            
            allWeapons: {
                name: "Todas las Armas",
                description: "Desbloquea todas las armas",
                items: DEAD_CELLS_DATA.weapons.map(w => w.id),
                options: { cells: 5000, gold: 10000, runs: 50, bossCell: 3 }
            },
            
            completionist: {
                name: "Completista",
                description: "Todo desbloqueado",
                items: Object.values(DEAD_CELLS_DATA).flat().map(item => item.id),
                options: { cells: 99999, gold: 99999, runs: 999, bossCell: 5 }
            },
            
            bossRush: {
                name: "Boss Rush",
                description: "Preparado para pelear jefes",
                items: ['giant_killer', 'heavy_crossbow', 'rampart', 'corrupted_power', 'knight_outfit'],
                options: { cells: 2000, gold: 5000, runs: 25, bossCell: 4 }
            }
        };
    }

    static applyPreset(presetKey, saveGenerator) {
        const presets = this.getPresets();
        const preset = presets[presetKey];
        
        if (!preset) return false;

        // Limpiar selección actual
        saveGenerator.clearSelectedItems();
        
        // Aplicar items del preset
        preset.items.forEach(itemId => {
            saveGenerator.addSelectedItem(itemId);
        });
        
        // Aplicar opciones
        saveGenerator.updateSaveOptions(preset.options);
        
        return true;
    }
}

// Función para manejar la importación de archivos
class FileImporter {
    static async importSaveFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    let content = e.target.result;
                    
                    // Si es base64, decodificar
                    if (!content.includes('DEADCELLS_SAVE_V1')) {
                        content = atob(content);
                    }
                    
                    const validation = SaveUtils.validateSaveFile(content);
                    
                    if (validation.valid) {
                        resolve(validation.data);
                    } else {
                        reject(new Error(validation.error));
                    }
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => reject(new Error('Error leyendo archivo'));
            reader.readAsText(file);
        });
    }

    static async loadSaveToEditor(saveData, app) {
        // Limpiar selección actual
        app.saveGenerator.clearSelectedItems();
        
        // Cargar opciones
        if (saveData.saveInfo) {
            app.saveGenerator.updateSaveOptions({
                cells: saveData.saveInfo.cells || 0,
                gold: saveData.saveInfo.gold || 0,
                runs: saveData.saveInfo.runs || 0,
                bossCell: saveData.saveInfo.bossCellLevel || 0
            });
            
            // Actualizar inputs
            document.getElementById('cells').value = saveData.saveInfo.cells || 0;
            document.getElementById('gold').value = saveData.saveInfo.gold || 0;
            document.getElementById('runs').value = saveData.saveInfo.runs || 0;
            document.getElementById('bossCell').value = saveData.saveInfo.bossCellLevel || 0;
        }
        
        // Cargar items desbloqueados
        if (saveData.unlockedItems) {
            for (const [category, items] of Object.entries(saveData.unlockedItems)) {
                if (Array.isArray(items)) {
                    items.forEach(item => {
                        // Buscar el ID del item en nuestros datos
                        const mapping = SAVE_DATA_MAPPING[category];
                        if (mapping) {
                            const itemId = Object.keys(mapping).find(key => mapping[key] === item.id);
                            if (itemId) {
                                app.saveGenerator.addSelectedItem(itemId);
                                const card = document.querySelector(`[data-item-id="${itemId}"]`);
                                if (card) card.classList.add('selected');
                            }
                        }
                    });
                }
            }
        }
        
        app.updateStats();
    }
}

// Función para estadísticas y analytics
class SaveAnalytics {
    static trackSaveGeneration(saveData) {
        const stats = SaveUtils.calculateSaveStats(saveData);
        console.log('📊 Guardado generado:', {
            items: stats.totalItems,
            valor: stats.totalValue,
            completacion: stats.completionPercentage + '%',
            timestamp: new Date().toISOString()
        });
    }

    static generateReport(saveData) {
        const stats = SaveUtils.calculateSaveStats(saveData);
        const report = {
            generatedAt: new Date().toISOString(),
            statistics: stats,
            itemBreakdown: {},
            recommendations: []
        };

        // Desglose por categoría
        if (saveData.unlockedItems) {
            for (const [category, items] of Object.entries(saveData.unlockedItems)) {
                if (Array.isArray(items)) {
                    report.itemBreakdown[category] = items.length;
                }
            }
        }

        // Recomendaciones basadas en el progreso
        if (stats.completionPercentage < 25) {
            report.recommendations.push("Considera desbloquear más armas básicas para facilitar el progreso");
        }
        
        if (saveData.saveInfo?.bossCellLevel > 0 && stats.totalItems < 20) {
            report.recommendations.push("Boss Cell activo con pocos items - puede ser muy difícil");
        }

        return report;
    }
}

// Exportar utilidades para uso global
window.SaveUtils = SaveUtils;
window.SavePresets = SavePresets;
window.FileImporter = FileImporter;
window.SaveAnalytics = SaveAnalytics;