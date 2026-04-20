# Residence Le Vele - Full Stack Web App

![Hero Section](preview.png)

Sito ufficiale del Residence Le Vele con:

- landing page animata e contenuti editoriali;
- pagine camere e flusso prenotazione;
- area admin (planning, prenotazioni, sync extranet);
- API serverless deployabili su Vercel.

## Full Tech Stack

### Frontend

- `React` (v19)
- `React Router DOM` (routing SPA)
- `Vite` (dev server + build)
- CSS custom (no framework CSS utility)
- `GSAP` + `ScrollTrigger` (animazioni scroll e interaction)
- `Lenis` (smooth scroll)
- `SplitType` (animazioni tipografiche)

### Backend/API

- API serverless in `api/` (runtime Node.js su Vercel)
- Endpoints REST custom (booking, availability, admin, extranet sync)
- Autenticazione admin via header `x-admin-password`
- Persistenza dati su `Upstash Redis` via REST API

### Tooling / Quality

- `ESLint` (flat config)
- `@vitejs/plugin-react`
- `npm` + `package-lock.json` per dependency lock

### Deploy / Infra

- `Vercel` (frontend + serverless functions)
- Config SPA fallback in `vercel.json`

## Architettura progetto

- `src/` - applicazione React
- `src/features/landing/` - home, sezioni animate, storytelling
- `src/features/booking/` - ricerca disponibilita, checkout e storage bozza
- `src/features/rooms/` - pagine dettaglio camere
- `src/features/admin/` - dashboard admin, planning, extranet UI
- `api/v1/` - endpoint REST pubblici e admin
- `api/_lib/` - funzioni condivise backend (auth, kv, planning model)

## Routing frontend

Gestito in `src/App.jsx`:

- `/` -> Landing page
- `/la-pelosa` -> pagina dedicata alla spiaggia
- `/camere/:slug` -> dettaglio camera
- `/prenota/conferma` -> checkout
- `/admin` -> area amministrazione

## API disponibili

### Public

- `POST /api/v1/availability/search`
- `POST /api/v1/bookings/create`

### Admin

- `GET /api/v1/admin/bookings/list`
- `POST /api/v1/admin/bookings/ack`
- `GET /api/v1/admin/bookings/unseen`
- `GET /api/v1/admin/planning/get`
- `POST /api/v1/admin/planning/set`
- `POST /api/v1/admin/extranet/sync`

## Variabili d'ambiente

### Frontend (Vite)

Usate in browser (`import.meta.env`):

- `VITE_API_BASE_URL` - base URL API (opzionale, default path relativi)
- `VITE_ADMIN_PASSWORD` - password admin lato client (solo per flussi demo/interni)
- `VITE_BOOKING_EXTRANET_PORTAL_URL` - link portale extranet in UI admin

### Backend (Vercel / Node)

Usate nelle serverless functions (`process.env`):

- `KV_REST_API_URL` - endpoint Upstash Redis REST
- `KV_REST_API_TOKEN` - token Upstash Redis REST
- `ADMIN_API_PASSWORD` - password admin server-side (consigliata)
- `BOOKING_EXTRANET_PULL_URL` - endpoint remoto da cui importare prenotazioni extranet
- `BOOKING_EXTRANET_BEARER_TOKEN` - bearer token per chiamata extranet (opzionale)
- `BOOKING_EXTRANET_PULL_METHOD` - `GET` oppure `POST` (default `GET`)

## Setup locale

Prerequisiti:

- Node.js 20+ (consigliato)
- npm 10+

Installazione:

```bash
npm install
```

Avvio sviluppo:

```bash
npm run dev
```

Build produzione:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

## Esempio `.env.local` (frontend)

```env
VITE_API_BASE_URL=
VITE_ADMIN_PASSWORD=
VITE_BOOKING_EXTRANET_PORTAL_URL=
```

## Esempio variabili su Vercel (backend)

Configura nel project settings di Vercel:

- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `ADMIN_API_PASSWORD`
- `BOOKING_EXTRANET_PULL_URL` (se usi sync extranet)
- `BOOKING_EXTRANET_BEARER_TOKEN` (opzionale)
- `BOOKING_EXTRANET_PULL_METHOD` (opzionale)

## Note operative

- Se `VITE_API_BASE_URL` non e impostata, il frontend usa path relativi verso le API nello stesso progetto.
- Alcuni moduli booking supportano fallback/mock in assenza di backend configurato.
- L'area admin puo essere protetta solo lato server impostando `ADMIN_API_PASSWORD`.
- In mancanza di credenziali KV, gli endpoint che richiedono storage restituiscono errore esplicito.

## Deploy

Deploy consigliato: Vercel.

- Build command: `npm run build`
- Output directory: `dist`
- Le API in `api/` vengono pubblicate come funzioni serverless.
- `vercel.json` include rewrite SPA verso `index.html`.

## Licenza

Progetto privato (repository non destinato a uso pubblico salvo diversa indicazione del proprietario).
