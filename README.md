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
