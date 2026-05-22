import { isMobileViewport, prefersReducedMotion } from './motion';

/** Profilo rete per priorità risorse (video, animazioni pesanti). */
export type NetworkTier = 'fast' | 'constrained' | 'minimal';

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

function getConnection(): NetworkInformation | undefined {
  if (typeof navigator === 'undefined') return undefined;
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

function downlinkMbps(): number | undefined {
  const downlink = getConnection()?.downlink;
  return typeof downlink === 'number' && Number.isFinite(downlink) ? downlink : undefined;
}

export function getNetworkTier(): NetworkTier {
  if (typeof window === 'undefined') return 'fast';
  if (prefersReducedMotion()) return 'minimal';

  const conn = getConnection();
  if (conn?.saveData) return 'minimal';

  const effectiveType = conn?.effectiveType;
  const mbps = downlinkMbps();

  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 'minimal';
  }

  if (typeof mbps === 'number') {
    if (mbps < 1) return 'minimal';
    if (mbps < 4) return 'constrained';
    return 'fast';
  }

  if (effectiveType === '3g') {
    return typeof mbps === 'number' && mbps >= 2 ? 'constrained' : 'minimal';
  }

  if (effectiveType === '4g') {
    return 'fast';
  }

  /* API assente: non penalizzare il mobile — solo viewport stretta → motion leggera */
  if (isMobileViewport()) return 'constrained';

  return 'fast';
}

/** Preloader cinematico con video (~11 MB). */
export function shouldRunVideoPreloader(): boolean {
  return getNetworkTier() !== 'minimal';
}

/** Carica il video hero subito (non solo poster). */
export function shouldAutoplayHeroVideoImmediately(): boolean {
  return getNetworkTier() !== 'minimal';
}

export function shouldDeferHeroVideoLoad(): boolean {
  return false;
}

/** Solo poster: 2G / risparmio dati / downlink molto basso. */
export function shouldUsePosterOnlyHero(): boolean {
  return getNetworkTier() === 'minimal';
}

/** SplitType hero — attivo su fast e constrained (leggero su constrained). */
export function shouldLoadSplitHeroAnimations(): boolean {
  return getNetworkTier() !== 'minimal' && !prefersReducedMotion();
}

export function subscribeToNetworkChanges(onChange: () => void): () => void {
  const conn = getConnection();
  if (!conn?.addEventListener) return () => {};
  conn.addEventListener('change', onChange);
  return () => conn.removeEventListener?.('change', onChange);
}
