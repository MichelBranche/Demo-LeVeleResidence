import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../styles/oh-layout.css';
import {
  playHeaderReveal,
  playHeroRevealLines,
  prepareHeaderReveal,
  prepareHeroRevealLines,
} from '../lib/homeIntroEntrance';
import { HERO_VIDEO_PRIME_EVENT } from '../lib/heroVideo';
import { markIntroDone, resetIntroState } from '../lib/intro';
import { scrollToTop } from '../lib/scroll';

/* Willem loading pattern — Osmo [https://osmo.supply/] */
const WILLEM = {
  ease: 'expo.inOut',
  letterDuration: 0.85,
  letterStagger: 0.018,
  slotDuration: 0.9,
  expandDuration: 2,
  heroLead: 0.45,
  textFade: 0.25,
  splitEm: 0.05,
} as const;

const INTRO_LIGHT_MAX_MS = 9000;
const INTRO_VIDEO_MAX_MS = 16000;
/** Non bloccare l'intro oltre questo limite se Mux/HLS non ha ancora `canplay`. */
const INTRO_METADATA_MAX_MS = 2200;
const INTRO_EARLY_PRIME_MS = 380;
const INIT_MAX_FRAMES = 90;

type PreloaderProps = {
  text: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  videoSlotRef: RefObject<HTMLDivElement | null>;
  onComplete: () => void;
  onShellReady?: () => void;
  animateHeader?: boolean;
  lightMode?: boolean;
  posterSrc?: string;
};

function waitForHeroLinesThen(run: () => void, framesLeft = INIT_MAX_FRAMES) {
  const lines = prepareHeroRevealLines();
  if (lines.length === 0 && framesLeft > 0) {
    requestAnimationFrame(() => waitForHeroLinesThen(run, framesLeft - 1));
    return;
  }
  run();
}

function scheduleHeroCopyReveal({
  light,
  onComplete,
}: {
  light: boolean;
  onComplete?: () => void;
}) {
  waitForHeroLinesThen(() => {
    markPreloaderHeroPhase();
    const tween = playHeroRevealLines({ light, onComplete });
    if (!tween) {
      onComplete?.();
    }
  });
}

function scheduleHeaderReveal({
  light,
  animateHeader,
  onComplete,
}: {
  light: boolean;
  animateHeader: boolean;
  onComplete?: () => void;
}) {
  if (!animateHeader) {
    onComplete?.();
    return;
  }

  markPreloaderHeaderPhase();
  const tween = playHeaderReveal({ light, onComplete });
  if (!tween) {
    onComplete?.();
  }
}

