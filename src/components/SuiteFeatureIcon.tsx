import type { SuiteFeatureIconId } from '../lib/suiteFeatureIcons';

type Props = {
  id: SuiteFeatureIconId;
  className?: string;
};

const shared = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true as const,
};

export function SuiteFeatureIcon({ id, className }: Props) {
  switch (id) {
    case 'terrace':
      return (
        <svg {...shared} className={className}>
          <path
            d="M2.5 11.5h11M4 11.5V6.5l4-3 4 3v5M6.5 11.5V9h3v2.5"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'sea':
      return (
        <svg {...shared} className={className}>
          <path
            d="M2 10.5c1.2-1 2.3-1.5 3.5-1.5S7.8 9.8 9 10.5s2.3 1.5 3.5 1.5M2 7.5c1.2-1 2.3-1.5 3.5-1.5S7.8 6.8 9 7.5s2.3 1.5 3.5 1.5"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'bunk':
      return (
        <svg {...shared} className={className}>
          <path
            d="M2.5 11V8.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2V11M2.5 11h11M5 6.5V4.5h2.5v2"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'bath':
      return (
        <svg {...shared} className={className}>
          <path
            d="M3.5 9.5h9M4.5 9.5V7a3.5 3.5 0 0 1 7 0v2.5M6 12.5h4"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'veranda':
      return (
        <svg {...shared} className={className}>
          <path
            d="M2.5 11.5h11M3.5 11.5V7l4.5-2.5L12.5 7v4.5M8 4.5v7"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'garden':
      return (
        <svg {...shared} className={className}>
          <path
            d="M8 12.5V6M5.5 8.5c0-1.8 1.1-3 2.5-3.5M10.5 8.5c0-1.8-1.1-3-2.5-3.5M3 12.5h10"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'kitchen':
      return (
        <svg {...shared} className={className}>
          <path
            d="M4 5.5h8v7H4zM6 5.5V4M10 5.5V4M6.5 8.5h3"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'ac':
      return (
        <svg {...shared} className={className}>
          <path
            d="M8 2.5v11M5 5.5l3-3 3 3M5 10.5l3 3 3-3M2.5 8h11"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'wifi':
      return (
        <svg {...shared} className={className}>
          <path
            d="M3 7.5a6.5 6.5 0 0 1 10 0M5.5 10a3.5 3.5 0 0 1 5 0M8 12.5h.01"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}
