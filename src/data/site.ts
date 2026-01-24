// Site configuration and content data

export const siteConfig = {
  name: 'SalonMate',
  url: 'https://salonmate.pl',
  email: 'hej@salonmate.pl',
  surveyUrl: 'https://app.youform.com/forms/1ofucpes',
};

// Analytics & Tracking IDs (from environment variables)
export const analyticsConfig = {
  googleAnalytics: import.meta.env.PUBLIC_GA_ID || '',
  facebookPixel: import.meta.env.PUBLIC_FB_PIXEL_ID || '',
  microsoftClarity: import.meta.env.PUBLIC_CLARITY_ID || '',
};

// Cloudflare Turnstile (anti-bot)
export const turnstileConfig = {
  siteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '',
};

export const navLinks = [
  { href: '/#features', label: 'Funkcje' },
  { href: '/#faq', label: 'FAQ' },
] as const;

export const heroContent = {
  badge: 'Budujemy z Wami',
  title: {
    line1: 'Przestań odpisywać',
    line2: 'na DM-y',
    line3: 'do północy',
  },
  description: 'Tworzymy AI recepcjonistkę dla salonów beauty. Odpowiada w 8 sekund, umawia wizyty przez Instagram. Chcemy to zbudować razem z Tobą.',
  benefits: [
    'Odpowiedź w 8 sekund zamiast 4 godzin',
    'Rezerwacje bez wychodzenia z Instagrama',
    'Integracja z Booksy, Fresha i Google Calendar',
  ],
  ctaText: 'Chcę przetestować pierwsza',
  ctaNote: 'Darmowy dostęp + wpływ na rozwój produktu',
};

export const trustLogos = [
  {
    name: 'Instagram',
    description: 'DM-y i komentarze',
    color: '#E4405F',
  },
  {
    name: 'Messenger',
    description: 'Wiadomości i komentarze',
    color: '#0084FF',
  },
  {
    name: 'Booksy',
    description: 'Kalendarz i rezerwacje',
    color: '#00B67A',
  },
  {
    name: 'Fresha',
    description: 'Kalendarz i rezerwacje',
    color: '#7B68EE',
  },
  {
    name: 'Google Calendar',
    description: 'Synchronizacja',
    color: '#4285F4',
  },
] as const;

export const problemContent = {
  title: 'Znowu 22:00 i 14 nieprzeczytanych wiadomości na Instagramie?',
  description: '„Ile kosztuje balayage?" „Macie coś w sobotę?" „A można dziś?" Te same pytania. Każdego dnia. A Ty tylko chcesz obejrzeć serial bez telefonu w ręku.',
  painPoints: [
    'Te same pytania 10-15 razy dziennie — a Ty odpowiadasz ręcznie',
    '23% klientek rezerwuje u konkurencji, bo nie odpisałaś w godzinę',
    'Niedzielne popołudnie? Ty dalej odpisujesz na DM-y',
    'Recepcjonistka = 4-5 tys. zł/mies. SalonMate = od 199 zł',
  ],
  stats: [
    { title: 'Średni czas odpowiedzi', badge: 'Typowy salon', value: '4.5h', desc: 'Po 4h klientka już jest u konkurencji' },
    { title: 'Utracone rezerwacje', badge: 'Twarde dane', value: '23%', desc: 'Tylu tracisz przez wolną odpowiedź' },
    { title: 'Czas na odpowiedzi', badge: 'Codziennie', value: '2-3h', desc: 'Głównie po 21:00 i w weekendy' },
  ],
};

