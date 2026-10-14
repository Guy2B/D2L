import {json,titles,bodyJSON,mustDB} from '../_lib/auth.js';
export async function onRequestPost({request,env}){
 try{
  const b=await bodyJSON(request),book=String(b.book_id||''),name=String(b.name||'').trim(),email=String(b.email||'').trim().toLowerCase(),message=String(b.message||'').trim();
  if(!titles[book]||name.length<2||name.length>120||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||message.length>2000)return json({error:'Vérifiez le formulaire'},400);
  if(b.website)return json({ok:true}); // honeypot
  if(!env.TURNSTILE_SECRET)return json({error:'Protection anti-spam non configurée'},503);
  const remote=request.headers.get('CF-Connecting-IP')||'';
  const form=new FormData();form.append('secret',env.TURNSTILE_SECRET);form.append('response',String(b.turnstile_token||''));form.append('remoteip',remote);
  const chk=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:form});const ans=await chk.json();if(!ans.success)return json({error:'Vérification anti-spam échouée'},403);
  const db=mustDB(env);await db.prepare("INSERT INTO d2l_requests(id,name,email,book_id,message,status,created_at,updated_at) VALUES(?,?,?,?,?,'pending',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)").bind(crypto.randomUUID(),name,email,book,message).run();
  return json({ok:true,message:'Demande enregistrée. Elle sera examinée personnellement.'},201);
 }catch(e){return json({error:'Demande non enregistrée : '+e.message},503)}
}
