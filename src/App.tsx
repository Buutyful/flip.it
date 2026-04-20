import { useEffect, useState } from 'react';
import {
  allocation,
  flowSteps,
  highlights,
  marketCards,
  moatPillars,
  navItems,
  problems,
  revenueStreams,
  solutionPillars,
  teamPillars,
  timeline,
} from './content';
import DemoPage from './DemoPage';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

type LandingPageProps = {
  onOpenDemo: () => void;
};

function LandingPage({ onOpenDemo }: LandingPageProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.55],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-shell">
      <div className="ambient ambient-top" />
      <div className="ambient ambient-bottom" />

      <header className="site-header">
        <a className="brand" href="#overview">
          <span className="brand-mark">Flip.it</span>
          <span className="brand-subtitle">Circular Trading Hub</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Apri menu di navigazione"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav className={`site-nav ${menuOpen ? 'site-nav-open' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              className={activeSection === item.id ? 'nav-link nav-link-active' : 'nav-link'}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            className="nav-cta nav-cta-button"
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenDemo();
            }}
          >
            Apri demo
          </button>
        </nav>
      </header>

      <main>
        <section className="section hero-section surface-hero" id="overview">
          <div className="hero-header">
            <div className="hero-copy">
              <span className="eyebrow">Trading hub circolare per il second-hand verificato</span>
              <div className="hero-intro-row">
                <div className="hero-category-card">
                  <span className="hero-category-label">Cosa fa</span>
                  <strong>Valida l&apos;item una volta, poi ne abilita il trading digitale.</strong>
                </div>
                <div className="hero-category-card hero-category-card-muted">
                  <span className="hero-category-label">Perché conta</span>
                  <strong>Meno rischio, meno spedizioni, più liquidità nel resale premium.</strong>
                </div>
              </div>
              <div className="hero-title-stack">
                <h1>Flip.it trasforma un capo usato in un asset verificato che può essere comprato e rivenduto istantaneamente.</h1>
                <h2>
                  L&apos;oggetto entra in un hub centrale, viene autenticato, resta fermo in custodia
                  e cambia proprietario digitalmente fino alla consegna finale.
                </h2>
              </div>
              <p className="hero-text">
                In pratica: uniamo validazione fisica, wallet interno e ownership digitale in un
                modello che riduce le frizioni del marketplace tradizionale e rende il flipping
                finalmente scalabile.
              </p>
            </div>
          </div>

          <div className="hero-grid hero-grid-panels">
            <div className="hero-panel">
              <div className="hero-panel-card hero-panel-card-primary">
                <span className="panel-kicker panel-kicker-light">Core concept</span>
                <strong>
                  Il pacco non si muove a ogni transazione.
                  <br />
                  Si muove solo la proprieta.
                </strong>
                <p>
                  Questo è il cuore del vantaggio competitivo: la fiducia viene creata una volta
                  sola, mentre la logistica si attiva soltanto quando esiste un owner finale.
                </p>
              </div>

              <div className="hero-mini-grid">
                <article className="hero-mini-card">
                  <span className="hero-mini-label">Input</span>
                  <strong>Item fisico verificato</strong>
                  <p>Intake, autenticazione, catalogazione e custodia nell&apos;hub.</p>
                </article>
                <article className="hero-mini-card">
                  <span className="hero-mini-label">Output</span>
                  <strong>Resale più rapido e più affidabile</strong>
                  <p>Ownership digitale, fee ricorrenti e una sola spedizione finale.</p>
                </article>
              </div>
            </div>

            <div className="hero-panel">
              <div className="hero-orbit">
                <div className="hero-orbit-caption hero-orbit-caption-top">Item fisico custodito</div>
                <div className="orbit-ring orbit-ring-one" />
                <div className="orbit-ring orbit-ring-two" />
                <div className="orbit-signal orbit-signal-one" />
                <div className="orbit-signal orbit-signal-two" />
                <div className="orbit-core">Hub validated asset</div>
                <div className="orbit-pill orbit-pill-top orbit-pill-delay-one">Seller</div>
                <div className="orbit-pill orbit-pill-right orbit-pill-delay-two">Buyer 1</div>
                <div className="orbit-pill orbit-pill-bottom orbit-pill-delay-three">Buyer 2</div>
                <div className="hero-orbit-caption hero-orbit-caption-bottom">
                  Il ledger trasferisce ownership, non il pacco
                </div>
              </div>
            </div>
          </div>

          <div className="proof-strip">
            <span>Validazione centrale</span>
            <span>Trading digitale dell&apos;ownership</span>
            <span>Bulk shipping finale</span>
          </div>

          <div className="stats-grid">
            {highlights.map((item) => (
              <article className="stat-card" key={item.label}>
                <span className="stat-value">{item.value}</span>
                <h3>{item.label}</h3>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section surface-soft" id="problema">
          <SectionHeading
            eyebrow="Perché ora"
            title="Il mercato second-hand ha domanda, ma soffre ancora di un deficit strutturale di fiducia."
            description="Flip.it parte da qui: oggi il valore dell'usato si perde tra mismatch, truffe e un modello logistico pensato per transazioni isolate, non per il flipping continuo."
          />

          <div className="card-grid card-grid-three">
            {problems.map((item) => (
              <article className="info-card" key={item.title}>
                <span className="card-index">Pain point</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <aside className="quote-card">
            <span className="eyebrow">Conseguenza di mercato</span>
            <p>
              Quando nessuno si fida davvero della qualita dell&apos;asset, la circolazione rallenta,
              la marginalita scende e una parte enorme del resale non arriva mai alla transazione.
            </p>
          </aside>
        </section>

        <section className="section surface-light" id="soluzione">
          <SectionHeading
            eyebrow="La risposta"
            title="Flip.it non aggiunge un altro marketplace: costruisce un layer operativo tra oggetto fisico e proprietà digitale."
            description="La promessa del prodotto è semplice da capire e difficile da replicare: un hub certifica l'asset, il software governa ownership, pricing e transazioni."
          />

          <div className="card-grid card-grid-three">
            {solutionPillars.map((item) => (
              <article className="feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className="split-callout">
            <div>
              <span className="eyebrow">Per l&apos;utente</span>
              <h3>Compra, rivendi e accumula valore senza riaprire il rischio a ogni passaggio.</h3>
            </div>
            <p>
              La piattaforma riduce la dipendenza da chat, spedizioni ripetute e verifiche manuali
              continue. L&apos;esperienza diventa più vicina a un trading flow che a uno scambio
              peer-to-peer.
            </p>
          </div>
        </section>

        <section className="section surface-soft" id="flusso">
          <SectionHeading
            eyebrow="Come funziona"
            title="Un flusso operativo lineare che trasforma un item fisico in un asset scambiabile."
            description="Ogni step è progettato per rimuovere attrito: meno errori, meno movimento fisico, più frequenza di scambio."
          />

          <div className="flow-rail-card">
            <div className="flow-rail-head">
              <div>
                <span className="card-index">Journey</span>
                <h3>Dall&apos;ingresso nell&apos;hub alla consegna finale, il pacco resta fermo mentre il valore continua a circolare.</h3>
              </div>
              <p>
                La linea mostra il passaggio chiave: entra l&apos;asset fisico, si muove
                l&apos;ownership, parte una sola consegna finale.
              </p>
            </div>

            <div className="flow-rail">
              <div className="flow-rail-line" aria-hidden="true">
                <div className="flow-rail-progress" />
                <div className="flow-train" />
              </div>

              <div className="flow-stations">
                {flowSteps.map((item, index) => (
                  <article
                    className="flow-station"
                    key={item.step}
                    style={{ ['--station-delay' as string]: `${index * 0.9}s` }}
                  >
                    <div className="flow-station-node-wrap">
                      <span className="flow-station-node" aria-hidden="true" />
                      <span className="flow-station-step">{item.step}</span>
                    </div>
                    <div className="flow-station-card">
                      <span className="flow-station-kicker">
                        {index < 2 ? 'Hub layer' : index < 4 ? 'Trading layer' : 'Delivery layer'}
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section surface-opportunity" id="opportunita">
          <SectionHeading
            eyebrow="Opportunità"
            title="Mercato, monetizzazione e moat stanno nella stessa storia: il resale cresce, ma vince chi controlla il trust layer."
            description="Questa sezione consolida ciò che nel deck era separato in più slide: dimensione del mercato, modello a crediti e vantaggio strutturale."
          />

          <div className="card-grid card-grid-three">
            {marketCards.map((item) => (
              <article className="market-card" key={item.title}>
                <span className="card-index">{item.title}</span>
                <strong>{item.value}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className="opportunity-layout">
            <article className="ledger-card">
              <span className="eyebrow">Business model</span>
              <h3>Wallet interno e ledger operativo riducono attrito finanziario e aumentano la frequenza di scambio.</h3>
              <p>
                Il capitale entra nel sistema tramite cash-in, circola tra gli utenti tramite
                ownership digitale e genera fee ricorrenti a ogni flip, senza replicare ogni volta
                il costo di una transazione tradizionale.
              </p>
            </article>

            <article className="list-card">
              <span className="card-index">Revenue streams</span>
              <div className="stack-list">
                {revenueStreams.map((item) => (
                  <div className="stack-row" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="card-grid card-grid-four">
            {moatPillars.map((item) => (
              <article className="moat-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section surface-light" id="roadmap">
          <SectionHeading
            eyebrow="Execution plan"
            title="La roadmap non parla solo di software: misura la costruzione simultanea di prodotto, operazioni e fiducia."
            description="La crescita di Flip.it dipende dall'allineamento tra UX, motore di validazione e capacità reale di far funzionare un hub sul territorio."
          />

          <div className="roadmap-list">
            {timeline.map((item) => (
              <article className="roadmap-card" key={item.range}>
                <span className="roadmap-range">{item.range}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className="split-callout split-callout-dark">
            <div>
              <span className="eyebrow">Year one target</span>
              <h3>Arrivare a una macchina replicabile, non solo a una demo convincente.</h3>
            </div>
            <p>
              Il primo anno serve a provare che il modello regge su tre piani insieme: domanda,
              affidabilita del flusso e sostenibilita operativa del ciclo completo.
            </p>
          </div>
        </section>

        <section className="section surface-soft" id="team">
          <SectionHeading
            eyebrow="Team"
            title="Il team giusto per Flip.it è quello che sa muoversi tra prodotto, category trust e operazioni fisiche."
            description="La credibilità del progetto non nasce da una singola skill, ma dall'incrocio tra ecommerce operations, validazione fashion e logistica hub-based."
          />

          <div className="team-layout">
            <article className="founder-card">
              <span className="card-index">Founder profile</span>
              <h3>Visione di prodotto + disciplina operativa</h3>
              <p>
                Il profilo fondatore deve tenere insieme supply, trust, unit economics e user
                experience. In Flip.it la visione funziona solo se il processo a terra è impeccabile.
              </p>
              <div className="team-tags">
                <span>Supply design</span>
                <span>Marketplace ops</span>
                <span>Circular retail</span>
              </div>
            </article>

            <article className="hiring-card">
              <span className="card-index">Open roles</span>
              <h3>Advisor e profili da aggiungere nelle aree più decisive.</h3>
              <p>
                Fashion retail, operations hub, GTM e automazione dei processi sono gli innesti più
                strategici per accelerare il go-to-market.
              </p>
            </article>
          </div>

          <div className="card-grid card-grid-three">
            {teamPillars.map((item) => (
              <article className="feature-card feature-card-compact" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section surface-seed" id="seed">
          <div className="seed-layout">
            <div className="seed-copy">
              <span className="eyebrow">Seed round open</span>
              <h2>Un investimento in Flip.it accelera la costruzione del trust layer del second-hand premium.</h2>
              <p>
                La priorità non è solo lanciare una piattaforma, ma arrivare rapidamente a un
                flusso end-to-end in cui validazione, ownership e delivery convivono in un sistema
                coerente.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="mailto:contact@flip.it">
                  Prenota una call
                </a>
                <a className="button button-secondary button-secondary-dark" href="#overview">
                  Torna all&apos;overview
                </a>
              </div>
            </div>

            <div className="seed-aside">
              <article className="ask-card">
                <span className="card-index">Funding goal</span>
                <strong>EUR 500.000</strong>
                <p>Seed round destinato a prodotto, AI support, setup hub e go-to-market iniziale.</p>
              </article>

              <article className="allocation-card">
                <span className="card-index">Uso dei fondi</span>
                <div className="allocation-list">
                  {allocation.map((item) => (
                    <div className="allocation-row" key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.share}</strong>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

type Route = 'landing' | 'demo';

function getCurrentRoute(): Route {
  if (typeof window === 'undefined') {
    return 'landing';
  }

  const searchParams = new URLSearchParams(window.location.search);
  const pageParam = searchParams.get('page');

  if (pageParam === 'demo' || window.location.pathname === '/demo') {
    return 'demo';
  }

  return 'landing';
}

function App() {
  const [route, setRoute] = useState<Route>(() => getCurrentRoute());

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getCurrentRoute());
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  function navigateTo(nextRoute: Route) {
    const url = nextRoute === 'demo' ? '?page=demo' : '/';
    window.history.pushState({}, '', url);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setRoute(nextRoute);
  }

  return route === 'demo' ? (
    <DemoPage onBackToLanding={() => navigateTo('landing')} />
  ) : (
    <LandingPage onOpenDemo={() => navigateTo('demo')} />
  );
}

export default App;
