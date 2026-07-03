// All copy lives here as { en, ja } pairs so the whole site is bilingual.
// Replace the placeholder details (dates, venue, prices, names) with real ones.

export const EVENT = {
  // Used by the countdown. ISO date — set to your real start date.
  startDate: "2026-09-18T10:00:00+09:00",
  dateLabel: { en: "Sep 18 – 20, 2026", ja: "2026年9月18日 – 20日" },
  location: { en: "Hakone Forest, Japan", ja: "神奈川・箱根の森" },
};

// Unified header menu — same labels for EN and JP.
// TODO: replace RESERVATION_URL with the real external booking link.
export const RESERVATION_URL = "https://forms.gle/k3pJhT2X19ousKda8";

// Full-quality hero video hosted externally (e.g. Cloudflare R2). Leave empty
// to use the local /videos/hero.mp4 fallback. Paste the R2 public URL here.
export const HERO_VIDEO_URL =
  "https://pub-5b7ca149bcf642439cd503a9b2966ff1.r2.dev/hero-1080p.mp4";

// YouTube video ID for the Movie section (https://youtu.be/<id>).
export const MOVIE_YT_ID = "TgmlRa3h0z4";

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Concept", href: "/#about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Instructor", href: "/instructor" },
  { label: "Venue", href: "/venue" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
  { label: "Reservation", href: RESERVATION_URL, external: true, cta: true },
];

export const HERO = {
  // Headline reads as one poetic line across two rows.
  line1: { en: "Heart, dance,", ja: "心、踊り" },
  line2: { en: "return to nature", ja: "自然に還る" },
  lyric: {
    en: "Three days in nature — opening the body, recovering the senses.",
    ja: "自然の中で、身体をひらき、感覚を取り戻す3日間",
  },
  cta: { en: "Reserve a place", ja: "席を予約する" },
  scroll: { en: "Scroll", ja: "スクロール" },
};

export const MARQUEE = {
  words: {
    en: ["Move", "Breathe", "Belong", "Repeat"],
    ja: ["踊る", "息をする", "還る", "くりかえす"],
  },
};

export const ABOUT = {
  label: "Concept",
  heading: {
    en: "Opening a relationship with\nthe world, through the body",
    ja: "身体を通して、\n世界との関係をひらく",
  },
  body: {
    en: "This dance camp isn't a place to memorize choreography — it's a place to look again at your relationship with yourself and your environment, through bodily sensation.\n\nLiving in nature, touching the earth barefoot, responding to sound and air — through moving and feeling, we open up the possibilities of the body.\n\nWe explore the richness of letting dance keep living within everyday life.",
    ja: "このダンスキャンプは、振付を覚える場ではなく、身体感覚を通して、自分と環境との関係を見つめ直す場です。\n\n自然の中で過ごし、裸足で土に触れ、音や空気に反応しながら、動くこと・感じることを通して、身体の可能性をひらいていきます。\n\n踊りが日常の中に在り続ける、その豊かさを探求します。",
  },
  notes: {
    en: ["( all levels )", "( forest setting )", "( small group )"],
    ja: ["（ 全レベル ）", "（ 森のなか ）", "（ 少人数 ）"],
  },
  stats: [
    { value: "3", label: { en: "Days", ja: "日間" } },
    { value: "24", label: { en: "Guests", ja: "名限定" } },
    { value: "9", label: { en: "Sessions", ja: "セッション" } },
    { value: "∞", label: { en: "Open floor", ja: "自由な床" } },
  ],
};

