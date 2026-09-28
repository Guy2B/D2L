/* Chroniques d’ailleurs V52 — responsive image delivery helpers. */
(() => {
  "use strict";

  const manifest = window.D2L_PHOTO_ASSETS || {};
  const defaultResolver = value => value;

  function get(path) {
    return path ? manifest[path] || null : null;
  }

  function resolveSrcset(srcset, resolver = defaultResolver) {
    if (!srcset) return "";
    return srcset.split(",").map(candidate => {
      const parts = candidate.trim().split(/\s+/);
      const url = parts.shift();
      return [resolver(url), ...parts].join(" ");
    }).join(", ");
  }

  function createPicture(img, path, options = {}) {
    const resolver = options.resolver || defaultResolver;
    const asset = get(path);
    const sizes = options.sizes || "100vw";
    const mode = options.mode === "lightbox" ? "lightbox" : "regular";

    if (!asset) {
      img.src = resolver(path || "");
      return img;
    }

    const picture = document.createElement("picture");
    picture.className = options.className || "responsive-picture";
    picture.style.setProperty("--photo-placeholder", asset.color || "transparent");

    const avif = document.createElement("source");
    avif.type = "image/avif";
    avif.srcset = resolveSrcset(asset.avif, resolver);
    avif.sizes = sizes;

    const webp = document.createElement("source");
    webp.type = "image/webp";
    webp.srcset = resolveSrcset(asset.webp, resolver);
    webp.sizes = sizes;

    img.src = resolver(mode === "lightbox" ? asset.lightbox : asset.fallback);
    img.srcset = resolveSrcset(asset.webp, resolver);
    img.sizes = sizes;
    img.width = Number(asset.width || img.width || 0) || undefined;
    img.height = Number(asset.height || img.height || 0) || undefined;
    img.decoding = options.decoding || "async";
    if (options.loading) img.loading = options.loading;
    if (options.fetchPriority) img.fetchPriority = options.fetchPriority;
    img.dataset.responsivePhoto = "true";

    picture.append(avif, webp, img);
    return picture;
  }

  function mount(img, path, options = {}) {
    const parent = img.parentNode;
    const next = img.nextSibling;
    const node = createPicture(img, path, options);
    if (node === img) return img;
    if (parent) parent.insertBefore(node, next);
    return node;
  }

  window.D2LImageTools = { get, resolveSrcset, createPicture, mount };
})();
