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
    default:
      return null;
  }
}
