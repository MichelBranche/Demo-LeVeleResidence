import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { isMobileViewport, prefersReducedMotion } from '../../lib/motion';
import '../../styles/suite-daynight-toggle.css';
import { DayNightThemeToggle } from './DayNightThemeToggle';

gsap.registerPlugin(useGSAP);

const REVEAL_ORIGIN = '50% 88%';

type SuiteCardMediaProps = {
  href: string;
  discoverAria: string;
  title: string;
  cardImage: string;
  cardImagePosition: string;
  cardImageNight: string;
  cardImageNightPosition: string;
  dayToggleAria: string;
  nightToggleAria: string;
};

export function SuiteCardMedia({
  href,
  discoverAria,
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

  const [isNight, setIsNight] = useState(false);
  const [mobilePhotoLink, setMobilePhotoLink] = useState(() =>
    typeof window !== 'undefined' ? isMobileViewport() : false,
  );
  const isAnimatingRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const applyStaticState = useCallback((night: boolean) => {
    const day = dayRef.current;
    const nightImg = nightRef.current;
    const ambient = ambientRef.current;
    if (!day || !nightImg) return;

    gsap.set(day, {
      scale: night ? 0.97 : 1,
      filter: night ? 'brightness(0.9) saturate(0.88)' : 'brightness(1) saturate(1)',
    });
    gsap.set(nightImg, {
      clipPath: night ? `circle(150% at ${REVEAL_ORIGIN})` : `circle(0% at ${REVEAL_ORIGIN})`,
      scale: 1,
    });
    if (ambient) gsap.set(ambient, { opacity: 0 });
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

  const runTransition = useCallback(
    (toNight: boolean) => {
      const day = dayRef.current;
      const nightImg = nightRef.current;
      const ambient = ambientRef.current;
      if (!day || !nightImg || !ambient) return;

      timelineRef.current?.kill();

      const duration = 1.05;
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
          gsap.set(ambient, { opacity: 0 });
        },
      });

      timelineRef.current = tl;

      if (toNight) {
        tl.fromTo(
          nightImg,
          { clipPath: `circle(0% at ${REVEAL_ORIGIN})`, scale: 1.05 },
          { clipPath: `circle(150% at ${REVEAL_ORIGIN})`, scale: 1, duration },
          0,
        )
          .fromTo(
            day,
            { scale: 1, filter: 'brightness(1) saturate(1)' },
            { scale: 0.965, filter: 'brightness(0.86) saturate(0.82)', duration },
            0,
          )
          .fromTo(ambient, { opacity: 0 }, { opacity: 0.85, duration: 0.35, ease: 'power2.out' }, 0.04)
          .to(ambient, { opacity: 0, duration: 0.55, ease: 'power2.inOut' }, 0.4);
      } else {
        tl.to(nightImg, { clipPath: `circle(0% at ${REVEAL_ORIGIN})`, scale: 1.03, duration }, 0)
          .to(day, { scale: 1, filter: 'brightness(1) saturate(1)', duration }, 0)
          .fromTo(ambient, { opacity: 0 }, { opacity: 0.7, duration: 0.3, ease: 'power2.out' }, 0.04)
          .to(ambient, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 0.35);
      }
    },
    [],
  );

  const handleToggle = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (isAnimatingRef.current) return;

      const next = !isNight;
      setIsNight(next);

      if (prefersReducedMotion()) {
        applyStaticState(next);
        return;
      }

      runTransition(next);
    },
    [applyStaticState, isNight, runTransition],
  );

  const photoStack = (
    <>
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
    </>
  );

  const mediaContent = (
    <div className="suites__media-inner" ref={innerRef}>
      {mobilePhotoLink ? (
        <Link to={href} className="suites__media-stack suites__media-stack--link" aria-label={discoverAria}>
          {photoStack}
        </Link>
      ) : (
        <div className="suites__media-stack">{photoStack}</div>
      )}

      <div className="suites__daynight-mount">
        <DayNightThemeToggle
          isNight={isNight}
          dayAria={dayToggleAria}
          nightAria={nightToggleAria}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );

  return (
    <div className="suites__media-wrap" ref={wrapRef}>
      <div className="suites__media suites__media--static">{mediaContent}</div>
    </div>
  );
}
