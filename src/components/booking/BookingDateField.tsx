import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useBookingPopover } from '../../hooks/useBookingPopover';
import {
  dateToIso,
  DAY_PICKER_LOCALE,
  formatBookingDate,
  isoToDate,
  parseMinIso,
} from '../../lib/bookingDateTime';
import type { SiteLocale } from '../../lib/siteLocales';
import { BookingFieldControl } from '../BookingFieldControl';
import type { BookingFieldIconId } from '../BookingFieldIcon';

type Props = {
  id: string;
  name: string;
  icon: BookingFieldIconId;
  value: string;
  min: string;
  locale: SiteLocale;
  placeholder: string;
  pickerLabel: string;
  popoverLabel: string;
  required?: boolean;
  disabled?: boolean;
  align?: 'start' | 'end';
  onChange: (value: string) => void;
};

export function BookingDateField({
  id,
  name,
  icon,
  value,
  min,
  locale,
  placeholder,
  pickerLabel,
  popoverLabel,
  required,
  disabled,
  align = 'start',
  onChange,
}: Props) {
  const selected = isoToDate(value);
  const minDate = parseMinIso(min);
  const { open, toggle, close, anchorRef, popoverRef, popoverId } = useBookingPopover();
  const [month, setMonth] = useState<Date>(() => selected ?? minDate);

  useEffect(() => {
    if (selected) setMonth(selected);
  }, [selected]);

  const displayValue = value ? formatBookingDate(value, locale) : '';

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    onChange(dateToIso(date));
    close();
  };

  return (
    <div
      ref={anchorRef}
      className={[
        'booking-page__popover-anchor',
        align === 'end' ? 'booking-page__popover-anchor--end' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <BookingFieldControl
        icon={icon}
        picker="date"
        pickerLabel={pickerLabel}
        pickerActive={open}
        onPickerClick={disabled ? undefined : toggle}
      >
        <button
          type="button"
          id={id}
          className={[
            'booking-page__value-btn',
            !displayValue ? 'booking-page__value-btn--placeholder' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={disabled ? undefined : toggle}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={popoverId}
          disabled={disabled}
        >
          {displayValue || placeholder}
        </button>
        <input type="hidden" name={name} value={value} required={required} readOnly />
      </BookingFieldControl>

      {open && !disabled && (
        <div
          ref={popoverRef}
          id={popoverId}
          className="booking-page__popover booking-page__popover--date"
          role="dialog"
          aria-modal="false"
          aria-label={popoverLabel}
        >
          <DayPicker
            mode="single"
            locale={DAY_PICKER_LOCALE[locale]}
            month={month}
            onMonthChange={setMonth}
            selected={selected}
            onSelect={handleSelect}
            disabled={{ before: minDate }}
            showOutsideDays
            fixedWeeks
            className="booking-daypicker"
            components={{
              Chevron: ({ orientation, className }) => {
                if (orientation === 'left') {
                  return <ChevronLeft className={className} size={18} strokeWidth={1.75} aria-hidden />;
                }
                if (orientation === 'right') {
                  return <ChevronRight className={className} size={18} strokeWidth={1.75} aria-hidden />;
                }
                return <ChevronRight className={className} size={14} strokeWidth={1.75} aria-hidden />;
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
