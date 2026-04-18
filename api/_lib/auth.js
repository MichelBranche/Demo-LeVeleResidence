/**
 * @param {import('http').IncomingMessage} req
 */
export function readAdminPassword(req) {
  const h = req.headers || {};
  const v = h['x-admin-password'];
  if (!v) return '';
  return Array.isArray(v) ? String(v[0] || '') : String(v);
}

export function getServerAdminPassword() {
  return process.env.ADMIN_API_PASSWORD || process.env.VITE_ADMIN_PASSWORD || '';
}

/**
 * @param {import('http').IncomingMessage} req
 */
export function assertAdmin(req) {
  const expected = getServerAdminPassword();
  if (!expected) return { ok: true }; // se non configurato, lasciamo aperto (demo)
  const given = readAdminPassword(req);
  if (given && given === expected) return { ok: true };
  return { ok: false, message: 'Non autorizzato.' };
}

