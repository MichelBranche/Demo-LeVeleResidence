import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties } from 'react';
import { headerUiCopy } from '../data/navCopy';
import { useSiteLocale } from '../hooks/useSiteLocale';
import { prefersReducedMotion } from '../lib/motion';
import { subscribeScroll } from '../lib/scroll';
import { LOCALE_LABELS, SITE_LOCALES } from '../lib/siteLocales';
import { FlagIcon } from './FlagIcon';

gsap.registerPlugin(useGSAP);

const MENU_GAP = 10;
const VIEWPORT_PAD = 10;

type PopoverPlacement = 'below' | 'above';

type PopoverLayout = {
  style: CSSProperties;
  tailX: number;
  placement: PopoverPlacement;
};

function measurePopoverPosition(
  btn: HTMLElement,
  popover: HTMLElement,
  placement: PopoverPlacement,
): PopoverLayout {
  const rect = btn.getBoundingClientRect();
  const width = popover.offsetWidth;
  const height = popover.offsetHeight;

  let left = rect.left + rect.width / 2 - width / 2;
  left = Math.max(VIEWPORT_PAD, Math.min(left, window.innerWidth - width - VIEWPORT_PAD));

  const tailX = rect.left + rect.width / 2 - left;

  if (placement === 'above') {
    const top = Math.max(VIEWPORT_PAD, rect.top - MENU_GAP - height);
    return {
      placement,
      tailX,
      style: {
        position: 'fixed',
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
        right: 'auto',
        bottom: 'auto',
        transform: 'none',
        ['--lang-tail-x' as string]: `${Math.round(tailX)}px`,
      },
    };
  }

  const top = rect.bottom + MENU_GAP;

  return {
    placement,
    tailX,
    style: {
      position: 'fixed',
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
      right: 'auto',
      bottom: 'auto',
      transform: 'none',
      ['--lang-tail-x' as string]: `${Math.round(tailX)}px`,
    },
  };
}

export type LanguageToggleVariant = 'header' | 'fab';

type LanguageToggleProps = {
  variant?: LanguageToggleVariant;
};

export function LanguageToggle({ variant = 'header' }: LanguageToggleProps) {
  const { locale, setLocale } = useSiteLocale();
  const ui = headerUiCopy[locale];
  const placement: PopoverPlacement = variant === 'fab' ? 'above' : 'below';
  const transformOrigin = placement === 'above' ? 'bottom center' : 'top center';
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState<PopoverLayout | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const closingRef = useRef(false);

  const wrapClass =
    variant === 'fab'
      ? 'lang-fab'
      : 'site-header__lang-wrap site-header__lang-wrap--in-header';

  const updatePosition = useCallback(() => {
    const btn = btnRef.current;
    const popover = popoverRef.current;
    if (!btn || !popover) return;
    setLayout(measurePopoverPosition(btn, popover, placement));
  }, [placement]);

  const closeMenu = useCallback(() => {
    if (!open || closingRef.current) return;

    const popover = popoverRef.current;
    if (!popover || prefersReducedMotion()) {
      setOpen(false);
      setLayout(null);
      return;
    }

    closingRef.current = true;
    const options = popover.querySelectorAll<HTMLElement>('.site-header__lang-option');
    const closeY = placement === 'above' ? 8 : -8;

    gsap.killTweensOf([popover, options]);
    gsap.to(options, {
      opacity: 0,
      x: -6,
      duration: 0.16,
      stagger: { each: 0.025, from: 'end' },
      ease: 'power2.in',
    });
    gsap.to(popover, {
      opacity: 0,
      y: closeY,
      scale: 0.94,
      duration: 0.26,
      ease: 'power2.in',
      transformOrigin,
      onComplete: () => {
        closingRef.current = false;
        setOpen(false);
        setLayout(null);
      },
    });
  }, [open, placement, transformOrigin]);

  const toggleMenu = () => {
    if (open) {
      closeMenu();
      return;
    }
    closingRef.current = false;
    setOpen(true);
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const frame = requestAnimationFrame(() => updatePosition());
    return () => cancelAnimationFrame(frame);
  }, [open, locale, placement, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const onLayout = () => updatePosition();
    window.addEventListener('resize', onLayout);
    const unsubscribeScroll = subscribeScroll(onLayout);

    return () => {
      window.removeEventListener('resize', onLayout);
      unsubscribeScroll();
    };
  }, [open, updatePosition]);

  useGSAP(
    () => {
      if (!open || !popoverRef.current) return;

      const popover = popoverRef.current;
      const options = popover.querySelectorAll<HTMLElement>('.site-header__lang-option');
      const enterY = placement === 'above' ? 10 : -10;

      gsap.killTweensOf([popover, options]);

      if (prefersReducedMotion()) {
        gsap.set(popover, { clearProps: 'opacity,transform' });
        gsap.set(options, { clearProps: 'opacity,transform' });
        return;
      }

      gsap.fromTo(
        popover,
        { opacity: 0, y: enterY, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
          transformOrigin,
        },
      );
      gsap.from(options, {
        opacity: 0,
        x: -10,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out',
        delay: 0.08,
        clearProps: 'opacity,transform',
      });
    },
    { dependencies: [open, placement], scope: popoverRef },
  );

  const handleListKeyDown = (event: ReactKeyboardEvent<HTMLUListElement>) => {
    const options = Array.from(
      popoverRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? [],
    );
    if (options.length === 0) return;

    const current = options.findIndex((el) => el === document.activeElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = current < 0 ? 0 : (current + 1) % options.length;
      options[next]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const next = current < 0 ? options.length - 1 : (current - 1 + options.length) % options.length;
      options[next]?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      options[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      options[options.length - 1]?.focus();
    }
  };

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (wrapRef.current?.contains(target)) return;
      if (popoverRef.current?.contains(target)) return;
      closeMenu();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, closeMenu]);

  const popoverPlacementClass =
    layout?.placement === 'above' ? ' site-header__lang-popover--above' : '';

  const popover =
    open && typeof document !== 'undefined' ? (
      <div
        ref={popoverRef}
        className={`site-header__lang-popover${popoverPlacementClass}`}
        style={{
          ...layout?.style,
          visibility: layout ? 'visible' : 'hidden',
          pointerEvents: layout ? 'auto' : 'none',
        }}
      >
        <span
          className="site-header__lang-popover-tail"
          aria-hidden
          style={{ left: layout ? `${layout.tailX}px` : '50%' }}
        />
        <ul
          id={listId}
          className="site-header__lang-menu"
          role="listbox"
          aria-label={ui.langChoose}
          onKeyDown={handleListKeyDown}
        >
          {SITE_LOCALES.map((code) => {
            const selected = code === locale;
            return (
              <li key={code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`site-header__lang-option${selected ? ' is-selected' : ''}`}
                  onClick={() => {
                    setLocale(code);
                    closeMenu();
                  }}
                >
                  <FlagIcon locale={code} className="site-header__lang-flag" />
                  <span className="site-header__lang-option-label">{LOCALE_LABELS[code]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    ) : null;

  return (
    <div className={wrapClass} ref={wrapRef}>
      <button
        ref={btnRef}
        type="button"
        className={`site-header__lang${open ? ' is-open' : ''}`}
        onClick={toggleMenu}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={`${ui.langMenu}: ${LOCALE_LABELS[locale]}. ${ui.langChoose}.`}
        title={LOCALE_LABELS[locale]}
      >
        <FlagIcon locale={locale} className="site-header__lang-flag" />
      </button>

      {popover ? createPortal(popover, document.body) : null}
    </div>
  );
}
