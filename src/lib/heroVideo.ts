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
