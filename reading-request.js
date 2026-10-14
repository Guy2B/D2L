/* Chroniques d’ailleurs — bouton « Demander à lire » et formulaire de demande.
   La demande est transmise en HTTPS au service d2l-public-api (aucun accès n’est accordé automatiquement). */
(() => {
  "use strict";

  const ENDPOINT = "https://d2l-public-api.guybeaho.workers.dev/v1/reading-requests";
  const SITEKEY = "0x4AAAAAAFWr9dbC4qJABjdE";
  // Clés du site public -> identifiants des romans dans la liseuse privée.
  const BOOKS = [
    ["demeure", "qcd", "Qu’est-ce qui demeure"],
    ["jamais", "ijsj", "Il ne saura jamais"],
    ["ailleurs", "dailleurs", "D’ailleurs…"],
    ["eau", "es1", "E.S. I - L’eau qui dort"],
    ["java", "es2", "E.S. II - Résurgence à Java"],
    ["47secondes", "es3", "E.S. III - 47 Secondes"],
    ["chemin", "es4", "E.S. IV - Le chemin"]
  ];
  const byPublicKey = new Map(BOOKS.map(([key, id, title]) => [key, { id, title }]));

  const I18N = {
    fr: { cta: "Demander à lire", title: "Demander à lire", intro: "Mes romans sont inédits. Chaque demande est lue personnellement ; si elle est acceptée, vous recevrez par e-mail un lien de lecture privé et personnel.", book: "Roman", name: "Votre nom", email: "Votre adresse e-mail", message: "Message (facultatif)", messageHint: "Quelques mots sur vous ou sur ce qui vous attire dans ce roman.", consent: "J’accepte que mon nom et mon adresse e-mail soient utilisés uniquement pour traiter cette demande et me répondre.", privacy: "Ces données ne sont ni publiées ni transmises à des tiers. Vous pouvez demander leur suppression à tout moment à contact@guybeaho.com.", send: "Envoyer ma demande", sending: "Envoi en cours…", close: "Fermer", wait: "Merci de patienter pendant la vérification anti-robot.", network: "Envoi impossible : vérifiez votre connexion et réessayez.", done: "C’est noté !" },
    en: { cta: "Request to read", title: "Request to read", intro: "My novels are unpublished. Every request is read personally; if accepted, you will receive a private, personal reading link by email.", book: "Novel", name: "Your name", email: "Your email address", message: "Message (optional)", messageHint: "A few words about yourself or what draws you to this novel.", consent: "I agree that my name and email address are used solely to process this request and reply to me.", privacy: "This data is neither published nor shared with third parties. You can ask for its deletion at any time at contact@guybeaho.com.", send: "Send my request", sending: "Sending…", close: "Close", wait: "Please wait for the anti-bot check to finish.", network: "Could not send: please check your connection and try again.", done: "Noted!" },
    de: { cta: "Leseanfrage", title: "Leseanfrage stellen", intro: "Meine Romane sind unveröffentlicht. Jede Anfrage wird persönlich gelesen; wird sie angenommen, erhalten Sie per E-Mail einen privaten, persönlichen Leselink.", book: "Roman", name: "Ihr Name", email: "Ihre E-Mail-Adresse", message: "Nachricht (optional)", messageHint: "Ein paar Worte über Sie oder darüber, was Sie an diesem Roman reizt.", consent: "Ich bin einverstanden, dass mein Name und meine E-Mail-Adresse ausschließlich zur Bearbeitung dieser Anfrage und zur Antwort verwendet werden.", privacy: "Diese Daten werden weder veröffentlicht noch an Dritte weitergegeben. Sie können ihre Löschung jederzeit unter contact@guybeaho.com verlangen.", send: "Anfrage senden", sending: "Wird gesendet…", close: "Schließen", wait: "Bitte warten Sie, bis die Anti-Bot-Prüfung abgeschlossen ist.", network: "Senden nicht möglich: Bitte prüfen Sie Ihre Verbindung.", done: "Danke!" }
  };
  const lang = () => {
    const l = (document.documentElement.lang || "fr").slice(0, 2).toLowerCase();
    return I18N[l] ? l : "fr";
  };
  const t = key => I18N[lang()][key];

  /* ---------- Bouton sous chaque roman ---------- */

  // La carte d’origine est un <button> : on la transforme en carte contenant deux boutons distincts
  // (synopsis et demande), pour rester valide et accessible au clavier.
  function enhanceCard(card) {
    const key = card.dataset.book;
    // Romans publiés depuis l’Atelier : bouton actif seulement s’ils sont reliés à la liseuse.
    const custom = window.CUSTOM_BOOKS && window.CUSTOM_BOOKS[key];
    if (!byPublicKey.has(key) && custom && /^[a-z0-9-]{2,40}$/.test(custom.readerBookId || "")) {
      byPublicKey.set(key, { id: custom.readerBookId, title: custom.title });
      if (!BOOKS.some(b => b[1] === custom.readerBookId)) BOOKS.push([key, custom.readerBookId, custom.title]);
    }
    const book = byPublicKey.get(key);
    if (!book || card.dataset.requestReady) return;
    const wrapper = document.createElement("div");
    wrapper.className = card.className + " work-card-has-request";
    if (card.dataset.cover) wrapper.dataset.cover = card.dataset.cover;
    wrapper.dataset.requestReady = "1";
    const title = card.querySelector("h3")?.textContent || book.title;
    while (card.firstChild) wrapper.appendChild(card.firstChild);
    const open = document.createElement("button");
    open.type = "button";
    open.className = "work-card-open";
    open.dataset.book = key;
    open.setAttribute("aria-haspopup", "dialog");
    open.setAttribute("aria-label", title);
    wrapper.prepend(open);
    const request = document.createElement("button");
    request.type = "button";
    request.className = "work-request-btn";
    request.dataset.requestBook = book.id;
    request.textContent = t("cta");
    request.setAttribute("aria-label", `${t("cta")} : ${title}`);
    wrapper.appendChild(request);
    card.replaceWith(wrapper);
    // Filet de sécurité pour l’animation d’apparition du site.
    setTimeout(() => wrapper.classList.add("is-visible"), 1500);
  }

  function enhanceAll() {
    document.querySelectorAll("#works-grid button.work-card[data-book]").forEach(enhanceCard);
  }

  // Bouton aussi présent en bas du synopsis.
  let lastSynopsisKey = null;
  document.addEventListener("click", e => {
    const trigger = e.target.closest("[data-book]");
    if (trigger) lastSynopsisKey = trigger.dataset.book;
  }, true);

  function enhanceSynopsis() {
    const copy = document.querySelector("#synopsis-copy");
    const book = lastSynopsisKey && byPublicKey.get(lastSynopsisKey);
    if (!copy || !book || copy.querySelector(".synopsis-request")) return;
    const box = document.createElement("div");
    box.className = "synopsis-request";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "work-request-btn work-request-btn-large";
    btn.dataset.requestBook = book.id;
    btn.textContent = t("cta");
    box.appendChild(btn);
    copy.appendChild(box);
  }

  /* ---------- Formulaire ---------- */

  let dialog, form, status, widgetId = null, turnstileLoading = null;

  function loadTurnstile() {
    if (window.turnstile) return Promise.resolve();
    if (turnstileLoading) return turnstileLoading;
    turnstileLoading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true; s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => { turnstileLoading = null; reject(new Error("turnstile")); };
      document.head.appendChild(s);
    });
    return turnstileLoading;
  }

  function el(tag, attrs = {}, text) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    if (text) node.textContent = text;
    return node;
  }

  function buildDialog() {
    dialog = el("dialog", { class: "reading-request-dialog", "aria-labelledby": "rr-title" });
    const inner = el("div", { class: "reading-request-inner" });
    const close = el("button", { type: "button", class: "synopsis-close rr-close", "aria-label": t("close") }, "×");
    close.addEventListener("click", () => dialog.close());
    const h = el("h2", { id: "rr-title" }, t("title"));
    const intro = el("p", { class: "rr-intro" }, t("intro"));
    form = el("form", { class: "rr-form", novalidate: "" });
    const field = (label, control, hint) => {
      const l = el("label", { class: "rr-field" });
      l.append(el("span", {}, label), control);
      if (hint) l.append(el("small", {}, hint));
      return l;
    };
    const select = el("select", { name: "book_id", required: "" });
    for (const [, id, title] of BOOKS) select.append(new Option(title, id));
    const name = el("input", { name: "name", type: "text", required: "", minlength: "2", maxlength: "120", autocomplete: "name" });
    const email = el("input", { name: "email", type: "email", required: "", maxlength: "254", autocomplete: "email", inputmode: "email" });
    const message = el("textarea", { name: "message", rows: "4", maxlength: "2000" });
    const honeypot = el("input", { name: "website", type: "text", tabindex: "-1", autocomplete: "off", class: "rr-hp", "aria-hidden": "true" });
    const consent = el("label", { class: "rr-consent" });
    const consentBox = el("input", { type: "checkbox", name: "consent", required: "" });
    consent.append(consentBox, el("span", {}, t("consent")));
    const privacy = el("p", { class: "rr-privacy" }, t("privacy"));
    const widget = el("div", { class: "rr-turnstile" });
    status = el("p", { class: "rr-status", role: "status", "aria-live": "polite" });
    const submit = el("button", { type: "submit", class: "button button-primary rr-submit" }, t("send"));
    form.append(field(t("book"), select), field(t("name"), name), field(t("email"), email), field(t("message"), message, t("messageHint")), honeypot, consent, privacy, widget, submit, status);
    inner.append(close, h, intro, form);
    dialog.append(inner);
    dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
    document.body.appendChild(dialog);

    form.addEventListener("submit", async e => {
      e.preventDefault();
      status.dataset.kind = "";
      if (!form.reportValidity()) return;
      const token = window.turnstile && widgetId !== null ? window.turnstile.getResponse(widgetId) : "";
      if (!token) { status.textContent = t("wait"); return; }
      submit.disabled = true; submit.textContent = t("sending");
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST", headers: { "Content-Type": "application/json" }, credentials: "omit", referrerPolicy: "strict-origin",
          body: JSON.stringify({ book_id: select.value, name: name.value, email: email.value, message: message.value, website: honeypot.value, consent: consentBox.checked, turnstile_token: token, lang: lang() })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || t("network"));
        form.hidden = true;
        intro.textContent = data.message;
        h.textContent = t("done");
        status.textContent = "";
        try { window.gtag && window.gtag("event", "reading_request", { book_id: select.value }); } catch {}
      } catch (err) {
        status.dataset.kind = "error";
        status.textContent = err.message === "Failed to fetch" ? t("network") : err.message;
        if (window.turnstile && widgetId !== null) window.turnstile.reset(widgetId);
      } finally {
        submit.disabled = false; submit.textContent = t("send");
      }
    });
  }

  async function openForm(bookId) {
    if (!dialog || dialog.dataset.lang !== lang()) { dialog?.remove(); widgetId = null; buildDialog(); dialog.dataset.lang = lang(); }
    if (form.hidden) { dialog.remove(); widgetId = null; buildDialog(); dialog.dataset.lang = lang(); }
    form.elements.book_id.value = bookId;
    status.textContent = ""; status.dataset.kind = "";
    document.querySelector("#synopsis-dialog")?.open && document.querySelector("#synopsis-dialog").close();
    dialog.showModal();
    form.elements.name.focus();
    try {
      await loadTurnstile();
      if (widgetId === null) widgetId = window.turnstile.render(form.querySelector(".rr-turnstile"), { sitekey: SITEKEY, language: lang(), theme: "auto", action: "reading_request" });
    } catch {
      status.dataset.kind = "error"; status.textContent = t("network");
    }
  }

  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-request-book]");
    if (!btn) return;
    e.preventDefault(); e.stopPropagation();
    openForm(btn.dataset.requestBook);
  });

  function start() {
    const grid = document.querySelector("#works-grid");
    if (grid) { enhanceAll(); new MutationObserver(enhanceAll).observe(grid, { childList: true }); }
    const copy = document.querySelector("#synopsis-copy");
    if (copy) new MutationObserver(enhanceSynopsis).observe(copy, { childList: true });
    // Le site met à jour lang à chaque changement de langue : actualiser les libellés des boutons.
    new MutationObserver(() => document.querySelectorAll(".work-request-btn").forEach(b => { b.textContent = t("cta"); }))
      .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
