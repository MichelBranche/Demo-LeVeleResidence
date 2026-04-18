import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { getMenuItemHref, MENU_NAV_ITEMS } from '../data/menuNav';
import { usePageTransition } from '../../../components/PageTransition';

export function MenuOverlay({ isOpen, onClose, activeMenuKey, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { transitionTo } = usePageTransition();
  const [hoverPreviewId, setHoverPreviewId] = useState(null);

  const overlayRef = useRef(null);
  const itemsRootRef = useRef(null);
  const infosRef = useRef(null);
  const timelineRef = useRef(null);

  const hovered = MENU_NAV_ITEMS.find((i) => i.id === hoverPreviewId);
  const showPreview = Boolean(hovered);

  useEffect(() => {
    if (!isOpen) {
      setHoverPreviewId(null);
      return;
    }
    setHoverPreviewId(MENU_NAV_ITEMS[0]?.id ?? null);
  }, [isOpen]);

  /* Animazione (clip-path + stagger) gestita qui così funziona su ogni route. */
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const itemsRoot = itemsRootRef.current;
    const infos = infosRef.current;
    if (!overlay || !itemsRoot || !infos) return undefined;

    const items = itemsRoot.querySelectorAll('li');

    const tl = gsap
      .timeline({ paused: true })
      .to(overlay, {
        clipPath: 'circle(200vmax at 100% 0%)',
        duration: 0.8,
        ease: 'power4.inOut',
      })
      .from(
        items,
        {
          y: 36,
          opacity: 0,
          duration: 0.45,
          stagger: { each: 0.08, from: 'start' },
          ease: 'power3.out',
        },
        '-=0.38',
      )
      .to(infos, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.22');

    timelineRef.current = tl;

    return () => {
      tl.kill();
      timelineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (isOpen) tl.play();
    else tl.reverse();
  }, [isOpen]);

  const handleItemClick = (item, event) => {
    event.preventDefault();
    onClose?.();

    if (item.path) {
      /* Cambio pagina: usa la transizione a velo (circle-wipe). */
      if (item.path !== location.pathname) transitionTo(item.path);
      return;
    }

    if (item.sectionId) {
      if (location.pathname !== '/') {
        /* Torno in home da un'altra pagina: usa la transizione + scroll alla
           sezione dopo l'ingresso della nuova route. */
        transitionTo(`/#${item.sectionId}`);
      } else {
        onNavigate?.(item.sectionId);
      }
    }
  };

  return (
    <div
      ref={overlayRef}
      className={`menu-overlay ${isOpen ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <button type="button" className="menu-close" onClick={onClose} aria-label="Chiudi menu">
        ×
      </button>
      <img src="/logo_le_vele_stintino_white.svg" alt="Le Vele Stintino" className="menu-logo" />
      <div className="menu-grid">
        <div className="menu-with-preview">
          <ul ref={itemsRootRef} className="menu-links">
            {MENU_NAV_ITEMS.map((item) => (
              <li key={item.id} className={activeMenuKey === item.id ? 'is-active' : ''}>
                <a
                  href={getMenuItemHref(item)}
                  className="menu-link"
                  data-menu={item.id}
                  onMouseEnter={() => setHoverPreviewId(item.id)}
                  onFocus={() => setHoverPreviewId(item.id)}
                  onClick={(event) => handleItemClick(item, event)}
                >
                  <span className="menu-link-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <aside className="menu-preview" aria-live="polite">
            <div className="menu-preview-inner">
              {showPreview && hovered ? (
                <>
                  <img
                    key={hoverPreviewId}
                    className="menu-preview-img"
                    src={hovered.previewSrc}
                    alt={hovered.previewCaption}
                    decoding="async"
                  />
                  <p className="menu-preview-caption">{hovered.previewCaption}</p>
                </>
              ) : (
                <div className="menu-preview-placeholder">
                  <span>Passa sulle voci</span>
                </div>
              )}
            </div>
          </aside>
        </div>

        <div ref={infosRef} className="menu-infos">
          <span>Reception</span>
          <p>
            +39 079 523495
            <br />
            info@rtalevele.com
          </p>
        </div>
      </div>
    </div>
  );
}
