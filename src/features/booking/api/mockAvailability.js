import { loadPlanningCells } from '../../admin/planning/planningStorage';
import { buildAvailabilityFromPlanning } from './planningAvailability';

/**
 * Risposta demo quando `VITE_API_BASE_URL` non è impostato.
 * Le disponibilità sono calcolate dal planning admin (stesse celle `localStorage` del gestionale):
 * per ogni tipologia (Vista giardino / Vista mare) c’è disponibilità se almeno un monolocale
 * della categoria ha tutte le notti del soggiorno in stato **Libero**.
 *
 * Con backend reale, `searchAvailability` userà `POST /v1/availability/search` con lo stesso modello dati.
 *
 * @param {{ checkIn: Date; checkOut: Date; guests: { adults: number; children: number; infants: number } }} params
 */
export function getMockAvailabilityResponse(params) {
  const { checkIn, checkOut, guests } = params;
  const ms = 86400000;
  const nights = Math.max(0, Math.round((checkOut.getTime() - checkIn.getTime()) / ms));

  const totalGuests = guests.adults + guests.children;
  /** Neonati non contano nel mock capacità; adulti+bambini max 4 per monolocale */
  const overCapacity = totalGuests > 4;

  const cells = loadPlanningCells();
  return buildAvailabilityFromPlanning(params, cells, { overCapacity, nights });
}
