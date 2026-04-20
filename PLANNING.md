# LoopHub Landing & Platform Planning

## Obiettivo
Creare una landing page unica in `Vite + React + TypeScript` che unifichi il pitch deck in un racconto coerente, credibile e senza ripetizioni. La pagina deve servire due scopi:

1. spiegare in pochi minuti il modello LoopHub a investitori, partner e early adopters;
2. tradurre la visione del deck in un perimetro prodotto chiaro, con user flow e feature leggibili anche dal team di sviluppo.

## North Star Narrative
LoopHub non viene presentato come un marketplace generico, ma come infrastruttura per il second-hand affidabile.

Messaggio chiave:
"L'item viene validato una volta in un hub centrale, poi può cambiare proprietario digitalmente molte volte senza muoversi fisicamente finché non viene richiesta la consegna finale."

I tre pilastri da rendere evidenti nella landing:

1. Fiducia: validazione centrale, autenticazione, riduzione di truffe e mismatch.
2. Velocità: flipping istantaneo tramite ownership digitale e wallet a crediti.
3. Efficienza: meno spedizioni, meno costi gateway, meno attrito operativo.

## Struttura finale della landing
La landing deve seguire una progressione logica, semplice da scorrere e da capire.

### 1. Overview
Obiettivo: fissare subito il concetto.

Contenuto:
- brand statement "trading hub circolare per il second-hand"
- value proposition compatta
- metriche sintetiche ad alto impatto
- CTA primaria per call/investment interest

### 2. Problema
Obiettivo: spiegare perché il mercato attuale non basta.

Contenuto:
- item non conformi alla descrizione
- truffe e ghosting
- lentezza e insicurezza degli scambi fisici
- perdita di fiducia che blocca la circolazione dell'usato

### 3. Soluzione
Obiettivo: mostrare il cambio di paradigma.

Contenuto:
- hub centrale per intake e validazione
- certificazione fisica + digitale
- possesso che cambia nel ledger, non tramite spedizione continua
- riduzione di attrito logistico ed emissioni

### 4. Flusso operativo
Obiettivo: rendere intuitivo "come funziona".

Contenuto:
- seller invia l'item all'hub
- item validato e listato
- buyer acquista ownership digitale con crediti
- buyer rivende senza spostamento fisico dell'asset
- ultimo owner richiede bulk shipping

### 5. Opportunità
Obiettivo: unificare in un'unica sezione chiara ciò che nel deck era diviso tra mercato, business model e vantaggio competitivo.

Sottosezioni:
- mercato e trend
- business model a crediti
- moat operativo e tecnologico

Messaggi da rendere espliciti:
- il mercato second-hand è grande e in crescita
- LoopHub monetizza su cash-in, commissioni di flip e service fees
- il vantaggio non è solo software: è infrastruttura + validazione + ledger

### 6. Roadmap
Obiettivo: mostrare esecuzione e progressione.

Contenuto:
- MVP e AI engine
- primo hub pilota
- beta chiusa
- target utenti / item validati entro 12 mesi

### 7. Team
Obiettivo: dare credibilità esecutiva.

Contenuto:
- founder profile
- competenze chiave
- eventuali ruoli aperti

### 8. Seed / Contact
Obiettivo: chiudere il racconto con una CTA forte.

Contenuto:
- ask seed round
- uso dei fondi
- CTA finale
- contatti

## Mapping slide -> sezione finale
- `slide_1_cover_title` -> `Overview`
- `slide_2_il_problema` -> `Problema`
- `slide_3_la_soluzione_aggiornata` -> `Soluzione`
- `slide_4_come_funziona_aggiornata` -> `Flusso operativo`
- `slide_5_il_mercato` -> `Opportunità / Mercato`
- `slide_6_business_model_aggiornata` -> `Opportunità / Business model`
- `slide_7_vantaggi_competitivi_aggiornata` -> `Opportunità / Moat`
- `slide_8_roadmap` -> `Roadmap`
- `slide_9_team` -> `Team`
- `slide_10_ask_chiusura` -> `Seed / Contact`

## Duplicazioni da eliminare
Nel deck originale alcuni concetti tornano più volte. La landing deve accorparli una sola volta, nel punto più naturale del percorso.

Da consolidare:
- "validazione centrale" compare in cover, soluzione e vantaggi competitivi
- "zero spedizioni tra i flip" compare in soluzione e flow
- "credti / ledger interno" compare in soluzione e business model
- "hub + software proprietario" compare in vantaggi, roadmap e team

Regola editoriale:
ogni messaggio principale deve avere una sola sezione dominante e, altrove, solo richiami brevi.

