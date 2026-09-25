(() => {
  "use strict";

  const config = window.D2L_LIKES_CONFIG || {};
  const endpoint = String(config.endpoint || "").trim();
  const isConfigured = /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:$|\?)/.test(endpoint);
  let callbackCounter = 0;

  function jsonp(params = {}) {
    if (!isConfigured) {
      return Promise.reject(new Error("Likes API non configurée"));
    }

    return new Promise((resolve, reject) => {
      callbackCounter += 1;
      const callbackName = `__d2lLikesCallback_${Date.now()}_${callbackCounter}`;
      const script = document.createElement("script");
      const timeout = window.setTimeout(() => finish(new Error("Délai dépassé")), 6500);
      let finished = false;

      function cleanup() {
        window.clearTimeout(timeout);
        script.remove();
        try { delete window[callbackName]; } catch { window[callbackName] = undefined; }
      }

      function finish(error, value) {
        if (finished) return;
        finished = true;
        cleanup();
        if (error) reject(error);
        else resolve(value);
      }

      window[callbackName] = payload => finish(null, payload);
      script.onerror = () => finish(new Error("Service de Likes inaccessible"));

      const url = new URL(endpoint);
      Object.entries({ ...params, callback: callbackName, _: Date.now() }).forEach(([key, value]) => {
        if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
      });

      script.async = true;
      script.src = url.href;
      document.head.appendChild(script);
    });
  }

  async function getCount(postId, title = "") {
    if (!isConfigured) return { configured: false, count: null };
    const result = await jsonp({ action: "count", postId, title });
    return {
      configured: true,
      count: Number.isFinite(Number(result?.count)) ? Math.max(0, Number(result.count)) : 0,
      ok: Boolean(result?.ok)
    };
  }

  async function vote(postId, title, liked) {
    if (!isConfigured) return { configured: false, count: null };

    const body = new URLSearchParams({
      action: "vote",
      postId,
      title,
      liked: liked ? "1" : "0"
    });

    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      cache: "no-store",
      keepalive: true,
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body
    });

    await new Promise(resolve => window.setTimeout(resolve, 220));
    try {
      const result = await getCount(postId, title);
      return { ...result, sent: true };
    } catch {
      return { configured: true, sent: true, count: null, ok: true };
    }
  }

  window.D2LLikesAPI = {
    isConfigured,
    getCount,
    vote
  };
})();
