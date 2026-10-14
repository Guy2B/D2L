import {verifyAccess,json} from './_lib/auth.js';
export async function onRequest(context){
 const path=new URL(context.request.url).pathname;
 if(!path.startsWith('/api/admin/') && path!=='/api/publish-book')return context.next();
 try{await verifyAccess(context.request,context.env);}catch{return json({error:'Connexion administrateur non vérifiée.'},403);}
 return context.next();
}
