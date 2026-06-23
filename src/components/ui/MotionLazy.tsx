import { LazyMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const loadMotionFeatures = () =>
  import('framer-motion').then((mod) => mod.domAnimation);

type MotionLazyProps = {
  children: ReactNode;
};

/** Carica le feature DOM di framer-motion solo quando serve (galleria, carousel, recensioni). */
export function MotionLazy({ children }: MotionLazyProps) {
  return <LazyMotion features={loadMotionFeatures}>{children}</LazyMotion>;
}
