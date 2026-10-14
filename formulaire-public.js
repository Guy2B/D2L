// D2L : ce script est à inclure UNIQUEMENT dans le site public Chroniques, pas dans l'Atelier.
(()=>{'use strict';const titles={dailleurs:'D’ailleurs…',es1:'E.S. I — L’eau qui dort',es2:'E.S. II — Résurgence à Java',es3:'E.S. III — 47 Secondes',es4:'E.S. IV — Le chemin',ijsj:'Il ne saura jamais',qcd:'Qu’est-ce qui demeure'};
// L'installation du site public nécessite une route publique sur son propre domaine ou un proxy CORS strict.
// Aucun envoi mailto ni transmission directe à D1 depuis le navigateur.
window.D2LReaderRequest={titles,endpoint:'/api/request-access'};
})();
