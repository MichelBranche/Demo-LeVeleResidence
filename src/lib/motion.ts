/** Viewport stretto — layout e motion dedicati al mobile. */
export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Touch / mobile: scroll nativo per INP e fluidità. */
export function useNativeScrollOnMobile(): boolean {
  return isMobileViewport();
}

/** ScrollTrigger scrub legato al dito — disattivato su mobile (causa “scatti”). */
export function allowScrollScrub(): boolean {
  if (typeof window === 'undefined') return false;
  return !isMobileViewport() && !prefersReducedMotion();
}
