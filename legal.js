(() => {
  "use strict";

  const STORAGE_THEME = "die2lap:theme:v11";
  const i18n = window.D2LI18N || { t: key => key };
  const t = key => i18n.t(key);
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const header = document.querySelector('.site-header');
  const yearNode = document.querySelector('#current-year');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      const dark = theme === 'dark';
      themeToggle.setAttribute('aria-label', dark ? t('common.theme_light') : t('common.theme_dark'));
      themeToggle.title = dark ? t('common.theme_light') : t('common.theme_dark');
    }
  }

  let theme = 'light';
  try {
    const stored = localStorage.getItem(STORAGE_THEME);
    if (stored === 'light' || stored === 'dark') theme = stored;
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
  } catch {}
  applyTheme(theme);

  themeToggle?.addEventListener('click', () => {
    theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem(STORAGE_THEME, theme); } catch {}
  });

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    menuToggle.setAttribute('aria-label', expanded ? t('common.menu_open') : t('common.menu_close'));
    if (mobileNav) mobileNav.hidden = expanded;
  });

  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (yearNode) yearNode.textContent = String(new Date().getFullYear());

  document.addEventListener('d2l:languagechange', () => {
    applyTheme(root.getAttribute('data-theme') || 'light');
    if (menuToggle) {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-label', expanded ? t('common.menu_close') : t('common.menu_open'));
    }
  });
})();
