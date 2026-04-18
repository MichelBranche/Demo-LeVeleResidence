/**
 * Le 18 unità del residence (monolocali).
 * Tipologia: prime 9 con orientamento giardino, successive 9 vista mare (schema tipico residence).
 * Modificabile quando avrete la mappa reale delle unità.
 */

/** @typedef {'giardino' | 'mare'} UnitCategory */

/** @typedef {{ id: string; code: string; name: string; shortLabel: string; category: UnitCategory }} ResidenceUnit */

/** @type {ResidenceUnit[]} */
export const RESIDENCE_UNITS = Array.from({ length: 18 }, (_, i) => {
  const n = i + 1;
  const category = n <= 9 ? 'giardino' : 'mare';
  const id = `unit-${String(n).padStart(2, '0')}`;
  return {
    id,
    code: String(n),
    name: `Monolocale ${n}`,
    shortLabel: `M${n}`,
    category,
  };
});

export const UNIT_CATEGORY_LABEL = {
  giardino: 'Vista giardino',
  mare: 'Vista mare',
};
