import gsap from 'gsap';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useRouteTransitionNavigate } from '../context/RouteTransitionContext';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useSiteLocale } from '../hooks/useSiteLocale';
import { prefersReducedMotion } from '../lib/motion';
import { shouldAnimateRouteChange } from '../lib/routeTransition';
import { scheduleHashScroll, subscribeScroll } from '../lib/scroll';
import { useHomeHeaderEntrance } from '../hooks/useHomeHeaderEntrance';
import { LanguageToggle } from './LanguageToggle';

type HeaderProps = {
  /** Ingresso dall'alto sulla home dopo i testi hero (solo prima visita con preloader). */
  animateEntrance?: boolean;
};

function getMobileMenuParts(nav: HTMLElement) {
  const top = nav.querySelector<HTMLElement>('.site-header__mobile-nav__top');
  const items = nav.querySelectorAll<HTMLElement>('.site-header__links--mobile li');
  const foot = nav.querySelector<HTMLElement>('.site-header__mobile-nav__foot');
  return { top, items, foot };
}

function mobileMenuTargets(nav: HTMLElement, backdrop: HTMLElement) {
  const { top, items, foot } = getMobileMenuParts(nav);
  return [nav, backdrop, top, foot, ...items].filter(Boolean) as gsap.TweenTarget[];
}

const MOBILE_NAV_MQ = '(max-width: 1023px)';

function parseNavTarget(to: string): { pathname: string; hash: string } {
  const hashIndex = to.indexOf('#');
  if (hashIndex === -1) return { pathname: to, hash: '' };
  return {
    pathname: to.slice(0, hashIndex) || '/',
    hash: to.slice(hashIndex),
  };
}

