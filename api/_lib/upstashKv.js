function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function getEnv(name) {
  return process.env[name] || '';
}

function getKvConfig() {
  const url = getEnv('KV_REST_API_URL');
  const token = getEnv('KV_REST_API_TOKEN');
  return { url: url.replace(/\/$/, ''), token };
}

async function kvFetch(path, init) {
  const { url, token } = getKvConfig();
  if (!url || !token) {
    const e = new Error('KV non configurato (KV_REST_API_URL / KV_REST_API_TOKEN).');
    // @ts-ignore
    e.code = 'KV_NOT_CONFIGURED';
    throw e;
  }
  const res = await fetch(`${url}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = data?.error || data?.message || `KV error (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

/**
 * @param {Array<any[]>} commands
 */
export async function kvPipeline(commands) {
  // Upstash REST: POST /pipeline body: [["GET","k"], ...]
  return kvFetch('/pipeline', { method: 'POST', body: JSON.stringify(commands) });
}

/**
 * @param {string} key
 */
export async function kvGetJson(key) {
  const r = await kvFetch(`/get/${encodeURIComponent(key)}`, { method: 'GET' });
  if (!r || typeof r.result === 'undefined' || r.result === null) return null;
  if (typeof r.result === 'object') return r.result;
  try {
    return JSON.parse(r.result);
  } catch {
    return null;
  }
}

/**
 * @param {string} key
 * @param {any} value
 */
export async function kvSetJson(key, value) {
  const payload = JSON.stringify(value);
  return kvFetch(`/set/${encodeURIComponent(key)}/${encodeURIComponent(payload)}`, { method: 'POST' });
}

export function apiError(res, status, message, extra) {
  return json(res, status, { ok: false, message, ...(extra || {}) });
}

export function apiOk(res, body) {
  return json(res, 200, { ok: true, ...body });
}

