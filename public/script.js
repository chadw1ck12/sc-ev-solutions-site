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

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const charger = (data.get('charger') || '').toString().trim();
    const details = (data.get('details') || '').toString().trim();

    if (!name || !email) {
      setMessage('Please enter your name and email.', '#fca5a5');
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailIsValid) {
      setMessage('Please enter a valid email address.', '#fca5a5');
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Preparing your quote request...';
    }

    const subject = encodeURIComponent(`Quote request from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Charger status: ${charger || 'Not provided'}`,
        '',
        'Project details:',
        details || 'Not provided'
      ].join('\n')
    );

    setMessage('Opening your email app with the project details...', '#bfeaff');

    window.location.href = `mailto:hello@scevsolutions.com?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Request quote';
      }
      setMessage('If your email app did not open, call (803) 555-1234 or email hello@scevsolutions.com.', '#8ea1bc');
    }, 1200);
  });
});