function isMobilePreloader(): boolean {
  return window.matchMedia('(max-width: 767px)').matches;
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

function measureTextHeight(h1El: HTMLElement): number {
  const rect = h1El.getBoundingClientRect().height;
  if (rect >= 8) return rect;
  const wrapper = h1El.querySelector<HTMLElement>('.oh-preloader__char-wrapper');
  const line = wrapper?.getBoundingClientRect().height ?? 0;
  if (line >= 8) return line;
  return isMobilePreloader() ? 52 : 72;
}

type IntroDom = {
  h1El: HTMLDivElement;
  textContainer: HTMLDivElement;
  revealMedia: HTMLDivElement;
  slotEl: HTMLDivElement;
  preloaderEl: HTMLDivElement;
  text: string;
  unlockScroll: () => void;
  onComplete: () => void;
  onShellReady?: () => void;
  onDone: () => void;
  animateHeader?: boolean;
  lightMode?: boolean;
};

type WillemDom = {
  charElements: HTMLElement[];
  startEl: HTMLDivElement;
  endEl: HTMLDivElement;
};

function appendLetters(container: HTMLElement, word: string, charElements: HTMLElement[]) {
  word.split('').forEach((ch) => {
    const cw = document.createElement('span');
    cw.className = 'oh-preloader__char-wrapper';

    const cs = document.createElement('span');
    cs.className = 'oh-preloader__char';
    cs.textContent = ch;

    cw.appendChild(cs);
    container.appendChild(cw);
    charElements.push(cs);
  });
}

function buildWillemDom(
  h1El: HTMLDivElement,
  slotEl: HTMLDivElement,
  revealMedia: HTMLDivElement,
  text: string,
): WillemDom {
  const words = text.trim().split(/\s+/);
  const startText = words[0] ?? '';
  const endText = words.slice(1).join(' ');

  const charElements: HTMLElement[] = [];

  h1El.querySelectorAll('.oh-preloader__h1-start, .oh-preloader__h1-end').forEach((node) => {
    node.remove();
  });

  if (!slotEl.contains(revealMedia)) {
    slotEl.appendChild(revealMedia);
  }
  if (slotEl.parentElement !== h1El) {
    h1El.appendChild(slotEl);
  }

  const startEl = document.createElement('div');
  startEl.className = 'oh-preloader__h1-start';

  const endEl = document.createElement('div');
  endEl.className = 'oh-preloader__h1-end';

  appendLetters(startEl, startText, charElements);
  if (endText) {
    appendLetters(endEl, ` ${endText}`, charElements);
  }

  h1El.insertBefore(startEl, slotEl);
  if (endText) {
    h1El.appendChild(endEl);
  }

  return { charElements, startEl, endEl };
}

function lockHeadingWidths(h1El: HTMLElement, startEl: HTMLElement, endEl: HTMLElement) {
  const fontSize = parseFloat(getComputedStyle(h1El).fontSize) || 48;

  [startEl, endEl].forEach((el) => {
    if (el.childElementCount === 0) return;
    gsap.set(el, { width: 'auto', minWidth: 0 });
    const width = el.scrollWidth;
    if (width > 1) {
      gsap.set(el, { width: `${width / fontSize}em` });
    }
  });
}

function prepareSlotReveal(
  slotEl: HTMLDivElement,
  revealMedia: HTMLDivElement,
  layout: SlotLayout,
) {
  gsap.set(slotEl, {
    width: 0,
    height: layout.textHeight,
    overflow: 'hidden',
    flexShrink: 0,
  });
  gsap.set(revealMedia, {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 1,
    zIndex: 1,
    margin: 0,
    clearProps: 'top,left,transform,xPercent,yPercent,x,y,scaleX,scaleY',
  });
}

function pinRevealMediaForExpand(revealMedia: HTMLDivElement, preloaderEl: HTMLDivElement) {
  const rect = revealMedia.getBoundingClientRect();
  preloaderEl.appendChild(revealMedia);

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.max(rect.width, 1);
  const height = Math.max(rect.height, 1);
  const cx = rect.left + width / 2;
  const cy = rect.top + height / 2;

  /*
   * Elemento già a viewport intero + scale ridotto: il bitmap resta nitido.
   * (Scalare un box piccolo → blur perché il layer è rasterizzato alla size layout.)
   */
  gsap.set(revealMedia, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: vw,
    height: vh,
    margin: 0,
    x: cx - vw / 2,
    y: cy - vh / 2,
    scaleX: width / vw,
    scaleY: height / vh,
    transformOrigin: '50% 50%',
    zIndex: 2,
    opacity: 1,
    overflow: 'hidden',
    pointerEvents: 'none',
  });

  return {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
  };
}

function markPreloaderHeroPhase() {
  document.body.classList.add('oh-preloader-hero-phase');
}

function markPreloaderHeaderPhase() {
  document.body.classList.add('oh-preloader-header-phase');
}

type SlotLayout = {
  textRect: DOMRect;
  slotCenterX: number;
  mediaWidth: number;
  textHeight: number;
};

function measureSlotLayout(h1El: HTMLDivElement, slotEl: HTMLDivElement, aspectRatio: number): SlotLayout {
  const textHeight = measureTextHeight(h1El);
  const mediaWidth = textHeight * aspectRatio;
  const textRect = h1El.getBoundingClientRect();
  const slotRect = slotEl.getBoundingClientRect();
  const slotCenterX =
    slotRect.width > 0 ? slotRect.left + slotRect.width / 2 : window.innerWidth / 2;

  return { textRect, slotCenterX, mediaWidth, textHeight };
}

