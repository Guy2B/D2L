// Cloudflare Pages Function, jamais côté navigateur.
// Secrets attendus : GITHUB_TOKEN, CF_ACCESS_TEAM_DOMAIN, CF_ACCESS_AUD, ADMIN_EMAIL.
// Variables : GITHUB_OWNER=Guy2B, GITHUB_REPO=D2L, GITHUB_BRANCH=main.
const respond = (body, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const b64url = str => Uint8Array.from(atob(str.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - str.length % 4) % 4)), c => c.charCodeAt(0));
const dec = str => new TextDecoder().decode(b64url(str));
async function verifyAccess(request, env) {
  const jwt = request.headers.get("Cf-Access-Jwt-Assertion");
  const team = String(env.CF_ACCESS_TEAM_DOMAIN || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (!jwt || !team || !env.CF_ACCESS_AUD || !env.ADMIN_EMAIL) throw Error("Authentification Cloudflare Access indisponible");
  const parts = jwt.split(".");
  if (parts.length !== 3) throw Error("Jeton d’accès invalide");
  const header = JSON.parse(dec(parts[0]));
  const claims = JSON.parse(dec(parts[1]));
  if (header.alg !== "RS256" || !header.kid) throw Error("Signature incompatible");
  const certResponse = await fetch(`https://${team}/cdn-cgi/access/certs`, { cf: { cacheTtl: 1800, cacheEverything: true } });
  if (!certResponse.ok) throw Error("Vérification Access impossible");
  const certs = await certResponse.json();
  const jwk = (certs.keys || []).find(k => k.kid === header.kid && k.kty === "RSA");
  if (!jwk) throw Error("Clé de signature inconnue");
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const valid = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64url(parts[2]), new TextEncoder().encode(parts[0] + "." + parts[1]));
  const now = Date.now() / 1000;
  const aud = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  const issuer = `https://${team}`;
  if (!valid || claims.iss !== issuer || !aud.includes(env.CF_ACCESS_AUD) || !Number.isFinite(claims.exp) || claims.exp <= now || !claims.iat || claims.iat > now + 120 || String(claims.email || "").toLowerCase() !== String(env.ADMIN_EMAIL).toLowerCase()) {
    throw Error("Accès administrateur non autorisé");
  }
}
function extractJson(source, name, fallback) {
  const marker = `window.${name}`;
  const start = source.indexOf(marker);
  if (start === -1) throw Error("Fichier public incompatible : " + name);
  const str = source.slice(start + marker.length);
  const assignment = str.match(/^\s*=\s*/);
  if (!assignment) throw Error("Définition incompatible : " + name);
  const part = str.slice(assignment[0].length);
  // Accepte l'initialisation d'origine ou une exportation JSON de l'Atelier.
  if (part.startsWith(`window.${name} || `)) return fallback;
  const first = part.search(/[\[{]/);
  if (first !== 0) throw Error("Format de contenu inconnu : " + name);
  // JSON.parse sur une structure délimitée en tenant compte des chaînes et de l'imbrication.
  let depth = 0, quote = false, escaped = false;
  for (let i = 0; i < part.length; i++) {
    const ch = part[i];
    if (quote) { if (escaped) escaped = false; else if (ch === "\\") escaped = true; else if (ch === '"') quote = false; continue; }
    if (ch === '"') { quote = true; continue; }
    if (ch === "[" || ch === "{") depth++;
    if (ch === "]" || ch === "}") { depth--; if (depth === 0) return JSON.parse(part.slice(0, i + 1)); }
  }
  throw Error("Fichier public illisible : " + name);
}
function validBook(key, book) {
  if (typeof key !== "string" || !/^[a-z0-9-]{2,90}$/.test(key) || !book || typeof book !== "object" || Array.isArray(book)) return false;
  if (typeof book.title !== "string" || book.title.trim().length < 2 || book.title.length > 160) return false;
  if (!Array.isArray(book.paragraphs) || !book.paragraphs.length || book.paragraphs.length > 50 || book.paragraphs.some(p => typeof p !== "string" || p.length > 8000)) return false;
  const cleanBook = {...book}; delete cleanBook.coverImage;
  const cover=book.coverImage;
  if (cover !== undefined && (typeof cover !== "string" || !/^data:image\/webp;base64,[a-zA-Z0-9+/=]+$/.test(cover) || cover.length>450000)) return false;
  return JSON.stringify(cleanBook).length <= 55000;
}
export async function onRequestPost({ request, env }) {
  try { await verifyAccess(request, env); }
  catch { return respond({ ok: false, error: "Accès administrateur non vérifié. Contrôlez la configuration Cloudflare Access." }, 403); }
  if (!env.GITHUB_TOKEN || !env.GITHUB_OWNER || !env.GITHUB_REPO || !env.GITHUB_BRANCH) return respond({ ok: false, error: "Connexion GitHub non configurée sur Cloudflare Pages." }, 503);
  let payload;
  try { payload = await request.json(); } catch { return respond({ok:false,error:"Requête invalide."},400); }
  const { key, book } = payload || {};
  if (!validBook(key, book)) return respond({ok:false,error:"Fiche roman incomplète ou invalide."},400);
  const owner = encodeURIComponent(env.GITHUB_OWNER), repo = encodeURIComponent(env.GITHUB_REPO);
  const api = `https://api.github.com/repos/${owner}/${repo}`;
  const headers = { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "D2L-Atelier-Private", "Content-Type": "application/json" };
  async function github(path, options={}) {
    const response=await fetch(`${api}${path}`, {headers,...options});
    if (!response.ok) throw Error(`GitHub ${response.status} sur ${path.split("?")[0]}`);
    return response.json();
  }
  try {
    const branch=env.GITHUB_BRANCH;
    if (!/^[a-zA-Z0-9._/-]+$/.test(branch) || branch.includes("..")) throw Error("Branche invalide");
    const ref=await github(`/git/ref/heads/${branch}`);
    const parent=await github(`/git/commits/${ref.object.sha}`);
    const file=await github(`/contents/custom-content.js?ref=${encodeURIComponent(branch)}`);
    const source = new TextDecoder().decode(Uint8Array.from(atob(file.content.replace(/\s/g, "")), c=>c.charCodeAt(0)));
    const posts=extractJson(source,"CUSTOM_POSTS",[]);
    const books=extractJson(source,"CUSTOM_BOOKS",{});
    if (!Array.isArray(posts) || !books || typeof books!=="object" || Array.isArray(books)) throw Error("Catalogue invalide");
    if (Object.hasOwn(books,key)) return respond({ok:false,error:"Ce roman est déjà publié : aucune modification effectuée."},409);
    const savedBook={...book,custom:true};
    let coverEntry=null;
    if (savedBook.coverImage) {
      const base64=savedBook.coverImage.slice("data:image/webp;base64,".length);
      const coverBlob=await github('/git/blobs', {method:'POST',body:JSON.stringify({content:base64,encoding:'base64'})});
      const coverPath=`assets/books/atelier-${key}.webp`;
      coverEntry={path:coverPath,mode:'100644',type:'blob',sha:coverBlob.sha};
      savedBook.coverImage=coverPath;
    }
    books[key]=savedBook;
    const content=`/* Catalogue Atelier — publication sécurisée */\nwindow.CUSTOM_POSTS = ${JSON.stringify(posts,null,2)};\nwindow.CUSTOM_BOOKS = ${JSON.stringify(books,null,2)};\n`;
    const jsBlob=await github('/git/blobs',{method:'POST',body:JSON.stringify({content,encoding:'utf-8'})});
    const tree=[{path:'custom-content.js',mode:'100644',type:'blob',sha:jsBlob.sha}];
    if(coverEntry) tree.push(coverEntry);
    const nextTree=await github('/git/trees',{method:'POST',body:JSON.stringify({base_tree:parent.tree.sha,tree})});
    const commit=await github('/git/commits',{method:'POST',body:JSON.stringify({message:`Atelier : publier ${book.title} avec couverture`,tree:nextTree.sha,parents:[ref.object.sha]})});
    await github(`/git/refs/heads/${branch}`,{method:'PATCH',body:JSON.stringify({sha:commit.sha,force:false})});
    return respond({ok:true,message:"Commit créé : fiche et couverture publiées ensemble.",commit:commit.sha});

  } catch(e) { return respond({ok:false,error:"Publication impossible : " + String(e.message).slice(0,180)},500); }
}
