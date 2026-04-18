import { toISODateString } from '../api/serializeDates';

const STORAGE_KEY = 'levele_booking_draft_v1';

/** @param {string} s - YYYY-MM-DD */
function parseLocalYMD(s) {
  const parts = s.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

/**
 * @param {Date} a
 * @param {Date} b
 */
function sameCalendarDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  );
}

/**
 * @param {import('../api/types').GuestBreakdown} a
 * @param {import('../api/types').GuestBreakdown} b
 */
function sameGuests(a, b) {
  return (
    a.adults === b.adults && a.children === b.children && a.infants === b.infants
  );
}

/**
 * @param {Date} todayStart - mezzanotte locale (da startOfToday)
 */
export function loadBookingDraft(todayStart) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (p.version !== 1 || !p.guests) return null;

    const checkIn = p.checkIn ? new Date(p.checkIn) : null;
    const checkOut = p.checkOut ? new Date(p.checkOut) : null;

    if (checkIn && checkIn < todayStart) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    if (checkIn && checkOut && checkOut <= checkIn) return null;

    let lastResult = p.lastResult ?? null;
    if (lastResult?.response && lastResult.params) {
      const pin = lastResult.params.checkIn ? parseLocalYMD(lastResult.params.checkIn) : null;
      const pout = lastResult.params.checkOut ? parseLocalYMD(lastResult.params.checkOut) : null;
      const pg = lastResult.params.guests;
      if (
        !pin ||
        !pout ||
        !pg ||
        !checkIn ||
        !checkOut ||
        !sameCalendarDay(pin, checkIn) ||
        !sameCalendarDay(pout, checkOut) ||
        !sameGuests(pg, p.guests)
      ) {
        lastResult = null;
      }
    } else {
      lastResult = null;
    }

    return {
      checkIn,
      checkOut,
      guests: {
        adults: Number(p.guests.adults) || 2,
        children: Number(p.guests.children) || 0,
        infants: Number(p.guests.infants) || 0,
      },
      lastResponse: lastResult?.response ?? null,
      savedAt: p.savedAt ?? null,
    };
  } catch {
    return null;
  }
}

/**
 * @param {object} p
 * @param {Date | null} p.checkIn
 * @param {Date | null} p.checkOut
 * @param {import('../api/types').GuestBreakdown} p.guests
 * @param {import('../api/types').AvailabilitySearchResponse | null} [p.lastResponse]
 */
export function saveBookingDraft({ checkIn, checkOut, guests, lastResponse }) {
  try {
    const payload = {
      version: 1,
      checkIn: checkIn ? checkIn.toISOString() : null,
      checkOut: checkOut ? checkOut.toISOString() : null,
      guests: { ...guests },
      savedAt: new Date().toISOString(),
    };

    if (lastResponse && checkIn && checkOut && checkOut > checkIn) {
      payload.lastResult = {
        params: {
          checkIn: toISODateString(checkIn),
          checkOut: toISODateString(checkOut),
          guests: { ...guests },
        },
        response: lastResponse,
      };
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota piena o modalità privata */
  }
}

export function clearBookingDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
