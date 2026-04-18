import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Porta l'utente all'inizio della pagina ad ogni cambio di route.
 * - Reset immediato (senza smooth) così non si vede lo "scrollback" all'ingresso.
 * - Se la URL contiene un hash, lascia che il browser gestisca lo scroll verso l'ancora.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, '');
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
