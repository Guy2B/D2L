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
    const saveDraft = () => { try { localStorage.setItem(draftKey, JSON.stringify({ posts: customPosts, books: customBooks })); } catch {} };

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

    document.querySelector("#book-form").addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const title = normalize(data.get("title")).trim();
      const keyBase = slugify(title) || `roman-${Date.now()}`;
      let key = keyBase, count = 2;
      while (customBooks[key]) key = `${keyBase}-${count++}`;
      const words = normalize(data.get("words")).replace(/\D/g, "");
      const genre = normalize(data.get("genre")).trim();
      customBooks[key] = {
        order: 100 + Object.keys(customBooks).length,
        custom: true,
        seriesES: data.get("seriesES") === "on",
        cardLabel: data.get("seriesES") === "on" ? "E.S. · achevé" : "Roman inédit · achevé",
        status: normalize(data.get("status")).trim(),
        kicker: data.get("seriesES") === "on" ? `Edmond Silla · E.S. · ${data.get("status") || "Achevé"}` : `Roman inédit · ${data.get("status") || "Achevé"}`,
        title,
        meta: `${genre}${words ? ` · environ ${Number(words).toLocaleString("fr-FR")} mots` : ""}`,
        cardText: `${genre}${words ? ` · environ ${Number(words).toLocaleString("fr-FR")} mots.` : "."}`,
        paragraphs: normalize(data.get("synopsis")).trim().split(/\n\s*\n+/).map(p => p.trim()).filter(Boolean)
      };
      saveDraft();
      form.reset();
      showToast(`Le roman « ${title} » a été ajouté à l’atelier.`);
      switchTab("manage");
    });

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
      Object.entries(customBooks).forEach(([key, book]) => list.appendChild(itemCard("Roman", book.title, book.meta, () => {
        delete customBooks[key];
        saveDraft();
        renderList();
      })));
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
