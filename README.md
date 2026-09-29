# Chroniques d’ailleurs - Die 2 Lap - V49

V49 généralise la mise en page éditoriale premium aux 13 récits photographiques, remplace la dernière image d’archive de Shanghai par l’original fourni par l’auteur et propose les 67 lignes poétiques en français, anglais et allemand selon la langue d’interface, sans traduire ni modifier les œuvres littéraires existantes.

# Chroniques d'ailleurs - V14

Correction du visuel original de Le seuil...

# Chroniques d’ailleurs - V13

Trois visuels historiques ont été corrigés après comparaison avec la page originale du blog.

# Chroniques d’ailleurs - Die 2 Lap - V43

Cette version consolide la migration du blog et ajoute une refonte UX/UI complète.

## Contenu

- 57 publications historiques disponibles dans le site.
- Les visuels sont servis localement depuis `assets/articles/`, dont les 67 photographies originales des récits photographiques désormais intégrées en haute qualité.
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
- Contact éditorial : d2l@guybeaho.com.
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

Les 44 publications littéraires déjà présentes avant V43 ont fait l’objet d’une relecture linguistique complète. Orthographe, accords, conjugaison, ponctuation, typographie et erreurs syntaxiques évidentes ont été corrigés tout en conservant la voix, les figures littéraires et la structure des poèmes. Voir `CORRECTIONS_TEXTES_V28.md` pour le périmètre et les contrôles effectués.

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

## V33 - Google Analytics 4

- Google Analytics 4 activé avec l’identifiant `G-T3SVPB7Y3P` sur les pages publiques.
- Les pages Atelier auteur et Studio ne chargent pas Google Analytics afin de ne pas mélanger l’usage éditorial avec l’audience publique.
- Le `page_view` automatique est désactivé puis envoyé manuellement après l’initialisation de la page, afin que les articles remontent avec leur vrai titre dynamique.
- Événements ajoutés : ouverture d’article, progression 25/50/75/100 %, J’aime, partage, ouverture d’archive, commentaire local, filtres, année, recherche, synopsis, lecture surprise et reprise de lecture.
- Le Disclaimer mentionne désormais la mesure d’audience.

## V34 - Présentation trilingue FR / EN / DE

- Français par défaut à la première visite.
- Sélecteur de langue FR / EN / DE sur les pages publiques.
- Le choix de langue est mémorisé dans le navigateur.
- Navigation, accueil, bibliothèque, présentation de l'auteur, parcours, romans, synopsis, lecteur, likes, partage, commentaires, archives, Disclaimer, Impressum et page 404 sont traduits.
- Les traductions anglaises et allemandes ont été rédigées dans un registre littéraire naturel, et non comme une traduction mot à mot.
- Les titres des œuvres et des manuscrits restent dans leur forme originale.
- Les textes littéraires publiés, leurs extraits et leur contenu restent dans leur langue originale. Les légendes historiques des récits photographiques sont conservées telles qu’elles apparaissent dans les sources.
- En anglais et en allemand, une note discrète précise que les œuvres publiées restent dans leur langue originale.
- `posts.js` et `custom-content.js` n'ont pas été modifiés dans cette passe multilingue.


## V35 - Correctif affichage Parcours et Archives

- Correction du bug V34 pouvant rendre invisibles les cartes de la section Parcours et les liens des blogs d'origine.
- Les contenus importants restent désormais visibles même si JavaScript ou l'animation d'apparition est interrompu.
- Les animations de révélation sont maintenant un enrichissement progressif, jamais une condition d'affichage du contenu.
- Les trois langues FR, EN et DE de la V34 sont conservées, avec le français par défaut.
- Les textes littéraires publiés restent en français et ne sont pas traduits.

## V36 - Bulle de pensée éditoriale

- Grande bulle redessinée en forme de nuage organique via SVG.
- Trois bulles de liaison de taille croissante entre le portrait et la citation.
- Positionnement entièrement contenu dans la zone héro pour éviter le débordement horizontal.
- Adaptation spécifique tablette et mobile.
- Conservation des traductions FR / EN / DE de l'interface.

## V37 - Bulle de pensée

