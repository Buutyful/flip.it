export type NavItem = {
  id: string;
  label: string;
};

export type Highlight = {
  value: string;
  label: string;
  note: string;
};

export type Problem = {
  title: string;
  description: string;
};

export type Pillar = {
  title: string;
  description: string;
};

export type FlowStep = {
  step: string;
  title: string;
  description: string;
};

export type OpportunityCard = {
  title: string;
  value: string;
  description: string;
};

export type RevenueStream = {
  title: string;
  description: string;
};

export type TimelineItem = {
  range: string;
  title: string;
  description: string;
};

export type AllocationItem = {
  label: string;
  share: string;
};

export const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'problema', label: 'Problema' },
  { id: 'soluzione', label: 'Soluzione' },
  { id: 'flusso', label: 'Flusso' },
  { id: 'opportunita', label: 'Opportunità' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'team', label: 'Team' },
  { id: 'seed', label: 'Seed' },
];

export const highlights: Highlight[] = [
  {
    value: '1x',
    label: 'Validazione fisica',
    note: "L'item viene certificato una volta sola all'ingresso nell'hub.",
  },
  {
    value: '0',
    label: 'Spedizioni intermedie',
    note: 'Durante i flip cambia il proprietario digitale, non il pacco.',
  },
  {
    value: '-60/70%',
    label: 'Costi gateway',
    note: 'Il wallet a crediti riduce payout e complessità bancaria.',
  },
  {
    value: '1',
    label: 'Consegna finale',
    note: 'Il bulk shipping accorpa gli item del proprietario finale.',
  },
];

export const problems: Problem[] = [
  {
    title: 'Mismatch e non conformita',
    description:
      'Macchie non dichiarate, taglie errate e articoli non autentici trasformano ogni acquisto in una scommessa.',
  },
  {
    title: 'Truffe e fiducia fragile',
    description:
      'Account falsi, pagamenti conclusi senza consegna e venditori irreperibili bloccano la liquidità del mercato usato.',
  },
  {
    title: 'Logistica lenta e dispersiva',
    description:
      'Ogni passaggio richiede chat, spedizioni, attese e costi che erodono margine, tempo e sicurezza.',
  },
];

export const solutionPillars: Pillar[] = [
  {
    title: 'Hub centrale di intake',
    description:
      "Flip.it riceve, valida, fotografa e certifica l'item prima che entri nel circuito di trading.",
  },
  {
    title: 'Ownership digitale',
    description:
      "Dopo la validazione, l'asset può cambiare proprietario molte volte in modo istantaneo tramite ledger interno.",
  },
  {
    title: 'Consegna solo quando serve',
    description:
      "L'oggetto non viene mosso a ogni flip: parte solo quando l'ultimo owner richiede la spedizione consolidata.",
  },
];

export const flowSteps: FlowStep[] = [
  {
    step: '01',
    title: 'Seller inbound',
    description: "Il seller invia l'item all'hub e avvia la scheda di intake.",
  },
  {
    step: '02',
    title: 'Validation & listing',
    description:
      "L'hub valida l'asset, assegna lo stato certificato e lo pubblica nel catalogo verificato.",
  },
  {
    step: '03',
    title: 'First purchase',
    description:
      "Il primo buyer acquista con crediti e riceve l'ownership digitale in tempo reale.",
  },
  {
    step: '04',
    title: 'Instant flip',
    description:
      "L'owner può rivendere subito l'item senza attivare nuove spedizioni o burocrazia.",
  },
  {
    step: '05',
    title: 'Bulk shipping finale',
    description:
      "L'ultimo owner consolida i prodotti acquistati e richiede una sola spedizione finale.",
  },
];

export const marketCards: OpportunityCard[] = [
  {
    title: 'Mercato',
    value: 'EUR 15B-20B',
    description:
      'Il second-hand fashion continua ad allargarsi tra convenienza, sostenibilità e nuove abitudini di acquisto.',
  },
  {
    title: 'Validazione di categoria',
    value: 'EUR 5B+',
    description:
      'Le grandi piattaforme europee hanno già dimostrato che la domanda per il resale è reale ed è capitalizzata.',
  },
  {
    title: 'Posizionamento',
    value: 'Premium + affidabile',
    description:
      'Flip.it presidia il punto dove fiducia, velocità e infrastruttura operativa convivono nello stesso prodotto.',
  },
];

export const revenueStreams: RevenueStream[] = [
  {
    title: 'Cash-in nel wallet',
    description:
      "L'ingresso di liquidita avviene con l'acquisto di crediti tramite i gateway tradizionali.",
  },
  {
    title: 'Commissioni su ogni flip',
    description:
      'Ogni passaggio di ownership genera una fee ricorrente che cresce con la frequenza di scambio.',
  },
  {
    title: 'Service fees operative',
    description:
      'Bulk shipping, validazione premium e servizi accessori completano il margine unitario.',
  },
];

export const moatPillars: Pillar[] = [
  {
    title: 'Validazione come infrastruttura',
    description:
      "L'item viene controllato una volta e può essere scambiato più volte senza reintrodurre rischio informativo.",
  },
  {
    title: 'Ledger operativo, non solo catalogo',
    description:
      'La piattaforma governa ownership, stato logistico, pricing e audit trail dello stesso asset.',
  },
  {
    title: 'Efficienza logistica strutturale',
    description:
      'Meno movimentazioni fisiche significa meno costi, meno attrito e una velocità di resale superiore.',
  },
  {
    title: 'Hub + software proprietario',
    description:
      'Il vero moat nasce dalla combinazione tra asset handling fisico e motore digitale di scambio.',
  },
];

export const timeline: TimelineItem[] = [
  {
    range: 'Mese 1-3',
    title: 'MVP e motore di validazione',
    description:
      'Costruzione del prodotto core, dei workflow di intake e dei primi tool di supporto AI.',
  },
  {
    range: 'Mese 4',
    title: 'Primo hub pilota',
    description:
      'Attivazione del setup logistico iniziale per testare processi, SLA e capacità di controllo.',
  },
  {
    range: 'Mese 5-6',
    title: 'Beta chiusa',
    description:
      'Accesso controllato a una base iniziale di utenti per affinare UX, pricing e meccaniche di flip.',
  },
  {
    range: 'Mese 12',
    title: 'Scalabilita operativa',
    description:
      'Target di crescita su utenti, item validati e frequenza di scambio con processi replicabili.',
  },
];

export const teamPillars: Pillar[] = [
  {
    title: 'Marketplace operations',
    description:
      'Esperienza nella costruzione di processi di vendita, trust e supply-side activation.',
  },
  {
    title: 'Fashion validation',
    description:
      'Competenza su quality control, autenticazione e standardizzazione di schede prodotto.',
  },
  {
    title: 'Hub logistics',
    description:
      'Capacità di gestire intake, stock, packing e delivery finale con una logica centralizzata.',
  },
];

export const allocation: AllocationItem[] = [
  { label: 'App development', share: '35%' },
  { label: 'AI training', share: '25%' },
  { label: 'Hub setup', share: '20%' },
  { label: 'Marketing', share: '20%' },
];
