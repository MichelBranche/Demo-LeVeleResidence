# Residence Le Vele — Stintino

Sito marketing in **React + Vite + TypeScript**, basato sul layout animato del progetto Olivia Harper e sui contenuti del precedente sito [`sito-leveleresidence`](../sito-leveleresidence).

## Sviluppo

```bash
npm install
npm run dev
```

## Asset multimediali

Copia dal vecchio progetto nella cartella `public/`:

- `Hero-Video.mp4`
- `logo_le_vele_stintino_white.svg` (già presente)
- cartella `Foto 2024 camere Le Vele/`
- cartella `la-pelosa/` (opzionale, per la pagina La Pelosa)
- cartella `foto-preview/` (opzionale)

Esempio PowerShell:

```powershell
Copy-Item "c:\Users\miche\Desktop\sito-leveleresidence\public\*" "c:\Users\miche\Desktop\sitolevele2\public\" -Recurse -Force
```

## Pagine

| Route | Contenuto |
|-------|-----------|
| `/` | Home: residence, suites, galleria, offerte, info, recensioni, contatti |
| `/la-pelosa` | Spiaggia La Pelosa |
| `/camere/vista-giardino` | Dettaglio suite giardino |
| `/camere/vista-mare` | Dettaglio suite mare |

## Build

```bash
npm run build
npm run preview
```
