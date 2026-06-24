export type BookingFieldIconId =
  | 'check-in'
  | 'check-out'
  | 'arrival-time'
  | 'accommodation'
  | 'guests'
  | 'first-name'
  | 'last-name'
  | 'email'
  | 'phone'
  | 'message'
  | 'picker-date'
  | 'picker-time';

type Props = {
  id: BookingFieldIconId;
  className?: string;
};

const shared = {
  fill: 'none' as const,
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true as const,
};

export function BookingFieldIcon({ id, className }: Props) {
  switch (id) {
    case 'check-in':
      return (
        <svg {...shared} className={className} width={18} height={18} viewBox="0 0 18 18">
          <rect x="2.5" y="4" width="13" height="11.5" rx="1.75" stroke="currentColor" strokeWidth="1.15" />
          <path d="M2.5 7.25h13" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
          <path
            d="M6 2.75v2.25M12 2.75v2.25M6.25 10.25l1.5 1.5 3.5-3.75"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'check-out':
      return (
        <svg {...shared} className={className} width={18} height={18} viewBox="0 0 18 18">
          <rect x="2.5" y="4" width="13" height="11.5" rx="1.75" stroke="currentColor" strokeWidth="1.15" />
          <path d="M2.5 7.25h13" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
          <path
            d="M6 2.75v2.25M12 2.75v2.25M7.25 12.75h3.5M8.5 11.5v2.5"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'arrival-time':
      return (
        <svg {...shared} className={className} width={18} height={18} viewBox="0 0 18 18">
          <circle cx="9" cy="9.5" r="5.75" stroke="currentColor" strokeWidth="1.15" />
          <path
            d="M9 6.75v3l2 1.25M13.75 3.5l.5 1M4.25 3.5l-.5 1"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'accommodation':
      return (
        <svg {...shared} className={className} width={18} height={18} viewBox="0 0 18 18">
          <path
            d="M3 13.5V8.25L9 4.5l6 3.75V13.5M5.25 13.5V10.5h7.5v3M7.5 13.5v-1.5h3v1.5"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 10.5c1.1-.85 2.1-1.25 3.25-1.25S7.15 9.9 8.25 10.5s2.15 1.25 3.25 1.25 2.15-.4 3.25-1.25"
            stroke="currentColor"
            strokeWidth="1.05"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      );
    case 'guests':
      return (
        <svg {...shared} className={className} width={18} height={18} viewBox="0 0 18 18">
          <circle cx="6.75" cy="6.25" r="2.1" stroke="currentColor" strokeWidth="1.15" />
          <circle cx="12.25" cy="7" r="1.75" stroke="currentColor" strokeWidth="1.15" />
          <path
            d="M3.25 14.25c.55-2.05 1.75-3.1 3.5-3.1s2.95 1.05 3.5 3.1M10.75 14c.35-1.55 1.2-2.35 2.5-2.35"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'first-name':
      return (
        <svg {...shared} className={className} width={18} height={18} viewBox="0 0 18 18">
          <circle cx="9" cy="6.25" r="2.75" stroke="currentColor" strokeWidth="1.15" />
          <path
            d="M4.25 15c.85-2.65 2.45-4 4.75-4s3.9 1.35 4.75 4"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'last-name':
      return (
        <svg {...shared} className={className} width={18} height={18} viewBox="0 0 18 18">
          <rect x="3.5" y="4.25" width="11" height="9.5" rx="1.5" stroke="currentColor" strokeWidth="1.15" />
          <path
            d="M6.25 8h5.5M6.25 10.5h3.25"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'email':
      return (
        <svg {...shared} className={className} width={18} height={18} viewBox="0 0 18 18">
          <rect x="2.5" y="5" width="13" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.15" />
          <path
            d="M3.25 5.75 9 10.25l5.75-4.5"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'phone':
      return (
        <svg {...shared} className={className} width={18} height={18} viewBox="0 0 18 18">
          <path
            d="M5.75 3.5h2.1l1.05 2.45-1.35 1.05a7.2 7.2 0 0 0 3.5 3.5l1.05-1.35 2.45 1.05v2.1a1.25 1.25 0 0 1-1.25 1.25A10.5 10.5 0 0 1 4.5 4.75 1.25 1.25 0 0 1 5.75 3.5Z"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'message':
      return (
        <svg {...shared} className={className} width={18} height={18} viewBox="0 0 18 18">
          <path
            d="M3.25 4.75h11.5a1.25 1.25 0 0 1 1.25 1.25v5.5a1.25 1.25 0 0 1-1.25 1.25H8.5L5 15.25V12.75H3.25A1.25 1.25 0 0 1 2 11.5V6a1.25 1.25 0 0 1 1.25-1.25Z"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinejoin="round"
          />
          <path
            d="M3.5 14.75c1-.75 1.9-1.1 2.85-1.1s1.85.35 2.85 1.1"
            stroke="currentColor"
            strokeWidth="1.05"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      );
    case 'picker-date':
      return (
        <svg {...shared} className={className} width={16} height={16} viewBox="0 0 16 16">
          <rect x="2" y="3.25" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M2 6h12M5 1.75V4M11 1.75V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="8" cy="9" r="1.1" fill="currentColor" />
        </svg>
      );
    case 'picker-time':
      return (
        <svg {...shared} className={className} width={16} height={16} viewBox="0 0 16 16">
          <circle cx="8" cy="8.5" r="5.25" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 5.75V8.5l2 1.15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
