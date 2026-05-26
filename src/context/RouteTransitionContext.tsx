import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { normalizePathname } from '../data/routes';
import { prefersReducedMotion } from '../lib/motion';
import { getLenisInstance } from '../lib/scroll';
import {
  resolveInternalPath,
  shouldAnimateRouteChange,
} from '../lib/routeTransition';

export type RouteTransitionStage = 'idle' | 'covering' | 'loading' | 'revealing';

type RouteTransitionContextValue = {
  stage: RouteTransitionStage;
  navigateWithTransition: (to: string) => void;
  notifyCoverComplete: () => void;
  notifyRevealComplete: () => void;
};

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(null);

const MIN_LOAD_MS = 520;

function lockScrollPosition() {
  const scrollY = window.scrollY;
  document.body.dataset.routeTransitionScrollY = String(scrollY);
  getLenisInstance()?.stop();
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
}

/** Sblocca il body e porta subito in cima (nuova route), senza ripristinare lo scroll precedente. */
function releaseScrollToTop() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  delete document.body.dataset.routeTransitionScrollY;

  window.scrollTo(0, 0);

  const lenis = getLenisInstance();
  lenis?.start();
  lenis?.scrollTo(0, { immediate: true });
}

function showInstantCover() {
  document.documentElement.classList.add('route-transition-snapshot');
}

function hideInstantCover() {
  document.documentElement.classList.remove('route-transition-snapshot');
}

export function RouteTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState<RouteTransitionStage>('idle');
  const pendingToRef = useRef<string | null>(null);
  const loadStartedAtRef = useRef(0);

  const reset = useCallback(() => {
    pendingToRef.current = null;
    setStage('idle');
    document.body.classList.remove('route-transition-active');
    hideInstantCover();
    if (document.body.style.position === 'fixed') {
      releaseScrollToTop();
    }
  }, []);

  const notifyRevealComplete = useCallback(() => {
    reset();
  }, [reset]);

  const notifyCoverComplete = useCallback(() => {
    const target = pendingToRef.current;
    if (!target) return;

    loadStartedAtRef.current = performance.now();
    setStage('loading');
    navigate(target);
  }, [navigate]);

  const navigateWithTransition = useCallback(
    (to: string) => {
      const target = resolveInternalPath(to) ?? to;
      const targetPath = target.split('#')[0] || target;

      if (prefersReducedMotion() || !shouldAnimateRouteChange(location.pathname, targetPath)) {
        navigate(target);
        return;
      }

      pendingToRef.current = target;
      showInstantCover();
      lockScrollPosition();
      document.body.classList.add('route-transition-active');
      flushSync(() => setStage('covering'));
    },
    [location.pathname, navigate],
  );

  useEffect(() => {
    if (stage !== 'loading' || !pendingToRef.current) return;

    const pending = pendingToRef.current;
    const pendingPath = pending.split('#')[0] || pending;
    const currentPath = normalizePathname(location.pathname);

    if (currentPath !== normalizePathname(pendingPath)) return;

    const elapsed = performance.now() - loadStartedAtRef.current;
    const wait = Math.max(0, MIN_LOAD_MS - elapsed);

    const timer = window.setTimeout(() => {
      releaseScrollToTop();
      setStage('revealing');
    }, wait);

    return () => window.clearTimeout(timer);
  }, [stage, location.pathname, location.key]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (stage !== 'idle') return;

      const anchor = (event.target as Element | null)?.closest('a[href]');
      if (!anchor || anchor.getAttribute('target') === '_blank') return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const target = resolveInternalPath(href);
      if (!target) return;

      const targetPath = target.split('#')[0] || target;
      if (!shouldAnimateRouteChange(location.pathname, targetPath)) return;

      event.preventDefault();
      event.stopPropagation();
      navigateWithTransition(target);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [location.pathname, navigateWithTransition, stage]);

  const value: RouteTransitionContextValue = {
    stage,
    navigateWithTransition,
    notifyCoverComplete,
    notifyRevealComplete,
  };

  return (
    <RouteTransitionContext.Provider value={value}>{children}</RouteTransitionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRouteTransition(): RouteTransitionContextValue {
  const ctx = useContext(RouteTransitionContext);
  if (!ctx) {
    throw new Error('useRouteTransition must be used within RouteTransitionProvider');
  }
  return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRouteTransitionNavigate() {
  return useRouteTransition().navigateWithTransition;
}
