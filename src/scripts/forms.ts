/**
 * Form Handling
 * Handles waitlist form submission and modals with validation and Turnstile
 */

declare global {
  interface Window {
    TURNSTILE_SITE_KEY?: string;
    turnstile?: {
      render: (container: Element, options: { sitekey: string; theme?: string; callback?: (token: string) => void; 'error-callback'?: () => void }) => string;
      reset: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
  }
}

let hasSubmitted = false;
let exitShown = false;
let isSubmitting = false;
let lastSubmitTime = 0;

const SUBMIT_COOLDOWN = 3000; // 3 seconds between submissions
const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 100;

// Email regex - standard validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Turnstile widget IDs
let waitlistTurnstileId: string | null = null;
let exitTurnstileId: string | null = null;

// Disposable email domains to block
const DISPOSABLE_DOMAINS = [
  'tempmail.com', 'throwaway.com', 'mailinator.com', 'guerrillamail.com',
  'fakeinbox.com', '10minutemail.com', 'trashmail.com', 'yopmail.com',
  'temp-mail.org', 'getnada.com', 'maildrop.cc', 'dispostable.com'
];

interface ValidationResult {
  isValid: boolean;
  error: string;
}

function validateName(name: string): ValidationResult {
  const trimmed = name.trim();

  if (!trimmed) {
    return { isValid: false, error: 'Imię jest wymagane' };
  }

  if (trimmed.length < NAME_MIN_LENGTH) {
    return { isValid: false, error: `Imię musi mieć min. ${NAME_MIN_LENGTH} znaki` };
  }

  if (trimmed.length > NAME_MAX_LENGTH) {
    return { isValid: false, error: `Imię może mieć max. ${NAME_MAX_LENGTH} znaków` };
  }

  // Block obviously fake names (just numbers, special chars)
  if (!/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/.test(trimmed)) {
    return { isValid: false, error: 'Podaj prawidłowe imię' };
  }

  return { isValid: true, error: '' };
}

function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed) {
    return { isValid: false, error: 'Email jest wymagany' };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return { isValid: false, error: 'Podaj prawidłowy adres email' };
  }

  // Check for disposable email domains
  const domain = trimmed.split('@')[1];
  if (DISPOSABLE_DOMAINS.includes(domain)) {
    return { isValid: false, error: 'Użyj stałego adresu email' };
  }

  return { isValid: true, error: '' };
}

function showError(input: HTMLInputElement, message: string): void {
  clearError(input);
  input.classList.add('input-error');

  const errorEl = document.createElement('span');
  errorEl.className = 'form-error';
  errorEl.textContent = message;
  input.parentNode?.insertBefore(errorEl, input.nextSibling);
}

function clearError(input: HTMLInputElement): void {
  input.classList.remove('input-error');
  const errorEl = input.parentNode?.querySelector('.form-error');
  errorEl?.remove();
}

function clearAllErrors(form: HTMLFormElement): void {
  form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  form.querySelectorAll('.form-error').forEach(el => el.remove());
}

function sanitizeInput(value: string): string {
  return value.trim().replace(/<[^>]*>/g, '');
}

function showModal(modalId: string): void {
  const modal = document.getElementById(modalId);
  modal?.classList.add('visible');
}

function hideModal(modalId: string): void {
  const modal = document.getElementById(modalId);
  modal?.classList.remove('visible');
}

function replaceFormWithSuccess(form: HTMLFormElement): void {
  const successHtml = `
    <div class="form-success">
      <div class="form-success-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h3>Dziękujemy!</h3>
      <p>Jesteś na liście. Powiadomimy Cię gdy wystartujemy.</p>
    </div>
  `;
  form.outerHTML = successHtml;
}

function initTurnstile(): void {
  const siteKey = window.TURNSTILE_SITE_KEY;
  if (!siteKey || !window.turnstile) return;

  // Initialize main waitlist form turnstile
  const waitlistTurnstile = document.querySelector('#waitlistForm .cf-turnstile');
  if (waitlistTurnstile) {
    waitlistTurnstile.setAttribute('data-sitekey', siteKey);
    waitlistTurnstileId = window.turnstile.render(waitlistTurnstile, {
      sitekey: siteKey,
      theme: 'light',
    });
  }

  // Initialize exit popup form turnstile
  const exitTurnstile = document.querySelector('#exitForm .cf-turnstile');
  if (exitTurnstile) {
    exitTurnstile.setAttribute('data-sitekey', siteKey);
    exitTurnstileId = window.turnstile.render(exitTurnstile, {
      sitekey: siteKey,
      theme: 'light',
    });
  }
}

function getTurnstileToken(widgetId: string | null): string | null {
  if (!widgetId || !window.turnstile) return null;
  return window.turnstile.getResponse(widgetId) || null;
}

function resetTurnstile(widgetId: string | null): void {
  if (!widgetId || !window.turnstile) return;
  window.turnstile.reset(widgetId);
}

