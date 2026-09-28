# État V31

L’URL Apps Script est déjà configurée dans cette version. Vous n’avez plus à modifier `likes-config.js`. Pour vérifier le fonctionnement, ouvrez un article depuis le site publié, cliquez sur J’aime, puis contrôlez que la ligne correspondante apparaît ou se met à jour dans l’onglet `Likes` du Google Sheet.

# Activer les Likes globaux avec Google Sheets

Le site V30 fonctionne immédiatement. Tant que l'URL Google Apps Script n'est pas renseignée, les Likes restent locaux au navigateur comme dans la V29.

Pour activer un compteur commun à tous les visiteurs :

1. Créez une feuille Google Sheets vide, par exemple `Chroniques d'ailleurs - Likes`.
2. Dans cette feuille, ouvrez **Extensions > Apps Script**.
3. Remplacez le contenu de `Code.gs` par le contenu du fichier `GOOGLE_LIKES_CODE.gs` fourni dans ce dossier.
4. Enregistrez le projet.
5. Dans Apps Script, choisissez la fonction `setupLikesSheet`, puis cliquez sur **Exécuter** une seule fois. Google demandera l'autorisation d'accéder à la feuille.
6. Déployez ensuite le script comme **Application Web / Web app** :
   - exécuter en tant que : **vous-même** ;
   - accès : **Tout le monde / Anyone** ;
   - créez le déploiement.
7. Copiez l'URL qui se termine par `/exec`.
8. Ouvrez `likes-config.js` dans le site et collez cette URL :

```js
window.D2L_LIKES_CONFIG = {
  endpoint: "https://script.google.com/macros/s/VOTRE_IDENTIFIANT/exec"
};
```

9. Remettez le site sur GitHub Pages.

## Test rapide

Ouvrez un article du site. Son compteur doit se charger depuis la feuille. Cliquez sur `J'aime` puis regardez la feuille `Likes` : une ligne correspondant au texte doit apparaître avec le compteur.

## Ce que stocke la feuille

La feuille contient uniquement :

- l'identifiant technique du texte ;
- son titre ;
- le nombre de Likes ;
- la date de dernière modification.

Le système ne stocke pas de nom, d'adresse e-mail, de compte social ou d'adresse IP.

## Limite volontaire

Ce système est dimensionné pour un petit site littéraire. Le navigateur mémorise localement si le lecteur a aimé le texte. Cela évite les doubles clics ordinaires, mais ce n'est pas un système anti-fraude. Pour un blog à faible trafic, c'est une solution simple et proportionnée.
