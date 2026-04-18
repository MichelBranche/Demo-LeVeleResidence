import { kvGetJson } from '../../_lib/upstashKv.js';
import { buildAvailabilitySearchResponse } from '../../_lib/availabilityFromPlanning.js';

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

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { message: 'Metodo non consentito.' });
  }

  let body;
  try {
    body = await readJson(req);
  } catch {
    return json(res, 400, { message: 'JSON non valido.' });
  }

  const checkIn = String(body?.checkIn || '');
  const checkOut = String(body?.checkOut || '');
  const guests = body?.guests && typeof body.guests === 'object' ? body.guests : {};

  if (!checkIn || !checkOut) {
    return json(res, 400, { message: 'checkIn e checkOut sono obbligatori.' });
  }

  try {
    const cells = (await kvGetJson(PLANNING_KEY)) || {};
    const out = buildAvailabilitySearchResponse(
      checkIn,
      checkOut,
      {
        adults: Number(guests.adults) || 0,
        children: Number(guests.children) || 0,
        infants: Number(guests.infants) || 0,
      },
      typeof cells === 'object' && cells ? cells : {},
    );
    return json(res, 200, out);
  } catch (e) {
    // @ts-ignore
    if (e?.code === 'KV_NOT_CONFIGURED') {
      return json(res, 503, {
        message: 'Storage non configurato: imposta KV_REST_API_URL e KV_REST_API_TOKEN su Vercel.',
      });
    }
    return json(res, 500, { message: e?.message || 'Errore interno.' });
  }
}
