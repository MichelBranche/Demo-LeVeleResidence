import { useLandingAnimations } from '../hooks/useLandingAnimations';
import { useNetworkTier } from '../hooks/useNetworkTier';
import { shouldLoadSplitHeroAnimations } from '../lib/network';

type HomeHeroAnimationsProps = {
  orchestrated?: boolean;
};

/** Chunk separato: animazioni hero dopo intro. */
export default function HomeHeroAnimations({ orchestrated = false }: HomeHeroAnimationsProps) {
  const tier = useNetworkTier();
  const enabled = shouldLoadSplitHeroAnimations();
  useLandingAnimations(enabled, { light: tier === 'constrained', orchestrated });
  return null;
}
