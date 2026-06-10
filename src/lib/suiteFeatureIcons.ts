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

/** Icone allineate all’ordine delle feature in i18n (prime 4 in card home). */
export const SUITE_FEATURE_ICONS: Record<string, readonly SuiteFeatureIconId[]> = {
  'vista-mare': ['terrace', 'sea', 'bunk', 'bath', 'ac', 'wifi'],
  'vista-giardino': ['veranda', 'garden', 'bunk', 'bath', 'kitchen', 'wifi'],
};

export function getSuiteFeatureIcon(slug: string, index: number): SuiteFeatureIconId {
  return SUITE_FEATURE_ICONS[slug]?.[index] ?? 'bunk';
}
