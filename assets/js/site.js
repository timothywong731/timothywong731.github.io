// Site behaviour. Every feature here is an enhancement: without JavaScript the pages still read and navigate.
(() => {
  const root = document.documentElement;
  const announcer = document.querySelector('[data-announcer]');
  const announce = (text) => { if (announcer) announcer.textContent = text; };

  // Theme: follow the OS until the visitor picks one, then remember it.
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const darkQuery = matchMedia('(prefers-color-scheme: dark)');
  const activeTheme = () => root.dataset.theme || (darkQuery.matches ? 'dark' : 'light');
  const labelThemeToggle = () => {
    const next = activeTheme() === 'dark' ? 'light' : 'dark';
    themeToggle?.setAttribute('aria-label', `Switch to ${next} theme`);
    // Android Chrome tints its address bar with theme-color; follow the theme the visitor picked.
    const paper = getComputedStyle(root).getPropertyValue('--paper').trim();
    if (paper) for (const meta of document.querySelectorAll('meta[name="theme-color"]')) meta.content = paper;
  };
  themeToggle?.addEventListener('click', () => {
    const next = activeTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode: the choice lasts for this page only */ }
    labelThemeToggle();
  });
  darkQuery.addEventListener('change', labelThemeToggle);
  labelThemeToggle();

  // Mobile menu.
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const setMenu = (open) => {
    navToggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };
  navToggle?.addEventListener('click', () => setMenu(navToggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      navToggle.focus();
    }
  });

  // Phones and tablets: the sticky header slides away while scrolling down and returns on any scroll up.
  const header = document.querySelector('.site-header');
  const compact = matchMedia('(max-width: 63.99rem)');
  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY, dy = y - lastY;
    if (Math.abs(dy) < 6) return;                       // ignore jitter from momentum scrolling
    const menuOpen = navToggle?.getAttribute('aria-expanded') === 'true';
    header.classList.toggle('is-hidden', compact.matches && !menuOpen && dy > 0 && y > header.offsetHeight);
    lastY = y;
  }, { passive: true });

  // Copy buttons: data-copy="url" copies the page address, otherwise a selector for the text to copy.
  document.addEventListener('click', async (e) => {
    const button = e.target.closest('[data-copy]');
    if (!button) return;
    const source = button.dataset.copy;
    const text = source === 'url'
      ? location.origin + location.pathname
      : document.querySelector(source)?.textContent.trim();
    const label = button.querySelector('span');
    const original = label?.textContent;
    try {
      await navigator.clipboard.writeText(text);
      if (label) label.textContent = 'Copied';
      announce(source === 'url' ? 'Link copied' : 'Citation copied');
    } catch (err) {
      if (label) label.textContent = 'Copy failed';
      announce('Copy failed. Select the text and copy it with your keyboard instead.');
    }
    setTimeout(() => { if (label) label.textContent = original; }, 2000);
  });

  // Home project strip: native scroll-snap does the work; the buttons page through it when it overflows.
  for (const strip of document.querySelectorAll('[data-strip]')) {
    const track = strip.querySelector('.tiles');
    const nav = strip.querySelector('.project-strip__nav');
    const prev = nav.querySelector('[data-prev]');
    const next = nav.querySelector('[data-next]');
    const still = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      nav.hidden = max <= 1;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max - 1;
    };
    const page = (dir) => track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: still.matches ? 'auto' : 'smooth' });
    prev.addEventListener('click', () => page(-1));
    next.addEventListener('click', () => page(1));
    track.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }

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