export function initForms(): void {
  const waitlistForm = document.getElementById('waitlistForm') as HTMLFormElement | null;
  const exitForm = document.getElementById('exitForm') as HTMLFormElement | null;
  const closeModalBtn = document.getElementById('closeModal');
  const successModal = document.getElementById('successModal');
  const exitPopup = document.getElementById('exitPopup');
  const exitPopupClose = document.getElementById('exitPopupClose');

  // Waitlist form submission
  waitlistForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Rate limiting
    const now = Date.now();
    if (isSubmitting || now - lastSubmitTime < SUBMIT_COOLDOWN) {
      return;
    }

    const nameInput = waitlistForm.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = waitlistForm.querySelector('input[name="email"]') as HTMLInputElement;
    const button = waitlistForm.querySelector('button') as HTMLButtonElement;

    // Clear previous errors
    clearAllErrors(waitlistForm);

    // Sanitize and validate
    const name = sanitizeInput(nameInput.value);
    const email = sanitizeInput(emailInput.value);

    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);

    let hasErrors = false;

    if (!nameValidation.isValid) {
      showError(nameInput, nameValidation.error);
      hasErrors = true;
    }

    if (!emailValidation.isValid) {
      showError(emailInput, emailValidation.error);
      hasErrors = true;
    }

    if (hasErrors) return;

    // Get Turnstile token
    const turnstileToken = getTurnstileToken(waitlistTurnstileId);
    if (window.TURNSTILE_SITE_KEY && !turnstileToken) {
      showError(emailInput, 'Potwierdź że nie jesteś botem');
      return;
    }

    isSubmitting = true;
    button.disabled = true;
    button.textContent = 'Zapisuję...';

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: email.toLowerCase(),
          turnstileToken,
        }),
      });

      if (response.ok) {
        hasSubmitted = true;
        lastSubmitTime = now;
        replaceFormWithSuccess(waitlistForm);
        showModal('successModal');
      } else {
        const data = await response.json().catch(() => ({}));
        showError(emailInput, data.error || 'Wystąpił błąd. Spróbuj ponownie.');
        resetTurnstile(waitlistTurnstileId);
        isSubmitting = false;
        button.disabled = false;
        button.textContent = 'Dołączam do listy';
      }
    } catch {
      showError(emailInput, 'Błąd połączenia. Sprawdź internet i spróbuj ponownie.');
      resetTurnstile(waitlistTurnstileId);
      isSubmitting = false;
      button.disabled = false;
      button.textContent = 'Dołączam do listy';
    }
  });

  // Close success modal
  closeModalBtn?.addEventListener('click', () => {
    hideModal('successModal');
  });

  // Click outside to close success modal
  successModal?.addEventListener('click', (e) => {
    if (e.target === successModal) {
      hideModal('successModal');
    }
  });

  // Exit intent detection
  document.addEventListener('mouseout', (e: MouseEvent) => {
    if (e.clientY < 10 && !exitShown && !hasSubmitted) {
      showModal('exitPopup');
      exitShown = true;
    }
  });

  // Close exit popup
  exitPopupClose?.addEventListener('click', () => {
    hideModal('exitPopup');
  });

  // Click outside to close exit popup
  exitPopup?.addEventListener('click', (e) => {
    if (e.target === exitPopup) {
      hideModal('exitPopup');
    }
  });

  // Exit form submission
  exitForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Rate limiting
    const now = Date.now();
    if (isSubmitting || now - lastSubmitTime < SUBMIT_COOLDOWN) {
      return;
    }

    const nameInput = exitForm.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = exitForm.querySelector('input[name="email"]') as HTMLInputElement;
    const button = exitForm.querySelector('button') as HTMLButtonElement;

    // Clear previous errors
    clearAllErrors(exitForm);

    // Sanitize and validate
    const name = sanitizeInput(nameInput.value);
    const email = sanitizeInput(emailInput.value);

    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);

    let hasErrors = false;

    if (!nameValidation.isValid) {
      showError(nameInput, nameValidation.error);
      hasErrors = true;
    }

    if (!emailValidation.isValid) {
      showError(emailInput, emailValidation.error);
      hasErrors = true;
    }

    if (hasErrors) return;

    // Get Turnstile token
    const turnstileToken = getTurnstileToken(exitTurnstileId);
    if (window.TURNSTILE_SITE_KEY && !turnstileToken) {
      showError(emailInput, 'Potwierdź że nie jesteś botem');
      return;
    }

    isSubmitting = true;
    button.disabled = true;
    button.textContent = 'Zapisuję...';

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: email.toLowerCase(),
          turnstileToken,
        }),
      });

      if (response.ok) {
        hasSubmitted = true;
        lastSubmitTime = now;
        replaceFormWithSuccess(exitForm);
        // Close popup after showing success
        setTimeout(() => hideModal('exitPopup'), 2500);
      } else {
        const data = await response.json().catch(() => ({}));
        showError(emailInput, data.error || 'Wystąpił błąd. Spróbuj ponownie.');
        resetTurnstile(exitTurnstileId);
        isSubmitting = false;
        button.disabled = false;
        button.textContent = 'Powiadom mnie';
      }
    } catch {
      showError(emailInput, 'Błąd połączenia. Sprawdź internet i spróbuj ponownie.');
      resetTurnstile(exitTurnstileId);
      isSubmitting = false;
      button.disabled = false;
      button.textContent = 'Powiadom mnie';
    }
  });

  // Real-time validation on blur
  const allInputs = document.querySelectorAll('input[name="name"], input[name="email"]');
  allInputs.forEach(input => {
    input.addEventListener('blur', (e) => {
      const target = e.target as HTMLInputElement;
      const value = sanitizeInput(target.value);

      if (target.name === 'name' && value) {
        const result = validateName(value);
        if (!result.isValid) {
          showError(target, result.error);
        } else {
          clearError(target);
        }
      }

      if (target.name === 'email' && value) {
        const result = validateEmail(value);
        if (!result.isValid) {
          showError(target, result.error);
        } else {
          clearError(target);
        }
      }
    });

    // Clear error on focus
    input.addEventListener('focus', (e) => {
      clearError(e.target as HTMLInputElement);
    });
  });

  // Initialize Turnstile widgets
  if (window.turnstile) {
    initTurnstile();
  } else {
    // Wait for Turnstile script to load
    const checkTurnstile = setInterval(() => {
      if (window.turnstile) {
        clearInterval(checkTurnstile);
        initTurnstile();
      }
    }, 100);

    // Stop checking after 10 seconds
    setTimeout(() => clearInterval(checkTurnstile), 10000);
  }
}
