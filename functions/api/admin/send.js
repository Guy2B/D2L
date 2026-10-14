import {json,mustDB,bodyJSON,titles} from '../../_lib/auth.js';
export async function onRequestPost({request,env}){
 try{
  if(!env.RESEND_API_KEY||!env.EMAIL_FROM)return json({error:'E-mails non configurés : RESEND_API_KEY et EMAIL_FROM requis.'},503);
  const d=await bodyJSON(request);if(!/^[a-f0-9-]{36}$/.test(String(d.id||'')))return json({error:'Demande inconnue'},400);
  const db=mustDB(env),item=await db.prepare('SELECT * FROM d2l_requests WHERE id=?').bind(d.id).first();if(!item)return json({error:'Demande inconnue'},404);
  const subject=String(d.subject||'').trim(),message=String(d.message||'').trim();
  if(subject.length<4||subject.length>170||message.length<10||message.length>8000)return json({error:'Message invalide'},400);
  if(d.kind==='accepted'){
    if(item.status!=='invited'||!item.invitation_id||!/^https:\/\/d2l-reader-api\.guybeaho\.workers\.dev\/invite#[A-Za-z0-9_-]{43}$/.test(d.invite_url||'')||!message.includes(d.invite_url))return json({error:'Générez d’abord une invitation personnelle et incluez son lien.'},409);
  }
  if(!['accepted','declined','receipt','other'].includes(d.kind))return json({error:'Modèle invalide'},400);
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:env.EMAIL_FROM,to:[item.email],subject,text:message})});
  const result=await response.json().catch(()=>({}));if(!response.ok)return json({error:'Envoi refusé par le fournisseur e-mail ('+response.status+').'},502);
  await db.prepare('INSERT INTO d2l_mail_log(id,request_id,kind,subject,provider_id,created_at) VALUES(?,?,?,?,?,CURRENT_TIMESTAMP)').bind(crypto.randomUUID(),item.id,d.kind,subject,result.id||null).run();
  return json({ok:true,provider_id:result.id||null});
 }catch(e){return json({error:'Envoi impossible : '+e.message},503)}
}
