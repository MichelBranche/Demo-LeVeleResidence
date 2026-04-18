import { getMockAvailabilityResponse } from './mockAvailability';
import { toISODateString } from './serializeDates';

/**
 * @typedef {import('./types').GuestBreakdown} GuestBreakdown
 * @typedef {import('./types').AvailabilitySearchPayload} AvailabilitySearchPayload
 * @typedef {import('./types').AvailabilitySearchResponse} AvailabilitySearchResponse
 */

/**
 * Normalizza i parametri UI → payload API REST.
 * @param {{ checkIn: Date; checkOut: Date; guests: GuestBreakdown }} params
 * @returns {AvailabilitySearchPayload}
 */
export function toSearchPayload(params) {
  return {
    checkIn: toISODateString(params.checkIn),
    checkOut: toISODateString(params.checkOut),
    guests: {
      adults: params.guests.adults,
      children: params.guests.children,
      infants: params.guests.infants,
    },
  };
}

/**
 * Ricerca disponibilità.
 * - Se `VITE_API_BASE_URL` non è impostato → mock locale (sviluppo).
 * - Altrimenti → `POST {base}/v1/availability/search`
 *
 * @param {{ checkIn: Date; checkOut: Date; guests: GuestBreakdown }} params
 * @returns {Promise<AvailabilitySearchResponse>}
 */
export async function searchAvailability(params) {
  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? '';

  if (!base) {
    return Promise.resolve(getMockAvailabilityResponse(params));
  }

  const payload = toSearchPayload(params);
  const res = await fetch(`${base}/v1/availability/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let msg = `Richiesta non riuscita (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }

  return res.json();
}
