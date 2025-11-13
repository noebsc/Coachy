# 💪 Coachy - Ton Coach Musculation Personnel

## 🚀 Application Web de Coaching Musculation à Domicile

Une application complète pour suivre un programme de musculation intensif sur 3-6 mois, spécialement conçue pour la prise de masse musculaire à domicile avec des haltères de 2.5kg.

## ✨ Fonctionnalités Principales

### 🏋️ Programme d'Entraînement
- **3 phases évolutives** sur 12 semaines
- **Séances weekend uniquement** (samedi et dimanche)
- **Exercices adaptés** avec haltères de 2.5kg
- **Progression automatique** des charges et répétitions

### 🎯 Dashboard Motivant
- Séance du jour en un clic
- Chronomètre intégré pour les temps de repos
- Animations et GIFs pour chaque exercice
- Checklist interactive des exercices

### 🏆 Système de Gamification
- **25+ badges** à débloquer
- Système de niveaux (Débutant → Dieu Grec)
- Suivi des séries (streak)
- Défis hebdomadaires
- Célébrations animées

### 📊 Suivi des Progrès
- Historique complet des séances
- Statistiques détaillées
- Graphiques de progression
- Export des données

### 📚 Guides Complets
- **Nutrition:** Plan alimentaire pour prise de masse
- **Récupération:** Sommeil et repos optimaux
- **Anatomie:** Comprendre les muscles
- **Exercices:** Tutoriels détaillés

### 🔐 Authentification & Synchronisation
- Sessions persistantes (cookie/token)
- Synchronisation Firebase temps réel
- Multi-appareils (mobile/desktop)
- Sauvegarde automatique

## 🛠️ Installation

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Connexion internet pour Firebase
- Compte Firebase (automatiquement créé)

### Lancement
1. Ouvrir `index.html` dans un navigateur
2. Créer un compte ou se connecter
3. Compléter son profil
4. Commencer l'entraînement !

## 📱 Utilisation

### Première Connexion
1. **S'inscrire** avec email et mot de passe
2. **Renseigner son profil** (nom, âge, poids, taille)
3. **Choisir ses préférences** (notifications, son, mode sombre)

### Routine d'Entraînement
1. **Samedi & Dimanche:** Ouvrir l'app
2. **Dashboard:** Voir la séance du jour
3. **Exercices:** Suivre les instructions et animations
4. **Timer:** Utiliser le chronomètre pour les repos
5. **Validation:** Cocher chaque exercice terminé
6. **Célébration:** Profiter des animations de victoire !

### Suivi des Progrès
- Consulter l'**historique** des séances
- Voir les **badges** débloqués
- Suivre son **niveau** actuel
- Analyser ses **statistiques**

## 🎨 Design & Interface

### Responsive Design
- ✅ Mobile (< 768px)
- ✅ Tablette (768px - 1024px)
- ✅ Desktop (> 1024px)

### Modes d'Affichage
- ☀️ Mode clair (par défaut)
- 🌙 Mode sombre (dans les paramètres)

### Animations
- Transitions fluides
- Effets de hover
- Animations de célébration
- Confettis et badges animés

## 📊 Structure des Données

### Profil Utilisateur
```javascript
{
  name: "Prénom",
  age: 17,
  height: 180,  // cm
  weight: 63,   // kg
  goal: "masse"
}
```

### Programme
- **Phase 1:** Fondations (4 semaines)
- **Phase 2:** Développement (4 semaines)
- **Phase 3:** Intensification (4 semaines)

### Exercices Types
- Pompes (toutes variations)
- Curls biceps
- Extensions triceps
- Développés
- Gainage et abdos
- Élévations épaules

## 🔥 Firebase Configuration

L'application utilise Firebase pour:
- **Authentication:** Gestion des comptes
- **Firestore:** Base de données temps réel
- **Storage:** Sauvegarde des données
- **Analytics:** Suivi d'utilisation

Configuration déjà intégrée - rien à configurer !

## 💡 Conseils d'Utilisation

### Pour Maximiser les Résultats
1. **Régularité:** Ne jamais rater un weekend
2. **Nutrition:** Suivre le plan alimentaire
3. **Sommeil:** 7-9h par nuit minimum
4. **Hydratation:** 3L d'eau par jour
5. **Récupération:** Respecter les jours de repos

### Motivation
- Activer les **notifications motivantes**
- Viser les **badges** difficiles
- Battre ses **records personnels**
- Partager ses **progrès** (screenshots)

## 🐛 Dépannage

### Problèmes Courants
- **Connexion impossible:** Vérifier la connexion internet
- **Données non synchronisées:** Rafraîchir la page
- **Timer bloqué:** Autoriser les sons dans le navigateur
- **Mode sombre:** Activer dans Profil > Paramètres

### Reset des Données
En cas de problème majeur:
1. Ouvrir la console (F12)
2. Taper: `window.appDebug.resetData()`
3. Confirmer la suppression
4. Se reconnecter

## 📈 Évolutions Futures

### Prochaines Fonctionnalités
- [ ] Mode hors-ligne complet
- [ ] Partage social des progrès
- [ ] Défis entre amis
- [ ] Vidéos d'exercices
- [ ] Coach IA personnalisé
- [ ] Apple Watch / Fitbit sync

## 🙏 Support

Pour toute question ou problème:
- Vérifier la section **Guides** dans l'app
- Consulter l'**historique** pour les données
- Utiliser le mode **debug** si nécessaire

## 📄 License

Application développée pour usage personnel.
Données synchronisées de manière sécurisée via Firebase.

---

**💪 Bon entraînement et welcome to your Summer Body journey!**
