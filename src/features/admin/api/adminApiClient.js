import { apiUrl } from '../../../shared/api/apiBase';

function adminPasswordHeader() {
  const pw = import.meta.env.VITE_ADMIN_PASSWORD || '';
  return pw ? { 'x-admin-password': pw } : {};
}

export async function fetchUnseenBookings(limit = 10) {
  const res = await fetch(apiUrl(`/api/v1/admin/bookings/unseen?limit=${encodeURIComponent(String(limit))}`), {
    headers: { Accept: 'application/json', ...adminPasswordHeader() },
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.ok) throw new Error(body?.message || `Errore (${res.status})`);
  return body;
}

export async function ackBookings(ids) {
  const res = await fetch(apiUrl('/api/v1/admin/bookings/ack'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...adminPasswordHeader() },
    body: JSON.stringify({ ids }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.ok) throw new Error(body?.message || `Errore (${res.status})`);
  return body;
}

export async function fetchBookingsList(limit = 50) {
  const res = await fetch(apiUrl(`/api/v1/admin/bookings/list?limit=${encodeURIComponent(String(limit))}`), {
    headers: { Accept: 'application/json', ...adminPasswordHeader() },
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.ok) throw new Error(body?.message || `Errore (${res.status})`);
  return Array.isArray(body.bookings) ? body.bookings : [];
}

export async function fetchPlanningCells() {
  const res = await fetch(apiUrl('/api/v1/admin/planning/get'), {
    headers: { Accept: 'application/json', ...adminPasswordHeader() },
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.ok) throw new Error(body?.message || `Errore (${res.status})`);
  return body.cells || {};
}

export async function savePlanningCellsRemote(cells) {
  const res = await fetch(apiUrl('/api/v1/admin/planning/set'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...adminPasswordHeader() },
    body: JSON.stringify({ cells }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.ok) throw new Error(body?.message || `Errore (${res.status})`);
  return body;
}

/** Sincronizza prenotazioni dall’extranet (server → BOOKING_EXTRANET_PULL_URL) e aggiorna planning in KV. */
export async function postExtranetSync() {
  const res = await fetch(apiUrl('/api/v1/admin/extranet/sync'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...adminPasswordHeader() },
    body: JSON.stringify({}),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.ok) throw new Error(body?.message || `Errore (${res.status})`);
  return body;
}

