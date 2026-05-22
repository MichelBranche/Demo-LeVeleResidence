import { useLandingAnimations } from '../hooks/useLandingAnimations';
import { useNetworkTier } from '../hooks/useNetworkTier';
import { shouldLoadSplitHeroAnimations } from '../lib/network';

/** Chunk separato: animazioni hero (SplitType/GSAP) dopo intro. */
export default function HomeHeroAnimations() {
  const tier = useNetworkTier();
  const enabled = shouldLoadSplitHeroAnimations();
  useLandingAnimations(enabled, { light: tier === 'constrained' });
  return null;
}
