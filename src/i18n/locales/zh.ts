import type { LocaleCopy } from '../types';

export const zh: LocaleCopy = {
  preloaderText: 'Residence Le Vele',
  directBookingPopup: {
    ariaLabel: '最优价格保障',
    eyebrow: '官网直订',
    title: '当前最佳可用优惠',
    text: '通过我们官网直接预订，您始终可享受当前最佳可用优惠与最优价格。',
    closeCta: '我知道了',
  },
  addressCountry: '意大利',
  hero: {
    kicker: '撒丁岛，西北部',
    titleLines: ['超越', '地平线'],
    tagline: '您的下一次假期，从这里开始 …',
    lede:
      'Residence Le Vele 位于 Stintino：撒丁岛海滨度假公寓，亲近大海。原始自然、清澈海水与洁白沙滩——岛上最美的海域之一。',
    scrollAria: '滚动至 Residence',
    scrollLabel: '滚动',
    videoAria: '撒丁岛全景视频 — Residence Le Vele Stintino',
  },
  residenceIntro: {
    eyebrow: '度假寓所',
    titleLine: '欢迎来到',
    titleBrandBefore: 'Residence',
    titleBrandAccent: 'Le Vele',
    location: 'Cala Lupo',
    locationLabel: '海湾 · Stintino',
    kicker:
      '距海 300 米：车行道在我们这里结束；小海滩可沿一条适合婴儿车和自行车的小路步行抵达。',
    lead:
      '地中海灌木丛中的工作室公寓，配有游廊或露台。300 米处有一家小型购物中心，性价比出色；距 Stintino、La Pelosa 和撒丁岛西北部海域仅数分钟。远离过境车流的宁静寓所，适合地道的撒丁岛度假。',
    marquee: ['Cala Lupo', 'La Pelosa', '小海湾', '撒丁岛西北部', 'Stintino'],
    metricsAria: '一览',
  },
  residenceHighlights: [
    { value: '300 米', label: '距大海' },
    { value: '300 米', label: '购物中心' },
    { value: '~2 公里', label: 'Stintino 与 Pelosa' },
  ],
  residenceCards: [
    {
      title: 'La Pelosa',
      description:
        '距寓所仅数分钟，La Pelosa 是地中海最著名的海滩之一：细腻白沙、透明碧蓝海水，以及矗立海中的历史阿拉贡塔楼。',
      imageAlt: 'La Pelosa — 海滩与 Torre della Pelosa，Stintino',
      linkLabel: '探索 La Pelosa',
    },
    {
      title: 'Cala Lupo 海湾',
      description:
        '寓所位于车行道尽头，距海 300 米。Cala Lupo 海湾是距 Stintino 市中心约 2 公里的宁静区域：小海滩可沿平坦小路步行抵达，适合婴儿车和自行车。',
      imageAlt: 'Cala Lupo 海滩 — 沙滩、碧蓝海水，寓所附近的休闲海湾',
    },
    {
      title: '鸟瞰视角',
      description:
        '从空中俯瞰 Residence Le Vele：海岸、泳池与单间公寓掩映在地中海灌木丛中，距 Cala Lupo 大海仅数步之遥。',
      imageAlt: 'Residence Le Vele 航拍 — 撒丁岛 Stintino 海岸',
      images: [
        { alt: '海岸与泳池航拍 — Residence Le Vele，Stintino', caption: '海岸与泳池' },
        { alt: 'Residence Le Vele 公寓与大海航拍 — Stintino', caption: '度假寓所' },
        { alt: 'Residence Le Vele 海上日落航拍 — Stintino，撒丁岛', caption: '日落' },
      ],
    },
    {
      title: '如何抵达',
      description:
        '寓所可通过撒丁岛西北部主要交通路线轻松抵达——驾车、飞机或渡轮均可。',
      imageAlt: '前往 Stintino 的交通连接 — 撒丁岛西北部机场与港口',
      routes: [
        { distance: '~50 公里', label: 'Alghero 机场' },
        { distance: '~30 公里', label: 'Porto Torres 港' },
        { distance: '~150 公里', label: 'Olbia 港与机场' },
        { distance: '~150 公里', label: 'Golfo Aranci 港' },
      ],
      images: [
        { alt: 'Alghero 机场航站楼', caption: 'Alghero 机场' },
        { alt: 'Porto Torres 港口鸟瞰', caption: 'Porto Torres 港' },
      ],
    },
    {
      title: '四足伙伴',
      description:
        '在 Residence Le Vele，您的爱犬备受欢迎：地中海灌木丛中的宁静工作室、游廊与露台供户外休憩，Stintino 海岸——海滩与小径——驾车数分钟即可抵达。敬请尊重其他住客并遵守当地海滩规定。',
      imageAlt: '金毛寻回犬在撒丁岛浅海水中欢快奔跑',
    },
  ],
  residenceAccordion: {
    eyebrow: '详情',
    showcaseTitle: '位置与周边环境',
    title: '服务与活动',
    subtitle: '一切令您在 Residence Le Vele 的入住舒适惬意、亲近大海。',
    discoverMore: '了解更多',
    navHint: '滑动照片或选择预览',
  },
  residenceServices: {
    groups: [
      {
        id: 'free',
        title: '免费服务',
        badge: '已包含',
        items: [
          { icon: 'luggage', label: '行李寄存' },
          { icon: 'tv', label: '液晶电视机' },
          { icon: 'courtesy-kit', label: '客用洗漱套装' },
          { icon: 'ac', label: '空调' },
          { icon: 'wifi', label: 'Wi-Fi 网络连接' },
          { icon: 'parking', label: '免费停车位' },
        ],
      },
      {
        id: 'paid',
        title: '付费服务',
        items: [
          { icon: 'parking-paid', label: '无看守停车位' },
          { icon: 'extra-cleaning', label: '额外客房清洁' },
          { icon: 'laundry', label: '洗衣服务' },
          { icon: 'transport', label: '交通服务' },
        ],
      },
      {
        id: 'activities',
        title: '付费活动',
        items: [
          { icon: 'tennis', label: '网球场' },
          { icon: 'bike-rental', label: '自行车租赁' },
          { icon: 'boat-rental', label: '船只与橡皮艇租赁' },
          { icon: 'diving', label: '潜水课程' },
          { icon: 'asinara', label: 'Asinara 岛游览' },
          { icon: 'guided-tours', label: '导游陪同游览' },
        ],
      },
    ],
  },
  suitesIntro: {
    eyebrow: '住宿',
    title: '工作室公寓',
    count: '18',
    countLabel: '间工作室',
    kicker:
      '18 间工作室公寓分两类——海景与园景——每间可容纳 2 至 4 人。同等品质，两种体验 Stintino 的方式。',
    capacityNote: '共 18 间工作室——同一房型，两种景观（海景与园景）。',
    capacityGrid: {
      aria: '按人数与景观分类的工作室概览',
      sea: '海景',
      garden: '园景',
      seats2: '2 人',
      seats3: '3 人',
      seats4: '4 人',
      seatsUnit: '人',
      available: '可预订',
    },
    marquee: ['海景', '园景', '工作室公寓', 'Stintino', 'La Pelosa'],
    cardToggleDayAria: '显示日间照片',
    cardToggleNightAria: '显示夜间照片',
  },
  suites: {
    'vista-giardino': {
      title: '园景',
      kicker: '可容纳 2、3 或 4 位住客',
      tagline: '游廊、私家花园与地中海灌木丛的宁静。',
      description:
        '工作室可容纳 2、3 或 4 位住客：3 位住客配备额外单人床，4 位住客配备双层床（另含双人床）。顶盖游廊与私家花园入口。翻新浴室——宽敞步入式淋浴间或紧凑型淋浴间配坐浴盆，因房间而异。',
      features: [
        '2、3 或 4 位住客',
        '单人床（3 位住客）',
        '双层床（4 位住客）',
        '顶盖游廊',
        '私家花园',
        '翻新浴室',
        '小厨房',
        '免费 Wi-Fi',
      ],
      galleryAlts: [
        '顶盖游廊、庭院与私家花园 — 园景工作室 Le Vele',
        '露台配户外座椅、花园与海景 — Residence Le Vele，Stintino',
        '游廊上的餐桌、摩卡壶与园景 — 园景工作室 Le Vele',
        '游廊早餐，摩卡壶、白花与花园 — Residence Le Vele，Stintino',
        '卧室配双人床与独立浴室 — 园景工作室 Le Vele',
        '床铺细节，卷叠毛巾与木槿，庭院景观 — 园景工作室 Le Vele',
        '园景工作室双层床 — 4 位住客配置',
        '工作室室内与小厨房 — Residence Le Vele',
        '私家花园与顶盖游廊 — Residence Le Vele，Stintino',
        '顶盖游廊与户外区域 — 撒丁岛度假公寓',
        '翻新浴室，洗手盆与现代装潢 — Le Vele 工作室',
        '翻新浴室，步入式淋浴间 — Le Vele 工作室',
      ],
      listLabel: '园景',
      discoverAria: '探索园景',
      exploreCta: '探索套房',
      galleryKicker: '工作室 · 园景',
      galleryTitle: '沉浸体验',
    },
    'vista-mare': {
      title: '海景',
      kicker: '可容纳 2、3 或 4 位住客',
      tagline: '私人露台与 Stintino 海湾上的光影。',
      description:
        '工作室可容纳 2、3 或 4 位住客：3 位住客配备额外单人床，4 位住客配备双层床（另含双人床）。俯瞰海湾的私人露台，撒丁岛西北部阳光与朝向 La Pelosa 的日落。翻新浴室——较大淋浴间无坐浴盆，或紧凑型淋浴间配坐浴盆，因房间而异。',
      features: [
        '2、3 或 4 位住客',
        '单人床（3 位住客）',
        '双层床（4 位住客）',
        '私人露台',
        '配备炉灶的小厨房',
        '翻新浴室',
        '空调',
        '免费 Wi-Fi',
      ],
      galleryAlts: [
        '餐桌与海景露台 — Le Vele 工作室',
        '小厨房与通往海景露台的入口 — Residence Le Vele',
        '布置精美的露台，俯瞰工作室与大海 — Le Vele',
        '海景工作室，露台与海湾光影 — Residence Le Vele',
        '顶盖露台，餐桌、摩卡壶与海景 — Le Vele 工作室',
        '露台早餐，摩卡壶与夹竹桃 — Stintino 海景',
        '双人卧室，木槿与木质家具 — 海景工作室',
        '欢迎细节，卷叠毛巾与红色木槿 — Le Vele',
        '配备齐全的小厨房与用餐区 — 海景工作室',
        '双层床与海景 — 4 位住客配置',
        '海景套房全景 — Stintino，撒丁岛',
        '海景露台 — 工作室 Residence Le Vele，Stintino',
        '海景工作室室内细节 — Le Vele',
        '翻新浴室，洗手盆与现代装潢 — Le Vele 工作室',
        '翻新浴室，宽敞步入式淋浴间 — Le Vele 工作室',
      ],
      listLabel: '海景',
      discoverAria: '探索海景',
      exploreCta: '探索套房',
      galleryKicker: '工作室 · 海景',
      galleryTitle: '沉浸体验',
    },
  },
  residenceWelcome: {
    galleryAria: 'Residence Le Vele 照片画廊',
    imageAlts: [
      '黄昏时分 Residence Le Vele 鸟瞰，广场与花园 — Stintino',
      '带木质凉棚的私人露台，餐桌与海景 — Residence Le Vele',
      'Residence Le Vele 海边鸟瞰 — Stintino',
      '带木质凉棚与海景的工作室露台 — Le Vele',
      'Stintino 海岸外的传统三角帆船',
      '带凉亭、遮阳伞与海景的广场 — Residence Le Vele',
      '海岸与沙滩鸟瞰 — Residence Le Vele, Stintino',
    ],
    closeLabel: '关闭图库',
    prevLabel: '上一张',
    nextLabel: '下一张',
    counterLabel: '{current} / {total}',
    autoplayLabel: '浏览照片',
  },
  offers: {
    sectionEyebrow: '套餐',
    sectionTitle: '优惠与住宿',
    items: [
      {
        title: '情侣放松套餐',
        period: '春季与初夏',
        badge: 'Signature',
        description:
          '海景或园景工作室 3 晚，抵达欢迎饮品，视房态可延迟退房。',
      },
      {
        title: '家庭优惠',
        period: '六月 – 九月',
        badge: 'Family Choice',
        description:
          '4 位住客入住，周租享优惠价格，并提供游览专属协助。',
      },
      {
        title: '最优价格保证',
        period: '直接预订',
        badge: '直接预订保障',
        description:
          '通过本网站或电子邮件预订，享受最优价格，无第三方手续费。',
      },
    ],
  },
  infoServices: {
    eyebrow: '信息',
    title: '信息与条款',
    kicker: '入住 / 退房',
    checkInTitle: '入住',
    checkInTime: '15:30 至 19:00',
    checkOutTitle: '退房',
    checkOutTime: '10:00 前',
    noteLateCheckIn:
      '若 20:00 后入住，请至少提前 48 小时通过电话或电子邮件通知我们。',
    noteSupplement:
      '管理处保留对未提前通知的延迟抵达收取 €30.00 附加费的权利。',
    noteDeposit:
      '入住时需缴纳押金，退房时退还，除非产生额外费用。',
    noteCleaningPenalty:
      '若退房时住所未保持清洁，管理处保留收取清洁罚款的权利。',
    conditionsTitle: '条款',
    conditions: [
      '2 岁以下儿童使用婴儿床/摇篮，每晚每人 EUR 5。',
      '每间客房最多提供 1 张婴儿床。',
      '任何加床、婴儿床/摇篮或高脚椅视供应情况而定，须应要求经管理处确认。',
      '附加费用不会自动计入总价，须在入住期间另行支付。',
      '标准预订在抵达日期前 7 天内可免费取消。逾期取消或未入住，将收取全额预订费用。',
      '不可退款预订不可免费取消，须支付等于全额预订及住宿费用的违约金。',
      '最终清洁及抵达时的床品与毛巾已含在价格内。住宿超过 8 晚，床品每周更换一次。',
      '每日客房服务、额外床品更换及小厨房清洁为可选附加费用。',
      '房价不含任何餐食。',
      '欢迎携带宠物（犬/猫）。',
      '住客可使用现场停车场。',
    ],
  },
  reviews: {
    eyebrow: '评价',
    title: '住客心声',
    subtitleBefore: '摘自',
    subtitleAfter: '。',
    marqueeAria: '住客评价',
    prevAria: '上一条评价',
    nextAria: '下一条评价',
    ratingAria: '评分 {rating} / 5',
    openOn: '在 {platform} 上查看 →',
    summary: {
      reviewCountLabel: '条评价',
      google: {
        rating: 4.9,
        reviewCount: 142,
        platformLabel: 'Google',
        summaryText: 'Google 评分优异：住客称赞位置、清洁度与接待。',
      },
      tripadvisor: {
        rating: 4.5,
        reviewCount: 96,
        platformLabel: 'Tripadvisor',
        summaryText: 'Tripadvisor 高分评价：海景、宁静环境与家庭住宿备受赞誉。',
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
          'Cala Lupo 海湾宁静宜人，距 Stintino 市中心和 La Pelosa 仅数分钟。工作室整洁实用，露台景致迷人。强烈推荐悠闲度假。',
      },
      {
        id: 'g-2',
        source: 'google',
        rating: 5,
        author: 'Marco Bianchi',
        dateLabel: '2024',
        text:
          '物业维护良好，小厨房设施齐全，员工友善热情。海滩步行数分钟即可抵达。住宿体验非常愉快。',
      },
      {
        id: 'ta-1',
        source: 'tripadvisor',
        rating: 5,
        author: 'Alessandra M.',
        dateLabel: '2024',
        text:
          '寓所坐落于自然环境之中，小海湾触手可及。公寓宽敞整洁——家庭或情侣皆宜。',
      },
      {
        id: 'ta-2',
        source: 'tripadvisor',
        rating: 4,
        author: 'Paolo Deiana',
        dateLabel: '2023',
        text:
          '游览 Stintino 与撒丁岛西北部的绝佳据点。露台海景，停车便利，自助式住宿设施齐全。',
      },
      {
        id: 'g-3',
        source: 'google',
        rating: 5,
        author: 'Francesca L.',
        dateLabel: '2023',
        text:
          'Cala Lupo 是天堂一角：宁静安逸，清澈海水近在咫尺，工作室整洁有序。我们一定会再来。',
      },
      {
        id: 'g-4',
        source: 'google',
        rating: 4,
        author: 'Giuseppe Conti',
        dateLabel: '2023',
        text:
          '员工乐于助人，入住手续简便。观景露台令每一顿早餐都格外特别。Wi-Fi 满足基本需求。',
      },
      {
        id: 'ta-3',
        source: 'tripadvisor',
        rating: 5,
        author: 'Chiara Ferretti',
        dateLabel: '2024',
        text:
          '带孩子的家庭：空间充足，厨房齐全，距沙滩极近。La Pelosa 驾车数分钟即可抵达。',
      },
      {
        id: 'ta-4',
        source: 'tripadvisor',
        rating: 4,
        author: 'Roberto Sanna',
        dateLabel: '2023',
        text:
          '一周住宿非常惬意。晚间区域宁静——适合在海滨度过一天后寻求休憩的住客。',
      },
      {
        id: 'g-5',
        source: 'google',
        rating: 5,
        author: 'Valentina P.',
        dateLabel: '2024',
        text:
          '清洁无可挑剔，抵达时床品清新。寓所维护良好，地中海灌木丛环绕其间。',
      },
      {
        id: 'ta-5',
        source: 'tripadvisor',
        rating: 5,
        author: 'Luca & Marta G.',
        dateLabel: '2024',
        text:
          '情侣度假：日落时分的海景露台，宁静安逸与金雀花芬芳。推荐给热爱撒丁岛西北部的人士。',
      },
    ],
  },
  contactIntro: {
    eyebrow: '联系我们',
    title: '联系方式',
    kicker:
      'Stintino 度假公寓预订与咨询：电话、电子邮件及前往 Residence Le Vele 的路线指引。',
  },
  contactLabels: {
    phone: '电话',
    mobile: '手机',
    email: '电子邮件',
    address: '地址',
    directions: '路线指引',
    bookStay: '立即预订',
  },
  contactCustomOffer: {
    title: '定制报价',
    text: '如有特殊需求，可向我们索取个性化报价：发送电子邮件并注明日期、入住人数及偏好的房型，或直接致电联系我们。',
  },
  contactPhotoAlts: [
    'Stintino 海岸鸟瞰，泳池与小海湾 — Residence Le Vele',
    'Residence Le Vele 海角日落 — Stintino，撒丁岛',
    'Residence Le Vele 鸟瞰，公寓与大海 — Stintino，撒丁岛',
  ],
  siteMap: {
    placeholderAlt: 'Cala Lupo 海湾 — Residence Le Vele 所在区域，Stintino',
    badgeLabel: 'Residence Le Vele — Stintino',
    iframeTitle: '交互式地图 — Residence Le Vele Stintino',
    enableLabel: '启用地图',
    enableHint:
      '交互式 Google 地图使用第三方 cookie。请启用您的偏好设置以查看地图。',
    activateAria: '激活交互式地图',
    mapSectionAria: '寓所地图',
  },
  footer: {
    about:
      'Stintino 度假寓所，撒丁岛海滨住宿：La Pelosa 附近的公寓，私密、舒适，尽享撒丁岛西北部氛围。',
    explore: '探索',
    contacts: '联系',
    designBy: '设计',
    starsAria: '三星评级',
    instagramAria: 'Residence Le Vele Instagram',
    footerNavAria: '页脚导航',
    legalNavAria: '隐私与 cookie',
  },
  pelosa: {
    hero: {
      eyebrow: 'Stintino，撒丁岛',
      title: 'La Pelosa',
      tagline: '地中海最著名的海滩之一。',
      lede:
        '白沙、碧蓝海水与阿拉贡塔楼：撒丁岛西北部的标志，距 Residence Le Vele 仅数分钟。',
      videoLabel: 'Stintino La Pelosa 海滩视频',
    },
    intro: {
      eyebrow: '海滩',
      title: '享誉全球',
      lead:
        'La Pelosa 面朝撒丁岛西北角：Stintino 标志海滩，距 Residence Le Vele 仅数分钟。',
      body:
        '远方，Torre della Pelosa 小岛是 Stintino 的标志性象征。夏季实行准入管理以保护环境：建议提前预订并尽早抵达，旺季尤甚。',
      statValue: '~2 公里',
      statLabel: '距 Residence Le Vele',
    },
    gallery: {
      eyebrow: '图库',
      title: '撒丁岛西北部的色彩',
      lead: '鸟瞰、海岸线与碧蓝海水：Stintino 最具标志海滩的四个视角。',
      viewLabel: '放大',
      imageAlts: [
        'La Pelosa 海滩鸟瞰，碧蓝海水与 Torre della Pelosa',
        'La Pelosa 俯瞰：海岸线、遮阳伞与塔楼',
        'La Pelosa 潟湖与白沙，海水清澈',
        '碧蓝海水，地平线上 Torre della Pelosa',
      ],
    },
    ui: {
      back: '← Residence Le Vele',
      scrollAria: '滚动至内容',
      scrollLabel: '滚动',
      muteOn: '取消静音',
      muteOff: '静音',
      closeLightbox: '关闭',
      closeGallery: '关闭图库',
      openImage: '打开图片：{alt}',
    },
  },
  suitePage: {
    notFound: '未找到套房',
    backToSuites: '← 返回套房',
    backLink: '← 工作室公寓',
    specsAria: '套房信息',
    guests: '2 / 3 / 4',
    guestsLabel: '位住客',
    locationValue: 'Stintino',
    locationLabel: '撒丁岛',
    typeValue: '工作室',
    typeLabel: '度假',
    scrollAria: '滚动至内容',
    scrollLabel: '滚动',
    experience: '体验',
    storyNote:
      'Residence Le Vele 度假公寓 — Stintino，距撒丁岛西北部最美海滩仅数分钟。',
    amenitiesEyebrow: '设施',
    amenitiesTitle: '一应俱全',
    galleryAria: '图库 {title}',
    bookingEyebrow: '预订',
    bookingTitle: '查询空房',
    bookingText:
      '请告知日期、住客人数与偏好——我们将回复个性化报价。',
    bookingCta: '索取报价',
    mailSubjectPrefix: '预订',
    otherSuite: '其他套房',
    allSuites: '← 全部套房',
    heroAltSuffix: '— Stintino 度假工作室，Residence Le Vele',
  },
  header: {
    navAria: '主菜单',
    mainNavAria: '主页',
  },
  seo: {
    default: {
      title: 'Residence Le Vele | Stintino 撒丁岛度假公寓',
      description:
        'Residence Le Vele 位于 Stintino：海景与园景工作室，La Pelosa 附近住宿。预订您的撒丁岛度假公寓。',
      keywords:
        'residence stintino, holiday apartments sardinia, seaside stay, la pelosa, cala lupo, studios stintino',
    },
    booking: {
      title: 'Residence Le Vele | 查询空房',
      description:
        '查询 Residence Le Vele Stintino 住宿空房：提供日期、工作室类型与住客人数。通过电子邮件个性化回复。',
      keywords:
        'book residence stintino, availability request, studio apartments stintino, sardinia holiday apartments',
      breadcrumb: '查询空房',
    },
    info: {
      title: 'Residence Le Vele | 住宿信息与条款',
      description:
        'Residence Le Vele Stintino 入住、退房、预订条款、押金、宠物与停车信息。',
      keywords:
        'residence stintino info, stay conditions, check-in check-out, sardinia apartment booking',
      breadcrumb: '信息与条款',
    },
    contact: {
      title: 'Residence Le Vele | 联系方式与路线',
      description:
        'Residence Le Vele Stintino 电话、电子邮件与路线：撒丁岛度假公寓预订与咨询。',
      keywords:
        'residence stintino contact, le vele directions, stintino booking phone, sardinia holiday apartments',
      breadcrumb: '联系方式',
    },
    pelosa: {
      title: 'La Pelosa Stintino | Residence Le Vele — 海滩与大海',
      description:
        'Stintino La Pelosa：撒丁岛最美海滩之一，距 Residence Le Vele 仅数分钟。',
      keywords: 'la pelosa stintino, stintino beach, residence le vele, sardinia sea',
    },
    privacy: {
      title: '隐私政策 | Residence Le Vele Stintino',
      description: 'Residence Le Vele Stintino 隐私声明与个人数据处理说明。',
    },
    cookie: {
      title: 'Cookie 政策 | Residence Le Vele Stintino',
      description: 'Residence Le Vele 网站 Cookie 政策与同意管理。',
    },
    suiteTitleSuffix: '| Residence Le Vele — Stintino 公寓',
    suiteDescriptionSuffix: '预订 Stintino 工作室，La Pelosa 附近。',
    suiteKeywords: 'studio stintino, holiday apartments sardinia, residence le vele',
    fallbackTitleSuffix: '| Stintino，撒丁岛',
    ogImageAlt: 'Residence Le Vele — Stintino 工作室，La Pelosa 附近',
    breadcrumbHome: '首页',
    schemaDescription:
      'Residence Le Vele 位于 Stintino：海景与园景工作室，La Pelosa 附近住宿。',
    schemaAmenities: [
      '免费 Wi-Fi',
      '空调',
      '游廊或露台',
      '私家花园',
      '小厨房',
      '海景',
    ],
    schemaTouristTypes: ['家庭', '情侣', '徒步者'],
    nearbyAttractions: [
      { name: 'La Pelosa', description: 'Stintino 标志海滩，距寓所约 2 公里。' },
      {
        name: 'Cala Lupo 海湾',
        description: '距寓所 300 米的小海滩，可沿适合婴儿车和自行车的小路步行抵达。',
      },
      {
        name: '购物中心',
        description: '300 米处的小型购物中心，性价比出色。',
      },
      { name: 'Stintino 历史中心', description: '撒丁岛西北部渔村，毗邻寓所。' },
    ],
  },
  errorBoundary: {
    title: '哎呀… 出了点问题',
    body: '我们的史前小助手正在处理。请尝试重新加载页面，或返回 Residence 首页。',
    reload: '重新加载页面',
    home: '返回 Residence 首页',
    detailsLabel: '技术详情',
  },
  ogLocale: 'zh_CN',
};
