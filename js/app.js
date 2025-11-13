// Application principale - Coordination de tous les modules
import { authManager } from './auth.js';
import { dataManager } from './data.js';

// État global de l'application
window.appState = {
    isInitialized: false,
    currentUser: null,
    userData: null
};

// Initialisation de l'application
async function initApp() {
    if (window.appState.isInitialized) return;
    
    try {
        uiManager.showLoading('Initialisation de Coachy...');
        
        // Initialiser l'authentification
        await authManager.init();
        
        // Vérifier l'état de connexion
        authManager.onAuthStateChange(async (user) => {
            if (user) {
                window.appState.currentUser = user;
                await handleUserLogin(user);
            } else {
                showAuthPage();
            }
            uiManager.hideLoading();
        });
        
        // Initialiser les event listeners
        setupEventListeners();
        
        // Initialiser le timer
        initializeTimer();
        
        window.appState.isInitialized = true;
        
    } catch (error) {
        console.error('Erreur d\'initialisation:', error);
        uiManager.showToast('Erreur d\'initialisation. Veuillez rafraîchir la page.', 'error');
        uiManager.hideLoading();
    }
}

// Gestion de la connexion utilisateur
async function handleUserLogin(user) {
    try {
        // Charger les données utilisateur
        await dataManager.init();
        window.appState.userData = dataManager.userData;
        window.userData = dataManager.userData; // Pour compatibilité globale
        
        // Afficher l'application principale
        showMainApp();
        
        // Charger le dashboard
        loadDashboard();
        
        // Appliquer les préférences utilisateur
        applyUserPreferences();
        
        // Charger la motivation du jour
        loadDailyMotivation();
        
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        uiManager.showToast('Erreur de chargement des données', 'error');
    }
}

// Configuration des event listeners
function setupEventListeners() {
    // Authentification
    document.getElementById('login-btn')?.addEventListener('click', handleLogin);
    document.getElementById('register-btn')?.addEventListener('click', handleRegister);
    document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
    
    // Switch entre login et register
    document.getElementById('show-register')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
        clearAuthError();
    });
    
    document.getElementById('show-login')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
        clearAuthError();
    });
    
    // Navigation personnalisée
    document.addEventListener('pageLoaded', (e) => {
        switch(e.detail.page) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'programme':
                loadProgramme();
                break;
            case 'historique':
                loadHistory();
                break;
            case 'guides':
                loadGuides();
                break;
            case 'profil':
                loadProfile();
                break;
        }
    });
    
    // Profil
    document.getElementById('save-profil')?.addEventListener('click', saveProfile);
    
    // Settings
    document.getElementById('notifications-enabled')?.addEventListener('change', updatePreferences);
    document.getElementById('sound-enabled')?.addEventListener('change', updatePreferences);
    document.getElementById('dark-mode')?.addEventListener('change', updatePreferences);
    
    // Phase buttons
    document.querySelectorAll('.phase-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const phase = parseInt(btn.dataset.phase);
            loadPhase(phase);
        });
    });
    
    // Guide tabs
    document.querySelectorAll('.guide-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const guide = tab.dataset.guide;
            loadGuideContent(guide);
        });
    });
}

// Gestion de l'authentification
async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        showAuthError('Veuillez remplir tous les champs');
        return;
    }
    
    try {
        uiManager.showLoading('Connexion en cours...');
        const result = await authManager.login(email, password);
        
        window.appState.currentUser = result.user;
        window.appState.userData = result.userData;
        
        await handleUserLogin(result.user);
        
        uiManager.showToast('Connexion réussie ! Bienvenue !', 'success');
        
    } catch (error) {
        showAuthError(error);
        uiManager.hideLoading();
    }
}

