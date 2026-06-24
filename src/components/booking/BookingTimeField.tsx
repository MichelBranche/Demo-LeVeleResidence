import { useEffect, useState } from 'react';
import { useBookingPopover } from '../../hooks/useBookingPopover';
import {
  BOOKING_TIME_HOURS,
  BOOKING_TIME_MINUTES,
  composeBookingTime,
  formatBookingTime,
  parseBookingTime,
} from '../../lib/bookingDateTime';
import { BookingFieldControl } from '../BookingFieldControl';

type Props = {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  pickerLabel: string;
  popoverLabel: string;
  hourLabel: string;
  minuteLabel: string;
  clearLabel: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function BookingTimeField({
  id,
  name,
  value,
  placeholder,
  pickerLabel,
  popoverLabel,
  hourLabel,
  minuteLabel,
  clearLabel,
  disabled,
  onChange,
}: Props) {
  const parsed = parseBookingTime(value);
  const { open, toggle, close, anchorRef, popoverRef, popoverId } = useBookingPopover();
  const [hour, setHour] = useState<number | null>(parsed?.hour ?? null);
  const [minute, setMinute] = useState<number | null>(parsed?.minute ?? null);

  useEffect(() => {
    const next = parseBookingTime(value);
    setHour(next?.hour ?? null);
    setMinute(next?.minute ?? null);
  }, [value]);

  const displayValue = formatBookingTime(value);

  const applyTime = (nextHour: number, nextMinute: number) => {
    onChange(composeBookingTime(nextHour, nextMinute));
    close();
  };

  const handleHour = (nextHour: number) => {
    setHour(nextHour);
    if (minute !== null) applyTime(nextHour, minute);
  };

  const handleMinute = (nextMinute: number) => {
    setMinute(nextMinute);
    if (hour !== null) applyTime(hour, nextMinute);
  };

  const handleClear = () => {
    onChange('');
    setHour(null);
    setMinute(null);
    close();
  };

  return (
    <div ref={anchorRef} className="booking-page__popover-anchor">
      <BookingFieldControl
        icon="arrival-time"
        picker="time"
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
        <input type="hidden" name={name} value={value} readOnly />
      </BookingFieldControl>

      {open && !disabled && (
        <div
          ref={popoverRef}
          id={popoverId}
          className="booking-page__popover booking-page__popover--time"
          role="dialog"
          aria-modal="false"
          aria-label={popoverLabel}
        >
          <p className="booking-timepicker__section-label">{hourLabel}</p>
          <div className="booking-timepicker__grid" role="group" aria-label={hourLabel}>
            {BOOKING_TIME_HOURS.map((item) => (
              <button
                key={item}
                type="button"
                className={[
                  'booking-timepicker__pill',
                  hour === item ? 'booking-timepicker__pill--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleHour(item)}
                aria-pressed={hour === item}
              >
                {String(item).padStart(2, '0')}
              </button>
            ))}
          </div>

          <p className="booking-timepicker__section-label">{minuteLabel}</p>
          <div className="booking-timepicker__grid booking-timepicker__grid--minutes" role="group" aria-label={minuteLabel}>
            {BOOKING_TIME_MINUTES.map((item) => (
              <button
                key={item}
                type="button"
                className={[
                  'booking-timepicker__pill',
                  minute === item ? 'booking-timepicker__pill--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleMinute(item)}
                aria-pressed={minute === item}
              >
                {String(item).padStart(2, '0')}
              </button>
            ))}
          </div>

          {value && (
            <button type="button" className="booking-timepicker__clear" onClick={handleClear}>
              {clearLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
