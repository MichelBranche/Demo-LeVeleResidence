/** Viewport stretto — layout e motion dedicati al mobile. */
export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
}

/**
 * Menu hamburger fullscreen — telefoni e tablet touch.
 * Finestre desktop ridotte mantengono la navbar inline.
 */
export function shouldUseMobileNav(): boolean {
  if (typeof window === 'undefined') return false;
  if (isMobileViewport()) return true;

  const touchTablet =
    window.matchMedia('(max-width: 1023px)').matches &&
    window.matchMedia('(pointer: coarse)').matches;

  return touchTablet;
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
