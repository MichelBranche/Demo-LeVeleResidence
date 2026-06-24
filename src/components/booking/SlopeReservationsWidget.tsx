import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import {
  destroySlopeReservationWidgets,
  ensureSlopeWidgetAssets,
  initSlopeReservationWidgets,
} from '../../lib/loadSlopeWidget';
import {
  buildSlopeSearchAction,
  getSlopeDateRequiredMessage,
  getSlopePropertyId,
  getSlopeWidgetLabels,
  toSlopeBookingLocale,
  type SlopeWidgetLabels,
} from '../../lib/slope';
import type { SiteLocale } from '../../lib/siteLocales';
import { SlopeGuestsSelector } from './SlopeGuestsSelector';
import '../../styles/slope-widget.css';

type SlopeReservationsWidgetProps = {
  locale: SiteLocale;
};

function CalendarArrowIcon() {
  return (
    <svg
      style={{ width: 30, height: 30 }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
      aria-hidden
    >
      <path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z" />
    </svg>
  );
}

function SlopeReservationForm({
  labels,
  formAction,
  slopeLocale,
  onSubmit,
}: {
  labels: SlopeWidgetLabels;
  formAction: string;
  slopeLocale: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <>
      <div id="slope-widgets-config" data-language={slopeLocale} data-min-days="" />
      <div className="slope-widgets-container" data-widget-count>
        <form action={formAction} method="POST" onSubmit={onSubmit}>
          <div className="slp-force-mobile-layout slope-block">
            <div className="slope-reservation-dates" data-min-days="">
              <div
                className="slope-reservation-section-container slope-check-in slope-highlight"
                data-lang={slopeLocale}
              >
                <div className="slope-check-in-wrapper">
                  <span className="slope-check-in-label">{labels.checkIn}</span>
                  <span className="slope-check-in-date" />
                  <input
                    className="slope-check-in-input"
                    name="reservation[stay][arrival]"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="slope-reservation-icon-container">
                <CalendarArrowIcon />
              </div>

              <div
                className="slope-reservation-section-container slope-check-out slope-highlight"
                data-lang={slopeLocale}
              >
                <div className="slope-check-out-wrapper">
                  <span className="slope-check-out-label">{labels.checkOut}</span>
                  <span className="slope-check-out-date" />
                  <input
                    className="slope-check-out-input"
                    name="reservation[stay][departure]"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            <div className="slope-vertical-divider" />
            <div className="slope-horizontal-separator" />

            <div className="slope-guests-and-button-container">
              <div className="slope-reservation-section-container slope-highlight" data-lang={slopeLocale}>
                <div className="slope-guests-wrapper">
                  <SlopeGuestsSelector labels={labels} slopeLocale={slopeLocale} />
                </div>
              </div>

              <div className="slope-reservation-section-container slope-submit-section">
                <input
                  className="slope-reservation-submit"
                  type="submit"
                  formTarget="_self"
                  value={labels.submit}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export function SlopeReservationsWidget({ locale }: SlopeReservationsWidgetProps) {
  const mountId = useId();
  const mountRef = useRef<HTMLDivElement>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const slopeLocale = toSlopeBookingLocale(locale);
  const labels = getSlopeWidgetLabels(locale);
  const formAction = buildSlopeSearchAction(getSlopePropertyId(), slopeLocale);
  const dateRequiredMessage = getSlopeDateRequiredMessage(locale);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const arrival = event.currentTarget
      .querySelector<HTMLInputElement>('.slope-check-in-input')
      ?.value.trim();
    const departure = event.currentTarget
      .querySelector<HTMLInputElement>('.slope-check-out-input')
      ?.value.trim();

    if (!arrival || !departure) {
      event.preventDefault();
      setSubmitError(dateRequiredMessage);
      return;
    }

    setSubmitError(null);
  };

  useEffect(() => {
    let cancelled = false;
    const root = mountRef.current;

    void ensureSlopeWidgetAssets()
      .then(() => {
        if (cancelled || !root) return;

        const runInit = () => {
          if (cancelled || !mountRef.current) return;
          initSlopeReservationWidgets(mountRef.current);
        };

        requestAnimationFrame(() => {
          requestAnimationFrame(runInit);
        });
      })
      .catch(() => {
        /* asset load failure — widget stays as static form */
      });

    return () => {
      cancelled = true;
      if (root) destroySlopeReservationWidgets(root);
    };
  }, [slopeLocale, mountId]);

  return (
    <div ref={mountRef} className="slope-widget-mount" data-slope-mount={mountId}>
      {submitError ? (
        <p className="slope-widget-mount__error" role="alert">
          {submitError}
        </p>
      ) : null}
      <SlopeReservationForm
        key={slopeLocale}
        labels={labels}
        formAction={formAction}
        slopeLocale={slopeLocale}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
