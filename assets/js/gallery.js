// Retained gallery behaviour from the previous portfolio.
(() => {
  // Gallery lightbox, using the native <dialog> for focus trapping and Escape to close.
  const lightbox = document.querySelector('.lightbox');
  if (lightbox && typeof lightbox.showModal === 'function') {
    const links = [...document.querySelectorAll('.gallery__open')];
    const image = lightbox.querySelector('.lightbox__image');
    const caption = lightbox.querySelector('.lightbox__caption');
    const count = lightbox.querySelector('.lightbox__count');
    let index = 0;

    const show = (n) => {
      index = (n + links.length) % links.length;
      const link = links[index];
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      caption.textContent = link.dataset.caption;
      count.textContent = `${index + 1} of ${links.length}`;
    };

    links.forEach((link, n) => link.addEventListener('click', (e) => {
      e.preventDefault();
      show(n);
      lightbox.showModal();
    }));
    lightbox.querySelector('[data-prev]').addEventListener('click', () => show(index - 1));
    lightbox.querySelector('[data-next]').addEventListener('click', () => show(index + 1));
    lightbox.querySelector('[data-close]').addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
    // Touch: swipe left or right to change photo, swipe down to close. Pinch-zoom still works (touch-action in CSS).
    const figure = lightbox.querySelector('.lightbox__figure');
    let start = null;
    figure.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' && e.isPrimary) start = { x: e.clientX, y: e.clientY }; });
    figure.addEventListener('pointercancel', () => { start = null; });
    figure.addEventListener('pointerup', (e) => {
      if (!start) return;
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
      else if (dy > 90 && dy > Math.abs(dx)) lightbox.close();
    });
    // A click on the dark backdrop (the dialog itself, outside the figure and controls) closes it.
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });
    lightbox.addEventListener('close', () => image.removeAttribute('src'));
  }
})();
