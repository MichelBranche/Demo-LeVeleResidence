const STORAGE_KEY = 'levele_admin_extranet_ui_v1';

/**
 * @returns {{ autoSync: boolean; intervalMinutes: number }}
 */
export function loadExtranetUiSettings() {
  const defaults = { autoSync: false, intervalMinutes: 2 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const p = JSON.parse(raw);
    if (p.version !== 1) return defaults;
    const intervalMinutes = Math.min(30, Math.max(1, Number(p.intervalMinutes) || defaults.intervalMinutes));
    return {
      autoSync: Boolean(p.autoSync),
      intervalMinutes,
    };
  } catch {
    return defaults;
  }
}

/**
 * @param {{ autoSync: boolean; intervalMinutes: number }} s
 */
export function saveExtranetUiSettings(s) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, autoSync: s.autoSync, intervalMinutes: s.intervalMinutes }),
    );
  } catch {
    /* ignore */
  }
}
