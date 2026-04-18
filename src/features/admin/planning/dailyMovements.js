import { RESIDENCE_UNITS } from '../data/residenceUnits';
import { cellKey } from './planningStorage';

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(day, delta) {
  const x = new Date(day);
  x.setDate(x.getDate() + delta);
  return startOfDay(x);
}

/**
 * Ricava arrivi e partenze del giorno dalle celle del planning.
 * - Arrivo: oggi Occupato e ieri non Occupato (nuovo soggiorno).
 * - Partenza: oggi Check-out, oppure ieri Occupato e oggi non Occupato (fine soggiorno / uscita).
 *
 * @param {Record<string, 'free' | 'occupied' | 'checkout' | 'maintenance' | undefined>} cells
 * @param {Date} [refDate] default: oggi locale
 */
export function getArrivalsAndDepartures(cells, refDate = new Date()) {
  const today = startOfDay(refDate);
  const yesterday = addDays(today, -1);

  /** @type {{ id: string; name: string }[]} */
  const arrivals = [];
  /** @type {{ id: string; name: string }[]} */
  const departures = [];

  for (const unit of RESIDENCE_UNITS) {
    const st = cells[cellKey(unit.id, today)] ?? 'free';
    const sy = cells[cellKey(unit.id, yesterday)] ?? 'free';

    if (st === 'occupied' && sy !== 'occupied') {
      arrivals.push({ id: unit.id, name: unit.name });
    }

    if (st === 'checkout' || (sy === 'occupied' && st !== 'occupied')) {
      departures.push({ id: unit.id, name: unit.name });
    }
  }

  return { arrivals, departures, today };
}
