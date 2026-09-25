(() => {
  "use strict";

  const basePosts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];
  const customPosts = Array.isArray(window.CUSTOM_POSTS) ? window.CUSTOM_POSTS : [];
  const posts = [...basePosts, ...customPosts];
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const post = posts.find(item => item.id === id);

  const STORAGE = {
    likes: "die2lap:likes:v11",
    comments: "die2lap:comments:v11",
    theme: "die2lap:theme:v11",
    font: "die2lap:reading-font:v29"
  };

  const safeParse = (value, fallback) => {
    try { return JSON.parse(value) ?? fallback; } catch { return fallback; }
  };
  const loadObject = key => safeParse(localStorage.getItem(key), {});
  const saveObject = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  let likesState = loadObject(STORAGE.likes);
  let commentsState = loadObject(STORAGE.comments);

  const article = document.querySelector("#article");
  const notFound = document.querySelector("#article-not-found");
  const themeToggle = document.querySelector(".theme-toggle");
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector("#mobile-nav");

  const formatDate = isoDate => isoDate
    ? new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" })
        .format(new Date(`${isoDate}T12:00:00`))
    : "";

  function plainText(item) {
    return (item.content || [])
      .filter(block => block && typeof block === "object")
      .map(block => block.text || block.caption || "")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function wordCount(item) {
    const text = plainText(item);
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  }

  function readMinutes(item) {
    return Math.max(1, Math.ceil(wordCount(item) / 220));
  }

  function preferredTheme() {
    const stored = localStorage.getItem(STORAGE.theme);
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#161412" : "#f4efe6");
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre");
  }

  applyTheme(preferredTheme());
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE.theme, next);
    applyTheme(next);
  });

  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    mobileNav.hidden = open;
    menuToggle.querySelector("span").textContent = open ? "☰" : "×";
  });

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
  document.querySelector("#current-year").textContent = new Date().getFullYear();

  if (!post) {
    article.hidden = true;
    notFound.hidden = false;
    return;
  }

  try {
    localStorage.setItem("die2lap:last-read:v12", JSON.stringify({ id: post.id, at: Date.now() }));
  } catch {}

  document.title = `${post.title} | Chroniques d’ailleurs`;
  document.querySelector('meta[name="description"]')?.setAttribute(
    "content",
    `${post.title}, ${post.category}. Un texte de Die 2 Lap sur Chroniques d’ailleurs.`
  );

  const absoluteArticleUrl = new URL(`article.html?id=${encodeURIComponent(post.id)}`, window.location.href).href;
  const absoluteImageUrl = post.image ? new URL(post.image, window.location.href).href : new URL("assets/die2lap-portrait.jpg", window.location.href).href;
  const socialDescription = `${post.title}, ${post.category}. Un texte de Die 2 Lap sur Chroniques d’ailleurs.`;
  const setMeta = (selector, value) => document.querySelector(selector)?.setAttribute("content", value);
  setMeta('meta[property="og:title"]', post.title);
  setMeta('meta[property="og:description"]', socialDescription);
  setMeta('meta[property="og:url"]', absoluteArticleUrl);
  setMeta('meta[property="og:image"]', absoluteImageUrl);
  setMeta('meta[name="twitter:title"]', post.title);
  setMeta('meta[name="twitter:description"]', socialDescription);
  setMeta('meta[name="twitter:image"]', absoluteImageUrl);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", absoluteArticleUrl);

  const minutes = readMinutes(post);
  document.querySelector("#article-category").textContent = post.category;
  document.querySelector("#article-title").textContent = post.title;
  document.querySelector("#article-reading-time").textContent = `${minutes} min de lecture`;
  document.querySelector("#rail-category").textContent = post.category;
  document.querySelector("#rail-reading").textContent = `${minutes} min`;

  if (post.deck) {
    const deck = document.querySelector("#article-deck");
    deck.hidden = false;
    deck.textContent = post.deck;
  }

  if (post.date) {
    const wrap = document.querySelector("#article-date-wrap");
    wrap.hidden = false;
    const time = document.querySelector("#article-date");
    time.dateTime = post.date;
    time.textContent = formatDate(post.date);
    document.querySelector("#rail-date").textContent = formatDate(post.date);
  } else {
    document.querySelector("#rail-date").textContent = "Archive";
  }

  if (post.image) {
    const figure = document.querySelector("#article-figure");
    const image = document.querySelector("#article-image");
    const credit = document.querySelector("#article-image-credit");
    figure.hidden = false;
    figure.classList.toggle("is-contained", post.imageMode === "contain");
    image.src = post.image;
    image.alt = post.imageAlt || "";
    image.addEventListener("error", () => figure.hidden = true, { once: true });

    if (post.imageCredit) {
      credit.hidden = false;
      credit.textContent = `Crédit image : ${post.imageCredit}`;
    }
  }

  const body = document.querySelector("#article-body");

  function appendContentBlock(block) {
    if (!block || typeof block !== "object") return;

    if (block.type === "poem") {
      const poem = document.createElement("div");
      poem.className = "poem";
      poem.textContent = String(block.text || "")
        .split("\n")
        .map(line => line.replace(/[ \t]{2,}/g, " ").trimEnd())
        .join("\n");
      body.appendChild(poem);
      return;
    }

    if (block.type === "quote") {
      const quote = document.createElement("blockquote");
      quote.textContent = block.text || "";
      body.appendChild(quote);
      return;
    }

    if (block.type === "image") {
      const figure = document.createElement("figure");
      figure.className = "article-inline-figure";
      const image = document.createElement("img");
      image.src = block.image || "";
      image.alt = block.alt || "";
      image.loading = "lazy";
      figure.appendChild(image);
      if (block.caption || block.credit) {
        const caption = document.createElement("figcaption");
        const parts = [block.caption, block.credit ? `Crédit image : ${block.credit}` : ""].filter(Boolean);
        caption.textContent = parts.join(" · ");
        figure.appendChild(caption);
      }
      body.appendChild(figure);
      return;
    }

    const paragraph = document.createElement("p");
    paragraph.textContent = block.text || "";
    body.appendChild(paragraph);
  }

  (post.content || []).forEach(appendContentBlock);

  const publicationNotes = document.querySelector("#article-publication-notes");
  const notes = [];

  if (post.sourceUrl) {
    notes.push({
      prefix: "Publié initialement sur ",
      label: post.sourceLabel || "le blog de Die 2 Lap",
      url: post.sourceUrl,
      date: post.date || null,
      comments: Number(post.archiveComments || 0),
      archiveTitle: post.archiveTitle || null
    });
  }

  for (const publication of (post.alsoPublished || [])) {
    notes.push({
      prefix: "Aussi publié sur ",
      label: publication.name || "un autre média",
      url: publication.url,
      date: publication.date || null
    });
  }

  if (notes.length) {
    publicationNotes.hidden = false;
    notes.forEach(note => {
      const row = document.createElement("p");
      row.className = "publication-note";
      row.append(note.prefix);

      if (note.url) {
        const link = document.createElement("a");
        link.href = note.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = note.label;
        row.append(link, " ↗");
      } else {
        row.append(note.label);
      }

      if (note.date) row.append(` · ${formatDate(note.date)}`);
      if (note.archiveTitle && note.archiveTitle !== post.title) row.append(` · titre d’archive : « ${note.archiveTitle} »`);
      if (note.comments) row.append(` · ${note.comments} commentaire${note.comments > 1 ? "s" : ""} dans l’archive`);
      publicationNotes.appendChild(row);
    });
  }

  const likeButton = document.querySelector(".like-button");
  const likeCluster = document.querySelector(".like-cluster");
  const heart = document.querySelector(".heart");
  const likeLabel = document.querySelector(".like-label");
  const likeCount = document.querySelector(".like-count");
  const likeScope = document.querySelector(".like-scope");
  const afterLikeShare = document.querySelector(".after-like-share");
  const likesApi = window.D2LLikesAPI || { isConfigured: false };
  const savedLike = likesState[post.id] || { liked: false };
  let globalLikeCount = null;
  let globalLikesReady = false;
  let likeSyncing = false;

  const setLikeScope = text => {
    if (likeScope) likeScope.textContent = text;
  };

  const updateLike = () => {
    const liked = Boolean(savedLike.liked);
    likeButton.classList.toggle("is-liked", liked);
    likeCluster?.classList.toggle("is-liked", liked);
    likeButton.setAttribute("aria-pressed", String(liked));
    heart.textContent = liked ? "♥" : "♡";
    if (likeLabel) likeLabel.textContent = liked ? "Aimé" : "J’aime";

    const localFallback = Number(post.baseLikes || 0) + (liked ? 1 : 0);
    const displayedCount = Number.isFinite(globalLikeCount) ? globalLikeCount : localFallback;
    likeCount.textContent = Math.max(0, Number(displayedCount) || 0);
  };

  const shareToggle = document.querySelector(".share-toggle");
  const shareMenu = document.querySelector(".share-menu");
  const shareNative = document.querySelector(".share-native");
  const afterLikeNative = document.querySelector(".after-like-native");
  const pageUrl = new URL(window.location.href);
  pageUrl.hash = "";
  const canonicalUrl = pageUrl.href;
  const shareText = `${post.title} - Chroniques d’ailleurs`;

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(canonicalUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${canonicalUrl}`)}`;

  document.querySelector(".share-x").href = xUrl;
  document.querySelector(".share-facebook").href = facebookUrl;
  document.querySelector(".share-whatsapp").href = whatsappUrl;
  document.querySelector(".after-like-x").href = xUrl;
  document.querySelector(".after-like-whatsapp").href = whatsappUrl;

  async function nativeShare() {
    if (!navigator.share) return false;
    try {
      await navigator.share({
        title: post.title,
        text: `« ${post.title} » sur Chroniques d’ailleurs`,
        url: canonicalUrl
      });
      return true;
    } catch (error) {
      if (error?.name !== "AbortError") console.warn("Partage interrompu", error);
      return false;
    }
  }

  if (navigator.share) {
    shareNative.hidden = false;
    afterLikeNative.hidden = false;
    shareNative.addEventListener("click", async () => {
      shareMenu.hidden = true;
      shareToggle.setAttribute("aria-expanded", "false");
      await nativeShare();
    });
    afterLikeNative.addEventListener("click", nativeShare);
  }

  async function copyShareLink(button) {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      const old = button.textContent;
      button.textContent = "Copié ✓";
      setTimeout(() => button.textContent = old, 1400);
    } catch {
      window.prompt("Copiez ce lien :", canonicalUrl);
    }
  }

  async function synchronizeDesiredLikeState() {
    const remoteLiked = typeof savedLike.remoteLiked === "boolean" ? savedLike.remoteLiked : false;
    const desiredLiked = Boolean(savedLike.liked);
    if (desiredLiked === remoteLiked) return;

    const result = await likesApi.vote(post.id, post.title, desiredLiked);
    if (Number.isFinite(result?.count)) globalLikeCount = Math.max(0, Number(result.count));
    if (result?.sent) {
      savedLike.remoteLiked = desiredLiked;
      likesState[post.id] = savedLike;
      saveObject(STORAGE.likes, likesState);
    }
  }

  async function loadGlobalLikes() {
    if (!likesApi.isConfigured) {
      setLikeScope("enregistré sur cet appareil");
      updateLike();
      return;
    }

    likeSyncing = true;
    likeButton.disabled = true;
    try {
      setLikeScope("synchronisation...");
      const result = await likesApi.getCount(post.id, post.title);
      if (!result?.ok) throw new Error("Service de Likes indisponible");
      globalLikesReady = true;
      if (Number.isFinite(result?.count)) globalLikeCount = Math.max(0, Number(result.count));
      updateLike();

      if (typeof savedLike.remoteLiked !== "boolean") {
        savedLike.remoteLiked = false;
      }

      const needsSync = Boolean(savedLike.liked) !== Boolean(savedLike.remoteLiked);
      if (needsSync) {
        if (Number.isFinite(globalLikeCount)) {
          globalLikeCount = Math.max(0, globalLikeCount + (savedLike.liked ? 1 : -1));
          updateLike();
        }
        await synchronizeDesiredLikeState();
      } else {
        likesState[post.id] = savedLike;
        saveObject(STORAGE.likes, likesState);
      }

      setLikeScope(savedLike.liked ? "partagé avec les lecteurs" : "compteur partagé");
      updateLike();
    } catch {
      globalLikesReady = false;
      setLikeScope("enregistré sur cet appareil");
      updateLike();
    } finally {
      likeSyncing = false;
      likeButton.disabled = false;
    }
  }

  likeButton.addEventListener("click", async () => {
    if (likeSyncing) return;

    const becomingLiked = !Boolean(savedLike.liked);
    const remoteLiked = typeof savedLike.remoteLiked === "boolean" ? savedLike.remoteLiked : false;
    savedLike.liked = becomingLiked;
    likesState[post.id] = savedLike;
    saveObject(STORAGE.likes, likesState);

    const shouldSendVote = likesApi.isConfigured && globalLikesReady && becomingLiked !== remoteLiked;
    if (shouldSendVote && Number.isFinite(globalLikeCount)) {
      globalLikeCount = Math.max(0, globalLikeCount + (becomingLiked ? 1 : -1));
    }

    updateLike();

    likeButton.classList.remove("like-pop");
    void likeButton.offsetWidth;
    likeButton.classList.add("like-pop");
    setTimeout(() => likeButton.classList.remove("like-pop"), 450);

    if (afterLikeShare) {
      afterLikeShare.hidden = !becomingLiked;
      if (becomingLiked) {
        window.setTimeout(() => afterLikeShare.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
      }
    }

    if (!shouldSendVote) {
      setLikeScope(globalLikesReady ? "partagé avec les lecteurs" : "enregistré sur cet appareil");
      return;
    }

    likeSyncing = true;
    likeButton.disabled = true;
    setLikeScope("synchronisation...");

    try {
      await synchronizeDesiredLikeState();
      setLikeScope(becomingLiked ? "partagé avec les lecteurs" : "compteur partagé");
    } catch {
      setLikeScope("enregistré sur cet appareil");
    } finally {
      likeSyncing = false;
      likeButton.disabled = false;
      updateLike();
    }
  });

  updateLike();
  loadGlobalLikes();

  shareToggle.addEventListener("click", async () => {
    if (navigator.share && window.matchMedia("(max-width: 820px)").matches) {
      await nativeShare();
      return;
    }
    const open = shareToggle.getAttribute("aria-expanded") === "true";
    shareToggle.setAttribute("aria-expanded", String(!open));
    shareMenu.hidden = open;
  });

  document.querySelector(".share-copy").addEventListener("click", event => copyShareLink(event.currentTarget));
  document.querySelector(".after-like-copy-link").addEventListener("click", event => copyShareLink(event.currentTarget));

  document.addEventListener("click", event => {
    const shareRoot = document.querySelector(".share");
    if (shareRoot && !shareRoot.contains(event.target)) {
      shareMenu.hidden = true;
      shareToggle.setAttribute("aria-expanded", "false");
    }
  });

  const commentsList = document.querySelector(".comments-list");
  const commentsCount = document.querySelector(".comments-count");
  const commentsToggle = document.querySelector(".comments-toggle");
  const commentsPanel = document.querySelector(".comments-panel");
  const form = document.querySelector(".comment-form");

  function renderComments() {
    const comments = Array.isArray(commentsState[post.id]) ? commentsState[post.id] : [];
    commentsList.replaceChildren();
    commentsCount.textContent = comments.length;

    if (!comments.length) {
      const empty = document.createElement("p");
      empty.className = "empty-comments";
      empty.textContent = "Aucun commentaire local pour le moment.";
      commentsList.appendChild(empty);
      return;
    }

    comments.forEach(comment => {
      const item = document.createElement("article");
      item.className = "comment";
      const author = document.createElement("strong");
      author.textContent = comment.name;
      const msg = document.createElement("p");
      msg.textContent = comment.message;
      const time = document.createElement("time");
      time.dateTime = comment.createdAt;
      time.textContent = new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" })
        .format(new Date(comment.createdAt));
      item.append(author, msg, time);
      commentsList.appendChild(item);
    });
  }

  commentsToggle.addEventListener("click", () => {
    const open = commentsToggle.getAttribute("aria-expanded") === "true";
    commentsToggle.setAttribute("aria-expanded", String(!open));
    commentsPanel.hidden = open;
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !message) return;

    const comments = Array.isArray(commentsState[post.id]) ? commentsState[post.id] : [];
    comments.push({
      name: name.slice(0, 40),
      message: message.slice(0, 600),
      createdAt: new Date().toISOString()
    });
    commentsState[post.id] = comments;
    saveObject(STORAGE.comments, commentsState);
    form.reset();
    renderComments();
  });
  renderComments();

  const ordered = [...posts].sort((a, b) => {
    if (a.date && b.date) return new Date(b.date) - new Date(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return Number(a.order || 9999) - Number(b.order || 9999);
  });
  const index = ordered.findIndex(item => item.id === post.id);
  const prev = ordered[index - 1];
  const next = ordered[index + 1];
  const prevLink = document.querySelector("#prev-post");
  const nextLink = document.querySelector("#next-post");

  if (prev) {
    prevLink.hidden = false;
    prevLink.href = `article.html?id=${encodeURIComponent(prev.id)}`;
    prevLink.innerHTML = `<span>← Précédent</span><strong></strong>`;
    prevLink.querySelector("strong").textContent = prev.title;
  }
  if (next) {
    nextLink.hidden = false;
    nextLink.href = `article.html?id=${encodeURIComponent(next.id)}`;
    nextLink.innerHTML = `<span>Suivant →</span><strong></strong>`;
    nextLink.querySelector("strong").textContent = next.title;
  }

  function relatedPosts() {
    const sameCategory = ordered.filter(item => item.id !== post.id && item.category === post.category);
    const others = ordered.filter(item => item.id !== post.id && item.category !== post.category);
    return [...sameCategory, ...others].slice(0, 3);
  }

  const related = document.querySelector("#related-posts");
  relatedPosts().forEach(item => {
    const card = document.createElement("article");
    card.className = "related-card";
    const link = document.createElement("a");
    link.href = `article.html?id=${encodeURIComponent(item.id)}`;
    const image = document.createElement("img");
    image.src = item.image || "";
    image.alt = item.imageAlt || "";
    image.loading = "lazy";
    const copy = document.createElement("div");
    copy.className = "related-card-copy";
    const category = document.createElement("span");
    category.textContent = item.category;
    const title = document.createElement("h3");
    title.textContent = item.title;
    copy.append(category, title);
    link.append(image, copy);
    card.appendChild(link);
    related.appendChild(card);
  });

  const progress = document.querySelector(".reading-progress span");
  function updateProgress() {
    const start = article.offsetTop;
    const height = article.scrollHeight - window.innerHeight;
    const value = height > 0 ? Math.min(1, Math.max(0, (window.scrollY - start) / height)) : 0;
    progress.style.width = `${value * 100}%`;
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  const root = document.documentElement;
  const fontSizes = [1.04, 1.125, 1.20, 1.30, 1.40];
  const storedFont = localStorage.getItem(STORAGE.font);
  let fontIndex = storedFont === null ? (window.matchMedia("(max-width: 820px)").matches ? 1 : 2) : Number(storedFont);
  if (!Number.isFinite(fontIndex) || fontIndex < 0 || fontIndex >= fontSizes.length) {
    fontIndex = window.matchMedia("(max-width: 820px)").matches ? 1 : 2;
  }

  function applyFontSize() {
    root.style.setProperty("--reading-size", `${fontSizes[fontIndex]}rem`);
    localStorage.setItem(STORAGE.font, String(fontIndex));
  }
  applyFontSize();

  document.querySelector('[data-font="minus"]').addEventListener("click", () => {
    fontIndex = Math.max(0, fontIndex - 1);
    applyFontSize();
  });
  document.querySelector('[data-font="plus"]').addEventListener("click", () => {
    fontIndex = Math.min(fontSizes.length - 1, fontIndex + 1);
    applyFontSize();
  });

  const focusToggle = document.querySelector(".focus-mode-toggle");
  focusToggle.addEventListener("click", () => {
    const on = document.body.classList.toggle("focus-reading");
    focusToggle.setAttribute("aria-pressed", String(on));
    focusToggle.textContent = on ? "Quitter le mode lecture" : "Mode lecture";
  });
})();
