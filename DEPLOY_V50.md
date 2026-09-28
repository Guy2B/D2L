# V50 - paquet de déploiement

Cette version reprend strictement le contenu de la V49. La modification concerne la structure de livraison afin qu'elle corresponde directement à la racine du dépôt `D2L`.

Les images du site sont physiquement présentes dans `assets/`, et les 67 photographies des récits de voyage sont dans :

`assets/articles/voyages/`

Les pages individuelles restent dans `textes/` et leurs chemins relatifs pointent vers `../../assets/...`.

Le ZIP `D2L-v50-deploy.zip` ne contient pas de dossier intermédiaire `site-v49/` : il est conçu pour être extrait directement dans la racine du dépôt D2L.
