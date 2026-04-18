import { apiError, apiOk, kvGetJson, kvSetJson } from '../../../_lib/upstashKv.js';
import { assertAdmin } from '../../../_lib/auth.js';

const BOOKING_KEY_PREFIX = 'levele:booking:';

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return apiError(res, 405, 'Metodo non consentito.');
  const auth = assertAdmin(req);
  if (!auth.ok) return apiError(res, 401, auth.message);

  let body;
  try {
    body = await readJson(req);
  } catch {
    return apiError(res, 400, 'JSON non valido.');
  }

  const ids = Array.isArray(body?.ids) ? body.ids.map(String).filter(Boolean) : [];
  if (!ids.length) return apiError(res, 400, 'Nessun ID.');

  try {
    let updated = 0;
    for (const id of ids) {
      const key = `${BOOKING_KEY_PREFIX}${id}`;
      const b = await kvGetJson(key);
      if (!b) continue;
      if (b.seen === true) continue;
      b.seen = true;
      await kvSetJson(key, b);
      updated += 1;
    }
    return apiOk(res, { updated });
  } catch (e) {
    return apiError(res, 500, e?.message || 'Errore interno.');
  }
}

