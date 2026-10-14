import {json,mustDB,titles} from '../../_lib/auth.js';
export async function onRequestGet({env}){
 try{const db=mustDB(env);const [requests,readers,invitations,bookRequests,recent]=await Promise.all([
 db.prepare('SELECT status,COUNT(*) total FROM d2l_requests GROUP BY status').all(),
 db.prepare('SELECT COUNT(*) total FROM readers').first(),
 db.prepare("SELECT COUNT(*) total, SUM(CASE WHEN first_opened_at IS NOT NULL THEN 1 ELSE 0 END) activated FROM invitations").first(),
 db.prepare('SELECT book_id,COUNT(*) total FROM d2l_requests GROUP BY book_id ORDER BY total DESC').all(),
 db.prepare('SELECT id,name,email,book_id,status,created_at,message FROM d2l_requests ORDER BY created_at DESC LIMIT 70').all()
 ]);return json({ok:true,requests:requests.results||[],readers:readers.total||0,invitations:invitations||{},bookRequests:(bookRequests.results||[]).map(x=>({...x,title:titles[x.book_id]||x.book_id})),recent:recent.results||[]});
 }catch(e){return json({error:'Statistiques indisponibles : '+e.message},503)}
}
