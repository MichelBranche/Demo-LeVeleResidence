import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAvailabilitySearch } from '../../booking/hooks/useAvailabilitySearch';
import { AvailabilityResultModal } from '../../booking/components/AvailabilityResultModal';
import {
  clearBookingDraft,
  loadBookingDraft,
  saveBookingDraft,
} from '../../booking/storage/bookingDraftStorage';

const MONTH_NAMES = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

const WEEKDAYS = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];

function addMonths(date, delta) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function sameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBetween(d, start, end) {
  if (!start || !end || !d) return false;
  const t = new Date(d).setHours(12, 0, 0, 0);
  const a = new Date(start).setHours(0, 0, 0, 0);
  const b = new Date(end).setHours(0, 0, 0, 0);
  return t > Math.min(a, b) && t < Math.max(a, b);
}

function startOfToday() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

function guestsMatch(a, b) {
  return (
    a.adults === b.adults && a.children === b.children && a.infants === b.infants
  );
}

function buildMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startOffset; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  while (cells.length < 42) cells.push(null);
  return cells;
}

/** Date nella pill (segmento Date + barra mobile): giorno, mese breve, anno. */
function formatPillIt(d) {
  if (!d) return '';
  return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Date nei riquadri check-in / check-out del popover: mese per esteso, più leggibile. */
function formatChipIt(d) {
  if (!d) return '';
  return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
}

function Stepper({ value, min, max, onChange, id }) {
  return (
    <div className="booking-stepper" role="group" {...(id ? { 'aria-labelledby': id } : {})}>
      <button
        type="button"
        className="booking-stepper-btn"
        aria-label="Diminuisci"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <span className="booking-stepper-value">{value}</span>
      <button
        type="button"
        className="booking-stepper-btn"
        aria-label="Aumenta"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}

function MonthGrid({ year, month, checkIn, checkOut, today, onPick }) {
  const grid = useMemo(() => buildMonthGrid(year, month), [year, month]);

  return (
    <div className="booking-cal-month">
      <p className="booking-cal-title">
        {MONTH_NAMES[month]} {year}
      </p>
      <div className="booking-cal-weekdays" aria-hidden="true">
        {WEEKDAYS.map((d, i) => (
          <span key={`${d}-${i}`} className="booking-cal-wd">
            {d}
          </span>
        ))}
      </div>
      <div className="booking-cal-cells">
        {grid.map((cell, idx) => {
          if (!cell) return <span key={`e-${year}-${month}-${idx}`} className="booking-cal-cell is-empty" />;
          const past = cell < today;
          const selIn = sameDay(cell, checkIn);
          const selOut = sameDay(cell, checkOut);
          const inRange = checkIn && checkOut && isBetween(new Date(cell), checkIn, checkOut);
          return (
            <button
              key={`${year}-${month}-${cell.getDate()}`}
              type="button"
              disabled={past}
              className={`booking-cal-cell${past ? ' is-past' : ''}${selIn || selOut ? ' is-edge' : ''}${
                inRange ? ' is-range' : ''
              }`}
              onClick={() => !past && onPick(cell)}
            >
              {cell.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BookingBar({ visible }) {
  const desktopRootRef = useRef(null);
  const mobileRootRef = useRef(null);
  const {
    runSearch,
    reset: resetSearch,
    hydrateSuccess,
    status: searchStatus,
    data: searchData,
    error: searchError,
  } = useAvailabilitySearch();
  const lastSearchSnapshotRef = useRef({
    response: null,
    checkIn: null,
    checkOut: null,
    guests: null,
  });
  const didHydrateDraft = useRef(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchValidationError, setSearchValidationError] = useState(null);
  const [showResumeHint, setShowResumeHint] = useState(false);
  const [activeSegment, setActiveSegment] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), 1);
  });
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState({ adults: 2, children: 0, infants: 0 });

  const today = useMemo(() => startOfToday(), []);

  /* Ripristino bozza (date, ospiti, ultima disponibilità) da localStorage */
  useEffect(() => {
    if (didHydrateDraft.current) return;
    didHydrateDraft.current = true;
    const draft = loadBookingDraft(today);
    if (!draft) return;
    if (draft.checkIn) setCheckIn(draft.checkIn);
    if (draft.checkOut) setCheckOut(draft.checkOut);
    setGuests(draft.guests);
    if (draft.checkIn) {
      setViewMonth(new Date(draft.checkIn.getFullYear(), draft.checkIn.getMonth(), 1));
    }
    if (draft.lastResponse) {
      hydrateSuccess(draft.lastResponse);
      lastSearchSnapshotRef.current = {
        response: draft.lastResponse,
        checkIn: draft.checkIn,
        checkOut: draft.checkOut,
        guests: { ...draft.guests },
      };
      setShowResumeHint(true);
    }
  }, [today, hydrateSuccess]);

  /* Salva subito dopo una ricerca riuscita (l’utente ha “visto” la disponibilità). */
  useEffect(() => {
    if (searchStatus !== 'success' || !searchData || !checkIn || !checkOut || checkOut <= checkIn) return;
    lastSearchSnapshotRef.current = {
      response: searchData,
      checkIn,
      checkOut,
      guests: { ...guests },
    };
    saveBookingDraft({ checkIn, checkOut, guests, lastResponse: searchData });
  }, [searchStatus, searchData, checkIn, checkOut, guests]);

  /* Debounce: salva date e ospiti anche senza nuova ricerca (ripresa prenotazione). */
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!checkIn && !checkOut) {
        clearBookingDraft();
        lastSearchSnapshotRef.current = {
          response: null,
          checkIn: null,
          checkOut: null,
          guests: null,
        };
        return;
      }
      const snap = lastSearchSnapshotRef.current;
      let lastResponse = null;
      if (
        snap.response &&
        checkIn &&
        checkOut &&
        snap.checkIn &&
        snap.checkOut &&
        sameDay(snap.checkIn, checkIn) &&
        sameDay(snap.checkOut, checkOut) &&
        snap.guests &&
        guestsMatch(snap.guests, guests)
      ) {
        lastResponse = snap.response;
      }
      saveBookingDraft({ checkIn, checkOut, guests, lastResponse });
    }, 500);
    return () => window.clearTimeout(id);
  }, [checkIn, checkOut, guests]);

  const leftMonth = viewMonth;
  const rightMonth = addMonths(viewMonth, 1);

  const pickDay = useCallback(
    (day) => {
      const d = new Date(day);
      d.setHours(0, 0, 0, 0);
      if (!checkIn || (checkIn && checkOut)) {
        setCheckIn(d);
        setCheckOut(null);
        return;
      }
      if (d < checkIn) {
        setCheckIn(d);
        setCheckOut(null);
        return;
      }
      if (sameDay(d, checkIn)) {
        setCheckOut(null);
        return;
      }
      setCheckOut(d);
    },
    [checkIn, checkOut],
  );

  const datesLabel =
    checkIn && checkOut
      ? `${formatPillIt(checkIn)} – ${formatPillIt(checkOut)}`
      : checkIn
        ? `${formatPillIt(checkIn)} – Aggiungi check-out`
        : 'Aggiungi date';

  const guestsLabel = useMemo(() => {
    const parts = [];
    parts.push(`${guests.adults} ${guests.adults === 1 ? 'adulto' : 'adulti'}`);
    if (guests.children) parts.push(`${guests.children} ${guests.children === 1 ? 'bambino' : 'bambini'}`);
    if (guests.infants) parts.push(`${guests.infants} ${guests.infants === 1 ? 'neonato' : 'neonati'}`);
    return parts.join(' · ');
  }, [guests]);

  const closeSearchModal = useCallback(() => {
    setSearchModalOpen(false);
    setSearchValidationError(null);
    /* Non azzerare la ricerca: resta in memoria e in localStorage per ripresa. */
  }, []);

  const goSearch = useCallback(async () => {
    setActiveSegment(null);
    setMobileOpen(false);

    if (!checkIn || !checkOut) {
      resetSearch();
      setSearchValidationError('Seleziona check-in e check-out per cercare la disponibilità.');
      setSearchModalOpen(true);
      return;
    }
    if (checkOut <= checkIn) {
      resetSearch();
      setSearchValidationError('La data di check-out deve essere successiva al check-in.');
      setSearchModalOpen(true);
      return;
    }

    setSearchValidationError(null);
    setSearchModalOpen(true);
    await runSearch({ checkIn, checkOut, guests });
  }, [checkIn, checkOut, guests, runSearch, resetSearch]);

  const retrySearch = useCallback(() => {
    if (!checkIn || !checkOut || checkOut <= checkIn) return;
    runSearch({ checkIn, checkOut, guests });
  }, [checkIn, checkOut, guests, runSearch]);

  useEffect(() => {
    if (!activeSegment && !mobileOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setActiveSegment(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeSegment, mobileOpen]);

  useEffect(() => {
    if (!activeSegment && !mobileOpen) return undefined;
    const onDown = (e) => {
      const t = e.target;
      const inDesktop = desktopRootRef.current?.contains(t);
      const inMobile = mobileRootRef.current?.contains(t);
      if (!inDesktop && !inMobile) {
        setActiveSegment(null);
        setMobileOpen(false);
      }
    };
    /* pointerdown copre mouse + touch + pen in un solo evento, così la
       chiusura avviene anche tappando fuori su mobile. */
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [activeSegment, mobileOpen]);

  const openSegment = (id) => {
    setActiveSegment((prev) => (prev === id ? null : id));
  };

  const segmentClass = (id) =>
    `booking-segment${activeSegment === id ? ' is-active' : ''}${activeSegment && activeSegment !== id ? ' is-dim' : ''}`;

  const searchIcon = (
    <svg className="booking-search-ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );

  const desktopPopover =
    activeSegment === 'dates' ? (
      <div className="booking-popover booking-popover-dates" role="dialog" aria-label="Seleziona le date">
        <div className="booking-cal-head">
          <button
            type="button"
            className="booking-cal-nav"
            aria-label="Mese precedente"
            onClick={() => setViewMonth((m) => addMonths(m, -1))}
          >
            ‹
          </button>
          <button
            type="button"
            className="booking-cal-nav"
            aria-label="Mese successivo"
            onClick={() => setViewMonth((m) => addMonths(m, 1))}
          >
            ›
          </button>
        </div>
        <div className="booking-cal-dual">
          <MonthGrid
            year={leftMonth.getFullYear()}
            month={leftMonth.getMonth()}
            checkIn={checkIn}
            checkOut={checkOut}
            today={today}
            onPick={pickDay}
          />
          <MonthGrid
            year={rightMonth.getFullYear()}
            month={rightMonth.getMonth()}
            checkIn={checkIn}
            checkOut={checkOut}
            today={today}
            onPick={pickDay}
          />
        </div>
        <div className="booking-cal-footer">
          <div className="booking-cal-chip">
            <span className="booking-cal-chip-label">Check-in</span>
            <span className="booking-cal-chip-value">{checkIn ? formatChipIt(checkIn) : 'Seleziona'}</span>
          </div>
          <div className="booking-cal-chip">
            <span className="booking-cal-chip-label">Check-out</span>
            <span className="booking-cal-chip-value">{checkOut ? formatChipIt(checkOut) : 'Seleziona'}</span>
          </div>
        </div>
      </div>
    ) : activeSegment === 'who' ? (
      <div className="booking-popover booking-popover-who" role="dialog" aria-label="Ospiti">
        <div className="booking-guest-row">
          <div>
            <p className="booking-guest-title">Adulti</p>
            <p className="booking-guest-sub" id="guest-adulti">
              Da 13 anni in su
            </p>
          </div>
          <Stepper
            id="guest-adulti"
            min={1}
            max={8}
            value={guests.adults}
            onChange={(n) => setGuests((g) => ({ ...g, adults: n }))}
          />
        </div>
        <div className="booking-guest-row">
          <div>
            <p className="booking-guest-title">Bambini</p>
            <p className="booking-guest-sub" id="guest-bambini">
              Da 2 a 12 anni
            </p>
          </div>
          <Stepper
            id="guest-bambini"
            min={0}
            max={6}
            value={guests.children}
            onChange={(n) => setGuests((g) => ({ ...g, children: n }))}
          />
        </div>
        <div className="booking-guest-row">
          <div>
            <p className="booking-guest-title">Neonati</p>
            <p className="booking-guest-sub" id="guest-neonati">
              Fino a 2 anni
            </p>
          </div>
          <Stepper
            id="guest-neonati"
            min={0}
            max={4}
            value={guests.infants}
            onChange={(n) => setGuests((g) => ({ ...g, infants: n }))}
          />
        </div>
      </div>
    ) : null;

  return (
    <>
      <AvailabilityResultModal
        open={searchModalOpen}
        onClose={closeSearchModal}
        status={searchValidationError ? 'idle' : searchStatus}
        data={searchData}
        error={searchError}
        validationError={searchValidationError}
        onRetry={searchStatus === 'error' ? retrySearch : undefined}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
      />
      <div ref={desktopRootRef} className={`booking-wrap desktop ${visible ? 'is-visible' : ''}`}>
        {showResumeHint && visible && (
          <div className="booking-resume-hint" role="status">
            <span className="booking-resume-hint-text">
              Ricerca salvata: puoi riprendere la prenotazione.
            </span>
            <button
              type="button"
              className="booking-resume-hint-btn"
              onClick={() => {
                setSearchModalOpen(true);
                setShowResumeHint(false);
              }}
            >
              Apri risultati
            </button>
            <button
              type="button"
              className="booking-resume-hint-dismiss"
              aria-label="Chiudi avviso"
              onClick={() => setShowResumeHint(false)}
            >
              ×
            </button>
          </div>
        )}
        <div className="booking-pill">
          <button
            type="button"
            className={segmentClass('dates')}
            onClick={() => openSegment('dates')}
            aria-expanded={activeSegment === 'dates'}
          >
            <span className="booking-seg-label">Date</span>
            <span className="booking-seg-value booking-seg-value--dates">{datesLabel}</span>
          </button>
          <span className="booking-pill-divider" aria-hidden="true" />
          <button
            type="button"
            className={segmentClass('who')}
            onClick={() => openSegment('who')}
            aria-expanded={activeSegment === 'who'}
          >
            <span className="booking-seg-label">Ospiti</span>
            <span className="booking-seg-value">{guestsLabel}</span>
          </button>
          <button type="button" className="booking-ricerca" onClick={goSearch}>
            {searchIcon}
            <span>Ricerca</span>
          </button>
        </div>
        {desktopPopover}
      </div>

      <div ref={mobileRootRef} className={`booking-wrap mobile ${visible ? 'is-visible' : ''}`}>
        {showResumeHint && visible && (
          <div className="booking-resume-hint booking-resume-hint--mobile" role="status">
            <span className="booking-resume-hint-text">Ricerca salvata.</span>
            <button
              type="button"
              className="booking-resume-hint-btn"
              onClick={() => {
                setSearchModalOpen(true);
                setShowResumeHint(false);
              }}
            >
              Risultati
            </button>
            <button
              type="button"
              className="booking-resume-hint-dismiss"
              aria-label="Chiudi avviso"
              onClick={() => setShowResumeHint(false)}
            >
              ×
            </button>
          </div>
        )}
        <button type="button" className="booking-mobile-bar" onClick={() => setMobileOpen(true)}>
          <span className="booking-mobile-bar-icon">{searchIcon}</span>
          <span className="booking-mobile-bar-text">
            <span className="booking-mobile-bar-title">Verifica disponibilità</span>
            <span className="booking-mobile-bar-sub">{datesLabel}</span>
          </span>
        </button>
        {mobileOpen &&
          createPortal(
            <div
              className="booking-mobile-scrim"
              aria-hidden="true"
              onClick={() => setMobileOpen(false)}
            />,
            document.body,
          )}
        {mobileOpen && (
          <div className="booking-mobile-sheet" role="dialog" aria-modal="true" aria-label="Prenotazione">
            <div className="booking-mobile-sheet-head">
              <span className="booking-mobile-sheet-title">La tua vacanza</span>
              <button type="button" className="booking-mobile-close" onClick={() => setMobileOpen(false)} aria-label="Chiudi">
                ×
              </button>
            </div>
            <div className="booking-mobile-body">
              <div className="booking-mobile-block">
                <p className="booking-seg-label">Date</p>
                <div className="booking-cal-head">
                  <button type="button" className="booking-cal-nav" onClick={() => setViewMonth((m) => addMonths(m, -1))}>
                    ‹
                  </button>
                  <button type="button" className="booking-cal-nav" onClick={() => setViewMonth((m) => addMonths(m, 1))}>
                    ›
                  </button>
                </div>
                <MonthGrid
                  year={leftMonth.getFullYear()}
                  month={leftMonth.getMonth()}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  today={today}
                  onPick={pickDay}
                />
              </div>
              <div className="booking-mobile-block">
                <p className="booking-seg-label">Ospiti</p>
                <div className="booking-guest-row">
                  <div>
                    <p className="booking-guest-title">Adulti</p>
                    <p className="booking-guest-sub" id="m-guest-adulti">
                      Da 13 anni in su
                    </p>
                  </div>
                  <Stepper
                    id="m-guest-adulti"
                    min={1}
                    max={8}
                    value={guests.adults}
                    onChange={(n) => setGuests((g) => ({ ...g, adults: n }))}
                  />
                </div>
                <div className="booking-guest-row">
                  <div>
                    <p className="booking-guest-title">Bambini</p>
                    <p className="booking-guest-sub" id="m-guest-bambini">
                      Da 2 a 12 anni
                    </p>
                  </div>
                  <Stepper
                    id="m-guest-bambini"
                    min={0}
                    max={6}
                    value={guests.children}
                    onChange={(n) => setGuests((g) => ({ ...g, children: n }))}
                  />
                </div>
                <div className="booking-guest-row">
                  <div>
                    <p className="booking-guest-title">Neonati</p>
                    <p className="booking-guest-sub" id="m-guest-neonati">
                      Fino a 2 anni
                    </p>
                  </div>
                  <Stepper
                    id="m-guest-neonati"
                    min={0}
                    max={4}
                    value={guests.infants}
                    onChange={(n) => setGuests((g) => ({ ...g, infants: n }))}
                  />
                </div>
              </div>
              <button type="button" className="booking-ricerca booking-ricerca-full" onClick={goSearch}>
                {searchIcon}
                <span>Ricerca</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