function addWillemTimeline({
  timeline,
  charElements,
  startEl,
  endEl,
  slotEl,
  revealMedia,
  layout,
  preloaderEl,
  textContainer,
  onHandoffReady,
  lightMode = false,
  animateHeader = true,
}: {
  timeline: gsap.core.Timeline;
  charElements: HTMLElement[];
  startEl: HTMLElement;
  endEl: HTMLElement;
  slotEl: HTMLElement;
  revealMedia: HTMLElement;
  layout: SlotLayout;
  preloaderEl: HTMLElement;
  textContainer: HTMLElement;
  onHandoffReady: () => void;
  lightMode?: boolean;
  animateHeader?: boolean;
}) {
  const slotLabel = `< ${WILLEM.letterDuration}`;

  timeline.fromTo(
    charElements,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: WILLEM.letterDuration,
      stagger: WILLEM.letterStagger,
    },
  );

  timeline.fromTo(
    slotEl,
    { width: 0 },
    { width: layout.mediaWidth, duration: WILLEM.slotDuration },
    slotLabel,
  );

  timeline.fromTo(
    startEl,
    { x: '0em' },
    { x: `-${WILLEM.splitEm}em`, duration: WILLEM.slotDuration },
    slotLabel,
  );

  if (endEl.childElementCount > 0) {
    timeline.fromTo(
      endEl,
      { x: '0em' },
      { x: `${WILLEM.splitEm}em`, duration: WILLEM.slotDuration },
      slotLabel,
    );
  }

  const chromeLight = lightMode || isMobilePreloader();

  // Dopo lo slot: pin + expand fullscreen via transform (CLS-safe)
  let expandTarget = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
  timeline.call(
    () => {
      expandTarget = pinRevealMediaForExpand(
        revealMedia as HTMLDivElement,
        preloaderEl as HTMLDivElement,
      );
    },
    undefined,
    '>',
  );

  timeline.to(
    revealMedia,
    {
      x: () => expandTarget.x,
      y: () => expandTarget.y,
      scaleX: () => expandTarget.scaleX,
      scaleY: () => expandTarget.scaleY,
      duration: WILLEM.expandDuration,
      ease: WILLEM.ease,
      onComplete: () => {
        scheduleHeaderReveal({
          light: chromeLight,
          animateHeader,
        });
        onHandoffReady();
      },
    },
    '<',
  );

  timeline.to(
    textContainer,
    {
      autoAlpha: 0,
      visibility: 'hidden',
      duration: WILLEM.textFade,
      ease: 'power2.in',
    },
    '<',
  );

  timeline.call(
    () => {
      scheduleHeroCopyReveal({
        light: chromeLight,
      });
    },
    undefined,
    `< ${WILLEM.heroLead}`,
  );
}

function markHeroShellReadySync(heroSlot: HTMLDivElement) {
  heroSlot.closest('.home-hero-shell')?.classList.add('home-hero-shell--ready');
}

function mountVideoInHeroSlot(heroVideoEl: HTMLVideoElement, heroSlot: HTMLDivElement) {
  if (heroVideoEl.parentElement !== heroSlot) {
    heroSlot.appendChild(heroVideoEl);
  }
  heroVideoEl.classList.add('hero-bg-video');
  heroVideoEl.loop = true;
  heroVideoEl.muted = true;
  heroVideoEl.playsInline = true;
  if (heroVideoEl.paused) {
    void heroVideoEl.play().catch(() => {});
  }
  gsap.set(heroVideoEl, { clearProps: 'transform,opacity,filter,scale' });
}

/** Still-frame del video corrente: copre il drop di frame da reparenting del <video>. */
function createVideoSnapshot(heroVideoEl: HTMLVideoElement): HTMLCanvasElement | null {
  if (heroVideoEl.videoWidth === 0 || heroVideoEl.videoHeight === 0) return null;
  const snap = document.createElement('canvas');
  snap.width = heroVideoEl.videoWidth;
  snap.height = heroVideoEl.videoHeight;
  try {
    snap.getContext('2d')?.drawImage(heroVideoEl, 0, 0, snap.width, snap.height);
  } catch {
    return null;
  }
  Object.assign(snap.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
  });
  return snap;
}

function seamlessVideoHandoff({
  revealMedia,
  preloaderEl,
  heroVideoEl,
  heroSlot,
  onShellReady,
  onComplete,
  unlockScroll,
  onDone,
}: {
  revealMedia: HTMLDivElement;
  preloaderEl: HTMLDivElement;
  heroVideoEl: HTMLVideoElement;
  heroSlot: HTMLDivElement;
  onShellReady?: () => void;
  onComplete: () => void;
  unlockScroll: () => void;
  onDone: () => void;
}) {
  // 1. Congela il frame corrente dentro revealMedia (sopra il punto in cui era il video).
  const snap = createVideoSnapshot(heroVideoEl);
  if (snap) {
    revealMedia.appendChild(snap);
  }

  // 2. Stesso paint: shell hero visibile + video live già fullscreen nello slot, sotto il preloader.
  markHeroShellReadySync(heroSlot);
  mountVideoInHeroSlot(heroVideoEl, heroSlot);
  onShellReady?.();

  // 3. Crossfade: lo still-frame (e il fondo crema) sfumano sul video live già in posizione.
  gsap.to(preloaderEl, {
    autoAlpha: 0,
    duration: 0.32,
    ease: 'power1.inOut',
    onComplete: () => {
      snap?.remove();
      gsap.set(revealMedia, { autoAlpha: 0, visibility: 'hidden' });
      document.body.classList.remove('oh-preloader-hero-phase', 'oh-preloader-header-phase');
      unlockScroll();
      onComplete();
      onDone();
    },
  });
}

