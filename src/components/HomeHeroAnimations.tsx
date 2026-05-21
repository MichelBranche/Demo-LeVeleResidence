import { useLandingAnimations } from '../hooks/useLandingAnimations';

/** Chunk separato: animazioni hero (SplitType/GSAP) dopo intro. */
export default function HomeHeroAnimations() {
  useLandingAnimations(true);
  return null;
}
