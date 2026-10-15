(() => {
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const images = [...document.querySelectorAll('.motion-image')];
  const visible = new Set();
  let pointerX = 0, pointerY = 0, frame = 0;
  const stopped = () => preference.matches;

  function updateImage(image) {
    const animate = !stopped() && !document.hidden && visible.has(image);
    const src = animate ? image.dataset.gif : image.dataset.still;
    if (image.getAttribute('src') !== src) image.setAttribute('src', src);
  }
  function draw() {
    frame = 0;
    if (stopped()) {
      root.style.setProperty('--depth-y', '0px');
      root.style.setProperty('--depth-x', '0px');
      return;
    }
    const range = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const travel = Math.min(1, Math.max(0, scrollY / range)) * -100;
    root.style.setProperty('--depth-y', `${(travel + pointerY).toFixed(1)}px`);
    root.style.setProperty('--depth-x', `${pointerX.toFixed(1)}px`);
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
  function sync() {
    root.classList.toggle('motion-paused', stopped());
    images.forEach(updateImage);
    schedule();
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
        updateImage(entry.target);
      });
    }, { threshold: 0.05 });
    images.forEach(image => observer.observe(image));
  } else { images.forEach(image => visible.add(image)); }
  addEventListener('scroll', () => { if (!stopped()) schedule(); }, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  if (window.matchMedia('(pointer: fine)').matches) {
    addEventListener('pointermove', event => {
      if (stopped()) return;
      pointerX = (event.clientX / innerWidth - 0.5) * 14;
      pointerY = (event.clientY / innerHeight - 0.5) * 10;
      schedule();
    }, { passive: true });
    document.addEventListener('pointerleave', () => { pointerX = pointerY = 0; schedule(); });
  }
  document.addEventListener('visibilitychange', () => images.forEach(updateImage));
  preference.addEventListener('change', sync);
  sync();
})();
