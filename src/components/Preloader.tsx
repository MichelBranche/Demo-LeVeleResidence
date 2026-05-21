import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { scrollToTop } from '../lib/scroll';

type PreloaderProps = {
  text: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  videoSlotRef: RefObject<HTMLDivElement | null>;
  onComplete: () => void;
  /** Mobile / 4G: niente download video durante l’intro. */
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

    const finishIntro = () => {
      document.body.classList.remove('oh-preloader-active');
      onCompleteRef.current();
      setVisible(false);
    };

    const returnVideoToSlot = () => {
      if (!video) return;
      if (video.parentElement !== heroSlot) {
        heroSlot.appendChild(video);
      }
      video.classList.add('hero-bg-video');
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      gsap.set(video, { clearProps: 'transform,opacity,filter' });
    };

    if (lightMode) {
      const posterEl = document.createElement('img');
      posterEl.className = 'oh-preloader__poster';
      posterEl.src = posterSrc ?? '';
      posterEl.alt = '';
      posterEl.decoding = 'async';
      posterEl.setAttribute('fetchpriority', 'high');
      revealMedia.appendChild(posterEl);

      gsap.set(revealMedia, { opacity: 0, scale: 0.96 });

      const lightTl = gsap.timeline({
        paused: true,
        onComplete: finishIntro,
      });

      words.forEach((_w, i) => {
        const chars = textEl.querySelectorAll<HTMLElement>(`.oh-preloader__char[data-oh-word="${i}"]`);
        lightTl.to(
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

      lightTl
        .to(revealMedia, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }, '>+0.2')
        .to([textContainer, ...wordElements, revealMedia], {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.inOut',
        }, '>+0.35')
        .to(preloaderEl, {
          opacity: 0,
          backgroundColor: 'rgba(245, 245, 245, 0)',
          duration: 0.4,
          ease: 'power2.inOut',
        }, '<0.06');

      void waitForFonts(600).then(() => {
        lightTl.play();
      });

      return () => {
        posterEl.remove();
        document.body.classList.remove('oh-preloader-active');
        gsap.killTweensOf([revealMedia, textContainer, textEl, preloaderEl, ...wordElements, ...charElements]);
        lightTl.kill();
      };
    }

    const handoffToHero = () => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove('oh-preloader-active');
          onCompleteRef.current();
          setVisible(false);
        },
      });

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
            backgroundColor: 'rgba(245, 245, 245, 0)',
            duration: 0.45,
            ease: 'power2.inOut',
          },
          '<0.08',
        );
    };

    const runAnimation = () => {
      if (!video) return;
      if (video.parentElement === heroSlot) {
        revealMedia.appendChild(video);
      }

      const textRect = textEl.getBoundingClientRect();
      const textHeight = textRect.height;

      const aspectRatio =
        video.videoWidth > 0 && video.videoHeight > 0
          ? video.videoWidth / video.videoHeight
          : 16 / 9;
      const mediaWidth = textHeight * aspectRatio;
      const halfMedia = mediaWidth / 2 + textGap;

      const slotSpace = textEl.querySelector<HTMLElement>('.oh-preloader__word-space');
      if (!slotSpace) return;

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

      const tl = gsap.timeline();

      words.forEach((_w, i) => {
        const chars = textEl.querySelectorAll<HTMLElement>(`.oh-preloader__char[data-oh-word="${i}"]`);
        tl.to(
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

      tl.to(
        revealMedia,
        {
          opacity: 1,
          duration: splitDuration * 0.35,
          ease: 'power2.out',
        },
        `>+${splitDelay}`,
      );

      tl.fromTo(
        revealMedia,
        { clipPath: 'inset(0 50% 0 50%)' },
        { clipPath: 'inset(0 0% 0 0%)', duration: splitDuration, ease: 'power4.inOut' },
        '<',
      );

      if (wordElements[0]) {
        tl.to(wordElements[0], { x: -halfMedia, duration: splitDuration, ease: 'power4.inOut' }, '<');
      }
      if (wordElements[1]) {
        tl.to(wordElements[1], { x: halfMedia, duration: splitDuration, ease: 'power4.inOut' }, '<');
      }
      if (wordElements[2]) {
        tl.to(wordElements[2], { x: halfMedia, duration: splitDuration, ease: 'power4.inOut' }, '<');
      }

      tl.to(slotSpace, { width: 0, duration: splitDuration, ease: 'power4.inOut' }, '<');

      tl.to(
        revealMedia,
        {
          ...getSlotTarget(heroSlot),
          duration: expandDuration,
          ease: 'power3.inOut',
        },
        '>+=0.3',
      );

      tl.call(handoffToHero);
    };

    const onReady = () => {
      if (!video) return;
      if (video.readyState >= 1) {
        runAnimation();
      } else {
        video.addEventListener('loadedmetadata', runAnimation, { once: true });
      }
    };

    void waitForFonts(1200).then(onReady);

    return () => {
      video?.removeEventListener('loadedmetadata', runAnimation);
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
        {/* Testo inserito via GSAP — evita flash da re-render React */}
        <span className="oh-preloader__text" ref={textRef} />
      </div>
    </div>
  );
}
