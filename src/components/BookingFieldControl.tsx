import type { ReactNode } from 'react';
import { useRef } from 'react';
import { BookingFieldIcon, type BookingFieldIconId } from './BookingFieldIcon';

type PickerKind = 'date' | 'time';

type Props = {
  icon: BookingFieldIconId;
  picker?: PickerKind;
  pickerLabel?: string;
  pickerActive?: boolean;
  onPickerClick?: () => void;
  multiline?: boolean;
  className?: string;
  children: ReactNode;
};

export function BookingFieldControl({
  icon,
  picker,
  pickerLabel = '',
  pickerActive = false,
  onPickerClick,
  multiline,
  className = '',
  children,
}: Props) {
  const controlRef = useRef<HTMLDivElement>(null);

  const openNativePicker = () => {
    const input = controlRef.current?.querySelector('input');
    if (!input) return;

    if (typeof input.showPicker === 'function') {
      try {
        input.showPicker();
        return;
      } catch {
        /* Safari may throw if not user-gesture chained */
      }
    }

    input.focus();
    input.click();
  };

  const handlePickerClick = () => {
    if (onPickerClick) {
      onPickerClick();
      return;
    }
    openNativePicker();
  };

  const pickerAriaLabel =
    pickerLabel || (picker === 'date' ? 'Open calendar' : picker === 'time' ? 'Open time picker' : '');

  return (
    <div
      ref={controlRef}
      className={[
        'booking-page__control',
        picker ? `booking-page__control--picker booking-page__control--${picker}` : '',
        pickerActive ? 'booking-page__control--picker-open' : '',
        multiline ? 'booking-page__control--multiline' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="booking-page__control-icon">
        <BookingFieldIcon id={icon} />
      </span>
      {children}
      {picker && (
        <button
          type="button"
          className="booking-page__picker-btn"
          onClick={handlePickerClick}
          aria-label={pickerAriaLabel}
          tabIndex={-1}
        >
          <BookingFieldIcon id={picker === 'date' ? 'picker-date' : 'picker-time'} />
        </button>
      )}
    </div>
  );
}
