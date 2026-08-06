/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical production origin for SEO (canonical, OG, JSON-LD). */
  readonly VITE_SITE_URL?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_MUX_HERO_PLAYBACK_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
