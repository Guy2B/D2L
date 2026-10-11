from pathlib import Path
import re, sys
ROOT=Path(__file__).resolve().parents[1]
missing=[]
html_files=[p for p in ROOT.rglob("*.html") if ".git" not in p.parts]
attr=re.compile(r"(?:src|href)=[\"\']([^\"\'#?]+)", re.I)
for page in html_files:
    text=page.read_text(encoding="utf-8", errors="ignore")
    for ref in attr.findall(text):
        if re.match(r"^(?:https?:|mailto:|tel:|data:|javascript:|//)", ref, re.I): continue
        target=(page.parent/ref).resolve()
        try: target.relative_to(ROOT.resolve())
        except ValueError: continue
        if ref.endswith("/"): target=target/"index.html"
        if not target.exists(): missing.append((page.relative_to(ROOT),ref))
checks={
 "57 dossiers textes": len([p for p in (ROOT/"textes").iterdir() if p.is_dir()])==57,
 "7 romans HTML initial": '<strong id="stat-books">7</strong>' in (ROOT/"index.html").read_text(encoding="utf-8"),
 "Dailleurs": 'title: "D’ailleurs…"' in (ROOT/"script.js").read_text(encoding="utf-8"),
 "226 pages / 56 359 mots": '226 pages / 56 359 mots' in (ROOT/"script.js").read_text(encoding="utf-8"),
 "couverture Dailleurs": (ROOT/"assets/books/dailleurs-cover.webp").exists(),
 "audit licences": (ROOT/"IMAGE_LICENSE_AUDIT_V64.md").exists(),
 "workflow": (ROOT/".github/workflows/validate-site.yml").exists(),
}
if missing:
    print("LIENS/ASSETS LOCAUX MANQUANTS:")
    for page,ref in missing: print(f"- {page}: {ref}")
for name,ok in checks.items(): print(("OK" if ok else "ECHEC")+" - "+name)
if missing or not all(checks.values()): sys.exit(1)
print(f"OK - {len(html_files)} pages HTML controlees.")
