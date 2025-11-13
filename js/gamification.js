// Système de gamification complet

// Citations motivantes
const motivationalQuotes = [
    "Chaque répétition te rapproche de ton summer body ! 💪",
    "La douleur d'aujourd'hui est la force de demain ! 🔥",
    "Les champions s'entraînent, les légendes s'acharnent ! ⚡",
    "Ton seul adversaire, c'est toi d'hier ! 🎯",
    "Le muscle se construit dans l'effort, pas dans le confort ! 💯",
    "Transforme ta sueur en sourire ! 😤",
    "Chaque séance est une victoire sur ta flemme ! 🏆",
    "Tes muscles te remercieront cet été ! ☀️",
    "La régularité bat le talent ! 📈",
    "Pousse tes limites, elles reculeront ! 🚀",
    "Le summer body se construit en hiver ! ❄️",
    "Sois plus fort que tes excuses ! 💥",
    "La transformation commence dans ta tête ! 🧠",
    "Chaque goutte de sueur est un investissement ! 💎",
    "Les résultats parlent plus fort que les mots ! 📢",
    "Tu es à une séance de la bonne humeur ! 😊",
    "Le muscle n'attend pas, il se construit ! 🏗️",
    "Ton corps peut, c'est ton esprit qu'il faut convaincre ! 🎭",
    "La douleur est temporaire, la fierté est éternelle ! 👑",
    "Ne compte pas les jours, fais que les jours comptent ! 📅",
    "Chaque série te rapproche de ta meilleure version ! 🦋",
    "Les excuses ne brûlent pas de calories ! 🔥",
    "Ton futur toi te remercie déjà ! 🙏",
    "La constance crée les physiques d'exception ! 🌟",
    "Sois ta propre motivation ! 🚀"
];

