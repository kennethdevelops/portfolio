(() => {
  const games = {
    nonna: { title: 'Nonna’s Kitchen', path: 'games/nonnas-kitchen/index.html' },
    playable: { title: 'Scrambly Rescue Run · Playable ad', path: 'games/scrambly-rescue-run/index.html' }
  };
  const dialog = document.getElementById('game-dialog');
  const stage = document.getElementById('game-stage');
  const loading = document.getElementById('game-loading');
  const fullscreen = document.getElementById('game-fullscreen');
  let returnFocus;
  const notify = () => document.dispatchEvent(new Event('portfolio:game-state'));
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-game]');
    const game = games[button?.dataset.game];
    if (!game) return;
    returnFocus = button.closest('#case-dialog')
      ? document.querySelector(`.project-actions [data-game="${button.dataset.game}"]`) : button;
    document.getElementById('case-dialog').close();
    document.getElementById('game-title').textContent = game.title;
    document.getElementById('game-new-tab').href = game.path;
    stage.querySelector('iframe')?.remove();
    loading.textContent = 'Loading game…';
    loading.hidden = false;
    const frame = document.createElement('iframe');
    frame.title = `Play ${game.title}`;
    frame.allow = 'autoplay; fullscreen; gamepad';
    frame.allowFullscreen = true;
    frame.addEventListener('load', () => {
      if (!dialog.open || !frame.isConnected) return;
      loading.hidden = true;
      frame.focus();
    }, { once: true });
    dialog.showModal();
    document.body.classList.add('dialog-open');
    notify();
    // Mount only after a deliberate click. Removing the frame stops its audio and render loop.
    frame.src = game.path;
    stage.append(frame);
  });
  document.getElementById('game-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    stage.querySelector('iframe')?.remove();
    if (document.fullscreenElement === dialog) document.exitFullscreen().catch(() => {});
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open');
    notify();
    returnFocus?.focus();
  });
  fullscreen.hidden = !dialog.requestFullscreen;
  fullscreen.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement === dialog) await document.exitFullscreen();
      else await dialog.requestFullscreen();
    } catch {
      loading.textContent = 'Fullscreen is unavailable here. Use “Open in a new tab” for more room.';
      loading.hidden = false;
    }
  });
  document.addEventListener('fullscreenchange', () => {
    fullscreen.textContent = document.fullscreenElement === dialog ? 'Exit fullscreen' : 'Fullscreen';
  });
})();