/** Evita che tutti i link `/#sezione` risultino attivi sulla home (default di NavLink). */
function isNavLinkActive(
  to: string,
  { pathname, hash }: { pathname: string; hash: string },
): boolean {
  const hashIndex = to.indexOf('#');
  if (hashIndex !== -1) {
    const targetHash = to.slice(hashIndex);
    return pathname === '/' && hash === targetHash;
  }

  const path = to.split('#')[0] || to;
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function Header({ animateEntrance = false }: HeaderProps) {
  const { content } = useSiteLocale();
  const { navLinks, headerUi: ui, config: site, logo } = content;
  const location = useLocation();
  const navigate = useNavigate();
  const navigateWithTransition = useRouteTransitionNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const isHome = location.pathname === '/' || location.pathname === '';

  useHomeHeaderEntrance(headerRef, { active: isHome, animateEntrance });
  const closingRef = useRef(false);
  const showMobileMenuRef = useRef(false);
  const hashScrollCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    showMobileMenuRef.current = showMobileMenu;
  }, [showMobileMenu]);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_NAV_MQ);
    const update = () => setIsMobileNav(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const requestCloseMenu = useCallback(() => {
    if (!showMobileMenuRef.current || closingRef.current) return;

    const nav = navRef.current;
    const backdrop = backdropRef.current;

    const finishClose = () => {
      closingRef.current = false;
      setMenuOpen(false);
      setShowMobileMenu(false);
    };

    if (!nav || !backdrop || prefersReducedMotion()) {
      finishClose();
      return;
    }

    closingRef.current = true;
    setMenuOpen(false);

    const { top, items, foot } = getMobileMenuParts(nav);
    const targets = mobileMenuTargets(nav, backdrop);
    const offY = -nav.offsetHeight;

    gsap.killTweensOf(targets);

    const tl = gsap.timeline({ onComplete: finishClose });

    if (foot) {
      tl.to(foot, { opacity: 0, y: 12, duration: 0.22, ease: 'power2.in' }, 0);
    }
    if (items.length) {
      tl.to(
        items,
        {
          opacity: 0,
          y: -16,
          duration: 0.28,
          stagger: { each: 0.04, from: 'end' },
          ease: 'power2.in',
        },
        0.04,
      );
    }
    if (top) {
      tl.to(top, { opacity: 0, y: -12, duration: 0.22, ease: 'power2.in' }, 0.06);
    }
    tl.to(nav, { y: offY, duration: 0.58, ease: 'power3.in' }, 0.08).to(
      backdrop,
      { opacity: 0, duration: 0.36, ease: 'power2.in' },
      0.14,
    );
  }, []);

  const requestOpenMenu = useCallback(() => {
    if (!isMobileNav) return;
    closingRef.current = false;
    setShowMobileMenu(true);
    setMenuOpen(true);
  }, [isMobileNav]);

  useEffect(() => {
    document.body.classList.toggle('site-nav-open', showMobileMenu && isMobileNav);
    return () => document.body.classList.remove('site-nav-open');
  }, [showMobileMenu, isMobileNav]);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;

    if (showMobileMenu && isMobileNav) {
      main.setAttribute('inert', '');
    } else {
      main.removeAttribute('inert');
    }

    return () => main.removeAttribute('inert');
  }, [showMobileMenu, isMobileNav]);

  useFocusTrap(navRef, showMobileMenu && isMobileNav, requestCloseMenu);

  useEffect(() => () => hashScrollCleanupRef.current?.(), []);

  useEffect(() => {
    const close = () => {
      if (showMobileMenuRef.current) requestCloseMenu();
      else setMenuOpen(false);
    };
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, [requestCloseMenu]);

  useEffect(() => {
    requestCloseMenu();
  }, [location.pathname, location.hash, requestCloseMenu]);

  useLayoutEffect(() => {
    if (!showMobileMenu || !menuOpen) return;

    let cancelled = false;

    const playOpen = () => {
      if (cancelled || closingRef.current) return;

      const nav = navRef.current;
      const backdrop = backdropRef.current;
      if (!nav || !backdrop) return;

      const { top, items, foot } = getMobileMenuParts(nav);
      const targets = mobileMenuTargets(nav, backdrop);
      const offY = -nav.offsetHeight;

      gsap.killTweensOf(targets);

      if (prefersReducedMotion()) {
        gsap.set(nav, { y: 0, clearProps: 'transform' });
        gsap.set(backdrop, { opacity: 1 });
        gsap.set([top, foot, ...items].filter(Boolean), { opacity: 1, clearProps: 'transform' });
        return;
      }

      gsap.set(nav, { y: offY });
      gsap.set(backdrop, { opacity: 0 });
      if (top) gsap.set(top, { opacity: 0, y: -14 });
      gsap.set(items, { opacity: 0, y: 20 });
      if (foot) gsap.set(foot, { opacity: 0, y: 18 });

      gsap
        .timeline()
        .to(backdrop, { opacity: 1, duration: 0.45, ease: 'power2.out' })
        .to(nav, { y: 0, duration: 0.72, ease: 'power3.out' }, 0.04)
        .to(top, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.2)
        .to(items, { opacity: 1, y: 0, duration: 0.46, stagger: 0.065, ease: 'power2.out' }, 0.28)
        .to(foot, { opacity: 1, y: 0, duration: 0.46, ease: 'power2.out' }, 0.36);
    };

    playOpen();
    const frame = requestAnimationFrame(playOpen);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [showMobileMenu, menuOpen]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 56);
    update();
    return subscribeScroll(update);
  }, []);

  const navigateTo = useCallback(
    (to: string) => {
      const { pathname, hash } = parseNavTarget(to);

      if (!hash) {
        navigateWithTransition(pathname);
        if (showMobileMenu) requestCloseMenu();
        else setMenuOpen(false);
        return;
      }

      const path = `${pathname}${hash}`;
      const samePlace = location.pathname === pathname && location.hash === hash;
      const samePathDifferentHash = location.pathname === pathname && location.hash !== hash;

      if (!samePlace) {
        if (samePathDifferentHash) {
          navigate(path);
          hashScrollCleanupRef.current?.();
          hashScrollCleanupRef.current = scheduleHashScroll(hash);
        } else if (shouldAnimateRouteChange(location.pathname, pathname)) {
          navigateWithTransition(path);
        } else {
          navigate(path);
        }
      }

      if (showMobileMenu) requestCloseMenu();
      else setMenuOpen(false);
    },
    [location.hash, location.pathname, navigate, navigateWithTransition, requestCloseMenu, showMobileMenu],
  );

  const headerClass = [
    'site-header',
    scrolled ? 'site-header--scrolled' : '',
    showMobileMenu ? 'site-header--menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const renderNavLinks = (variant: 'desktop' | 'mobile') => (
    <ul
      id={variant === 'mobile' ? undefined : 'site-primary-nav'}
      className={
        variant === 'mobile'
          ? 'site-header__links site-header__links--mobile'
          : 'site-header__links'
      }
    >
      {navLinks.map((link, index) => {
        const active = isNavLinkActive(link.to, location);
        const linkContent = (
          <>
            <span className="site-header__link-index">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="site-header__link-text">{link.label}</span>
          </>
        );

        if (variant === 'mobile') {
          return (
            <li key={link.to}>
              <a
                href={link.to}
                className={active ? 'is-active' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo(link.to);
                }}
              >
                {linkContent}
              </a>
            </li>
          );
        }

        return (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={() => (active ? 'is-active' : undefined)}
              onClick={(event) => {
                if (!link.to.includes('#')) return;
                event.preventDefault();
                navigateTo(link.to);
              }}
            >
              {linkContent}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );

  const mobileMenuPortal =
    isMobileNav &&
    showMobileMenu &&
    typeof document !== 'undefined' &&
    createPortal(
      <div ref={layerRef} className="site-header__mobile-layer" role="presentation">
        <button
          ref={backdropRef}
          type="button"
          className="site-header__backdrop"
          aria-label={ui.closeMenuBackdrop}
          onClick={requestCloseMenu}
        />
        <nav
          id="site-mobile-nav"
          ref={navRef}
          className="site-header__mobile-nav"
          aria-label={content.header.navAria}
          aria-hidden={!showMobileMenu}
        >
          <div className="site-header__mobile-nav__top">
            <p className="site-header__mobile-nav__eyebrow">{ui.mobileMenuEyebrow}</p>
            <button
              type="button"
              className="site-header__mobile-close"
              onClick={requestCloseMenu}
              aria-label={ui.closeMenuBackdrop}
            >
              <span className="site-header__mobile-close-icon" aria-hidden />
            </button>
          </div>

          <div className="site-header__mobile-nav__body">{renderNavLinks('mobile')}</div>

          <div className="site-header__mobile-nav__foot">
            <Link
              to="/prenota"
              className="site-header__mobile-book"
              onClick={requestCloseMenu}
            >
              <span className="site-header__mobile-book-kicker">{ui.book}</span>
              <span className="site-header__mobile-book-arrow" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </nav>
      </div>,
      document.body,
    );

  return (
    <header className={headerClass} ref={headerRef}>
      {mobileMenuPortal}

      <div className="site-header__bar">
        <nav className="site-header__nav" aria-label={content.header.mainNavAria}>
          <button
            type="button"
            className="site-header__menu"
            aria-expanded={showMobileMenu}
            aria-controls={isMobileNav ? 'site-mobile-nav' : 'site-primary-nav'}
            aria-label={showMobileMenu ? ui.menuOpen : ui.menuClosed}
            onClick={() => (showMobileMenu ? requestCloseMenu() : requestOpenMenu())}
          >
            <span className="site-header__menu-icon" aria-hidden>
              <span />
              <span />
            </span>
            <span className="site-header__menu-label">
              {showMobileMenu ? ui.menuLabelOpen : ui.menuLabelClosed}
            </span>
          </button>

          {!isMobileNav && renderNavLinks('desktop')}
        </nav>

        <Link
          to="/"
          className="site-header__logo"
          onClick={() => (showMobileMenu ? requestCloseMenu() : setMenuOpen(false))}
        >
          <img
            src={logo.header}
            alt={`${site.name} — ${site.tagline}`}
            width={180}
            height={80}
            decoding="async"
            fetchPriority="low"
          />
        </Link>

        <div className="site-header__aside">
          <LanguageToggle variant="header" />
          <Link className="site-header__cta" to="/prenota" aria-label={ui.bookAria}>
            <span className="site-header__cta-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4.5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M9.25 14.25 11 16l3.75-3.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="site-header__cta-text">{ui.book}</span>
            <span className="site-header__cta-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