function setupLightIntro({
  h1El,
  textContainer,
  revealMedia,
  slotEl,
  preloaderEl,
  posterSrc,
  text,
  unlockScroll,
  onComplete,
  onShellReady,
  onDone,
  animateHeader = true,
  lightMode = true,
}: IntroDom & { posterSrc?: string; animateHeader?: boolean; lightMode?: boolean }) {
  const { charElements, startEl, endEl } = buildWillemDom(h1El, slotEl, revealMedia, text);
  gsap.set(charElements, { yPercent: 100 });
  gsap.set(textContainer, { visibility: 'visible', autoAlpha: 1 });
  gsap.set([startEl, endEl], { x: 0 });

  let introFinished = false;
  let safetyTimer = 0;
  let posterEl: HTMLImageElement | null = null;
  let lightTimeline: gsap.core.Timeline | null = null;

  const completeIntro = () => {
    if (introFinished) return;
    introFinished = true;
    window.clearTimeout(safetyTimer);
    unlockScroll();
    onComplete();
    onDone();
  };

  const forceLightExit = () => {
    lightTimeline?.kill();
    markIntroDone();
    completeIntro();
  };

  safetyTimer = window.setTimeout(forceLightExit, INTRO_LIGHT_MAX_MS);

  posterEl = document.createElement('img');
  posterEl.className = 'oh-preloader__poster';
  posterEl.src = posterSrc ?? '';
  posterEl.alt = '';
  posterEl.width = 1920;
  posterEl.height = 1080;
  posterEl.decoding = 'async';
  posterEl.fetchPriority = 'high';
  revealMedia.appendChild(posterEl);

  const playLight = () => {
    if (introFinished) return;

    lightTimeline?.kill();
    gsap.set(charElements, { yPercent: 100 });
    gsap.set([startEl, endEl], { x: 0 });

    const layout = measureSlotLayout(h1El, slotEl, 16 / 9);
    prepareSlotReveal(slotEl, revealMedia, layout);
    lockHeadingWidths(h1El, startEl, endEl);

    lightTimeline = gsap.timeline({
      defaults: { ease: WILLEM.ease },
    });

    addWillemTimeline({
      timeline: lightTimeline,
      charElements,
      startEl,
      endEl,
      slotEl,
      revealMedia,
      layout,
      preloaderEl,
      textContainer,
      lightMode,
      animateHeader,
      onHandoffReady: () => {
        onShellReady?.();
        gsap.set(preloaderEl, { autoAlpha: 0 });
        completeIntro();
      },
    });
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(playLight);
  });
  void waitForFonts(500).then(playLight);

  return () => {
    window.clearTimeout(safetyTimer);
    posterEl?.remove();
    lightTimeline?.kill();
    gsap.killTweensOf([revealMedia, textContainer, h1El, preloaderEl, slotEl, startEl, endEl, ...charElements]);
    if (revealMedia.parentElement !== slotEl) {
      slotEl.appendChild(revealMedia);
      gsap.set(revealMedia, { clearProps: 'all' });
    }
  };
}

