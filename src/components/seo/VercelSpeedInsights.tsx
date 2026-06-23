import { SpeedInsights, computeRoute } from '@vercel/speed-insights/react';
import { useLocation, useParams } from 'react-router-dom';
import { normalizePathname } from '@/data/routes';

/**
 * Web Vitals Vercel — sempre attivo in produzione (non raccoglie in `vite dev`).
 * La route viene normalizzata per raggruppare alias SPA (es. /suite/vista-mare).
 */
export function VercelSpeedInsights() {
  const { pathname } = useLocation();
  const params = useParams();
  const routeParams = Object.fromEntries(
    Object.entries(params).filter((entry): entry is [string, string] => entry[1] !== undefined),
  );
  const route = computeRoute(normalizePathname(pathname), routeParams);

  if (!import.meta.env.PROD) {
    return null;
  }

  return <SpeedInsights route={route} framework="react" />;
}
