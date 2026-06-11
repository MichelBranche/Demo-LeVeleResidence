import { useEffect, type RefObject } from 'react';
import {
  canPlayNativeHls,
  isHlsVideoUrl,
  notifyHeroVideoPrime,
} from '../lib/heroVideo';

/** Collega MP4 o stream HLS (Mux) al <video> hero — con hls.js dove serve. */
export function useHeroVideoSource(
  videoRef: RefObject<HTMLVideoElement | null>,
  url: string | undefined,
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return undefined;

    video.crossOrigin = 'anonymous';

    const onMetadata = () => notifyHeroVideoPrime(video);

    if (!isHlsVideoUrl(url)) {
      video.addEventListener('loadedmetadata', onMetadata, { once: true });
      if (video.src !== url) {
        video.src = url;
        void video.load();
      }
      return () => video.removeEventListener('loadedmetadata', onMetadata);
    }

    if (canPlayNativeHls(video)) {
      video.addEventListener('loadedmetadata', onMetadata, { once: true });
      if (video.src !== url) {
        video.src = url;
        void video.load();
      }
      return () => video.removeEventListener('loadedmetadata', onMetadata);
    }

    let cancelled = false;
    let hls: { destroy: () => void } | null = null;

    void import('hls.js').then(({ default: Hls }) => {
      if (cancelled || !videoRef.current) return;

      if (!Hls.isSupported()) {
        video.src = url;
        void video.load();
        return;
      }

      const instance = new Hls({ enableWorker: true });
      hls = instance;
      instance.on(Hls.Events.MANIFEST_PARSED, () => notifyHeroVideoPrime(video));
      video.addEventListener('loadedmetadata', onMetadata, { once: true });
      instance.loadSource(url);
      instance.attachMedia(video);
    });

    return () => {
      cancelled = true;
      video.removeEventListener('loadedmetadata', onMetadata);
      hls?.destroy();
    };
  }, [videoRef, url]);
}
