// Site configuration and content data

export const siteConfig = {
  name: 'SalonMate',
  url: 'https://salonmate.ai',
  email: 'hej@salonmate.ai',
  surveyUrl: 'https://app.youform.com/forms/1ofucpes',
};

// Analytics & Tracking IDs (from environment variables)
export const analyticsConfig = {
  googleAnalytics: import.meta.env.PUBLIC_GA_ID || '',
  facebookPixel: import.meta.env.PUBLIC_FB_PIXEL_ID || '',
  microsoftClarity: import.meta.env.PUBLIC_CLARITY_ID || '',
};

export const navLinks = [
  { href: '#features', label: 'Funkcje' },
  { href: '#pricing', label: 'Cennik' },
  { href: '#faq', label: 'FAQ' },
] as const;

export const heroContent = {
  badge: 'Startujemy wkrótce',
  title: {
    line1: 'Przestań odpisywać',
    line2: 'na DM-y',
    line3: 'do północy',
  },
  description: 'AI recepcjonistka, która odpowiada na wiadomości, umawia wizyty przez Instagram i zna Twój salon lepiej niż ktokolwiek.',
  benefits: [
    'Odpowiada na wiadomości 24/7',
    'Umawia wizyty przez DM',
    'Zna Twój cennik i usługi',
  ],
  ctaText: 'Zapisz się na listę',
  ctaNote: 'Darmowy test dla pierwszych użytkowniczek',
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
  title: 'Prowadzisz salon i zamiast odpoczywać wieczorem, odpisujesz na te same pytania?',
  description: '„Ile kosztuje balayage?" „Macie coś w sobotę?" „A można dziś?" Codziennie to samo. A Ty chcesz po prostu zjeść kolację w spokoju.',
  painPoints: [
    'Odpowiadasz na te same pytania 10+ razy dziennie',
    'Klientki idą do konkurencji bo nie odpisałaś wystarczająco szybko',
    'Wieczory i weekendy spędzasz z telefonem w ręku',
    'Recepcjonistka to 4-5 tys. zł miesięcznie',
  ],
  stats: [
    { title: 'Średni czas odpowiedzi', badge: 'Typowy salon', value: '4.5h', desc: 'Tyle czeka klientka na odpowiedź' },
    { title: 'Utracone rezerwacje', badge: 'Badania', value: '23%', desc: 'Klientek rezygnuje bez szybkiej odpowiedzi' },
    { title: 'Czas na odpowiedzi', badge: 'Dziennie', value: '2-3h', desc: 'Głównie wieczorami i w weekendy' },
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
    title: 'Odpowiada na DM-y',
    description: 'Naturalne odpowiedzi na Instagramie i Facebooku. W Twoim stylu — jakbyś pisała sama.',
  },
  {
    icon: 'calendar',
    title: 'Umawia wizyty',
    description: 'Sprawdza kalendarz, proponuje terminy, finalizuje rezerwację. Klientka nie wychodzi z apki.',
  },
  {
    icon: 'lightbulb',
    title: 'Zna Twój salon',
    description: 'Cennik, usługi, dostępność — odpowiada na wszystko jak doświadczona recepcjonistka.',
  },
  {
    icon: 'bell',
    title: 'Powiadamia Cię',
    description: 'Przekazuje trudne sprawy do Ciebie. Reklamacje, VIP-y — dostajesz powiadomienie.',
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
    question: 'Czy klientki zorientują się, że to AI?',
    answer: 'Większość nie. Odpowiedzi są naturalne i w Twoim stylu. Jeśli ktoś zapyta wprost, AI powie prawdę.',
  },
  {
    question: 'Co jeśli AI powie coś głupiego?',
    answer: 'AI odpowiada tylko na podstawie informacji które jej dasz. Nie wymyśla cen ani usług. Gdy nie wie — przekazuje do Ciebie.',
  },
  {
    question: 'Jak działa z Booksy/Fresha?',
    answer: 'Łączymy się przez Google Calendar który te apki obsługują. AI widzi wolne terminy i tworzy rezerwacje bez konfliktu.',
  },
  {
    question: 'Mogę przetestować przed zakupem?',
    answer: 'Tak! 14 dni za darmo, bez karty. Zapisz się na waitlistę — odezwiemy się gdy wystartujemy.',
  },
  {
    question: 'A co z bezpieczeństwem danych?',
    answer: 'Szyfrowanie, serwery w EU, zgodność z RODO. Nie sprzedajemy danych. Możesz je usunąć w każdej chwili.',
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
    { href: '#features', label: 'Funkcje' },
    { href: '#pricing', label: 'Cennik' },
    { href: '#faq', label: 'FAQ' },
  ],
  contact: [
    { href: 'mailto:hej@salonmate.ai', label: 'hej@salonmate.ai' },
  ],
  legal: [
    { href: '#', label: 'Polityka prywatności' },
    { href: '#', label: 'Regulamin' },
  ],
};
