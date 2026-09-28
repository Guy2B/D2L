(() => {
  "use strict";

  const basePosts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];
  const customPosts = Array.isArray(window.CUSTOM_POSTS) ? window.CUSTOM_POSTS : [];
  const posts = [...basePosts, ...customPosts];
  const track = (eventName, params = {}) => window.d2lTrack?.(eventName, params);
  const i18n = window.D2LI18N || {
    t: key => key,
    category: value => value,
    formatDate: iso => iso || "",
    locale: "fr-FR",
    language: "fr"
  };
  const t = (key, vars = {}) => i18n.t(key, vars);
  const params = new URLSearchParams(window.location.search);
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const textIndex = pathParts.lastIndexOf("textes");
  const pathId = textIndex >= 0 && pathParts[textIndex + 1] ? decodeURIComponent(pathParts[textIndex + 1]) : null;
  const id = params.get("id") || pathId;
  const post = posts.find(item => item.id === id);
  const isPrettyArticle = Boolean(pathId);
  const SITE_PREFIX = isPrettyArticle ? "../../" : "";
  const siteHref = value => {
    if (!value || /^(?:[a-z]+:|#|\/\/)/i.test(value)) return value;
    return `${SITE_PREFIX}${value}`;
  };
  const staticPostIds = new Set(basePosts.map(item => item.id));
  const localFileMode = window.location.protocol === "file:";
  const articleHref = postId => staticPostIds.has(postId)
    ? siteHref(`textes/${encodeURIComponent(postId)}/${localFileMode ? "index.html" : ""}`)
    : siteHref(`article.html?id=${encodeURIComponent(postId)}`);

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

  const formatDate = isoDate => i18n.formatDate(isoDate);

  function plainText(item) {
    return (item.content || [])
      .filter(block => block && typeof block === "object")
      .map(block => [block.text, block.caption, block.poeticLine, block.poeticLineEn, block.poeticLineDe].filter(Boolean).join(" "))
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
    themeToggle.setAttribute("aria-label", theme === "dark" ? t("common.themeLight") : t("common.themeDark"));
    themeToggle.title = t("common.themeTitle");
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
    menuToggle.setAttribute("aria-label", open ? t("common.menuOpen") : t("common.menuClose"));
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

  const isPoem = post.category === "Poèmes";
  const isFiction = post.category === "Nouvelles";
  const isChronicle = post.category === "Chroniques";
  const isTravel = post.category === "Histoires de voyage";
  const isPhotoEssay = post.format === "photo-essay";
  const isPremiumPhotoEssay = isPhotoEssay;
  const isProse = !isPoem;

  document.body.classList.toggle("is-poem-article", isPoem);
  document.body.classList.toggle("is-fiction-article", isFiction);
  document.body.classList.toggle("is-chronicle-article", isChronicle);
  document.body.classList.toggle("is-travel-article", isTravel);
  document.body.classList.toggle("is-photo-essay", isPhotoEssay);
  document.body.classList.toggle("photo-essay-premium", isPremiumPhotoEssay);
  document.body.classList.toggle("is-prose-article", isProse);
  article.classList.toggle("is-poem-article", isPoem);
  article.classList.toggle("is-fiction-article", isFiction);
  article.classList.toggle("is-chronicle-article", isChronicle);
  article.classList.toggle("is-travel-article", isTravel);
  article.classList.toggle("is-photo-essay", isPhotoEssay);
  article.classList.toggle("photo-essay-premium", isPremiumPhotoEssay);
  article.classList.toggle("is-prose-article", isProse);
  if (isPremiumPhotoEssay) {
    document.body.dataset.photoStory = post.id;
    article.dataset.photoStory = post.id;
  } else {
    delete document.body.dataset.photoStory;
    delete article.dataset.photoStory;
  }

  const originalLanguageNote = document.querySelector("#original-language-note");
  const enforceOriginalLanguageNote = () => {
    if (isPhotoEssay && originalLanguageNote) originalLanguageNote.hidden = true;
  };
  enforceOriginalLanguageNote();

  // Les œuvres littéraires restent en français. Les lignes poétiques des carnets photo
  // suivent volontairement la langue d’interface (FR / EN / DE).
  document.querySelector("#article-body")?.setAttribute("lang", isPhotoEssay ? i18n.language : "fr");

  try {
    localStorage.setItem("die2lap:last-read:v12", JSON.stringify({ id: post.id, at: Date.now() }));
  } catch {}

  const canonicalNode = document.querySelector('link[rel="canonical"]');
  const absoluteArticleUrl = isPrettyArticle && canonicalNode?.href
    ? canonicalNode.href
    : new URL(articleHref(post.id), window.location.href).href;
  const absoluteImageUrl = post.image
    ? new URL(siteHref(post.image), window.location.href).href
    : new URL(siteHref("assets/die2lap-portrait.jpg"), window.location.href).href;
  const setMeta = (selector, value) => document.querySelector(selector)?.setAttribute("content", value);

  function updateMetadata() {
    document.title = `${post.title} | Chroniques d’ailleurs`;
    const socialDescription = t("dynamic.metaDescription", {
      title: post.title,
      category: i18n.category(post.category)
    });
    document.querySelector('meta[name="description"]')?.setAttribute("content", socialDescription);
    setMeta('meta[property="og:title"]', post.title);
    setMeta('meta[property="og:description"]', socialDescription);
    setMeta('meta[property="og:url"]', absoluteArticleUrl);
    setMeta('meta[property="og:image"]', absoluteImageUrl);
    setMeta('meta[name="twitter:title"]', post.title);
    setMeta('meta[name="twitter:description"]', socialDescription);
    setMeta('meta[name="twitter:image"]', absoluteImageUrl);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", absoluteArticleUrl);
  }
  updateMetadata();

  track("article_view", {
    article_id: post.id,
    article_title: post.title,
    category: post.category,
    reading_minutes: readMinutes(post)
  });

  const minutes = readMinutes(post);
  document.querySelector("#article-title").textContent = post.title;

  function updateArticleChrome() {
    document.querySelector("#article-category").textContent = i18n.category(post.category);
    document.querySelector("#article-reading-time").textContent = t("dynamic.readingMinutes", { count: minutes });
    document.querySelector("#rail-category").textContent = i18n.category(post.category);
    document.querySelector("#rail-reading").textContent = t("dynamic.minutes", { count: minutes });
    const railDate = document.querySelector("#rail-date");
    if (post.date) {
      document.querySelector("#article-date").textContent = formatDate(post.date);
      railDate.textContent = formatDate(post.date);
    } else {
      railDate.textContent = t("dynamic.archive");
    }
  }
  updateArticleChrome();

  const photoEssayBlocks = isPremiumPhotoEssay
    ? (post.content || []).filter(block => block?.type === "image")
    : [];

  // V51 : chaque carnet partage une même grammaire, mais possède sa propre
  // composition. Les formats ci-dessous ne recadrent jamais les images : ils
  // règlent seulement leur place, leur échelle et la relation image / légende.
  const PHOTO_ESSAY_LAYOUTS = {
    "shanghai-dec": ["cinema", "editorial-left", "quiet", "portrait-left", "portrait-right", "portrait-center", "finale"],
    "oxford-nov": ["cinema", "bleed", "editorial-right", "portrait-right", "finale"],
    "murgtal-oct": ["bleed", "panorama-left", "bleed", "editorial-right", "panorama-right", "finale"],
    "yaounde-sept": ["portrait-stage", "editorial-left", "bleed", "editorial-right", "cinema", "finale"],
    "jyvaskyla-sept": ["cinema", "portrait-right", "editorial-left", "bleed", "quiet", "finale"],
    "ny-summer": ["cinema", "portrait-left", "editorial-right", "bleed", "portrait-right", "finale"],
    "helsinki-june": ["cinema", "panorama-left", "portrait-right", "editorial-left", "bleed", "finale"],
    "berlin-july": ["cinema", "editorial-right", "quiet", "bleed", "finale"],
    "porto-may": ["portrait-left", "portrait-right", "editorial-left", "finale"],
    "suzhou-feb": ["cinema", "editorial-left", "bleed", "finale"],
    "paris-may": ["panorama-left", "portrait-stage"],
    "toulouse-june": ["portrait-left", "editorial-right", "finale"],
    "amsterdam-june": ["cinema", "editorial-left", "bleed", "editorial-right", "quiet", "portrait-right", "finale"]
  };

  const PHOTO_ESSAY_TONES = {
    "shanghai-dec": ["amber", "market", "night", "ink", "red", "amber", "mist"],
    "oxford-nov": ["air", "air", "mist", "paper", "warm"],
    "murgtal-oct": ["ember", "forest", "forest", "mist", "forest", "ember"],
    "yaounde-sept": ["night", "air", "earth", "earth", "night", "air"],
    "jyvaskyla-sept": ["air", "paper", "cool", "night", "warm", "air"],
    "ny-summer": ["air", "paper", "paper", "night", "air", "night"],
    "helsinki-june": ["air", "cool", "paper", "paper", "blue", "warm"],
    "berlin-july": ["air", "paper", "warm", "earth", "air"],
    "porto-may": ["air", "blue", "paper", "night"],
    "suzhou-feb": ["air", "night", "red", "night"],
    "paris-may": ["air", "blue"],
    "toulouse-june": ["air", "warm", "berry"],
    "amsterdam-june": ["air", "paper", "night", "night", "warm", "ink", "night"]
  };

  const PHOTO_ESSAY_PERSONAS = {
    "shanghai-dec": "metropolis",
    "oxford-nov": "scholar",
    "murgtal-oct": "silence",
    "yaounde-sept": "pulse",
    "jyvaskyla-sept": "nordic",
    "ny-summer": "vertical",
    "helsinki-june": "harbour",
    "berlin-july": "geometry",
    "porto-may": "atlantic",
    "suzhou-feb": "lantern",
    "paris-may": "monument",
    "toulouse-june": "table",
    "amsterdam-june": "transit"
  };

  if (isPremiumPhotoEssay) {
    document.body.dataset.photoPersona = PHOTO_ESSAY_PERSONAS[post.id] || "journal";
    document.body.dataset.photoTone = PHOTO_ESSAY_TONES[post.id]?.[0] || "paper";
  }

  function photoEssayLayout(block, index, total) {
    const curated = PHOTO_ESSAY_LAYOUTS[post.id]?.[index];
    if (curated) return curated;
    const width = Number(block?.width || 0);
    const height = Number(block?.height || 0);
    const ratio = width && height ? width / height : 1.4;
    if (index === 0) return ratio < .82 ? "portrait-stage" : "cinema";
    if (index === total - 1) return ratio < .82 ? "portrait-stage" : "finale";
    if (ratio > 2.2) return index % 2 ? "panorama-left" : "panorama-right";
    if (ratio < .82) return index % 2 ? "portrait-left" : "portrait-right";
    return index % 2 ? "editorial-left" : "editorial-right";
  }

  function photoEssayTone(index) {
    return PHOTO_ESSAY_TONES[post.id]?.[index] || PHOTO_ESSAY_TONES[post.id]?.[0] || "paper";
  }

  function localizedPoeticLine(block) {
    if (!block) return "";
    if (i18n.language === "en") return block.poeticLineEn || block.poeticLine || "";
    if (i18n.language === "de") return block.poeticLineDe || block.poeticLine || "";
    return block.poeticLine || "";
  }
  let photoStoryBar = null;
  let photoStoryCounter = null;
  let photoStoryCountLabel = null;
  let photoStoryIndex = null;
  let photoStoryProgress = null;
  let photoStoryClosing = null;
  let photoObserver = null;
  let photoLightbox = null;
  let photoLightboxIndex = 0;

  function photoCounter(index, total) {
    return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  }

  function buildPhotoStoryIndex() {
    if (!isPremiumPhotoEssay) return;
    const articleHeader = document.querySelector(".article-header");
    photoStoryIndex = articleHeader.querySelector(".photo-story-index");
    if (!photoStoryIndex) {
      photoStoryIndex = document.createElement("nav");
      photoStoryIndex.className = "photo-story-index";
      photoStoryIndex.setAttribute("aria-label", t("photoEssay.sequence"));
      articleHeader.appendChild(photoStoryIndex);
    }
    photoStoryIndex.replaceChildren();
    photoEssayBlocks.forEach((block, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "photo-story-index-mark";
      const width = Number(block.width || 1);
      const height = Number(block.height || 1);
      const ratio = Math.max(.42, Math.min(2.5, width / height));
      button.style.setProperty("--photo-ratio", String(ratio));
      button.style.setProperty("--mark-width", `${Math.round(18 + (ratio * 18))}px`);
      button.dataset.photoIndex = String(index);
      button.setAttribute("aria-label", t("photoEssay.jump", {
        current: index + 1,
        total: photoEssayBlocks.length,
        caption: block.caption || post.title
      }));
      const number = document.createElement("span");
      number.textContent = String(index + 1).padStart(2, "0");
      button.appendChild(number);
      button.addEventListener("click", () => {
        document.querySelector(`.article-inline-figure[data-photo-index="${index}"]`)?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "center"
        });
      });
      if (index === 0) {
        button.classList.add("is-active");
        button.setAttribute("aria-current", "true");
      }
      photoStoryIndex.appendChild(button);
    });
  }

  function setupPhotoEssayChrome() {
    if (!isPremiumPhotoEssay) return;
    const articleHeader = document.querySelector(".article-header");
    articleHeader.classList.add("photo-story-cover");
    photoStoryCountLabel = articleHeader.querySelector(".photo-essay-count");
    if (!photoStoryCountLabel) {
      photoStoryCountLabel = document.createElement("p");
      photoStoryCountLabel.className = "photo-essay-count";
      articleHeader.appendChild(photoStoryCountLabel);
    }
    buildPhotoStoryIndex();

    const entryCue = articleHeader.querySelector(".photo-story-entry");
    if (!entryCue) {
      const cue = document.createElement("span");
      cue.className = "photo-story-entry";
      cue.textContent = "↓";
      cue.setAttribute("aria-hidden", "true");
      articleHeader.appendChild(cue);
    }

    photoStoryBar = document.querySelector(".photo-story-bar");
    if (!photoStoryBar) {
      photoStoryBar = document.createElement("div");
      photoStoryBar.className = "photo-story-bar";

      const back = document.createElement("a");
      back.className = "photo-story-back";
      back.href = siteHref("index.html#textes");
      back.textContent = "←";
      back.setAttribute("aria-label", t("article.back"));

      const location = document.createElement("strong");
      location.className = "photo-story-location";
      location.textContent = post.title;

      const progress = document.createElement("span");
      progress.className = "photo-story-progress";
      const progressFill = document.createElement("i");
      progress.appendChild(progressFill);
      photoStoryProgress = progressFill;

      photoStoryCounter = document.createElement("span");
      photoStoryCounter.className = "photo-story-counter";
      photoStoryCounter.textContent = photoCounter(0, photoEssayBlocks.length);
      if (photoStoryProgress) photoStoryProgress.style.width = `${100 / Math.max(1, photoEssayBlocks.length)}%`;

      const focus = document.createElement("button");
      focus.className = "photo-story-focus";
      focus.type = "button";
      focus.textContent = "◌";
      focus.setAttribute("aria-label", t("article.focus"));
      focus.addEventListener("click", () => document.querySelector(".focus-mode-toggle")?.click());

      photoStoryBar.append(back, location, progress, photoStoryCounter, focus);
      document.body.appendChild(photoStoryBar);

      const updateVisibility = () => {
        const threshold = articleHeader.getBoundingClientRect().bottom + window.scrollY;
        const active = window.scrollY > threshold - 72;
        photoStoryBar.classList.toggle("is-visible", active);
        document.body.classList.toggle("photo-story-reading", active);
      };
      window.addEventListener("scroll", updateVisibility, { passive: true });
      updateVisibility();
    }
    updatePhotoEssayChrome();
  }

  function updatePhotoEssayChrome() {
    if (!isPremiumPhotoEssay) return;
    if (photoStoryCountLabel) {
      photoStoryCountLabel.textContent = t("photoEssay.count", { count: photoEssayBlocks.length });
    }
    const back = photoStoryBar?.querySelector(".photo-story-back");
    if (back) back.setAttribute("aria-label", t("article.back"));
    const focus = photoStoryBar?.querySelector(".photo-story-focus");
    if (focus) focus.setAttribute("aria-label", t("article.focus"));
    if (photoStoryIndex) {
      photoStoryIndex.setAttribute("aria-label", t("photoEssay.sequence"));
      [...photoStoryIndex.querySelectorAll(".photo-story-index-mark")].forEach((button, index) => {
        const block = photoEssayBlocks[index];
        button.setAttribute("aria-label", t("photoEssay.jump", {
          current: index + 1,
          total: photoEssayBlocks.length,
          caption: block?.caption || post.title
        }));
      });
    }
  }

  setupPhotoEssayChrome();

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
  }

  if (post.image && !post.hideLeadImage) {
    const figure = document.querySelector("#article-figure");
    const image = document.querySelector("#article-image");
    const credit = document.querySelector("#article-image-credit");
    figure.hidden = false;
    figure.classList.toggle("is-contained", post.imageMode === "contain");
    image.src = siteHref(post.image);
    image.alt = post.imageAlt || "";
    image.loading = "eager";
    image.decoding = "async";
    image.fetchPriority = "high";
    if (post.imageWidth) image.width = Number(post.imageWidth);
    if (post.imageHeight) image.height = Number(post.imageHeight);
    image.addEventListener("error", () => figure.hidden = true, { once: true });

    if (post.imageCredit) {
      credit.hidden = false;
      credit.dataset.credit = post.imageCredit;
      credit.textContent = t("dynamic.imageCredit", { credit: post.imageCredit });
    }
  }

  const body = document.querySelector("#article-body");

  function appendContentBlock(block, photoIndex = -1, photoTotal = 0) {
    if (!block || typeof block !== "object") return;

    if (block.type === "poem") {
      const poem = document.createElement("div");
      poem.className = "poem";

      const normalized = String(block.text || "")
        .replace(/\r\n?/g, "\n")
        .split("\n")
        .map(line => line.replace(/[ \t]{2,}/g, " ").trimEnd())
        .join("\n")
        .trim();

      const stanzas = normalized ? normalized.split(/\n\s*\n+/) : [];
      stanzas.forEach(stanzaText => {
        const stanza = document.createElement("div");
        stanza.className = "poem-stanza";
        stanza.textContent = stanzaText;
        poem.appendChild(stanza);
      });

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
      const resolvedLayout = isPremiumPhotoEssay && photoIndex >= 0
        ? photoEssayLayout(block, photoIndex, photoTotal)
        : block.layout;
      if (isPremiumPhotoEssay && resolvedLayout) {
        figure.classList.add(`photo-layout-${resolvedLayout}`);
      }
      if (isPremiumPhotoEssay && photoIndex >= 0) {
        figure.dataset.photoIndex = String(photoIndex);
        figure.dataset.photoNumber = photoCounter(photoIndex, photoTotal);
        figure.dataset.photoTone = photoEssayTone(photoIndex);
      }

      const image = document.createElement("img");
      image.src = siteHref(block.image || "");
      image.alt = block.alt || "";
      image.loading = isPremiumPhotoEssay && photoIndex === 0 ? "eager" : "lazy";
      image.decoding = "async";
      if (isPremiumPhotoEssay && photoIndex === 0) image.fetchPriority = "high";
      if (block.width) image.width = Number(block.width);
      if (block.height) image.height = Number(block.height);
      const width = Number(block.width || 0);
      const height = Number(block.height || 0);
      if (width && height) {
        const ratio = width / height;
        figure.classList.toggle("is-portrait", ratio < .82);
        figure.classList.toggle("is-panorama", ratio > 1.85);
        figure.classList.toggle("is-landscape", ratio >= .82 && ratio <= 1.85);
      }

      if (isPremiumPhotoEssay && photoIndex >= 0) {
        const opener = document.createElement("button");
        opener.className = "photo-open";
        opener.type = "button";
        opener.dataset.photoIndex = String(photoIndex);
        opener.setAttribute("aria-label", t("photoEssay.enlarge", { caption: block.caption || post.title }));
        opener.appendChild(image);
        figure.appendChild(opener);
      } else {
        figure.appendChild(image);
      }

      if (block.caption || block.credit || block.poeticLine) {
        const caption = document.createElement("figcaption");
        if (isPremiumPhotoEssay && photoIndex >= 0) {
          const sequence = document.createElement("span");
          sequence.className = "photo-caption-sequence";
          sequence.textContent = photoCounter(photoIndex, photoTotal);
          caption.appendChild(sequence);
        }
        const parts = [block.caption, block.credit ? t("dynamic.imageCredit", { credit: block.credit }) : ""].filter(Boolean);
        if (parts.length) {
          const meta = document.createElement("span");
          meta.className = "photo-caption-meta";
          meta.textContent = parts.join(" · ");
          caption.appendChild(meta);
        }
        const poeticCopy = localizedPoeticLine(block);
        if (poeticCopy) {
          const poeticLine = document.createElement("span");
          poeticLine.className = "photo-caption-poetic";
          poeticLine.lang = i18n.language;
          poeticLine.textContent = poeticCopy;
          caption.appendChild(poeticLine);
        }
        figure.appendChild(caption);
      }
      body.appendChild(figure);
      return;
    }

    const paragraph = document.createElement("p");
    paragraph.textContent = block.text || "";
    body.appendChild(paragraph);
  }

  function renderArticleBody() {
    body.replaceChildren();
    body.setAttribute("lang", isPhotoEssay ? i18n.language : "fr");
    const photoTotal = isPremiumPhotoEssay ? photoEssayBlocks.length : 0;
    let photoIndex = 0;
    (post.content || []).forEach(block => {
      if (block?.type === "image") {
        appendContentBlock(block, isPremiumPhotoEssay ? photoIndex : -1, photoTotal);
        photoIndex += 1;
      } else {
        appendContentBlock(block);
      }
    });
    if (isPremiumPhotoEssay) bindPhotoEssayExperience();
  }
  renderArticleBody();

  function ensurePhotoStoryClosing() {
    if (!isPremiumPhotoEssay) return;
    const articleMain = document.querySelector(".article-main");
    photoStoryClosing = articleMain.querySelector(".photo-story-closing");
    if (!photoStoryClosing) {
      photoStoryClosing = document.createElement("section");
      photoStoryClosing.className = "photo-story-closing";
      const mark = document.createElement("span");
      mark.className = "photo-story-closing-mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = "·";
      const label = document.createElement("span");
      label.className = "photo-story-closing-label";
      const title = document.createElement("strong");
      title.textContent = post.title;
      const date = document.createElement("time");
      if (post.date) date.dateTime = post.date;
      photoStoryClosing.append(mark, label, title, date);
      document.querySelector(".article-signature")?.before(photoStoryClosing);
    }
    photoStoryClosing.querySelector(".photo-story-closing-label").textContent = t("photoEssay.end");
    const date = photoStoryClosing.querySelector("time");
    date.textContent = post.date ? formatDate(post.date) : "";
  }
  ensurePhotoStoryClosing();

  function ensurePhotoLightbox() {
    if (!isPremiumPhotoEssay) return null;
    photoLightbox = document.querySelector(".photo-lightbox");
    if (photoLightbox) return photoLightbox;

    photoLightbox = document.createElement("dialog");
    photoLightbox.className = "photo-lightbox";

    const stage = document.createElement("div");
    stage.className = "photo-lightbox-stage";
    const image = document.createElement("img");
    image.className = "photo-lightbox-image";
    image.alt = "";
    stage.appendChild(image);

    const close = document.createElement("button");
    close.className = "photo-lightbox-close";
    close.type = "button";
    close.textContent = "×";
    close.setAttribute("aria-label", t("photoEssay.close"));

    const previous = document.createElement("button");
    previous.className = "photo-lightbox-nav photo-lightbox-prev";
    previous.type = "button";
    previous.textContent = "‹";
    previous.setAttribute("aria-label", t("photoEssay.previous"));

    const next = document.createElement("button");
    next.className = "photo-lightbox-nav photo-lightbox-next";
    next.type = "button";
    next.textContent = "›";
    next.setAttribute("aria-label", t("photoEssay.next"));

    const info = document.createElement("div");
    info.className = "photo-lightbox-info";
    const count = document.createElement("span");
    count.className = "photo-lightbox-count";
    const meta = document.createElement("span");
    meta.className = "photo-lightbox-meta";
    const poetic = document.createElement("p");
    poetic.className = "photo-lightbox-poetic";
    info.append(count, meta, poetic);

    photoLightbox.append(stage, close, previous, next, info);
    document.body.appendChild(photoLightbox);

    close.addEventListener("click", () => photoLightbox.close());
    previous.addEventListener("click", () => showPhotoInLightbox(photoLightboxIndex - 1));
    next.addEventListener("click", () => showPhotoInLightbox(photoLightboxIndex + 1));
    photoLightbox.addEventListener("click", event => {
      if (event.target === photoLightbox) photoLightbox.close();
    });
    photoLightbox.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") { event.preventDefault(); showPhotoInLightbox(photoLightboxIndex - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); showPhotoInLightbox(photoLightboxIndex + 1); }
    });
    let touchStartX = null;
    photoLightbox.addEventListener("touchstart", event => {
      touchStartX = event.changedTouches?.[0]?.clientX ?? null;
    }, { passive: true });
    photoLightbox.addEventListener("touchend", event => {
      if (touchStartX === null) return;
      const touchEndX = event.changedTouches?.[0]?.clientX ?? touchStartX;
      const delta = touchEndX - touchStartX;
      touchStartX = null;
      if (Math.abs(delta) < 48) return;
      showPhotoInLightbox(photoLightboxIndex + (delta < 0 ? 1 : -1));
    }, { passive: true });
    return photoLightbox;
  }

  function updatePhotoLightboxLabels() {
    if (!photoLightbox) return;
    photoLightbox.querySelector(".photo-lightbox-close")?.setAttribute("aria-label", t("photoEssay.close"));
    photoLightbox.querySelector(".photo-lightbox-prev")?.setAttribute("aria-label", t("photoEssay.previous"));
    photoLightbox.querySelector(".photo-lightbox-next")?.setAttribute("aria-label", t("photoEssay.next"));
  }

  function showPhotoInLightbox(index) {
    if (!isPremiumPhotoEssay || !photoEssayBlocks.length) return;
    const total = photoEssayBlocks.length;
    photoLightboxIndex = (index + total) % total;
    const block = photoEssayBlocks[photoLightboxIndex];
    const dialog = ensurePhotoLightbox();
    const image = dialog.querySelector(".photo-lightbox-image");
    image.src = siteHref(block.image);
    image.alt = block.alt || block.caption || post.title;
    dialog.querySelector(".photo-lightbox-count").textContent = photoCounter(photoLightboxIndex, total);
    dialog.querySelector(".photo-lightbox-meta").textContent = [
      block.caption,
      block.credit ? t("dynamic.imageCredit", { credit: block.credit }) : ""
    ].filter(Boolean).join(" · ");
    const lightboxPoetic = dialog.querySelector(".photo-lightbox-poetic");
    lightboxPoetic.lang = i18n.language;
    lightboxPoetic.textContent = localizedPoeticLine(block);
    if (!dialog.open) dialog.showModal();
  }

  function bindPhotoEssayExperience() {
    if (!isPremiumPhotoEssay) return;
    const figures = [...body.querySelectorAll(".article-inline-figure")];
    figures.forEach((figure, index) => {
      figure.querySelector(".photo-open")?.addEventListener("click", () => showPhotoInLightbox(index));
    });

    ensurePhotoLightbox();
    updatePhotoLightboxLabels();

    photoObserver?.disconnect();
    photoObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number(visible.target.dataset.photoIndex || 0);
      if (photoStoryCounter) photoStoryCounter.textContent = photoCounter(index, figures.length);
      if (photoStoryProgress) photoStoryProgress.style.width = `${((index + 1) / figures.length) * 100}%`;
      document.body.dataset.photoTone = visible.target.dataset.photoTone || photoEssayTone(index);
      [...(photoStoryIndex?.querySelectorAll(".photo-story-index-mark") || [])].forEach((mark, markIndex) => {
        mark.classList.toggle("is-active", markIndex === index);
        if (markIndex === index) mark.setAttribute("aria-current", "true");
        else mark.removeAttribute("aria-current");
      });
    }, { rootMargin: "-34% 0px -40%", threshold: [0, .12, .28, .5, .72] });
    figures.forEach(figure => photoObserver.observe(figure));
  }

  const publicationNotes = document.querySelector("#article-publication-notes");
  const archiveDiscussion = document.querySelector("#archive-discussion");
  const archiveDiscussionCount = document.querySelector("#archive-discussion-count");
  const archiveDiscussionLink = document.querySelector("#archive-discussion-link");
  const archivedComments = Number(post.archiveComments || 0);

  function renderPublicationHistory() {
    const heading = publicationNotes.querySelector("h2");
    [...publicationNotes.querySelectorAll(".publication-note")].forEach(node => node.remove());
    const notes = [];

    if (post.sourceUrl) {
      notes.push({
        prefix: t("dynamic.publishedInitially"),
        label: post.sourceLabel || t("dynamic.dieBlog"),
        url: post.sourceUrl,
        date: post.date || null,
        archiveTitle: post.archiveTitle || null
      });
    }

    for (const publication of (post.alsoPublished || [])) {
      notes.push({
        prefix: t("dynamic.alsoPublished"),
        label: publication.name || t("dynamic.otherMedia"),
        url: publication.url,
        date: publication.date || null
      });
    }

    publicationNotes.hidden = notes.length === 0;
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
      if (note.archiveTitle && note.archiveTitle !== post.title) {
        row.append(` · ${t("dynamic.archiveTitle")} : « ${note.archiveTitle} »`);
      }
      publicationNotes.appendChild(row);
    });

    if (archiveDiscussion && archivedComments > 0) {
      archiveDiscussion.hidden = false;
      const plural = archivedComments > 1 ? (i18n.language === "de" ? "e" : "s") : "";
      archiveDiscussionCount.textContent = t("dynamic.archiveCommentsBox", { count: archivedComments, plural });
      if (post.sourceUrl) {
        archiveDiscussionLink.href = post.sourceUrl;
        archiveDiscussionLink.hidden = false;
      } else {
        archiveDiscussionLink.hidden = true;
      }
    }
  }

  if (post.sourceUrl) {
    archiveDiscussionLink?.addEventListener("click", () => track("archive_open", {
      article_id: post.id,
      article_title: post.title
    }));
  }
  renderPublicationHistory();

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

  let likeScopeKey = "article.savedDevice";
  const setLikeScope = key => {
    likeScopeKey = key;
    if (likeScope) likeScope.textContent = t(key);
  };

  const updateLike = () => {
    const liked = Boolean(savedLike.liked);
    likeButton.classList.toggle("is-liked", liked);
    likeCluster?.classList.toggle("is-liked", liked);
    likeButton.setAttribute("aria-pressed", String(liked));
    heart.textContent = liked ? "♥" : "♡";
    if (likeLabel) likeLabel.textContent = liked ? t("article.liked") : t("article.like");

    const localFallback = Number(post.baseLikes || 0) + (liked ? 1 : 0);
    const displayedCount = Number.isFinite(globalLikeCount) ? globalLikeCount : localFallback;
    likeCount.textContent = Math.max(0, Number(displayedCount) || 0);
  };

  const shareToggle = document.querySelector(".share-toggle");
  const shareMenu = document.querySelector(".share-menu");
  const shareNative = document.querySelector(".share-native");
  const afterLikeNative = document.querySelector(".after-like-native");
  const canonicalUrl = document.querySelector('link[rel="canonical"]')?.href || absoluteArticleUrl;
  function updateShareUrls() {
    const shareText = `${post.title} - Chroniques d’ailleurs`;
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(canonicalUrl)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${t("dynamic.shareText", { title: post.title })} ${canonicalUrl}`)}`;
    document.querySelector(".share-x").href = xUrl;
    document.querySelector(".share-facebook").href = facebookUrl;
    document.querySelector(".share-whatsapp").href = whatsappUrl;
    document.querySelector(".after-like-x").href = xUrl;
    document.querySelector(".after-like-whatsapp").href = whatsappUrl;
  }
  updateShareUrls();

  const trackShareLink = method => () => track("article_share", { article_id: post.id, article_title: post.title, method });
  document.querySelector(".share-x")?.addEventListener("click", trackShareLink("x"));
  document.querySelector(".share-facebook")?.addEventListener("click", trackShareLink("facebook"));
  document.querySelector(".share-whatsapp")?.addEventListener("click", trackShareLink("whatsapp"));
  document.querySelector(".after-like-x")?.addEventListener("click", trackShareLink("x_after_like"));
  document.querySelector(".after-like-whatsapp")?.addEventListener("click", trackShareLink("whatsapp_after_like"));

  async function nativeShare() {
    if (!navigator.share) return false;
    try {
      await navigator.share({
        title: post.title,
        text: t("dynamic.shareText", { title: post.title }),
        url: canonicalUrl
      });
      track("article_share", { article_id: post.id, article_title: post.title, method: "native" });
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
      track("article_share", { article_id: post.id, article_title: post.title, method: "copy" });
      const old = button.textContent;
      button.textContent = t("article.copied");
      setTimeout(() => button.textContent = old, 1400);
    } catch {
      window.prompt(t("dynamic.copyPrompt"), canonicalUrl);
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
      setLikeScope("article.savedDevice");
      updateLike();
      return;
    }

    likeSyncing = true;
    likeButton.disabled = true;
    try {
      setLikeScope("article.syncing");
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

      setLikeScope(savedLike.liked ? "article.sharedReaders" : "article.sharedCounter");
      updateLike();
    } catch {
      globalLikesReady = false;
      setLikeScope("article.savedDevice");
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
    track("article_like", {
      article_id: post.id,
      article_title: post.title,
      category: post.category,
      liked: becomingLiked ? 1 : 0,
      global_counter: likesApi.isConfigured ? 1 : 0
    });

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
      setLikeScope(globalLikesReady ? "article.sharedReaders" : "article.savedDevice");
      return;
    }

    likeSyncing = true;
    likeButton.disabled = true;
    setLikeScope("article.syncing");

    try {
      await synchronizeDesiredLikeState();
      setLikeScope(becomingLiked ? "article.sharedReaders" : "article.sharedCounter");
    } catch {
      setLikeScope("article.savedDevice");
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
      empty.textContent = t("dynamic.noLocalComments");
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
      time.textContent = new Intl.DateTimeFormat(i18n.locale, { dateStyle: "medium", timeStyle: "short" })
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
    track("local_comment", { article_id: post.id, article_title: post.title });
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

  function renderPagination() {
    if (prev) {
      prevLink.hidden = false;
      prevLink.href = articleHref(prev.id);
      prevLink.innerHTML = `<span>${t("dynamic.prev")}</span><strong></strong>`;
      prevLink.querySelector("strong").textContent = prev.title;
    }
    if (next) {
      nextLink.hidden = false;
      nextLink.href = articleHref(next.id);
      nextLink.innerHTML = `<span>${t("dynamic.next")}</span><strong></strong>`;
      nextLink.querySelector("strong").textContent = next.title;
    }
  }

  function decoratePhotoEssayPagination() {
    if (!isPremiumPhotoEssay) return;
    [[prevLink, prev], [nextLink, next]].forEach(([link, item]) => {
      if (!link || !item || link.hidden) return;
      link.classList.add("photo-story-pagination-card");
      if (!link.querySelector("img")) {
        const image = document.createElement("img");
        image.src = siteHref(item.image || "");
        image.alt = "";
        image.loading = "lazy";
        link.prepend(image);
      }
    });
  }

  function relatedPosts() {
    const sameCategory = ordered.filter(item => item.id !== post.id && item.category === post.category);
    const others = ordered.filter(item => item.id !== post.id && item.category !== post.category);
    return [...sameCategory, ...others].slice(0, 3);
  }

  const related = document.querySelector("#related-posts");
  function renderRelated() {
    related.replaceChildren();
    relatedPosts().forEach(item => {
      const card = document.createElement("article");
      card.className = "related-card";
      const link = document.createElement("a");
      link.href = articleHref(item.id);
      const image = document.createElement("img");
      image.src = item.image || "";
      image.alt = item.imageAlt || "";
      image.loading = "lazy";
      const copy = document.createElement("div");
      copy.className = "related-card-copy";
      const category = document.createElement("span");
      category.textContent = i18n.category(item.category);
      const title = document.createElement("h3");
      title.textContent = item.title;
      copy.append(category, title);
      link.append(image, copy);
      card.appendChild(link);
      related.appendChild(card);
    });
  }

  renderPagination();
  decoratePhotoEssayPagination();
  renderRelated();

  const progress = document.querySelector(".reading-progress span");
  const readingMilestones = new Set();
  function updateProgress() {
    const start = article.offsetTop;
    const height = article.scrollHeight - window.innerHeight;
    const value = height > 0 ? Math.min(1, Math.max(0, (window.scrollY - start) / height)) : 0;
    const percent = Math.round(value * 100);
    progress.style.width = `${percent}%`;

    [25, 50, 75, 100].forEach(milestone => {
      if (percent >= milestone && !readingMilestones.has(milestone)) {
        readingMilestones.add(milestone);
        track("reading_progress", {
          article_id: post.id,
          article_title: post.title,
          category: post.category,
          percent: milestone
        });
      }
    });
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
    focusToggle.textContent = on ? t("article.focusExit") : t("article.focus");
  });

  window.addEventListener("d2l:languagechange", () => {
    applyTheme(document.documentElement.dataset.theme || preferredTheme());
    updateMetadata();
    updateArticleChrome();
    const mainCredit = document.querySelector("#article-image-credit");
    if (mainCredit?.dataset.credit) {
      mainCredit.textContent = t("dynamic.imageCredit", { credit: mainCredit.dataset.credit });
    }
    renderArticleBody();
    renderPublicationHistory();
    updateLike();
    setLikeScope(likeScopeKey);
    updateShareUrls();
    renderComments();
    renderPagination();
    decoratePhotoEssayPagination();
    renderRelated();
    updatePhotoEssayChrome();
    ensurePhotoStoryClosing();
    updatePhotoLightboxLabels();
    enforceOriginalLanguageNote();
    focusToggle.textContent = document.body.classList.contains("focus-reading") ? t("article.focusExit") : t("article.focus");
  });
})();
