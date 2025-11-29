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