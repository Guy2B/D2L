# D2L Atelier Premium — intégration fonctionnelle sécurisée

## Ce qui est inclus
- Atelier V6 conservé : brouillons, couvertures, prévisualisation, export, publication GitHub conditionnelle.
- Nouvelle rubrique **Gestion des lecteurs** : demandes D1, génération d’invitations réelles, modèles d'e-mails, suivi synthétique.
- Pages Functions : `functions/api/admin/overview.js`, `manage.js`, `send.js`, `functions/api/request-access.js`.
- `schema-d2l-premium.sql` pour deux nouvelles tables dans **la base D1 existante `d2l-reader-db`** ; aucune table existante supprimée.

## Étapes AVANT mise en ligne (à faire dans cet ordre)
1. Remplacer le jeton GitHub qui était visible sur une capture. Le nouveau doit être un secret côté serveur.
2. Vérifier les vraies colonnes D1 de la table `readers` (`PRAGMA table_info(readers)`) et `reading_access` avant la première invitation. Notre requête insère `readers(id,status)` ; si des colonnes obligatoires supplémentaires existent, l'adapter. **Ne pas lancer de migration sur ces tables existantes**.
3. Dans Cloudflare Pages > `d2l-atelier` > Settings > Bindings : **lier `DB` à `d2l-reader-db`** dans l'environnement de test. Ne pas lier le bucket R2 au site public.
4. Exécuter `schema-d2l-premium.sql` sur cette base D1. Sauvegarder la base avant la première utilisation.
5. Cloudflare Access : configurer `CF_ACCESS_TEAM_DOMAIN`, `CF_ACCESS_AUD`, `ADMIN_EMAIL` pour **Preview et Production**. Ils sont requis pour valider la signature, l'émetteur, l'audience et l'adresse e-mail. Tant que ces valeurs manquent, les API refusent l’accès.
6. Pour les e-mails, renseigner `RESEND_API_KEY` (Secret), `EMAIL_FROM` (adresse vérifiée chez Resend). Aucune clé API dans GitHub.
7. Pour le formulaire public : utiliser `TURNSTILE_SECRET` (Secret serveur) et la clé de site publique Turnstile côté formulaire. **Important** : `functions/api/request-access.js` dans ce paquet est sur le domaine de l'Atelier, qui est protégé par Access ; un visiteur du site public ne peut pas appeler cette URL. Déployer séparément cette fonction sur le domaine public (ou via un Worker public limité au seul endpoint) et ajouter les boutons/formulaire à la section des sept romans. Ne PAS retirer Access de `atelier.guybeaho.com`.
8. Test complet sur branche GitHub de test : demande Turnstile -> ligne D1 -> acceptation -> invitation D1 -> envoi Resend -> activation privée. Ne pas utiliser de données personnelles réelles pour le premier test.

## Limites honnêtes
- Aucun e-mail n’est envoyé sans `RESEND_API_KEY` et `EMAIL_FROM` vérifiés.
- La création d’invitations exige que la structure actuelle des tables `readers`, `reading_access`, `invitations` soit conforme. Le lien est affiché **une seule fois**, sinon il faut régénérer une invitation.
- Les statistiques disponibles : demandes, statuts, invitations, activations et lecteurs ; **pas de taux de pages lues** car la liseuse ne les collecte pas.
- L'accès auteur permanent à la liseuse n'est pas livré : son Worker nécessite une modification spécifique et distincte. Il ne faut pas contourner l’expiration des invitations existantes.
- Le formulaire public de votre ancien site utilisait un `mailto:` ; il doit être remplacé par une vraie transmission HTTPS au nouvel endpoint public.
- La publication GitHub de V6 nécessite toujours les variables et la vérification Access ; elle ne doit jamais publier le manuscrit complet.

## Sécurité
Tous les chemins `/api/admin/*` sont contrôlés par signature JWT Cloudflare Access avant d'accéder aux données. Les clés privées restent dans les secrets Cloudflare. Ne publiez jamais ce ZIP dans le dépôt **public** D2L ; le code des fonctions va dans `d2l-atelier` privé. Les jetons d'invitation ne doivent être ni mis dans des logs ni copiés dans des captures.
