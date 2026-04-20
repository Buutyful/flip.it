export type DemoUser = {
  id: string;
  name: string;
  role: string;
};

export type DemoProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  size: string;
  condition: string;
  credits: number;
  ownerId: string;
  ownerName: string;
  listed: boolean;
  status: 'stored' | 'shipping' | 'delivered';
  hub: string;
  validationScore: number;
  totalFlips: number;
  ownershipTrail: string[];
  note: string;
};

export type DemoNotificationTone = 'market' | 'wallet' | 'shipping';

export type DemoNotification = {
  id: string;
  title: string;
  body: string;
  tone: DemoNotificationTone;
  timeLabel: string;
};

export type ShippingOrder = {
  id: string;
  itemIds: string[];
  stageIndex: number;
};

export const currentUser: DemoUser = {
  id: 'you',
  name: 'You',
  role: 'Flip.it beta account',
};

export const demoUsers: DemoUser[] = [
  currentUser,
  { id: 'eva', name: 'Eva', role: 'Reseller premium' },
  { id: 'marco', name: 'Marco', role: 'Vintage trader' },
  { id: 'sofia', name: 'Sofia', role: 'Marketplace flipper' },
  { id: 'luca', name: 'Luca', role: 'Collector' },
];

export const shippingStages = [
  'Shipment created',
  'Packing at hub',
  'Courier pickup',
  'Out for delivery',
  'Delivered',
] as const;

export const initialDemoProducts: DemoProduct[] = [
  {
    id: 'p1',
    name: 'Re-Nylon Tote',
    brand: 'Prada',
    category: 'Bag',
    size: 'OS',
    condition: 'Excellent',
    credits: 190,
    ownerId: 'eva',
    ownerName: 'Eva',
    listed: true,
    status: 'stored',
    hub: 'Hub Milano',
    validationScore: 98,
    totalFlips: 4,
    ownershipTrail: ['Seller', 'Eva'],
    note: 'Validated once, now circulating inside the hub.',
  },
  {
    id: 'p2',
    name: 'Ghost Overshirt',
    brand: 'Stone Island',
    category: 'Outerwear',
    size: 'L',
    condition: 'Great',
    credits: 155,
    ownerId: 'marco',
    ownerName: 'Marco',
    listed: true,
    status: 'stored',
    hub: 'Hub Milano',
    validationScore: 96,
    totalFlips: 3,
    ownershipTrail: ['Seller', 'Marco'],
    note: 'High-demand item already flipped three times without extra shipping.',
  },
  {
    id: 'p3',
    name: 'Knitted Vest',
    brand: 'Maison Margiela',
    category: 'Knitwear',
    size: 'M',
    condition: 'Excellent',
    credits: 120,
    ownerId: 'you',
    ownerName: 'You',
    listed: false,
    status: 'stored',
    hub: 'Hub Milano',
    validationScore: 97,
    totalFlips: 2,
    ownershipTrail: ['Seller', 'You'],
    note: 'Owned by your account and ready either for flip or bulk shipment.',
  },
  {
    id: 'p4',
    name: 'Le Hoodie',
    brand: 'Jacquemus',
    category: 'Topwear',
    size: 'M',
    condition: 'Great',
    credits: 135,
    ownerId: 'you',
    ownerName: 'You',
    listed: true,
    status: 'stored',
    hub: 'Hub Milano',
    validationScore: 95,
    totalFlips: 5,
    ownershipTrail: ['Seller', 'Sofia', 'You'],
    note: 'Already listed for instant resale by your account.',
  },
  {
    id: 'p5',
    name: 'Logo Card Holder',
    brand: 'Bottega Veneta',
    category: 'Accessory',
    size: 'OS',
    condition: 'Excellent',
    credits: 95,
    ownerId: 'luca',
    ownerName: 'Luca',
    listed: true,
    status: 'stored',
    hub: 'Hub Milano',
    validationScore: 99,
    totalFlips: 6,
    ownershipTrail: ['Seller', 'Luca'],
    note: 'Small-ticket item moving quickly across the ledger.',
  },
  {
    id: 'p6',
    name: 'Double Coat',
    brand: 'Acne Studios',
    category: 'Outerwear',
    size: '48',
    condition: 'Excellent',
    credits: 240,
    ownerId: 'sofia',
    ownerName: 'Sofia',
    listed: true,
    status: 'stored',
    hub: 'Hub Milano',
    validationScore: 94,
    totalFlips: 2,
    ownershipTrail: ['Seller', 'Sofia'],
    note: 'Premium ticket item with strong resale spread.',
  },
];

export const initialNotifications: DemoNotification[] = [
  {
    id: 'n1',
    title: 'Live market ready',
    body: 'La demo sta simulando flip real-time nel marketplace.',
    tone: 'market',
    timeLabel: 'T+0m',
  },
  {
    id: 'n2',
    title: 'Wallet funded',
    body: 'Il tuo account demo parte con 420 crediti spendibili.',
    tone: 'wallet',
    timeLabel: 'T+0m',
  },
  {
    id: 'n3',
    title: 'Hub inventory synced',
    body: "Gli item posseduti da te sono già in custodia nell'hub Milano.",
    tone: 'shipping',
    timeLabel: 'T+0m',
  },
];