function setupVideoIntro({
  h1El,
  textContainer,
  revealMedia,
  slotEl,
  preloaderEl,
  heroSlot,
  heroVideo: heroVideoEl,
  text,
  unlockScroll,
  onComplete,
  onShellReady,
  onDone,
  animateHeader = true,
  lightMode = false,
}: IntroDom & {
  heroSlot: HTMLDivElement;
  heroVideo: HTMLVideoElement;
  animateHeader?: boolean;
  lightMode?: boolean;
}) {
  const { charElements, startEl, endEl } = buildWillemDom(h1El, slotEl, revealMedia, text);
  gsap.set(charElements, { yPercent: 100 });
  gsap.set(textContainer, { visibility: 'visible', autoAlpha: 1 });
  gsap.set([startEl, endEl], { x: 0 });

  let introFinished = false;
  let videoRevealStarted = false;
  let safetyTimer = 0;
  let metadataTimer = 0;
  let earlyPrimeTimer = 0;
  let mainTimeline: gsap.core.Timeline | null = null;

  const completeIntro = () => {
    if (introFinished) return;
    introFinished = true;
    window.clearTimeout(safetyTimer);
    window.clearTimeout(metadataTimer);
    unlockScroll();
    onComplete();
    onDone();
  };

  const forceVideoExit = () => {
    mainTimeline?.kill();
    markIntroDone();
    document.body.classList.remove('oh-preloader-hero-phase', 'oh-preloader-header-phase');
    if (heroVideoEl.parentElement !== heroSlot) {
      heroSlot.appendChild(heroVideoEl);
    }
    completeIntro();
  };

  safetyTimer = window.setTimeout(forceVideoExit, INTRO_VIDEO_MAX_MS);

  const handoffToHero = () => {
    if (introFinished) return;
    introFinished = true;
    window.clearTimeout(safetyTimer);
    window.clearTimeout(metadataTimer);

    seamlessVideoHandoff({
      revealMedia,
      preloaderEl,
      heroVideoEl,
      heroSlot,
      onShellReady,
      onComplete,
      unlockScroll,
      onDone,
    });
  };

  const playVideoReveal = () => {
    if (introFinished || videoRevealStarted) return;
    videoRevealStarted = true;

    const aspectRatio =
      heroVideoEl.videoWidth > 0 && heroVideoEl.videoHeight > 0
        ? heroVideoEl.videoWidth / heroVideoEl.videoHeight
        : 16 / 9;

    const layout = measureSlotLayout(h1El, slotEl, aspectRatio);

    if (heroVideoEl.parentElement === heroSlot) {
      revealMedia.appendChild(heroVideoEl);
    }
    heroVideoEl.muted = true;
    heroVideoEl.playsInline = true;
    heroVideoEl.loop = true;
    void heroVideoEl.play().catch(() => {});

    prepareSlotReveal(slotEl, revealMedia, layout);
    lockHeadingWidths(h1El, startEl, endEl);

    mainTimeline = gsap.timeline({
      defaults: { ease: WILLEM.ease },
    });

    addWillemTimeline({
      timeline: mainTimeline,
      charElements,
      startEl,
      endEl,
      slotEl,
      revealMedia,
      layout,
      preloaderEl,
      textContainer,
      lightMode,
      animateHeader,
      onHandoffReady: handoffToHero,
    });
  };

  const beginVideoReveal = () => {
    if (introFinished || videoRevealStarted) return;
    void waitForFonts(800).then(() => {
      if (introFinished || videoRevealStarted) return;
      void waitForLayout().then(() => {
        if (introFinished || videoRevealStarted) return;
        playVideoReveal();
      });
    });
  };

  let videoPrimed = false;
  const primeVideo = () => {
    if (videoPrimed || introFinished) return;
    videoPrimed = true;
    window.clearTimeout(metadataTimer);
    window.clearTimeout(earlyPrimeTimer);
    beginVideoReveal();
  };

  const onVideoError = () => {
    if (introFinished) return;
    window.clearTimeout(metadataTimer);
    window.clearTimeout(earlyPrimeTimer);
    if (!videoPrimed) {
      primeVideo();
      return;
    }
    markIntroDone();
    if (heroVideoEl.parentElement !== heroSlot) {
      heroSlot.appendChild(heroVideoEl);
    }
    completeIntro();
  };

  const onMetadataTimeout = () => {
    if (!videoPrimed && !introFinished) {
      primeVideo();
    }
  };

  heroVideoEl.addEventListener('error', onVideoError, { once: true });
  heroVideoEl.addEventListener('canplay', primeVideo, { once: true });
  heroVideoEl.addEventListener('loadeddata', primeVideo, { once: true });
  heroVideoEl.addEventListener('loadedmetadata', primeVideo, { once: true });
  heroVideoEl.addEventListener(HERO_VIDEO_PRIME_EVENT, primeVideo, { once: true });

  metadataTimer = window.setTimeout(onMetadataTimeout, INTRO_METADATA_MAX_MS);
  earlyPrimeTimer = window.setTimeout(onMetadataTimeout, INTRO_EARLY_PRIME_MS);

  if (heroVideoEl.readyState >= 2) {
    primeVideo();
  } else if (heroVideoEl.readyState >= 1) {
    window.setTimeout(primeVideo, 120);
  }

  return () => {
    window.clearTimeout(safetyTimer);
    window.clearTimeout(metadataTimer);
    window.clearTimeout(earlyPrimeTimer);
    heroVideoEl.removeEventListener('canplay', primeVideo);
    heroVideoEl.removeEventListener('loadeddata', primeVideo);
    heroVideoEl.removeEventListener('loadedmetadata', primeVideo);
    heroVideoEl.removeEventListener(HERO_VIDEO_PRIME_EVENT, primeVideo);
    heroVideoEl.removeEventListener('error', onVideoError);
    mainTimeline?.kill();
    document.body.classList.remove('oh-preloader-hero-phase', 'oh-preloader-header-phase');
    gsap.killTweensOf([
      revealMedia,
      textContainer,
      h1El,
      preloaderEl,
      slotEl,
      heroSlot,
      startEl,
      endEl,
      ...charElements,
    ]);
    if (revealMedia.parentElement !== slotEl) {
      slotEl.appendChild(revealMedia);
      gsap.set(revealMedia, { clearProps: 'all' });
    }
    if (heroVideoEl.parentElement !== heroSlot) {
      heroSlot.appendChild(heroVideoEl);
    }
  };
}

