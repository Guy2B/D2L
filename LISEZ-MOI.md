# Chroniques d’ailleurs — Atelier Premium V6 · Couvertures et chapitres

## Ce qui marche

- Atelier existant : nouveau texte, nouveau roman, aperçu, gestion des brouillons et export `custom-content.js`.
- Couverture de roman : JPG/PNG/WebP optimisée localement en WebP, aperçu, remplacement et suppression en brouillon. Lors de la publication, le serveur prépare un commit atomique de `custom-content.js` et de `assets/books/atelier-<id>.webp`.
- Préparation des chapitres : vérification locale d’un fichier JSON `{ "sections": [{"title": "Chapitre 1", "blocks": [{"type":"paragraph", "text":"..."}]}] }`. **Les chapitres ne sont pas envoyés à R2/D1 sans futur endpoint sécurisé.**
- Sept fiches de référence, modèles d'e-mails à préparer, navigation de l'espace auteur.
- **Publication d'un roman et de sa couverture dans le dépôt public D2L** : route serveur `/api/publish-book`, avec vérification du jeton signé Cloudflare Access et de l'e-mail administrateur, puis commit GitHub sur `custom-content.js`, uniquement après clic et confirmation. Le bouton affiche une erreur claire si la configuration est absente.

## Ce qui ne marche PAS encore

- Demandes reçues et statistiques réelles : aucune liaison D1 administrateur installée.
- Génération de liens personnels et envoi des e-mails : non connectés, aucun faux lien créé.
- Lecture permanente de l'auteur : nécessite une voie d'authentification dédiée dans `d2l-reader-api`.
- Le bouton publication n'est opérationnel **qu'après** configuration des secrets, tests du routage Pages Functions et du déploiement automatique du site public.
- Les brouillons de l'Atelier sont **stockés localement dans chaque navigateur** ; ils ne se synchronisent pas encore entre ordinateur et téléphone.

## Installation par la personne qui gère Cloudflare (Claude ou administrateur technique)

1. Sauvegarder le dépôt privé `d2l-atelier` et confirmer que la protection Cloudflare Access couvre `atelier.guybeaho.com` **et son URL `pages.dev`**, y compris les routes `/api/*`.
2. Copier les fichiers à la racine du dépôt privé, en conservant les autres fichiers nécessaires. Déployer la fonction `functions/api/publish-book.js` dans un projet **Cloudflare Pages** prenant en charge Pages Functions (et pas en « static assets only »).
3. Définir les variables serveur Cloudflare Pages :

| Nom | Exemple / instruction |
|---|---|
| `CF_ACCESS_TEAM_DOMAIN` | `votre-equipe.cloudflareaccess.com` (valeur exacte de l'équipe) |
| `CF_ACCESS_AUD` | Identifiant AUD exact de l'application Access |
| `ADMIN_EMAIL` | Votre adresse autorisée dans Cloudflare Access |
| `GITHUB_OWNER` | `Guy2B` |
| `GITHUB_REPO` | `D2L` |
| `GITHUB_BRANCH` | Branche réellement utilisée, par exemple `main` |
| `GITHUB_TOKEN` | **Secret**, jeton GitHub finement limité à `Contents: Read and write` pour le dépôt `Guy2B/D2L`, jamais dans JS public |

4. Le jeton Access est vérifié côté serveur (signature RS256, AUD, émetteur, expiration et e-mail). **Ne jamais** remplacer cette vérification par un simple en-tête e-mail venant du navigateur.
5. Tester la fonction sur un dépôt de TEST, en confirmant que `custom-content.js` n'est pas écrasé et que l'export des contenus antérieurs est conservé. Ensuite seulement, autoriser la cible `Guy2B/D2L`.
6. Vérifier le déclenchement automatique du déploiement du site public après commit GitHub. La fonction confirme le commit, **pas** le résultat du déploiement ou l'apparition effective du roman.

## Précautions

- **Ne pas publier automatiquement le manuscrit complet.** Seule la fiche et son synopsis dans `custom-content.js` sont publiés. Les textes privés restent dans R2.
- Ne pas déclarer le service prêt en production avant tests, sauvegarde, et configuration des secrets.
- Ne pas coller les secrets, les jetons privés ou les liens d'invitation dans les chats.
- Les pages du dépôt privé restent accessibles publiquement si l'application Access ou les URL de déploiement ne sont pas correctement protégées : vérifier l'ensemble des domaines.

## À tester avant déploiement public

1. Ouvrir localement `atelier.html` avec les fichiers fournis. Créer un roman et choisir une image ; vérifier l’aperçu, sauvegarder, remplacer et retirer la couverture.
2. Tester avec une copie de dépôt GitHub, vérifier que `custom-content.js` référence `assets/books/atelier-<id>.webp` et que l’image existe.
3. Vérifier que le site public charge la couverture après le déploiement ; le code du site attend `coverImage`.
4. Ne pas confondre la préparation locale des chapitres avec leur import effectif. Pour l’import R2/D1, développer une route administrateur authentifiée, un manifeste de sections, des contrôles et un journal de transactions.
