# 📚 Plateforme de Traduction IA - TalAIt Translator

Bienvenue dans le dépôt de la **Plateforme de Traduction Fullstack TalAIt**.

Ce projet est une application web moderne utilisant l'IA pour la traduction. Elle est construite sur une architecture sécurisée utilisant Python (FastAPI) pour le Backend et Next.js (App Router) pour le Frontend, le tout conteneurisé avec Docker Compose.

## 🚀 Technologies Utilisées

| Service | Technologie | Rôle Principal |
| :--- | :--- | :--- |
| **Backend (API)** | **Python (FastAPI)** | Authentification (JWT), Gestion des utilisateurs, Logique de traduction (simulée). |
| **Frontend (UI)** | **Next.js 14+** | Interface utilisateur, Routage App Router, Rendu SSR/CSR. |
| **Styling** | **Tailwind CSS** | Design professionnel Dark Mode (Rouge/Gris). |
| **Conteneurisation**| **Docker Compose** | Orchestration des deux services. |

---

## 🛠️ Configuration et Lancement

### Prérequis

1. **Docker** et **Docker Compose** installés.

### Étapes de Lancement

1. **Cloner le dépôt :**
    ```bash
    git clone https://github.com/KarimaChami/Plateforme-de-Traduction-Fullstack-frontend.git
    cd Plateforme-de-Traduction-Fullstack
    ```

2. **Configuration des Variables d'Environnement :**
 
  * Créez le fichier **`translation-frontend/.env.local`** (ignoré par Git) :
        ```env
        NEXT_PUBLIC_API_URL=http://localhost:8000
        `

3. **Accès :**

    * **Frontend (UI) :** `http://localhost:3000`
    * **Backend (API Docs) :** `http://localhost:8000/docs`

##



# 🌐 Frontend : TalAIt Translator (Next.js App Router)

Cette application est l'interface utilisateur de la plateforme de traduction. Elle utilise le nouveau modèle de routage **App Router** de Next.js pour une performance et une expérience développeur optimales.

## 🎨 Design et Style

* **Framework de Style :** Tailwind CSS.
* **Thème :** light Mode.
* **Composant Spécial :** `AnimatedBackground.js` (génère un fond subtilement animé, avec gestion du problème d'hydratation).

## 🗂️ Structure des Routes

| Route | Fichier | Description | Type de Rendu |
| :--- | :--- | :--- | :--- |
| `/` | `src/app/page.js` | Redirection vers l'authentification. | Server Component (SSR) |
| `/auth` | `src/app/auth/page.js` | Formulaire de Connexion/Inscription. | Client Component (CSR) |
| `/translate` | `src/app/translate/page.js` | Interface de traduction principale. | Client Component (CSR) |
| Layout | `src/app/layout.js` | Layout racine (Header, Footer, Background). | Server Component (SSR) |

## 💻 Développement Local (Sans Docker)

Pour lancer uniquement le Frontend, vous devez :

1. Avoir Node.js et npm installés.
2. Vous assurer que le Backend tourne sur `http://localhost:8000`.
3. Installer les dépendances :
    ```bash
    npm install
    ```
4. Lancer le serveur de développement :
    ```bash
    npm run dev
    ```

---