async function handleRegister() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    
    if (!name || !email || !password || !confirmPassword) {
        showAuthError('Veuillez remplir tous les champs');
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthError('Les mots de passe ne correspondent pas');
        return;
    }
    
    if (password.length < 6) {
        showAuthError('Le mot de passe doit contenir au moins 6 caractères');
        return;
    }
    
    try {
        uiManager.showLoading('Création du compte...');
        const result = await authManager.register(email, password, name);
        
        window.appState.currentUser = result.user;
        window.appState.userData = result.userData;
        
        await handleUserLogin(result.user);
        
        uiManager.showToast('Compte créé avec succès ! Bienvenue dans Coachy !', 'success');
        
    } catch (error) {
        showAuthError(error);
        uiManager.hideLoading();
    }
}

async function handleLogout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        try {
            await authManager.logout();
            window.appState.currentUser = null;
            window.appState.userData = null;
            showAuthPage();
            uiManager.showToast('Déconnexion réussie', 'info');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            uiManager.showToast('Erreur lors de la déconnexion', 'error');
        }
    }
}

// Affichage des pages
function showAuthPage() {
    document.getElementById('auth-page').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
}

function showMainApp() {
    document.getElementById('auth-page').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
}

function showAuthError(message) {
    const errorDiv = document.getElementById('auth-error');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    
    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 5000);
}

function clearAuthError() {
    const errorDiv = document.getElementById('auth-error');
    errorDiv.classList.remove('show');
}

// Chargement du dashboard
function loadDashboard() {
    if (!window.appState.userData) return;
    
    const userData = window.appState.userData;
    
    // Mettre à jour le nom
    document.getElementById('user-name').textContent = userData.profile.name || 'Champion';
    
    // Mettre à jour les stats
    uiManager.updateStats(userData.stats);
    
    // Charger la séance du jour
    loadTodayWorkout();
    
    // Charger les badges
    loadBadges();
    
    // Charger la motivation
    loadDailyMotivation();
}

// Chargement de la séance du jour
function loadTodayWorkout() {
    const today = new Date().getDay();
    const container = document.getElementById('today-workout-content');
    
    if (!container) return;
    
    // Vérifier si c'est un jour d'entraînement
    if (today !== 6 && today !== 0) { // Ni samedi ni dimanche
        container.innerHTML = `
            <div class="no-workout-today">
                <div class="rest-day-icon">😌</div>
                <h3>Jour de repos !</h3>
                <p>Profite pour bien récupérer</p>
                <p>Prochaine séance: ${today < 6 ? 'Samedi' : 'Dimanche'}</p>
                <button class="btn btn-primary" onclick="uiManager.navigateToPage('guides')">
                    Voir les conseils récupération
                </button>
            </div>
        `;
        return;
    }
    
    // Charger la séance appropriée
    const dayName = today === 6 ? 'samedi' : 'dimanche';
    const phaseKey = `phase${window.appState.userData.currentPhase}`;
    const workout = workoutProgram[phaseKey]?.workouts[dayName];
    
    if (!workout) {
        container.innerHTML = '<p>Erreur de chargement de la séance</p>';
        return;
    }
    
    // Adapter selon les préférences
    const adaptedWorkout = dataManager.getAdaptedWorkout(workout);
    
    // Afficher les exercices
    container.innerHTML = '';
    adaptedWorkout.forEach((exercise, index) => {
        const card = uiManager.renderExerciseCard(exercise, index);
        container.appendChild(card);
    });
}