La composition du hero a été recalibrée afin que la bulle de pensée ne recouvre jamais le visage. Sur ordinateur, tablette et mobile, le portrait et la grande bulle occupent des zones distinctes. Trois petites bulles croissantes assurent la liaison visuelle entre le portrait et la pensée.

## V38 - Mise en forme des poèmes

La structure des strophes a été restaurée sur les poèmes dont les retours à la ligne avaient été aplatis ou exagérés. Le rendu des poèmes utilise maintenant de vrais blocs de strophes, avec des vers rapprochés à l'intérieur et un espacement distinct entre quatrains, tercets, distiques et dédicaces. Aucun texte littéraire n'a été réécrit dans cette passe.

## V39 - Gabarit poésie premium

Les articles de catégorie `Poèmes` utilisent désormais un gabarit de lecture distinct inspiré d'une revue littéraire : titre et métadonnées centrés, image plus contenue, colonne de lecture plus étroite, respiration renforcée entre les strophes, informations secondaires repoussées après le texte et adaptation dédiée mobile. Les mots, vers et strophes des poèmes ne sont pas modifiés par cette passe.

## V40 - Lecture éditoriale premium

- Nouvelles : justification éditoriale sur ordinateur avec césure française, largeur de ligne maîtrisée et retraits de paragraphes inspirés du livre.
- Mobile : retour automatique à l'alignement à gauche afin d'éviter les grands blancs entre les mots.
- Chroniques : composition de type revue littéraire, alignée à gauche.
- Histoires de voyage : prose aérée et images intégrées plus généreusement.
- Mode lecture : recentrage complet, disparition des éléments secondaires et outils de lecture conservés dans une barre flottante discrète.
- Le corps des œuvres reste explicitement en français pour que la césure typographique soit correcte même lorsque l'interface est en anglais ou en allemand.
- Aucun contenu littéraire n'a été modifié dans cette version.

## V41 - correctif du mode lecture

Correction d'un conflit CSS introduit par la V40 : le rail de métadonnées (Publié, Catégorie, Lecture) pouvait redevenir visible en mode lecture et se superposer au texte. Il est désormais retiré du flux avec `display: none !important` lorsque le mode lecture est actif. Aucun texte littéraire n'a été modifié.

## V42 - SEO, mobile, performance et accessibilité

Cette version transforme les 44 publications historiques en pages statiques individuelles sous `textes/<slug>/` tout en conservant `article.html?id=...` comme solution de compatibilité pour les contenus ajoutés ultérieurement via l'atelier.

Principales évolutions :
- 44 URL propres et stables, par exemple `textes/le-souffle-d-or/`.
- métadonnées SEO et sociales propres à chaque texte : titre, description, image, URL canonique, date, catégorie et données structurées BlogPosting.
- contenu littéraire pré-rendu dans chaque page HTML pour rester lisible et indexable même sans JavaScript.
- sitemap et robots.txt alignés sur `https://chroniques.guybeaho.com/`.
- fichier CNAME inclus pour le domaine personnalisé GitHub Pages.
- liens internes, précédent/suivant et recommandations basculés vers les nouvelles URL.
- dimensions d'images ajoutées pour limiter les décalages de mise en page.
- chargement prioritaire de l'image principale et chargement différé des images secondaires.
- cibles tactiles renforcées, navigation mobile et contrôles de lecture affinés.
- styles de contraste forcé et robustesse clavier améliorés.
- aucun contenu littéraire de `posts.js` n'a été modifié.


## V43 - récits photographiques de voyage

- Ajout de 13 publications historiques de la série photographique de 2015, pour un total de 57 publications.
- `Shanghai (Dec)` reste distinct de `Carnet de voyages : Shanghai`.
- 67 photographies ont été extraites fidèlement des captures d’archive fournies par l’auteur, dans l’ordre documenté et avec les légendes d’origine.
- Les fichiers image originaux de l’ancien blog n’ayant pas pu être récupérés de façon fiable, aucune image de substitution n’a été inventée.
- Galeries locales WebP, pages statiques, SEO, sitemap, recherche, filtres, navigation et compteurs mis à jour.
- Aucun texte littéraire préexistant n’a été réécrit.
