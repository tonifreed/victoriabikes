const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

const form = document.querySelector('#quote-form');
const result = document.querySelector('#quote-result');
const status = document.querySelector('#copy-status');
let requestText = '';

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  requestText = [
    'Hi Victoria Bikes,', '',
    'I’d like a custom plasma LED quote.', '',
    `Name: ${data.get('name').trim()}`,
    `Ride: ${data.get('vehicle')}`,
    `Lighting: ${data.get('lighting')}`,
    `Details: ${data.get('details').trim() || 'Let’s talk through the options.'}`,
    '', 'Thanks!'
  ].join('\n');
  document.querySelector('#email-draft').href = `mailto:hello@victoriabikes.com?subject=${encodeURIComponent('Custom LED quote — ' + data.get('vehicle'))}&body=${encodeURIComponent(requestText)}`;
  status.textContent = '';
  result.hidden = false;
  result.focus({ preventScroll: true });
  result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
});

form.addEventListener('input', () => {
  result.hidden = true;
  status.textContent = '';
});

document.querySelector('#copy-request').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(`To: hello@victoriabikes.com\nSubject: Custom LED quote\n\n${requestText}`);
    status.textContent = 'Copied. Paste into your email and send when you’re ready.';
  } catch {
    status.textContent = 'Copy isn’t available in this browser. Use Open Email Draft, or email us directly.';
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

const anniversary = document.querySelector('.anniversary');
const anniversaryToggle = document.querySelector('.anniversary-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateTickerMotion() {
  anniversary.classList.toggle('is-animated', !reducedMotion.matches);
  anniversaryToggle.hidden = reducedMotion.matches;
}
updateTickerMotion();
reducedMotion.addEventListener('change', updateTickerMotion);
anniversaryToggle.addEventListener('click', () => {
  const paused = anniversary.classList.toggle('is-paused');
  anniversaryToggle.setAttribute('aria-pressed', String(paused));
  anniversaryToggle.setAttribute('aria-label', paused ? 'Resume anniversary ticker' : 'Pause anniversary ticker');
  anniversaryToggle.innerHTML = paused ? 'Resume ticker <span aria-hidden="true">▷</span>' : 'Pause ticker <span aria-hidden="true">Ⅱ</span>';
});

// Photo links remain usable when JavaScript or the dialog API is unavailable.
const galleryPhotos = [...document.querySelectorAll('.gallery-photo')];
const galleryDialog = document.querySelector('#gallery-dialog');
const fullPhoto = document.querySelector('#gallery-full-photo');
let galleryIndex = 0;
let galleryTrigger = null;

function showGalleryPhoto(index) {
  galleryIndex = (index + galleryPhotos.length) % galleryPhotos.length;
  const photo = galleryPhotos[galleryIndex];
  fullPhoto.src = photo.href;
  fullPhoto.alt = photo.querySelector('img').alt;
  document.querySelector('#gallery-caption').textContent = photo.dataset.caption;
  document.querySelector('#gallery-count').textContent = `${galleryIndex + 1} / ${galleryPhotos.length}`;
  document.querySelector('#gallery-original').href = photo.href;
}

if (galleryDialog && typeof galleryDialog.showModal === 'function') {
  galleryPhotos.forEach((photo, index) => {
    photo.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      galleryTrigger = photo;
      showGalleryPhoto(index);
      galleryDialog.showModal();
      document.body.classList.add('gallery-open');
    });
  });
  document.querySelector('.gallery-close').addEventListener('click', () => galleryDialog.close());
  document.querySelector('.gallery-previous').addEventListener('click', () => showGalleryPhoto(galleryIndex - 1));
  document.querySelector('.gallery-next').addEventListener('click', () => showGalleryPhoto(galleryIndex + 1));
  galleryDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showGalleryPhoto(galleryIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  galleryDialog.addEventListener('click', event => {
    const bounds = galleryDialog.getBoundingClientRect();
    if (event.target === galleryDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) galleryDialog.close();
  });
  galleryDialog.addEventListener('close', () => {
    document.body.classList.remove('gallery-open');
    galleryTrigger?.focus({preventScroll: true});
  });
}
