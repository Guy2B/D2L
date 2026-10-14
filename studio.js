(() => {
  "use strict";

  const currentYear = document.querySelector("#current-year");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  function initStudio() {
    if (initStudio.done) return;
    initStudio.done = true;

    const clone = value => typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value));
    const draftKey = "die2lap:studio-draft:v12";
    const basePosts = Array.isArray(window.CUSTOM_POSTS) ? clone(window.CUSTOM_POSTS) : [];
    const baseBooks = window.CUSTOM_BOOKS && typeof window.CUSTOM_BOOKS === "object" ? clone(window.CUSTOM_BOOKS) : {};
    let customPosts = basePosts;
    let customBooks = baseBooks;
    try {
      const saved = JSON.parse(localStorage.getItem(draftKey) || "null");
      if (saved) {
        customPosts = Array.isArray(saved.posts) ? saved.posts : basePosts;
        customBooks = saved.books && typeof saved.books === "object" ? saved.books : baseBooks;
      }
    } catch {}
    const saveDraft = () => { try { localStorage.setItem(draftKey, JSON.stringify({ posts: customPosts, books: customBooks })); return true; } catch { alert("Stockage local saturé : le brouillon n’a pas été enregistré. Essayez une image plus petite."); return false; } };

    const normalize = text => String(text || "").replace(/[—–]/g, "-");
    const slugify = value => normalize(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const tabs = [...document.querySelectorAll(".studio-tab")];
    const panels = [...document.querySelectorAll(".studio-panel")];

    function switchTab(name) {
      tabs.forEach(tab => {
        const active = tab.dataset.tab === name;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      panels.forEach(panel => panel.hidden = panel.dataset.panel !== name);
      if (name === "manage") renderList();
    }
    tabs.forEach(tab => tab.addEventListener("click", () => switchTab(tab.dataset.tab)));

    async function imageToDataUrl(file) {
      if (!file) return "";
      const source = typeof createImageBitmap === "function" ? await createImageBitmap(file) : await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });
      const width = source.width || source.naturalWidth;
      const height = source.height || source.naturalHeight;
      const max = 1600;
      const scale = Math.min(1, max / Math.max(width, height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      canvas.getContext("2d").drawImage(source, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/webp", 0.84);
    }

    document.querySelector("#post-form").addEventListener("submit", async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const title = normalize(data.get("title")).trim();
      const category = data.get("category");
      const body = normalize(data.get("body")).trim();
      const isPoem = category === "Poèmes";
      const content = isPoem
        ? [{ type: "poem", text: body }]
        : body.split(/\n\s*\n+/).map(text => ({ type: "p", text: text.trim() })).filter(block => block.text);
      const file = form.elements.image.files[0];
      const image = await imageToDataUrl(file);
      const baseId = slugify(title) || `texte-${Date.now()}`;
      let id = baseId, count = 2;
      while (customPosts.some(post => post.id === id)) id = `${baseId}-${count++}`;
      customPosts.unshift({
        id,
        category,
        date: data.get("date"),
        title,
        deck: normalize(data.get("deck")).trim(),
        baseLikes: 0,
        sourceLabel: "Chroniques d’ailleurs",
        sourceUrl: normalize(data.get("sourceUrl")).trim(),
        alsoPublished: normalize(data.get("alsoName")).trim() && normalize(data.get("alsoUrl")).trim()
          ? [{ name: normalize(data.get("alsoName")).trim(), url: normalize(data.get("alsoUrl")).trim() }]
          : [],
        content,
        image,
        imageAlt: title,
        imageCredit: normalize(data.get("credit")).trim(),
        imageMode: "cover",
        custom: true
      });
      saveDraft();
      form.reset();
      showToast(`« ${title} » a été ajouté à l’atelier.`);
      switchTab("manage");
    });

    async function optimizeCover(file) {
      if (!file) return "";
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw Error("Choisissez une image JPG, PNG ou WebP.");
      if (file.size > 8 * 1024 * 1024) throw Error("La couverture dépasse 8 Mo.");
      const url = URL.createObjectURL(file);
      try {
        const img = await new Promise((resolve, reject) => {
          const element = new Image(); element.onload=()=>resolve(element); element.onerror=()=>reject(Error("Image illisible.")); element.src=url;
        });
        if (img.naturalWidth < 200 || img.naturalHeight < 200) throw Error("Utilisez une image d’au moins 200 pixels de côté.");
        const scale = Math.min(1, 1100 / Math.max(img.naturalWidth, img.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.naturalWidth * scale); canvas.height = Math.round(img.naturalHeight * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        let quality = .80, result;
        do { result = canvas.toDataURL("image/webp", quality); quality -= .12; } while (result.length > 450000 && quality >= .40);
        if (result.length > 450000) throw Error("Image trop complexe : réduisez ses dimensions.");
        return result;
      } finally { URL.revokeObjectURL(url); }
    }
    let coverPreviewUrl = "";
    document.querySelector("#book-form").addEventListener("submit", async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const title = normalize(data.get("title")).trim();
      const keyBase = slugify(title) || `roman-${Date.now()}`;
      let key = keyBase, count = 2;
      while (customBooks[key]) key = `${keyBase}-${count++}`;
      let coverData = "";
      try { coverData = await optimizeCover(form.elements.coverFile.files[0]); }
      catch (e) { alert(e.message); return; }
      const words = normalize(data.get("words")).replace(/\D/g, "");
      const genre = normalize(data.get("genre")).trim();
      customBooks[key] = {
        order: 100 + Object.keys(customBooks).length,
        custom: true,
        ...(coverData ? { coverImage: coverData, coverAlt: normalize(data.get("coverAlt")).trim() || `Couverture de ${title}` } : {}),
        seriesES: data.get("seriesES") === "on",
        cardLabel: data.get("seriesES") === "on" ? "E.S. · achevé" : "Roman inédit · achevé",
        status: normalize(data.get("status")).trim(),
        kicker: data.get("seriesES") === "on" ? `Edmond Silla · E.S. · ${data.get("status") || "Achevé"}` : `Roman inédit · ${data.get("status") || "Achevé"}`,
        title,
        meta: `${genre}${words ? ` · environ ${Number(words).toLocaleString("fr-FR")} mots` : ""}`,
        cardText: `${genre}${words ? ` · environ ${Number(words).toLocaleString("fr-FR")} mots.` : "."}`,
        paragraphs: normalize(data.get("synopsis")).trim().split(/\n\s*\n+/).map(p => p.trim()).filter(Boolean)
      };
      if (!saveDraft()) { delete customBooks[key]; return; }
      form.reset();
      coverPreviewUrl = "";
      showToast(`Le roman « ${title} » a été ajouté à l’atelier.`);
      switchTab("manage");
    });

    // Aperçu local du roman — aucune publication automatique.
    const bookForm = document.querySelector("#book-form");
    const bookPreview = document.querySelector("#book-preview");
    function renderBookPreview() {
      if (!bookPreview) return;
      const fd = new FormData(bookForm);
      const title = String(fd.get("title") || "").trim();
      const synopsis = String(fd.get("synopsis") || "").trim();
      bookPreview.hidden = !(title || synopsis);
      bookPreview.replaceChildren();
      if (bookPreview.hidden) return;
      const label = document.createElement("small");
      label.textContent = "APERÇU AVANT PUBLICATION · NON PUBLIC";
      const heading = document.createElement("h3");
      heading.textContent = title || "Titre du futur roman";
      const genre = document.createElement("p");
      genre.textContent = String(fd.get("genre") || "");
      const chosen = bookForm.elements.coverFile.files[0];
      if (chosen && coverPreviewUrl) {
        const img = document.createElement("img"); img.src=coverPreviewUrl; img.alt="Aperçu de la couverture"; img.className="premium-cover-preview";
        bookPreview.append(img);
      }
      bookPreview.append(label, heading, genre);
      synopsis.split(/\n\s*\n/).filter(Boolean).forEach(par => {
        const p = document.createElement("p");
        p.textContent = par;
        bookPreview.appendChild(p);
      });
    }
    if (bookForm) {
      bookForm.addEventListener("input", renderBookPreview);
      bookForm.elements.coverFile.addEventListener("change", () => {
        if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
        coverPreviewUrl = bookForm.elements.coverFile.files[0] ? URL.createObjectURL(bookForm.elements.coverFile.files[0]) : "";
        renderBookPreview();
      });
    }

    function renderList() {
      const list = document.querySelector("#custom-list");
      list.replaceChildren();
      if (!customPosts.length && !Object.keys(customBooks).length) {
        const empty = document.createElement("p");
        empty.className = "studio-empty";
        empty.textContent = "Aucun nouveau contenu dans l’atelier pour le moment.";
        list.appendChild(empty);
        return;
      }
      customPosts.forEach((post, index) => list.appendChild(itemCard("Texte", post.title, post.category, () => {
        customPosts.splice(index, 1);
        saveDraft();
        renderList();
      })));
      Object.entries(customBooks).forEach(([key, book]) => {
        const card = itemCard("Roman", book.title, book.meta, () => {
          delete customBooks[key];
          saveDraft();
          renderList();
        });
        const publish = document.createElement("button");
        publish.type = "button";
        publish.className = "button button-primary premium-publish-button";
        publish.textContent = "Publier ce roman sur le site ↗";
        publish.addEventListener("click", async () => {
          const status = document.querySelector("#publish-feedback");
          if (!confirm(`Publier « ${book.title} » dans la rubrique Romans du site public ?`)) return;
          publish.disabled = true;
          publish.textContent = "Publication en cours…";
          if (status) status.textContent = "Vérification de l’accès et publication…";
          try {
            const res = await fetch("/api/publish-book", {
              method: "POST", credentials: "same-origin",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ key, book })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.ok) throw new Error(data.error || `Erreur HTTP ${res.status}`);
            if (status) status.textContent = "Roman envoyé vers GitHub. Sa publication sur le site peut prendre quelques minutes.";
            showToast(`« ${book.title} » envoyé vers GitHub.`);
          } catch (error) {
            if (status) status.textContent = "Non publié : " + (error.message || "service non configuré");
          } finally {
            publish.disabled = false;
            publish.textContent = "Publier ce roman sur le site ↗";
          }
        });
        const detail = document.createElement("div"); detail.className="premium-book-actions";
        if (book.coverImage) {
          const image = document.createElement("img"); image.className="premium-manage-cover"; image.src=book.coverImage; image.alt=book.coverAlt||"Couverture";
          detail.append(image);
        }
        const coverLabel = document.createElement("label"); coverLabel.className="button button-ghost premium-manage-label";
        coverLabel.textContent = book.coverImage ? "Remplacer la couverture" : "Ajouter une couverture";
        const coverInput = document.createElement("input"); coverInput.type="file"; coverInput.accept="image/jpeg,image/png,image/webp"; coverInput.hidden=true;
        coverInput.addEventListener("change", async () => {
          try {
            const data = await optimizeCover(coverInput.files[0]); if (!data) return;
            const previous=book.coverImage; book.coverImage=data; book.coverAlt=book.coverAlt||`Couverture de ${book.title}`;
            if (!saveDraft()) { book.coverImage=previous; return; }
            renderList(); showToast("Couverture enregistrée dans le brouillon.");
          } catch(e) { alert(e.message); }
        });
        coverLabel.append(coverInput); detail.append(coverLabel);
        if (book.coverImage) {
          const del=document.createElement("button"); del.className="button button-ghost"; del.type="button"; del.textContent="Retirer l’image";
          del.addEventListener("click",()=>{ if (!confirm("Retirer la couverture de ce brouillon ?")) return; delete book.coverImage; delete book.coverAlt; saveDraft();renderList();});detail.append(del);
        }
        const sectionLabel = document.createElement("label");sectionLabel.className="button button-ghost premium-manage-label";
        sectionLabel.textContent="3. Préparer les chapitres privés (.json)";
        const sectionInput=document.createElement("input"); sectionInput.type="file";sectionInput.accept="application/json,.json";sectionInput.hidden=true;
        sectionInput.addEventListener("change",async()=>{
          const file=sectionInput.files[0];if(!file)return;
          try {
            if(file.size>4*1024*1024)throw Error("Fichier trop volumineux (4 Mo maximum). Fractionnez vos sections.");
            const data=JSON.parse(await file.text());
            if(!Array.isArray(data.sections)||!data.sections.length||data.sections.length>100||data.sections.some(x=>!x||typeof x.title!=="string"||!Array.isArray(x.blocks)||!x.blocks.length))throw Error("Format attendu : { sections: [{ title, blocks: [...] }] }.");
            const status=document.querySelector("#publish-feedback");
            if(status)status.textContent=`${data.sections.length} section(s) vérifiée(s) pour « ${book.title} ». Aucun texte n’a été envoyé. L’import R2/D1 nécessite la connexion serveur sécurisée.`;
          } catch(e) { alert("Import non effectué : "+e.message); }
        });sectionLabel.append(sectionInput); detail.append(sectionLabel);
        card.append(detail, publish);
        list.appendChild(card);
      });
    }

    function itemCard(type, title, meta, remove) {
      const div = document.createElement("div");
      div.className = "custom-item";
      const copy = document.createElement("div");
      copy.innerHTML = `<small>${type}</small><strong></strong><span></span>`;
      copy.querySelector("strong").textContent = title;
      copy.querySelector("span").textContent = meta;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "text-button";
      button.textContent = "Retirer";
      button.addEventListener("click", remove);
      div.append(copy, button);
      return div;
    }

    const postForm = document.querySelector("#post-form");
    const previewBox = document.querySelector("#post-preview");
    function updatePreview() {
      const data = new FormData(postForm);
      const title = normalize(data.get("title")).trim();
      const body = normalize(data.get("body")).trim();
      if (!title && !body) {
        previewBox.hidden = true;
        return;
      }
      previewBox.hidden = false;
      previewBox.replaceChildren();
      const kicker = document.createElement("small");
      kicker.textContent = data.get("category") || "Texte";
      const h = document.createElement("h3");
      h.textContent = title || "Titre du texte";
      const p = document.createElement("p");
      p.textContent = body.replace(/\s+/g, " ").slice(0, 420) + (body.length > 420 ? "…" : "");
      previewBox.append(kicker, h, p);
    }
    postForm.addEventListener("input", updatePreview);

    document.querySelector("#export-content").addEventListener("click", () => {
      const js = `/* Export Atelier auteur - ${new Date().toISOString()} */\nwindow.CUSTOM_POSTS = ${JSON.stringify(customPosts, null, 2)};\nwindow.CUSTOM_BOOKS = ${JSON.stringify(customBooks, null, 2)};\n`;
      const blob = new Blob([js], { type: "text/javascript;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "custom-content.js";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 500);
    });

    function showToast(message) {
      let toast = document.querySelector(".studio-toast");
      if (!toast) {
        toast = document.createElement("div");
        toast.className = "studio-toast";
        document.body.appendChild(toast);
      }
      toast.textContent = message;
      toast.classList.add("is-visible");
      setTimeout(() => toast.classList.remove("is-visible"), 2600);
    }

    renderList();
  }

  if (document.body.classList.contains("studio-locked")) {
    window.addEventListener("d2l-studio-unlocked", initStudio, { once: true });
  } else {
    initStudio();
  }
})();
