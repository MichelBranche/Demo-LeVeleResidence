import { RESIDENCE_UNITS, UNIT_CATEGORY_LABEL } from './residenceUnits.js';
import { addDays, cellKeyIso, parseISODate, toLocalISODate } from './planningModel.js';

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/**
 * @param {string} unitId
 * @param {Record<string, string>} cells
 * @param {Date} checkIn
 * @param {Date} checkOut
 */
function isUnitFreeForStay(unitId, cells, checkIn, checkOut) {
  const end = startOfDay(checkOut);
  for (let d = startOfDay(checkIn); d.getTime() < end.getTime(); d = addDays(d, 1)) {
    const iso = toLocalISODate(d);
    const st = cells[cellKeyIso(unitId, iso)] ?? 'free';
    if (st !== 'free') return false;
  }
  return true;
}

/**
 * @param {Record<string, string>} cells
 * @param {Date} checkIn
 * @param {Date} checkOut
 */
function mapAllUnits(cells, checkIn, checkOut) {
  return RESIDENCE_UNITS.map((u) => {
    const available = isUnitFreeForStay(u.id, cells, checkIn, checkOut);
    return {
      unitId: u.id,
      name: u.name,
      kicker: UNIT_CATEGORY_LABEL[u.category],
      category: u.category,
      image: '',
      available,
      maxGuests: 4,
      reason: available ? undefined : 'Non disponibile per le date selezionate.',
    };
  });
}

/**
 * Stesso contratto di `buildAvailabilityFromPlanning` nel frontend.
 *
 * @param {string} checkInIso YYYY-MM-DD
 * @param {string} checkOutIso YYYY-MM-DD
 * @param {{ adults: number; children: number; infants: number }} guests
 * @param {Record<string, string>} cells
 */
export function buildAvailabilitySearchResponse(checkInIso, checkOutIso, guests, cells) {
  const checkIn = parseISODate(checkInIso);
  const checkOut = parseISODate(checkOutIso);

  const ms = 86400000;
  const nights =
    checkIn && checkOut && checkOut > checkIn
      ? Math.max(0, Math.round((checkOut.getTime() - checkIn.getTime()) / ms))
      : 0;

  const totalGuests = (guests?.adults ?? 0) + (guests?.children ?? 0);
  const overCapacity = totalGuests > 4;

  const emptyReason = (msg) =>
    RESIDENCE_UNITS.map((u) => ({
      unitId: u.id,
      name: u.name,
      kicker: UNIT_CATEGORY_LABEL[u.category],
      category: u.category,
      image: '',
      available: false,
      maxGuests: 4,
      reason: msg,
    }));

  if (!checkIn || !checkOut || checkOut <= checkIn || nights <= 0) {
    const units = emptyReason('Seleziona check-in e check-out validi.');
    return {
      source: 'api',
      syncedFromPlanning: true,
      searchId: `api-planning-invalid-${Date.now()}`,
      nights: 0,
      currency: 'EUR',
      globalAvailable: false,
      units,
      message: null,
    };
  }

  if (overCapacity) {
    const units = emptyReason('Oltre la capacità massima (4 ospiti) per monolocale.');
    return {
      source: 'api',
      syncedFromPlanning: true,
      searchId: `api-planning-cap-${checkIn.getTime()}`,
      nights,
      currency: 'EUR',
      globalAvailable: false,
      units,
      message: 'Per gruppi oltre 4 persone scrivici: valutiamo soluzioni dedicate.',
    };
  }

  const units = mapAllUnits(cells, checkIn, checkOut);
  const anyAvailable = units.some((u) => u.available);

  return {
    source: 'api',
    syncedFromPlanning: true,
    searchId: `api-planning-${checkIn.getTime()}-${checkOut.getTime()}`,
    nights,
    currency: 'EUR',
    globalAvailable: anyAvailable,
    units,
    message: !anyAvailable
      ? 'Nessun monolocale disponibile per l’intero periodo: verifica le date o contatta la reception.'
      : null,
  };
}
