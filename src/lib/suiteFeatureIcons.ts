export type SuiteFeatureIconId =
  | 'terrace'
  | 'sea'
  | 'bunk'
  | 'bath'
  | 'veranda'
  | 'garden'
  | 'kitchen'
  | 'ac'
  | 'wifi';

/** Icone allineate 1:1 all’ordine delle feature in i18n. */
export const SUITE_FEATURE_ICONS: Record<string, readonly SuiteFeatureIconId[]> = {
  'vista-mare': ['bunk', 'bunk', 'bunk', 'terrace', 'kitchen', 'bath', 'ac', 'wifi'],
  'vista-giardino': ['bunk', 'bunk', 'bunk', 'veranda', 'garden', 'bath', 'kitchen', 'wifi'],
};

/** Indici in evidenza sulla scheda suite: Wi‑Fi al posto del bagno (già nel testo). */
export const SUITE_FEATURE_PREVIEW_INDICES = [0, 1, 2, 3, 4, 7] as const;

export function getSuiteFeatureIcon(slug: string, index: number): SuiteFeatureIconId {
  return SUITE_FEATURE_ICONS[slug]?.[index] ?? 'bunk';
}
