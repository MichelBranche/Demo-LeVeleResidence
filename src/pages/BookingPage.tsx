import '../styles/booking-page.css';
import type { ChangeEvent, FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
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

  const gardenSuite = suites.find((s) => s.slug === 'vista-giardino');
  const seaSuite = suites.find((s) => s.slug === 'vista-mare');

  const labels = useMemo(() => {
    const copyByLocale = {
      it: {
        eyebrow: 'Prenotazioni',
        title: 'Richiedi disponibilità',
        intro:
          'Indica le date del soggiorno, la tipologia di alloggio e il numero di ospiti. Ti risponderemo via email con una proposta personalizzata.',
        groupStay: 'Soggiorno',
        groupGuests: 'Alloggio e ospiti',
        groupContact: 'I tuoi dati',
        groupMessage: 'Messaggio',
        checkIn: 'Arrivo',
        checkOut: 'Partenza',
        accommodation: 'Tipologia di alloggio',
        accommodationAny: 'Nessuna preferenza',
        guests: 'Numero di ospiti',
        firstName: 'Nome',
        lastName: 'Cognome',
        message: 'Richiesta',
        messagePlaceholder: 'Es. orario di arrivo, esigenze particolari, animali…',
        submit: 'Invia richiesta',
        submitting: 'Invio in corso…',
        requiredHint: 'Campi obbligatori *',
        emailNote:
          'La richiesta viene inviata in modo sicuro. Riceverai risposta all’indirizzo indicato.',
        privacyBefore: 'I dati inseriti sono trattati per gestire la richiesta di disponibilità. Consulta la ',
        privacyLink: 'Privacy Policy',
        privacyAfter: ' per finalità, base giuridica e diritti.',
        successTitle: 'Richiesta inviata',
        successBody:
          'Grazie! Abbiamo ricevuto la tua richiesta e ti risponderemo al più presto via email.',
        anotherRequest: 'Invia un’altra richiesta',
        errorGeneric:
          'Non è stato possibile inviare la richiesta. Riprova tra qualche minuto o contattaci telefonicamente.',
        errorNetwork: 'Connessione assente. Controlla la rete e riprova.',
        errorResendDomain:
          'Il servizio email è in modalità test: su Resend va verificato il dominio rtalevele.com, oppure (solo per prove) imposta BOOKING_TO_EMAIL con l’email del tuo account Resend.',
        errorResendFrom:
          'Mittente non valido. Su Vercel imposta BOOKING_FROM_EMAIL a: Residence Le Vele <onboarding@resend.dev> (fino a verifica dominio).',
        errorService: 'Servizio email non configurato. Contatta l’amministratore del sito.',
        errorLocalDev:
          'In locale con npm run dev l’API non è attiva. Usa npm run dev:vercel oppure prova sul sito pubblicato su Vercel.',
      },
      en: {
        eyebrow: 'Bookings',
        title: 'Request availability',
        intro:
          'Share your stay dates, accommodation preference and number of guests. We will reply by email with a tailored proposal.',
        groupStay: 'Your stay',
        groupGuests: 'Accommodation & guests',
        groupContact: 'Your details',
        groupMessage: 'Message',
        checkIn: 'Arrival',
        checkOut: 'Departure',
        accommodation: 'Accommodation type',
        accommodationAny: 'No preference',
        guests: 'Number of guests',
        firstName: 'First name',
        lastName: 'Last name',
        message: 'Request',
        messagePlaceholder: 'E.g. arrival time, special requests, pets…',
        submit: 'Send request',
        submitting: 'Sending…',
        requiredHint: 'Required fields *',
        emailNote: 'Your request is sent securely. We will reply to the email address provided.',
        privacyBefore: 'The data you provide is processed to handle your availability request. See our ',
        privacyLink: 'Privacy Policy',
        privacyAfter: ' for purposes, legal basis and your rights.',
        successTitle: 'Request sent',
        successBody:
          'Thank you! We have received your request and will reply by email as soon as possible.',
        anotherRequest: 'Send another request',
        errorGeneric:
          'We could not send your request. Please try again in a few minutes or call us.',
        errorNetwork: 'No connection. Check your network and try again.',
        errorResendDomain:
          'Email is in test mode: verify rtalevele.com on Resend, or (for testing only) set BOOKING_TO_EMAIL to your Resend account email.',
        errorResendFrom:
          'Invalid sender. On Vercel set BOOKING_FROM_EMAIL to: Residence Le Vele <onboarding@resend.dev> (until domain is verified).',
        errorService: 'Email service is not configured. Please contact the site administrator.',
        errorLocalDev:
          'Local npm run dev does not run the API. Use npm run dev:vercel or test on the deployed Vercel site.',
      },
      de: {
        eyebrow: 'Buchungen',
        title: 'Verfügbarkeit anfragen',
        intro:
          'Teilen Sie uns Reisedaten, Unterkunftstyp und Gästezahl mit. Wir antworten per E-Mail mit einem individuellen Angebot.',
        groupStay: 'Aufenthalt',
        groupGuests: 'Unterkunft & Gäste',
        groupContact: 'Ihre Daten',
        groupMessage: 'Nachricht',
        checkIn: 'Anreise',
        checkOut: 'Abreise',
        accommodation: 'Unterkunftstyp',
        accommodationAny: 'Keine Präferenz',
        guests: 'Anzahl der Gäste',
        firstName: 'Vorname',
        lastName: 'Nachname',
        message: 'Anfrage',
        messagePlaceholder: 'z. B. Ankunftszeit, besondere Wünsche, Haustiere…',
        submit: 'Anfrage senden',
        submitting: 'Wird gesendet…',
        requiredHint: 'Pflichtfelder *',
        emailNote:
          'Ihre Anfrage wird sicher übermittelt. Wir antworten an die angegebene E-Mail-Adresse.',
        privacyBefore:
          'Die angegebenen Daten werden zur Bearbeitung Ihrer Verfügbarkeitsanfrage verarbeitet. Siehe ',
        privacyLink: 'Datenschutzerklärung',
        privacyAfter: ' zu Zweck, Rechtsgrundlage und Ihren Rechten.',
        successTitle: 'Anfrage gesendet',
        successBody:
          'Vielen Dank! Wir haben Ihre Anfrage erhalten und antworten so bald wie möglich per E-Mail.',
        anotherRequest: 'Weitere Anfrage senden',
        errorGeneric:
          'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder rufen Sie uns an.',
        errorNetwork: 'Keine Verbindung. Prüfen Sie das Netzwerk und versuchen Sie es erneut.',
        errorResendDomain:
          'E-Mail im Testmodus: Domain rtalevele.com bei Resend verifizieren oder BOOKING_TO_EMAIL für Tests setzen.',
        errorResendFrom:
          'Ungültiger Absender. Auf Vercel BOOKING_FROM_EMAIL setzen: Residence Le Vele <onboarding@resend.dev>.',
        errorService: 'E-Mail-Dienst nicht konfiguriert. Bitte den Administrator kontaktieren.',
        errorLocalDev:
          'Lokal mit npm run dev ist die API nicht aktiv. Nutzen Sie npm run dev:vercel oder die Vercel-Deployment-URL.',
      },
      fr: {
        eyebrow: 'Réservations',
        title: 'Demander la disponibilité',
        intro:
          'Indiquez les dates, le type de logement et le nombre de voyageurs. Nous répondrons par e-mail avec une proposition personnalisée.',
        groupStay: 'Séjour',
        groupGuests: 'Logement & voyageurs',
        groupContact: 'Vos coordonnées',
        groupMessage: 'Message',
        checkIn: 'Arrivée',
        checkOut: 'Départ',
        accommodation: 'Type de logement',
        accommodationAny: 'Sans préférence',
        guests: 'Nombre de voyageurs',
        firstName: 'Prénom',
        lastName: 'Nom',
        message: 'Demande',
        messagePlaceholder: 'Ex. heure d’arrivée, demandes particulières, animaux…',
        submit: 'Envoyer la demande',
        submitting: 'Envoi en cours…',
        requiredHint: 'Champs obligatoires *',
        emailNote:
          'Votre demande est envoyée de manière sécurisée. Nous répondrons à l’adresse e-mail indiquée.',
        privacyBefore:
          'Les données saisies sont traitées pour gérer votre demande de disponibilité. Consultez la ',
        privacyLink: 'politique de confidentialité',
        privacyAfter: ' pour les finalités, la base juridique et vos droits.',
        successTitle: 'Demande envoyée',
        successBody:
          'Merci ! Nous avons bien reçu votre demande et vous répondrons par e-mail dès que possible.',
        anotherRequest: 'Envoyer une autre demande',
        errorGeneric:
          'Impossible d’envoyer la demande. Réessayez dans quelques minutes ou contactez-nous par téléphone.',
        errorNetwork: 'Pas de connexion. Vérifiez le réseau et réessayez.',
        errorResendDomain:
          'E-mail en mode test : vérifiez le domaine rtalevele.com sur Resend ou définissez BOOKING_TO_EMAIL pour les tests.',
        errorResendFrom:
          'Expéditeur invalide. Sur Vercel, définissez BOOKING_FROM_EMAIL : Residence Le Vele <onboarding@resend.dev>.',
        errorService: 'Service e-mail non configuré. Contactez l’administrateur du site.',
        errorLocalDev:
          'En local avec npm run dev, l’API n’est pas active. Utilisez npm run dev:vercel ou le site déployé sur Vercel.',
      },
      es: {
        eyebrow: 'Reservas',
        title: 'Solicitar disponibilidad',
        intro:
          'Indique las fechas, el tipo de alojamiento y el número de huéspedes. Responderemos por correo con una propuesta personalizada.',
        groupStay: 'Estancia',
        groupGuests: 'Alojamiento y huéspedes',
        groupContact: 'Sus datos',
        groupMessage: 'Mensaje',
        checkIn: 'Llegada',
        checkOut: 'Salida',
        accommodation: 'Tipo de alojamiento',
        accommodationAny: 'Sin preferencia',
        guests: 'Número de huéspedes',
        firstName: 'Nombre',
        lastName: 'Apellidos',
        message: 'Solicitud',
        messagePlaceholder: 'Ej. hora de llegada, peticiones especiales, mascotas…',
        submit: 'Enviar solicitud',
        submitting: 'Enviando…',
        requiredHint: 'Campos obligatorios *',
        emailNote:
          'Su solicitud se envía de forma segura. Responderemos al correo indicado.',
        privacyBefore:
          'Los datos facilitados se tratan para gestionar su solicitud de disponibilidad. Consulte la ',
        privacyLink: 'política de privacidad',
        privacyAfter: ' para finalidades, base jurídica y derechos.',
        successTitle: 'Solicitud enviada',
        successBody:
          '¡Gracias! Hemos recibido su solicitud y responderemos por correo lo antes posible.',
        anotherRequest: 'Enviar otra solicitud',
        errorGeneric:
          'No se pudo enviar la solicitud. Inténtelo de nuevo en unos minutos o llámenos.',
        errorNetwork: 'Sin conexión. Compruebe la red e inténtelo de nuevo.',
        errorResendDomain:
          'Correo en modo prueba: verifique el dominio rtalevele.com en Resend o configure BOOKING_TO_EMAIL para pruebas.',
        errorResendFrom:
          'Remitente no válido. En Vercel configure BOOKING_FROM_EMAIL: Residence Le Vele <onboarding@resend.dev>.',
        errorService: 'Servicio de correo no configurado. Contacte al administrador del sitio.',
        errorLocalDev:
          'En local con npm run dev la API no está activa. Use npm run dev:vercel o el sitio desplegado en Vercel.',
      },
      ru: {
        eyebrow: 'Бронирование',
        title: 'Запросить наличие',
        intro:
          'Укажите даты проживания, тип размещения и число гостей. Мы ответим по email с персональным предложением.',
        groupStay: 'Проживание',
        groupGuests: 'Размещение и гости',
        groupContact: 'Ваши данные',
        groupMessage: 'Сообщение',
        checkIn: 'Заезд',
        checkOut: 'Выезд',
        accommodation: 'Тип размещения',
        accommodationAny: 'Без предпочтений',
        guests: 'Число гостей',
        firstName: 'Имя',
        lastName: 'Фамилия',
        message: 'Запрос',
        messagePlaceholder: 'Напр. время прибытия, особые пожелания, животные…',
        submit: 'Отправить запрос',
        submitting: 'Отправка…',
        requiredHint: 'Обязательные поля *',
        emailNote: 'Запрос отправляется безопасно. Ответ придёт на указанный email.',
        privacyBefore: 'Введённые данные обрабатываются для обработки запроса наличия. См. ',
        privacyLink: 'политику конфиденциальности',
        privacyAfter: ' о целях, правовых основаниях и ваших правах.',
        successTitle: 'Запрос отправлен',
        successBody: 'Спасибо! Мы получили ваш запрос и ответим по email как можно скорее.',
        anotherRequest: 'Отправить ещё один запрос',
        errorGeneric:
          'Не удалось отправить запрос. Повторите через несколько минут или позвоните нам.',
        errorNetwork: 'Нет соединения. Проверьте сеть и повторите.',
        errorResendDomain:
          'Email в тестовом режиме: подтвердите домен rtalevele.com в Resend или задайте BOOKING_TO_EMAIL для тестов.',
        errorResendFrom:
          'Недопустимый отправитель. На Vercel задайте BOOKING_FROM_EMAIL: Residence Le Vele <onboarding@resend.dev>.',
        errorService: 'Почтовый сервис не настроен. Свяжитесь с администратором сайта.',
        errorLocalDev:
          'Локально с npm run dev API не активна. Используйте npm run dev:vercel или опубликованный сайт на Vercel.',
      },
      zh: {
        eyebrow: '预订',
        title: '查询空房',
        intro: '请填写入住日期、房型偏好及宾客人数。我们将通过电子邮件回复个性化方案。',
        groupStay: '住宿',
        groupGuests: '房型与宾客',
        groupContact: '您的信息',
        groupMessage: '留言',
        checkIn: '入住',
        checkOut: '退房',
        accommodation: '房型',
        accommodationAny: '无偏好',
        guests: '宾客人数',
        firstName: '名',
        lastName: '姓',
        message: '需求说明',
        messagePlaceholder: '例如到达时间、特殊需求、携带宠物…',
        submit: '发送请求',
        submitting: '发送中…',
        requiredHint: '必填项 *',
        emailNote: '您的请求将安全发送。我们将在所填邮箱回复。',
        privacyBefore: '您提供的数据用于处理空房查询。请参阅',
        privacyLink: '隐私政策',
        privacyAfter: '了解处理目的、法律依据及您的权利。',
        successTitle: '请求已发送',
        successBody: '谢谢！我们已收到您的请求，将尽快通过邮件回复。',
        anotherRequest: '再次发送请求',
        errorGeneric: '无法发送请求。请几分钟后重试或致电联系我们。',
        errorNetwork: '无网络连接。请检查网络后重试。',
        errorResendDomain:
          '邮件处于测试模式：请在 Resend 验证 rtalevele.com 域名，或设置 BOOKING_TO_EMAIL 进行测试。',
        errorResendFrom:
          '发件人无效。在 Vercel 设置 BOOKING_FROM_EMAIL：Residence Le Vele <onboarding@resend.dev>。',
        errorService: '邮件服务未配置。请联系网站管理员。',
        errorLocalDev: '本地 npm run dev 下 API 未启用。请使用 npm run dev:vercel 或 Vercel 部署地址。',
      },
    } as const;

    const copy = copyByLocale[locale];

    return {
      ...copy,
      email: 'Email',
      accommodationGarden: gardenSuite?.title ?? copy.accommodationAny,
      accommodationSea: seaSuite?.title ?? copy.accommodationAny,
    };
  }, [gardenSuite?.title, locale, seaSuite?.title]);

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
              <span>{labels.anotherRequest}</span>
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

            <div className="booking-page__hp" inert aria-hidden="true">
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
                    max={4}
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
              <p className="booking-page__note booking-page__privacy">
                {labels.privacyBefore}
                <Link to="/privacy-policy">{labels.privacyLink}</Link>
                {labels.privacyAfter}
              </p>
            </div>
          </form>
        )}
      </div>
    </article>
  );
}

export default BookingPage;
