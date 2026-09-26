(() => {
  "use strict";

  const sendPageView = () => {
    if (typeof window.d2lTrack !== "function") return;
    window.d2lTrack("page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${window.location.pathname}${window.location.search}`
    });
  };

  // Defer one task so dynamic article metadata/title set by article.js is already available.
  window.setTimeout(sendPageView, 0);
})();
