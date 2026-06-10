import {
  Bike,
  Bus,
  Map,
  Mountain,
  Ship,
  Shirt,
  Sparkles,
  Tv,
  Waves,
  Wifi,
  Wind,
  type LucideProps,
} from 'lucide-react';
import type { ResidenceServiceIconId } from '../lib/residenceServiceIcons';

type Props = {
  id: ResidenceServiceIconId;
  className?: string;
};

const iconProps: LucideProps = { size: 20, strokeWidth: 1.5, 'aria-hidden': true };

function LuggageGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 20h12M9 20V8a3 3 0 0 1 6 0v12M9 8H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M15 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
    </svg>
  );
}

function TennisGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5c2.8 3 2.8 14 0 17M12 3.5c-2.8 3-2.8 14 0 17" />
    </svg>
  );
}

function BedGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 11h18M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M7 11v8M17 11v8M10 19h4" />
    </svg>
  );
}

export function ResidenceServiceIcon({ id, className }: Props) {
  switch (id) {
    case 'luggage':
      return <LuggageGlyph className={className} />;
    case 'tv':
      return <Tv {...iconProps} className={className} />;
    case 'courtesy-kit':
      return <Sparkles {...iconProps} className={className} />;
    case 'ac':
      return <Wind {...iconProps} className={className} />;
    case 'wifi':
      return <Wifi {...iconProps} className={className} />;
    case 'extra-cleaning':
      return <BedGlyph className={className} />;
    case 'laundry':
      return <Shirt {...iconProps} className={className} />;
    case 'transport':
      return <Bus {...iconProps} className={className} />;
    case 'tennis':
      return <TennisGlyph className={className} />;
    case 'bike-rental':
      return <Bike {...iconProps} className={className} />;
    case 'boat-rental':
      return <Ship {...iconProps} className={className} />;
    case 'diving':
      return <Waves {...iconProps} className={className} />;
    case 'asinara':
      return <Mountain {...iconProps} className={className} />;
    case 'guided-tours':
      return <Map {...iconProps} className={className} />;
    default:
      return null;
  }
}
