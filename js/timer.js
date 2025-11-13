// Système de chronométrage et timer

class Timer {
    constructor() {
        this.minutes = 0;
        this.seconds = 0;
        this.totalSeconds = 0;
        this.interval = null;
        this.isRunning = false;
        this.isPaused = false;
        this.mode = 'workout'; // 'workout' ou 'rest'
        this.targetTime = null;
        this.onComplete = null;
        this.onTick = null;
        this.soundEnabled = true;
        
        // Éléments DOM
        this.displayElement = null;
        this.minutesElement = null;
        this.secondsElement = null;
        this.playBtn = null;
        this.pauseBtn = null;
        this.resetBtn = null;
        this.container = null;
    }
    
    init(elements) {
        this.displayElement = elements.display;
        this.minutesElement = elements.minutes;
        this.secondsElement = elements.seconds;
        this.playBtn = elements.playBtn;
        this.pauseBtn = elements.pauseBtn;
        this.resetBtn = elements.resetBtn;
        this.container = elements.container;
        
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    setupEventListeners() {
        if (this.playBtn) {
            this.playBtn.addEventListener('click', () => this.start());
        }
        if (this.pauseBtn) {
            this.pauseBtn.addEventListener('click', () => this.pause());
        }
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.reset());
        }
    }
    
    start(targetSeconds = null, mode = 'workout') {
        if (this.isRunning && !this.isPaused) return;
        
        this.mode = mode;
        if (targetSeconds !== null) {
            this.targetTime = targetSeconds;
            this.totalSeconds = targetSeconds;
            this.minutes = Math.floor(targetSeconds / 60);
            this.seconds = targetSeconds % 60;
        }
        
        this.isRunning = true;
        this.isPaused = false;
        
        if (this.container) {
            this.container.classList.remove('hidden');
        }
        
        this.updateDisplay();
        this.updateButtons();
        
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
        
        if (this.soundEnabled) {
            this.playSound('start');
        }
    }
    
    pause() {
        if (!this.isRunning || this.isPaused) return;
        
        this.isPaused = true;
        clearInterval(this.interval);
        this.updateButtons();
        
        if (this.soundEnabled) {
            this.playSound('pause');
        }
    }
    
    resume() {
        if (!this.isRunning || !this.isPaused) return;
        
        this.isPaused = false;
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
        this.updateButtons();
    }
    
    stop() {
        this.isRunning = false;
        this.isPaused = false;
        clearInterval(this.interval);
        this.updateButtons();
        
        if (this.container) {
            this.container.classList.add('hidden');
        }
    }
    
    reset() {
        this.stop();
        this.minutes = 0;
        this.seconds = 0;
        this.totalSeconds = 0;
        this.targetTime = null;
        this.updateDisplay();
        
        if (this.soundEnabled) {
            this.playSound('reset');
        }
    }
    
    tick() {
        if (this.mode === 'rest' && this.targetTime !== null) {
            // Mode repos - compte à rebours
            this.totalSeconds--;
            
            if (this.totalSeconds <= 0) {
                this.complete();
                return;
            }
            
            // Sons d'alerte
            if (this.totalSeconds === 10 && this.soundEnabled) {
                this.playSound('warning');
            } else if (this.totalSeconds <= 3 && this.totalSeconds > 0 && this.soundEnabled) {
                this.playSound('countdown');
            }
            
            this.minutes = Math.floor(this.totalSeconds / 60);
            this.seconds = this.totalSeconds % 60;
        } else {
            // Mode workout - chronomètre normal
            this.totalSeconds++;
            this.seconds++;
            
            if (this.seconds >= 60) {
                this.seconds = 0;
                this.minutes++;
            }
        }
        
        this.updateDisplay();
        
        if (this.onTick) {
            this.onTick(this.totalSeconds);
        }
    }
    
    complete() {
        this.stop();
        
        if (this.soundEnabled) {
            this.playSound('complete');
        }
        
        if (this.onComplete) {
            this.onComplete();
        }
        
        // Animation de fin
        if (this.container) {
            this.container.classList.add('pulse-animation');
            setTimeout(() => {
                this.container.classList.remove('pulse-animation');
                this.container.classList.add('hidden');
            }, 2000);
        }
        
        this.showNotification('Temps de repos terminé ! Prochaine série ! 💪');
    }
    
    updateDisplay() {
        const formattedMinutes = String(this.minutes).padStart(2, '0');
        const formattedSeconds = String(this.seconds).padStart(2, '0');
        
        if (this.minutesElement && this.secondsElement) {
            this.minutesElement.textContent = formattedMinutes;
            this.secondsElement.textContent = formattedSeconds;
        }
        
        if (this.displayElement) {
            this.displayElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
        }
        
        // Mise à jour du titre de la page
        if (this.isRunning) {
            document.title = `${formattedMinutes}:${formattedSeconds} - Coachy`;
        }
        
        // Changement de couleur selon le temps restant (mode repos)
        if (this.mode === 'rest' && this.container) {
            if (this.totalSeconds <= 10) {
                this.container.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            } else if (this.totalSeconds <= 30) {
                this.container.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
            } else {
                this.container.style.background = 'var(--gradient)';
            }
        }
    }
    
    updateButtons() {
        if (this.playBtn && this.pauseBtn) {
            if (this.isRunning && !this.isPaused) {
                this.playBtn.style.display = 'none';
                this.pauseBtn.style.display = 'flex';
            } else {
                this.playBtn.style.display = 'flex';
                this.pauseBtn.style.display = 'none';
            }
        }
    }
    
    setRestTimer(seconds) {
        this.reset();
        this.start(seconds, 'rest');
    }
    
    setWorkoutTimer() {
        this.reset();
        this.start(null, 'workout');
    }
    
    playSound(type) {
        if (!this.soundEnabled) return;
        
        // Créer des sons avec l'API Web Audio pour éviter les fichiers externes
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch (type) {
            case 'start':
                oscillator.frequency.value = 523.25; // Do
                gainNode.gain.value = 0.3;
                break;
            case 'pause':
                oscillator.frequency.value = 392; // Sol
                gainNode.gain.value = 0.2;
                break;
            case 'reset':
                oscillator.frequency.value = 440; // La
                gainNode.gain.value = 0.2;
                break;
            case 'warning':
                oscillator.frequency.value = 659.25; // Mi
                gainNode.gain.value = 0.4;
                break;
            case 'countdown':
                oscillator.frequency.value = 880; // La aigu
                gainNode.gain.value = 0.5;
                break;
            case 'complete':
                // Son de victoire
                oscillator.frequency.value = 784; // Sol aigu
                gainNode.gain.value = 0.6;
                setTimeout(() => {
                    oscillator.frequency.value = 1046.5; // Do aigu
                }, 100);
                setTimeout(() => {
                    oscillator.frequency.value = 1318.5; // Mi aigu
                }, 200);
                break;
        }
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
    }
    
    showNotification(message) {
        // Créer une notification toast
        const toast = document.createElement('div');
        toast.className = 'timer-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--gradient);
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            animation: slideUp 0.3s ease;
            font-weight: 600;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    getFormattedTime() {
        return `${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`;
    }
    
    getTotalSeconds() {
        return this.totalSeconds;
    }
    
    setSoundEnabled(enabled) {
        this.soundEnabled = enabled;
    }
}

