import type { LocaleCopy } from '../types';

export const ru: LocaleCopy = {
  preloaderText: 'Residence Le Vele',
  addressCountry: 'Италия',
  hero: {
    kicker: 'Сардиния, северо-запад',
    titleLines: ['За', 'горизонтом'],
    tagline: 'Ваш следующий отпуск начинается здесь …',
    lede:
      'Residence Le Vele в Stintino: апартаменты для отдыха на Сардинии у моря. Дикая природа, кристально чистая вода и белый песок — одно из самых красивых морей острова.',
    scrollAria: 'Прокрутить к Residence',
    scrollLabel: 'Прокрутить',
    videoAria: 'Панорамное видео Сардинии — Residence Le Vele Stintino',
  },
  residenceIntro: {
    eyebrow: 'Резиденция',
    titleLine: 'Добро пожаловать в',
    titleBrandBefore: 'Residence',
    titleBrandAccent: 'Le Vele',
    location: 'Cala Lupo',
    locationLabel: 'Бухта · Stintino',
    kicker:
      'В 300 м от моря: проезжая дорога заканчивается у нас; до небольшого пляжа можно дойти пешком по дорожке, подходящей для колясок и велосипедов.',
    lead:
      'Студии с верандой или террасой среди средиземноморской макии. В 300 м — небольшой торговый центр с отличным соотношением цены и качества; в нескольких минутах Stintino, La Pelosa и море северо-западной Сардинии. Спокойная резиденция вдали от транзитного движения для подлинного отдыха на Сардинии.',
    marquee: ['Cala Lupo', 'La Pelosa', 'Бухты', 'Северо-запад Сардинии', 'Stintino'],
    metricsAria: 'Кратко',
  },
  residenceHighlights: [
    { value: '300 м', label: 'До моря' },
    { value: '300 м', label: 'Торговый центр' },
    { value: '~2 км', label: 'Stintino и Pelosa' },
  ],
  residenceCards: [
    {
      title: 'La Pelosa',
      description:
        'Всего в нескольких минутах от Residence, La Pelosa — один из самых знаменитых пляжей Средиземноморья: мелкий белый песок, прозрачная бирюзовая вода и историческая Арагонская башня, возвышающаяся из моря.',
      imageAlt: 'La Pelosa — пляж и Torre della Pelosa, Stintino',
      linkLabel: 'Открыть La Pelosa',
    },
    {
      title: 'Бухта Cala Lupo',
      description:
        'Residence расположена там, где заканчивается проезжая дорога, в 300 м от моря. Бухта Cala Lupo — тихий район примерно в 2 км от центра Stintino: до небольшого пляжа можно дойти пешком по ровной дорожке, подходящей для колясок и велосипедов.',
      imageAlt: 'Пляж Cala Lupo — песок, бирюзовое море и отдых рядом с Residence',
    },
    {
      title: 'С высоты птичьего полёта',
      description:
        'Residence Le Vele с воздуха: побережье, бассейн и студии среди средиземноморской макии, в шаге от моря Cala Lupo.',
      imageAlt: 'Вид с воздуха на Residence Le Vele на побережье Stintino — Сардиния',
      images: [
        { alt: 'Вид с воздуха на побережье и бассейн — Residence Le Vele, Stintino', caption: 'Побережье и бассейн' },
        { alt: 'Вид с воздуха на Residence Le Vele с апартаментами и морем — Stintino', caption: 'Residence' },
        { alt: 'Закат с воздуха над Residence Le Vele и морем — Stintino', caption: 'Закат' },
      ],
    },
    {
      title: 'Как добраться',
      description:
        'До Residence легко добраться по основным транспортным магистралям северо-западной Сардинии — на автомобиле, самолёте или пароме.',
      imageAlt: 'Транспортные связи со Stintino — аэропорты и порты северо-западной Сардинии',
      routes: [
        { distance: '~50 км', label: 'Аэропорт Alghero' },
        { distance: '~30 км', label: 'Порт Porto Torres' },
        { distance: '~150 км', label: 'Порт и аэропорт Olbia' },
        { distance: '~150 км', label: 'Порт Golfo Aranci' },
      ],
      images: [
        { alt: 'Терминал аэропорта Alghero', caption: 'Аэропорт Alghero' },
        { alt: 'Вид сверху на порт Olbia', caption: 'Порт Olbia' },
      ],
    },
    {
      title: 'Четвероногие друзья',
      description:
        'В Residence Le Vele ваш пёс приветствуется: тихие студии среди средиземноморской макии, веранды и террасы для отдыха на свежем воздухе, а побережье Stintino — пляжи и тропы — всего в нескольких минутах на машине. Просим уважать других гостей и местные правила пляжей.',
      imageAlt: 'Золотистый ретривер радостно бежит по мелководью на Сардинии',
    },
  ],
  residenceAccordion: {
    eyebrow: 'Подробнее',
    showcaseTitle: 'Расположение и окрестности',
    title: 'Услуги и активности',
    subtitle: 'Всё, что делает ваше пребывание в Residence Le Vele комфортным, спокойным и близким к морю.',
    discoverMore: 'Узнать больше',
    navHint: 'Проведите по фото или выберите превью',
  },
  residenceServices: {
    groups: [
      {
        id: 'free',
        title: 'Бесплатные услуги',
        badge: 'Включено',
        items: [
          { icon: 'luggage', label: 'Камера хранения багажа' },
          { icon: 'tv', label: 'ЖК-телевизор' },
          { icon: 'courtesy-kit', label: 'Набор гостевых принадлежностей' },
          { icon: 'ac', label: 'Кондиционер' },
          { icon: 'wifi', label: 'Подключение к Wi-Fi' },
          { icon: 'parking', label: 'Бесплатная парковка' },
        ],
      },
      {
        id: 'paid',
        title: 'Платные услуги',
        items: [
          { icon: 'parking-paid', label: 'Неохраняемая парковка' },
          { icon: 'extra-cleaning', label: 'Дополнительная уборка номера' },
          { icon: 'laundry', label: 'Прачечная' },
          { icon: 'transport', label: 'Транспортные услуги' },
        ],
      },
      {
        id: 'activities',
        title: 'Платные активности',
        items: [
          { icon: 'tennis', label: 'Теннисный корт' },
          { icon: 'bike-rental', label: 'Прокат велосипедов' },
          { icon: 'boat-rental', label: 'Прокат лодок и надувных катеров' },
          { icon: 'diving', label: 'Курсы дайвинга' },
          { icon: 'asinara', label: 'Экскурсии на остров Asinara' },
          { icon: 'guided-tours', label: 'Экскурсии с гидом' },
        ],
      },
    ],
  },
  suitesIntro: {
    eyebrow: 'Размещение',
    title: 'Студии',
    count: '18',
    countLabel: 'студий',
    kicker: 'Два типа — море и сад — на 2–4 гостей, с уединением резиденции в Stintino.',
    marquee: ['Вид на море', 'Вид на сад', 'Студии', 'Stintino', 'La Pelosa'],
    cardToggleDayAria: 'Показать дневное фото',
    cardToggleNightAria: 'Показать ночное фото',
  },
  suites: {
    'vista-giardino': {
      title: 'Вид на сад',
      kicker: 'Студия на 2, 3 или 4 гостей',
      tagline: 'Веранда, частный сад и тишина средиземноморской макии.',
      description:
        'Студии на 2, 3 или 4 гостей: дополнительная односпальная кровать для 3 гостей, двухъярусная кровать для 4 (помимо двуспальной). Крытая веранда и выход в частный сад. Обновлённые ванные комнаты — просторная душевая кабина или компактный душ с биде, в зависимости от номера.',
      features: [
        '2, 3 или 4 гостя',
        'Односпальная кровать (3 гостя)',
        'Двухъярусная кровать (4 гостя)',
        'Крытая веранда',
        'Частный сад',
        'Обновлённая ванная',
        'Мини-кухня',
        'Бесплатный Wi-Fi',
      ],
      galleryAlts: [
        'Крытая веранда, патио и частный сад — студия с видом на сад Le Vele',
        'Терраса с уличной мебелью, садом и видом на море — Residence Le Vele, Stintino',
        'Обеденный стол на веранде с моккой и видом на сад — студия с видом на сад Le Vele',
        'Завтрак на веранде с моккой, белыми цветами и садом — Residence Le Vele, Stintino',
        'Спальня с двуспальной кроватью и собственной ванной — студия с видом на сад Le Vele',
        'Деталь кровати с свёрнутыми полотенцами и гибискусом, вид на патио — студия с видом на сад Le Vele',
        'Двухъярусная кровать в студии с видом на сад — размещение 4 гостей',
        'Интерьер студии с мини-кухней — Residence Le Vele',
        'Частный сад и крытая веранда — Residence Le Vele, Stintino',
        'Крытая веранда и открытая зона — апартаменты для отдыха на Сардинии',
        'Обновлённая ванная с раковиной и современной отделкой — студия Le Vele',
        'Обновлённая ванная с душевой кабиной — студия Le Vele',
      ],
      listLabel: 'Сад',
      discoverAria: 'Открыть вид на сад',
      exploreCta: 'Изучить студию',
      galleryKicker: 'Студия · вид на сад',
      galleryTitle: 'Полное погружение',
    },
    'vista-mare': {
      title: 'Вид на море',
      kicker: 'Студия на 2, 3 или 4 гостей',
      tagline: 'Частная терраса и свет над бухтой Stintino.',
      description:
        'Студии на 2, 3 или 4 гостей: дополнительная односпальная кровать для 3 гостей, двухъярусная кровать для 4 (помимо двуспальной). Частная терраса с видом на бухту, свет северо-западной Сардинии и закаты в сторону La Pelosa. Обновлённые ванные — просторный душ без биде или компактный душ с биде, в зависимости от номера.',
      features: [
        '2, 3 или 4 гостя',
        'Односпальная кровать (3 гостя)',
        'Двухъярусная кровать (4 гостя)',
        'Частная терраса',
        'Оборудованная кухонная плита',
        'Обновлённая ванная',
        'Кондиционер',
        'Бесплатный Wi-Fi',
      ],
      galleryAlts: [
        'Обеденный стол и терраса с видом на море — студия Le Vele',
        'Мини-кухня и выход на террасу с видом на море — Residence Le Vele',
        'Обставленная терраса с видом на студию и море — Le Vele',
        'Студия с видом на море, терраса и свет бухты — Residence Le Vele',
        'Крытая терраса со столом, моккой и видом на море — студия Le Vele',
        'Завтрак на террасе с моккой и олеандром — вид на море Stintino',
        'Двуспальная спальня с гибискусом и деревянной мебелью — студия с видом на море',
        'Приветственная деталь со свёрнутыми полотенцами и красным гибискусом — Le Vele',
        'Оборудованная мини-кухня и обеденная зона — студия с видом на море',
        'Двухъярусная кровать с видом на море — размещение 4 гостей',
        'Панорама из студии с видом на море — Stintino, Сардиния',
        'Терраса с видом на море — студия Residence Le Vele, Stintino',
        'Деталь интерьера студии с видом на море — Le Vele',
        'Обновлённая ванная с раковиной и современной отделкой — студия Le Vele',
        'Обновлённая ванная с просторной душевой кабиной — студия Le Vele',
      ],
      listLabel: 'Море',
      discoverAria: 'Открыть вид на море',
      exploreCta: 'Изучить студию',
      galleryKicker: 'Студия · вид на море',
      galleryTitle: 'Полное погружение',
    },
  },
  gallery: {
    title: 'Атмосфера Le Vele',
    imageAlts: [
      'Терраса с видом на море, мокка и олеандр — атмосфера Le Vele, Stintino',
      'Сад в Residence Le Vele в Stintino со средиземноморской макией',
      'Вид на море с резиденции с лодкой и макией — Stintino',
      'Студия с видом на море — Residence Le Vele, Stintino',
      'Веранда с садовой мебелью и моккой — студия с видом на сад Le Vele',
      'Мини-кухня и выход на террасу с видом на море — Residence Le Vele',
      'Зелёная зона и веранда — апартаменты для отдыха на Сардинии',
      'Деталь спальни с белым гибискусом и верандой с видом на сад — Le Vele',
      'Интерьер студии с видом на море и балконом с видом на океан — Le Vele, Stintino',
      'Общая открытая терраса с шезлонгами и видом на море — Residence Le Vele',
    ],
    closeLabel: 'Закрыть галерею',
    prevLabel: 'Предыдущее изображение',
    nextLabel: 'Следующее изображение',
    counterLabel: '{current} / {total}',
    autoplayLabel: 'Просмотр фотографий',
  },
  offers: {
    sectionEyebrow: 'Пакеты',
    sectionTitle: 'Предложения и проживание',
    items: [
      {
        title: 'Пакет Couple Relax',
        period: 'Весна и раннее лето',
        badge: 'Signature',
        description:
          '3 ночи в студии с видом на море или сад, приветственный напиток по прибытии и поздний выезд при наличии возможности.',
      },
      {
        title: 'Семейное предложение',
        period: 'Июнь – сентябрь',
        badge: 'Family Choice',
        description:
          'Проживание для 4 гостей со сниженным тарифом при недельном бронировании и персональной поддержкой при организации экскурсий.',
      },
      {
        title: 'Гарантия лучшей цены',
        period: 'Прямое бронирование',
        badge: 'Прямая гарантия',
        description:
          'Бронируйте через наш сайт или по электронной почте, чтобы получить лучшую цену без комиссий посредников.',
      },
    ],
  },
  infoServices: {
    eyebrow: 'Информация',
    title: 'Информация и условия',
    kicker: 'Заезд / Выезд',
    checkInTitle: 'Заезд',
    checkInTime: 'с 15:30 до 19:00',
    checkOutTitle: 'Выезд',
    checkOutTime: 'до 10:00',
    noteLateCheckIn:
      'При заезде после 20:00 просим уведомить нас не менее чем за 48 часов по телефону или электронной почте.',
    noteSupplement:
      'Администрация оставляет за собой право взимать доплату в размере €30,00 за поздний заезд без предварительного уведомления.',
    noteDeposit:
      'При заезде потребуется залог, который возвращается при выезде, если не применяются дополнительные расходы.',
    noteCleaningPenalty:
      'Если при выезде жильё оставлено неубранным, администрация оставляет за собой право взимать штраф за уборку.',
    conditionsTitle: 'Условия',
    conditions: [
      'Ребёнок до 2 лет оплачивает EUR 5 за человека за ночь за детскую кроватку.',
      'Максимальное количество детских кроваток в номере — 1.',
      'Любая дополнительная кровать, детская кроватка или высокий стул предоставляются при наличии и должны быть подтверждены администрацией по запросу.',
      'Доплаты не рассчитываются автоматически в общей стоимости и оплачиваются отдельно во время проживания.',
      'Отмена бесплатна для стандартных бронирований за 7 дней до даты заезда. При поздней отмене или незаезде взимается полная стоимость бронирования.',
      'Отмена невозвратных бронирований не бесплатна и влечёт штраф, равный полной стоимости бронирования и проживания.',
      'Финальная уборка, постельное бельё и полотенца при заезде включены в цену. Смена белья еженедельно при проживании более 8 ночей.',
      'Ежедневная уборка, дополнительная смена белья и уборка мини-кухни — по желанию за дополнительную плату.',
      'Тарифы не включают питание.',
      'Домашние животные (собаки/кошки) приветствуются.',
      'На территории доступна парковка для гостей.',
    ],
  },
  reviews: {
    eyebrow: 'Отзывы',
    title: 'Что говорят наши гости',
    subtitleBefore: 'Выдержки из',
    subtitleAfter: '.',
    marqueeAria: 'Отзывы гостей',
    prevAria: 'Предыдущий отзыв',
    nextAria: 'Следующий отзыв',
    ratingAria: 'Оценка {rating} из 5',
    openOn: 'Открыть на {platform} →',
    summary: {
      reviewCountLabel: 'отзывов',
      google: {
        rating: 4.9,
        reviewCount: 142,
        platformLabel: 'Google',
        summaryText: 'Отличные оценки в Google: гости отмечают расположение, чистоту и приём.',
      },
      tripadvisor: {
        rating: 4.5,
        reviewCount: 96,
        platformLabel: 'Tripadvisor',
        summaryText: 'Высокие оценки на Tripadvisor за море, тишину и семейный отдых.',
      },
    },
    items: [
      {
        id: 'g-1',
        source: 'google',
        rating: 5,
        author: 'Elena Rossi',
        dateLabel: '2024',
        text:
          'Тихое расположение в бухте Cala Lupo, всего в нескольких минутах от центра Stintino и La Pelosa. Чистые, функциональные студии и терраса с потрясающим видом. Настоятельно рекомендуем для спокойного отпуска.',
      },
      {
        id: 'g-2',
        source: 'google',
        rating: 5,
        author: 'Marco Bianchi',
        dateLabel: '2024',
        text:
          'Ухоженная территория, полностью оборудованная мини-кухня и дружелюбный персонал. До пляжа несколько минут пешком. Прекрасно провели время.',
      },
      {
        id: 'ta-1',
        source: 'tripadvisor',
        rating: 5,
        author: 'Alessandra M.',
        dateLabel: '2024',
        text:
          'Резиденция в природной среде с лёгким доступом к бухтам. Просторные, ухоженные апартаменты — идеально для семей или пар.',
      },
      {
        id: 'ta-2',
        source: 'tripadvisor',
        rating: 4,
        author: 'Paolo Deiana',
        dateLabel: '2023',
        text:
          'Отличная база для посещения Stintino и северо-западной Сардинии. Вид на море с террасы, удобная парковка и всё необходимое для самостоятельного отдыха.',
      },
      {
        id: 'g-3',
        source: 'google',
        rating: 5,
        author: 'Francesca L.',
        dateLabel: '2023',
        text:
          'Cala Lupo — уголок рая: тишина, кристально чистое море в шаговой доступности и аккуратные студии. Обязательно вернёмся.',
      },
      {
        id: 'g-4',
        source: 'google',
        rating: 4,
        author: 'Giuseppe Conti',
        dateLabel: '2023',
        text:
          'Отзывчивый персонал и простой заезд. Терраса с видом делает каждый завтрак особенным. Wi-Fi подходит для базовых нужд.',
      },
      {
        id: 'ta-3',
        source: 'tripadvisor',
        rating: 5,
        author: 'Chiara Ferretti',
        dateLabel: '2024',
        text:
          'Семья с детьми: достаточно места, полноценная кухня и минимальное расстояние до песка. La Pelosa всего в нескольких минутах на машине.',
      },
      {
        id: 'ta-4',
        source: 'tripadvisor',
        rating: 4,
        author: 'Roberto Sanna',
        dateLabel: '2023',
        text:
          'Очень приятная неделя. Тихий район вечером — идеально для тех, кто ищет отдых после дней у моря.',
      },
      {
        id: 'g-5',
        source: 'google',
        rating: 5,
        author: 'Valentina P.',
        dateLabel: '2024',
        text:
          'Безупречная чистота и свежее бельё при заезде. Резиденция хорошо ухожена и окружена средиземноморской макией.',
      },
      {
        id: 'ta-5',
        source: 'tripadvisor',
        rating: 5,
        author: 'Luca & Marta G.',
        dateLabel: '2024',
        text:
          'Пара в отпуске: терраса с видом на море на закате, тишина и аромат ракитника. Рекомендуем тем, кто любит северо-западную Сардинию.',
      },
    ],
  },
  contactIntro: {
    eyebrow: 'Свяжитесь с нами',
    title: 'Контакты',
    kicker:
      'Бронирование и запросы об апартаментах для отдыха в Stintino: телефон, электронная почта и маршрут до Residence Le Vele.',
  },
  contactLabels: {
    phone: 'Телефон',
    mobile: 'Мобильный',
    email: 'Электронная почта',
    address: 'Адрес',
  },
  contactPhotoAlts: [
    'Вид сверху на побережье Stintino с бассейном и бухтами — Residence Le Vele',
    'Закат над мысом Residence Le Vele — Stintino, Сардиния',
    'Вид сверху на Residence Le Vele с апартаментами и морем — Stintino, Сардиния',
  ],
  siteMap: {
    placeholderAlt: 'Бухта Cala Lupo — район Residence Le Vele в Stintino',
    badgeLabel: 'Residence Le Vele — Stintino',
    iframeTitle: 'Интерактивная карта — Residence Le Vele Stintino',
    enableLabel: 'Включить карту',
    enableHint:
      'Интерактивная карта Google использует сторонние cookie. Включите настройки, чтобы просмотреть её.',
    activateAria: 'Активировать интерактивную карту',
    mapSectionAria: 'Карта резиденции',
  },
  footer: {
    about:
      'Резиденция в Stintino для отдыха на Сардинии: апартаменты рядом с La Pelosa, с уединением, комфортом и атмосферой северо-западной Сардинии.',
    explore: 'Исследовать',
    contacts: 'Контакты',
    designBy: 'Дизайн',
    starsAria: 'Рейтинг 3 звезды',
    instagramAria: 'Residence Le Vele в Instagram',
    footerNavAria: 'Навигация в подвале',
    legalNavAria: 'Конфиденциальность и cookie',
  },
  pelosa: {
    hero: {
      eyebrow: 'Stintino, Сардиния',
      title: 'La Pelosa',
      tagline: 'Один из самых знаменитых пляжей Средиземноморья.',
      lede:
        'Белый песок, бирюзовая вода и Арагонская башня: символ северо-западной Сардинии всего в нескольких минутах от Residence Le Vele.',
      videoLabel: 'Видео пляжа La Pelosa в Stintino',
    },
    intro: {
      eyebrow: 'Пляж',
      title: 'Известен во всём мире',
      lead:
        'La Pelosa смотрит на северо-западный мыс Сардинии: знаковый пляж в Stintino, всего в нескольких минутах от Residence Le Vele.',
      body:
        'Вдали островок Torre della Pelosa — знаковый символ Stintino. Летом доступ регулируется для защиты окружающей среды: рекомендуем бронировать заранее и приезжать пораньше, особенно в высокий сезон.',
      statValue: '~2 км',
      statLabel: 'От Residence Le Vele',
    },
    gallery: {
      eyebrow: 'Галерея',
      title: 'Краски северо-западной Сардинии',
      lead: 'Виды с воздуха, побережье и бирюзовая вода: четыре перспективы на самый знаковый пляж Stintino.',
      viewLabel: 'Увеличить',
      imageAlts: [
        'Вид сверху на пляж La Pelosa, бирюзовое море и Torre della Pelosa',
        'La Pelosa сверху: побережье, зонтики и башня',
        'Лагуна и белый песок на La Pelosa с кристально чистым морем',
        'Бирюзовое море с Torre della Pelosa на горизонте',
      ],
    },
    ui: {
      back: '← Residence Le Vele',
      scrollAria: 'Прокрутить к содержанию',
      scrollLabel: 'Прокрутить',
      muteOn: 'Включить звук',
      muteOff: 'Выключить звук',
      closeLightbox: 'Закрыть',
      closeGallery: 'Закрыть галерею',
      openImage: 'Открыть изображение: {alt}',
    },
  },
  suitePage: {
    notFound: 'Студия не найдена',
    backToSuites: '← Назад к студиям',
    backLink: '← Студии',
    specsAria: 'Информация о студии',
    guests: '2 / 3 / 4',
    guestsLabel: 'гостей',
    locationValue: 'Stintino',
    locationLabel: 'Сардиния',
    typeValue: 'Студия',
    typeLabel: 'отдых',
    scrollAria: 'Прокрутить к содержанию',
    scrollLabel: 'Прокрутить',
    experience: 'Впечатления',
    storyNote:
      'Апартамент для отдыха в Residence Le Vele — Stintino, в нескольких минутах от самых красивых пляжей северо-западной Сардинии.',
    amenitiesEyebrow: 'Удобства',
    amenitiesTitle: 'Всё необходимое',
    galleryAria: 'Галерея {title}',
    bookingEyebrow: 'Бронирование',
    bookingTitle: 'Запросить наличие',
    bookingText:
      'Напишите нам с датами, количеством гостей и предпочтениями — мы ответим персональным предложением.',
    bookingCta: 'Запросить предложение',
    mailSubjectPrefix: 'Бронирование',
    otherSuite: 'Другая студия',
    allSuites: '← Все студии',
    heroAltSuffix: '— студия для отдыха Stintino, Residence Le Vele',
  },
  header: {
    navAria: 'Главное меню',
    mainNavAria: 'Главная',
  },
  seo: {
    default: {
      title: 'Residence Le Vele | Апартаменты для отдыха в Stintino, Сардиния',
      description:
        'Residence Le Vele в Stintino: студии с видом на море и сад, проживание рядом с La Pelosa. Забронируйте апартамент для отдыха на Сардинии.',
      keywords:
        'residence stintino, holiday apartments sardinia, seaside stay, la pelosa, cala lupo, studios stintino',
    },
    booking: {
      title: 'Residence Le Vele | Запрос наличия',
      description:
        'Запросите наличие для проживания в Residence Le Vele в Stintino: укажите даты, тип студии и количество гостей. Персональный ответ по электронной почте.',
      keywords:
        'book residence stintino, availability request, studio apartments stintino, sardinia holiday apartments',
      breadcrumb: 'Запрос наличия',
    },
    info: {
      title: 'Residence Le Vele | Информация и условия проживания',
      description:
        'Заезд, выезд, условия бронирования, залог, домашние животные и парковка в Residence Le Vele в Stintino.',
      keywords:
        'residence stintino info, stay conditions, check-in check-out, sardinia apartment booking',
      breadcrumb: 'Информация и условия',
    },
    contact: {
      title: 'Residence Le Vele | Контакты и маршрут',
      description:
        'Телефон, электронная почта и маршрут до Residence Le Vele в Stintino: бронирование и запросы об апартаментах для отдыха на Сардинии.',
      keywords:
        'residence stintino contact, le vele directions, stintino booking phone, sardinia holiday apartments',
      breadcrumb: 'Контакты',
    },
    pelosa: {
      title: 'La Pelosa Stintino | Residence Le Vele — Пляж и море',
      description:
        'La Pelosa в Stintino: один из самых красивых пляжей Сардинии, в нескольких минутах от Residence Le Vele.',
      keywords: 'la pelosa stintino, stintino beach, residence le vele, sardinia sea',
    },
    privacy: {
      title: 'Политика конфиденциальности | Residence Le Vele Stintino',
      description: 'Уведомление о конфиденциальности и обработке персональных данных в Residence Le Vele в Stintino.',
    },
    cookie: {
      title: 'Политика cookie | Residence Le Vele Stintino',
      description: 'Политика cookie и управление согласием для сайта Residence Le Vele.',
    },
    suiteTitleSuffix: '| Residence Le Vele — Апартаменты Stintino',
    suiteDescriptionSuffix: 'Забронируйте студию в Stintino, рядом с La Pelosa.',
    suiteKeywords: 'studio stintino, holiday apartments sardinia, residence le vele',
    fallbackTitleSuffix: '| Stintino, Сардиния',
    ogImageAlt: 'Residence Le Vele — студии в Stintino, рядом с La Pelosa',
    breadcrumbHome: 'Главная',
    schemaDescription:
      'Residence Le Vele в Stintino: студии с видом на море и сад, проживание рядом с La Pelosa.',
    schemaAmenities: [
      'Бесплатный Wi-Fi',
      'Кондиционер',
      'Веранда или терраса',
      'Частный сад',
      'Мини-кухня',
      'Вид на море',
    ],
    schemaTouristTypes: ['Семьи', 'Пары', 'Пешие туристы'],
    nearbyAttractions: [
      { name: 'La Pelosa', description: 'Знаковый пляж в Stintino, примерно в 2 км от резиденции.' },
      {
        name: 'Бухта Cala Lupo',
        description:
          'Небольшой пляж в 300 м от Residence, доступен пешком по дорожке, подходящей для колясок и велосипедов.',
      },
      {
        name: 'Торговый центр',
        description: 'Небольшой торговый центр в 300 м с отличным соотношением цены и качества.',
      },
      { name: 'Исторический центр Stintino', description: 'Рыбацкая деревня на северо-западе Сардинии, рядом с резиденцией.' },
    ],
  },
  errorBoundary: {
    title: 'Упс… что-то пошло не так',
    body: 'Наши доисторические помощники уже разбираются. Попробуйте перезагрузить страницу или вернитесь на главную Residence.',
    reload: 'Перезагрузить страницу',
    home: 'На главную Residence',
    detailsLabel: 'Технические детали',
  },
  ogLocale: 'ru_RU',
};
