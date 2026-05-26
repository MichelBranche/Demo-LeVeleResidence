import routesManifest from './routes.json';

export type RoutePageId =
  | 'home'
  | 'booking'
  | 'la-pelosa'
  | 'privacy-policy'
  | 'cookie-policy';

export type RoutesManifest = typeof routesManifest;

export const routes = routesManifest;

/** Normalizza path (alias → path canonico). */
export function normalizePathname(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '') || '/';
  const lower = trimmed.toLowerCase();

  for (const page of routes.pages) {
    if (page.path.toLowerCase() === lower) return page.path;
    const alias = page.aliases?.find((a) => a.toLowerCase() === lower);
    if (alias) return page.path;
  }

  for (const item of routes.suites.items) {
    const canonical = `${routes.suites.basePath}/${item.slug}`;
    if (lower === canonical.toLowerCase()) return canonical;

    const match = item.aliases?.find((a) => a.toLowerCase() === lower);
    if (match) return canonical;
  }

  return trimmed;
}

/** Tutti i path React Router (canonici + alias). */
export function getLaPelosaPaths(): string[] {
  const page = routes.pages.find((p) => p.id === 'la-pelosa');
  if (!page) return ['/la-pelosa'];
  return [page.path, ...(page.aliases ?? [])];
}

export function getPagePaths(id: RoutePageId): string[] {
  const page = routes.pages.find((p) => p.id === id);
  if (!page) return [];
  return [page.path, ...(page.aliases ?? [])];
}

/** True se il path è una pagina suite (canonica o alias). */
export function isSuiteDetailPath(pathname: string): boolean {
  return getSuiteSlugFromPathname(pathname) !== null;
}

/** Slug suite da pathname (anche alias tipo /mare → vista-mare). */
export function getSuiteSlugFromPathname(pathname: string): string | null {
  const canonical = normalizePathname(pathname);
  const prefix = `${routes.suites.basePath}/`;

  if (!canonical.startsWith(prefix)) return null;

  const slug = canonical.slice(prefix.length);
  return slug.length > 0 ? slug : null;
}

export function getSuiteRouteEntries(): { path: string; slug: string }[] {
  const entries: { path: string; slug: string }[] = [];

  for (const item of routes.suites.items) {
    const canonical = `${routes.suites.basePath}/${item.slug}`;
    entries.push({ path: canonical, slug: item.slug });
    for (const alias of item.aliases ?? []) {
      entries.push({ path: alias, slug: item.slug });
    }
  }

  return entries;
}
