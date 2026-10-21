# Auto-école Babaaissa — Plateforme Web Complète 🇲🇦
**مدرسة تعليم السياقة باباعيسى — بوعرفة**

Une application web complète, moderne, bilingue (Français & Arabe) et sécurisée, conçue sur mesure pour l'**Auto-école Babaaissa**, située à Bouarfa, région de l'Oriental, Maroc.

---

## 📌 Informations Officielles Vérifiées

- **Nom de l'établissement** : Auto-école Babaaissa
- **Nom en Arabe** : مدرسة تعليم السياقة باباعيسى
- **Ville** : Bouarfa, Maroc
- **Adresse** : Hay Al Wahda N°1, Bouarfa
- **Téléphone direct** : `0626783160` (Format national : `06 26 78 31 60`)
- **WhatsApp officiel** : `+212626783160` (Lien direct : [wa.me/212626783160](https://wa.me/212626783160))
- **Charte Graphique** :
  - Bleu marine profond (`#072445`)
  - Blanc pur (`#FFFFFF`)
  - Vert vif de sécurité (`#10B981`)
- **Devise** : Dirham marocain (`MAD` / `DH` / `د.م.`)

---

## 🚀 Fonctionnalités Développées & Validées

### 1. Identité Visuelle & Logo Original
- Logo vectoriel SVG original combinant un volant, une route en perspective avec marquages au sol, la silhouette d'un véhicule, le nom **BABAAISSA** en lettres capitales et le calligraphie arabe **باباعيسى**.
- Design adaptatif (mobile, tablette, desktop), animations douces et typographies optimisées (Latin : Inter, Arabe : Cairo/Tajawal).

### 2. Support Bilingue Intégral (FR / AR) & RTL
- Sélecteur de langue visible dans la barre de navigation (`FR` / `العربية`).
- Bascule automatique vers le mode RTL (Right-to-Left) pour la langue arabe avec inversion des icônes directionnelles et alignement approprié.
- Dictionnaires de traduction complets pour l'ensemble des 10 pages publiques, formulaires, alertes, notifications, simulateurs et dashboards.
- Mémorisation de la langue choisie dans les cookies et le stockage local (`localStorage`).

### 3. Les 10 Pages Publiques
1. **Accueil (`/`)** : Hero section avec les titres officiels en français et arabe, 3 boutons d'action rapide, bouton WhatsApp, parcours en 4 étapes, cartes des programmes, bannière de réservation et adresse vérifiée à Bouarfa.
2. **Code de la route (`/code-de-la-route`)** : Les 12 thématiques officielles marocaines, barre de recherche, filtres par catégorie, suivi de progression.
3. **Leçons détaillées (`/code-de-la-route/[id]`)** : Textes pédagogiques, schémas vectoriels de signalisation routière, points clés à retenir, mini-quiz interactif de fin de cours, navigation précédente/suivante et bouton de validation.
4. **Examens blancs (`/examens-blancs`)** : Simulateur interactif avec choix du thème ou examen complet (40 questions), mode chronométré (30 min) ou libre, calcul du score, seuil de réussite (32/40), revue détaillée avec explications et confetti de réussite.
5. **Leçons de conduite (`/lecons-conduite`)** : Présentation des formules (Débutant, Urbaine, Stationnement, Perfectionnement, Examen).
6. **Réserver une leçon (`/reserver-lecon`)** : Tunnel de réservation interactif en 4 étapes avec vérification de disponibilité en temps réel, prévention stricte des doublons (double-booking) et génération d'une référence unique (`BAB-2026-XXXX`).
7. **Espace NARSA (`/espace-narsa`)** : Guide des épreuves théorique et pratique, checklist des pièces officielles, liens directs vers les portails officiels (`narsa.ma`, `khadamat.narsa.gov.ma`) et formulaire de demande d'accompagnement de dossier.
8. **À propos (`/a-propos`)** : Histoire, missions, valeurs pédagogiques et ancrage local à Hay Al Wahda N°1 à Bouarfa.
9. **Contact (`/contact`)** : Coordonnées réelles, bouton WhatsApp direct avec message prérempli, formulaire de message et carte interactive de Bouarfa.
10. **Connexion & Inscription (`/connexion`, `/inscription`)** : Authentification sécurisée par cookie/Bearer token avec boutons de remplissage automatique des comptes de démonstration pour évaluation instantanée.

### 4. Espace Élève Authentifié (`/dashboard`)
- Suivi en temps réel des leçons complétées et du pourcentage d'avancement.
- Historique complet des simulations d'examens avec scores et dates.
- Gestion des leçons de conduite réservées (statut : En attente, Confirmée, Terminée, Annulée) et possibilité de demander l'annulation.
- Suivi des demandes d'assistance NARSA.

### 5. Tableau de Bord Administrateur Sécurisé (`/admin`)
- **Indicateurs KPI temps réel** : Total des élèves inscrits, réservations en attente, leçons confirmées, demandes NARSA en cours, leçons publiées, total des examens passés et moyenne générale.
- **Gestion des réservations** : Validation en 1 clic (Approuver, Refuser, Terminer) et assignation moniteur/véhicule.
- **Gestion des demandes NARSA** : Suivi des statuts (En attente, En cours, Validé école, Terminé), ajout de notes internes, contact direct par WhatsApp ou appel.
- **Gestion des élèves** : Liste des comptes inscrits avec coordonnées et rôles.
- **Gestion du Code & Banque de questions** : Consultation et modification des contenus.
- **Paramètres de l'établissement** : Modification du nom, adresse, téléphone, horaires d'ouverture et seuil de réussite d'examen.

---

## 🔑 Comptes de Démonstration

Des boutons de remplissage en 1 clic sont disponibles sur la page de connexion :

| Rôle | Adresse e-mail | Mot de passe | Espace accessible |
|---|---|---|---|
| **Directeur / Admin** | `admin@babaaissa.ma` | `AdminBabaaissa2026!` | `/admin` (Toutes permissions) |
| **Élève inscrit** | `eleve@babaaissa.ma` | `EleveBabaaissa2026!` | `/dashboard` (Espace Élève) |

---

## 🛠️ Architecture Technique

- **Framework** : Next.js 14 (App Router) + React 18 + TypeScript
- **Styles & RTL** : Tailwind CSS avec prise en charge complète du mode `dir="rtl"` et polices adaptées
- **Base de données & Persistance** :
  - Moteur local transactionnel avec verrouillage de concurrence (`withLock`) et écritures atomiques sur disque (`data/database.json`) garantissant 100% d'autonomie sans dépendance externe obligatoire.
  - Schéma PostgreSQL / Supabase complet fourni (`supabase_schema.sql`) avec index, contraintes uniques et politiques de sécurité Row Level Security (RLS).
- **Sécurité & Protection des données** :
  - Mots de passe hashés par SHA-256 avec clé secrète salée.
  - Sessions sécurisées via cookies `HttpOnly` et en-têtes `Authorization: Bearer <token>`.
  - Conformité avec la législation marocaine sur la protection des données personnelles (Loi 09-08 de la CNDP).
- **Tests Automatisés** : Suite complète de tests unitaires et d'intégration (`node:test`) pour valider les règles métier, la notation des examens, les conflits de réservation et l'authentification.

---

## 📋 Commandes Disponibles

```bash
# Lancer les tests automatisés de règles métier
npm test

# Compiler l'application pour la production
npm run build

# Démarrer le serveur de production (port 3000)
npm run start

# Démarrer le serveur de développement
npm run dev
```

---

## 🌐 Déploiement

1. **Variables d'environnement** : Copier `.env.example` vers `.env` et renseigner les clés souhaitées.
2. **Supabase (optionnel)** : Exécuter le script `supabase_schema.sql` dans l'éditeur SQL de votre projet Supabase si vous souhaitez basculer vers PostgreSQL managé.
3. **Vercel / Serveur Linux / Docker** : Déployable instantanément via `npm run build` puis `npm run start`.