// Chargement des badges
function loadBadges() {
    const container = document.getElementById('badges-container');
    if (!container) return;
    
    container.innerHTML = '';
    const userBadges = window.appState.userData?.stats?.badges || [];
    
    badges.forEach(badge => {
        const badgeElement = document.createElement('div');
        badgeElement.className = `badge-item ${userBadges.includes(badge.id) ? 'unlocked' : 'locked'}`;
        badgeElement.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
        `;
        
        badgeElement.addEventListener('click', () => {
            const status = userBadges.includes(badge.id) ? '✅ Débloqué' : '🔒 Verrouillé';
            uiManager.showModal(`
                <div class="badge-detail">
                    <div class="badge-icon-large">${badge.icon}</div>
                    <h3>${badge.name}</h3>
                    <p>${badge.description}</p>
                    <p class="badge-status">${status}</p>
                    <p class="badge-points">+${badge.points} points</p>
                </div>
            `, { title: badge.name });
        });
        
        container.appendChild(badgeElement);
    });
}

// Chargement de la motivation quotidienne
function loadDailyMotivation() {
    const motivationElement = document.getElementById('daily-motivation');
    if (motivationElement) {
        motivationElement.textContent = getRandomMotivation();
        
        // Changer toutes les 10 secondes avec animation
        setInterval(() => {
            motivationElement.style.opacity = '0';
            setTimeout(() => {
                motivationElement.textContent = getRandomMotivation();
                motivationElement.style.opacity = '1';
            }, 300);
        }, 10000);
    }
}

// Chargement du programme
function loadProgramme() {
    const currentPhase = window.appState.userData?.currentPhase || 1;
    loadPhase(currentPhase);
}

function loadPhase(phaseNumber) {
    const phase = workoutProgram[`phase${phaseNumber}`];
    if (!phase) return;
    
    // Mettre à jour les boutons de phase
    document.querySelectorAll('.phase-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.phase) === phaseNumber);
    });
    
    // Charger le calendrier
    const calendarContainer = document.getElementById('programme-calendar');
    if (calendarContainer) {
        calendarContainer.innerHTML = renderCalendar(phase, phaseNumber);
    }
    
    // Charger les détails
    const detailsContainer = document.getElementById('programme-details');
    if (detailsContainer) {
        detailsContainer.innerHTML = renderPhaseDetails(phase);
    }
}

function renderCalendar(phase, phaseNumber) {
    let html = '<h3>Calendrier Phase ' + phaseNumber + ' - ' + phase.name + '</h3>';
    html += '<div class="calendar-grid">';
    
    for (let week = 1; week <= phase.weeks; week++) {
        html += `<div class="week-row">`;
        html += `<div class="week-label">Semaine ${week}</div>`;
        
        const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        days.forEach((day, index) => {
            const isWorkoutDay = (index === 5 || index === 6); // Samedi ou Dimanche
            const isCompleted = checkIfDayCompleted(phaseNumber, week, index);
            const isToday = new Date().getDay() === (index + 1) % 7;
            
            let className = 'day-cell';
            if (isWorkoutDay) className += ' workout-day';
            if (isCompleted) className += ' completed';
            if (isToday) className += ' today';
            
            html += `
                <div class="${className}">
                    <div class="day-name">${day}</div>
                    ${isWorkoutDay ? '<span class="workout-icon">💪</span>' : '<span class="rest-icon">😴</span>'}
                </div>
            `;
        });
        
        html += '</div>';
    }
    
    html += '</div>';
    return html;
}

function renderPhaseDetails(phase) {
    return `
        <div class="phase-info">
            <h3>${phase.name}</h3>
            <p>${phase.description}</p>
            <div class="phase-stats">
                <span>Durée: ${phase.weeks} semaines</span>
                <span>2 séances/semaine</span>
                <span>${phase.weeks * 2} séances totales</span>
            </div>
        </div>
    `;
}

function checkIfDayCompleted(phase, week, day) {
    // Vérifier dans l'historique si ce jour a été complété
    const history = window.appState.userData?.workoutHistory || [];
    // Logique simplifiée - à améliorer selon les besoins
    return false;
}

// Chargement de l'historique
function loadHistory() {
    const historyContainer = document.getElementById('history-list');
    if (!historyContainer) return;
    
    const history = window.appState.userData?.workoutHistory || [];
    
    if (history.length === 0) {
        historyContainer.innerHTML = '<p>Aucune séance enregistrée pour le moment</p>';
        return;
    }
    
    // Trier par date décroissante
    const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    historyContainer.innerHTML = '';
    sortedHistory.slice(0, 20).forEach(workout => {
        const date = new Date(workout.date);
        const workoutElement = document.createElement('div');
        workoutElement.className = 'history-item';
        workoutElement.innerHTML = `
            <div class="history-date">${date.toLocaleDateString('fr-FR')}</div>
            <div class="history-details">
                <span>${workout.exercises?.length || 0} exercices</span>
                <span>Phase ${workout.phase || 1}</span>
            </div>
        `;
        historyContainer.appendChild(workoutElement);
    });
}

// Chargement des guides
function loadGuides() {
    loadGuideContent('exercices');
}

function loadGuideContent(guideType) {
    const container = document.getElementById('guides-content');
    if (!container) return;
    
    // Mettre à jour les onglets
    document.querySelectorAll('.guide-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.guide === guideType);
    });
    
    // Charger le contenu depuis guides.js
    loadScript('js/guides.js', () => {
        const content = window.getGuideContent ? window.getGuideContent(guideType) : 'Contenu en cours de chargement...';
        container.innerHTML = content;
    });
}

// Gestion du profil
function loadProfile() {
    if (!window.appState.userData) return;
    
    const profile = window.appState.userData.profile;
    document.getElementById('profil-name').value = profile.name || '';
    document.getElementById('profil-age').value = profile.age || 17;
    document.getElementById('profil-height').value = profile.height || 180;
    document.getElementById('profil-weight').value = profile.weight || 63;
    document.getElementById('profil-goal').value = profile.goal || 'masse';
    
    // Charger les préférences d'exercices
    loadExercisePreferences();
}

async function saveProfile() {
    const profileData = {
        name: document.getElementById('profil-name').value,
        age: parseInt(document.getElementById('profil-age').value),
        height: parseInt(document.getElementById('profil-height').value),
        weight: parseInt(document.getElementById('profil-weight').value),
        goal: document.getElementById('profil-goal').value
    };
    
    try {
        dataManager.updateProfile(profileData);
        await dataManager.saveUserData(true);
        uiManager.showToast('Profil sauvegardé !', 'success');
    } catch (error) {
        uiManager.showToast('Erreur lors de la sauvegarde', 'error');
    }
}

function loadExercisePreferences() {
    const container = document.getElementById('exercise-preferences');
    if (!container) return;
    
    // Exemple simple - à développer
    container.innerHTML = '<p>Gérez vos préférences d\'exercices directement depuis les séances</p>';
}

async function updatePreferences() {
    const preferences = {
        notifications: document.getElementById('notifications-enabled').checked,
        sound: document.getElementById('sound-enabled').checked,
        darkMode: document.getElementById('dark-mode').checked
    };
    
    dataManager.updatePreferences(preferences);
    applyUserPreferences();
    await dataManager.saveUserData(true);
}

function applyUserPreferences() {
    const prefs = window.appState.userData?.preferences;
    if (!prefs) return;
    
    // Dark mode
    document.body.classList.toggle('dark-mode', prefs.darkMode);
    
    // Sound
    if (window.globalTimer) {
        window.globalTimer.setSoundEnabled(prefs.sound);
    }
    
    // Update UI
    document.getElementById('notifications-enabled').checked = prefs.notifications;
    document.getElementById('sound-enabled').checked = prefs.sound;
    document.getElementById('dark-mode').checked = prefs.darkMode;
}

// Initialisation du timer
function initializeTimer() {
    if (!window.globalTimer) return;
    
    window.globalTimer.init({
        display: document.querySelector('.timer-display'),
        minutes: document.getElementById('timer-minutes'),
        seconds: document.getElementById('timer-seconds'),
        playBtn: document.getElementById('timer-play'),
        pauseBtn: document.getElementById('timer-pause'),
        resetBtn: document.getElementById('timer-reset'),
        container: document.getElementById('floating-timer')
    });
}

// Utilitaires
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
}

// Démarrage de l'application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export pour debugging
window.appDebug = {
    state: window.appState,
    authManager,
    dataManager,
    resetData: () => dataManager.clearAllData(),
    exportData: () => dataManager.exportData()
};
