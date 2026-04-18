import { apiUrl } from '../../../shared/api/apiBase';

/**
 * @param {{
 *   checkIn: string;
 *   checkOut: string;
 *   unitIds: string[];
 *   guests: { adults: number; children: number; infants: number };
 *   customer: { firstName: string; lastName: string; email: string; phone: string };
 *   notes?: string;
 *   payment?: string;
 *   coupon?: string;
 *   totalEuro?: number;
 * }} payload
 */
export async function createBookingRequest(payload) {
  const res = await fetch(apiUrl('/api/v1/bookings/create'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.ok) {
    throw new Error(body?.message || `Prenotazione non riuscita (${res.status})`);
  }
  return body;
}

