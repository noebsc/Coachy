// Gestion des données utilisateur et synchronisation Firebase

import { authManager } from './auth.js';

class DataManager {
    constructor() {
        this.userData = null;
        this.isLoading = false;
        this.autoSaveInterval = null;
        this.pendingChanges = false;
        this.syncQueue = [];
    }

    async init() {
        // Charger les données au démarrage
        await this.loadUserData();
        
        // Auto-sauvegarde toutes les 30 secondes si des changements sont en attente
        this.autoSaveInterval = setInterval(() => {
            if (this.pendingChanges) {
                this.saveUserData();
            }
        }, 30000);
        
        // Synchronisation en temps réel
        this.setupRealtimeSync();
    }

    async loadUserData() {
        try {
            this.isLoading = true;
            
            // Essayer de charger depuis Firebase
            if (authManager.isAuthenticated()) {
                this.userData = await authManager.loadUserData();
            } else {
                // Charger les données par défaut ou depuis le cache
                this.userData = this.getDefaultUserData();
            }
            
            this.isLoading = false;
            return this.userData;
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            this.isLoading = false;
            
            // Fallback sur les données en cache
            const cachedData = localStorage.getItem('coachyUserData');
            if (cachedData) {
                this.userData = JSON.parse(cachedData);
                return this.userData;
            }
            
            // Sinon, utiliser les données par défaut
            this.userData = this.getDefaultUserData();
            return this.userData;
        }
    }

    async saveUserData(immediate = false) {
        if (!this.userData || !authManager.isAuthenticated()) return;
        
        try {
            if (immediate) {
                // Sauvegarde immédiate
                await authManager.saveUserData(this.userData);
                this.pendingChanges = false;
            } else {
                // Marquer comme ayant des changements en attente
                this.pendingChanges = true;
            }
            
            // Sauvegarder dans le cache local
            localStorage.setItem('coachyUserData', JSON.stringify(this.userData));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            // Ajouter à la queue de synchronisation pour réessayer plus tard
            this.addToSyncQueue('userData', this.userData);
        }
    }

