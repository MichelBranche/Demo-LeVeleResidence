import '../styles/booking-page.css';
import '../styles/booking-picker.css';
import '../styles/booking-confirmation.css';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookingConfirmation } from '../components/booking/BookingConfirmation';
import { BookingDateField } from '../components/booking/BookingDateField';
import { BookingTimeField } from '../components/booking/BookingTimeField';
import { BookingFieldControl } from '../components/BookingFieldControl';
import { useSiteLocale } from '../hooks/useSiteLocale';
import { createBookingReference } from '../lib/bookingDateTime';
import { submitBookingRequest, type BookingAccommodation } from '../lib/booking';
import type { BookingReceipt } from '../lib/bookingReceipt';

type BookingFormState = {
  checkIn: string;
  checkOut: string;
  arrivalTime: string;
  accommodation: BookingAccommodation;
  guests: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

const initialState: BookingFormState = {
  checkIn: '',
  checkOut: '',
  arrivalTime: '',
  accommodation: '',
  guests: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  website: '',
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function BookingPage() {
  const { locale, content } = useSiteLocale();
  const { suites } = content;
  const [form, setForm] = useState<BookingFormState>(initialState);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);
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
        arrivalTime: 'Orario di arrivo (facoltativo)',
        datePlaceholder: 'Seleziona data',
        timePlaceholder: 'Seleziona orario',
        openCalendar: 'Apri calendario',
        openTime: 'Apri selettore orario',
        calendarDialog: 'Calendario soggiorno',
        timeDialog: 'Orario di arrivo',
        hourLabel: 'Ora',
        minuteLabel: 'Minuti',
        clearTime: 'Rimuovi orario',
        accommodation: 'Tipologia di alloggio',
        accommodationAny: 'Nessuna preferenza',
        guests: 'Numero di ospiti',
        firstName: 'Nome',
        lastName: 'Cognome',
        phone: 'Telefono',
        message: 'Richiesta',
        messagePlaceholder: 'Es. esigenze particolari, animali…',
        submit: 'Invia richiesta',
        submitting: 'Invio in corso…',
        requiredHint: 'Campi obbligatori *',
        emailNote:
          'La richiesta viene inviata in modo sicuro. Riceverai risposta all’indirizzo email o al numero indicato.',
        privacyBefore: 'I dati inseriti sono trattati per gestire la richiesta di disponibilità. Consulta la ',
        privacyLink: 'Privacy Policy',
        privacyAfter: ' per finalità, base giuridica e diritti.',
        successEyebrow: 'Richiesta registrata',
        successHeadline: 'La tua prossima vacanza inizia qui',
        successLead: 'Grazie, {name}. Abbiamo registrato la tua richiesta di disponibilità.',
        receiptTitle: 'Riepilogo richiesta',
        receiptReference: 'Riferimento',
        receiptSubmitted: 'Inviata il',
        receiptStay: 'Soggiorno',
        receiptNightsOne: '1 notte',
        receiptNightsMany: '{n} notti',
        receiptAccommodation: 'Alloggio',
        receiptGuests: '{n} ospiti',
        receiptArrival: 'Orario di arrivo',
        receiptContact: 'Contatti',
        receiptMessage: 'Note',
        successNextTitle: 'Cosa succede ora',
        successNextBody:
          'Il nostro team ti risponderà via email o telefono con una proposta personalizzata, di solito entro 24–48 ore.',
        backHome: 'Torna alla home',
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
        arrivalTime: 'Arrival time (optional)',
        datePlaceholder: 'Select date',
        timePlaceholder: 'Select time',
        openCalendar: 'Open calendar',
        openTime: 'Open time picker',
        calendarDialog: 'Stay calendar',
        timeDialog: 'Arrival time',
        hourLabel: 'Hour',
        minuteLabel: 'Minutes',
        clearTime: 'Clear time',
        accommodation: 'Accommodation type',
        accommodationAny: 'No preference',
        guests: 'Number of guests',
        firstName: 'First name',
        lastName: 'Last name',
        phone: 'Phone',
        message: 'Request',
        messagePlaceholder: 'E.g. special requests, pets…',
        submit: 'Send request',
        submitting: 'Sending…',
        requiredHint: 'Required fields *',
        emailNote: 'Your request is sent securely. We will reply to the email or phone number provided.',
        privacyBefore: 'The data you provide is processed to handle your availability request. See our ',
        privacyLink: 'Privacy Policy',
        privacyAfter: ' for purposes, legal basis and your rights.',
        successEyebrow: 'Request registered',
        successHeadline: 'Your next holiday starts here',
        successLead: 'Thank you, {name}. We have registered your availability request.',
        receiptTitle: 'Request summary',
        receiptReference: 'Reference',
        receiptSubmitted: 'Submitted on',
        receiptStay: 'Stay',
        receiptNightsOne: '1 night',
        receiptNightsMany: '{n} nights',
        receiptAccommodation: 'Accommodation',
        receiptGuests: '{n} guests',
        receiptArrival: 'Arrival time',
        receiptContact: 'Contact',
        receiptMessage: 'Notes',
        successNextTitle: 'What happens next',
        successNextBody:
          'Our team will reply by email or phone with a tailored proposal, usually within 24–48 hours.',
        backHome: 'Back to home',
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
        arrivalTime: 'Ankunftszeit (optional)',
        datePlaceholder: 'Datum wählen',
        timePlaceholder: 'Uhrzeit wählen',
        openCalendar: 'Kalender öffnen',
        openTime: 'Uhrzeit wählen',
        calendarDialog: 'Aufenthaltskalender',
        timeDialog: 'Ankunftszeit',
        hourLabel: 'Stunde',
        minuteLabel: 'Minuten',
        clearTime: 'Uhrzeit entfernen',
        accommodation: 'Unterkunftstyp',
        accommodationAny: 'Keine Präferenz',
        guests: 'Anzahl der Gäste',
        firstName: 'Vorname',
        lastName: 'Nachname',
        phone: 'Telefon',
        message: 'Anfrage',
        messagePlaceholder: 'z. B. besondere Wünsche, Haustiere…',
        submit: 'Anfrage senden',
        submitting: 'Wird gesendet…',
        requiredHint: 'Pflichtfelder *',
        emailNote:
          'Ihre Anfrage wird sicher übermittelt. Wir antworten an die angegebene E-Mail-Adresse oder Telefonnummer.',
        privacyBefore:
          'Die angegebenen Daten werden zur Bearbeitung Ihrer Verfügbarkeitsanfrage verarbeitet. Siehe ',
        privacyLink: 'Datenschutzerklärung',
        privacyAfter: ' zu Zweck, Rechtsgrundlage und Ihren Rechten.',
        successEyebrow: 'Anfrage registriert',
        successHeadline: 'Ihr nächster Urlaub beginnt hier',
        successLead: 'Vielen Dank, {name}. Wir haben Ihre Verfügbarkeitsanfrage registriert.',
        receiptTitle: 'Anfrageübersicht',
        receiptReference: 'Referenz',
        receiptSubmitted: 'Gesendet am',
        receiptStay: 'Aufenthalt',
        receiptNightsOne: '1 Nacht',
        receiptNightsMany: '{n} Nächte',
        receiptAccommodation: 'Unterkunft',
        receiptGuests: '{n} Gäste',
        receiptArrival: 'Ankunftszeit',
        receiptContact: 'Kontakt',
        receiptMessage: 'Hinweise',
        successNextTitle: 'Wie geht es weiter',
        successNextBody:
          'Unser Team antwortet per E-Mail oder Telefon mit einem individuellen Angebot, in der Regel innerhalb von 24–48 Stunden.',
        backHome: 'Zur Startseite',
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
        arrivalTime: 'Heure d’arrivée (facultatif)',
        datePlaceholder: 'Choisir une date',
        timePlaceholder: 'Choisir l’heure',
        openCalendar: 'Ouvrir le calendrier',
        openTime: 'Choisir l’heure',
        calendarDialog: 'Calendrier du séjour',
        timeDialog: 'Heure d’arrivée',
        hourLabel: 'Heure',
        minuteLabel: 'Minutes',
        clearTime: 'Effacer l’heure',
        accommodation: 'Type de logement',
        accommodationAny: 'Sans préférence',
        guests: 'Nombre de voyageurs',
        firstName: 'Prénom',
        lastName: 'Nom',
        phone: 'Téléphone',
        message: 'Demande',
        messagePlaceholder: 'Ex. demandes particulières, animaux…',
        submit: 'Envoyer la demande',
        submitting: 'Envoi en cours…',
        requiredHint: 'Champs obligatoires *',
        emailNote:
          'Votre demande est envoyée de manière sécurisée. Nous répondrons à l’adresse e-mail ou au numéro indiqué.',
        privacyBefore:
          'Les données saisies sont traitées pour gérer votre demande de disponibilité. Consultez la ',
        privacyLink: 'politique de confidentialité',
        privacyAfter: ' pour les finalités, la base juridique et vos droits.',
        successEyebrow: 'Demande enregistrée',
        successHeadline: 'Vos prochaines vacances commencent ici',
        successLead: 'Merci, {name}. Nous avons bien enregistré votre demande de disponibilité.',
        receiptTitle: 'Récapitulatif',
        receiptReference: 'Référence',
        receiptSubmitted: 'Envoyée le',
        receiptStay: 'Séjour',
        receiptNightsOne: '1 nuit',
        receiptNightsMany: '{n} nuits',
        receiptAccommodation: 'Logement',
        receiptGuests: '{n} voyageurs',
        receiptArrival: 'Heure d’arrivée',
        receiptContact: 'Coordonnées',
        receiptMessage: 'Notes',
        successNextTitle: 'Et ensuite',
        successNextBody:
          'Notre équipe vous répondra par e-mail ou téléphone avec une proposition personnalisée, généralement sous 24 à 48 heures.',
        backHome: 'Retour à l’accueil',
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
        arrivalTime: 'Hora de llegada (opcional)',
        datePlaceholder: 'Elegir fecha',
        timePlaceholder: 'Elegir hora',
        openCalendar: 'Abrir calendario',
        openTime: 'Elegir hora',
        calendarDialog: 'Calendario de estancia',
        timeDialog: 'Hora de llegada',
        hourLabel: 'Hora',
        minuteLabel: 'Minutos',
        clearTime: 'Quitar hora',
        accommodation: 'Tipo de alojamiento',
        accommodationAny: 'Sin preferencia',
        guests: 'Número de huéspedes',
        firstName: 'Nombre',
        lastName: 'Apellidos',
        phone: 'Teléfono',
        message: 'Solicitud',
        messagePlaceholder: 'Ej. peticiones especiales, mascotas…',
        submit: 'Enviar solicitud',
        submitting: 'Enviando…',
        requiredHint: 'Campos obligatorios *',
        emailNote:
          'Su solicitud se envía de forma segura. Responderemos al correo o al teléfono indicado.',
        privacyBefore:
          'Los datos facilitados se tratan para gestionar su solicitud de disponibilidad. Consulte la ',
        privacyLink: 'política de privacidad',
        privacyAfter: ' para finalidades, base jurídica y derechos.',
        successEyebrow: 'Solicitud registrada',
        successHeadline: 'Sus próximas vacaciones empiezan aquí',
        successLead: 'Gracias, {name}. Hemos registrado su solicitud de disponibilidad.',
        receiptTitle: 'Resumen de la solicitud',
        receiptReference: 'Referencia',
        receiptSubmitted: 'Enviada el',
        receiptStay: 'Estancia',
        receiptNightsOne: '1 noche',
        receiptNightsMany: '{n} noches',
        receiptAccommodation: 'Alojamiento',
        receiptGuests: '{n} huéspedes',
        receiptArrival: 'Hora de llegada',
        receiptContact: 'Contacto',
        receiptMessage: 'Notas',
        successNextTitle: 'Qué ocurre ahora',
        successNextBody:
          'Nuestro equipo responderá por correo o teléfono con una propuesta personalizada, normalmente en 24–48 horas.',
        backHome: 'Volver al inicio',
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
        arrivalTime: 'Время прибытия (необязательно)',
        datePlaceholder: 'Выберите дату',
        timePlaceholder: 'Выберите время',
        openCalendar: 'Открыть календарь',
        openTime: 'Выбрать время',
        calendarDialog: 'Календарь проживания',
        timeDialog: 'Время прибытия',
        hourLabel: 'Час',
        minuteLabel: 'Минуты',
        clearTime: 'Убрать время',
        accommodation: 'Тип размещения',
        accommodationAny: 'Без предпочтений',
        guests: 'Число гостей',
        firstName: 'Имя',
        lastName: 'Фамилия',
        phone: 'Телефон',
        message: 'Запрос',
        messagePlaceholder: 'Напр. особые пожелания, животные…',
        submit: 'Отправить запрос',
        submitting: 'Отправка…',
        requiredHint: 'Обязательные поля *',
        emailNote: 'Запрос отправляется безопасно. Ответ придёт на указанный email или телефон.',
        privacyBefore: 'Введённые данные обрабатываются для обработки запроса наличия. См. ',
        privacyLink: 'политику конфиденциальности',
        privacyAfter: ' о целях, правовых основаниях и ваших правах.',
        successEyebrow: 'Запрос зарегистрирован',
        successHeadline: 'Ваш следующий отпуск начинается здесь',
        successLead: 'Спасибо, {name}. Мы зарегистрировали ваш запрос о наличии.',
        receiptTitle: 'Сводка запроса',
        receiptReference: 'Номер',
        receiptSubmitted: 'Отправлен',
        receiptStay: 'Проживание',
        receiptNightsOne: '1 ночь',
        receiptNightsMany: '{n} ночей',
        receiptAccommodation: 'Размещение',
        receiptGuests: '{n} гостей',
        receiptArrival: 'Время прибытия',
        receiptContact: 'Контакты',
        receiptMessage: 'Примечания',
        successNextTitle: 'Что дальше',
        successNextBody:
          'Наша команда ответит по email или телефону с персональным предложением, обычно в течение 24–48 часов.',
        backHome: 'На главную',
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
        arrivalTime: '到达时间（选填）',
        datePlaceholder: '选择日期',
        timePlaceholder: '选择时间',
        openCalendar: '打开日历',
        openTime: '选择时间',
        calendarDialog: '入住日历',
        timeDialog: '到达时间',
        hourLabel: '小时',
        minuteLabel: '分钟',
        clearTime: '清除时间',
        accommodation: '房型',
        accommodationAny: '无偏好',
        guests: '宾客人数',
        firstName: '名',
        lastName: '姓',
        phone: '电话',
        message: '需求说明',
        messagePlaceholder: '例如特殊需求、携带宠物…',
        submit: '发送请求',
        submitting: '发送中…',
        requiredHint: '必填项 *',
        emailNote: '您的请求将安全发送。我们将在所填邮箱或电话回复。',
        privacyBefore: '您提供的数据用于处理空房查询。请参阅',
        privacyLink: '隐私政策',
        privacyAfter: '了解处理目的、法律依据及您的权利。',
        successEyebrow: '请求已登记',
        successHeadline: '您的下一次假期从这里开始',
        successLead: '谢谢，{name}。我们已登记您的空房查询请求。',
        receiptTitle: '请求摘要',
        receiptReference: '参考编号',
        receiptSubmitted: '提交时间',
        receiptStay: '住宿',
        receiptNightsOne: '1 晚',
        receiptNightsMany: '{n} 晚',
        receiptAccommodation: '房型',
        receiptGuests: '{n} 位宾客',
        receiptArrival: '到达时间',
        receiptContact: '联系方式',
        receiptMessage: '备注',
        successNextTitle: '接下来',
        successNextBody: '我们的团队通常会在 24–48 小时内通过邮件或电话回复个性化方案。',
        backHome: '返回首页',
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

  const setCheckIn = (checkIn: string) => {
    if (status === 'success') setStatus('idle');
    setErrorKey(null);
    setErrorDetail(null);
    setForm((prev) => {
      const next = { ...prev, checkIn };
      if (prev.checkOut && prev.checkOut < checkIn) {
        next.checkOut = '';
      }
      return next;
    });
  };

  const setCheckOut = (checkOut: string) => {
    if (status === 'success') setStatus('idle');
    setErrorKey(null);
    setErrorDetail(null);
    setForm((prev) => ({ ...prev, checkOut }));
  };

  const setArrivalTime = (arrivalTime: string) => {
    if (status === 'success') setStatus('idle');
    setErrorKey(null);
    setErrorDetail(null);
    setForm((prev) => ({ ...prev, arrivalTime }));
  };

  const formDisabled = status === 'loading';

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (status === 'loading' || status === 'success') return;

    const { checkIn, checkOut, arrivalTime, accommodation, guests, firstName, lastName, email, phone, message, website } =
      form;

    if (!checkIn || !checkOut || !guests || !firstName || !lastName || !email || !phone) return;

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
      phone,
      ...(arrivalTime ? { arrivalTime } : {}),
      message,
      locale,
      website,
    });

    if (result.ok) {
      const accommodationLabel =
        accommodation === 'garden'
          ? labels.accommodationGarden
          : accommodation === 'sea'
            ? labels.accommodationSea
            : labels.accommodationAny;

      setReceipt({
        reference: createBookingReference(),
        submittedAt: new Date().toISOString(),
        checkIn,
        checkOut,
        arrivalTime,
        accommodation,
        accommodationLabel,
        guests: Number.parseInt(guests, 10),
        firstName,
        lastName,
        email,
        phone,
        message,
      });
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

  useEffect(() => {
    if (status === 'success') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [status]);

  const handleAnotherRequest = () => {
    setStatus('idle');
    setReceipt(null);
  };

  return (
    <article
      className="booking-page"
      aria-labelledby={status === 'success' && receipt ? 'booking-confirm-title' : 'booking-title'}
    >
      <div
        className={[
          'booking-page__inner',
          status === 'success' && receipt ? 'booking-page__inner--confirm' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {status === 'success' && receipt ? (
          <BookingConfirmation
            receipt={receipt}
            locale={locale}
            labels={labels}
            onAnotherRequest={handleAnotherRequest}
          />
        ) : (
          <>
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

            <fieldset className="booking-page__group" disabled={formDisabled}>
              <legend className="booking-page__legend">{labels.groupStay}</legend>
              <div className="booking-page__grid booking-page__grid--2">
                <div className="booking-page__field">
                  <label htmlFor="check-in">
                    {labels.checkIn} <span>*</span>
                  </label>
                  <BookingDateField
                    id="check-in"
                    name="checkIn"
                    icon="check-in"
                    value={form.checkIn}
                    min={today}
                    locale={locale}
                    placeholder={labels.datePlaceholder}
                    pickerLabel={labels.openCalendar}
                    popoverLabel={labels.calendarDialog}
                    required
                    disabled={formDisabled}
                    onChange={setCheckIn}
                  />
                </div>
                <div className="booking-page__field">
                  <label htmlFor="check-out">
                    {labels.checkOut} <span>*</span>
                  </label>
                  <BookingDateField
                    id="check-out"
                    name="checkOut"
                    icon="check-out"
                    value={form.checkOut}
                    min={form.checkIn || today}
                    locale={locale}
                    placeholder={labels.datePlaceholder}
                    pickerLabel={labels.openCalendar}
                    popoverLabel={labels.calendarDialog}
                    required
                    disabled={formDisabled}
                    align="end"
                    onChange={setCheckOut}
                  />
                </div>
              </div>
              <div className="booking-page__field booking-page__field--full">
                <label htmlFor="arrival-time">{labels.arrivalTime}</label>
                <BookingTimeField
                  id="arrival-time"
                  name="arrivalTime"
                  value={form.arrivalTime}
                  placeholder={labels.timePlaceholder}
                  pickerLabel={labels.openTime}
                  popoverLabel={labels.timeDialog}
                  hourLabel={labels.hourLabel}
                  minuteLabel={labels.minuteLabel}
                  clearLabel={labels.clearTime}
                  disabled={formDisabled}
                  onChange={setArrivalTime}
                />
              </div>
            </fieldset>

            <fieldset className="booking-page__group" disabled={formDisabled}>
              <legend className="booking-page__legend">{labels.groupGuests}</legend>
              <div className="booking-page__grid booking-page__grid--2">
                <div className="booking-page__field">
                  <label htmlFor="accommodation">{labels.accommodation}</label>
                  <BookingFieldControl icon="accommodation">
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
                  </BookingFieldControl>
                </div>
                <div className="booking-page__field">
                  <label htmlFor="guests">
                    {labels.guests} <span>*</span>
                  </label>
                  <BookingFieldControl icon="guests">
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
                  </BookingFieldControl>
                </div>
              </div>
            </fieldset>

            <fieldset className="booking-page__group" disabled={formDisabled}>
              <legend className="booking-page__legend">{labels.groupContact}</legend>
              <div className="booking-page__grid booking-page__grid--2">
                <div className="booking-page__field">
                  <label htmlFor="first-name">
                    {labels.firstName} <span>*</span>
                  </label>
                  <BookingFieldControl icon="first-name">
                    <input
                      id="first-name"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={form.firstName}
                      onChange={handleChange('firstName')}
                    />
                  </BookingFieldControl>
                </div>
                <div className="booking-page__field">
                  <label htmlFor="last-name">
                    {labels.lastName} <span>*</span>
                  </label>
                  <BookingFieldControl icon="last-name">
                    <input
                      id="last-name"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={form.lastName}
                      onChange={handleChange('lastName')}
                    />
                  </BookingFieldControl>
                </div>
                <div className="booking-page__field booking-page__field--full">
                  <label htmlFor="email">
                    {labels.email} <span>*</span>
                  </label>
                  <BookingFieldControl icon="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={handleChange('email')}
                    />
                  </BookingFieldControl>
                </div>
                <div className="booking-page__field booking-page__field--full">
                  <label htmlFor="phone">
                    {labels.phone} <span>*</span>
                  </label>
                  <BookingFieldControl icon="phone">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      inputMode="tel"
                      value={form.phone}
                      onChange={handleChange('phone')}
                    />
                  </BookingFieldControl>
                </div>
              </div>
            </fieldset>

            <fieldset className="booking-page__group" disabled={formDisabled}>
              <legend className="booking-page__legend">{labels.groupMessage}</legend>
              <div className="booking-page__field booking-page__field--full">
                <label htmlFor="message">{labels.message}</label>
                <BookingFieldControl icon="message" multiline>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={labels.messagePlaceholder}
                    value={form.message}
                    onChange={handleChange('message')}
                  />
                </BookingFieldControl>
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
          </>
        )}
      </div>
    </article>
  );
}

export default BookingPage;
