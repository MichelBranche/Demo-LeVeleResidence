import {
  getLaPelosaPaths,
  isSuiteDetailPath,
  normalizePathname,
} from '../data/routes';

/** Pagine “esperienza” che usano la transizione cinematografica. */
export function isExperienceRoute(pathname: string): boolean {
  const path = normalizePathname(pathname);
  if (path === '/') return true;
  if (isSuiteDetailPath(path)) return true;

  const pelosaPaths = getLaPelosaPaths().map((p) => normalizePathname(p).toLowerCase());
  return pelosaPaths.includes(path.toLowerCase());
}

export function shouldAnimateRouteChange(fromPath: string, toPath: string): boolean {
  const from = normalizePathname(fromPath);
  const to = normalizePathname(toPath);
  if (from === to) return false;
  return isExperienceRoute(from) && isExperienceRoute(to);
}

export function resolveInternalPath(href: string): string | null {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return null;
  }

  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    return `${normalizePathname(url.pathname)}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}
