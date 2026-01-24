import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 100;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Disposable email domains to block
const DISPOSABLE_DOMAINS = [
  'tempmail.com', 'throwaway.com', 'mailinator.com', 'guerrillamail.com',
  'fakeinbox.com', '10minutemail.com', 'trashmail.com', 'yopmail.com',
  'temp-mail.org', 'getnada.com', 'maildrop.cc', 'dispostable.com'
];

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return true; // Skip verification if no secret key configured

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    });

    const data = await response.json() as { success: boolean };
    return data.success;
  } catch {
    console.error('Turnstile verification failed');
    return false;
  }
}

function validateName(name: string): { isValid: boolean; error: string } {
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

  if (!/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/.test(trimmed)) {
    return { isValid: false, error: 'Podaj prawidłowe imię' };
  }

  return { isValid: true, error: '' };
}

function validateEmail(email: string): { isValid: boolean; error: string } {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed) {
    return { isValid: false, error: 'Email jest wymagany' };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return { isValid: false, error: 'Podaj prawidłowy adres email' };
  }

  const domain = trimmed.split('@')[1];
  if (DISPOSABLE_DOMAINS.includes(domain)) {
    return { isValid: false, error: 'Użyj stałego adresu email' };
  }

  return { isValid: true, error: '' };
}

function sanitize(value: string): string {
  return value.trim().replace(/<[^>]*>/g, '');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, turnstileToken } = await request.json();

    // Sanitize inputs
    const cleanName = sanitize(name || '');
    const cleanEmail = sanitize(email || '').toLowerCase();

    // Validate name
    const nameValidation = validateName(cleanName);
    if (!nameValidation.isValid) {
      return new Response(
        JSON.stringify({ error: nameValidation.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email
    const emailValidation = validateEmail(cleanEmail);
    if (!emailValidation.isValid) {
      return new Response(
        JSON.stringify({ error: emailValidation.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify Turnstile token
    const clientIP = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '';
    if (import.meta.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return new Response(
          JSON.stringify({ error: 'Potwierdź że nie jesteś botem' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const isValid = await verifyTurnstile(turnstileToken, clientIP);
      if (!isValid) {
        return new Response(
          JSON.stringify({ error: 'Weryfikacja nieudana. Spróbuj ponownie.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    const result = await resend.contacts.create({
      audienceId: import.meta.env.RESEND_AUDIENCE_ID,
      email: cleanEmail,
      firstName: cleanName,
    });

    // Check if contact already exists (Resend returns error for duplicates)
    if (result.error) {
      // "Contact already exists" or similar
      if (result.error.message?.toLowerCase().includes('already') ||
          result.error.message?.toLowerCase().includes('exist')) {
        return new Response(
          JSON.stringify({ error: 'Ten email jest już na liście. Powiadomimy Cię gdy wystartujemy!' }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(result.error.message);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Waitlist error:', error);
    return new Response(
      JSON.stringify({ error: 'Wystąpił błąd. Spróbuj ponownie.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
