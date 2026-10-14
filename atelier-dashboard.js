/* D2L Atelier — fonctions de présentation, sans accès aux données privées. */
(()=>{'use strict';
const books=[['dailleurs','D’ailleurs…'],['es1','E.S. I — L’eau qui dort'],['es2','E.S. II — Résurgence à Java'],['es3','E.S. III — 47 Secondes'],['es4','E.S. IV — Le chemin'],['ijsj','Il ne saura jamais'],['qcd','Qu’est-ce qui demeure']];
const templates={
 accepted:{subject:'Votre accès privé à la lecture — {roman}',body:'Bonjour,\n\nVotre demande de lecture de « {roman} » a été acceptée.\n\nVoici votre lien d’invitation personnel :\n{lien}\n\nActivez votre invitation dans les 15 jours. Votre accès à la lecture sera ensuite valable 10 jours.\n\nBonne lecture,\nDie 2 Lap'},
 receipt:{subject:'Votre demande de lecture — {roman}',body:'Bonjour,\n\nJ’ai bien reçu votre demande pour « {roman} ». Je vous répondrai après examen de votre demande.\n\nMerci pour votre intérêt,\nDie 2 Lap'},
 declined:{subject:'Votre demande de lecture — {roman}',body:'Bonjour,\n\nMerci pour votre intérêt pour « {roman} ». Je ne peux pas donner suite à votre demande pour le moment.\n\nBien cordialement,\nDie 2 Lap'},
 reminder:{subject:'Rappel : activez votre invitation — {roman}',body:'Bonjour {prenom},\n\nVotre invitation pour « {roman} » attend son activation. Utilisez uniquement le lien personnel reçu dans votre invitation initiale.\n\nBien cordialement,\nDie 2 Lap'},
 expired:{subject:'Votre accès à « {roman} » a expiré',body:'Bonjour {prenom},\n\nVotre période de lecture de « {roman} » est terminée. Si vous souhaitez demander un nouvel accès, vous pouvez me répondre.\n\nBien cordialement,\nDie 2 Lap'}
};
const get=id=>document.getElementById(id);
function init(){const catalog=get('dash-catalog'),book=get('dash-book');if(!book)return;
for(const [id,title] of books){book.add(new Option(title,id));const item=document.createElement('div');item.className='dash-item';const strong=document.createElement('strong');strong.textContent=title;const desc=document.createElement('p');desc.textContent='Identifiant D1 : '+id+' · synopsis à relier à votre catalogue du site.';item.append(strong,desc);catalog.append(item)}
const search=document.getElementById('premium-search-book');if(search)search.addEventListener('input',()=>{const q=search.value.trim().toLocaleLowerCase('fr');Array.from(catalog.children).forEach(card=>card.hidden=!card.textContent.toLocaleLowerCase('fr').includes(q))});
function update(){const title=books.find(x=>x[0]===book.value)?.[1]||books[0][1];const tpl=templates[get('dash-template').value];const prenom=get('dash-reader-name').value.trim()||'[Prénom]';get('dash-subject').value=tpl.subject.replaceAll('{roman}',title);get('dash-message').value=tpl.body.replaceAll('{roman}',title).replaceAll('{prenom}',prenom).replaceAll('{lien}','[LIEN PERSONNEL NON GÉNÉRÉ — connexion Cloudflare nécessaire]')}
get('dash-template').addEventListener('change',update);book.addEventListener('change',update);get('dash-reader-name').addEventListener('input',update);update();
get('dash-copy-email').addEventListener('click',async()=>{if(get('dash-template').value==='accepted'){get('dash-email-feedback').textContent='Invitation non générée : la copie du modèle d’acceptation est bloquée tant que le lien personnel manque.';return;}const s=get('dash-subject').value+'\n\n'+get('dash-message').value;try{await navigator.clipboard.writeText(s);get('dash-email-feedback').textContent='Message copié.'}catch{get('dash-email-feedback').textContent='La copie est indisponible dans ce navigateur.'}});
get('dash-open-email').addEventListener('click',()=>{if(get('dash-template').value==='accepted'){get('dash-email-feedback').textContent='Envoi bloqué : aucun lien personnel n’a été généré.';return;}const recipient=get('dash-reader-email').value.trim();if(recipient&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)){get('dash-email-feedback').textContent='Vérifiez l’adresse du lecteur.';return;}const subject=encodeURIComponent(get('dash-subject').value),body=encodeURIComponent(get('dash-message').value);location.href='mailto:'+encodeURIComponent(recipient)+'?subject='+subject+'&body='+body});
for(const jump of document.querySelectorAll('[data-jump]'))jump.addEventListener('click',()=>document.querySelector('.studio-tab[data-tab="'+jump.dataset.jump+'"]')?.click());
}
document.addEventListener('DOMContentLoaded',init);
})();
