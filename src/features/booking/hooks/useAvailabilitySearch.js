import { useCallback, useState } from 'react';
import { searchAvailability } from '../api/availabilityClient';

/**
 * @returns {{
 *   runSearch: (params: { checkIn: Date; checkOut: Date; guests: { adults: number; children: number; infants: number } }) => Promise<void>;
 *   reset: () => void;
 *   status: 'idle' | 'loading' | 'success' | 'error';
 *   data: import('../api/types').AvailabilitySearchResponse | null;
 *   error: string | null;
 * }}
 */
export function useAvailabilitySearch() {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);

  /** Ripristina l’ultima risposta da localStorage senza nuova chiamata API. */
  const hydrateSuccess = useCallback((response) => {
    setData(response);
    setStatus('success');
    setError(null);
  }, []);

  const runSearch = useCallback(async (params) => {
    setStatus('loading');
    setError(null);
    setData(null);
    try {
      const result = await searchAvailability(params);
      setData(result);
      setStatus('success');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Errore sconosciuto');
      setStatus('error');
    }
  }, []);

  return { runSearch, reset, hydrateSuccess, status, data, error };
}
