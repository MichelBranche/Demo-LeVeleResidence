import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { scrollToTop } from '../lib/scroll';

const INTRO_LIGHT_MAX_MS = 7000;
const INTRO_VIDEO_MAX_MS = 14000;
const INTRO_METADATA_MAX_MS = 6000;

type PreloaderProps = {
  text: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  videoSlotRef: RefObject<HTMLDivElement | null>;
  onComplete: () => void;
  lightMode?: boolean;
  posterSrc?: string;
};

function getSlotTarget(slot: HTMLElement) {
  const rect = slot.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius: 15,
  };
}

function waitForFonts(maxMs: number): Promise<void> {
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  return Promise.race([
    fontsReady.then(() => undefined),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, maxMs);
    }),
  ]);
}

function waitForLayout(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

export function Preloader({
  text,
  videoRef,
  videoSlotRef,
  onComplete,
  lightMode = false,
  posterSrc,
}: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    scrollToTop(true);
    document.body.classList.add('oh-preloader-active');

    const textEl = textRef.current;
    const textContainer = textContainerRef.current;
    const revealMedia = mediaRef.current;
    const preloaderEl = preloaderRef.current;
    const video = videoRef.current;
    const heroSlot = videoSlotRef.current;
    if (!textEl || !textContainer || !revealMedia || !preloaderEl || !heroSlot) return undefined;
    if (!lightMode && !video) return undefined;

    const heroVideo = video;

    const words = text.trim().split(/\s+/);
    const staggerTime = 0.05;
    const charDuration = 0.5;
    const startDelay = 0.3;
    const splitDelay = 0.6;
    const splitDuration = 1.0;
    const expandDuration = 1.0;
    const textGap = 30;

    textEl.innerHTML = '';
    const wordElements: HTMLSpanElement[] = [];
    const charElements: HTMLSpanElement[] = [];

    words.forEach((word, wordIndex) => {
      const wordWrapper = document.createElement('span');
      wordWrapper.className = 'oh-preloader__word';

      word.split('').forEach((ch) => {
        const cw = document.createElement('span');
        cw.className = 'oh-preloader__char-wrapper';

        const cs = document.createElement('span');
        cs.className = 'oh-preloader__char';
        cs.setAttribute('data-oh-word', String(wordIndex));
        cs.textContent = ch;

        cw.appendChild(cs);
        wordWrapper.appendChild(cw);
        charElements.push(cs);
      });

      textEl.appendChild(wordWrapper);
      wordElements.push(wordWrapper);

      if (wordIndex < words.length - 1) {
        const space = document.createElement('span');
        space.className = 'oh-preloader__word-space';
        textEl.appendChild(space);
      }
    });

    gsap.set(charElements, { yPercent: 110 });
    gsap.set(textContainer, { visibility: 'visible', opacity: 1 });
    gsap.set(wordElements, { opacity: 1, x: 0 });

    let introFinished = false;
    let animationStarted = false;
    let safetyTimer = 0;
    let metadataTimer = 0;
    let posterEl: HTMLImageElement | null = null;
    let mainTimeline: gsap.core.Timeline | null = null;
    let lightTimeline: gsap.core.Timeline | null = null;

    const completeIntro = () => {
      if (introFinished) return;
      introFinished = true;
      window.clearTimeout(safetyTimer);
      window.clearTimeout(metadataTimer);
      document.body.classList.remove('oh-preloader-active');
      onCompleteRef.current();
      setVisible(false);
    };

    if (lightMode) {
      const forceLightExit = () => {
        lightTimeline?.kill();
        completeIntro();
      };

      safetyTimer = window.setTimeout(forceLightExit, INTRO_LIGHT_MAX_MS);
      posterEl = document.createElement('img');
      posterEl.className = 'oh-preloader__poster';
      posterEl.src = posterSrc ?? '';
      posterEl.alt = '';
      posterEl.decoding = 'async';
      revealMedia.appendChild(posterEl);
      gsap.set(revealMedia, { opacity: 0, scale: 0.96 });

      lightTimeline = gsap.timeline({
        paused: true,
        onComplete: completeIntro,
      });

      words.forEach((_w, i) => {
        const chars = textEl.querySelectorAll<HTMLElement>(`.oh-preloader__char[data-oh-word="${i}"]`);
        lightTimeline!.to(
          chars,
          {
            yPercent: 0,
            duration: 0.38,
            ease: 'power3.out',
            stagger: 0.04,
          },
          i === 0 ? 0.15 : '<0.08',
        );
      });

      lightTimeline
        .to(revealMedia, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }, '>+0.2')
        .to(
          [textContainer, ...wordElements, revealMedia],
          { opacity: 0, duration: 0.35, ease: 'power2.inOut' },
          '>+0.35',
        )
        .to(
          preloaderEl,
          {
            opacity: 0,
            backgroundColor: 'rgba(129, 110, 98, 0)',
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '<0.06',
        );

      void waitForFonts(800).then(() => {
        if (introFinished) return;
        lightTimeline?.play(0);
      });

      return () => {
        window.clearTimeout(safetyTimer);
        posterEl?.remove();
        lightTimeline?.kill();
        document.body.classList.remove('oh-preloader-active');
        gsap.killTweensOf([revealMedia, textContainer, textEl, preloaderEl, ...wordElements, ...charElements]);
      };
    }

    if (!heroVideo) return undefined;

    const heroVideoEl = heroVideo;

    const returnVideoToSlot = () => {
      if (heroVideoEl.parentElement !== heroSlot) {
        heroSlot.appendChild(heroVideoEl);
      }
      heroVideoEl.classList.add('hero-bg-video');
      heroVideoEl.loop = true;
      heroVideoEl.muted = true;
      heroVideoEl.playsInline = true;
      gsap.set(heroVideoEl, { clearProps: 'transform,opacity,filter' });
      gsap.set(revealMedia, { clearProps: 'all' });
    };

    const forceVideoExit = () => {
      mainTimeline?.kill();
      returnVideoToSlot();
      completeIntro();
    };

    safetyTimer = window.setTimeout(forceVideoExit, INTRO_VIDEO_MAX_MS);

    const handoffToHero = () => {
      const exitTl = gsap.timeline({ onComplete: completeIntro });

      exitTl
        .to([textContainer, ...wordElements], {
          opacity: 0,
          duration: 0.28,
          ease: 'power2.inOut',
        })
        .to(
          revealMedia,
          {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '<0.05',
        )
        .add(returnVideoToSlot)
        .to(
          preloaderEl,
          {
            opacity: 0,
            backgroundColor: 'rgba(129, 110, 98, 0)',
            duration: 0.45,
            ease: 'power2.inOut',
          },
          '<0.08',
        );
    };

    const runAnimation = () => {
      if (introFinished || animationStarted) return;
      animationStarted = true;

      if (heroVideoEl.parentElement === heroSlot) {
        revealMedia.appendChild(heroVideoEl);
      }

      heroVideoEl.muted = true;
      heroVideoEl.playsInline = true;
      heroVideoEl.loop = true;
      void heroVideoEl.play().catch(() => {});

      const textRect = textEl.getBoundingClientRect();
      const textHeight = textRect.height;
      if (textHeight < 8) {
        returnVideoToSlot();
        completeIntro();
        return;
      }

      const aspectRatio =
        heroVideoEl.videoWidth > 0 && heroVideoEl.videoHeight > 0
          ? heroVideoEl.videoWidth / heroVideoEl.videoHeight
          : 16 / 9;
      const mediaWidth = textHeight * aspectRatio;
      const halfMedia = mediaWidth / 2 + textGap;

      const slotSpace = textEl.querySelector<HTMLElement>('.oh-preloader__word-space');
      if (!slotSpace) {
        returnVideoToSlot();
        completeIntro();
        return;
      }

      const slotRect = slotSpace.getBoundingClientRect();
      const slotCenterX = slotRect.left + slotRect.width / 2;

      gsap.set(revealMedia, {
        width: mediaWidth,
        height: textHeight,
        left: slotCenterX - mediaWidth / 2,
        top: textRect.top,
        clipPath: 'inset(0 50% 0 50%)',
        opacity: 0,
      });

      mainTimeline = gsap.timeline();

      words.forEach((_w, i) => {
        const chars = textEl.querySelectorAll<HTMLElement>(`.oh-preloader__char[data-oh-word="${i}"]`);
        mainTimeline!.to(
          chars,
          {
            yPercent: 0,
            duration: charDuration,
            ease: 'power3.out',
            stagger: staggerTime,
          },
          startDelay,
        );
      });

      mainTimeline
        .to(
          revealMedia,
          {
            opacity: 1,
            duration: splitDuration * 0.35,
            ease: 'power2.out',
          },
          `>+${splitDelay}`,
        )
        .fromTo(
          revealMedia,
          { clipPath: 'inset(0 50% 0 50%)' },
          { clipPath: 'inset(0 0% 0 0%)', duration: splitDuration, ease: 'power4.inOut' },
          '<',
        );

      if (wordElements[0]) {
        mainTimeline.to(
          wordElements[0],
          { x: -halfMedia, duration: splitDuration, ease: 'power4.inOut' },
          '<',
        );
      }
      if (wordElements[1]) {
        mainTimeline.to(
          wordElements[1],
          { x: halfMedia, duration: splitDuration, ease: 'power4.inOut' },
          '<',
        );
      }
      if (wordElements[2]) {
        mainTimeline.to(
          wordElements[2],
          { x: halfMedia, duration: splitDuration, ease: 'power4.inOut' },
          '<',
        );
      }

      mainTimeline
        .to(slotSpace, { width: 0, duration: splitDuration, ease: 'power4.inOut' }, '<')
        .to(
          revealMedia,
          {
            ...getSlotTarget(heroSlot),
            duration: expandDuration,
            ease: 'power3.inOut',
          },
          '>+=0.3',
        )
        .call(handoffToHero);
    };

    const onReady = () => {
      if (introFinished || animationStarted) return;
      void waitForLayout().then(runAnimation);
    };

    const onVideoError = () => {
      if (introFinished) return;
      window.clearTimeout(metadataTimer);
      returnVideoToSlot();
      completeIntro();
    };

    const onMetadataReady = () => {
      window.clearTimeout(metadataTimer);
      onReady();
    };

    heroVideoEl.addEventListener('error', onVideoError, { once: true });

    metadataTimer = window.setTimeout(onVideoError, INTRO_METADATA_MAX_MS);

    if (heroVideoEl.readyState >= 1) {
      void waitForFonts(1200).then(onMetadataReady);
    } else {
      heroVideoEl.addEventListener('loadedmetadata', onMetadataReady, { once: true });
    }

    return () => {
      window.clearTimeout(safetyTimer);
      window.clearTimeout(metadataTimer);
      heroVideoEl.removeEventListener('loadedmetadata', onMetadataReady);
      heroVideoEl.removeEventListener('error', onVideoError);
      mainTimeline?.kill();
      document.body.classList.remove('oh-preloader-active');
      gsap.killTweensOf([revealMedia, textContainer, textEl, preloaderEl, ...wordElements, ...charElements]);
      returnVideoToSlot();
    };
  }, [text, videoRef, videoSlotRef, lightMode, posterSrc]);

  if (!visible) return null;

  return (
    <div className="oh-preloader" ref={preloaderRef} aria-hidden={false} aria-busy="true">
      <div className="oh-preloader__reveal-media" ref={mediaRef} />
      <div className="oh-preloader__text-container" ref={textContainerRef}>
        <span className="oh-preloader__text" ref={textRef} />
      </div>
    </div>
  );
}
