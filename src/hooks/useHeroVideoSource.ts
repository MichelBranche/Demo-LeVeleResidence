import { useEffect, type RefObject } from 'react';
import { canPlayNativeHls, isHlsVideoUrl } from '../lib/heroVideo';

/** Collega MP4 o stream HLS (Mux) al <video> hero — con hls.js dove serve. */
export function useHeroVideoSource(
  videoRef: RefObject<HTMLVideoElement | null>,
  url: string | undefined,
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return undefined;

    video.crossOrigin = 'anonymous';

    if (!isHlsVideoUrl(url)) {
      if (video.src !== url) {
        video.src = url;
        void video.load();
      }
      return undefined;
    }

    if (canPlayNativeHls(video)) {
      if (video.src !== url) {
        video.src = url;
        void video.load();
      }
      return undefined;
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
      instance.loadSource(url);
      instance.attachMedia(video);
    });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [videoRef, url]);
}
