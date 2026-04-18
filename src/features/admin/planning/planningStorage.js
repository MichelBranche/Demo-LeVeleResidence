const STORAGE_KEY = 'levele_admin_planning_cells_v1';

/** @typedef {'free' | 'occupied' | 'checkout' | 'maintenance'} CellStatus */

/**
 * Chiave cella: unitId + giorno ISO (YYYY-MM-DD) nel fuso locale.
 * @param {string} unitId
 * @param {Date} day
 */
export function cellKey(unitId, day) {
  const y = day.getFullYear();
  const m = String(day.getMonth() + 1).padStart(2, '0');
  const d = String(day.getDate()).padStart(2, '0');
  return `${unitId}|${y}-${m}-${d}`;
}

/**
 * @returns {Record<string, CellStatus>}
 */
export function loadPlanningCells() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const p = JSON.parse(raw);
    if (p.version !== 1 || typeof p.cells !== 'object' || !p.cells) return {};
    return p.cells;
  } catch {
    return {};
  }
}

/**
 * @param {Record<string, CellStatus>} cells
 */
export function savePlanningCells(cells) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, cells }));
  } catch {
    /* ignore */
  }
}

/** Notifica altri componenti (es. riepilogo giornaliero) che il planning è cambiato. */
export function notifyPlanningCellsChanged() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('levele-planning-updated'));
}

/** Ciclo stati al click (demo gestionale). */
export const STATUS_CYCLE = /** @type {const} */ ([
  'free',
  'occupied',
  'checkout',
  'maintenance',
]);

export const STATUS_LABEL = {
  free: 'Libero',
  occupied: 'Occupato',
  checkout: 'Check-out',
  maintenance: 'Manutenzione',
};