    setupRealtimeSync() {
        if (!authManager.isAuthenticated()) return;
        
        const userId = authManager.getCurrentUser().uid;
        const userRef = window.firebase.doc(window.firebase.db, 'users', userId);
        
        // Écouter les changements en temps réel
        window.firebase.onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                const serverData = doc.data();
                
                // Fusionner avec les données locales (priorité aux données serveur)
                this.mergeUserData(serverData);
            }
        });
    }

    mergeUserData(serverData) {
        // Stratégie de fusion: priorité aux données les plus récentes
        if (!this.userData) {
            this.userData = serverData;
            return;
        }
        
        const localTimestamp = new Date(this.userData.lastUpdated || 0);
        const serverTimestamp = serverData.lastUpdated ? serverData.lastUpdated.toDate() : new Date(0);
        
        if (serverTimestamp > localTimestamp) {
            // Les données serveur sont plus récentes
            this.userData = serverData;
            localStorage.setItem('coachyUserData', JSON.stringify(this.userData));
        }
    }

    getDefaultUserData() {
        return {
            profile: {
                name: '',
                age: 17,
                height: 180,
                weight: 63,
                goal: 'masse',
                createdAt: new Date().toISOString()
            },
            stats: {
                streak: 0,
                workoutCount: 0,
                level: 'Débutant',
                badges: [],
                lastWorkout: null,
                totalPoints: 0,
                weekendComplete: 0,
                phasesCompleted: 0,
                perfectMonth: 0,
                programComplete: false,
                earlyWorkout: 0,
                lateWorkout: 0,
                perfectWorkout: 0,
                comebacks: 0,
                hundredPushups: 0,
                plank2min: 0,
                totalCurls: 0,
                armWorkouts: 0
            },
            preferences: {
                likedExercises: [],
                dislikedExercises: [],
                notifications: false,
                sound: true,
                darkMode: false
            },
            workoutHistory: [],
            currentPhase: 1,
            currentWeek: 1,
            exerciseRecords: {},
            customWorkouts: [],
            notes: []
        };
    }

    // Méthodes de mise à jour des données
    updateProfile(profileData) {
        if (!this.userData) this.userData = this.getDefaultUserData();
        
        this.userData.profile = { ...this.userData.profile, ...profileData };
        this.saveUserData();
    }

    updateStats(stats) {
        if (!this.userData) this.userData = this.getDefaultUserData();
        
        this.userData.stats = { ...this.userData.stats, ...stats };
        this.saveUserData();
    }

    updatePreferences(preferences) {
        if (!this.userData) this.userData = this.getDefaultUserData();
        
        this.userData.preferences = { ...this.userData.preferences, ...preferences };
        this.saveUserData();
    }

    addWorkoutToHistory(workout) {
        if (!this.userData) this.userData = this.getDefaultUserData();
        
        const workoutEntry = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            ...workout
        };
        
        this.userData.workoutHistory.push(workoutEntry);
        
        // Limiter l'historique à 100 entrées pour éviter de surcharger
        if (this.userData.workoutHistory.length > 100) {
            this.userData.workoutHistory = this.userData.workoutHistory.slice(-100);
        }
        
        this.saveUserData(true); // Sauvegarde immédiate pour l'historique
    }

    async completeWorkout(workoutData) {
        if (!this.userData) await this.loadUserData();
        
        const now = new Date();
        const hour = now.getHours();
        
        // Mettre à jour les statistiques
        this.userData.stats.workoutCount++;
        this.userData.stats.lastWorkout = now.toISOString();
        
        // Calculer la série (streak)
        const lastWorkout = this.userData.stats.lastWorkout ? new Date(this.userData.stats.lastWorkout) : null;
        if (lastWorkout) {
            const daysSince = Math.floor((now - lastWorkout) / (1000 * 60 * 60 * 24));
            if (daysSince === 1) {
                this.userData.stats.streak++;
            } else if (daysSince > 1) {
                this.userData.stats.streak = 1;
            }
        } else {
            this.userData.stats.streak = 1;
        }
        
        // Vérifier les conditions spéciales
        if (hour < 8) this.userData.stats.earlyWorkout++;
        if (hour >= 20) this.userData.stats.lateWorkout++;
        
        // Vérifier si c'est un weekend complet
        const today = now.getDay();
        const yesterday = new Date(now.getTime() - 86400000).getDay();
        if ((today === 0 && this.checkWorkoutYesterday()) || 
            (today === 1 && yesterday === 0 && this.checkWorkoutYesterday())) {
            this.userData.stats.weekendComplete++;
        }
        
        // Compter les exercices spécifiques
        if (workoutData.exercises) {
            workoutData.exercises.forEach(exercise => {
                if (exercise.name.toLowerCase().includes('pompe') || 
                    exercise.name.toLowerCase().includes('push')) {
                    const pushupCount = parseInt(exercise.reps) * parseInt(exercise.sets);
                    if (pushupCount >= 100) {
                        this.userData.stats.hundredPushups++;
                    }
                }
                
                if (exercise.name.toLowerCase().includes('curl')) {
                    const curlCount = parseInt(exercise.reps) * parseInt(exercise.sets);
                    this.userData.stats.totalCurls = (this.userData.stats.totalCurls || 0) + curlCount;
                }
                
                if (exercise.name.toLowerCase().includes('gainage') || 
                    exercise.name.toLowerCase().includes('plank')) {
                    if (parseInt(exercise.duration) >= 120) {
                        this.userData.stats.plank2min++;
                    }
                }
            });
        }
        
        // Vérifier la progression de phase
        if (this.userData.currentWeek >= 4) {
            this.userData.currentWeek = 1;
            this.userData.currentPhase++;
            this.userData.stats.phasesCompleted++;
            
            if (this.userData.currentPhase > 3) {
                this.userData.stats.programComplete = true;
            }
        } else {
            this.userData.currentWeek++;
        }
        
        // Ajouter à l'historique
        this.addWorkoutToHistory(workoutData);
        
        // Vérifier les nouveaux badges
        const newBadges = checkBadges(this.userData.stats);
        if (newBadges.length > 0) {
            this.userData.stats.badges = [...new Set([...this.userData.stats.badges, ...newBadges.map(b => b.id)])];
            this.userData.stats.totalPoints += newBadges.reduce((sum, badge) => sum + badge.points, 0);
        }
        
        // Mettre à jour le niveau
        this.userData.stats.level = getCurrentLevel(this.userData.stats.totalPoints).name;
        
        // Sauvegarder immédiatement
        await this.saveUserData(true);
        
        return {
            newBadges,
            levelUp: this.checkLevelUp(this.userData.stats.totalPoints)
        };
    }

    checkWorkoutYesterday() {
        if (!this.userData.workoutHistory || this.userData.workoutHistory.length === 0) return false;
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);
        
        return this.userData.workoutHistory.some(workout => {
            const workoutDate = new Date(workout.date);
            workoutDate.setHours(0, 0, 0, 0);
            return workoutDate.getTime() === yesterday.getTime();
        });
    }

    checkLevelUp(newPoints) {
        const oldLevel = getCurrentLevel(newPoints - 10);
        const newLevel = getCurrentLevel(newPoints);
        return oldLevel.name !== newLevel.name ? newLevel : null;
    }

    toggleExercisePreference(exerciseId, preference) {
        if (!this.userData) this.userData = this.getDefaultUserData();
        
        const liked = this.userData.preferences.likedExercises;
        const disliked = this.userData.preferences.dislikedExercises;
        
        if (preference === 'like') {
            // Retirer des détestés si présent
            const dislikedIndex = disliked.indexOf(exerciseId);
            if (dislikedIndex > -1) {
                disliked.splice(dislikedIndex, 1);
            }
            
            // Ajouter ou retirer des aimés
            const likedIndex = liked.indexOf(exerciseId);
            if (likedIndex > -1) {
                liked.splice(likedIndex, 1);
            } else {
                liked.push(exerciseId);
            }
        } else if (preference === 'dislike') {
            // Retirer des aimés si présent
            const likedIndex = liked.indexOf(exerciseId);
            if (likedIndex > -1) {
                liked.splice(likedIndex, 1);
            }
            
            // Ajouter ou retirer des détestés
            const dislikedIndex = disliked.indexOf(exerciseId);
            if (dislikedIndex > -1) {
                disliked.splice(dislikedIndex, 1);
            } else {
                disliked.push(exerciseId);
            }
        }
        
        this.saveUserData();
    }

    getAdaptedWorkout(baseWorkout) {
        if (!this.userData) return baseWorkout;
        
        const liked = this.userData.preferences.likedExercises;
        const disliked = this.userData.preferences.dislikedExercises;
        
        // Filtrer les exercices détestés et prioriser les aimés
        let adaptedWorkout = baseWorkout.filter(exercise => {
            return !disliked.includes(exercise.id);
        });
        
        // Si trop d'exercices ont été filtrés, ajouter des alternatives
        if (adaptedWorkout.length < baseWorkout.length * 0.7) {
            // Réintégrer certains exercices avec des modifications
            adaptedWorkout = baseWorkout.map(exercise => {
                if (disliked.includes(exercise.id)) {
                    // Proposer une alternative ou réduire l'intensité
                    return {
                        ...exercise,
                        sets: Math.max(2, exercise.sets - 1),
                        reps: exercise.reps.includes('-') ? 
                            exercise.reps.split('-')[0] : 
                            Math.floor(parseInt(exercise.reps) * 0.75).toString(),
                        note: "Version adaptée"
                    };
                }
                return exercise;
            });
        }
        
        // Réorganiser pour mettre les exercices aimés en premier
        adaptedWorkout.sort((a, b) => {
            const aLiked = liked.includes(a.id) ? -1 : 0;
            const bLiked = liked.includes(b.id) ? -1 : 0;
            return aLiked - bLiked;
        });
        
        return adaptedWorkout;
    }

    addToSyncQueue(type, data) {
        this.syncQueue.push({
            type,
            data,
            timestamp: Date.now(),
            retries: 0
        });
        
        // Essayer de synchroniser après 5 secondes
        setTimeout(() => this.processSyncQueue(), 5000);
    }

    async processSyncQueue() {
        if (this.syncQueue.length === 0) return;
        
        const toProcess = [...this.syncQueue];
        this.syncQueue = [];
        
        for (const item of toProcess) {
            try {
                if (item.type === 'userData') {
                    await authManager.saveUserData(item.data);
                }
                // Autres types de synchronisation si nécessaire
            } catch (error) {
                console.error('Erreur de synchronisation:', error);
                item.retries++;
                
                // Réessayer jusqu'à 3 fois
                if (item.retries < 3) {
                    this.syncQueue.push(item);
                }
            }
        }
    }

    exportData() {
        const dataStr = JSON.stringify(this.userData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `coachy-data-${Date.now()}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    async importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    
                    // Valider la structure des données
                    if (!importedData.profile || !importedData.stats) {
                        throw new Error('Format de données invalide');
                    }
                    
                    // Fusionner avec les données existantes
                    this.userData = { ...this.userData, ...importedData };
                    await this.saveUserData(true);
                    
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
            reader.readAsText(file);
        });
    }

    clearAllData() {
        if (confirm('Êtes-vous sûr de vouloir effacer toutes vos données ? Cette action est irréversible.')) {
            this.userData = this.getDefaultUserData();
            this.saveUserData(true);
            localStorage.clear();
            return true;
        }
        return false;
    }
}

// Créer une instance globale
const dataManager = new DataManager();

// Export pour utilisation dans d'autres modules
export { dataManager, DataManager };