## Tone of voice
La pagina deve comunicare:
- premium
- affidabilità
- concretezza operativa
- visione di categoria

Da evitare:
- tono troppo hype o crypto-like
- jargon non spiegato
- claim non supportati
- sezioni dense come slide compresse una sotto l'altra

## User flow del sito
Questo è il flusso di fruizione della landing.

### Flow A - Investitore
1. Entra sulla hero e capisce il concetto in 5 secondi.
2. Scorre problema e soluzione per validare il need.
3. Legge il flusso operativo per capire la differenza rispetto ai marketplace.
4. Legge opportunità, monetizzazione e moat.
5. Valuta roadmap e team.
6. Arriva alla seed CTA e richiede contatto.

### Flow B - Partner logistico / operativo
1. Arriva dalla hero o da referral.
2. Cerca subito il modello operativo.
3. Legge flusso e vantaggi competitivi.
4. Capisce ruolo dell'hub, della validazione e della bulk shipping.
5. Arriva al contatto finale.

### Flow C - Early adopter / reseller professionale
1. Capisce che il sistema riduce rischio e immobilizzo.
2. Interpreta il valore del flipping digitale.
3. Capisce il wallet a crediti e la velocità di resale.
4. È portato a lasciare interesse o richiedere accesso.

## User flow della piattaforma
Questi flow definiscono il prodotto che la landing promette.

### Flow 1 - Seller intake
1. Il seller registra l'item.
2. Riceve istruzioni per l'invio all'hub.
3. L'hub riceve, controlla e valida.
4. L'item viene certificato, fotografato, categorizzato e listato.
5. Il seller vede stato e potenziale valore nel dashboard.

### Flow 2 - First purchase
1. Il buyer esplora solo item verificati.
2. Compra con crediti interni.
3. Il ledger trasferisce ownership in tempo reale.
4. L'item resta fisicamente nell'hub.
5. Il buyer può tenere, rivendere o accumulare per spedizione bulk.

### Flow 3 - Instant flip
1. Il nuovo owner rimette subito in vendita l'item.
2. Un altro utente compra la ownership.
3. La piattaforma trattiene la fee di flip.
4. Non parte nessuna nuova spedizione.
5. Il loop può continuare finché c'è domanda.

### Flow 4 - Final delivery
1. L'utente seleziona più item posseduti.
2. Richiede bulk shipping.
3. La piattaforma calcola costi e consolidamento.
4. L'hub prepara un'unica spedizione.
5. L'utente riceve il pacco finale con tracking.

### Flow 5 - Admin / hub operations
1. L'operatore riceve l'item.
2. Completa checklist di autenticazione e qualità.
3. Approva o respinge l'intake.
4. Aggiorna status logistico e disponibilità.
5. Esegue packing e dispatch quando richiesto.

## Feature set della piattaforma

### MVP Core
- autenticazione utente e profili
- creazione intake item
- dashboard hub per validazione
- scheda item certificata
- listing marketplace solo di item verificati
- wallet a crediti
- acquisto ownership digitale
- relisting rapido
- checkout bulk shipping
- storico transazioni e ownership
- notifiche di stato

### MVP Plus
- scoring qualità item
- suggerimenti pricing
- dashboard resale performance
- gestione fee e accounting interno
- pannello admin per eccezioni, dispute e audit trail

### Fase successiva
- AI support per classificazione e quality checks
- ranking e gamification per reseller
- strumenti pro per seller ad alto volume
- multi-hub geografico
- insight ESG e metriche CO2 risparmiata

## Requisiti UX della landing
- single page con nav sticky e anchor reali
- sezioni ben separate tramite tonalità di superficie, non con linee rigide
- contenuto leggibile su mobile e desktop
- CTA sempre chiara ma non invasiva
- copy breve, forte e progressivo
- componenti riusabili per card, metriche, timeline e section heading

## Requisiti visual
- applicare il design system di `DESIGN.md`
- look editoriale premium, non template
- forte gerarchia tipografica
- no overload di box e numeri
- uso di gradienti, superfici tonali e glass panels con moderazione

## Output atteso nel progetto React
- landing page one-page completa
- nav con ancore corrette
- sezioni coerenti con il planning
- contenuti già puliti e deduplicati
- struttura codice leggibile e facilmente estendibile

## Decisioni di contenuto da mantenere
- mantenere il focus su fashion / second-hand premium
- non introdurre claim tecnici non presenti nel deck
- presentare i numeri del deck come segnali strategici, non come metriche certificate
- usare il termine "ledger" come concetto operativo, non come riferimento crypto
