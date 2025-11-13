// Contenu des guides complets
window.getGuideContent = function(guideType) {
    switch(guideType) {
        case 'exercices':
            return getExercisesGuide();
        case 'nutrition':
            return getNutritionGuide();
        case 'recuperation':
            return getRecoveryGuide();
        case 'anatomie':
            return getAnatomyGuide();
        default:
            return '<p>Guide en cours de chargement...</p>';
    }
};

function getExercisesGuide() {
    const exercises = workoutProgram.phase1.workouts.samedi.concat(workoutProgram.phase1.workouts.dimanche);
    let html = '<div class="exercises-guide"><h2>🏋️ Guide des Exercices</h2>';
    
    exercises.forEach(ex => {
        html += `
            <div class="exercise-detail-card">
                <h3>${ex.name}</h3>
                <p><strong>Muscles:</strong> ${ex.muscles.join(', ')}</p>
                <p><strong>Description:</strong> ${ex.description}</p>
                <p><strong>💡 Conseil:</strong> ${ex.tips}</p>
                <p><strong>Format:</strong> ${ex.sets} séries × ${ex.reps} reps • Repos: ${ex.rest}s</p>
            </div>`;
    });
    
    html += `
        <div class="tips-section">
            <h3>💡 Conseils Généraux</h3>
            <ul>
                <li>🎯 Toujours s'échauffer 5-10 min avant</li>
                <li>📏 Privilégier la technique à la charge</li>
                <li>🫁 Ne jamais bloquer sa respiration</li>
                <li>⏱️ Respecter les temps de repos</li>
                <li>💧 Boire régulièrement pendant la séance</li>
                <li>🎵 Préparer une playlist motivante</li>
            </ul>
        </div></div>`;
    
    return html;
}

function getNutritionGuide() {
    return `
        <div class="nutrition-guide">
            <h2>🍽️ Guide Nutrition Prise de Masse</h2>
            
            <div class="nutrition-section">
                <h3>📊 Tes Besoins (17 ans, 63kg, 180cm)</h3>
                <ul>
                    <li>💤 Métabolisme de base: ~1600 kcal</li>
                    <li>🚶 Avec activité: ~2100 kcal</li>
                    <li>🎯 <strong>Objectif prise de masse: 2500-2700 kcal/jour</strong></li>
                </ul>
            </div>
            
            <div class="nutrition-section">
                <h3>🥗 Macronutriments</h3>
                <div class="macro-grid">
                    <div class="macro-card">
                        <h4>🥩 Protéines: 130g/jour</h4>
                        <p>Poulet, œufs, poisson, whey, fromage blanc</p>
                    </div>
                    <div class="macro-card">
                        <h4>🍝 Glucides: 350g/jour</h4>
                        <p>Riz, pâtes, avoine, patates douces, bananes</p>
                    </div>
                    <div class="macro-card">
                        <h4>🥜 Lipides: 70g/jour</h4>
                        <p>Huile d'olive, amandes, avocat, beurre de cacahuète</p>
                    </div>
                </div>
            </div>
            
            <div class="meal-plan">
                <h3>🍴 Journée Type</h3>
                
                <div class="meal-card">
                    <h4>🌅 Petit-déjeuner (650 kcal)</h4>
                    <ul>
                        <li>100g flocons d'avoine + lait</li>
                        <li>2 œufs + 1 blanc</li>
                        <li>1 banane</li>
                    </ul>
                </div>
                
                <div class="meal-card">
                    <h4>🍎 Collation (350 kcal)</h4>
                    <ul>
                        <li>Shake: 30g whey + banane + lait</li>
                        <li>30g amandes</li>
                    </ul>
                </div>
                
                <div class="meal-card">
                    <h4>🍽️ Déjeuner (750 kcal)</h4>
                    <ul>
                        <li>150g poulet</li>
                        <li>150g riz cuit</li>
                        <li>Légumes + huile d'olive</li>
                    </ul>
                </div>
                
                <div class="meal-card">
                    <h4>💪 Post-training</h4>
                    <ul>
                        <li>30g whey</li>
                        <li>1 banane</li>
                    </ul>
                </div>
                
                <div class="meal-card">
                    <h4>🌙 Dîner (650 kcal)</h4>
                    <ul>
                        <li>150g saumon/viande</li>
                        <li>200g patates douces</li>
                        <li>Salade verte</li>
                    </ul>
                </div>
                
                <div class="meal-card">
                    <h4>🛏️ Avant coucher (200 kcal)</h4>
                    <ul>
                        <li>200g fromage blanc</li>
                        <li>30g noix</li>
                    </ul>
                </div>
            </div>
            
            <div class="supplements">
                <h3>💊 Suppléments</h3>
                <ul>
                    <li>⭐ <strong>Whey:</strong> 30g post-training</li>
                    <li>⭐ <strong>Créatine:</strong> 3-5g/jour</li>
                    <li>⭐ <strong>Oméga 3:</strong> 2-3g/jour</li>
                    <li>➕ <strong>Vitamine D:</strong> 2000 UI en hiver</li>
                </ul>
            </div>
            
            <div class="tips">
                <h3>💡 Conseils</h3>
                <ul>
                    <li>💧 3L d'eau minimum par jour</li>
                    <li>⚖️ +0.5kg par semaine max</li>
                    <li>🍔 1 cheat meal/semaine autorisé</li>
                    <li>📝 Note ce que tu manges</li>
                </ul>
            </div>
        </div>`;
}

