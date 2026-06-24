import { Link } from 'react-router-dom';
import {
  formatBookingTime,
  formatStayRange,
  formatSubmittedAt,
  nightsBetween,
} from '../../lib/bookingDateTime';
import type { BookingReceipt } from '../../lib/bookingReceipt';
import type { SiteLocale } from '../../lib/siteLocales';

export type BookingConfirmationLabels = {
  successEyebrow: string;
  successHeadline: string;
  successLead: string;
  receiptTitle: string;
  receiptReference: string;
  receiptSubmitted: string;
  receiptStay: string;
  receiptNightsOne: string;
  receiptNightsMany: string;
  receiptAccommodation: string;
  receiptGuests: string;
  receiptArrival: string;
  receiptContact: string;
  receiptMessage: string;
  successNextTitle: string;
  successNextBody: string;
  anotherRequest: string;
  backHome: string;
};

type Props = {
  receipt: BookingReceipt;
  locale: SiteLocale;
  labels: BookingConfirmationLabels;
  onAnotherRequest: () => void;
};

function fill(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;

  return (
    <div className="booking-confirm__row">
      <dt className="booking-confirm__row-label">{label}</dt>
      <dd className="booking-confirm__row-value">{value}</dd>
    </div>
  );
}

export function BookingConfirmation({ receipt, locale, labels, onAnotherRequest }: Props) {
  const guestName = `${receipt.firstName} ${receipt.lastName}`.trim();
  const nights = nightsBetween(receipt.checkIn, receipt.checkOut);
  const nightsLabel =
    nights === 1 ? labels.receiptNightsOne : fill(labels.receiptNightsMany, { n: nights });
  const stayValue = [formatStayRange(receipt.checkIn, receipt.checkOut, locale), nights > 0 ? nightsLabel : '']
    .filter(Boolean)
    .join(' · ');

  return (
    <section className="booking-confirm" aria-labelledby="booking-confirm-title">
      <div className="booking-confirm__glow" aria-hidden />

      <header className="booking-confirm__hero">
        <div className="booking-confirm__mark" aria-hidden>
          <span className="booking-confirm__mark-ring" />
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
            <path
              d="M7.5 14.25 11.75 18.5 20.5 9.75"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="booking-confirm__eyebrow">{labels.successEyebrow}</p>
        <h2 id="booking-confirm-title" className="booking-confirm__title display-serif">
          {labels.successHeadline}
        </h2>
        <p className="booking-confirm__lead">
          {fill(labels.successLead, { name: receipt.firstName || guestName })}
        </p>
      </header>

      <article className="booking-confirm__receipt" aria-labelledby="booking-receipt-title">
        <div className="booking-confirm__receipt-head">
          <p id="booking-receipt-title" className="booking-confirm__receipt-eyebrow">
            {labels.receiptTitle}
          </p>
          <p className="booking-confirm__reference">
            <span>{labels.receiptReference}</span>
            <strong>{receipt.reference}</strong>
          </p>
        </div>

        <dl className="booking-confirm__details">
          <ReceiptRow
            label={labels.receiptSubmitted}
            value={formatSubmittedAt(receipt.submittedAt, locale)}
          />
          <ReceiptRow label={labels.receiptStay} value={stayValue} />
          <ReceiptRow label={labels.receiptAccommodation} value={receipt.accommodationLabel} />
          <ReceiptRow
            label={labels.receiptGuests}
            value={fill(labels.receiptGuests, { n: receipt.guests })}
          />
          <ReceiptRow
            label={labels.receiptArrival}
            value={receipt.arrivalTime ? formatBookingTime(receipt.arrivalTime) : ''}
          />
          <ReceiptRow
            label={labels.receiptContact}
            value={[guestName, receipt.email, receipt.phone].filter(Boolean).join(' · ')}
          />
          <ReceiptRow label={labels.receiptMessage} value={receipt.message.trim()} />
        </dl>

        <div className="booking-confirm__wave" aria-hidden>
          <svg viewBox="0 0 320 24" preserveAspectRatio="none">
            <path
              d="M0 14c26.7-10 53.3-10 80 0s53.3 10 80 0 53.3-10 80 0 53.3 10 80 0v10H0v-10Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </article>

      <div className="booking-confirm__next">
        <h3 className="booking-confirm__next-title">{labels.successNextTitle}</h3>
        <p className="booking-confirm__next-body">{labels.successNextBody}</p>
      </div>

      <div className="booking-confirm__actions">
        <button type="button" className="booking-page__submit" onClick={onAnotherRequest}>
          <span>{labels.anotherRequest}</span>
        </button>
        <Link to="/" className="booking-confirm__home-link">
          {labels.backHome}
        </Link>
      </div>
    </section>
  );
}
