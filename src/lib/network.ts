import { isMobileViewport, prefersReducedMotion } from './motion';

/** Profilo rete per priorità risorse (video, animazioni pesanti). */
export type NetworkTier = 'fast' | 'constrained' | 'minimal';

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

function getConnection(): NetworkInformation | undefined {
  if (typeof navigator === 'undefined') return undefined;
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

export function getNetworkTier(): NetworkTier {
  if (typeof window === 'undefined') return 'fast';
  if (prefersReducedMotion()) return 'minimal';

  const conn = getConnection();
  if (conn?.saveData) return 'minimal';

  const effectiveType = conn?.effectiveType;
  if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
    return 'minimal';
  }

  if (isMobileViewport()) return 'constrained';

  return 'fast';
}

/** Hero ~11 MB, La Pelosa ~21 MB — video su desktop e 4G; solo poster su 3G / risparmio dati. */
export function shouldRunVideoPreloader(): boolean {
  return getNetworkTier() !== 'minimal';
}

/** Carica il video hero per preloader + autoplay (tier non minimal). */
export function shouldAutoplayHeroVideoImmediately(): boolean {
  return getNetworkTier() !== 'minimal';
}

/** Differire il video dopo il poster — non serve con hero compresso. */
export function shouldDeferHeroVideoLoad(): boolean {
  return false;
}

/** Su 3G / risparmio dati: solo poster, niente download video. */
export function shouldUsePosterOnlyHero(): boolean {
  return getNetworkTier() === 'minimal';
}

/** SplitType + animazioni hero copy — evita JS extra su mobile / rete lenta. */
export function shouldLoadSplitHeroAnimations(): boolean {
  return getNetworkTier() === 'fast' && !prefersReducedMotion();
}

export function subscribeToNetworkChanges(onChange: () => void): () => void {
  const conn = getConnection();
  if (!conn?.addEventListener) return () => {};
  conn.addEventListener('change', onChange);
  return () => conn.removeEventListener?.('change', onChange);
}