function getRecoveryGuide() {
    return `
        <div class="recovery-guide">
            <h2>😴 Guide Récupération</h2>
            
            <div class="sleep-section">
                <h3>💤 Le Sommeil</h3>
                <div class="sleep-info">
                    <h4>Pourquoi c'est crucial:</h4>
                    <ul>
                        <li>🔧 80% de la récupération musculaire</li>
                        <li>📈 Pic d'hormone de croissance (22h-2h)</li>
                        <li>💪 Production de testostérone</li>
                        <li>⚡ Reconstitution du glycogène</li>
                    </ul>
                    
                    <h4>Routine idéale:</h4>
                    <ul>
                        <li>22h00: Stop écrans</li>
                        <li>22h30: Douche tiède</li>
                        <li>23h00: Au lit</li>
                        <li>23h30: Extinction</li>
                        <li>7h00: Réveil</li>
                    </ul>
                    
                    <h4>Optimisation:</h4>
                    <ul>
                        <li>🌡️ Chambre à 18-20°C</li>
                        <li>🌑 Obscurité totale</li>
                        <li>☕ Pas de café après 14h</li>
                        <li>📱 Mode avion</li>
                    </ul>
                </div>
            </div>
            
            <div class="rest-days">
                <h3>🛋️ Jours de Repos</h3>
                
                <div class="do-dont">
                    <div class="do">
                        <h4>✅ À faire</h4>
                        <ul>
                            <li>🚶 Marche légère 20-30 min</li>
                            <li>🧘 Yoga/étirements</li>
                            <li>🏊 Natation douce</li>
                            <li>💆 Auto-massage</li>
                            <li>🧊 Douche froide</li>
                        </ul>
                    </div>
                    
                    <div class="dont">
                        <h4>❌ À éviter</h4>
                        <ul>
                            <li>Entraînement intensif</li>
                            <li>Sports explosifs</li>
                            <li>Cardio intense</li>
                            <li>Charges lourdes</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="stretching">
                <h3>🤸 Étirements Post-Séance</h3>
                <ul>
                    <li>🦾 <strong>Pectoraux:</strong> Bras au mur, 30s/côté</li>
                    <li>💪 <strong>Biceps:</strong> Bras tendu arrière, 30s</li>
                    <li>🦴 <strong>Triceps:</strong> Coude plié derrière tête, 30s</li>
                    <li>🎯 <strong>Épaules:</strong> Bras croisé devant, 30s</li>
                    <li>🐈 <strong>Dos:</strong> Cat-cow, 10 reps</li>
                    <li>🐍 <strong>Abdos:</strong> Cobra, 30s</li>
                </ul>
            </div>
            
            <div class="recovery-tips">
                <h3>⚡ Points Clés</h3>
                <ul>
                    <li>🏗️ Les muscles se construisent au REPOS</li>
                    <li>😴 7-9h de sommeil = gains maximaux</li>
                    <li>💧 3L d'eau minimum par jour</li>
                    <li>🍽️ Nutrition même les jours de repos</li>
                    <li>📈 Bonne récup = meilleur entraînement</li>
                </ul>
            </div>
        </div>`;
}

