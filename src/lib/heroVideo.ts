import { asset } from './assets';

const MUX_STREAM_BASE = 'https://stream.mux.com';
const LOCAL_HERO_FALLBACK = asset('/Hero-Video.mp4?v=5');

/** Playback ID Mux — override con VITE_MUX_HERO_PLAYBACK_ID in produzione. */
const MUX_HERO_PLAYBACK_ID =
  (import.meta.env.VITE_MUX_HERO_PLAYBACK_ID as string | undefined)?.trim() ||
  'LowyOggTofZ1rqZxKkT4mdeUHTzdW007W61UaghsNf01c';

export function getHeroVideoUrl(): string {
  if (MUX_HERO_PLAYBACK_ID) {
    return `${MUX_STREAM_BASE}/${MUX_HERO_PLAYBACK_ID}.m3u8`;
  }
  return LOCAL_HERO_FALLBACK;
}

export function isHlsVideoUrl(url: string): boolean {
  return /\.m3u8(?:\?|$)/i.test(url);
}

export function canPlayNativeHls(video: HTMLVideoElement): boolean {
  return video.canPlayType('application/vnd.apple.mpegurl') !== '';
}

/** Il preloader può partire senza attendere `canplay` (Mux HLS è spesso lento). */
export const HERO_VIDEO_PRIME_EVENT = 'hero-video:prime';

/** Salta i primi N secondi del clip hero (intro drone ecc.). */
export const HERO_VIDEO_START_OFFSET_SEC = 10;

let hlsModulePromise: Promise<typeof import('hls.js')> | null = null;

export function loadHlsModule() {
  hlsModulePromise ??= import('hls.js');
  return hlsModulePromise;
}

/** Prefetch manifesto HLS + hls.js dopo il first paint (preconnect già in index.html). */
export function warmHeroVideoPipeline(videoUrl = getHeroVideoUrl()): void {
  if (typeof document === 'undefined' || !shouldWarmHeroVideo(videoUrl)) return;

  const warm = () => {
    void loadHlsModule();
    void fetch(videoUrl, { mode: 'cors', credentials: 'omit', cache: 'force-cache' }).catch(() => {});
  };

  const scheduleWarm = () => {
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(warm, { timeout: 2500 });
    } else {
      window.setTimeout(warm, 1500);
    }
  };

  if (document.readyState === 'complete') {
    scheduleWarm();
  } else {
    window.addEventListener('load', scheduleWarm, { once: true });
  }
}

function shouldWarmHeroVideo(videoUrl: string): boolean {
  return isHlsVideoUrl(videoUrl);
}

export function applyHeroVideoStartOffset(video: HTMLVideoElement): void {
  const offset = HERO_VIDEO_START_OFFSET_SEC;

  const seek = () => {
    const { duration } = video;
    if (!Number.isFinite(duration) || duration <= offset) return;
    if (video.currentTime < offset - 0.25) {
      video.currentTime = offset;
    }
  };

  if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
    seek();
  } else {
    video.addEventListener('loadedmetadata', seek, { once: true });
  }
}

/** Con `loop`, evita di tornare ai primi secondi saltati. */
export function bindHeroVideoLoopOffset(video: HTMLVideoElement): () => void {
  const offset = HERO_VIDEO_START_OFFSET_SEC;

  const onTimeUpdate = () => {
    if (!video.loop) return;
    const { duration } = video;
    if (!Number.isFinite(duration) || duration <= offset) return;
    if (video.currentTime < offset - 0.35) {
      video.currentTime = offset;
    }
  };

  video.addEventListener('timeupdate', onTimeUpdate);
  return () => video.removeEventListener('timeupdate', onTimeUpdate);
}

export function notifyHeroVideoPrime(video: HTMLVideoElement): void {
  applyHeroVideoStartOffset(video);
  video.dispatchEvent(new CustomEvent(HERO_VIDEO_PRIME_EVENT, { bubbles: true }));
}
