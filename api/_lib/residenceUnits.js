/**
 * Copia statica delle unità (allineata a `src/features/admin/data/residenceUnits.js`)
 * per uso nelle serverless senza importare il bundle Vite.
 */

/** @type {{ id: string; name: string; category: 'giardino' | 'mare' }[]} */
export const RESIDENCE_UNITS = Array.from({ length: 18 }, (_, i) => {
  const n = i + 1;
  const category = n <= 9 ? 'giardino' : 'mare';
  const id = `unit-${String(n).padStart(2, '0')}`;
  return {
    id,
    name: `Monolocale ${n}`,
    category,
  };
});

export const UNIT_CATEGORY_LABEL = {
  giardino: 'Vista giardino',
  mare: 'Vista mare',
};
