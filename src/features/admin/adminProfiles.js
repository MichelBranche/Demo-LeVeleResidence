/** Profili disponibili in fase di accesso admin (estendibile). */
export const ADMIN_PROFILE_OPTIONS = [
  { id: 'manager', label: 'Manager' },
  { id: 'dipendente', label: 'Dipendente' },
  { id: 'developer', label: 'Developer' },
];

export const ADMIN_PROFILE_IDS = new Set(ADMIN_PROFILE_OPTIONS.map((o) => o.id));

export function getAdminProfileLabel(id) {
  return ADMIN_PROFILE_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

/** @param {unknown} profiles */
export function normalizeAdminProfiles(profiles) {
  if (!Array.isArray(profiles)) return [];
  const out = [];
  const seen = new Set();
  for (const id of profiles) {
    if (typeof id !== 'string' || !ADMIN_PROFILE_IDS.has(id) || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}
