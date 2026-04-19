import { apiError, apiOk, kvGetJson, kvPipeline, kvSetJson } from '../../../_lib/upstashKv.js';
import { assertAdmin } from '../../../_lib/auth.js';
import { applyBookingToPlanning } from '../../../_lib/planningModel.js';
import { RESIDENCE_UNITS } from '../../../_lib/residenceUnits.js';

const PLANNING_KEY = 'levele:planning:cells:v1';
const SEQ_KEY = 'levele:bookings:seq:v1';
const BOOKING_KEY_PREFIX = 'levele:booking:';
const BOOKINGS_LIST_KEY = 'levele:bookings:list';
const EXTRANET_MAP_KEY = 'levele:bookings:extranet:map:v1';

const UNIT_IDS = new Set(RESIDENCE_UNITS.map((u) => u.id));

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

/**
 * @param {unknown} data
 * @returns {unknown[]}
 */
function extractItems(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    const o = /** @type {Record<string, unknown>} */ (data);
    if (Array.isArray(o.items)) return o.items;
    if (Array.isArray(o.bookings)) return o.bookings;
    if (Array.isArray(o.reservations)) return o.reservations;
  }
  return [];
}

/**
 * @param {unknown} raw
 * @returns {null | { extranetKey: string; checkIn: string; checkOut: string; unitIds: string[]; guests: unknown; customer: unknown; notes: string }}
 */
function normalizeItem(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const o = /** @type {Record<string, unknown>} */ (raw);
  const checkIn = String(o.checkIn || o.arrival || o.dateFrom || o.startDate || '');
  const checkOut = String(o.checkOut || o.departure || o.dateTo || o.endDate || '');
  let unitIds = Array.isArray(o.unitIds) ? o.unitIds.map(String).filter(Boolean) : [];
  if (!unitIds.length && o.unitId) unitIds = [String(o.unitId)];
  unitIds = unitIds.filter((id) => UNIT_IDS.has(id));
  if (!checkIn || !checkOut || !unitIds.length) return null;

  const idRaw = o.id ?? o.externalId ?? o.reservationId ?? o.confirmationCode ?? o.reference;
  const extranetKey =
    idRaw != null && String(idRaw).trim()
      ? `ext:${String(idRaw).trim()}`
      : `hash:${checkIn}:${checkOut}:${[...unitIds].sort().join(',')}`;

  return {
    extranetKey,
    checkIn,
    checkOut,
    unitIds,
    guests: o.guests ?? null,
    customer: o.customer && typeof o.customer === 'object' ? o.customer : {},
    notes: typeof o.notes === 'string' ? o.notes : '',
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return apiError(res, 405, 'Metodo non consentito.');
  const auth = assertAdmin(req);
  if (!auth.ok) return apiError(res, 401, auth.message);

  const pullUrl = process.env.BOOKING_EXTRANET_PULL_URL || '';
  if (!pullUrl) {
    return apiOk(res, {
      synced: 0,
      skipped: 0,
      message:
        'Extranet non configurato: imposta BOOKING_EXTRANET_PULL_URL sul server (URL che restituisce JSON con prenotazioni).',
    });
  }

  try {
    await readJson(req);
  } catch {
    return apiError(res, 400, 'JSON non valido.');
  }

  const forwardHeaders = { Accept: 'application/json' };
  const bearer = process.env.BOOKING_EXTRANET_BEARER_TOKEN || '';
  if (bearer) forwardHeaders.Authorization = `Bearer ${bearer}`;

  let remoteJson;
  try {
    const method = (process.env.BOOKING_EXTRANET_PULL_METHOD || 'GET').toUpperCase() === 'POST' ? 'POST' : 'GET';
    const fr = await fetch(pullUrl, {
      method,
      headers: {
        ...forwardHeaders,
        ...(method === 'POST' ? { 'Content-Type': 'application/json' } : {}),
      },
      body: method === 'POST' ? '{}' : undefined,
    });
    if (!fr.ok) {
      const t = await fr.text().catch(() => '');
      return apiError(res, 502, `Extranet HTTP ${fr.status}`, { detail: t.slice(0, 500) });
    }
    remoteJson = await fr.json();
  } catch (e) {
    return apiError(res, 502, e?.message || 'Impossibile contattare l’extranet.');
  }

  const rawItems = extractItems(remoteJson);
  /** @type {NonNullable<ReturnType<typeof normalizeItem>>[]} */
  const normalized = [];
  for (const r of rawItems) {
    const n = normalizeItem(r);
    if (n) normalized.push(n);
  }

  if (!normalized.length) {
    return apiOk(res, { synced: 0, skipped: 0, message: 'Nessuna prenotazione valida nella risposta extranet.' });
  }

  try {
    const hgetCmds = normalized.map((n) => ['HGET', EXTRANET_MAP_KEY, n.extranetKey]);
    const hrows = await kvPipeline(hgetCmds);
    /** @type {typeof normalized} */
    const toCreate = [];
    let skipped = 0;
    for (let i = 0; i < normalized.length; i++) {
      const existing = hrows?.[i]?.result;
      if (existing != null && String(existing).trim()) {
        skipped += 1;
        continue;
      }
      toCreate.push(normalized[i]);
    }

    let planningCells = (await kvGetJson(PLANNING_KEY)) || {};
    let synced = 0;

    for (const norm of toCreate) {
      const pipeRes = await kvPipeline([['INCR', SEQ_KEY]]);
      const seq = pipeRes?.[0]?.result;
      const idNum = typeof seq === 'number' ? seq : Number(seq);
      if (!Number.isFinite(idNum)) throw new Error('Impossibile generare ID prenotazione.');
      const bookingId = `B${idNum}`;

      const cust = /** @type {Record<string, unknown>} */ (norm.customer || {});
      const booking = {
        id: bookingId,
        extranetRef: norm.extranetKey,
        source: 'extranet',
        createdAt: nowIso(),
        seen: false,
        checkIn: norm.checkIn,
        checkOut: norm.checkOut,
        unitIds: norm.unitIds,
        guests: norm.guests,
        payment: null,
        coupon: null,
        totalEuro: null,
        notes: norm.notes,
        customer: {
          firstName: String(cust.firstName || ''),
          lastName: String(cust.lastName || ''),
          email: String(cust.email || ''),
          phone: String(cust.phone || ''),
        },
      };

      await kvSetJson(`${BOOKING_KEY_PREFIX}${bookingId}`, booking);
      await kvPipeline([
        ['LPUSH', BOOKINGS_LIST_KEY, bookingId],
        ['LTRIM', BOOKINGS_LIST_KEY, '0', '199'],
        ['HSET', EXTRANET_MAP_KEY, norm.extranetKey, bookingId],
      ]);

      planningCells = applyBookingToPlanning(planningCells, {
        unitIds: norm.unitIds,
        checkIn: norm.checkIn,
        checkOut: norm.checkOut,
      });
      synced += 1;
    }

    if (synced > 0) {
      await kvSetJson(PLANNING_KEY, planningCells);
    }

    return apiOk(res, {
      synced,
      skipped,
      message:
        synced > 0
          ? `Importate ${synced} prenotazioni extranet; il planning è stato aggiornato.`
          : 'Nessuna nuova prenotazione (già importate o duplicate).',
    });
  } catch (e) {
    // @ts-ignore
    if (e?.code === 'KV_NOT_CONFIGURED') {
      return apiError(res, 503, 'KV non configurato: impossibile salvare prenotazioni extranet.');
    }
    return apiError(res, 500, e?.message || 'Errore interno.');
  }
}