// Système de badges
const badges = [
    {
        id: 'first_workout',
        name: 'Première Sueur',
        icon: '🎯',
        description: 'Tu as complété ta première séance !',
        condition: (stats) => stats.workoutCount >= 1,
        points: 10
    },
    {
        id: 'week_warrior',
        name: 'Guerrier du Weekend',
        icon: '⚔️',
        description: 'Samedi ET dimanche complétés !',
        condition: (stats) => stats.weekendComplete >= 1,
        points: 20
    },
    {
        id: 'consistency_bronze',
        name: 'Régularité Bronze',
        icon: '🥉',
        description: '1 semaine de suite',
        condition: (stats) => stats.streak >= 7,
        points: 30
    },
    {
        id: 'consistency_silver',
        name: 'Régularité Argent',
        icon: '🥈',
        description: '2 semaines de suite',
        condition: (stats) => stats.streak >= 14,
        points: 50
    },
    {
        id: 'consistency_gold',
        name: 'Régularité Or',
        icon: '🥇',
        description: '4 semaines de suite',
        condition: (stats) => stats.streak >= 28,
        points: 100
    },
    {
        id: 'phase1_complete',
        name: 'Fondations Solides',
        icon: '🏗️',
        description: 'Phase 1 terminée !',
        condition: (stats) => stats.phasesCompleted >= 1,
        points: 75
    },
    {
        id: 'phase2_complete',
        name: 'En Développement',
        icon: '📈',
        description: 'Phase 2 terminée !',
        condition: (stats) => stats.phasesCompleted >= 2,
        points: 100
    },
    {
        id: 'phase3_complete',
        name: 'Intensité Maximale',
        icon: '🔥',
        description: 'Phase 3 terminée !',
        condition: (stats) => stats.phasesCompleted >= 3,
        points: 150
    },
    {
        id: 'muscle_apprentice',
        name: 'Apprenti Muscle',
        icon: '💪',
        description: '5 séances complétées',
        condition: (stats) => stats.workoutCount >= 5,
        points: 25
    },
    {
        id: 'muscle_builder',
        name: 'Constructeur',
        icon: '🏋️',
        description: '10 séances complétées',
        condition: (stats) => stats.workoutCount >= 10,
        points: 40
    },
    {
        id: 'muscle_master',
        name: 'Maître du Muscle',
        icon: '👨‍🏫',
        description: '20 séances complétées',
        condition: (stats) => stats.workoutCount >= 20,
        points: 60
    },
    {
        id: 'dedication',
        name: 'Dédication',
        icon: '🎖️',
        description: '30 séances complétées',
        condition: (stats) => stats.workoutCount >= 30,
        points: 80
    },
    {
        id: 'transformer',
        name: 'Transformation',
        icon: '🦋',
        description: '40 séances complétées',
        condition: (stats) => stats.workoutCount >= 40,
        points: 120
    },
    {
        id: 'legend',
        name: 'Légende Vivante',
        icon: '👑',
        description: '50 séances complétées !',
        condition: (stats) => stats.workoutCount >= 50,
        points: 200
    },
    {
        id: 'iron_will',
        name: 'Volonté de Fer',
        icon: '🛡️',
        description: 'Jamais raté une séance en 1 mois',
        condition: (stats) => stats.perfectMonth >= 1,
        points: 150
    },
    {
        id: 'summer_ready',
        name: 'Summer Body Activé',
        icon: '☀️',
        description: 'Programme complet terminé !',
        condition: (stats) => stats.programComplete === true,
        points: 300
    },
    {
        id: 'early_bird',
        name: 'Lève-tôt',
        icon: '🌅',
        description: 'Séance avant 8h du matin',
        condition: (stats) => stats.earlyWorkout >= 1,
        points: 15
    },
    {
        id: 'night_owl',
        name: 'Noctambule',
        icon: '🦉',
        description: 'Séance après 20h',
        condition: (stats) => stats.lateWorkout >= 1,
        points: 15
    },
    {
        id: 'perfect_form',
        name: 'Forme Parfaite',
        icon: '✨',
        description: 'Toutes les séries d\'une séance parfaites',
        condition: (stats) => stats.perfectWorkout >= 1,
        points: 35
    },
    {
        id: 'comeback_kid',
        name: 'Retour Gagnant',
        icon: '🔄',
        description: 'Reprise après 3 jours de repos',
        condition: (stats) => stats.comebacks >= 1,
        points: 20
    },
    {
        id: 'pump_master',
        name: 'Roi de la Congestion',
        icon: '💢',
        description: '100 pompes en une séance',
        condition: (stats) => stats.hundredPushups >= 1,
        points: 45
    },
    {
        id: 'plank_warrior',
        name: 'Guerrier de la Planche',
        icon: '📏',
        description: 'Gainage 2 minutes d\'affilée',
        condition: (stats) => stats.plank2min >= 1,
        points: 40
    },
    {
        id: 'bicep_peak',
        name: 'Pic du Biceps',
        icon: '🏔️',
        description: '500 curls au total',
        condition: (stats) => stats.totalCurls >= 500,
        points: 55
    },
    {
        id: 'tricep_horseshoe',
        name: 'Fer à Cheval',
        icon: '🐴',
        description: 'Triceps bien développés - 20 séances bras',
        condition: (stats) => stats.armWorkouts >= 20,
        points: 50
    }
];

// Niveaux de progression
const levels = [
    { name: 'Débutant', minPoints: 0, icon: '🌱' },
    { name: 'Novice', minPoints: 50, icon: '🌿' },
    { name: 'Apprenti', minPoints: 100, icon: '🪴' },
    { name: 'Confirmé', minPoints: 200, icon: '🌳' },
    { name: 'Expert', minPoints: 350, icon: '💪' },
    { name: 'Maître', minPoints: 500, icon: '🏆' },
    { name: 'Champion', minPoints: 750, icon: '🥇' },
    { name: 'Légende', minPoints: 1000, icon: '👑' },
    { name: 'Titan', minPoints: 1500, icon: '⚡' },
    { name: 'Dieu Grec', minPoints: 2000, icon: '🏛️' }
];

// Défis hebdomadaires
const weeklyChallenges = [
    {
        id: 'week1',
        name: 'Première Semaine',
        description: 'Complete les 2 séances du weekend',
        reward: 25,
        icon: '🎯'
    },
    {
        id: 'pump_challenge',
        name: 'Défi Pompes',
        description: 'Fais 200 pompes cette semaine',
        reward: 30,
        icon: '🏋️'
    },
    {
        id: 'plank_challenge',
        name: 'Défi Gainage',
        description: 'Accumule 10 minutes de gainage',
        reward: 30,
        icon: '📏'
    },
    {
        id: 'perfect_week',
        name: 'Semaine Parfaite',
        description: 'Ne rate aucune séance',
        reward: 40,
        icon: '💯'
    },
    {
        id: 'intensity_week',
        name: 'Semaine Intensive',
        description: 'Ajoute 1 série à chaque exercice',
        reward: 35,
        icon: '🔥'
    }
];