export const forWhoContent = {
  ideal: {
    title: 'Idealne dla Ciebie',
    items: [
      'Dostajesz 10+ wiadomości dziennie na IG/FB',
      'Odpowiadasz na te same pytania w kółko',
      'Chcesz odzyskać wieczory dla siebie',
      'Używasz Booksy, Fresha lub kalendarza',
      'Zależy Ci na szybkiej obsłudze klientek',
    ],
  },
  notIdeal: {
    title: 'To nie dla Ciebie',
    items: [
      'Musisz kontrolować każdą wiadomość osobiście',
      'Nie prowadzisz social media',
      'Dostajesz mniej niż 5 wiadomości tygodniowo',
      'Nie używasz żadnego kalendarza online',
      'Wolisz wszystko robić ręcznie',
    ],
  },
};

export const solutionFeatures = [
  {
    icon: 'message',
    title: 'Błyskawiczne odpowiedzi',
    description: 'AI odpowiada na DM-y 24/7 — w Twoim stylu. Klientka dostaje odpowiedź, Ty nie pracujesz wieczorami.',
  },
  {
    icon: 'calendar',
    title: 'Automatyczne rezerwacje',
    description: 'Sprawdza kalendarz, proponuje terminy, finalizuje wizytę. Wszystko w konwersacji na Instagramie.',
  },
  {
    icon: 'lightbulb',
    title: 'Zna Twój salon',
    description: 'Cennik, usługi, zasady — AI odpowiada na wszystko. Uczysz ją raz, pamięta na zawsze.',
  },
  {
    icon: 'bell',
    title: 'Przekazuje trudne sprawy',
    description: 'Reklamacje, VIP-y, nietypowe pytania — dostajesz powiadomienie. AI wie, kiedy się wycofać.',
  },
] as const;

export const comparisonContent = {
  before: {
    scenario: 'Klientka pisze o 21:37. Ty widzisz o 23:15...',
    userMessage: 'Hej, ile kosztuje balayage?',
    response: 'Hej! Od 350zł. Sprawdzę kalendarz i napiszę rano.',
    time: 'Odpowiedź po 1h 38min',
  },
  after: {
    scenario: 'Klientka pisze o 21:37. AI odpowiada...',
    userMessage: 'Hej, ile kosztuje balayage?',
    response: 'Cześć! Balayage od 350 zł. Mamy wolne: czwartek 10:00 i piątek 14:00. Który pasuje?',
    time: 'Odpowiedź po 8 sek',
  },
};

export const howItWorksSteps = [
  {
    number: '01',
    title: 'Połącz konta',
    description: 'Podłącz Instagram, Facebook i kalendarz (Booksy, Fresha lub Google). Bez wiedzy technicznej, zajmuje 5 minut.',
  },
  {
    number: '02',
    title: 'Dodaj informacje o salonie',
    description: 'Wgraj cennik, usługi i zasady. Im więcej szczegółów, tym lepsze odpowiedzi.',
  },
  {
    number: '03',
    title: 'Odpoczywaj',
    description: 'SalonMate odpowiada na wiadomości. Ty dostajesz powiadomienia tylko gdy trzeba.',
  },
] as const;

export const securityFeatures = [
  { icon: 'shield', title: 'RODO', desc: 'Pełna zgodność z przepisami' },
  { icon: 'lock', title: 'Szyfrowanie', desc: 'Dane zawsze zaszyfrowane' },
  { icon: 'database', title: 'Serwery EU', desc: 'Dane zostają w Europie' },
  { icon: 'trash', title: 'Usuń dane', desc: 'W każdej chwili' },
] as const;

export const additionalFeatures = [
  { number: '01', title: 'Naturalne rozmowy', desc: 'Klientki nie zorientują się, że rozmawiają z AI. Brzmi jak Ty.' },
  { number: '02', title: 'Kalendarz na żywo', desc: 'Zawsze aktualna dostępność. Zero podwójnych rezerwacji.' },
  { number: '03', title: 'Wiele języków', desc: 'Polski, angielski, ukraiński — bez konfiguracji.' },
  { number: '04', title: 'Mądre przekazywanie', desc: 'Trudne sprawy trafiają do Ciebie. Reszta — do AI.' },
  { number: '05', title: 'Statystyki', desc: 'Ile wiadomości? Jakie pytania? Ile wizyt umówionych?' },
  { number: '06', title: 'Twój styl', desc: 'Dostosuj ton i emoji. Profesjonalnie lub przyjaźnie.' },
] as const;

