# Audit V42

## SEO et partage
- 44 pages statiques individuelles générées sous `textes/`.
- chaque page possède une URL canonique sur `chroniques.guybeaho.com`.
- Open Graph, Twitter Card, date de publication, catégorie et données structurées BlogPosting sont spécifiques au texte.
- le texte de l'article est présent dans le HTML initial, sans dépendre de JavaScript pour l'indexation.
- `article.html?id=...` reste disponible comme compatibilité et porte `noindex,follow` afin d'éviter les doublons SEO.

## Mobile et accessibilité
- cibles tactiles principales d'au moins 44 px.
- navigation mobile, choix de langue et outils de lecture renforcés.
- maintien du focus clavier visible.
- prise en charge de `forced-colors` et des préférences de réduction des animations déjà présentes.
- pas de justification forcée sur petit écran.

## Performance
- largeur et hauteur intrinsèques renseignées sur les images HTML locales lorsqu'elles sont connues.
- image principale d'article et portrait principal prioritaires.
- images secondaires chargées en différé avec décodage asynchrone.

## Contrôles automatiques
- 44 pages d'articles générées.
- 0 lien ou ressource locale manquant lors du contrôle statique.
- 0 ID HTML dupliqué détecté.
- syntaxe JavaScript validée pour tous les fichiers JS principaux.
