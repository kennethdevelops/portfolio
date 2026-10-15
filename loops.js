(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const tracked = new Set();
  const visible = new Set();
  const load = video => {
    if (!video.getAttribute('src')) {
      video.src = video.dataset.src;
      video.load();
    }
  };
  function sync(video) {
    const dialog = video.closest('dialog');
    const onscreen = video.isConnected && visible.has(video) && !document.hidden && !document.getElementById('game-dialog')?.open && (!dialog || dialog.open);
    video.controls = video.dataset.preview !== 'true' && (reduced.matches || video.dataset.blocked === 'true');
    if (!onscreen || reduced.matches) {
      video.pause();
      // Reduced-motion visitors see a still poster for control-free previews.
      if (onscreen && reduced.matches) load(video);
      return;
    }
    load(video);
    video.play()?.catch(() => {
      if (video.isConnected && visible.has(video) && !document.hidden && !document.getElementById('game-dialog')?.open && (!dialog || dialog.open)) {
        video.dataset.blocked = 'true';
        video.controls = video.dataset.preview !== 'true';
      }
    });
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
      sync(entry.target);
    });
  }, { threshold: 0.15 }) : null;
  function mount() {
    tracked.forEach(video => {
      if (!video.isConnected) {
        video.pause();
        observer?.unobserve(video);
        tracked.delete(video); visible.delete(video);
      }
    });
    document.querySelectorAll('.motion-video').forEach(video => {
      if (tracked.has(video)) return;
      tracked.add(video);
      video.muted = true;
      if (observer) observer.observe(video); else visible.add(video);
      sync(video);
    });
  }
  document.addEventListener('portfolio:media', mount);
  document.addEventListener('portfolio:game-state', () => tracked.forEach(sync));
  document.addEventListener('visibilitychange', () => tracked.forEach(sync));
  reduced.addEventListener('change', () => tracked.forEach(sync));
  mount();
})();