export const pricingPlans = [
  {
    tier: 'Starter',
    price: '199',
    period: 'miesięcznie',
    description: 'Na start dla małych salonów',
    features: [
      '1 konto Instagram + Facebook',
      'Do 500 wiadomości / mies.',
      'Odpowiedzi na DM i komentarze',
      'Pomoc przez email',
    ],
    featured: false,
  },
  {
    tier: 'Pro',
    price: '399',
    period: 'miesięcznie',
    description: 'Pełna automatyzacja',
    features: [
      'Do 3 kont social media',
      'Bez limitu wiadomości',
      'Rezerwacje przez DM',
      'Booksy / Fresha',
    ],
    featured: true,
  },
  {
    tier: 'Sieci salonów',
    price: 'Indywidualnie',
    period: 'skontaktuj się',
    description: 'Dla wielu lokalizacji',
    features: [
      'Bez limitu kont',
      'Wszystko z Pro',
      'Dedykowany opiekun',
      'Pomoc 24/7',
    ],
    featured: false,
  },
] as const;

export const faqItems = [
  {
    question: 'Kiedy mogę zacząć korzystać?',
    answer: 'Zbieramy grupę pierwszych testerek. Gdy wystartujemy — powiadomimy Cię mailem. Jeśli wypełnisz ankietę, dostaniesz dostęp w pierwszej kolejności.',
  },
  {
    question: 'Czy klientki zorientują się, że to AI?',
    answer: 'Projektujemy odpowiedzi tak, żeby brzmiały naturalnie — w Twoim stylu, z Twoimi emoji. Jeśli ktoś zapyta wprost, AI powie prawdę.',
  },
  {
    question: 'Co jeśli AI powie coś głupiego?',
    answer: 'AI odpowiada TYLKO na podstawie informacji które jej dasz. Nie wymyśla cen. Nie obiecuje rzeczy których nie oferujesz. Gdy nie wie — przekazuje do Ciebie.',
  },
  {
    question: 'Jak to będzie działać z Booksy/Fresha?',
    answer: 'Planujemy integrację przez Google Calendar. AI zobaczy wolne terminy i utworzy rezerwację automatycznie. Dokładne szczegóły wypracujemy z testerkami.',
  },
  {
    question: 'Ile to będzie kosztować?',
    answer: 'Ceny planujemy od 199 zł/mies. Ale dla osób z wczesnego dostępu — specjalne warunki na stałe. Pierwsze testerki testują za darmo.',
  },
  {
    question: 'Dlaczego warto dołączyć teraz?',
    answer: 'Budujesz z nami produkt. Twój feedback = funkcje których potrzebujesz. Plus najlepsze ceny i priorytetowy dostęp.',
  },
] as const;

export const chatConversation = [
  { type: 'user' as const, text: 'Hej, ile kosztuje balayage?' },
  { type: 'bot' as const, text: 'Cześć! Balayage od 350 zł. Mamy wolne: czwartek 10:00 i piątek 14:00. Który pasuje?' },
  { type: 'user' as const, text: 'Czwartek!' },
  { type: 'bot' as const, text: 'Gotowe! Czwartek, 10:00 u Ani. Wyślę przypomnienie dzień wcześniej.' },
];

export const footerLinks = {
  product: [
    { href: '/#features', label: 'Funkcje' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/#waitlist', label: 'Dołącz do listy' },
  ],
  contact: [
    { href: 'mailto:hej@salonmate.pl', label: 'hej@salonmate.pl' },
  ],
  legal: [
    { href: '/polityka-prywatnosci', label: 'Polityka prywatności' },
  ],
};
