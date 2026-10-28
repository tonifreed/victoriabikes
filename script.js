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
