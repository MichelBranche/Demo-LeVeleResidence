const STORAGE_KEY = 'levele_booking_settings_v1';

/**
 * @typedef {{ id: string; code: string; type: 'percent' | 'fixed'; value: number; label?: string; active: boolean }} BookingCoupon
 */

/**
 * @returns {{
 *   nightlyRateGiardino: number;
 *   nightlyRateMare: number;
 *   globalDiscountPercent: number;
 *   coupons: BookingCoupon[];
 * }}
 */
export function loadBookingSettings() {
  const defaults = {
    nightlyRateGiardino: 95,
    nightlyRateMare: 110,
    globalDiscountPercent: 0,
    coupons: [],
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const p = JSON.parse(raw);
    if (p.version !== 1) return defaults;
    return {
      nightlyRateGiardino: Number(p.nightlyRateGiardino) || defaults.nightlyRateGiardino,
      nightlyRateMare: Number(p.nightlyRateMare) || defaults.nightlyRateMare,
      globalDiscountPercent: Math.min(
        90,
        Math.max(0, Number(p.globalDiscountPercent) || 0),
      ),
      coupons: Array.isArray(p.coupons) ? p.coupons.filter((c) => c && c.code) : [],
    };
  } catch {
    return defaults;
  }
}

/**
 * @param {ReturnType<typeof loadBookingSettings>} settings
 */
export function saveBookingSettings(settings) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        nightlyRateGiardino: settings.nightlyRateGiardino,
        nightlyRateMare: settings.nightlyRateMare,
        globalDiscountPercent: settings.globalDiscountPercent,
        coupons: settings.coupons,
      }),
    );
  } catch {
    /* ignore */
  }
}