export const PROGRAM = {
  label: { en: "( the rhythm of a day )", ja: "（ 一日のリズム ）" },
  heading: { en: "A day at camp", ja: "キャンプの一日" },
  items: [
    {
      time: "07:00",
      title: { en: "Sunrise breathwork", ja: "朝の呼吸法" },
      desc: {
        en: "Wake the body slowly with breath and gentle mobility on the deck.",
        ja: "デッキで呼吸とゆるやかな可動性から、身体をゆっくり目覚めさせる。",
      },
    },
    {
      time: "09:30",
      title: { en: "Contemporary flow", ja: "コンテンポラリー・フロー" },
      desc: {
        en: "A guided movement session — release technique, floorwork, improvisation.",
        ja: "リリース・テクニック、フロアワーク、即興によるガイド付きセッション。",
      },
    },
    {
      time: "13:00",
      title: { en: "Rest & forest", ja: "休息と森歩き" },
      desc: {
        en: "Long lunch, hot spring, hammocks, or a quiet walk among the cedars.",
        ja: "長めの昼食、温泉、ハンモック、あるいは杉林の静かな散歩。",
      },
    },
    {
      time: "16:30",
      title: { en: "Partnering & play", ja: "パートナリングと遊び" },
      desc: {
        en: "Weight-sharing, contact improvisation, and trust built through touch.",
        ja: "体重を預け合うコンタクト・インプロ。触れることで育つ信頼。",
      },
    },
    {
      time: "20:00",
      title: { en: "Live music social", ja: "ライブ・ソーシャル" },
      desc: {
        en: "Musicians play, the floor opens, and nobody is watching. Just dance.",
        ja: "ミュージシャンが奏で、床がひらく。誰も見ていない。ただ踊るだけ。",
      },
    },
  ],
};

export const FACULTY = {
  label: { en: "( who holds the space )", ja: "（ 場をつくる人たち ）" },
  heading: { en: "Faculty", ja: "講師陣" },
  intro: {
    en: "Companions who learn together, guide the body, and move closer to nature.",
    ja: "共に学び、身体を導き、自然へと近づく仲間",
  },
  comingSoon: { en: "Coming soon", ja: "準備中" },
  comingSoonNote: {
    en: "This year's facilitators will be announced soon.",
    ja: "今年度の講師陣は準備中です。決まり次第お知らせします。",
  },
  people: [
    {
      name: "Mei Arakawa",
      role: { en: "Contemporary · Release", ja: "コンテンポラリー・リリース" },
      seed: "faculty-mei",
    },
    {
      name: "Léo Marchand",
      role: { en: "Contact Improvisation", ja: "コンタクト・インプロ" },
      seed: "faculty-leo",
    },
    {
      name: "Sora Kim",
      role: { en: "Breath · Somatics", ja: "呼吸・ソマティクス" },
      seed: "faculty-sora",
    },
    {
      name: "Daniela Rossi",
      role: { en: "Live Music · Rhythm", ja: "ライブ音楽・リズム" },
      seed: "faculty-dani",
    },
  ],
};

export const STAY = {
  label: { en: "( where you land )", ja: "（ 滞在する場所 ）" },
  heading: { en: "Held by\nthe mountains", ja: "山に包まれる\n住処" },
  body: {
    en: "Morning mist, birdsong, the presence of the mountains.\nClear air and the sounds of nature open the body.\n\nTaste the gifts of the land, soften in the hot spring.\nThree rich days spent with nature.",
    ja: "朝霧、鳥の声、山々の気配。\n澄んだ空気と自然の音が身体をひらく。\n\n土地の恵みを味わい、温泉に癒される。\n自然とともに過ごす、豊かな3日間。",
  },
  features: [
    { en: "Large timber lodge", ja: "木造大型施設" },
    { en: "Seasonal local meals", ja: "季節の地元食材の食事" },
    { en: "Natural hot spring", ja: "天然温泉かけ流し" },
    { en: "All-wood floor", ja: "全面木製床" },
  ],
  venue: {
    label: { en: "Venue", ja: "会場" },
    name: { en: "Shiga Environmental Learning Forest", ja: "四賀環境学習の森" },
    address: { en: "1915-1 Nakagawa, Matsumoto, Nagano", ja: "長野県松本市中川1915-1" },
  },
};

