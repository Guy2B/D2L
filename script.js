(() => {
  "use strict";

  const basePosts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];
  const customPosts = Array.isArray(window.CUSTOM_POSTS) ? window.CUSTOM_POSTS : [];
  const posts = [...basePosts, ...customPosts];
  const track = (eventName, params = {}) => window.d2lTrack?.(eventName, params);
  const feed = document.querySelector("#posts-feed");
  const template = document.querySelector("#post-index-template");
  const filters = [...document.querySelectorAll(".filter-chip")];
  const visibleCount = document.querySelector("#visible-count");
  const emptyState = document.querySelector("#empty-state");
  const searchInput = document.querySelector("#post-search");
  const clearSearch = document.querySelector(".clear-search");
  const themeToggle = document.querySelector(".theme-toggle");
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector("#mobile-nav");
  const featuredPosts = document.querySelector("#featured-posts");

  const STORAGE_THEME = "die2lap:theme:v11";
  let activeFilter = "all";
  let searchQuery = "";
  let activeYear = "all";

  const ES_SERIES_INTRO = [
    "La série E.S. suit Edmond Silla, enseignant-chercheur camerounais installé à Karlsruhe, spécialiste de l’énergie, des systèmes de mesure et de l’interprétation de données complexes. D’un lac volcanique africain aux reliefs hydrothermaux de Java, puis aux rives d’Ilopango en Amérique centrale, chaque roman l’entraîne dans une crise où la science ne livre jamais une vérité simple.",
    "Au fil de la série, Edmond est confronté à des menaces naturelles, des infrastructures énergétiques, des erreurs humaines, des intérêts économiques et des décisions politiques dont les conséquences dépassent toujours les modèles. Son rôle n’est pas celui d’un héros omniscient, mais celui d’un homme capable de repérer ce qui manque dans une mesure, ce qui ne concorde pas dans une chronologie, et ce qu’aucune donnée ne peut décider à la place des êtres humains.",
    "E.S. est une série de thrillers scientifiques et géopolitiques où l’eau, l’énergie, la mémoire et le risque se répondent d’un continent à l’autre. Chaque volume est autonome, mais tous explorent la même question : jusqu’où peut-on faire confiance à ce que l’on mesure, lorsque les conséquences, elles, restent profondément humaines ?"
  ];

  const BASE_MANUSCRIPTS = {
    demeure: {
      order: 1,
      cardLabel: "Roman inédit · achevé",
      status: "En soumission",
      kicker: "Roman inédit · En soumission",
      title: "Qu’est-ce qui demeure",
      meta: "Roman littéraire à suspense psychologique · environ 89 000 mots",
      paragraphs: [
        "Le roman est construit en cinq parties intitulées ÉLIAS, ÉLISA, ASILE, SALIE et AILES, cinq mots formés des mêmes lettres.",
        "Élias Keller dispose de cinq jours pour vider la maison de sa mère Mara, à Seltz, en Alsace, avant la remise des clés. Il s’est donné une méthode simple : GARDER, DONNER, JETER.",
        "Dans un carton portant son prénom, il découvre pourtant une photographie prise le 17 août 2008, le jour de ses dix-neuf ans. Mara, Élias et Gabriel, son père, posent devant la maison. Gabriel a une main bandée. Pour Élias, l’image est impossible : il est certain que son père est mort en 2006."
      ]
    },
    jamais: {
      order: 2,
      cardLabel: "Roman inédit · achevé",
      kicker: "Roman inédit · Achevé",
      title: "Il ne saura jamais",
      meta: "Drame psychologique contemporain · environ 82 000 mots · prêt à publication",
      paragraphs: [
        "Jérôme croit avoir tout choisi : quitter sa femme, refaire sa vie avec une autre, sauver son entreprise au terme d’un voyage professionnel décisif à New York.",
        "Ce qu’il ignore, en posant le pied dans l’appartement de sa maîtresse ce soir-là, c’est qu’elle s’apprêtait à le quitter la première. Ce qu’il ignore aussi, c’est que sa femme sait tout depuis des mois, et qu’elle a fini, elle, par cesser d’attendre une vérité qu’il ne lui donnera jamais.",
        "L’accident vasculaire cérébral qui le terrasse au moment précis de cette découverte le prive, à jamais, de la version réelle de sa propre histoire."
      ]
    },
    eau: {
      order: 3,
      cardLabel: "E.S. · achevé",
      status: "En soumission",
      seriesES: true,
      kicker: "Edmond Silla · E.S. · En soumission",
      title: "L’eau qui dort",
      meta: "Roman inédit · 83 194 mots · complet et autonome",
      paragraphs: [
        "L’action se déploie entre le Cameroun, l’Allemagne, le Rwanda et la République démocratique du Congo.",
        "Sous la surface du lac Kivu reposent d’immenses volumes de gaz. Lorsqu’un groupe clandestin décide d’exploiter cette menace pendant un sommet de paix sur l’île d’Idjwi, Edmond Silla, enseignant-chercheur camerounais installé à Karlsruhe, devient le seul homme capable de lire les plans volés à son ami mort à Goma.",
        "À ses côtés, Kímyá Lukéni, haute fonctionnaire respectée, semble guidée par Maï, une amie d’enfance dont la présence devient de plus en plus difficile à saisir. Le danger enfoui dans le lac répond alors à celui que la mémoire de Kímyá retient depuis l’enfance."
      ]
    },
    java: {
      order: 4,
      cardLabel: "E.S. · achevé",
      seriesES: true,
      kicker: "Edmond Silla · E.S. · Achevé",
      title: "Résurgence à Java",
      meta: "Roman inédit · complet et autonome",
      paragraphs: [
        "L’action se déploie entre Karlsruhe et l’est de Java, autour du massif volcanique de l’Ijen.",
        "Lorsqu’un projet géothermique est confronté à des variations inexpliquées dans les sources, les puits et les circulations souterraines, Edmond Silla est appelé pour examiner des données que personne ne parvient plus à interpréter de la même manière.",
        "Aux côtés de Ratih Pranowo et de son frère Bima, il découvre un territoire où se superposent hydrothermalisme naturel, anciennes contaminations industrielles, intérêts économiques et décisions longtemps dissimulées.",
        "À mesure que les explications les plus évidentes se fissurent, une question devient urgente : que se passe-t-il lorsque l’installation que l’on soupçonne d’aggraver le danger contribue peut-être aussi à le contenir ?"
      ]
    },
    "47secondes": {
      order: 5,
      cardLabel: "E.S. · achevé",
      seriesES: true,
      kicker: "Edmond Silla · E.S. · Achevé",
      title: "47 secondes",
      meta: "Roman inédit · complet et autonome",
      paragraphs: [
        "L’action se déploie entre Karlsruhe, San Salvador, le lac Ilopango et la vallée du Río Jiboa.",
        "Pendant quarante-sept secondes, une oscillation traverse le réseau électrique régional d’Amérique centrale. Au même moment, des pompes s’arrêtent, des capteurs enregistrent des variations inhabituelles et, sur le lac Ilopango, un pêcheur voit l’eau se retirer avant de revenir.",
        "Edmond Silla, venu auditer l’architecture de mesure du réseau, se retrouve au centre d’une enquête où chaque système raconte une chronologie différente. Avec Valeria Cañas, Ximena Alfaro et Camila Sosa, il doit distinguer les coïncidences des causes réelles.",
        "Mais lorsque les pluies transforment l’exutoire du lac en menace pour le Jiboa, mesurer ne suffit plus : il faut décider où le risque peut être accepté - et par qui."
      ]
    }
  };

  const customBooks = window.CUSTOM_BOOKS && typeof window.CUSTOM_BOOKS === "object" ? window.CUSTOM_BOOKS : {};
  const MANUSCRIPTS = { ...BASE_MANUSCRIPTS, ...customBooks };

  const formatDate = (isoDate) => isoDate
    ? new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" })
        .format(new Date(`${isoDate}T12:00:00`))
    : "";

  const articleHref = post => `article.html?id=${encodeURIComponent(post.id)}`;

  function plainText(post) {
    return (post.content || [])
      .filter(block => block && typeof block === "object")
      .map(block => block.text || block.caption || "")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function wordCount(post) {
    const text = plainText(post);
    return text ? text.split(/\s+/).filter(Boolean).length : 0;
  }

  function readMinutes(post) {
    return Math.max(1, Math.ceil(wordCount(post) / 220));
  }

  function excerpt(post, max = 220) {
    const source = String(post.archiveExcerpt || plainText(post)).replace(/\s+/g, " ").trim();
    if (source.length <= max) return source;
    const cut = source.slice(0, max);
    const boundary = cut.lastIndexOf(" ");
    return `${cut.slice(0, boundary > 0 ? boundary : max)}…`;
  }

  function appendLinkedPublication(container, prefix, label, url) {
    container.append(prefix);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    container.append(link, " ↗");
  }

  function createIndexCard(post) {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".index-card");
    card.dataset.category = post.category;

    const href = articleHref(post);
    const figureLink = card.querySelector(".index-figure-link");
    const image = card.querySelector(".index-image");
    figureLink.href = href;
    figureLink.classList.toggle("is-contained", post.imageMode === "contain");
    image.src = post.image || "";
    image.alt = post.imageAlt || "";
    image.addEventListener("error", () => figureLink.remove(), { once: true });

    card.querySelector(".post-category").textContent = post.category;
    const time = card.querySelector(".post-date");
    if (post.date) {
      time.dateTime = post.date;
      time.textContent = formatDate(post.date);
    } else {
      card.querySelector(".post-date-wrap").hidden = true;
    }

    const titleLink = card.querySelector(".post-link");
    titleLink.href = href;
    titleLink.textContent = post.title;

    card.querySelector(".index-excerpt").textContent = excerpt(post);
    card.querySelector(".read-link").href = href;
    card.querySelector(".reading-time").textContent = `${readMinutes(post)} min`;

    const archiveCommentsBadge = card.querySelector(".archive-comments-badge");
    const archivedComments = Number(post.archiveComments || 0);
    if (archiveCommentsBadge && archivedComments > 0) {
      archiveCommentsBadge.hidden = false;
      archiveCommentsBadge.textContent = `${archivedComments} com. archive`;
      archiveCommentsBadge.title = `${archivedComments} commentaire${archivedComments > 1 ? "s" : ""} sur le blog d’origine`;
    }

    const provenance = card.querySelector(".index-provenance");
    if (post.sourceUrl || (post.alsoPublished || []).length) {
      provenance.hidden = false;
      if (post.sourceUrl) {
        appendLinkedPublication(provenance, "Publié sur ", post.sourceLabel || "le blog d’origine", post.sourceUrl);
      }
      for (const publication of (post.alsoPublished || [])) {
        if (provenance.childNodes.length) provenance.append(" · ");
        appendLinkedPublication(provenance, "Aussi sur ", publication.name || "un autre média", publication.url);
      }
    }

    return fragment;
  }

  function matchesSearch(post) {
    if (!searchQuery) return true;
    const haystack = [
      post.title,
      post.archiveTitle,
      post.category,
      ...(post.archiveCategories || []),
      post.archiveExcerpt,
      plainText(post)
    ].filter(Boolean).join(" ").toLocaleLowerCase("fr");
    return haystack.includes(searchQuery);
  }

  function renderPosts() {
    const visible = [...posts]
      .filter(post => activeFilter === "all" || post.category === activeFilter)
      .filter(post => activeYear === "all" || String(post.date || "").startsWith(`${activeYear}-`))
      .filter(matchesSearch)
      .sort((a, b) => {
        if (a.date && b.date) return new Date(b.date) - new Date(a.date);
        if (a.date) return -1;
        if (b.date) return 1;
        return Number(a.order || 9999) - Number(b.order || 9999);
      });

    feed.replaceChildren();
    visible.forEach(post => feed.appendChild(createIndexCard(post)));
    visibleCount.textContent = String(visible.length);
    emptyState.hidden = visible.length > 0;
    clearSearch.hidden = !searchQuery && activeFilter === "all" && activeYear === "all";
    requestAnimationFrame(activateReveal);
  }

  function newestByCategory(category) {
    return [...posts]
      .filter(post => post.category === category)
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))[0];
  }

  function createDoorForPost(post, label, eyebrow) {
    if (!post) return null;
    const card = document.createElement("article");
    card.className = "featured-card door-card reveal-on-scroll";
    card.classList.toggle("is-contained", post.imageMode === "contain");
    const link = document.createElement("a");
    link.href = articleHref(post);
    const img = document.createElement("img");
    img.src = post.image || "";
    img.alt = post.imageAlt || "";
    img.loading = "lazy";
    const copy = document.createElement("div");
    copy.className = "featured-card-copy";
    const type = document.createElement("span");
    type.className = "door-type";
    type.textContent = eyebrow;
    const title = document.createElement("h3");
    title.textContent = post.title;
    const action = document.createElement("span");
    action.className = "door-action";
    action.textContent = label;
    copy.append(type, title, action);
    link.append(img, copy);
    card.appendChild(link);
    return card;
  }

  function createDoorForBook(key, book) {
    const card = document.createElement("article");
    card.className = "featured-card door-card door-book reveal-on-scroll";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "door-book-button";
    button.dataset.book = key;
    button.setAttribute("aria-haspopup", "dialog");
    const art = document.createElement("span");
    art.className = "door-book-art";
    art.setAttribute("aria-hidden", "true");
    const copy = document.createElement("div");
    copy.className = "featured-card-copy";
    const type = document.createElement("span");
    type.className = "door-type";
    type.textContent = "Roman";
    const title = document.createElement("h3");
    title.textContent = book.title;
    const action = document.createElement("span");
    action.className = "door-action";
    action.textContent = "Lire le synopsis →";
    copy.append(type, title, action);
    button.append(art, copy);
    card.appendChild(button);
    return card;
  }

  function renderFeatured() {
    featuredPosts.replaceChildren();
    const nouvelle = newestByCategory("Nouvelles") || newestByCategory("Chroniques");
    const poeme = newestByCategory("Poèmes");
    const bookKey = MANUSCRIPTS.demeure ? "demeure" : Object.keys(MANUSCRIPTS)[0];
    const doors = [
      createDoorForPost(nouvelle, "Lire la nouvelle →", "Nouvelle"),
      createDoorForPost(poeme, "Lire le poème →", "Poème"),
      bookKey ? createDoorForBook(bookKey, MANUSCRIPTS[bookKey]) : null
    ].filter(Boolean);
    doors.forEach(card => featuredPosts.appendChild(card));
  }

  function renderYears() {
    const strip = document.querySelector("#year-strip");
    if (!strip) return;
    const years = [...new Set(posts.map(post => post.date?.slice(0, 4)).filter(Boolean))].sort((a,b) => Number(b) - Number(a));
    strip.replaceChildren();
    const all = document.createElement("button");
    all.type = "button";
    all.className = `year-chip ${activeYear === "all" ? "is-active" : ""}`;
    all.textContent = "Toutes";
    all.addEventListener("click", () => {
      activeYear = "all";
      track("library_year", { year: "all" });
      renderYears();
      renderPosts();
    });
    strip.appendChild(all);
    years.forEach(year => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `year-chip ${activeYear === year ? "is-active" : ""}`;
      b.textContent = year;
      b.addEventListener("click", () => {
        activeYear = year;
        track("library_year", { year });
        renderYears();
        renderPosts();
      });
      strip.appendChild(b);
    });
  }

  function renderWorks() {
    const grid = document.querySelector("#works-grid");
    if (!grid) return;
    grid.replaceChildren();
    const entries = Object.entries(MANUSCRIPTS).sort(([,a],[,b]) => Number(a.order || 99) - Number(b.order || 99));
    let seriesBannerAdded = false;
    entries.forEach(([key, book]) => {
      if (book.seriesES && !seriesBannerAdded) {
        const banner = document.createElement("div");
        banner.className = "series-banner reveal-on-scroll";
        const esCount = entries.filter(([, candidate]) => candidate.seriesES).length;
        banner.innerHTML = `<div><p class="series-label">Série Edmond Silla · E.S.</p><h3>Science, risque, énergie, mémoire.</h3></div><p>${esCount === 3 ? "Trois" : esCount} thrillers autonomes reliés par un même personnage et une même question : jusqu’où peut-on faire confiance à ce que l’on mesure lorsque les conséquences restent profondément humaines ?</p>`;
        grid.appendChild(banner);
        seriesBannerAdded = true;
      }
      const btn = document.createElement("button");
      const layoutClass = book.seriesES ? "work-card-es" : "work-card-primary";
      btn.className = `work-card work-card-button ${layoutClass} reveal-on-scroll ${book.status ? "work-card-submission" : ""}`;
      btn.type = "button";
      btn.dataset.book = key;
      btn.setAttribute("aria-haspopup", "dialog");
      const top = document.createElement("div");
      top.className = "work-topline";
      const label = document.createElement("p");
      label.className = "work-kicker";
      label.textContent = book.cardLabel || (book.seriesES ? "E.S. · achevé" : "Roman inédit · achevé");
      top.appendChild(label);
      if (book.status) {
        const status = document.createElement("span");
        status.className = "work-status";
        status.textContent = book.status;
        top.appendChild(status);
      }
      const h = document.createElement("h3");
      h.textContent = book.title;
      const p = document.createElement("p");
      p.textContent = book.cardText || book.meta || "Roman achevé";
      const read = document.createElement("span");
      read.className = "work-read";
      read.textContent = book.seriesES ? "Série + synopsis ↗" : "Lire le synopsis ↗";
      btn.append(top, h, p, read);
      grid.appendChild(btn);
    });
    const progress = document.createElement("article");
    progress.className = "work-card work-card-progress work-card-progress-wide reveal-on-scroll";
    progress.innerHTML = `<div class="work-progress-copy"><p class="work-kicker">En cours d’écriture</p><h3>Autres manuscrits</h3></div><div class="work-progress-meta"><p>D’autres manuscrits sont actuellement en cours d’écriture.</p><span class="work-read work-read-muted">Travaux en cours</span></div>`;
    grid.appendChild(progress);
  }

  filters.forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      track("library_filter", { filter: activeFilter });
      filters.forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderPosts();
    });
  });

  let searchAnalyticsTimer = null;
  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value.trim().toLocaleLowerCase("fr");
    renderPosts();
    clearTimeout(searchAnalyticsTimer);
    if (searchQuery.length >= 2) {
      searchAnalyticsTimer = setTimeout(() => {
        track("library_search", {
          search_term: searchQuery.slice(0, 80),
          results: Number(visibleCount.textContent || 0)
        });
      }, 650);
    }
  });

  clearSearch.addEventListener("click", () => {
    track("library_reset");
    searchInput.value = "";
    searchQuery = "";
    activeFilter = "all";
    activeYear = "all";
    renderYears();
    filters.forEach((item, index) => {
      const active = index === 0;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderPosts();
    searchInput.focus();
  });

  document.querySelector(".surprise-button")?.addEventListener("click", () => {
    const pool = posts.filter(post => post.id);
    const post = pool[Math.floor(Math.random() * pool.length)];
    if (post) {
      track("surprise_open", { article_id: post.id, article_title: post.title, category: post.category });
      window.location.href = articleHref(post);
    }
  });

  function preferredTheme() {
    const stored = localStorage.getItem(STORAGE_THEME);
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
    localStorage.setItem(STORAGE_THEME, next);
    applyTheme(next);
  });

  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    mobileNav.hidden = open;
    menuToggle.querySelector("span").textContent = open ? "☰" : "×";
  });
  mobileNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.querySelector("span").textContent = "☰";
    });
  });

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  const dialog = document.querySelector("#synopsis-dialog");
  const synopsisKicker = document.querySelector("#synopsis-kicker");
  const synopsisTitle = document.querySelector("#synopsis-title");
  const synopsisMeta = document.querySelector("#synopsis-meta");
  const synopsisCopy = document.querySelector("#synopsis-copy");
  let returnFocus = null;

  const appendHeading = text => {
    const h = document.createElement("h3");
    h.className = "synopsis-section-title";
    h.textContent = text;
    synopsisCopy.appendChild(h);
  };

  const appendParagraphs = paragraphs => {
    paragraphs.forEach(text => {
      const p = document.createElement("p");
      p.textContent = text;
      synopsisCopy.appendChild(p);
    });
  };

  function openSynopsis(key, trigger) {
    const book = MANUSCRIPTS[key];
    if (!book) return;

    returnFocus = trigger;
    synopsisKicker.textContent = book.kicker;
    synopsisTitle.textContent = book.title;
    synopsisMeta.textContent = book.meta;
    synopsisCopy.replaceChildren();

    if (book.seriesES) {
      appendHeading("La série E.S.");
      appendParagraphs(ES_SERIES_INTRO);
      const separator = document.createElement("div");
      separator.className = "synopsis-separator";
      separator.setAttribute("aria-hidden", "true");
      synopsisCopy.appendChild(separator);
      appendHeading(`Ce volume : ${book.title}`);
    }

    appendParagraphs(book.paragraphs);
    track("synopsis_open", { book_id: key, book_title: book.title, series_es: book.seriesES ? 1 : 0 });
    dialog.showModal();
    dialog.querySelector(".synopsis-close").focus();
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-book]");
    if (button) openSynopsis(button.dataset.book, button);
  });

  dialog.querySelector(".synopsis-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => returnFocus?.focus());

  function renderResume() {
    const saved = (() => { try { return JSON.parse(localStorage.getItem("die2lap:last-read:v12")); } catch { return null; } })();
    if (!saved?.id) return;
    const found = posts.find(post => post.id === saved.id);
    if (!found) return;
    const section = document.querySelector("#resume-section");
    const link = document.querySelector("#resume-link");
    const title = document.querySelector("#resume-title");
    if (!section || !link || !title) return;
    link.href = articleHref(found);
    title.textContent = found.title;
    link.addEventListener("click", () => track("resume_reading", { article_id: found.id, article_title: found.title }));
    section.hidden = false;
  }

  function activateReveal() {
    const items = document.querySelectorAll(".reveal-on-scroll, .index-card, .cv-card, .archive-card");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(item => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: "0px 0px -30px" });
    items.forEach(item => observer.observe(item));
  }

  document.addEventListener("keydown", event => {
    if (event.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
      event.preventDefault();
      searchInput?.focus();
    }
  });

  document.querySelector("#current-year").textContent = new Date().getFullYear();
  const bookCount = Object.keys(MANUSCRIPTS).length;
  const submissionCount = Object.values(MANUSCRIPTS).filter(book => book.status === "En soumission").length;
  document.querySelector("#stat-posts").textContent = String(posts.length);
  document.querySelector("#stat-books").textContent = String(bookCount);
  const libraryLede = document.querySelector("#library-lede");
  if (libraryLede) libraryLede.textContent = `${posts.length} publications replacées dans leur chronologie et reliées à leurs sources d’origine.`;
  const worksAside = document.querySelector("#works-aside");
  if (worksAside) worksAside.textContent = `${bookCount} romans terminés. ${submissionCount} ${submissionCount > 1 ? "sont" : "est"} actuellement en soumission. Cliquez sur un titre pour lire son synopsis.`;

  renderFeatured();
  renderWorks();
  renderYears();
  renderPosts();
  renderResume();
  requestAnimationFrame(activateReveal);
})();
