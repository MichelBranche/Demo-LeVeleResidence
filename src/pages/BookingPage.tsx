import type { ChangeEvent, FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { useSiteLocale } from '../hooks/useSiteLocale';
import { submitBookingRequest, type BookingAccommodation } from '../lib/booking';

type BookingFormState = {
  checkIn: string;
  checkOut: string;
  accommodation: BookingAccommodation;
  guests: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  website: string;
};

const initialState: BookingFormState = {
  checkIn: '',
  checkOut: '',
  accommodation: '',
  guests: '',
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  website: '',
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function BookingPage() {
  const { locale, content } = useSiteLocale();
  const { suites } = content;
  const [form, setForm] = useState<BookingFormState>(initialState);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const isItalian = locale === 'it';

  const gardenSuite = suites.find((s) => s.slug === 'vista-giardino');
  const seaSuite = suites.find((s) => s.slug === 'vista-mare');

  const labels = useMemo(
    () => ({
      eyebrow: isItalian ? 'Prenotazioni' : 'Bookings',
      title: isItalian ? 'Richiedi disponibilità' : 'Request availability',
      intro: isItalian
        ? 'Indica le date del soggiorno, la tipologia di alloggio e il numero di ospiti. Ti risponderemo via email con una proposta personalizzata.'
        : 'Share your stay dates, accommodation preference and number of guests. We will reply by email with a tailored proposal.',
      groupStay: isItalian ? 'Soggiorno' : 'Your stay',
      groupGuests: isItalian ? 'Alloggio e ospiti' : 'Accommodation & guests',
      groupContact: isItalian ? 'I tuoi dati' : 'Your details',
      groupMessage: isItalian ? 'Messaggio' : 'Message',
      checkIn: isItalian ? 'Arrivo' : 'Arrival',
      checkOut: isItalian ? 'Partenza' : 'Departure',
      accommodation: isItalian ? 'Tipologia di alloggio' : 'Accommodation type',
      accommodationAny: isItalian ? 'Nessuna preferenza' : 'No preference',
      accommodationGarden: gardenSuite?.title ?? (isItalian ? 'Vista giardino' : 'Garden view'),
      accommodationSea: seaSuite?.title ?? (isItalian ? 'Vista mare' : 'Sea view'),
      guests: isItalian ? 'Numero di ospiti' : 'Number of guests',
      firstName: isItalian ? 'Nome' : 'First name',
      lastName: isItalian ? 'Cognome' : 'Last name',
      email: isItalian ? 'Email' : 'Email',
      message: isItalian ? 'Richiesta' : 'Request',
      messagePlaceholder: isItalian
        ? 'Es. orario di arrivo, esigenze particolari, animali…'
        : 'E.g. arrival time, special requests, pets…',
      submit: isItalian ? 'Invia richiesta' : 'Send request',
      submitting: isItalian ? 'Invio in corso…' : 'Sending…',
      requiredHint: isItalian ? 'Campi obbligatori *' : 'Required fields *',
      emailNote: isItalian
        ? 'La richiesta viene inviata in modo sicuro. Riceverai risposta all’indirizzo indicato.'
        : 'Your request is sent securely. We will reply to the email address provided.',
      successTitle: isItalian ? 'Richiesta inviata' : 'Request sent',
      successBody: isItalian
        ? 'Grazie! Abbiamo ricevuto la tua richiesta e ti risponderemo al più presto via email.'
        : 'Thank you! We have received your request and will reply by email as soon as possible.',
      errorGeneric: isItalian
        ? 'Non è stato possibile inviare la richiesta. Riprova tra qualche minuto o contattaci telefonicamente.'
        : 'We could not send your request. Please try again in a few minutes or call us.',
      errorNetwork: isItalian
        ? 'Connessione assente. Controlla la rete e riprova.'
        : 'No connection. Check your network and try again.',
      errorResendDomain: isItalian
        ? 'Il servizio email è in modalità test: su Resend va verificato il dominio rtalevele.com, oppure (solo per prove) imposta BOOKING_TO_EMAIL con l’email del tuo account Resend.'
        : 'Email is in test mode: verify rtalevele.com on Resend, or (for testing only) set BOOKING_TO_EMAIL to your Resend account email.',
      errorResendFrom: isItalian
        ? 'Mittente non valido. Su Vercel imposta BOOKING_FROM_EMAIL a: Residence Le Vele <onboarding@resend.dev> (fino a verifica dominio).'
        : 'Invalid sender. On Vercel set BOOKING_FROM_EMAIL to: Residence Le Vele <onboarding@resend.dev> (until domain is verified).',
      errorService: isItalian
        ? 'Servizio email non configurato. Contatta l’amministratore del sito.'
        : 'Email service is not configured. Please contact the site administrator.',
      errorLocalDev: isItalian
        ? 'In locale con npm run dev l’API non è attiva. Usa npm run dev:vercel oppure prova sul sito pubblicato su Vercel.'
        : 'Local npm run dev does not run the API. Use npm run dev:vercel or test on the deployed Vercel site.',
    }),
    [gardenSuite?.title, isItalian, seaSuite?.title],
  );

  const handleChange =
    (field: keyof BookingFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      if (status === 'success') setStatus('idle');
      setErrorKey(null);
      setErrorDetail(null);
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (status === 'loading' || status === 'success') return;

    const { checkIn, checkOut, accommodation, guests, firstName, lastName, email, message, website } =
      form;

    if (!checkIn || !checkOut || !guests || !firstName || !lastName || !email) return;

    setStatus('loading');
    setErrorKey(null);
    setErrorDetail(null);

    const result = await submitBookingRequest({
      checkIn,
      checkOut,
      accommodation,
      guests: Number.parseInt(guests, 10),
      firstName,
      lastName,
      email,
      message,
      locale,
      website,
    });

    if (result.ok) {
      setStatus('success');
      setForm(initialState);
      return;
    }

    setStatus('error');
    setErrorKey(result.error);
    setErrorDetail(result.detail ?? null);
  };

  const errorMessage = (() => {
    if (errorKey === 'network') return labels.errorNetwork;
    if (errorKey === 'resend_domain') return labels.errorResendDomain;
    if (errorKey === 'resend_from') return labels.errorResendFrom;
    if (errorKey === 'service_unavailable') return labels.errorService;
    if (import.meta.env.DEV && errorKey === 'send_failed') return labels.errorLocalDev;
    return labels.errorGeneric;
  })();

  const today = new Date().toISOString().slice(0, 10);

  return (
    <article className="booking-page" aria-labelledby="booking-title">
      <div className="booking-page__inner">
        <header className="booking-page__header">
          <div className="booking-page__heading-row">
            <span className="booking-page__rule" aria-hidden />
            <p className="booking-page__eyebrow">{labels.eyebrow}</p>
          </div>
          <h1 id="booking-title" className="booking-page__title display-serif">
            {labels.title}
          </h1>
          <p className="booking-page__intro">{labels.intro}</p>
          <p className="booking-page__hint">{labels.requiredHint}</p>
        </header>

        {status === 'success' ? (
          <div className="booking-page__status booking-page__status--success" role="status">
            <p className="booking-page__status-title">{labels.successTitle}</p>
            <p className="booking-page__status-text">{labels.successBody}</p>
            <button
              type="button"
              className="booking-page__submit"
              onClick={() => setStatus('idle')}
            >
              <span>{isItalian ? 'Invia un’altra richiesta' : 'Send another request'}</span>
            </button>
          </div>
        ) : (
          <form className="booking-page__form" onSubmit={handleSubmit} noValidate={false}>
            {status === 'error' && (
              <div className="booking-page__status booking-page__status--error" role="alert">
                <p>{errorMessage}</p>
                {errorDetail && import.meta.env.DEV && (
                  <p className="booking-page__error-detail">{errorDetail}</p>
                )}
              </div>
            )}

            <div className="booking-page__hp" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={handleChange('website')}
              />
            </div>

            <fieldset className="booking-page__group" disabled={status === 'loading'}>
              <legend className="booking-page__legend">{labels.groupStay}</legend>
              <div className="booking-page__grid booking-page__grid--2">
                <div className="booking-page__field">
                  <label htmlFor="check-in">
                    {labels.checkIn} <span>*</span>
                  </label>
                  <input
                    id="check-in"
                    name="checkIn"
                    type="date"
                    required
                    min={today}
                    value={form.checkIn}
                    onChange={handleChange('checkIn')}
                  />
                </div>
                <div className="booking-page__field">
                  <label htmlFor="check-out">
                    {labels.checkOut} <span>*</span>
                  </label>
                  <input
                    id="check-out"
                    name="checkOut"
                    type="date"
                    required
                    min={form.checkIn || today}
                    value={form.checkOut}
                    onChange={handleChange('checkOut')}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="booking-page__group" disabled={status === 'loading'}>
              <legend className="booking-page__legend">{labels.groupGuests}</legend>
              <div className="booking-page__grid booking-page__grid--2">
                <div className="booking-page__field">
                  <label htmlFor="accommodation">{labels.accommodation}</label>
                  <select
                    id="accommodation"
                    name="accommodation"
                    value={form.accommodation}
                    onChange={handleChange('accommodation')}
                  >
                    <option value="">{labels.accommodationAny}</option>
                    <option value="garden">{labels.accommodationGarden}</option>
                    <option value="sea">{labels.accommodationSea}</option>
                  </select>
                </div>
                <div className="booking-page__field">
                  <label htmlFor="guests">
                    {labels.guests} <span>*</span>
                  </label>
                  <input
                    id="guests"
                    name="guests"
                    type="number"
                    min={1}
                    max={6}
                    required
                    inputMode="numeric"
                    value={form.guests}
                    onChange={handleChange('guests')}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="booking-page__group" disabled={status === 'loading'}>
              <legend className="booking-page__legend">{labels.groupContact}</legend>
              <div className="booking-page__grid booking-page__grid--2">
                <div className="booking-page__field">
                  <label htmlFor="first-name">
                    {labels.firstName} <span>*</span>
                  </label>
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={form.firstName}
                    onChange={handleChange('firstName')}
                  />
                </div>
                <div className="booking-page__field">
                  <label htmlFor="last-name">
                    {labels.lastName} <span>*</span>
                  </label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={form.lastName}
                    onChange={handleChange('lastName')}
                  />
                </div>
                <div className="booking-page__field booking-page__field--full">
                  <label htmlFor="email">
                    {labels.email} <span>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange('email')}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="booking-page__group" disabled={status === 'loading'}>
              <legend className="booking-page__legend">{labels.groupMessage}</legend>
              <div className="booking-page__field booking-page__field--full">
                <label htmlFor="message">{labels.message}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={labels.messagePlaceholder}
                  value={form.message}
                  onChange={handleChange('message')}
                />
              </div>
            </fieldset>

            <div className="booking-page__actions">
              <button
                type="submit"
                className="booking-page__submit"
                disabled={status === 'loading'}
                aria-busy={status === 'loading'}
              >
                <span>{status === 'loading' ? labels.submitting : labels.submit}</span>
                {status !== 'loading' && (
                  <span className="booking-page__submit-arrow" aria-hidden>
                    →
                  </span>
                )}
              </button>
              <p className="booking-page__note">{labels.emailNote}</p>
            </div>
          </form>
        )}
      </div>
    </article>
  );
}

export default BookingPage;
