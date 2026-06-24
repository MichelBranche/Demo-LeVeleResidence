import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

type BookingBody = {
  checkIn?: string;
  checkOut?: string;
  accommodation?: string;
  guests?: number | string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  arrivalTime?: string;
  message?: string;
  locale?: string;
  /** Honeypot — deve restare vuoto */
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const MAX = {
  name: 80,
  phone: 40,
  message: 4000,
} as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function trim(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function accommodationLabel(value: string, locale: string): string {
  if (value === 'garden') {
    return locale === 'it' ? 'Suite con vista giardino' : 'Garden view suite';
  }
  if (value === 'sea') {
    return locale === 'it' ? 'Suite con vista mare' : 'Sea view suite';
  }
  return locale === 'it' ? 'Nessuna preferenza' : 'No preference';
}

function parseBody(req: VercelRequest): BookingBody | null {
  if (!req.body) return null;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as BookingBody;
    } catch {
      return null;
    }
  }
  if (typeof req.body === 'object') return req.body as BookingBody;
  return null;
}

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T12:00:00`));
}

function resolveFromAddress(): string {
  const raw = process.env.BOOKING_FROM_EMAIL?.trim();
  if (!raw) return 'onboarding@resend.dev';
  if (raw.includes('<') && raw.includes('>')) return raw;
  if (EMAIL_RE.test(raw)) return `Residence Le Vele <${raw}>`;
  return 'onboarding@resend.dev';
}

function resolveToAddress(): string {
  const raw = process.env.BOOKING_TO_EMAIL?.trim();
  if (raw && EMAIL_RE.test(raw)) return raw;
  return 'info@rtalevele.com';
}

function resendErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return 'Failed to send email';
}

function resendErrorCode(message: string): string {
  const lower = message.toLowerCase();
  if (
    lower.includes('testing emails') ||
    lower.includes('verify a domain') ||
    lower.includes('not verified')
  ) {
    return 'resend_domain';
  }
  if (lower.includes('from') && (lower.includes('invalid') || lower.includes('domain'))) {
    return 'resend_from';
  }
  return 'send_failed';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(503).json({ error: 'service_unavailable' });
  }

  const body = parseBody(req);
  if (!body) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  if (body.website?.trim()) {
    return res.status(200).json({ ok: true });
  }

  const locale = body.locale === 'en' ? 'en' : 'it';
  const checkIn = trim(body.checkIn, 10);
  const checkOut = trim(body.checkOut, 10);
  const accommodation = body.accommodation === 'garden' || body.accommodation === 'sea' ? body.accommodation : '';
  const guestsRaw = typeof body.guests === 'number' ? body.guests : Number.parseInt(String(body.guests ?? ''), 10);
  const firstName = trim(body.firstName, MAX.name);
  const lastName = trim(body.lastName, MAX.name);
  const email = trim(body.email, 120).toLowerCase();
  const phone = trim(body.phone, MAX.phone);
  const arrivalTimeRaw = trim(body.arrivalTime, 5);
  const message = trim(body.message, MAX.message);

  if (!checkIn || !checkOut || !isValidDate(checkIn) || !isValidDate(checkOut)) {
    return res.status(400).json({ error: 'Invalid dates' });
  }

  if (checkOut < checkIn) {
    return res.status(400).json({ error: 'Check-out must be after check-in' });
  }

  if (!Number.isFinite(guestsRaw) || guestsRaw < 1 || guestsRaw > 4) {
    return res.status(400).json({ error: 'Invalid guest count' });
  }

  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  if (!phone || phone.replace(/\D/g, '').length < 8) {
    return res.status(400).json({ error: 'Valid phone is required' });
  }

  const arrivalTime = arrivalTimeRaw && TIME_RE.test(arrivalTimeRaw) ? arrivalTimeRaw : '';

  const to = resolveToAddress();
  const from = resolveFromAddress();

  const dateLabel = `${checkIn} → ${checkOut}`;
  const subjectPrefix = locale === 'it' ? 'Prenotazione' : 'Booking';
  const subject = `${subjectPrefix} — ${dateLabel}`;
  const accLabel = accommodationLabel(accommodation, locale);
  const guests = String(guestsRaw);

  const textLines = [
    locale === 'it'
      ? 'Nuova richiesta di disponibilità dal sito Residence Le Vele:'
      : 'New availability request from Residence Le Vele website:',
    '',
    `${locale === 'it' ? 'Nome' : 'First name'}: ${firstName}`,
    `${locale === 'it' ? 'Cognome' : 'Last name'}: ${lastName}`,
    `Email: ${email}`,
    `${locale === 'it' ? 'Telefono' : 'Phone'}: ${phone}`,
    `${locale === 'it' ? 'Date' : 'Dates'}: ${dateLabel}`,
    `${locale === 'it' ? 'Orario di arrivo' : 'Arrival time'}: ${
      arrivalTime || (locale === 'it' ? '(non indicato)' : '(not provided)')
    }`,
    `${locale === 'it' ? 'Alloggio' : 'Accommodation'}: ${accLabel}`,
    `${locale === 'it' ? 'Ospiti' : 'Guests'}: ${guests}`,
    '',
    `${locale === 'it' ? 'Messaggio' : 'Message'}:`,
    message || (locale === 'it' ? '(nessun messaggio)' : '(no message)'),
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#2a2420;max-width:560px">
      <p style="margin:0 0 1rem;font-size:15px">
        ${
          locale === 'it'
            ? 'Nuova richiesta di disponibilità dal sito <strong>Residence Le Vele</strong>:'
            : 'New availability request from <strong>Residence Le Vele</strong> website:'
        }
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#816e62;font-weight:600;width:38%">${
          locale === 'it' ? 'Nome' : 'First name'
        }</td><td style="padding:6px 0">${escapeHtml(firstName)}</td></tr>
        <tr><td style="padding:6px 0;color:#816e62;font-weight:600">${
          locale === 'it' ? 'Cognome' : 'Last name'
        }</td><td style="padding:6px 0">${escapeHtml(lastName)}</td></tr>
        <tr><td style="padding:6px 0;color:#816e62;font-weight:600">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#816e62;font-weight:600">${
          locale === 'it' ? 'Telefono' : 'Phone'
        }</td><td style="padding:6px 0"><a href="tel:${escapeHtml(phone.replace(/\s/g, ''))}">${escapeHtml(phone)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#816e62;font-weight:600">${
          locale === 'it' ? 'Date' : 'Dates'
        }</td><td style="padding:6px 0">${escapeHtml(dateLabel)}</td></tr>
        <tr><td style="padding:6px 0;color:#816e62;font-weight:600">${
          locale === 'it' ? 'Orario di arrivo' : 'Arrival time'
        }</td><td style="padding:6px 0">${escapeHtml(arrivalTime || '—')}</td></tr>
        <tr><td style="padding:6px 0;color:#816e62;font-weight:600">${
          locale === 'it' ? 'Alloggio' : 'Accommodation'
        }</td><td style="padding:6px 0">${escapeHtml(accLabel)}</td></tr>
        <tr><td style="padding:6px 0;color:#816e62;font-weight:600">${
          locale === 'it' ? 'Ospiti' : 'Guests'
        }</td><td style="padding:6px 0">${escapeHtml(guests)}</td></tr>
      </table>
      <p style="margin:1.25rem 0 0.35rem;font-size:13px;font-weight:600;color:#816e62">${
        locale === 'it' ? 'Messaggio' : 'Message'
      }</p>
      <p style="margin:0;white-space:pre-wrap;font-size:14px">${escapeHtml(message || '—')}</p>
    </div>
  `.trim();

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      text: textLines.join('\n'),
      html,
    });

    if (error) {
      const message = resendErrorMessage(error);
      console.error('Resend error:', error);
      return res.status(502).json({
        error: resendErrorCode(message),
        detail: message,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Booking email error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
