document.body.classList.add('js-ready');

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

function closeMenu() {
  nav?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
}

menuButton?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open') ?? false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeMenu();
    menuButton?.focus();
  }
});

document.addEventListener('click', event => {
  if (nav?.classList.contains('open') && !nav.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach(item => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const enquiryForm = document.getElementById('sts-enquiry-form');

if (enquiryForm) {
  const submitButton = enquiryForm.querySelector('button[type="submit"]');
  const formStatus = document.getElementById('form-status');
  const messageField = document.getElementById('message');
  const messageCount = document.getElementById('message-count');
  const serviceField = document.getElementById('service');
  const otherServiceField = document.getElementById('other-service');
  const otherServiceContainer = document.getElementById('other-service-field');
  const fields = [...enquiryForm.querySelectorAll('input:not([type="hidden"]), select, textarea')];

  const errorMessage = field => {
    const validity = field.validity;
    if (validity.valueMissing) return field.type === 'checkbox' ? 'Please confirm before submitting.' : 'This field is required.';
    if (validity.typeMismatch) return 'Enter a valid email address.';
    if (validity.patternMismatch && field.id === 'full-name') return 'Use letters, spaces, apostrophes or hyphens only.';
    if (validity.patternMismatch && field.id === 'email') return 'Enter a complete email address such as name@example.com.';
    if (validity.patternMismatch && field.id === 'telephone') return 'Enter a valid telephone number using numbers, spaces, brackets, + or -.';
    if (validity.tooShort) return `Please enter at least ${field.minLength} characters.`;
    if (validity.tooLong) return `Please use no more than ${field.maxLength} characters.`;
    return 'Please check this field.';
  };

  const setFieldState = field => {
    const error = document.getElementById(`${field.id}-error`);
    const isValid = field.checkValidity();
    field.setAttribute('aria-invalid', String(!isValid));
    if (error) error.textContent = isValid ? '' : errorMessage(field);
    return isValid;
  };

  fields.forEach(field => {
    field.addEventListener('invalid', event => {
      event.preventDefault();
      setFieldState(field);
    });
    field.addEventListener('blur', () => setFieldState(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') setFieldState(field);
    });
  });

  const updateOtherService = () => {
    const showOther = serviceField?.value === 'Other';
    if (otherServiceContainer) otherServiceContainer.hidden = !showOther;
    if (otherServiceField) {
      otherServiceField.required = showOther;
      if (!showOther) {
        otherServiceField.value = '';
        otherServiceField.removeAttribute('aria-invalid');
        const error = document.getElementById('other-service-error');
        if (error) error.textContent = '';
      }
    }
  };

  serviceField?.addEventListener('change', updateOtherService);
  updateOtherService();

  messageField?.addEventListener('input', () => {
    if (messageCount) messageCount.textContent = `${messageField.value.length} / 2000`;
  });

  enquiryForm.addEventListener('submit', async event => {
    event.preventDefault();

    enquiryForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea').forEach(field => {
      field.value = field.value.trim();
    });

    const invalidField = fields.find(field => !setFieldState(field));
    if (invalidField) {
      invalidField.focus();
      return;
    }

    formStatus.className = 'form-status';
    formStatus.textContent = '';
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';

    try {
      const response = await fetch(enquiryForm.action, {
        method: 'POST',
        body: new FormData(enquiryForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.errors?.[0]?.message || 'The enquiry could not be submitted.');
      }

      enquiryForm.reset();
      updateOtherService();
      fields.forEach(field => {
        field.removeAttribute('aria-invalid');
        const error = document.getElementById(`${field.id}-error`);
        if (error) error.textContent = '';
      });
      if (messageCount) messageCount.textContent = '0 / 2000';
      formStatus.className = 'form-status is-success';
      formStatus.textContent = 'Thank you. Your enquiry has been sent successfully. Sambrano Technology Services will respond as soon as reasonably possible.';
      formStatus.focus();
    } catch (error) {
      formStatus.className = 'form-status is-error';
      formStatus.textContent = `${error.message} Please try again or contact us by email or WhatsApp.`;
      formStatus.focus();
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Enquiry';
    }
  });
}

const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.type = 'button';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.innerHTML = '<span aria-hidden="true">↑</span>';
document.body.appendChild(backToTop);
const updateBackToTop = () => backToTop.classList.toggle('visible', window.scrollY > 520);
window.addEventListener('scroll', updateBackToTop, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
updateBackToTop();
