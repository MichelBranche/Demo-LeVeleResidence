import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Moon, Sun } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { isMobileViewport, prefersReducedMotion } from '../../lib/motion';

gsap.registerPlugin(useGSAP);

type SuiteCardMediaProps = {
  href: string;
  discoverAria: string;
  kicker: string;
  title: string;
  cardImage: string;
  cardImagePosition: string;
  cardImageNight: string;
  cardImageNightPosition: string;
  dayToggleAria: string;
  nightToggleAria: string;
};

function getRevealOrigin(inner: HTMLElement, toggle: HTMLElement) {
  const innerRect = inner.getBoundingClientRect();
  const toggleRect = toggle.getBoundingClientRect();
  const x = ((toggleRect.left + toggleRect.width / 2 - innerRect.left) / innerRect.width) * 100;
  const y = ((toggleRect.top + toggleRect.height / 2 - innerRect.top) / innerRect.height) * 100;
  return { x: `${x}%`, y: `${y}%` };
}

export function SuiteCardMedia({
  href,
  discoverAria,
  kicker,
  title,
  cardImage,
  cardImagePosition,
  cardImageNight,
  cardImageNightPosition,
  dayToggleAria,
  nightToggleAria,
}: SuiteCardMediaProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLImageElement>(null);
  const nightRef = useRef<HTMLImageElement>(null);
  const ambientRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const sunRef = useRef<SVGSVGElement>(null);
  const moonRef = useRef<SVGSVGElement>(null);

  const [isNight, setIsNight] = useState(false);
  const [mobilePhotoLink, setMobilePhotoLink] = useState(() =>
    typeof window !== 'undefined' ? isMobileViewport() : false,
  );
  const isAnimatingRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const applyStaticState = useCallback((night: boolean) => {
    const inner = innerRef.current;
    const toggle = toggleRef.current;
    const day = dayRef.current;
    const nightImg = nightRef.current;
    const thumb = thumbRef.current;
    const ambient = ambientRef.current;
    if (!inner || !toggle || !day || !nightImg || !thumb) return;

    const { x, y } = getRevealOrigin(inner, toggle);
    const origin = `${x} ${y}`;

    gsap.set(day, {
      scale: night ? 0.97 : 1,
      filter: night ? 'brightness(0.9) saturate(0.88)' : 'brightness(1) saturate(1)',
    });
    gsap.set(nightImg, {
      clipPath: night ? `circle(150% at ${origin})` : `circle(0% at ${origin})`,
      scale: 1,
    });
    gsap.set(thumb, { xPercent: night ? 100 : 0 });
    gsap.set(ambient, { opacity: 0 });
  }, []);

  useGSAP(
    () => {
      applyStaticState(false);
      return () => {
        timelineRef.current?.kill();
      };
    },
    { scope: wrapRef },
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setMobilePhotoLink(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const mediaContent = (
    <>
      <div className="suites__media-inner" ref={innerRef}>
        <div className="suites__media-stack">
          <img
            ref={dayRef}
            src={cardImage}
            alt={title}
            className="suites__media-photo suites__media-photo--day"
            loading="lazy"
            decoding="async"
            style={{ objectPosition: cardImagePosition }}
          />
          <img
            ref={nightRef}
            src={cardImageNight}
            alt=""
            aria-hidden
            className="suites__media-photo suites__media-photo--night"
            loading="lazy"
            decoding="async"
            style={{ objectPosition: cardImageNightPosition }}
          />
          <span className="suites__media-ambient" ref={ambientRef} aria-hidden />
        </div>
      </div>
      <span className="suites__media-tag">{kicker}</span>
    </>
  );

  const runTransition = useCallback(
    (toNight: boolean) => {
      const inner = innerRef.current;
      const toggle = toggleRef.current;
      const day = dayRef.current;
      const nightImg = nightRef.current;
      const ambient = ambientRef.current;
      const thumb = thumbRef.current;
      const sun = sunRef.current;
      const moon = moonRef.current;
      if (!inner || !toggle || !day || !nightImg || !thumb || !ambient) return;

      const { x, y } = getRevealOrigin(inner, toggle);
      const origin = `${x} ${y}`;

      timelineRef.current?.kill();

      const duration = 1.15;
      const ease = 'power4.inOut';

      const tl = gsap.timeline({
        defaults: { ease },
        onStart: () => {
          isAnimatingRef.current = true;
          ambient.classList.toggle('suites__media-ambient--to-night', toNight);
          ambient.classList.toggle('suites__media-ambient--to-day', !toNight);
        },
        onComplete: () => {
          isAnimatingRef.current = false;
          setIsNight(toNight);
          gsap.set(ambient, { opacity: 0 });
        },
      });

      timelineRef.current = tl;

      if (toNight) {
        tl.fromTo(
          nightImg,
          { clipPath: `circle(0% at ${origin})`, scale: 1.07 },
          { clipPath: `circle(150% at ${origin})`, scale: 1, duration },
          0,
        )
          .fromTo(
            day,
            { scale: 1, filter: 'brightness(1) saturate(1)' },
            { scale: 0.965, filter: 'brightness(0.86) saturate(0.82)', duration },
            0,
          )
          .fromTo(ambient, { opacity: 0 }, { opacity: 0.92, duration: 0.38, ease: 'power2.out' }, 0.04)
          .to(ambient, { opacity: 0, duration: 0.62, ease: 'power2.inOut' }, 0.42)
          .to(thumb, { xPercent: 100, duration: 0.9, ease: 'power3.inOut' }, 0)
          .to(sun, { opacity: 0.48, scale: 0.9, duration: 0.32, ease: 'power2.out' }, 0)
          .fromTo(
            moon,
            { opacity: 0.45, scale: 0.86, rotate: -18 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.62, ease: 'back.out(2.2)' },
            0.18,
          );
      } else {
        tl.to(
          nightImg,
          { clipPath: `circle(0% at ${origin})`, scale: 1.05, duration: duration * 0.96 },
          0,
        )
          .to(
            day,
            { scale: 1, filter: 'brightness(1) saturate(1)', duration: duration * 0.96 },
            0,
          )
          .fromTo(ambient, { opacity: 0 }, { opacity: 0.78, duration: 0.32, ease: 'power2.out' }, 0.04)
          .to(ambient, { opacity: 0, duration: 0.55, ease: 'power2.inOut' }, 0.38)
          .to(thumb, { xPercent: 0, duration: 0.9, ease: 'power3.inOut' }, 0)
          .to(moon, { opacity: 0.48, scale: 0.9, duration: 0.32, ease: 'power2.out' }, 0)
          .fromTo(
            sun,
            { opacity: 0.45, scale: 0.86, rotate: 18 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.62, ease: 'back.out(2.2)' },
            0.18,
          );
      }
    },
    [],
  );

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isAnimatingRef.current) return;

    const next = !isNight;
    if (prefersReducedMotion()) {
      setIsNight(next);
      applyStaticState(next);
      return;
    }

    runTransition(next);
  };

  return (
    <div className="suites__media-wrap" ref={wrapRef}>
      {mobilePhotoLink ? (
        <Link to={href} className="suites__media" aria-label={discoverAria}>
          {mediaContent}
        </Link>
      ) : (
        <div className="suites__media suites__media--static">{mediaContent}</div>
      )}

      <button
        ref={toggleRef}
        type="button"
        className={`suites__daynight${isNight ? ' suites__daynight--night' : ''}`}
        role="switch"
        aria-checked={isNight}
        aria-label={isNight ? dayToggleAria : nightToggleAria}
        onClick={handleToggle}
      >
        <span className="suites__daynight-track" aria-hidden>
          <Sun
            ref={sunRef}
            className="suites__daynight-icon suites__daynight-icon--sun"
            size={14}
            strokeWidth={2.25}
          />
          <Moon
            ref={moonRef}
            className="suites__daynight-icon suites__daynight-icon--moon"
            size={14}
            strokeWidth={2.25}
          />
          <span className="suites__daynight-thumb" ref={thumbRef} />
        </span>
      </button>
    </div>
  );
}
