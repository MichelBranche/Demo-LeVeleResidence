/** Stintino (Sardegna) — coordinate approssimative per Open-Meteo */
export const STINTINO_COORDS = { latitude: 40.9375, longitude: 8.2239 };

/**
 * @param {number} code WMO weathercode da Open-Meteo
 * @returns {string}
 */
export function weatherCodeToLabelIt(code) {
  if (code === 0) return 'Sereno';
  if (code <= 3) return 'Prevalentemente sereno / nuvoloso';
  if (code <= 48) return 'Nebbia';
  if (code <= 57) return 'Pioggerella';
  if (code <= 67) return 'Pioggia';
  if (code <= 77) return 'Neve';
  if (code <= 82) return 'Rovesci';
  if (code <= 86) return 'Rovesci di neve';
  if (code <= 99) return 'Temporale';
  return 'Variabile';
}

/**
 * @returns {Promise<{
 *   temperature: number;
 *   apparent: number | null;
 *   humidity: number | null;
 *   windKmh: number | null;
 *   code: number;
 *   label: string;
 *   time: string;
 * }>}
 */
export async function fetchStintinoCurrentWeather() {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(STINTINO_COORDS.latitude));
  url.searchParams.set('longitude', String(STINTINO_COORDS.longitude));
  url.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature',
  );
  url.searchParams.set('timezone', 'Europe/Rome');

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  const c = data.current;
  if (!c) throw new Error('Risposta meteo non valida');

  const code = c.weather_code ?? 0;
  return {
    temperature: Math.round(c.temperature_2m * 10) / 10,
    apparent: typeof c.apparent_temperature === 'number' ? Math.round(c.apparent_temperature * 10) / 10 : null,
    humidity: typeof c.relative_humidity_2m === 'number' ? c.relative_humidity_2m : null,
    windKmh: typeof c.wind_speed_10m === 'number' ? Math.round(c.wind_speed_10m * 10) / 10 : null,
    code,
    label: weatherCodeToLabelIt(code),
    time: c.time ?? '',
  };
}
