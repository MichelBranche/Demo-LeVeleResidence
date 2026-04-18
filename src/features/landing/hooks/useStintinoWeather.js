import { useEffect, useState } from 'react';

/* Coordinate di Stintino (SS) - Sardegna */
const STINTINO_LAT = 40.9379;
const STINTINO_LON = 8.2305;
const CACHE_KEY = 'stintino-weather-v1';
const CACHE_TTL_MS = 10 * 60 * 1000; /* 10 minuti */
const REFRESH_INTERVAL_MS = 15 * 60 * 1000; /* 15 minuti */

const ENDPOINT =
  `https://api.open-meteo.com/v1/forecast?latitude=${STINTINO_LAT}&longitude=${STINTINO_LON}` +
  `&current=temperature_2m,weather_code&timezone=auto`;

/* Mappa WMO weather codes (https://open-meteo.com/en/docs) a una breve label IT. */
function describeWeatherCode(code) {
  if (code === 0) return 'Sereno';
  if (code === 1) return 'Soleggiato';
  if (code === 2) return 'Poco nuvoloso';
  if (code === 3) return 'Nuvoloso';
  if (code === 45 || code === 48) return 'Nebbia';
  if (code >= 51 && code <= 57) return 'Pioviggine';
  if (code >= 61 && code <= 67) return 'Pioggia';
  if (code >= 71 && code <= 77) return 'Neve';
  if (code >= 80 && code <= 82) return 'Rovesci';
  if (code >= 95 && code <= 99) return 'Temporale';
  return '';
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.timestamp || Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
  } catch {
    /* quota piena o storage disabilitato: amen */
  }
}

export function useStintinoWeather() {
  const [state, setState] = useState(() => {
    const cached = readCache();
    return {
      temperature: cached?.temperature ?? null,
      description: cached?.description ?? '',
      status: cached ? 'ready' : 'loading',
    };
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      try {
        const res = await fetch(ENDPOINT, { headers: { accept: 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const tempRaw = json?.current?.temperature_2m;
        const code = json?.current?.weather_code;
        if (typeof tempRaw !== 'number') throw new Error('invalid payload');

        const data = {
          temperature: Math.round(tempRaw),
          description: describeWeatherCode(code),
        };
        writeCache(data);
        if (!cancelled) {
          setState({ ...data, status: 'ready' });
        }
      } catch {
        if (!cancelled) {
          setState((prev) =>
            prev.temperature != null ? prev : { temperature: null, description: '', status: 'error' },
          );
        }
      }
    }

    fetchWeather();
    const intervalId = window.setInterval(fetchWeather, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return state;
}
