// Gestion de l'authentification Firebase et sessions persistantes

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.authStateListeners = [];
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;
        
        // Attendre que Firebase soit chargé
        await this.waitForFirebase();
        
        // Configurer la persistance locale
        await window.firebase.setPersistence(window.firebase.auth, window.firebase.browserLocalPersistence);
        
        // Écouter les changements d'état d'authentification
        window.firebase.onAuthStateChanged(window.firebase.auth, (user) => {
            this.currentUser = user;
            this.notifyAuthStateListeners(user);
            
            if (user) {
                // Sauvegarder le token dans localStorage pour persistance multi-appareils
                user.getIdToken().then(token => {
                    localStorage.setItem('coachyAuthToken', token);
                    localStorage.setItem('coachyUserId', user.uid);
                    this.setCookie('coachyAuth', token, 30); // Cookie de 30 jours
                });
                
                console.log('Utilisateur connecté:', user.email);
            } else {
                // Nettoyer les données de session
                localStorage.removeItem('coachyAuthToken');
                localStorage.removeItem('coachyUserId');
                this.deleteCookie('coachyAuth');
                console.log('Utilisateur déconnecté');
            }
        });
        
        this.isInitialized = true;
        
        // Vérifier si une session existe
        return this.checkExistingSession();
    }

    async waitForFirebase() {
        let attempts = 0;
        while (!window.firebase || !window.firebase.auth) {
            if (attempts > 50) {
                throw new Error('Firebase n\'a pas pu être chargé');
            }
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
    }

    async checkExistingSession() {
        // Vérifier d'abord le cookie
        const cookieToken = this.getCookie('coachyAuth');
        if (cookieToken) {
            try {
                // Vérifier si le token est valide
                const user = window.firebase.auth.currentUser;
                if (user) {
                    this.currentUser = user;
                    return user;
                }
            } catch (error) {
                console.error('Erreur de vérification du token:', error);
                this.deleteCookie('coachyAuth');
            }
        }

        // Vérifier localStorage comme fallback
        const savedToken = localStorage.getItem('coachyAuthToken');
        const savedUserId = localStorage.getItem('coachyUserId');
        
        if (savedToken && savedUserId) {
            // Firebase devrait automatiquement restaurer la session
            // grâce à la persistance locale
            return window.firebase.auth.currentUser;
        }
        
        return null;
    }

    async register(email, password, name) {
        try {
            // Créer le compte
            const userCredential = await window.firebase.createUserWithEmailAndPassword(
                window.firebase.auth,
                email,
                password
            );
            
            const user = userCredential.user;
            
            // Créer le profil utilisateur initial
            const initialUserData = {
                profile: {
                    name: name,
                    email: email,
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
                lastUpdated: window.firebase.serverTimestamp()
            };
            
            // Sauvegarder les données dans Firestore
            const userRef = window.firebase.doc(window.firebase.db, 'users', user.uid);
            await window.firebase.setDoc(userRef, initialUserData);
            
            this.currentUser = user;
            
            // Créer la session persistante
            const token = await user.getIdToken();
            localStorage.setItem('coachyAuthToken', token);
            localStorage.setItem('coachyUserId', user.uid);
            this.setCookie('coachyAuth', token, 30);
            
            return { user, userData: initialUserData };
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            throw this.getErrorMessage(error);
        }
    }

    async login(email, password) {
        try {
            const userCredential = await window.firebase.signInWithEmailAndPassword(
                window.firebase.auth,
                email,
                password
            );
            
            const user = userCredential.user;
            this.currentUser = user;
            
            // Créer la session persistante
            const token = await user.getIdToken();
            localStorage.setItem('coachyAuthToken', token);
            localStorage.setItem('coachyUserId', user.uid);
            this.setCookie('coachyAuth', token, 30);
            
            // Charger les données utilisateur
            const userData = await this.loadUserData(user.uid);
            
            return { user, userData };
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            throw this.getErrorMessage(error);
        }
    }

    async logout() {
        try {
            await window.firebase.signOut(window.firebase.auth);
            this.currentUser = null;
            
            // Nettoyer toutes les données de session
            localStorage.removeItem('coachyAuthToken');
            localStorage.removeItem('coachyUserId');
            localStorage.removeItem('coachyUserData');
            this.deleteCookie('coachyAuth');
            
            return true;
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            throw error;
        }
    }

    async loadUserData(userId = null) {
        try {
            const uid = userId || this.currentUser?.uid;
            if (!uid) throw new Error('Aucun utilisateur connecté');
            
            const userRef = window.firebase.doc(window.firebase.db, 'users', uid);
            const docSnap = await window.firebase.getDoc(userRef);
            
            if (docSnap.exists()) {
                const userData = docSnap.data();
                // Mettre en cache localement pour accès rapide
                localStorage.setItem('coachyUserData', JSON.stringify(userData));
                return userData;
            } else {
                // Créer des données par défaut si elles n'existent pas
                const defaultData = this.getDefaultUserData();
                await window.firebase.setDoc(userRef, defaultData);
                return defaultData;
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            // Essayer de charger depuis le cache local
            const cachedData = localStorage.getItem('coachyUserData');
            if (cachedData) {
                return JSON.parse(cachedData);
            }
            throw error;
        }
    }

    async saveUserData(userData) {
        try {
            if (!this.currentUser) throw new Error('Aucun utilisateur connecté');
            
            const userRef = window.firebase.doc(window.firebase.db, 'users', this.currentUser.uid);
            
            // Ajouter le timestamp de mise à jour
            userData.lastUpdated = window.firebase.serverTimestamp();
            
            await window.firebase.setDoc(userRef, userData, { merge: true });
            
            // Mettre à jour le cache local
            localStorage.setItem('coachyUserData', JSON.stringify(userData));
            
            return true;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            throw error;
        }
    }

    async updateProfile(profileData) {
        try {
            if (!this.currentUser) throw new Error('Aucun utilisateur connecté');
            
            const userRef = window.firebase.doc(window.firebase.db, 'users', this.currentUser.uid);
            await window.firebase.updateDoc(userRef, {
                profile: profileData,
                lastUpdated: window.firebase.serverTimestamp()
            });
            
            return true;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error);
            throw error;
        }
    }

    async saveWorkoutSession(workoutData) {
        try {
            if (!this.currentUser) throw new Error('Aucun utilisateur connecté');
            
            // Ajouter à la collection des séances
            const workoutsRef = window.firebase.collection(window.firebase.db, 'users', this.currentUser.uid, 'workouts');
            await window.firebase.addDoc(workoutsRef, {
                ...workoutData,
                timestamp: window.firebase.serverTimestamp()
            });
            
            // Mettre à jour les stats globales
            const userRef = window.firebase.doc(window.firebase.db, 'users', this.currentUser.uid);
            const userData = await this.loadUserData();
            
            userData.stats.workoutCount++;
            userData.stats.lastWorkout = new Date().toISOString();
            userData.workoutHistory.push({
                date: new Date().toISOString(),
                ...workoutData
            });
            
            await this.saveUserData(userData);
            
            return true;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de la séance:', error);
            throw error;
        }
    }

    getDefaultUserData() {
        return {
            profile: {
                name: '',
                email: this.currentUser?.email || '',
                age: 17,
                height: 180,
                weight: 63,
                goal: 'masse'
            },
            stats: {
                streak: 0,
                workoutCount: 0,
                level: 'Débutant',
                badges: [],
                lastWorkout: null,
                totalPoints: 0
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
            currentWeek: 1
        };
    }

    onAuthStateChange(callback) {
        this.authStateListeners.push(callback);
        // Appeler immédiatement si un utilisateur est déjà connecté
        if (this.currentUser) {
            callback(this.currentUser);
        }
    }

    notifyAuthStateListeners(user) {
        this.authStateListeners.forEach(callback => {
            try {
                callback(user);
            } catch (error) {
                console.error('Erreur dans le listener d\'auth:', error);
            }
        });
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getErrorMessage(error) {
        const errorMessages = {
            'auth/email-already-in-use': 'Cette adresse email est déjà utilisée',
            'auth/invalid-email': 'Adresse email invalide',
            'auth/operation-not-allowed': 'Opération non autorisée',
            'auth/weak-password': 'Le mot de passe doit contenir au moins 6 caractères',
            'auth/user-disabled': 'Ce compte a été désactivé',
            'auth/user-not-found': 'Aucun compte trouvé avec cette adresse email',
            'auth/wrong-password': 'Mot de passe incorrect',
            'auth/too-many-requests': 'Trop de tentatives. Réessayez plus tard',
            'auth/network-request-failed': 'Erreur de connexion. Vérifiez votre connexion internet'
        };
        
        return errorMessages[error.code] || error.message || 'Une erreur est survenue';
    }

    // Gestion des cookies pour persistance multi-appareils
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
}

// Créer une instance globale
const authManager = new AuthManager();

// Export pour utilisation dans d'autres modules
export { authManager, AuthManager };
