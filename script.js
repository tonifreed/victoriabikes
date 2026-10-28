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
const galleryFilters = document.querySelector('.gallery-filters');
const galleryGrid = document.querySelector('#gallery-grid');
const galleryBack = document.querySelector('#gallery-back');
const galleryForward = document.querySelector('#gallery-forward');
const galleryDots = document.querySelector('#gallery-dots');
const galleryStatus = document.querySelector('#gallery-status');
const galleryPageSize = 6;
let selectedPhotos = galleryPhotos;
let viewerPhotos = galleryPhotos;
let galleryPageIndex = 0;
let galleryIndex = 0;
let galleryTrigger = null;

function updateGalleryPosition() {
  const pageCount = Math.ceil(selectedPhotos.length / galleryPageSize);
  galleryPageIndex = Math.max(0, Math.min(pageCount - 1, Math.round(galleryGrid.scrollLeft / (galleryGrid.clientWidth || 1))));
  galleryStatus.textContent = `Photos ${galleryPageIndex * galleryPageSize + 1}–${Math.min((galleryPageIndex + 1) * galleryPageSize, selectedPhotos.length)} of ${selectedPhotos.length}`;
  galleryBack.disabled = galleryPageIndex === 0;
  galleryForward.disabled = galleryPageIndex === pageCount - 1;
  [...galleryDots.children].forEach((dot, index) => dot.setAttribute('aria-current', String(index === galleryPageIndex)));
}

function goToGalleryPage(index, behavior = reducedMotion.matches ? 'instant' : 'smooth') {
  const lastPage = Math.ceil(selectedPhotos.length / galleryPageSize) - 1;
  galleryGrid.scrollTo({ left: Math.max(0, Math.min(index, lastPage)) * galleryGrid.clientWidth, behavior });
}

function buildGalleryPages() {
  galleryGrid.replaceChildren();
  galleryDots.replaceChildren();
  for (let start = 0; start < selectedPhotos.length; start += galleryPageSize) {
    const page = document.createElement('div');
    page.className = 'gallery-page';
    page.setAttribute('role', 'group');
    page.setAttribute('aria-label', `Photos ${start + 1} to ${Math.min(start + galleryPageSize, selectedPhotos.length)} of ${selectedPhotos.length}`);
    page.append(...selectedPhotos.slice(start, start + galleryPageSize));
    galleryGrid.append(page);
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to photos ${start + 1} to ${Math.min(start + galleryPageSize, selectedPhotos.length)}`);
    dot.setAttribute('aria-controls', 'gallery-grid');
    dot.addEventListener('click', () => goToGalleryPage(start / galleryPageSize));
    galleryDots.append(dot);
  }
  galleryPageIndex = 0;
  goToGalleryPage(0, 'instant');
  updateGalleryPosition();
}

if (galleryFilters && galleryGrid && galleryDots) {
  galleryFilters.hidden = false;
  document.querySelector('.gallery-slider-controls').hidden = false;
  galleryGrid.classList.add('is-slider');
  galleryFilters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    galleryFilters.querySelectorAll('button').forEach(filter => {
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    selectedPhotos = galleryPhotos.filter(photo => button.dataset.filter === 'all' || photo.dataset.category === button.dataset.filter || (button.dataset.filter === 'groups' && photo.dataset.group === 'true'));
    buildGalleryPages();
  });
  galleryBack.addEventListener('click', () => goToGalleryPage(galleryPageIndex - 1));
  galleryForward.addEventListener('click', () => goToGalleryPage(galleryPageIndex + 1));
  galleryGrid.addEventListener('scroll', updateGalleryPosition, { passive: true });
  window.addEventListener('resize', () => goToGalleryPage(galleryPageIndex, 'instant'));
  buildGalleryPages();
}

function showGalleryPhoto(index) {
  galleryIndex = (index + viewerPhotos.length) % viewerPhotos.length;
  const photo = viewerPhotos[galleryIndex];
  fullPhoto.src = photo.href;
  fullPhoto.alt = photo.querySelector('img').alt;
  document.querySelector('#gallery-caption').textContent = photo.dataset.caption;
  document.querySelector('#gallery-count').textContent = `${galleryIndex + 1} / ${viewerPhotos.length}`;
  document.querySelector('#gallery-original').href = photo.href;
}

if (galleryDialog && typeof galleryDialog.showModal === 'function') {
  galleryPhotos.forEach(photo => {
    photo.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      galleryTrigger = photo;
      viewerPhotos = selectedPhotos;
      showGalleryPhoto(viewerPhotos.indexOf(photo));
      galleryDialog.showModal();
      document.body.classList.add('gallery-open');
    });
  });
  document.querySelectorAll('.footer-photo-set:not([aria-hidden]) .footer-photo').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const index = galleryPhotos.findIndex(photo => photo.href === link.href);
      if (index < 0) return;
      event.preventDefault();
      galleryTrigger = link;
      viewerPhotos = galleryPhotos;
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

const footerReel = document.querySelector('.footer-reel');
const footerPause = document.querySelector('#footer-reel-pause');
if (footerReel && footerPause) {
  const updateFooterMotion = () => {
    footerReel.classList.toggle('is-animated', !reducedMotion.matches);
    footerPause.hidden = reducedMotion.matches;
  };
  updateFooterMotion();
  reducedMotion.addEventListener('change', updateFooterMotion);
  footerPause.addEventListener('click', () => {
    const paused = footerReel.classList.toggle('is-paused');
    footerPause.setAttribute('aria-pressed', String(paused));
    footerPause.textContent = paused ? 'Resume photos ▷' : 'Pause photos Ⅱ';
  });
}

// Keep sound from multiple ride videos from overlapping.
document.addEventListener('play', event => {
  if (!(event.target instanceof HTMLVideoElement)) return;
  document.querySelectorAll('video').forEach(video => {
    if (video !== event.target) video.pause();
  });
}, true);
