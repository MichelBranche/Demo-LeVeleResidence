import type { SiteLocale } from './siteLocales';

export type BookingAccommodation = '' | 'garden' | 'sea';

export type BookingRequestPayload = {
  checkIn: string;
  checkOut: string;
  accommodation: BookingAccommodation;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  locale: SiteLocale;
  website?: string;
};

export type BookingSubmitResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitBookingRequest(
  payload: BookingRequestPayload,
): Promise<BookingSubmitResult> {
  try {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => ({}))) as { error?: string };

    if (!response.ok) {
      return {
        ok: false,
        error: data.error ?? 'send_failed',
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: 'network' };
  }
}
