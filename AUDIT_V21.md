# Audit V21 - Chroniques d'ailleurs

Audit réalisé à partir du site public `https://guy2b.github.io/D2L/` et du dépôt GitHub associé.

## Points solides

- Identité visuelle cohérente et reconnaissable.
- Navigation simple : Textes, Romans, Auteur, Parcours, Archives.
- 44 textes et 5 romans bien structurés dans les données.
- Recherche, filtres, chronologie, mode sombre, lecture aléatoire et reprise de lecture présents.
- Synopsis interactifs des romans, avec présentation de la série E.S. avant le volume concerné.
- Atelier auteur protégé par code et marqué `noindex,nofollow`.
- Disclaimer et Impressum présents.

## Corrections apportées dans V21

1. La page d'accueil contient désormais les 44 cartes de textes directement dans le HTML initial. Le site reste donc lisible et indexable même avant l'exécution de JavaScript.
2. Les trois portes d'entrée et les cartes des romans sont également pré-rendues dans le HTML.
3. Le compteur initial affiche 44 au lieu de 0 avant le chargement JavaScript.
4. Ajout des balises SEO et sociales : canonical, Open Graph et Twitter Card.
5. Ajout de données structurées Schema.org pour le blog et l'auteur.
6. Ajout de `sitemap.xml` avec les 44 publications.
7. Ajout de `robots.txt`, avec exclusion de l'atelier auteur.
8. Ajout d'une page `404.html` cohérente avec l'identité du site.
9. Métadonnées sociales dynamiques améliorées sur les pages d'article.
10. Les photos Shanghai ont été converties de JPG vers WebP pour alléger le chargement sans modifier leur contenu.
11. Vérification technique : 44 publications, aucun média local manquant, aucune référence locale cassée, syntaxe JavaScript valide.

## Point restant avant publication définitive

L'Impressum contient encore des champs `À compléter`. Il faut fournir le responsable éditorial, l'adresse de contact, l'e-mail et, si nécessaire, les données exactes de l'hébergeur avant de considérer cette page comme finalisée.

## Atelier auteur

L'atelier reste une protection côté navigateur. Le code évite l'accès accidentel, mais il ne constitue pas une authentification serveur. Pour un véritable espace privé en production, il faudra ultérieurement utiliser une authentification côté serveur ou un service protégé.


## Mise à jour V22

L'Impressum contient maintenant les informations éditoriales communiquées par l'auteur. Les données de l'hébergeur restent indiquées comme `in progress`.