// Instance globale du timer
const globalTimer = new Timer();

// Fonctions helper pour les temps de repos entre séries
const restTimers = {
    short: 30,
    medium: 45,
    long: 60,
    veryLong: 90
};

function startRestTimer(seconds, onComplete) {
    globalTimer.setRestTimer(seconds);
    globalTimer.onComplete = onComplete;
}

function startWorkoutTimer(onTick) {
    globalTimer.setWorkoutTimer();
    globalTimer.onTick = onTick;
}

function stopTimer() {
    globalTimer.stop();
}

function pauseTimer() {
    globalTimer.pause();
}

function resumeTimer() {
    globalTimer.resume();
}

function resetTimer() {
    globalTimer.reset();
}

// Chronomètre de séance complète
class SessionTimer {
    constructor() {
        this.startTime = null;
        this.endTime = null;
        this.pausedTime = 0;
        this.pauseStart = null;
    }
    
    start() {
        this.startTime = Date.now();
        this.pausedTime = 0;
    }
    
    pause() {
        if (!this.pauseStart) {
            this.pauseStart = Date.now();
        }
    }
    
    resume() {
        if (this.pauseStart) {
            this.pausedTime += Date.now() - this.pauseStart;
            this.pauseStart = null;
        }
    }
    
    stop() {
        this.endTime = Date.now();
        return this.getDuration();
    }
    
    getDuration() {
        if (!this.startTime) return 0;
        
        const end = this.endTime || Date.now();
        const totalTime = end - this.startTime - this.pausedTime;
        
        return Math.floor(totalTime / 1000); // Retour en secondes
    }
    
    getFormattedDuration() {
        const seconds = this.getDuration();
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}min ${secs}s`;
        } else if (minutes > 0) {
            return `${minutes}min ${secs}s`;
        } else {
            return `${secs}s`;
        }
    }
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Timer,
        SessionTimer,
        globalTimer,
        restTimers,
        startRestTimer,
        startWorkoutTimer,
        stopTimer,
        pauseTimer,
        resumeTimer,
        resetTimer
    };
}
