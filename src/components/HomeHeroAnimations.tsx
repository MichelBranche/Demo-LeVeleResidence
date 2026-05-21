import { useLandingAnimations } from '../hooks/useLandingAnimations';
import { useNetworkTier } from '../hooks/useNetworkTier';

/** Chunk separato: animazioni hero (SplitType/GSAP) dopo intro. */
export default function HomeHeroAnimations() {
  const tier = useNetworkTier();
  useLandingAnimations(tier === 'fast');
  return null;
}
