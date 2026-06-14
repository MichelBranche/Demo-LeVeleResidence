import {
  getPagePaths,
  isSuiteDetailPath,
  normalizePathname,
  type RoutePageId,
} from '../data/routes';

/** Pagine con transizione cinematografica in entrata/uscita. */
const EXPERIENCE_PAGE_IDS: RoutePageId[] = ['booking', 'la-pelosa', 'info', 'contact'];

const EXPERIENCE_CANONICAL_PATHS = new Set(
  [
    '/',
    ...EXPERIENCE_PAGE_IDS.map((id) => {
      const paths = getPagePaths(id);
      return paths[0] ? normalizePathname(paths[0]).toLowerCase() : null;
    }),
  ].filter((path): path is string => Boolean(path)),
);

/** Pagine “esperienza” che usano la transizione cinematografica. */
export function isExperienceRoute(pathname: string): boolean {
  const canonical = normalizePathname(pathname).toLowerCase();
  if (EXPERIENCE_CANONICAL_PATHS.has(canonical)) return true;
  if (isSuiteDetailPath(pathname)) return true;
  return false;
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
