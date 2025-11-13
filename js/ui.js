// Gestion de l'interface utilisateur et animations

class UIManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.loadingCount = 0;
        this.toastQueue = [];
        this.modalStack = [];
    }

    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.checkDeviceType();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const page = item.dataset.page;
                this.navigateToPage(page);
            });
        });

        // Modal close
        document.querySelectorAll('.modal-close').forEach(close => {
            close.addEventListener('click', () => this.closeModal());
        });

        // Click outside modal
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        });

        // Responsive menu
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle hidden';
        menuToggle.innerHTML = '☰';
        document.querySelector('.nav-container')?.prepend(menuToggle);

        menuToggle.addEventListener('click', () => {
            document.querySelector('.nav-menu')?.classList.toggle('mobile-open');
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    initAnimations() {
        // Observer pour animations d'entrée
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Observer les éléments avec animation
        document.querySelectorAll('.stat-card, .exercise-card, .badge-item').forEach(el => {
            observer.observe(el);
        });
    }

    checkDeviceType() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        
        document.body.classList.toggle('mobile', isMobile);
        document.body.classList.toggle('tablet', isTablet);
        document.body.classList.toggle('desktop', !isMobile && !isTablet);

        // Ajuster l'interface pour mobile
        if (isMobile) {
            document.querySelector('.menu-toggle')?.classList.remove('hidden');
        }
    }

    navigateToPage(page) {
        if (this.currentPage === page) return;

        // Animation de sortie
        const currentSection = document.getElementById(this.currentPage);
        if (currentSection) {
            currentSection.classList.add('page-exit');
            
            setTimeout(() => {
                currentSection.classList.remove('active', 'page-exit');
            }, 300);
        }

        // Animation d'entrée
        setTimeout(() => {
            const newSection = document.getElementById(page);
            if (newSection) {
                newSection.classList.add('active', 'page-enter');
                
                setTimeout(() => {
                    newSection.classList.remove('page-enter');
                }, 300);
            }

            // Mettre à jour la navigation
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.toggle('active', item.dataset.page === page);
            });

            this.currentPage = page;

            // Déclencher les événements de chargement de page
            this.triggerPageLoad(page);
        }, 300);
    }

    triggerPageLoad(page) {
        // Déclencher un événement personnalisé
        const event = new CustomEvent('pageLoaded', { detail: { page } });
        document.dispatchEvent(event);

        // Actions spécifiques par page
        switch(page) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'programme':
                this.loadProgramme();
                break;
            case 'historique':
                this.loadHistory();
                break;
            case 'guides':
                this.loadGuides();
                break;
            case 'profil':
                this.loadProfile();
                break;
        }
    }

    showLoading(message = 'Chargement...') {
        this.loadingCount++;
        
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.querySelector('p').textContent = message;
            loader.classList.remove('hidden');
        }
    }

    hideLoading() {
        this.loadingCount--;
        
        if (this.loadingCount <= 0) {
            this.loadingCount = 0;
            const loader = document.getElementById('loading-screen');
            if (loader) {
                setTimeout(() => {
                    loader.classList.add('hidden');
                }, 300);
            }
        }
    }

    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} show`;
        
        // Icône selon le type
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <span class="toast-message">${message}</span>
        `;
        
        // Style dynamique
        const colors = {
            success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            info: 'var(--gradient)'
        };
        
        toast.style.background = colors[type];
        
        document.body.appendChild(toast);
        
        // Animation d'entrée
        setTimeout(() => {
            toast.classList.add('toast-show');
        }, 10);
        
        // Retrait automatique
        setTimeout(() => {
            toast.classList.remove('toast-show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, duration);
    }

    showModal(content, options = {}) {
        const modal = document.getElementById('exercise-modal') || this.createModal();
        const modalContent = modal.querySelector('.modal-content');
        
        // Définir le contenu
        if (options.title) {
            modalContent.querySelector('h2').textContent = options.title;
        }
        
        const contentDiv = modalContent.querySelector('#modal-exercise-content') || 
                          modalContent.querySelector('.modal-body');
        if (contentDiv) {
            if (typeof content === 'string') {
                contentDiv.innerHTML = content;
            } else {
                contentDiv.innerHTML = '';
                contentDiv.appendChild(content);
            }
        }
        
        // Afficher le modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Ajouter à la pile
        this.modalStack.push(modal);
        
        return modal;
    }

    closeModal() {
        const modal = this.modalStack.pop() || document.querySelector('.modal.show');
        if (modal) {
            modal.classList.remove('show');
            
            if (this.modalStack.length === 0) {
                document.body.style.overflow = '';
            }
        }
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h2></h2>
                <div class="modal-body"></div>
            </div>
        `;
        
        modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        document.body.appendChild(modal);
        
        return modal;
    }

    updateStats(stats) {
        // Animer les changements de stats
        const updates = {
            'streak-count': stats.streak,
            'workout-count': stats.workoutCount,
            'level': stats.level,
            'badges-count': stats.badges.length
        };
        
        Object.entries(updates).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                // Animation de compteur
                if (typeof value === 'number' && id !== 'level') {
                    this.animateCounter(element, value);
                } else {
                    element.textContent = value;
                    element.classList.add('pulse-once');
                    setTimeout(() => element.classList.remove('pulse-once'), 600);
                }
            }
        });
    }

    animateCounter(element, targetValue) {
        const startValue = parseInt(element.textContent) || 0;
        const difference = targetValue - startValue;
        const duration = 1000;
        const steps = 30;
        const increment = difference / steps;
        let current = startValue;
        let step = 0;
        
        const interval = setInterval(() => {
            step++;
            current += increment;
            
            if (step >= steps) {
                element.textContent = targetValue;
                clearInterval(interval);
                element.classList.add('pulse-once');
                setTimeout(() => element.classList.remove('pulse-once'), 600);
            } else {
                element.textContent = Math.round(current);
            }
        }, duration / steps);
    }

    renderExerciseCard(exercise, index) {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        card.dataset.exerciseId = exercise.id;
        
        card.innerHTML = `
            <div class="exercise-checkbox" data-index="${index}">
                <span></span>
            </div>
            <div class="exercise-info">
                <div class="exercise-name">${exercise.name}</div>
                <div class="exercise-details">
                    ${exercise.sets} séries × ${exercise.reps} reps • Repos: ${exercise.rest}s
                </div>
                <div class="exercise-muscles">
                    ${exercise.muscles.map(m => `<span class="muscle-tag">${m}</span>`).join('')}
                </div>
            </div>
            <button class="exercise-timer" data-rest="${exercise.rest}">
                ⏱️ Timer
            </button>
        `;
        
        // Event listeners
        card.querySelector('.exercise-checkbox').addEventListener('click', function(e) {
            e.stopPropagation();
            this.innerHTML = this.innerHTML === '<span></span>' ? '✓' : '<span></span>';
            card.classList.toggle('completed');
            
            // Effet sonore
            if (window.userData?.preferences?.sound) {
                uiManager.playSound('complete');
            }
            
            // Vérifier si toute la séance est complète
            uiManager.checkWorkoutCompletion();
        });
        
        card.querySelector('.exercise-timer').addEventListener('click', (e) => {
            e.stopPropagation();
            startRestTimer(exercise.rest, () => {
                this.showToast('Repos terminé ! Prochaine série ! 💪', 'success');
            });
        });
        
        card.addEventListener('click', () => {
            this.showExerciseDetails(exercise);
        });
        
        return card;
    }

    showExerciseDetails(exercise) {
        const content = `
            <div class="exercise-detail-modal">
                <div class="exercise-gif">${exercise.gif || '🏋️'}</div>
                <h3>${exercise.name}</h3>
                
                <div class="exercise-stats">
                    <span>${exercise.sets} séries</span>
                    <span>${exercise.reps} répétitions</span>
                    <span>${exercise.rest}s repos</span>
                </div>
                
                <div class="exercise-muscles">
                    <h4>Muscles ciblés:</h4>
                    ${exercise.muscles.map(m => `<span class="muscle-tag">${m}</span>`).join('')}
                </div>
                
                <div class="exercise-description">
                    <h4>Description:</h4>
                    <p>${exercise.description}</p>
                </div>
                
                <div class="exercise-tips">
                    <h4>💡 Conseils:</h4>
                    <p>${exercise.tips}</p>
                </div>
                
                <div class="exercise-actions">
                    <button class="btn-like ${window.userData?.preferences?.likedExercises?.includes(exercise.id) ? 'active' : ''}" 
                            data-exercise-id="${exercise.id}">
                        👍 J'aime
                    </button>
                    <button class="btn-dislike ${window.userData?.preferences?.dislikedExercises?.includes(exercise.id) ? 'active' : ''}" 
                            data-exercise-id="${exercise.id}">
                        👎 Je n'aime pas
                    </button>
                </div>
            </div>
        `;
        
        this.showModal(content, { title: exercise.name });
        
        // Gérer les préférences
        document.querySelector('.btn-like')?.addEventListener('click', (e) => {
            const exerciseId = e.target.dataset.exerciseId;
            window.dataManager?.toggleExercisePreference(exerciseId, 'like');
            e.target.classList.toggle('active');
            document.querySelector('.btn-dislike').classList.remove('active');
        });
        
        document.querySelector('.btn-dislike')?.addEventListener('click', (e) => {
            const exerciseId = e.target.dataset.exerciseId;
            window.dataManager?.toggleExercisePreference(exerciseId, 'dislike');
            e.target.classList.toggle('active');
            document.querySelector('.btn-like').classList.remove('active');
        });
    }

    checkWorkoutCompletion() {
        const allExercises = document.querySelectorAll('.exercise-card');
        const completedExercises = document.querySelectorAll('.exercise-card.completed');
        
        if (allExercises.length > 0 && allExercises.length === completedExercises.length) {
            this.completeWorkout();
        }
        
        // Mise à jour de la barre de progression
        const progress = (completedExercises.length / allExercises.length) * 100;
        this.updateProgressBar(progress);
    }

    updateProgressBar(progress) {
        let progressBar = document.querySelector('.workout-progress');
        
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'workout-progress';
            progressBar.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <span class="progress-text">0%</span>
            `;
            document.querySelector('.today-workout')?.appendChild(progressBar);
        }
        
        const fill = progressBar.querySelector('.progress-fill');
        const text = progressBar.querySelector('.progress-text');
        
        if (fill && text) {
            fill.style.width = `${progress}%`;
            text.textContent = `${Math.round(progress)}%`;
            
            if (progress === 100) {
                fill.style.background = 'var(--success-color)';
            }
        }
    }

    async completeWorkout() {
        // Animation de célébration
        this.showCelebration();
        
        // Sons de victoire
        if (window.userData?.preferences?.sound) {
            this.playVictorySound();
        }
        
        // Message de félicitations
        this.showToast('🎉 Séance terminée ! Bravo champion !', 'success', 5000);
        
        // Mettre à jour les données
        if (window.dataManager) {
            const result = await window.dataManager.completeWorkout({
                date: new Date().toISOString(),
                exercises: this.getCompletedExercises()
            });
            
            // Afficher les nouveaux badges
            if (result.newBadges && result.newBadges.length > 0) {
                result.newBadges.forEach(badge => {
                    this.showBadgeUnlock(badge);
                });
            }
            
            // Afficher le level up
            if (result.levelUp) {
                this.showLevelUp(result.levelUp);
            }
        }
    }

    getCompletedExercises() {
        const exercises = [];
        document.querySelectorAll('.exercise-card.completed').forEach(card => {
            const name = card.querySelector('.exercise-name')?.textContent;
            const details = card.querySelector('.exercise-details')?.textContent;
            exercises.push({ name, details });
        });
        return exercises;
    }

    showCelebration() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration-overlay';
        celebration.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-emoji">🎉</div>
                <h1>Félicitations !</h1>
                <p>Tu as terminé ta séance !</p>
                <div class="confetti"></div>
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        // Créer des confettis
        for (let i = 0; i < 50; i++) {
            const confetto = document.createElement('div');
            confetto.className = 'confetto';
            confetto.style.left = Math.random() * 100 + '%';
            confetto.style.animationDelay = Math.random() * 3 + 's';
            confetto.style.backgroundColor = ['#6366f1', '#ec4899', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)];
            celebration.querySelector('.confetti').appendChild(confetto);
        }
        
        setTimeout(() => {
            celebration.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(celebration);
            }, 500);
        }, 3000);
    }

    showBadgeUnlock(badge) {
        setTimeout(() => {
            const badgeModal = document.createElement('div');
            badgeModal.className = 'badge-unlock-modal';
            badgeModal.innerHTML = `
                <div class="badge-unlock-content">
                    <h2>NOUVEAU BADGE DÉBLOQUÉ!</h2>
                    <div class="badge-unlock-icon">${badge.icon}</div>
                    <h3>${badge.name}</h3>
                    <p>${badge.description}</p>
                    <p class="badge-points">+${badge.points} points</p>
                </div>
            `;
            
            document.body.appendChild(badgeModal);
            
            setTimeout(() => {
                badgeModal.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                badgeModal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(badgeModal);
                }, 500);
            }, 4000);
        }, 1000);
    }

    showLevelUp(newLevel) {
        setTimeout(() => {
            const levelUpModal = document.createElement('div');
            levelUpModal.className = 'level-up-modal';
            levelUpModal.innerHTML = `
                <div class="level-up-content">
                    <h2>LEVEL UP!</h2>
                    <div class="level-up-icon">${newLevel.icon}</div>
                    <h3>Tu es maintenant ${newLevel.name}!</h3>
                    <div class="level-up-animation">⬆️</div>
                </div>
            `;
            
            document.body.appendChild(levelUpModal);
            
            setTimeout(() => {
                levelUpModal.classList.add('show');
                this.playSound('levelup');
            }, 100);
            
            setTimeout(() => {
                levelUpModal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(levelUpModal);
                }, 500);
            }, 4000);
        }, 2000);
    }

    playSound(type) {
        if (!window.userData?.preferences?.sound) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'complete':
                oscillator.frequency.value = 523.25;
                gainNode.gain.value = 0.3;
                break;
            case 'levelup':
                // Son ascendant
                oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(523.25, audioContext.currentTime + 0.5);
                gainNode.gain.value = 0.4;
                break;
        }
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    playVictorySound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [523.25, 659.25, 783.99, 1046.5]; // Do, Mi, Sol, Do octave
        
        notes.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                gainNode.gain.value = 0.3;
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
            }, index * 150);
        });
    }

    // Méthodes de chargement spécifiques aux pages
    loadDashboard() {
        // Sera implémenté dans app.js
    }

    loadProgramme() {
        // Sera implémenté dans app.js
    }

    loadHistory() {
        // Sera implémenté dans app.js
    }

    loadGuides() {
        // Sera implémenté dans app.js
    }

    loadProfile() {
        // Sera implémenté dans app.js
    }
}

// Créer une instance globale
const uiManager = new UIManager();

// Initialiser après le chargement du DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => uiManager.init());
} else {
    uiManager.init();
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { uiManager, UIManager };
}
