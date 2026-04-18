import { apiError, apiOk, kvPipeline } from '../../../_lib/upstashKv.js';
import { assertAdmin } from '../../../_lib/auth.js';

const SEQ_KEY = 'levele:bookings:seq:v1';
const BOOKING_KEY_PREFIX = 'levele:booking:';
const BOOKINGS_LIST_KEY = 'levele:bookings:list';

function parseBookingResult(r) {
  if (r == null) return null;
  if (typeof r === 'object' && r.id) return r;
  if (typeof r === 'string') {
    try {
      const b = JSON.parse(r);
      return b && typeof b === 'object' && b.id ? b : null;
    } catch {
      return null;
    }
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return apiError(res, 405, 'Metodo non consentito.');
  const auth = assertAdmin(req);
  if (!auth.ok) return apiError(res, 401, auth.message);

  const url = new URL(req.url, 'http://localhost');
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit') || 50)));

  try {
    const lr = await kvPipeline([['LRANGE', BOOKINGS_LIST_KEY, '0', String(limit - 1)]]);
    const rawIds = lr?.[0]?.result;
    /** @type {string[]} */
    let ids = Array.isArray(rawIds) ? rawIds.map(String).filter(Boolean) : [];

    if (!ids.length) {
      const g = await kvPipeline([['GET', SEQ_KEY]]);
      const rawSeq = g?.[0]?.result;
      const maxSeq =
        rawSeq == null || rawSeq === '' ? 0 : typeof rawSeq === 'number' ? rawSeq : Number(rawSeq);
      if (Number.isFinite(maxSeq) && maxSeq > 0) {
        for (let i = maxSeq; i >= 1 && ids.length < limit; i--) ids.push(`B${i}`);
      }
    }

    ids = [...new Set(ids)].slice(0, limit);

    if (!ids.length) return apiOk(res, { bookings: [] });

    const getCmds = ids.map((id) => ['GET', `${BOOKING_KEY_PREFIX}${id}`]);
    const rows = await kvPipeline(getCmds);
    const bookings = [];
    for (let i = 0; i < ids.length; i++) {
      const b = parseBookingResult(rows?.[i]?.result);
      if (b) bookings.push(b);
    }

    return apiOk(res, { bookings });
  } catch (e) {
    return apiError(res, 500, e?.message || 'Errore interno.');
  }
}
