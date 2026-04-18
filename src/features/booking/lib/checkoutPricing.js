import { loadBookingSettings } from '../storage/bookingSettingsStorage';

/**
 * @param {'giardino' | 'mare'} category
 * @param {ReturnType<typeof loadBookingSettings>} settings
 */
export function nightlyRateForCategory(category, settings) {
  return category === 'mare' ? settings.nightlyRateMare : settings.nightlyRateGiardino;
}

/**
 * @param {Array<{ category: 'giardino' | 'mare' }>} units
 * @param {number} nights
 * @param {ReturnType<typeof loadBookingSettings>} settings
 */
export function computeSubtotalEuro(units, nights, settings) {
  if (nights <= 0 || units.length === 0) return 0;
  let sum = 0;
  for (const u of units) {
    sum += nightlyRateForCategory(u.category, settings) * nights;
  }
  return Math.round(sum * 100) / 100;
}

/**
 * @param {number} subtotal
 * @param {number} globalDiscountPercent 0–90
 * @param {{ type: 'percent' | 'fixed'; value: number } | null} coupon
 */
export function computeDiscountEuro(subtotal, globalDiscountPercent, coupon) {
  let d = 0;
  if (globalDiscountPercent > 0) {
    d += (subtotal * globalDiscountPercent) / 100;
  }
  if (coupon) {
    if (coupon.type === 'percent') {
      d += (subtotal * Math.min(100, Math.max(0, coupon.value))) / 100;
    } else {
      d += Math.min(subtotal, Math.max(0, coupon.value));
    }
  }
  return Math.min(subtotal, Math.round(d * 100) / 100);
}

/**
 * @param {string} code
 * @param {ReturnType<typeof loadBookingSettings>} settings
 * @returns {{ type: 'percent' | 'fixed'; value: number; label?: string } | null}
 */
export function findActiveCoupon(code, settings) {
  const c = code.trim().toUpperCase();
  if (!c) return null;
  const found = settings.coupons.find(
    (x) => x.active && x.code.trim().toUpperCase() === c,
  );
  if (!found) return null;
  return { type: found.type, value: found.value, label: found.label };
}
