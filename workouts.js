// Programme d'entraînement complet - Phase 1, 2 et 3
const workoutProgram = {
    phase1: {
        name: "Fondations",
        weeks: 4,
        description: "Construction des bases musculaires et apprentissage des mouvements",
        workouts: {
            samedi: [
                {
                    id: "p1-s1",
                    name: "Pompes classiques",
                    sets: 3,
                    reps: "8-10",
                    rest: 60,
                    muscles: ["Pectoraux", "Triceps", "Épaules avant"],
                    description: "Mains écartées largeur épaules, descendre lentement jusqu'à effleurer le sol",
                    tips: "Garde le corps bien droit comme une planche, contracte les abdos tout le long",
                    difficulty: 1,
                    gif: "🏋️"
                },
                {
                    id: "p1-s2",
                    name: "Pompes diamant",
                    sets: 3,
                    reps: "6-8",
                    rest: 60,
                    muscles: ["Triceps", "Pectoraux internes"],
                    description: "Mains en forme de diamant sous la poitrine, coudes près du corps",
                    tips: "Si trop difficile, commence sur les genoux et progresse",
                    difficulty: 2,
                    gif: "💎"
                },
                {
                    id: "p1-s3",
                    name: "Développé couché haltères",
                    sets: 3,
                    reps: "12-15",
                    rest: 60,
                    muscles: ["Pectoraux", "Triceps"],
                    description: "Allongé sur le dos, haltères de 2.5kg dans chaque main, descendre sur les côtés",
                    tips: "Descends jusqu'à sentir un bon étirement des pecs, remonte en contractant",
                    difficulty: 1,
                    gif: "🏋️‍♂️"
                },
                {
                    id: "p1-s4",
                    name: "Écartés couchés",
                    sets: 3,
                    reps: "10-12",
                    rest: 45,
                    muscles: ["Pectoraux"],
                    description: "Allongé, bras légèrement fléchis, écarter les haltères sur les côtés",
                    tips: "Imagine que tu enlaces un gros arbre, garde une légère flexion des coudes",
                    difficulty: 1,
                    gif: "🦅"
                },
                {
                    id: "p1-s5",
                    name: "Curl biceps classique",
                    sets: 3,
                    reps: "12-15",
                    rest: 45,
                    muscles: ["Biceps"],
                    description: "Debout, haltères de 2.5kg, rotation du poignet en montant",
                    tips: "Ne balance pas le corps, isole bien le biceps, serre fort en haut",
                    difficulty: 1,
                    gif: "💪"
                },
                {
                    id: "p1-s6",
                    name: "Gainage frontal",
                    sets: 3,
                    reps: "30-45 sec",
                    rest: 30,
                    muscles: ["Abdominaux", "Core"],
                    description: "Position planche sur les coudes, corps aligné",
                    tips: "Respire normalement, imagine que tu essaies de rapprocher tes coudes de tes pieds",
                    difficulty: 1,
                    gif: "📏"
                },
                {
                    id: "p1-s7",
                    name: "Crunch abdominaux",
                    sets: 3,
                    reps: "15-20",
                    rest: 30,
                    muscles: ["Abdominaux supérieurs"],
                    description: "Allongé, mains derrière la tête, relever le buste de 30°",
                    tips: "Ne tire pas sur la nuque, contracte les abdos comme si on allait te frapper",
                    difficulty: 1,
                    gif: "🎯"
                }
            ],
            dimanche: [
                {
                    id: "p1-d1",
                    name: "Dips entre chaises",
                    sets: 3,
                    reps: "8-10",
                    rest: 60,
                    muscles: ["Triceps", "Pectoraux bas", "Épaules"],
                    description: "Entre 2 chaises stables, descendre et remonter avec contrôle",
                    tips: "Penche-toi légèrement en avant pour cibler plus les pecs, reste droit pour les triceps",
                    difficulty: 2,
                    gif: "🪑"
                },
                {
                    id: "p1-d2",
                    name: "Extensions triceps",
                    sets: 3,
                    reps: "12-15",
                    rest: 45,
                    muscles: ["Triceps"],
                    description: "Haltère tenue à deux mains au-dessus de la tête, fléchir les coudes",
                    tips: "Garde les coudes fixes et serrés, seuls les avant-bras bougent",
                    difficulty: 1,
                    gif: "🙌"
                },
                {
                    id: "p1-d3",
                    name: "Élévations latérales",
                    sets: 3,
                    reps: "12-15",
                    rest: 45,
                    muscles: ["Épaules latérales"],
                    description: "Debout, lever les haltères sur les côtés jusqu'à hauteur d'épaules",
                    tips: "Monte jusqu'à l'horizontale, imagine verser de l'eau de deux bouteilles",
                    difficulty: 1,
                    gif: "🦅"
                },
                {
                    id: "p1-d4",
                    name: "Élévations frontales",
                    sets: 3,
                    reps: "10-12",
                    rest: 45,
                    muscles: ["Épaules avant"],
                    description: "Lever les haltères devant soi alternativement",
                    tips: "Contrôle la descente, ne balance pas, monte jusqu'aux yeux",
                    difficulty: 1,
                    gif: "🏋️"
                },
                {
                    id: "p1-d5",
                    name: "Curl marteau",
                    sets: 3,
                    reps: "12-15",
                    rest: 45,
                    muscles: ["Biceps", "Avant-bras"],
                    description: "Haltères en prise neutre (marteau), monter sans rotation",
                    tips: "Parfait pour développer le brachial et donner de l'épaisseur au bras",
                    difficulty: 1,
                    gif: "🔨"
                },
                {
                    id: "p1-d6",
                    name: "Relevés de jambes",
                    sets: 3,
                    reps: "10-15",
                    rest: 45,
                    muscles: ["Abdominaux inférieurs"],
                    description: "Allongé sur le dos, lever les jambes tendues à 90°",
                    tips: "Contrôle bien la descente, ne laisse pas tes pieds toucher le sol",
                    difficulty: 2,
                    gif: "🦵"
                },
                {
                    id: "p1-d7",
                    name: "Russian twists",
                    sets: 3,
                    reps: "20-30",
                    rest: 30,
                    muscles: ["Obliques", "Core"],
                    description: "Assis, pieds décollés, rotation du buste de gauche à droite",
                    tips: "Tiens une haltère pour plus de difficulté, garde le dos droit",
                    difficulty: 2,
                    gif: "🌀"
                }
            ]
        }
    },
    phase2: {
        name: "Développement musculaire",
        weeks: 4,
        description: "Augmentation du volume et de l'intensité, techniques avancées",
        workouts: {
            samedi: [
                {
                    id: "p2-s1",
                    name: "Pompes déclinées",
                    sets: 4,
                    reps: "10-12",
                    rest: 60,
                    muscles: ["Pectoraux supérieurs", "Épaules"],
                    description: "Pieds surélevés sur une chaise, mains au sol",
                    tips: "Plus les pieds sont hauts, plus c'est difficile - commence avec 30cm de hauteur",
                    difficulty: 3,
                    gif: "📐"
                },
                {
                    id: "p2-s2",
                    name: "Pompes larges",
                    sets: 4,
                    reps: "10-12",
                    rest: 60,
                    muscles: ["Pectoraux externes"],
                    description: "Mains écartées 1.5x largeur d'épaules",
                    tips: "Descends jusqu'à effleurer le sol avec la poitrine, explose à la montée",
                    difficulty: 2,
                    gif: "🏋️"
                },
                {
                    id: "p2-s3",
                    name: "Pull-over",
                    sets: 3,
                    reps: "12-15",
                    rest: 60,
                    muscles: ["Pectoraux", "Dorsaux", "Triceps"],
                    description: "Allongé, haltère tenue à deux mains, descendre derrière la tête",
                    tips: "Garde une légère flexion des coudes, sens l'étirement dans la poitrine",
                    difficulty: 2,
                    gif: "🎿"
                },
                {
                    id: "p2-s4",
                    name: "Pompes archer",
                    sets: 3,
                    reps: "6-8 par côté",
                    rest: 75,
                    muscles: ["Pectoraux", "Triceps"],
                    description: "Pompe en déplaçant le poids sur un bras",
                    tips: "Progression vers les pompes à un bras, garde l'autre bras tendu sur le côté",
                    difficulty: 4,
                    gif: "🏹"
                },
                {
                    id: "p2-s5",
                    name: "Curl concentré",
                    sets: 4,
                    reps: "10-12",
                    rest: 45,
                    muscles: ["Biceps"],
                    description: "Assis, coude appuyé sur l'intérieur de la cuisse",
                    tips: "Concentration maximale sur le muscle, serre fort en haut 2 secondes",
                    difficulty: 2,
                    gif: "🎯"
                },
                {
                    id: "p2-s6",
                    name: "21s biceps",
                    sets: 2,
                    reps: "21 (7+7+7)",
                    rest: 60,
                    muscles: ["Biceps"],
                    description: "7 reps moitié basse, 7 moitié haute, 7 complètes",
                    tips: "Technique de torture pour une congestion maximale, réduis le poids si nécessaire",
                    difficulty: 3,
                    gif: "🔥"
                },
                {
                    id: "p2-s7",
                    name: "Planche latérale",
                    sets: 3,
                    reps: "30-45 sec/côté",
                    rest: 30,
                    muscles: ["Obliques", "Core"],
                    description: "Sur le côté, corps parfaitement aligné",
                    tips: "Contracte les fessiers et les obliques, lève le bras libre pour plus de difficulté",
                    difficulty: 2,
                    gif: "📐"
                },
                {
                    id: "p2-s8",
                    name: "Mountain climbers",
                    sets: 3,
                    reps: "20-30",
                    rest: 45,
                    muscles: ["Abdominaux", "Cardio"],
                    description: "Position planche, ramener les genoux alternativement",
                    tips: "Rythme rapide pour le cardio, garde les hanches basses",
                    difficulty: 2,
                    gif: "🏃"
                }
            ],
            dimanche: [
                {
                    id: "p2-d1",
                    name: "Pompes prise serrée",
                    sets: 4,
                    reps: "10-12",
                    rest: 60,
                    muscles: ["Triceps", "Pectoraux internes"],
                    description: "Mains rapprochées sous la poitrine, coudes le long du corps",
                    tips: "Focus maximum sur les triceps, descends lentement",
                    difficulty: 2,
                    gif: "💎"
                },
                {
                    id: "p2-d2",
                    name: "Kickback triceps",
                    sets: 3,
                    reps: "12-15",
                    rest: 45,
                    muscles: ["Triceps"],
                    description: "Penché en avant, extension du bras vers l'arrière",
                    tips: "Garde le coude fixe et haut, serre fort en extension complète",
                    difficulty: 1,
                    gif: "🦵"
                },
                {
                    id: "p2-d3",
                    name: "Développé militaire",
                    sets: 4,
                    reps: "10-12",
                    rest: 60,
                    muscles: ["Épaules", "Triceps"],
                    description: "Debout, pousser les haltères au-dessus de la tête",
                    tips: "Garde le core engagé pour protéger le dos, contrôle la descente",
                    difficulty: 2,
                    gif: "🚀"
                },
                {
                    id: "p2-d4",
                    name: "Arnold press",
                    sets: 3,
                    reps: "10-12",
                    rest: 60,
                    muscles: ["Épaules complètes"],
                    description: "Développé avec rotation des haltères",
                    tips: "Commence paumes vers toi, finis paumes vers l'avant",
                    difficulty: 3,
                    gif: "💪"
                },
                {
                    id: "p2-d5",
                    name: "Rowing haltères",
                    sets: 3,
                    reps: "12-15",
                    rest: 60,
                    muscles: ["Dorsaux", "Biceps", "Arrière épaules"],
                    description: "Penché à 45°, tirer les haltères vers le ventre",
                    tips: "Serre les omoplates en haut, imagine pincer un crayon entre elles",
                    difficulty: 2,
                    gif: "🚣"
                },
                {
                    id: "p2-d6",
                    name: "Curl inversé",
                    sets: 3,
                    reps: "12-15",
                    rest: 45,
                    muscles: ["Avant-bras", "Biceps"],
                    description: "Prise pronation (paumes vers le bas)",
                    tips: "Excellent pour les avant-bras et le brachial, monte jusqu'aux épaules",
                    difficulty: 2,
                    gif: "🔄"
                },
                {
                    id: "p2-d7",
                    name: "Bicycle crunch",
                    sets: 3,
                    reps: "20-30",
                    rest: 30,
                    muscles: ["Abdominaux", "Obliques"],
                    description: "Allongé, pédaler en touchant coude-genou opposé",
                    tips: "Ne tire pas sur la nuque, rotation du buste pas juste des épaules",
                    difficulty: 2,
                    gif: "🚴"
                },
                {
                    id: "p2-d8",
                    name: "Hollow hold",
                    sets: 3,
                    reps: "20-30 sec",
                    rest: 45,
                    muscles: ["Core complet"],
                    description: "Allongé, bras et jambes légèrement décollés",
                    tips: "Plaque bien le bas du dos au sol, respire normalement",
                    difficulty: 3,
                    gif: "🌙"
                }
            ]
        }
    },
    phase3: {
        name: "Intensification maximale",
        weeks: 4,
        description: "Techniques d'intensification, supersets, volume maximal",
        workouts: {
            samedi: [
                {
                    id: "p3-s1",
                    name: "Superset pompes",
                    sets: 4,
                    reps: "Max + Max",
                    rest: 90,
                    muscles: ["Pectoraux", "Triceps"],
                    description: "Enchaîner pompes normales jusqu'à l'échec + pompes genoux",
                    tips: "Jusqu'à l'échec musculaire total, brûlure garantie",
                    difficulty: 4,
                    gif: "🔥"
                },
                {
                    id: "p3-s2",
                    name: "Pompes explosives",
                    sets: 3,
                    reps: "8-10",
                    rest: 90,
                    muscles: ["Pectoraux", "Puissance"],
                    description: "Pousser fort pour décoller les mains du sol",
                    tips: "Qualité > quantité, maximum d'explosivité à la montée",
                    difficulty: 4,
                    gif: "💥"
                },
                {
                    id: "p3-s3",
                    name: "Pompes Hindu",
                    sets: 3,
                    reps: "10-12",
                    rest: 75,
                    muscles: ["Pectoraux", "Épaules", "Triceps"],
                    description: "Mouvement fluide en vague, du chien tête en bas au cobra",
                    tips: "Mouvement continu et contrôlé, excellent pour la mobilité",
                    difficulty: 3,
                    gif: "🐍"
                },
                {
                    id: "p3-s4",
                    name: "Isométrie pectoraux",
                    sets: 3,
                    reps: "30-45 sec",
                    rest: 60,
                    muscles: ["Pectoraux"],
                    description: "Haltères tendus devant à 90°, maintenir la position",
                    tips: "Contracte au maximum les pectoraux, imagine écraser quelque chose",
                    difficulty: 3,
                    gif: "⏸️"
                },
                {
                    id: "p3-s5",
                    name: "Dropset biceps",
                    sets: 3,
                    reps: "8+8+Max",
                    rest: 90,
                    muscles: ["Biceps"],
                    description: "Haltères lourd + léger + isométrie",
                    tips: "Pas de repos entre les séries, épuisement total du muscle",
                    difficulty: 4,
                    gif: "📉"
                },
                {
                    id: "p3-s6",
                    name: "Curl 21s avancé",
                    sets: 3,
                    reps: "21",
                    rest: 60,
                    muscles: ["Biceps"],
                    description: "Variation des angles et tempos sur 21 reps",
                    tips: "Tempo lent sur la négative (3 sec descente)",
                    difficulty: 4,
                    gif: "🎯"
                },
                {
                    id: "p3-s7",
                    name: "Spider curls",
                    sets: 3,
                    reps: "10-12",
                    rest: 60,
                    muscles: ["Biceps pic"],
                    description: "Penché en avant, coudes fixes devant",
                    tips: "Isolation parfaite du biceps, contraction maximale",
                    difficulty: 3,
                    gif: "🕷️"
                },
                {
                    id: "p3-s8",
                    name: "Circuit abdos intensif",
                    sets: 3,
                    reps: "Circuit complet",
                    rest: 90,
                    muscles: ["Core complet"],
                    description: "30s gainage + 20 crunch + 20 twists + 30s hollow + 10 V-sits",
                    tips: "Enchaîne sans repos entre les exercices, repos seulement entre les circuits",
                    difficulty: 5,
                    gif: "🔄"
                },
                {
                    id: "p3-s9",
                    name: "V-sits",
                    sets: 3,
                    reps: "10-15",
                    rest: 45,
                    muscles: ["Abdominaux"],
                    description: "Former un V avec le corps, toucher les pieds",
                    tips: "Garde les jambes tendues si possible, contracte fort",
                    difficulty: 3,
                    gif: "V"
                }
            ],
            dimanche: [
                {
                    id: "p3-d1",
                    name: "Triset triceps",
                    sets: 3,
                    reps: "10+10+Max",
                    rest: 90,
                    muscles: ["Triceps"],
                    description: "Dips + extensions + pompes diamant sans repos",
                    tips: "Brûlure maximale garantie, réduis les reps si nécessaire",
                    difficulty: 5,
                    gif: "3️⃣"
                },
                {
                    id: "p3-d2",
                    name: "Tempo triceps",
                    sets: 3,
                    reps: "8-10",
                    rest: 60,
                    muscles: ["Triceps"],
                    description: "Extensions avec tempo 3-1-1 (3 sec descente, 1 pause, 1 montée)",
                    tips: "Contrôle total du mouvement, tension constante",
                    difficulty: 3,
                    gif: "⏱️"
                },
                {
                    id: "p3-d3",
                    name: "Pompes triceps suicide",
                    sets: 3,
                    reps: "Max",
                    rest: 75,
                    muscles: ["Triceps"],
                    description: "Pompes diamant jusqu'à l'échec, puis normales, puis inclinées",
                    tips: "Descente progressive de difficulté pour épuisement total",
                    difficulty: 4,
                    gif: "☠️"
                },
                {
                    id: "p3-d4",
                    name: "Giant set épaules",
                    sets: 3,
                    reps: "10+10+10",
                    rest: 90,
                    muscles: ["Épaules complètes"],
                    description: "Élévations frontales + latérales + arrière sans repos",
                    tips: "Utilise des poids légers, focus sur la forme parfaite",
                    difficulty: 4,
                    gif: "🎪"
                },
                {
                    id: "p3-d5",
                    name: "Superset dos-biceps",
                    sets: 4,
                    reps: "12+12",
                    rest: 90,
                    muscles: ["Dorsaux", "Biceps"],
                    description: "Rowing + curl immédiatement après",
                    tips: "Synergie parfaite, pré-fatigue des biceps",
                    difficulty: 3,
                    gif: "🔗"
                },
                {
                    id: "p3-d6",
                    name: "Finisher bras 100 reps",
                    sets: 2,
                    reps: "100 total",
                    rest: "Minimal",
                    muscles: ["Bras complets"],
                    description: "100 reps totales curl + extensions, repos courts si besoin",
                    tips: "Divise en séries de 20-15-10 si nécessaire, pompe maximale",
                    difficulty: 5,
                    gif: "💯"
                },
                {
                    id: "p3-d7",
                    name: "Planche progression max",
                    sets: 1,
                    reps: "Max temps",
                    rest: 0,
                    muscles: ["Core"],
                    description: "Tenir le plus longtemps possible, battez votre record",
                    tips: "Mental de guerrier, dépasse tes limites",
                    difficulty: 4,
                    gif: "⏳"
                },
                {
                    id: "p3-d8",
                    name: "Dragon flags négatifs",
                    sets: 3,
                    reps: "5-8",
                    rest: 60,
                    muscles: ["Core complet", "Abdominaux"],
                    description: "Descente contrôlée jambes tendues depuis position verticale",
                    tips: "Exercice de Bruce Lee, commence avec genoux pliés si trop dur",
                    difficulty: 5,
                    gif: "🐉"
                },
                {
                    id: "p3-d9",
                    name: "Abs wheel ou rollout",
                    sets: 3,
                    reps: "8-12",
                    rest: 60,
                    muscles: ["Core profond"],
                    description: "Rouler en avant avec contrôle total",
                    tips: "Si pas de roue, utilise une serviette sur sol lisse ou des haltères",
                    difficulty: 4,
                    gif: "🎡"
                }
            ]
        }
    }
};

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { workoutProgram };
}
