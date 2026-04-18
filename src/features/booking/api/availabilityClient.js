import { getMockAvailabilityResponse } from './mockAvailability';
import { toISODateString } from './serializeDates';
import { apiUrl } from '../../../shared/api/apiBase';

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
 * - Se `VITE_API_BASE_URL` è impostato → `POST {base}/v1/availability/search` (API esterna).
 * - Altrimenti prova `POST /api/v1/availability/search` (Vercel + KV); se non disponibile → mock locale.
 *
 * @param {{ checkIn: Date; checkOut: Date; guests: GuestBreakdown }} params
 * @returns {Promise<AvailabilitySearchResponse>}
 */
export async function searchAvailability(params) {
  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? '';
  const payload = toSearchPayload(params);

  if (base) {
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

  try {
    const res = await fetch(apiUrl('/api/v1/availability/search'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) return res.json();
  } catch {
    /* rete / dev senza route API */
  }

  return getMockAvailabilityResponse(params);
}