export function Preloader({
  text,
  videoRef,
  videoSlotRef,
  onComplete,
  onShellReady,
  animateHeader = true,
  lightMode = false,
  posterSrc,
}: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const onCompleteRef = useRef(onComplete);
  const onShellReadyRef = useRef(onShellReady);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    onShellReadyRef.current = onShellReady;
  }, [onShellReady]);

  const preloaderRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    scrollToTop(true);

    let cancelled = false;
    let rafId = 0;
    let bodyLockActive = false;
    let teardown: (() => void) | undefined;

    const lockScroll = () => {
      if (!bodyLockActive) {
        bodyLockActive = true;
        document.body.classList.add('oh-preloader-active');
      }
    };

    const unlockScroll = () => {
      if (bodyLockActive) {
        document.body.classList.remove(
          'oh-preloader-active',
          'oh-preloader-hero-phase',
          'oh-preloader-header-phase',
        );
        bodyLockActive = false;
      }
    };

    const hidePreloader = () => setVisible(false);

    const tryInit = (frame: number) => {
      if (cancelled) return;

      const h1El = h1Ref.current;
      const textContainer = textContainerRef.current;
      const revealMedia = mediaRef.current;
      const slotEl = slotRef.current;
      const preloaderEl = preloaderRef.current;
      const video = videoRef.current;
      const heroSlot = videoSlotRef.current;

      const refsReady =
        h1El &&
        textContainer &&
        revealMedia &&
        slotEl &&
        preloaderEl &&
        heroSlot &&
        (lightMode || video);

      if (!refsReady) {
        if (frame < INIT_MAX_FRAMES) {
          rafId = requestAnimationFrame(() => tryInit(frame + 1));
        }
        return;
      }

      lockScroll();
      resetIntroState();
      prepareHeroRevealLines();
      if (animateHeader) {
        prepareHeaderReveal();
      }

      const shared = {
        h1El,
        textContainer,
        revealMedia,
        slotEl,
        preloaderEl,
        text,
        unlockScroll,
        onComplete: () => onCompleteRef.current(),
        onShellReady: () => onShellReadyRef.current?.(),
        onDone: hidePreloader,
        animateHeader,
        lightMode,
      };

      teardown = lightMode
        ? setupLightIntro({ ...shared, posterSrc })
        : setupVideoIntro({ ...shared, heroSlot, heroVideo: video! });
    };

    tryInit(0);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      teardown?.();
      unlockScroll();
    };
  }, [text, videoRef, videoSlotRef, lightMode, posterSrc, animateHeader]);

  if (!visible) return null;

  return (
    <div
      className="oh-preloader"
      ref={preloaderRef}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={text}
    >
      <div className="oh-preloader__text-container" ref={textContainerRef}>
        <div className="oh-preloader__h1" ref={h1Ref}>
          <div className="oh-preloader__slot" ref={slotRef}>
            <div className="oh-preloader__reveal-media" ref={mediaRef} aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
