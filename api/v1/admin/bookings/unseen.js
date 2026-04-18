import { apiError, apiOk, kvGetJson } from '../../../_lib/upstashKv.js';
import { assertAdmin } from '../../../_lib/auth.js';

const SEQ_KEY = 'levele:bookings:seq:v1';
const BOOKING_KEY_PREFIX = 'levele:booking:';

export default async function handler(req, res) {
  if (req.method !== 'GET') return apiError(res, 405, 'Metodo non consentito.');
  const auth = assertAdmin(req);
  if (!auth.ok) return apiError(res, 401, auth.message);

  try {
    const seq = (await kvGetJson(SEQ_KEY)) || 0;
    const n = typeof seq === 'number' ? seq : Number(seq);
    const max = Number.isFinite(n) ? n : 0;

    const limit = Math.min(25, Math.max(1, Number(new URL(req.url, 'http://x').searchParams.get('limit') || 10)));

    const bookings = [];
    for (let i = max; i >= 1 && bookings.length < limit; i--) {
      const id = `B${i}`;
      const b = await kvGetJson(`${BOOKING_KEY_PREFIX}${id}`);
      if (b && b.seen === false) bookings.push(b);
    }

    return apiOk(res, { count: bookings.length, bookings });
  } catch (e) {
    return apiError(res, 500, e?.message || 'Errore interno.');
  }
}

