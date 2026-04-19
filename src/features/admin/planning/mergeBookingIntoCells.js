/**
 * Allinea al server `api/_lib/planningModel.applyBookingToPlanning`:
 * notti in [checkIn, checkOut) → occupied, giorno checkOut → checkout.
 *
 * @param {Record<string, string>} cells
 * @param {{ unitIds: string[]; checkIn: string; checkOut: string }} booking
 * @returns {Record<string, string>}
 */
export function mergeBookingIntoCells(cells, booking) {
  const checkIn = parseISODate(String(booking.checkIn || ''));
  const checkOut = parseISODate(String(booking.checkOut || ''));
  if (!checkIn || !checkOut || checkOut <= checkIn) return cells;

  const next = { ...(cells || {}) };
  const end = new Date(checkOut);

  for (const unitId of booking.unitIds) {
    for (let d = new Date(checkIn); d < end; d = addDays(d, 1)) {
      const iso = toLocalISODate(d);
      next[cellKeyIso(unitId, iso)] = 'occupied';
    }
    next[cellKeyIso(unitId, toLocalISODate(checkOut))] = 'checkout';
  }

  return next;
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

/**
 * @param {Date} d
 */
function toLocalISODate(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

/**
 * @param {string} isoDate
 */
function parseISODate(isoDate) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const da = Number(m[3]);
  const d = new Date(y, mo, da);
  if (Number.isNaN(d.getTime())) return null;
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * @param {Date} d
 * @param {number} n
 */
function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  x.setHours(0, 0, 0, 0);
  return x;
}

/**
 * @param {string} unitId
 * @param {string} isoDay
 */
function cellKeyIso(unitId, isoDay) {
  return `${unitId}|${isoDay}`;
}