export const TICKETS = {
  label: { en: "( reserve your place )", ja: "（ 席を確保する ）" },
  heading: { en: "Tickets", ja: "チケット" },
  note: {
    en: "Early bird closes when 12 spots are gone. 24 guests total.",
    ja: "アーリーバードは先着12名で締切。全24名限定。",
  },
  tiers: [
    {
      name: { en: "Early Bird", ja: "アーリーバード" },
      price: "¥128,000",
      sub: { en: "First 12 only", ja: "先着12名" },
      perks: {
        en: ["Shared cabin", "All sessions & meals", "Hot spring access"],
        ja: ["相部屋キャビン", "全セッション・食事込み", "温泉利用"],
      },
      featured: false,
    },
    {
      name: { en: "Full Retreat", ja: "フル・リトリート" },
      price: "¥168,000",
      sub: { en: "Most popular", ja: "いちばん人気" },
      perks: {
        en: [
          "Private cabin",
          "All sessions & meals",
          "1:1 with a faculty member",
          "Hot spring access",
        ],
        ja: [
          "個室キャビン",
          "全セッション・食事込み",
          "講師との1on1セッション",
          "温泉利用",
        ],
      },
      featured: true,
    },
    {
      name: { en: "Patron", ja: "パトロン" },
      price: "¥240,000",
      sub: { en: "Supports a scholarship", ja: "奨学枠を支援" },
      perks: {
        en: [
          "Private valley-view suite",
          "Everything in Full Retreat",
          "Funds one scholarship seat",
        ],
        ja: [
          "谷ビューの個室スイート",
          "フル・リトリートの全内容",
          "奨学枠1名分を支援",
        ],
      },
      featured: false,
    },
  ],
  cta: { en: "Reserve a place", ja: "席を予約する" },
};

export const FAQ = {
  label: { en: "( before you ask )", ja: "（ よくある質問 ）" },
  heading: { en: "Questions", ja: "質問" },
  items: [
    {
      q: { en: "Do I need dance experience?", ja: "ダンス経験は必要ですか？" },
      a: {
        en: "No. Every session is open to all levels — complete beginners are genuinely welcome. The work is about listening to your body, not technique.",
        ja: "いりません。すべてのセッションは全レベル対象で、まったくの初心者も心から歓迎します。大切なのは技術ではなく、身体に耳を澄ますことです。",
      },
    },
    {
      q: { en: "What should I bring?", ja: "何を持っていけばいい？" },
      a: {
        en: "Comfortable clothes you can move in, a refillable bottle, and an open mind. The fee includes participation, meals, and facility use.",
        ja: "動きやすい服、マイボトル、そして開いた心を。料金には、参加費、食事、施設利用料が含まれています。",
      },
    },
    {
      q: { en: "How do I get there?", ja: "アクセスは？" },
      a: {
        en: "A private shuttle runs from Matsumoto Station at 10:00 am. Details are sent with your booking confirmation.",
        ja: "午前10時、松本駅から専用シャトルが運行します。詳細は予約確定時にお送りします。",
      },
    },
    {
      q: { en: "What's the cancellation policy?", ja: "キャンセルポリシーは？" },
      a: {
        en: "Free up to 15 days before. 14–8 days before: 20%, 7–3 days before: 50%, 2 days before–the day before: 80%, day of: 100%.",
        ja: "15日前まで無料。14日前〜8日前：20%、7日前〜3日前：50%、2日前〜前日：80%、当日：100%。",
      },
    },
  ],
};

export const REGISTER = {
  label: { en: "( the heart is open )", ja: "（ 心はひらいている ）" },
  heading: { en: "Come\ndance with us", ja: "一緒に\n踊ろう" },
  body: {
    en: "Questions, enquiries, or just to say hello — send us a message.",
    ja: "ご質問・お申し込み・ご連絡は、こちらからお気軽にどうぞ。",
  },
  form: {
    lastName: { en: "Last name", ja: "姓" },
    firstName: { en: "First name", ja: "名" },
    email: { en: "E-mail", ja: "E-mail" },
    message: { en: "Message", ja: "メッセージ" },
    send: { en: "Send", ja: "送信" },
  },
  success: {
    en: "Thank you — we'll be in touch shortly.",
    ja: "送信しました。折り返しご連絡いたします。",
  },
};

export const FOOTER = {
  tagline: { en: "Heart, dance. Return to nature.", ja: "心、踊り。自然に還る。" },
  rights: { en: "", ja: "" },
  links: [
    {
      label: { en: "Instagram", ja: "Instagram" },
      href: "https://www.instagram.com/cavamm2022",
      external: true,
    },
    { label: { en: "Contact", ja: "お問い合わせ" }, href: "/contact" },
  ],
};
