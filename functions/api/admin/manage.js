import {json,mustDB,bodyJSON,titles} from '../../_lib/auth.js';
const token=()=>btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const hash=async t=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t)))].map(b=>b.toString(16).padStart(2,'0')).join('');
export async function onRequestPost({request,env}){
 try{
  const data=await bodyJSON(request),db=mustDB(env),action=data.action,id=String(data.id||'');
  if(!/^[a-f0-9-]{36}$/.test(id))return json({error:'Identifiant invalide'},400);
  const req=await db.prepare('SELECT * FROM d2l_requests WHERE id=?').bind(id).first();if(!req)return json({error:'Demande introuvable'},404);
  if(action==='decline'){
   await db.prepare("UPDATE d2l_requests SET status='refused',updated_at=CURRENT_TIMESTAMP WHERE id=? AND status IN ('pending','refused')").bind(id).run();return json({ok:true,status:'refused'});
  }
  if(action!=='invite')return json({error:'Action inconnue'},400);
  if(req.status==='invited')return json({error:'Invitation déjà créée pour cette demande. Utilisez un nouveau processus en cas de perte du lien.'},409);
  if(!titles[req.book_id])return json({error:'Roman inconnu'},400);
  const readerId='d2l-'+req.id;
  // Schéma de la liseuse existante : readers(id,status), reading_access(reader_id,book_id,granted_at,...)
  await db.prepare("INSERT OR IGNORE INTO readers(id,status) VALUES(?,'active')").bind(readerId).run();
  await db.prepare("UPDATE readers SET status='active' WHERE id=?").bind(readerId).run();
  await db.prepare("INSERT INTO reading_access(reader_id,book_id,granted_at) SELECT ?,?,CURRENT_TIMESTAMP WHERE NOT EXISTS(SELECT 1 FROM reading_access WHERE reader_id=? AND book_id=? AND revoked_at IS NULL)").bind(readerId,req.book_id,readerId,req.book_id).run();
  const raw=token(),hashed=await hash(raw),iid=crypto.randomUUID();
  await db.prepare("INSERT INTO invitations(id,reader_id,token_hash,channel,created_at,expires_at) VALUES(?,?,?,'email',datetime('now'),datetime('now','+15 days'))").bind(iid,readerId,hashed).run();
  await db.prepare("UPDATE d2l_requests SET status='invited',reader_id=?,invitation_id=?,updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(readerId,iid,id).run();
  // Le jeton n'est pas enregistré en clair en base : affichage unique, jamais en log.
  return json({ok:true,request_id:id,invite_url:'https://d2l-reader-api.guybeaho.workers.dev/invite#'+raw,title:titles[req.book_id],name:req.name,email:req.email,valid_days:15,reading_days:10});
 }catch(e){return json({error:'Opération non effectuée : '+e.message},503)}
}
