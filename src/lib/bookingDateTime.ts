import { differenceInCalendarDays, format, isValid, parseISO, startOfDay } from 'date-fns';
import { de, enUS, es, fr, it, ru, zhCN, type Locale } from 'date-fns/locale';
import {
  de as rdpDe,
  enUS as rdpEnUS,
  es as rdpEs,
  fr as rdpFr,
  it as rdpIt,
  ru as rdpRu,
  zhCN as rdpZhCN,
  type DayPickerLocale,
} from 'react-day-picker/locale';
import type { SiteLocale } from './siteLocales';

const DISPLAY_LOCALE: Record<SiteLocale, Locale> = {
  it,
  en: enUS,
  de,
  fr,
  es,
  ru,
  zh: zhCN,
};

export const DAY_PICKER_LOCALE: Record<SiteLocale, DayPickerLocale> = {
  it: rdpIt,
  en: rdpEnUS,
  de: rdpDe,
  fr: rdpFr,
  es: rdpEs,
  ru: rdpRu,
  zh: rdpZhCN,
};

export function isoToDate(iso: string): Date | undefined {
  if (!iso) return undefined;
  const parsed = parseISO(iso);
  return isValid(parsed) ? startOfDay(parsed) : undefined;
}

export function dateToIso(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function parseMinIso(iso: string): Date {
  const parsed = isoToDate(iso);
  return parsed ?? startOfDay(new Date());
}

export function formatBookingDate(iso: string, locale: SiteLocale): string {
  const date = isoToDate(iso);
  if (!date) return '';
  return format(date, 'd MMMM yyyy', { locale: DISPLAY_LOCALE[locale] });
}

export function formatBookingTime(value: string): string {
  if (!value) return '';
  const [hour, minute] = value.split(':');
  if (!hour || !minute) return value;
  return `${hour}:${minute}`;
}

export const BOOKING_TIME_HOURS = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] as const;
export const BOOKING_TIME_MINUTES = [0, 15, 30, 45] as const;

export function composeBookingTime(hour: number, minute: number): string {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export function parseBookingTime(value: string): { hour: number; minute: number } | null {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);
  if (!match) return null;
  return { hour: Number.parseInt(match[1], 10), minute: Number.parseInt(match[2], 10) };
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const start = isoToDate(checkIn);
  const end = isoToDate(checkOut);
  if (!start || !end) return 0;
  return Math.max(0, differenceInCalendarDays(end, start));
}

export function formatStayRange(checkIn: string, checkOut: string, locale: SiteLocale): string {
  const start = isoToDate(checkIn);
  const end = isoToDate(checkOut);
  if (!start || !end) return '';

  const displayLocale = DISPLAY_LOCALE[locale];
  const sameMonth = format(start, 'yyyy-MM', { locale: displayLocale }) === format(end, 'yyyy-MM', { locale: displayLocale });

  if (sameMonth) {
    return `${format(start, 'd', { locale: displayLocale })} – ${format(end, 'd MMMM yyyy', { locale: displayLocale })}`;
  }

  return `${formatBookingDate(checkIn, locale)} – ${formatBookingDate(checkOut, locale)}`;
}

export function createBookingReference(date = new Date()): string {
  const stamp = format(date, 'yyyyMMdd');
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LV-${stamp}-${suffix}`;
}

export function formatSubmittedAt(iso: string, locale: SiteLocale): string {
  const parsed = parseISO(iso);
  if (!isValid(parsed)) return '';
  return format(parsed, 'd MMMM yyyy · HH:mm', { locale: DISPLAY_LOCALE[locale] });
}
