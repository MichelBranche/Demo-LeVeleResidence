import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const PageTransitionContext = createContext(null);

/* Provider globale che monta un velo a tutto schermo e espone `transitionTo(path)`
   per navigare con la stessa animazione circolare del menu (clip-path da 100% 0%). */
export function PageTransitionProvider({ children }) {
  const veilRef = useRef(null);
  const navigate = useNavigate();
  const isAnimatingRef = useRef(false);

  const transitionTo = useCallback(
    (path) => {
      const veil = veilRef.current;
      if (!veil || isAnimatingRef.current) {
        navigate(path);
        return;
      }
      isAnimatingRef.current = true;

      gsap.set(veil, {
        clipPath: 'circle(0% at 100% 0%)',
        pointerEvents: 'auto',
      });

      gsap
        .timeline({
          onComplete: () => {
            navigate(path);
            /* Aspetta un frame che la nuova pagina sia montata, poi scopri. */
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                gsap.to(veil, {
                  clipPath: 'circle(0% at 0% 100%)',
                  duration: 0.9,
                  ease: 'power4.inOut',
                  onComplete: () => {
                    gsap.set(veil, { pointerEvents: 'none' });
                    isAnimatingRef.current = false;
                  },
                });
              });
            });
          },
        })
        .to(veil, {
          clipPath: 'circle(200vmax at 100% 0%)',
          duration: 0.8,
          ease: 'power4.inOut',
        });
    },
    [navigate],
  );

  useEffect(() => {
    const veil = veilRef.current;
    if (!veil) return;
    gsap.set(veil, { clipPath: 'circle(0% at 100% 0%)', pointerEvents: 'none' });
  }, []);

  return (
    <PageTransitionContext.Provider value={{ transitionTo }}>
      {children}
      <div
        ref={veilRef}
        className="page-transition-veil"
        aria-hidden="true"
      >
        <img
          src="/logo_le_vele_stintino_white.svg"
          alt=""
          className="page-transition-logo"
        />
      </div>
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    return { transitionTo: (path) => (window.location.href = path) };
  }
  return ctx;
}
