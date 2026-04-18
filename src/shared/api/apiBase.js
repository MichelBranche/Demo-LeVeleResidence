export function getApiBaseUrl() {
  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? '';
  return base;
}

/**
 * Per le API Vercel nello stesso progetto conviene usare path relativo.
 * Se VITE_API_BASE_URL è impostato, lo preferiamo.
 * @param {string} path e.g. "/api/v1/bookings/create" o "/v1/availability/search"
 */
export function apiUrl(path) {
  const base = getApiBaseUrl();
  if (!path.startsWith('/')) return base ? `${base}/${path}` : `/${path}`;
  return base ? `${base}${path}` : path;
}

