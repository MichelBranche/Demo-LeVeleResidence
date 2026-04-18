import { apiError, apiOk, kvGetJson } from '../../../_lib/upstashKv.js';
import { assertAdmin } from '../../../_lib/auth.js';

const PLANNING_KEY = 'levele:planning:cells:v1';

export default async function handler(req, res) {
  if (req.method !== 'GET') return apiError(res, 405, 'Metodo non consentito.');
  const auth = assertAdmin(req);
  if (!auth.ok) return apiError(res, 401, auth.message);

  try {
    const cells = (await kvGetJson(PLANNING_KEY)) || {};
    return apiOk(res, { cells });
  } catch (e) {
    return apiError(res, 500, e?.message || 'Errore interno.');
  }
}

