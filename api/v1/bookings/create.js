import { apiError, apiOk, kvGetJson, kvPipeline, kvSetJson } from '../../_lib/upstashKv.js';
import { applyBookingToPlanning } from '../../_lib/planningModel.js';

const PLANNING_KEY = 'levele:planning:cells:v1';
const SEQ_KEY = 'levele:bookings:seq:v1';
const BOOKING_KEY_PREFIX = 'levele:booking:';
const BOOKINGS_LIST_KEY = 'levele:bookings:list';

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

function nowIso() {
  return new Date().toISOString();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return apiError(res, 405, 'Metodo non consentito.');

  let body;
  try {
    body = await readJson(req);
  } catch {
    return apiError(res, 400, 'JSON non valido.');
  }

  const checkIn = String(body?.checkIn || '');
  const checkOut = String(body?.checkOut || '');
  const unitIds = Array.isArray(body?.unitIds) ? body.unitIds.map(String).filter(Boolean) : [];
  const customer = body?.customer && typeof body.customer === 'object' ? body.customer : {};

  if (!checkIn || !checkOut || unitIds.length === 0) {
    return apiError(res, 400, 'Dati prenotazione incompleti.');
  }

  const booking = {
    id: null,
    createdAt: nowIso(),
    seen: false,
    checkIn,
    checkOut,
    unitIds,
    guests: body?.guests || null,
    payment: body?.payment || null,
    coupon: body?.coupon || null,
    totalEuro: typeof body?.totalEuro === 'number' ? body.totalEuro : null,
    notes: typeof body?.notes === 'string' ? body.notes : '',
    customer: {
      firstName: String(customer?.firstName || ''),
      lastName: String(customer?.lastName || ''),
      email: String(customer?.email || ''),
      phone: String(customer?.phone || ''),
    },
    source: 'website',
  };

  try {
    // 1) assegna id incrementale
    const pipeRes = await kvPipeline([['INCR', SEQ_KEY]]);
    const seq = pipeRes?.[0]?.result;
    const idNum = typeof seq === 'number' ? seq : Number(seq);
    if (!Number.isFinite(idNum)) throw new Error('Impossibile generare ID prenotazione.');
    const bookingId = `B${idNum}`;
    booking.id = bookingId;

    // 2) salva booking
    await kvSetJson(`${BOOKING_KEY_PREFIX}${bookingId}`, booking);

    await kvPipeline([
      ['LPUSH', BOOKINGS_LIST_KEY, bookingId],
      ['LTRIM', BOOKINGS_LIST_KEY, '0', '199'],
    ]);

    // 3) aggiorna planning
    const currentCells = (await kvGetJson(PLANNING_KEY)) || {};
    const nextCells = applyBookingToPlanning(currentCells, { unitIds, checkIn, checkOut });
    await kvSetJson(PLANNING_KEY, nextCells);

    return apiOk(res, { bookingId });
  } catch (e) {
    const msg = e?.message || 'Errore interno.';
    return apiError(res, 500, msg);
  }
}

