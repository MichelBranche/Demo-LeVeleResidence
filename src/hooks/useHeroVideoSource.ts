import { useEffect, type RefObject } from 'react';
import {
  bindHeroVideoLoopOffset,
  canPlayNativeHls,
  HERO_VIDEO_START_OFFSET_SEC,
  isHlsVideoUrl,
  loadHlsModule,
  notifyHeroVideoPrime,
} from '../lib/heroVideo';

function tryPlay(video: HTMLVideoElement) {
  if (video.paused) {
    void video.play().then(() => {
      video.classList.add('is-playing');
    }).catch(() => {});
  } else {
    video.classList.add('is-playing');
  }
}

/** Collega MP4 o stream HLS (Mux) al <video> hero — con hls.js dove serve. */
export function useHeroVideoSource(
  videoRef: RefObject<HTMLVideoElement | null>,
  url: string | undefined,
  enabled = true,
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video || !url) return undefined;

    video.crossOrigin = 'anonymous';
    video.classList.remove('is-playing');
    const unbindLoopOffset = bindHeroVideoLoopOffset(video);

    const onMetadata = () => {
      notifyHeroVideoPrime(video);
      tryPlay(video);
    };

    if (!isHlsVideoUrl(url)) {
      video.addEventListener('loadedmetadata', onMetadata, { once: true });
      video.addEventListener('canplay', () => tryPlay(video), { once: true });
      if (video.src !== url) {
        video.src = url;
        void video.load();
      }
      return () => {
        video.removeEventListener('loadedmetadata', onMetadata);
        unbindLoopOffset();
      };
    }

    if (canPlayNativeHls(video)) {
      video.addEventListener('loadedmetadata', onMetadata, { once: true });
      video.addEventListener('canplay', () => tryPlay(video), { once: true });
      if (video.src !== url) {
        video.src = url;
        void video.load();
      }
      return () => {
        video.removeEventListener('loadedmetadata', onMetadata);
        unbindLoopOffset();
      };
    }

    let cancelled = false;
    let hls: { destroy: () => void } | null = null;

    void loadHlsModule().then(({ default: Hls }) => {
      if (cancelled || !videoRef.current) return;

      if (!Hls.isSupported()) {
        video.src = url;
        void video.load();
        return;
      }

      const instance = new Hls({
        enableWorker: true,
        startPosition: HERO_VIDEO_START_OFFSET_SEC,
        maxBufferLength: 20,
        maxMaxBufferLength: 40,
      });
      hls = instance;
      instance.on(Hls.Events.MANIFEST_PARSED, () => {
        notifyHeroVideoPrime(video);
        tryPlay(video);
      });
      video.addEventListener('loadedmetadata', onMetadata, { once: true });
      instance.loadSource(url);
      instance.attachMedia(video);
    });

    return () => {
      cancelled = true;
      video.removeEventListener('loadedmetadata', onMetadata);
      unbindLoopOffset();
      hls?.destroy();
    };
  }, [videoRef, url, enabled]);
}
