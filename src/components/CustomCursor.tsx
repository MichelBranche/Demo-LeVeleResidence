import { useEffect, useRef } from 'react';

const INTERACTIVE =
  'a, button, [role="button"], input:not([type="hidden"]), textarea, select, summary, label[for], .site-header__cta, .site-header__menu, .site-header__backdrop, [data-cursor-hover]';

const LERP_DOT = 0.28;
const LERP_RING = 0.14;

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const hover = useRef(false);
  const pressed = useRef(false);
  const rafId = useRef(0);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const enable = () => {
      if (!finePointer.matches || reducedMotion.matches) return undefined;

      document.documentElement.classList.add('custom-cursor-active');

      const setVisible = (on: boolean) => {
        visible.current = on;
        rootRef.current?.classList.toggle('is-visible', on);
      };

      const setHover = (on: boolean) => {
        if (hover.current === on) return;
        hover.current = on;
        rootRef.current?.classList.toggle('is-hover', on);
      };

      const setPressed = (on: boolean) => {
        if (pressed.current === on) return;
        pressed.current = on;
        rootRef.current?.classList.toggle('is-pressed', on);
      };

      const onMove = (e: MouseEvent) => {
        target.current.x = e.clientX;
        target.current.y = e.clientY;
        if (!visible.current) setVisible(true);

        const el = document.elementFromPoint(e.clientX, e.clientY);
        const interactive = el?.closest(INTERACTIVE) ?? null;
        const isTextField =
          interactive instanceof HTMLInputElement ||
          interactive instanceof HTMLTextAreaElement ||
          (interactive instanceof HTMLElement && interactive.isContentEditable);

        setHover(!!interactive && !isTextField);
      };

      const onLeave = () => setVisible(false);

      const onDown = () => setPressed(true);
      const onUp = () => setPressed(false);

      const tick = () => {
        dot.current.x += (target.current.x - dot.current.x) * LERP_DOT;
        dot.current.y += (target.current.y - dot.current.y) * LERP_DOT;
        ring.current.x += (target.current.x - ring.current.x) * LERP_RING;
        ring.current.y += (target.current.y - ring.current.y) * LERP_RING;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
        }

        rafId.current = requestAnimationFrame(tick);
      };

      rafId.current = requestAnimationFrame(tick);

      window.addEventListener('mousemove', onMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
      window.addEventListener('mousedown', onDown);
      window.addEventListener('mouseup', onUp);

      return () => {
        cancelAnimationFrame(rafId.current);
        window.removeEventListener('mousemove', onMove);
        document.documentElement.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('mousedown', onDown);
        window.removeEventListener('mouseup', onUp);
        document.documentElement.classList.remove('custom-cursor-active');
      };
    };

    let cleanup = enable();

    const onFineChange = () => {
      cleanup?.();
      cleanup = enable();
    };

    finePointer.addEventListener('change', onFineChange);
    reducedMotion.addEventListener('change', onFineChange);

    return () => {
      finePointer.removeEventListener('change', onFineChange);
      reducedMotion.removeEventListener('change', onFineChange);
      cleanup?.();
    };
  }, []);

  return (
    <div ref={rootRef} className="custom-cursor" aria-hidden>
      <div ref={ringRef} className="custom-cursor__ring" />
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}