function getAnatomyGuide() {
    return `
        <div class="anatomy-guide">
            <h2>🏛️ Anatomie Musculaire</h2>
            
            <div class="muscle-groups">
                <div class="muscle-card">
                    <h3>🎯 PECTORAUX</h3>
                    <p><strong>Parties:</strong> Haut, milieu, bas</p>
                    <p><strong>Fonction:</strong> Pousser, rapprocher les bras</p>
                    <p><strong>Exercices:</strong> Pompes, développés, écartés</p>
                </div>
                
                <div class="muscle-card">
                    <h3>💪 BICEPS</h3>
                    <p><strong>Chefs:</strong> Long (externe) et court (interne)</p>
                    <p><strong>Fonction:</strong> Flexion du coude</p>
                    <p><strong>Exercices:</strong> Curls sous toutes formes</p>
                </div>
                
                <div class="muscle-card">
                    <h3>🦾 TRICEPS</h3>
                    <p><strong>Chefs:</strong> Long, médial, latéral</p>
                    <p><strong>Fonction:</strong> Extension du coude</p>
                    <p><strong>Exercices:</strong> Dips, extensions, pompes serrées</p>
                </div>
                
                <div class="muscle-card">
                    <h3>🎯 ÉPAULES</h3>
                    <p><strong>Faisceaux:</strong> Antérieur, latéral, postérieur</p>
                    <p><strong>Fonction:</strong> Élévation et rotation des bras</p>
                    <p><strong>Exercices:</strong> Élévations, développé militaire</p>
                </div>
                
                <div class="muscle-card">
                    <h3>🎯 ABDOMINAUX</h3>
                    <p><strong>Parties:</strong> Grand droit, obliques, transverse</p>
                    <p><strong>Fonction:</strong> Stabilisation, flexion du tronc</p>
                    <p><strong>Exercices:</strong> Crunch, gainage, twists</p>
                </div>
            </div>
            
            <div class="growth-science">
                <h3>🔬 Comment le Muscle Grossit</h3>
                
                <div class="growth-steps">
                    <div class="step">
                        <h4>1️⃣ Stimulus</h4>
                        <p>L'entraînement crée des micro-déchirures</p>
                    </div>
                    
                    <div class="step">
                        <h4>2️⃣ Réparation</h4>
                        <p>Le corps répare avec de nouvelles protéines</p>
                    </div>
                    
                    <div class="step">
                        <h4>3️⃣ Adaptation</h4>
                        <p>Les muscles deviennent plus gros et forts</p>
                    </div>
                </div>
                
                <div class="growth-factors">
                    <h4>Facteurs de Croissance:</h4>
                    <ul>
                        <li>💪 <strong>Tension mécanique:</strong> Charges progressives</li>
                        <li>🔥 <strong>Stress métabolique:</strong> Sensation de brûlure</li>
                        <li>🏗️ <strong>Dommages musculaires:</strong> Courbatures contrôlées</li>
                        <li>⏱️ <strong>Temps sous tension:</strong> 40-70 sec/série</li>
                        <li>📈 <strong>Surcharge progressive:</strong> Augmenter régulièrement</li>
                    </ul>
                </div>
                
                <div class="timeline">
                    <h4>📅 Timeline de Progression:</h4>
                    <ul>
                        <li><strong>Semaines 1-4:</strong> Adaptation neuromusculaire</li>
                        <li><strong>Semaines 4-8:</strong> Premiers gains visibles</li>
                        <li><strong>Semaines 8-12:</strong> Transformation notable</li>
                        <li><strong>3-6 mois:</strong> Summer body ! ☀️</li>
                    </ul>
                </div>
            </div>
        </div>`;
}
