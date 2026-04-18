import { apiError, apiOk, kvSetJson } from '../../../_lib/upstashKv.js';
import { assertAdmin } from '../../../_lib/auth.js';

const PLANNING_KEY = 'levele:planning:cells:v1';

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

  const cells = body?.cells && typeof body.cells === 'object' ? body.cells : null;
  if (!cells) return apiError(res, 400, 'Payload non valido.');

  try {
    await kvSetJson(PLANNING_KEY, cells);
    return apiOk(res, { saved: true });
  } catch (e) {
    return apiError(res, 500, e?.message || 'Errore interno.');
  }
}