// Messages de félicitations
const congratulationMessages = {
    workoutComplete: [
        "Bravo champion ! Séance terminée ! 🎉",
        "Tu déchires ! Encore une séance dans la poche ! 💪",
        "Excellent travail ! Tes muscles te remercient ! 🔥",
        "Mission accomplie ! Tu es sur la bonne voie ! 🚀",
        "Quelle séance ! Tu progresses à vue d'œil ! 📈"
    ],
    newBadge: [
        "NOUVEAU BADGE DÉBLOQUÉ ! 🏆",
        "Félicitations ! Tu as gagné un badge ! 🎖️",
        "Achievement unlocked ! Nouveau badge ! 🌟",
        "Bravo ! Un badge de plus dans ta collection ! 💎",
        "Légendaire ! Tu as débloqué un nouveau badge ! 👑"
    ],
    levelUp: [
        "LEVEL UP ! Tu passes au niveau supérieur ! ⬆️",
        "Évolution ! Tu montes de niveau ! 🎮",
        "Progression ! Nouveau niveau atteint ! 📊",
        "Tu évolues ! Niveau supérieur débloqué ! 🆙",
        "Transformation en cours ! Nouveau niveau ! 🦋"
    ],
    streakMilestone: [
        "Série en cours ! Continue comme ça ! 🔥",
        "Quelle régularité ! Tu es inarrêtable ! ⚡",
        "Constance payante ! Ta série continue ! 📅",
        "Machine de guerre ! Rien ne t'arrête ! 🚂",
        "Discipline de fer ! Ta série impressionne ! 💪"
    ]
};

// Fonctions de gamification
function getRandomMotivation() {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}

function checkBadges(userStats) {
    const unlockedBadges = [];
    badges.forEach(badge => {
        if (!userStats.badges.includes(badge.id) && badge.condition(userStats)) {
            unlockedBadges.push(badge);
            userStats.badges.push(badge.id);
            userStats.totalPoints = (userStats.totalPoints || 0) + badge.points;
        }
    });
    return unlockedBadges;
}

function getCurrentLevel(totalPoints) {
    for (let i = levels.length - 1; i >= 0; i--) {
        if (totalPoints >= levels[i].minPoints) {
            return levels[i];
        }
    }
    return levels[0];
}

function getNextLevel(totalPoints) {
    const currentLevel = getCurrentLevel(totalPoints);
    const currentIndex = levels.findIndex(l => l.name === currentLevel.name);
    if (currentIndex < levels.length - 1) {
        return levels[currentIndex + 1];
    }
    return null;
}

function getLevelProgress(totalPoints) {
    const currentLevel = getCurrentLevel(totalPoints);
    const nextLevel = getNextLevel(totalPoints);
    
    if (!nextLevel) return 100;
    
    const currentMin = currentLevel.minPoints;
    const nextMin = nextLevel.minPoints;
    const progress = ((totalPoints - currentMin) / (nextMin - currentMin)) * 100;
    
    return Math.min(100, Math.max(0, progress));
}

function getRandomCongratulation(type) {
    const messages = congratulationMessages[type];
    return messages[Math.floor(Math.random() * messages.length)];
}

function calculateStreak(workoutHistory) {
    if (!workoutHistory || workoutHistory.length === 0) return 0;
    
    const sortedHistory = workoutHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 0;
    let lastDate = new Date();
    
    for (const workout of sortedHistory) {
        const workoutDate = new Date(workout.date);
        const daysDiff = Math.floor((lastDate - workoutDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff <= 1) {
            streak++;
            lastDate = workoutDate;
        } else {
            break;
        }
    }
    
    return streak;
}

function getWeeklyChallenge() {
    const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % weeklyChallenges.length;
    return weeklyChallenges[weekNumber];
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        motivationalQuotes,
        badges,
        levels,
        weeklyChallenges,
        congratulationMessages,
        getRandomMotivation,
        checkBadges,
        getCurrentLevel,
        getNextLevel,
        getLevelProgress,
        getRandomCongratulation,
        calculateStreak,
        getWeeklyChallenge
    };
}
