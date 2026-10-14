// Identité administrateur vérifiée avec signature RSA Cloudflare Access.
const b64url = str => Uint8Array.from(atob(str.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - str.length % 4) % 4)), c => c.charCodeAt(0));
const dec = str => new TextDecoder().decode(b64url(str));
export async function verifyAccess(request, env) {
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

export const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','Referrer-Policy':'no-referrer'}});
export function mustDB(env){if(!env.DB)throw Error('Liaison D1 DB absente');return env.DB;}
export const titles={dailleurs:'D’ailleurs…',es1:'E.S. I — L’eau qui dort',es2:'E.S. II — Résurgence à Java',es3:'E.S. III — 47 Secondes',es4:'E.S. IV — Le chemin',ijsj:'Il ne saura jamais',qcd:'Qu’est-ce qui demeure'};
export async function bodyJSON(request){if(Number(request.headers.get('content-length')||0)>12000)throw Error('Requête trop grande');const txt=await request.text();if(txt.length>12000)throw Error('Requête trop grande');return JSON.parse(txt);}
