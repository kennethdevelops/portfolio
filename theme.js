(() => {
  const key = 'kenneth-portfolio-theme';
  const root = document.documentElement;
  let theme = 'dark';
  try {
    const saved = localStorage.getItem(key);
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch { /* The toggle also works when browser storage is unavailable. */ }

  function applyTheme(value) {
    root.dataset.theme = value;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', value === 'dark' ? '#191d19' : '#f3f1e9');
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    const next = value === 'dark' ? 'light' : 'dark';
    const label = `Switch to ${next} theme`;
    button.setAttribute('aria-label', label);
    button.title = label;
    document.getElementById('theme-label').textContent = next === 'light' ? 'Light' : 'Dark';
  }

  // Apply the saved palette before the stylesheet loads to prevent a light flash.
  applyTheme(theme);
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(theme);
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('theme-ready')));
    document.getElementById('theme-toggle').addEventListener('click', () => {
      theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(theme);
      try { localStorage.setItem(key, theme); } catch { /* Keep the in-page choice. */ }
    });
  });
})();
