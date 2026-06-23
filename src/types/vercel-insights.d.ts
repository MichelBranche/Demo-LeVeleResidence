/**
 * @vercel/speed-insights non dichiara `types` nel campo `exports` di `./react`.
 * Con moduleResolution "bundler" alcuni IDE non risolvono typesVersions: questo shim
 * allinea TypeScript al runtime (dist/react/index.mjs).
 */
declare module '@vercel/speed-insights/react' {
  import type { JSX } from 'react';

  export interface SpeedInsightsProps {
    dsn?: string;
    sampleRate?: number;
    route?: string | null;
    framework?: string;
    debug?: boolean;
    scriptSrc?: string;
    endpoint?: string;
    beforeSend?: (
      event: { type: 'vital'; url: string; route?: string },
    ) => { type: 'vital'; url: string; route?: string } | null | undefined | false;
  }

  export function SpeedInsights(props?: SpeedInsightsProps): JSX.Element | null;
  export function computeRoute(
    pathname: string | null,
    pathParams: Record<string, string | string[]> | null,
  ): string | null;
}
