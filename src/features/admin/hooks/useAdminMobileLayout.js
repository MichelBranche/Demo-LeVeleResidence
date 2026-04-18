import { useEffect, useState } from 'react';

/** Larghezza sotto la quale si usa il gestionale mobile dedicato (non solo CSS responsive). */
const MOBILE_GESTIONALE_QUERY = '(max-width: 768px)';

/**
 * @returns {boolean}
 */
export function useAdminMobileLayout() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_GESTIONALE_QUERY).matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_GESTIONALE_QUERY);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}
