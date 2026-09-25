# Chroniques d'ailleurs - V14

Correction du visuel original de Le seuil...

# Chroniques d’ailleurs - V13

Trois visuels historiques ont été corrigés après comparaison avec la page originale du blog.

# Chroniques d’ailleurs - Die 2 Lap - V11

Cette version consolide la migration du blog et ajoute une refonte UX/UI complète.

## Contenu

- 44 publications historiques disponibles dans le site.
- 44 visuels locaux en meilleure définition dans `assets/articles/`.
- Dates, catégories et liens vers les publications d’origine conservés.
- Mentions `Aussi publié sur...` conservées lorsqu’elles sont documentées.
- Cinq romans achevés avec synopsis interactifs.
- Pour les trois volumes Edmond Silla (E.S.), la présentation générale de la série apparaît avant le synopsis du volume.

## Expérience de lecture

La page d’accueil comprend une sélection éditoriale, une recherche, des filtres, un bouton de découverte aléatoire et une bibliothèque visuelle.

Les pages de lecture comprennent :
- une barre de progression,
- le temps de lecture estimé,
- le réglage de taille du texte,
- un mode lecture,
- les crédits images,
- l’historique de publication,
- les likes et commentaires locaux,
- le partage,
- des recommandations de lecture,
- la navigation vers le texte précédent et suivant.

## Images

Le site ne dépend plus des miniatures Unblog pour l’affichage courant. Les images sont servies localement en WebP.

Voir `IMAGE_MAPPING.md` pour le détail article par article.

## Utilisation

Ouvrir `index.html` directement ou lancer un serveur local :

```bash
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Publication

Le projet est statique et peut être publié sur GitHub Pages, Netlify, Vercel, Cloudflare Pages ou un hébergement classique.


## V12 : ajouter du contenu sans toucher au code

Ouvrez `studio.html` dans votre navigateur. L’Atelier auteur permet d’ajouter :

- un poème ;
- une chronique ou un récit ;
- une nouvelle ;
- une histoire de voyage ;
- un roman achevé, y compris un nouveau volume E.S.

L’atelier transforme automatiquement une image sélectionnée en WebP compressé et l’intègre directement dans le fichier de contenu exporté. Il remplace aussi automatiquement les tirets longs par des tirets courts.

Quand le contenu est prêt, cliquez sur **Exporter custom-content.js**, puis remplacez le fichier `custom-content.js` du site par le fichier téléchargé. Après mise en ligne du dossier, le nouveau contenu apparaît automatiquement dans la bibliothèque, la recherche, la chronologie et les compteurs. Les nouveaux romans apparaissent automatiquement dans la section Manuscrits achevés.

### Corrections V12

- Images de `À fleur d’épiderme` et `…Itinérance` remises dans le bon ordre.
- Trois portes d’entrée désormais distinctes : une nouvelle, un poème, un roman.
- Statistiques reformulées : textes publiés, romans achevés, naissance de Chroniques d’ailleurs.
- Chronologie interactive par année.
- Reprise de la dernière lecture.
- Animations d’apparition discrètes et respect de `prefers-reduced-motion`.


### v15
This version updates the featured image for `Artifices de petit prince` using the latest file provided by the author.

## V21 - audit du site public

- Bibliothèque, portes d'entrée et romans pré-rendus dans le HTML pour une meilleure indexation.
- SEO : canonical, Open Graph, Twitter Cards et Schema.org.
- `sitemap.xml`, `robots.txt` et page `404.html` ajoutés.
- Métadonnées sociales des articles améliorées.
- Photos Shanghai converties en WebP pour réduire le poids du site.
- Voir `AUDIT_V21.md` pour le détail.


## V22

- Impressum mis à jour avec les informations éditoriales fournies par l’auteur.
- Contact ajouté : die2lap@gmail.com.
- Hébergement conservé avec la mention `in progress` en attendant les informations définitives.


## V23

- La citation du hero a été transformée en véritable bulle de parole, attachée visuellement au portrait.
- Ajustement léger du positionnement sur desktop et mobile.


## V24

- Citation du hero déplacée hors du visage.
- Bulle type animé/manga placée sur le côté.
- Trois petites bulles progressives relient le portrait à la citation.
- Ajustements responsive desktop et mobile.

## V25

- Les trois petites bulles de pensée sont maintenant de vrais éléments visibles, et non plus de simples ombres CSS.
- Elles grossissent progressivement du visage vers la grande bulle de citation.
- La citation ne recouvre plus le visage.
- La signature « Die 2 Lap » est alignée à droite dans la bulle.


## V28 - Relecture complète des textes

Les 44 publications ont fait l’objet d’une relecture linguistique complète. Orthographe, accords, conjugaison, ponctuation, typographie et erreurs syntaxiques évidentes ont été corrigés tout en conservant la voix, les figures littéraires et la structure des poèmes. Voir `CORRECTIONS_TEXTES_V28.md` pour le périmètre et les contrôles effectués.

## V29 - Lecture et partage

- Corps des articles agrandi : environ 19,2 px par défaut sur ordinateur et 18 px sur mobile.
- Extraits de la bibliothèque et métadonnées légèrement agrandis.
- Réglage A-/A+ conservé avec une plage plus confortable.
- Interaction J'aime retravaillée avec micro-animation et mémorisation locale.
- Après un J'aime, invitation discrète au partage.
- Partage natif du téléphone activé lorsque le navigateur le permet.
- X, Facebook, WhatsApp et copie du lien restent disponibles.
- Les J'aime restent locaux au navigateur dans cette version statique GitHub Pages. Un compteur global partagé entre visiteurs nécessite un service de données externe.


## V30 - Likes globaux avec Google Sheets

La V30 ajoute une couche optionnelle de compteur partagé pour les boutons « J’aime » :

- `likes-config.js` contient l’URL du service à renseigner ;
- `likes-api.js` gère la lecture du compteur et la synchronisation ;
- `GOOGLE_LIKES_CODE.gs` contient le code Apps Script prêt à coller ;
- `CONFIGURER_LIKES_GOOGLE.md` donne la procédure complète ;
- si le service n’est pas configuré ou indisponible, le site revient automatiquement au comportement local de la V29 ;
- les Likes déjà présents dans le navigateur sont repris et synchronisés lors de la première visite après activation du service.

Le partage social de la V29 est conservé.

## V31 - Likes globaux activés

Le point d’accès Google Apps Script fourni par le propriétaire du site est maintenant intégré dans `likes-config.js`. Les pages d’article tentent donc automatiquement de lire et mettre à jour le compteur partagé. En cas d’indisponibilité du service Google, le site conserve le fonctionnement local comme solution de repli.

## V32 - Commentaires d'archive

Les nombres de commentaires historiques déjà recensés dans les données des deux anciens blogs sont désormais affichés séparément des nouveaux commentaires du site.

- Les cartes de la bibliothèque affichent un badge discret uniquement lorsqu'un nombre historique est connu et supérieur à zéro.
- Les pages d'article affichent un encart "commentaires d'archive" avec un lien vers la publication d'origine.
- Les commentaires d'archive ne sont jamais additionnés aux nouveaux commentaires du site.
- Aucun nombre n'a été inventé : les valeurs proviennent du champ `archiveComments` déjà présent dans les données migrées.
