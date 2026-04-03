document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  const yearEl = document.getElementById('year');
  const navLinks = document.querySelectorAll('a[href^="#"]');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const existingMessage = form.querySelector('[data-form-message]');

  if (existingMessage) {
    existingMessage.remove();
  }

  const message = document.createElement('p');
  message.setAttribute('data-form-message', '');
  message.className = 'fine-print';
  message.style.marginTop = '0.25rem';
  form.appendChild(message);

  const setMessage = (text, color = '#8ea1bc') => {
    message.textContent = text;
    message.style.color = color;
  };

  
});
