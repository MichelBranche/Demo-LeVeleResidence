import { RESIDENCE_UNITS, UNIT_CATEGORY_LABEL } from '../../admin/data/residenceUnits';
import { cellKey } from '../../admin/planning/planningStorage';
import { getUnitPreviewImage } from '../data/unitCatalog';

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return startOfDay(x);
}

/**
 * Notti del soggiorno: ogni giorno in [checkIn, checkOut) deve essere "free" per prenotare.
 * @param {string} unitId
 * @param {Record<string, string>} cells
 * @param {Date} checkIn
 * @param {Date} checkOut
 */
export function isUnitFreeForStay(unitId, cells, checkIn, checkOut) {
  const end = startOfDay(checkOut);
  for (let d = startOfDay(checkIn); d.getTime() < end.getTime(); d = addDays(d, 1)) {
    const st = cells[cellKey(unitId, d)] ?? 'free';
    if (st !== 'free') return false;
  }
  return true;
}

/**
 * @param {'giardino' | 'mare'} category
 * @param {Record<string, string>} cells
 */
export function categoryHasAvailableUnit(category, cells, checkIn, checkOut) {
  return RESIDENCE_UNITS.filter((u) => u.category === category).some((u) =>
    isUnitFreeForStay(u.id, cells, checkIn, checkOut),
  );
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
      image: getUnitPreviewImage(u.category),
      available,
      maxGuests: 4,
      reason: available ? undefined : 'Non disponibile per le date selezionate.',
    };
  });
}

/**
 * @param {{ checkIn: Date; checkOut: Date; guests: { adults: number; children: number; infants: number } }} params
 * @param {Record<string, string>} cells
 * @param {{ overCapacity: boolean; nights: number }} meta
 */
export function buildAvailabilityFromPlanning(params, cells, meta) {
  const { checkIn, checkOut } = params;
  const { overCapacity, nights } = meta;

  const emptyReason = (msg) =>
    RESIDENCE_UNITS.map((u) => ({
      unitId: u.id,
      name: u.name,
      kicker: UNIT_CATEGORY_LABEL[u.category],
      category: u.category,
      image: getUnitPreviewImage(u.category),
      available: false,
      maxGuests: 4,
      reason: msg,
    }));

  if (nights <= 0) {
    const units = emptyReason('Seleziona check-in e check-out validi.');
    return {
      source: 'mock',
      syncedFromPlanning: true,
      searchId: `mock-planning-invalid-${Date.now()}`,
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
      source: 'mock',
      syncedFromPlanning: true,
      searchId: `mock-planning-cap-${checkIn.getTime()}`,
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
    source: 'mock',
    syncedFromPlanning: true,
    searchId: `mock-planning-${checkIn.getTime()}-${checkOut.getTime()}`,
    nights,
    currency: 'EUR',
    globalAvailable: anyAvailable,
    units,
    message: !anyAvailable
      ? 'Nessun monolocale disponibile per l’intero periodo: verifica le date o contatta la reception.'
      : null,
  };
}
