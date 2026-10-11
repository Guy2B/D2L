# Protection minimale GitHub - V64

Le workflow `.github/workflows/validate-site.yml` vérifie la syntaxe JavaScript et les liens/assets locaux.

Pour rendre le contrôle obligatoire : GitHub > Settings > Rules > Rulesets (ou Branches), cibler `main`, bloquer les force-push/suppressions, demander une Pull Request et activer `Require status checks to pass`.

La règle de protection elle-même est un réglage GitHub et ne peut pas être activée par les fichiers du site.
