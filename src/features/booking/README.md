# Ricerca disponibilità (frontend)

Questo modulo espone la ricerca date + ospiti e un layer API pronto per collegarsi al backend / gestionale.

## Comportamento attuale

- Senza variabile d’ambiente `VITE_API_BASE_URL`, le risposte sono **simulate** (`source: "mock"` in risposta) tramite `api/mockAvailability.js`.
- Con `VITE_API_BASE_URL` impostato (es. `https://api.tuodominio.it`), il client chiama l’endpoint reale.

## Endpoint previsto (REST)

`POST /v1/availability/search`

### Request body (JSON)

```json
{
  "checkIn": "2026-07-01",
  "checkOut": "2026-07-08",
  "guests": {
    "adults": 2,
    "children": 0,
    "infants": 0
  }
}
```

Date in formato **ISO solo data** (`YYYY-MM-DD`), fuso orario del residence (da definire lato server).

### Response body (JSON)

Allineare il backend a questa forma (campi opzionali marcati):

```json
{
  "source": "api",
  "searchId": "uuid-opzionale",
  "nights": 7,
  "currency": "EUR",
  "globalAvailable": true,
  "units": [
    {
      "unitId": "vista-giardino",
      "name": "Con Vista Giardino",
      "kicker": "Monolocale per 2 o 4 persone",
      "available": true,
      "maxGuests": 4,
      "reason": "solo se available è false"
    }
  ],
  "message": "testo opzionale per l’utente"
}
```

Il gestionale/planning può:

- Calcolare disponibilità per unità (`unitId` coerente con gli slug camere del sito).
- Aggiornare prezzi minimi/massimi in una iterazione successiva (campi non ancora usati in UI).

### Errori HTTP

In caso di errore, rispondere con JSON `{ "message": "..." }` quando possibile; il client mostra `message` all’utente.

## Variabili d’ambiente (Vite)

Creare `.env.local`:

```env
VITE_API_BASE_URL=https://api.esempio.it
```

## Salvataggio locale (bozza prenotazione)

- Chiave `localStorage`: **`levele_booking_draft_v1`**
- Salvataggio: date e ospiti (debounce 500 ms), e dopo ogni ricerca riuscita l’ultima risposta disponibilità.
- All’avvio pagina la barra prenotazione ripristina bozza e risultato (se le date non sono nel passato e coincidono con i parametri salvati).
- Il modale può essere chiuso senza perdere i dati: restano in memoria e su `localStorage`.

## File principali

- `api/availabilityClient.js` — chiamata HTTP + fallback mock
- `api/mockAvailability.js` — demo senza server
- `hooks/useAvailabilitySearch.js` — stato loading / success / error
- `components/AvailabilityResultModal.jsx` — UI risultati
- `storage/bookingDraftStorage.js` — persistenza bozza
