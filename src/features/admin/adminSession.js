const SESSION_KEY = 'levele_admin_session_v1';
/** Durata sessione dopo login (stesso tab). */
const SESSION_MS = 24 * 60 * 60 * 1000;

export function getAdminSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (typeof p.exp !== 'number' || p.exp < Date.now()) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return p;
  } catch {
    return null;
  }
}

export function setAdminSession() {
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ v: 1, exp: Date.now() + SESSION_MS, at: Date.now() }),
  );
}

export function clearAdminSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

/** Password attesa (definita in build da .env). */
export function getExpectedAdminPassword() {
  const p = import.meta.env.VITE_ADMIN_PASSWORD;
  return typeof p === 'string' ? p : '';
}

export function isAdminPasswordConfigured() {
  return getExpectedAdminPassword().length > 0;
}
