import { useId, type ReactNode } from 'react';
import type { SiteLocale } from '../lib/siteLocales';

type FlagIconProps = {
  locale: SiteLocale;
  className?: string;
};

function FlagSvg({
  className,
  children,
  clipId,
}: {
  className: string;
  children: ReactNode;
  clipId: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{children}</g>
    </svg>
  );
}

/** Bandiere circolari per il selettore lingua. EN = croce di San Giorgio (Inghilterra). */
export function FlagIcon({ locale, className = '' }: FlagIconProps) {
  const clipId = `flag-${useId().replace(/:/g, '')}`;

  switch (locale) {
    case 'it':
      return (
        <FlagSvg className={className} clipId={clipId}>
          <rect width="8" height="24" fill="#009246" />
          <rect x="8" width="8" height="24" fill="#fff" />
          <rect x="16" width="8" height="24" fill="#ce2b37" />
        </FlagSvg>
      );
    case 'en':
      return (
        <FlagSvg className={className} clipId={clipId}>
          <rect width="24" height="24" fill="#fff" />
          <path fill="#ce1020" d="M11 0h2v24h-2zM0 11h24v2H0z" />
        </FlagSvg>
      );
    case 'de':
      return (
        <FlagSvg className={className} clipId={clipId}>
          <rect width="24" height="8" fill="#000" />
          <rect y="8" width="24" height="8" fill="#dd0000" />
          <rect y="16" width="24" height="8" fill="#ffce00" />
        </FlagSvg>
      );
    case 'fr':
      return (
        <FlagSvg className={className} clipId={clipId}>
          <rect width="8" height="24" fill="#002395" />
          <rect x="8" width="8" height="24" fill="#fff" />
          <rect x="16" width="8" height="24" fill="#ed2939" />
        </FlagSvg>
      );
    case 'es':
      return (
        <FlagSvg className={className} clipId={clipId}>
          <rect width="24" height="6" fill="#aa151b" />
          <rect y="6" width="24" height="12" fill="#f1bf00" />
          <rect y="18" width="24" height="6" fill="#aa151b" />
        </FlagSvg>
      );
    case 'ru':
      return (
        <FlagSvg className={className} clipId={clipId}>
          <rect width="24" height="8" fill="#fff" />
          <rect y="8" width="24" height="8" fill="#0039a6" />
          <rect y="16" width="24" height="8" fill="#d52b1e" />
        </FlagSvg>
      );
    case 'zh':
      return (
        <FlagSvg className={className} clipId={clipId}>
          <rect width="24" height="24" fill="#de2910" />
          <polygon
            fill="#ffde00"
            points="6,4 6.9,6.8 9.8,6.8 7.4,8.6 8.3,11.4 6,9.6 3.7,11.4 4.6,8.6 2.2,6.8 5.1,6.8"
          />
          <polygon fill="#ffde00" points="11,2 11.35,2.9 12.3,2.9 11.55,3.55 11.9,4.45 11,3.8 10.1,4.45 10.45,3.55 9.7,2.9 10.65,2.9" />
          <polygon fill="#ffde00" points="12.5,4.5 12.85,5.4 13.8,5.4 13.05,6.05 13.4,6.95 12.5,6.3 11.6,6.95 11.95,6.05 11.2,5.4 12.15,5.4" />
          <polygon fill="#ffde00" points="12.5,8 12.85,8.9 13.8,8.9 13.05,9.55 13.4,10.45 12.5,9.8 11.6,10.45 11.95,9.55 11.2,8.9 12.15,8.9" />
          <polygon fill="#ffde00" points="11,10 11.35,10.9 12.3,10.9 11.55,11.55 11.9,12.45 11,11.8 10.1,12.45 10.45,11.55 9.7,10.9 10.65,10.9" />
        </FlagSvg>
      );
    default:
      return null;
  }
}
