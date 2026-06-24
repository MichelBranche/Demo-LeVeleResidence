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
  phone: string;
  arrivalTime?: string;
  message: string;
  locale: SiteLocale;
  website?: string;
};

export type BookingSubmitResult =
  | { ok: true }
  | { ok: false; error: string; detail?: string };

export async function submitBookingRequest(
  payload: BookingRequestPayload,
): Promise<BookingSubmitResult> {
  try {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
      detail?: string;
    };

    if (!response.ok) {
      return {
        ok: false,
        error: data.error ?? 'send_failed',
        detail: data.detail,
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: 'network' };
  }
}
