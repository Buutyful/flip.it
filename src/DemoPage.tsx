import { useEffect, useRef, useState } from 'react';
import {
  currentUser,
  demoUsers,
  initialDemoProducts,
  initialNotifications,
  shippingStages,
  type DemoNotificationTone,
  type ShippingOrder,
} from './demoData';

type DemoPageProps = {
  onBackToLanding: () => void;
};

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function DemoPage({ onBackToLanding }: DemoPageProps) {
  const [products, setProducts] = useState(initialDemoProducts);
  const [availableCredits, setAvailableCredits] = useState(420);
  const [selectedProductId, setSelectedProductId] = useState(initialDemoProducts[0].id);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [shippingSelection, setShippingSelection] = useState<string[]>([]);
  const [shippingOrder, setShippingOrder] = useState<ShippingOrder | null>(null);

  const notificationCounter = useRef(initialNotifications.length);
  const demoMinuteCounter = useRef(0);
  const productsRef = useRef(products);

  useEffect(() => {
    productsRef.current = products;
  }, [products]);

  useEffect(() => {
    document.title = 'Flip.it Demo | Circular Trading Hub';

    return () => {
      document.title = 'Flip.it | Circular Trading Hub';
    };
  }, []);

  function pushNotification(title: string, body: string, tone: DemoNotificationTone) {
    notificationCounter.current += 1;
    demoMinuteCounter.current += 1;

    setNotifications((current) => [
      {
        id: `n${notificationCounter.current}`,
        title,
        body,
        tone,
        timeLabel: `T+${demoMinuteCounter.current}m`,
      },
      ...current,
    ].slice(0, 8));
  }

  function resetDemo() {
    notificationCounter.current = initialNotifications.length;
    demoMinuteCounter.current = 0;
    setProducts(initialDemoProducts);
    setAvailableCredits(420);
    setSelectedProductId(initialDemoProducts[0].id);
    setNotifications(initialNotifications);
    setShippingSelection([]);
    setShippingOrder(null);
  }

  function handleCashIn() {
    setAvailableCredits((current) => current + 150);
    pushNotification(
      'Cash-in simulated',
      'Hai acquistato 150 crediti via gateway. Il saldo wallet è stato aggiornato istantaneamente.',
      'wallet',
    );
  }

  function handleBuyProduct(productId: string) {
    const product = productsRef.current.find((item) => item.id === productId);

    if (!product || !product.listed || product.ownerId === currentUser.id || product.status !== 'stored') {
      return;
    }

    if (availableCredits < product.credits) {
      pushNotification(
        'Crediti insufficienti',
        `Ti servono ${product.credits - availableCredits} crediti in più per acquistare ${product.brand} ${product.name}.`,
        'wallet',
      );
      return;
    }

    setAvailableCredits((current) => current - product.credits);
    setProducts((current) =>
      current.map((item) =>
        item.id === productId
          ? {
              ...item,
              ownerId: currentUser.id,
              ownerName: currentUser.name,
              listed: false,
              totalFlips: item.totalFlips + 1,
              ownershipTrail: [...item.ownershipTrail, currentUser.name].slice(-5),
              note: 'Purchased by your account. The item stays stored in the hub until you relist or ship it.',
            }
          : item,
      ),
    );
    setSelectedProductId(productId);
    pushNotification(
      'Purchase confirmed',
      `${product.brand} ${product.name} è ora nel tuo ledger. ${product.credits} crediti spostati senza muovere il pacco.`,
      'wallet',
    );
  }

  function handleToggleListing(productId: string) {
    const product = productsRef.current.find((item) => item.id === productId);

    if (!product || product.ownerId !== currentUser.id || product.status !== 'stored') {
      return;
    }

    setProducts((current) =>
      current.map((item) =>
        item.id === productId
          ? {
              ...item,
              listed: !item.listed,
              note: item.listed
                ? 'Listing paused. The item stays in custody and can be reactivated anytime.'
                : 'Listing live. Other users can now flip this item instantly inside the hub.',
            }
          : item,
      ),
    );

    pushNotification(
      product.listed ? 'Listing paused' : 'Listing live',
      product.listed
        ? `${product.brand} ${product.name} non è più in vendita, ma resta pronto per un futuro flip.`
        : `${product.brand} ${product.name} è stato rimesso sul marketplace per instant flipping.`,
      'market',
    );
  }

  function handleToggleShippingSelection(productId: string) {
    const product = productsRef.current.find((item) => item.id === productId);

    if (!product || product.ownerId !== currentUser.id || product.status !== 'stored' || shippingOrder) {
      return;
    }

    setShippingSelection((current) =>
      current.includes(productId)
        ? current.filter((itemId) => itemId !== productId)
        : [...current, productId],
    );
  }

  function handleStartShipping() {
    if (shippingSelection.length === 0 || shippingOrder) {
      return;
    }

    setProducts((current) =>
      current.map((item) =>
        shippingSelection.includes(item.id)
          ? {
              ...item,
              listed: false,
              status: 'shipping',
              note: 'Included in a consolidated shipment. No more marketplace activity while delivery is in progress.',
            }
          : item,
      ),
    );
    setShippingOrder({
      id: `ship-${Date.now()}`,
      itemIds: shippingSelection,
      stageIndex: 0,
    });
    pushNotification(
      'Bulk shipping started',
      `${shippingSelection.length} item selezionati per la spedizione consolidata. Il flow logistico parte adesso dall'hub.`,
      'shipping',
    );
    setShippingSelection([]);
  }

  useEffect(() => {
    if (!shippingOrder || shippingOrder.stageIndex >= shippingStages.length - 1) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const nextStageIndex = shippingOrder.stageIndex + 1;
      const nextStageLabel = shippingStages[nextStageIndex];
      const isDelivered = nextStageIndex === shippingStages.length - 1;

      setShippingOrder((current) =>
        current
          ? {
              ...current,
              stageIndex: nextStageIndex,
            }
          : current,
      );

      if (isDelivered) {
        setProducts((current) =>
          current.map((item) =>
            shippingOrder.itemIds.includes(item.id)
              ? {
                  ...item,
                  status: 'delivered',
                  listed: false,
                  note: 'Delivered to the final owner after a single consolidated shipment.',
                }
              : item,
          ),
        );
        pushNotification(
          'Shipment delivered',
          `${shippingOrder.itemIds.length} item hanno completato il journey logistico finale con una sola spedizione.`,
          'shipping',
        );
      } else {
        pushNotification(
          'Shipping update',
          `La spedizione è passata allo step "${nextStageLabel}".`,
          'shipping',
        );
      }
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [shippingOrder]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const currentProducts = productsRef.current;
      const listedByYou = currentProducts.filter(
        (item) => item.listed && item.ownerId === currentUser.id && item.status === 'stored',
      );
      const listedByOthers = currentProducts.filter(
        (item) => item.listed && item.ownerId !== currentUser.id && item.status === 'stored',
      );

      if (listedByYou.length > 0 && Math.random() < 0.35) {
        const product = pickRandom(listedByYou);
        const buyer = pickRandom(demoUsers.filter((user) => user.id !== currentUser.id));

        setAvailableCredits((current) => current + product.credits);
        setProducts((current) =>
          current.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  ownerId: buyer.id,
                  ownerName: buyer.name,
                  listed: true,
                  totalFlips: item.totalFlips + 1,
                  ownershipTrail: [...item.ownershipTrail, buyer.name].slice(-5),
                  note: `${buyer.name} bought the item and immediately kept it live in the marketplace.`,
                }
              : item,
          ),
        );
        pushNotification(
          'Your item was flipped',
          `${buyer.name} ha acquistato ${product.brand} ${product.name}. +${product.credits} crediti accreditati nel wallet.`,
          'wallet',
        );
        return;
      }

      if (listedByOthers.length === 0) {
        return;
      }

      const product = pickRandom(listedByOthers);
      const nextOwner = pickRandom(
        demoUsers.filter((user) => user.id !== currentUser.id && user.id !== product.ownerId),
      );
      const nextCredits = Math.max(70, product.credits + randomInt(-8, 14));

      setProducts((current) =>
        current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                ownerId: nextOwner.id,
                ownerName: nextOwner.name,
                credits: nextCredits,
                listed: true,
                totalFlips: item.totalFlips + 1,
                ownershipTrail: [...item.ownershipTrail, nextOwner.name].slice(-5),
                note: `Live market event: ${nextOwner.name} is the new owner while the item stays in ${item.hub}.`,
              }
            : item,
        ),
      );
      pushNotification(
        'Live market flip',
        `${product.brand} ${product.name} è passato a ${nextOwner.name} per ${nextCredits} crediti senza nuova spedizione.`,
        'market',
      );
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, []);

  const selectedProduct = products.find((item) => item.id === selectedProductId) ?? products[0];
  const marketplaceProducts = products.filter(
    (item) => item.listed && item.ownerId !== currentUser.id && item.status !== 'delivered',
  );
  const ownedProducts = products.filter((item) => item.ownerId === currentUser.id);
  const readyToShipCount = ownedProducts.filter((item) => item.status === 'stored').length;
  const deliveredCount = ownedProducts.filter((item) => item.status === 'delivered').length;
  const totalFlipsLive = products.reduce((total, item) => total + item.totalFlips, 0);
  const feesSaved = Math.round(totalFlipsLive * 6.5);
  const selectedForShipping = shippingSelection.includes(selectedProduct.id);
  const activeShippingStage = shippingOrder ? shippingStages[shippingOrder.stageIndex] : null;

  return (
    <div className="page-shell demo-page-shell">
      <div className="ambient ambient-top" />
      <div className="ambient ambient-bottom" />

      <header className="site-header demo-topbar">
        <button className="brand brand-button" type="button" onClick={onBackToLanding}>
          <span className="brand-mark">Flip.it Demo</span>
          <span className="brand-subtitle">Interactive product walkthrough</span>
        </button>

        <div className="demo-topbar-actions">
          <span className="demo-live-badge">Live mock demo</span>
          <button className="nav-link nav-link-button" type="button" onClick={onBackToLanding}>
            Torna alla landing
          </button>
        </div>
      </header>

      <main className="demo-main">
        <section className="demo-hero">
          <div className="demo-hero-copy">
            <span className="eyebrow demo-eyebrow">Client-side product demo</span>
            <h1>Una demo che mostra cosa succede dopo il pitch: wallet, marketplace, flip live e spedizione finale.</h1>
            <p>
              Tutto quello che vedi qui è mockato client-side, ma collegato come un vero prodotto:
              i crediti si muovono, gli altri utenti flippano gli item, le notifiche si aggiornano
              e la spedizione parte solo quando la chiedi tu.
            </p>

            <div className="hero-actions">
              <button className="button button-primary demo-button" type="button" onClick={handleCashIn}>
                Simula cash-in +150 crediti
              </button>
              <button className="button demo-button demo-button-secondary" type="button" onClick={resetDemo}>
                Reset demo
              </button>
            </div>
          </div>

          <div className="demo-hero-aside">
            <article className="demo-spotlight-card">
              <span className="card-index">What to test</span>
              <h2>Compra un item, rimettilo live con un click e poi avvia una bulk shipment.</h2>
              <p>
                La demo rende visibile il punto centrale di Flip.it: il trading dell&apos;ownership è
                continuo, mentre la logistica entra in gioco solo alla fine.
              </p>
            </article>
          </div>
        </section>

        <section className="demo-metric-grid">
          <article className="demo-metric-card">
            <span className="card-index">Crediti disponibili</span>
            <strong>{availableCredits} cr</strong>
            <p>Saldo spendibile nel wallet per acquistare o rientrare sul mercato.</p>
          </article>
          <article className="demo-metric-card">
            <span className="card-index">Item nel tuo hub</span>
            <strong>{ownedProducts.length}</strong>
            <p>{readyToShipCount} pronti per flip o shipping, {deliveredCount} già consegnati.</p>
          </article>
          <article className="demo-metric-card">
            <span className="card-index">Flip live</span>
            <strong>{totalFlipsLive}</strong>
            <p>Scambi simulati nel ledger mentre il catalogo continua ad aggiornarsi.</p>
          </article>
          <article className="demo-metric-card">
            <span className="card-index">Fee gateway evitate</span>
            <strong>EUR {feesSaved}</strong>
            <p>Indicatore mock della frizione finanziaria assorbita dal wallet interno.</p>
          </article>
        </section>

        <section className="demo-board">
          <div className="demo-main-column">
            <section className="demo-panel">
              <div className="demo-panel-head">
                <div>
                  <span className="card-index">Marketplace</span>
                  <h2>Catalogo verificato e pronto per instant flipping.</h2>
                </div>
                <p>{marketplaceProducts.length} item live ora nel marketplace interno.</p>
              </div>

              <div className="demo-product-list">
                {marketplaceProducts.map((product) => {
                  const isSelected = product.id === selectedProduct.id;

                  return (
                    <article
                      className={`demo-product-card ${isSelected ? 'demo-product-card-selected' : ''}`}
                      key={product.id}
                      onClick={() => setSelectedProductId(product.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          setSelectedProductId(product.id);
                        }
                      }}
                    >
                      <div className="demo-product-topline">
                        <span className="demo-product-brand">
                          {product.brand} - {product.category}
                        </span>
                        <strong>{product.credits} cr</strong>
                      </div>
                      <h3>{product.name}</h3>
                      <p>
                        Owner attuale: {product.ownerName}. Validation {product.validationScore}/100.
                      </p>
                      <div className="demo-product-tags">
                        <span>{product.condition}</span>
                        <span>{product.size}</span>
                        <span>{product.hub}</span>
                      </div>
                      <button
                        className="demo-inline-action"
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleBuyProduct(product.id);
                        }}
                      >
                        Acquista con {product.credits} cr
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="demo-panel">
              <div className="demo-panel-head">
                <div>
                  <span className="card-index">Your hub</span>
                  <h2>I tuoi item possono essere rimessi live o inclusi in una spedizione finale.</h2>
                </div>
                <p>Seleziona gli item che vuoi consolidare nella stessa shipment.</p>
              </div>

              <div className="demo-owned-grid">
                {ownedProducts.map((product) => {
                  const canShip = product.status === 'stored' && !shippingOrder;

                  return (
                    <article className="demo-owned-card" key={product.id}>
                      <div className="demo-owned-topline">
                        <div>
                          <span className="demo-product-brand">{product.brand}</span>
                          <h3>{product.name}</h3>
                        </div>
                        <span className={`demo-status-chip demo-status-${product.status}`}>
                          {product.status}
                        </span>
                      </div>
                      <p>{product.note}</p>
                      <div className="demo-product-tags">
                        <span>{product.credits} cr</span>
                        <span>{product.listed ? 'Listed live' : 'Stored in hub'}</span>
                        <span>{product.validationScore}/100</span>
                      </div>

                      <div className="demo-owned-actions">
                        {product.status === 'stored' ? (
                          <button
                            className="demo-inline-action"
                            type="button"
                            onClick={() => handleToggleListing(product.id)}
                          >
                            {product.listed ? 'Pausa listing' : 'Metti in vendita'}
                          </button>
                        ) : null}

                        <button
                          className={`demo-inline-action ${shippingSelection.includes(product.id) ? 'demo-inline-action-active' : ''}`}
                          type="button"
                          disabled={!canShip}
                          onClick={() => handleToggleShippingSelection(product.id)}
                        >
                          {shippingSelection.includes(product.id) ? 'Rimuovi da shipping' : 'Seleziona per shipping'}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="demo-side-column">
            <section className="demo-panel demo-selected-panel">
              <div className="demo-panel-head">
                <div>
                  <span className="card-index">Selected item</span>
                  <h2>
                    {selectedProduct.brand} {selectedProduct.name}
                  </h2>
                </div>
                <p>{selectedProduct.credits} cr</p>
              </div>

              <p className="demo-selected-copy">{selectedProduct.note}</p>

              <div className="demo-selected-stats">
                <div>
                  <span>Current owner</span>
                  <strong>{selectedProduct.ownerName}</strong>
                </div>
                <div>
                  <span>Validation</span>
                  <strong>{selectedProduct.validationScore}/100</strong>
                </div>
                <div>
                  <span>Total flips</span>
                  <strong>{selectedProduct.totalFlips}</strong>
                </div>
              </div>

              <div className="demo-product-tags">
                <span>{selectedProduct.category}</span>
                <span>{selectedProduct.size}</span>
                <span>{selectedProduct.condition}</span>
                <span>{selectedProduct.hub}</span>
              </div>

              <div className="demo-ownership-trail">
                {selectedProduct.ownershipTrail.map((owner, index) => (
                  <span key={`${selectedProduct.id}-${owner}-${index}`}>{owner}</span>
                ))}
              </div>

              <div className="demo-selected-actions">
                {selectedProduct.ownerId !== currentUser.id &&
                selectedProduct.listed &&
                selectedProduct.status === 'stored' ? (
                  <button
                    className="button button-primary demo-button"
                    type="button"
                    disabled={availableCredits < selectedProduct.credits}
                    onClick={() => handleBuyProduct(selectedProduct.id)}
                  >
                    Compra ora
                  </button>
                ) : null}

                {selectedProduct.ownerId === currentUser.id && selectedProduct.status === 'stored' ? (
                  <>
                    <button
                      className="button button-primary demo-button"
                      type="button"
                      onClick={() => handleToggleListing(selectedProduct.id)}
                    >
                      {selectedProduct.listed ? 'Pausa listing' : 'Attiva instant flip'}
                    </button>
                    <button
                      className="button demo-button demo-button-secondary"
                      type="button"
                      disabled={Boolean(shippingOrder)}
                      onClick={() => handleToggleShippingSelection(selectedProduct.id)}
                    >
                      {selectedForShipping ? 'Rimuovi da shipment' : 'Aggiungi a shipment'}
                    </button>
                  </>
                ) : null}
              </div>
            </section>

            <section className="demo-panel demo-shipping-panel">
              <div className="demo-panel-head">
                <div>
                  <span className="card-index">Shipping simulator</span>
                  <h2>Una sola spedizione finale invece di tanti invii intermedi.</h2>
                </div>
                <p>
                  {shippingOrder
                    ? activeShippingStage
                    : `${shippingSelection.length} item selezionati per la prossima bulk shipment`}
                </p>
              </div>

              <div className="demo-shipping-stage-list">
                {shippingStages.map((stage, index) => {
                  const isActive = shippingOrder ? index <= shippingOrder.stageIndex : false;

                  return (
                    <div className="demo-shipping-stage" key={stage}>
                      <span className={`demo-shipping-node ${isActive ? 'demo-shipping-node-active' : ''}`} />
                      <div>
                        <strong>{stage}</strong>
                        <p>
                          {index === 0
                            ? 'Creazione ordine e consolidamento item.'
                            : index === shippingStages.length - 1
                              ? 'Consegna finale al proprietario.'
                              : 'Avanzamento mock della spedizione.'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="button button-primary demo-button"
                type="button"
                disabled={shippingSelection.length === 0 || Boolean(shippingOrder)}
                onClick={handleStartShipping}
              >
                Avvia bulk shipping
              </button>
            </section>

            <section className="demo-panel demo-feed-panel">
              <div className="demo-panel-head">
                <div>
                  <span className="card-index">Live notifications</span>
                  <h2>Feed attivita e segnali di prodotto in tempo reale.</h2>
                </div>
              </div>

              <div className="demo-feed-list">
                {notifications.map((notification) => (
                  <article className={`demo-feed-item demo-feed-${notification.tone}`} key={notification.id}>
                    <div className="demo-feed-topline">
                      <strong>{notification.title}</strong>
                      <span>{notification.timeLabel}</span>
                    </div>
                    <p>{notification.body}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DemoPage;
