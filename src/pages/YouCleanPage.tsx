import type { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  ProgressBar, SectionBlock, PullQuote,
  EcosystemDiagram, ScrollytellingScene, type ScrollytellingStep,
  ConvergenceDiagram, DecisionCard, type ConvergenceFragment,
  PrincipleBlock, type PrincipleMetaphor,
  StoryScene, type StorySceneStep, ArtifactComposition, type StoryArtifact,
} from '../components/case-study'

const storyArtifacts: StoryArtifact[] = [
  { id: 'tag',       shape: 'tag',      physicalLabel: 'Order Tag',        structuredLabel: 'Order',           x: 50, y: 56, rotate: -5, z: 3 },
  { id: 'barcode',   shape: 'barcode',  physicalLabel: 'Barcode Label',    structuredLabel: 'Order ID',        x: 78, y: 26, rotate: 6,  z: 2 },
  { id: 'receipt',   shape: 'receipt',  physicalLabel: 'Receipt',          structuredLabel: 'Payment',         x: 80, y: 82, rotate: -6, z: 1 },
  { id: 'note',      shape: 'note',     physicalLabel: 'Handwritten Note', structuredLabel: 'Customer Record', x: 22, y: 26, rotate: -7, z: 2 },
  { id: 'care-tag',  shape: 'care-tag', physicalLabel: 'Care Tag',         structuredLabel: 'Service Type',    x: 20, y: 82, rotate: 8,  z: 1 },
]

// Reveal order is deliberate — the order itself anchors the story before its
// supporting facts (id, payment, customer, service) resolve around it.
const storySteps: StorySceneStep[] = [
  { id: 'tag',      caption: 'Order Tag  →  Order' },
  { id: 'barcode',  caption: 'Barcode Label  →  Order ID' },
  { id: 'receipt',  caption: 'Receipt  →  Payment' },
  { id: 'note',     caption: 'Handwritten Note  →  Customer Record' },
  { id: 'care-tag', caption: 'Care Tag  →  Service Type' },
]

const ecosystemNodes = [
  { id: 'customer', label: 'Customer' },
  { id: 'garment',  label: 'Garment'  },
  { id: 'staff',    label: 'Staff'    },
  { id: 'store',    label: 'Store'    },
  { id: 'delivery', label: 'Delivery' },
  { id: 'payment',  label: 'Payment'  },
  { id: 'referral', label: 'Referral' },
]

const ecosystemLinks: [string, string][] = [
  ['customer', 'payment'],
  ['garment', 'delivery'],
  ['staff', 'store'],
  ['staff', 'delivery'],
  ['payment', 'referral'],
  ['store', 'garment'],
]

// Maps each narrative step to the diagram's spotlight state — 'overview'
// shows everything at a quiet baseline, 'dependencies' lights it all up.
const ecosystemActiveId = (stepId: string): string | 'all' | null => {
  if (stepId === 'overview') return null
  if (stepId === 'dependencies') return 'all'
  return stepId
}

const ecosystemSteps: ScrollytellingStep[] = [
  {
    id: 'overview',
    kicker: 'End-to-end service lifecycle',
    title: 'One relationship, many moving parts',
    body: 'Every order is really a chain of custody — a garment, a customer, a staff member, and a payment, all moving through the same short window of time. Any one of them can break the chain.',
  },
  {
    id: 'customer',
    kicker: 'Customer journey',
    title: 'The customer journey',
    body: "A customer isn't just placing an order — they're extending trust for 24 to 48 hours over an item they can't see or touch. Every update, or every silence, shapes whether they come back.",
  },
  {
    id: 'garment',
    kicker: 'Garment journey',
    title: 'The garment journey',
    body: 'Each garment moves through wash, dry, and quality check as a physical object with no barcode of its own — it has to be tracked by process and by person, not by scanning.',
  },
  {
    id: 'staff',
    kicker: 'Staff responsibilities',
    title: 'Staff responsibilities',
    body: 'Pickup, sorting, washing, ironing, quality checks, delivery — different people touch the same order at different times, often without ever speaking to each other directly.',
  },
  {
    id: 'store',
    kicker: 'Store operations',
    title: 'Store operations',
    body: 'The store is the coordination point for everything arriving and leaving at once — incoming drop-offs, outgoing deliveries, walk-ins, and inventory, all sharing the same floor and the same staff.',
  },
  {
    id: 'delivery',
    kicker: 'Delivery workflow',
    title: 'Delivery workflow',
    body: "Delivery isn't the end of the order — it's the moment the customer forms their final impression, and it depends on everything upstream having gone right first.",
  },
  {
    id: 'payment',
    kicker: 'Payment flow',
    title: 'Payment flow',
    body: 'Payment could happen at drop-off, at delivery, or somewhere in between — and every variation had to be tracked without becoming a source of disputes.',
  },
  {
    id: 'referral',
    kicker: 'Referral flow',
    title: 'Referral flow',
    body: "A happy customer becomes the business's best acquisition channel — but only if referrals are tracked well enough to be rewarded, not just hoped for.",
  },
  {
    id: 'dependencies',
    kicker: 'Operational dependencies',
    title: "Nothing here happens in isolation",
    body: 'Delay a garment, and delivery slips. Miss a payment update, and a referral goes unrewarded. Every flow depends on at least two others — which is exactly why a shared system, not more spreadsheets, was the only real fix.',
  },
]

const convergenceFragments: ConvergenceFragment[] = [
  { id: 'memory', label: 'What staff remembered', icon: 'memory' },
  { id: 'chat',   label: 'WhatsApp threads',       icon: 'chat'   },
  { id: 'paper',  label: 'Handwritten bills',       icon: 'paper'  },
  { id: 'sheet',  label: 'A shared spreadsheet',    icon: 'sheet'  },
]

interface Principle {
  observation:  string
  statement:    ReactNode
  insight:      string
  implication:  string
  metaphor:     PrincipleMetaphor
}

const principles: Principle[] = [
  {
    observation: 'Ask three people if an order was done. Get three different answers.',
    statement:   <>Every order deserves <em>one</em> version of the truth.</>,
    insight:     "Fragmented truth isn't a data problem — it's a trust problem. If a fact about an order can differ depending on who you ask, nobody can act on it with confidence.",
    implication: 'One Order record, one status field, one system every screen and every person reads from.',
    metaphor:    'single-source',
  },
  {
    observation: '"Is it ready?" only had a real answer if you happened to catch the right person.',
    statement:   <>Every status should answer <em>a business question</em>.</>,
    insight:     "A status only earns its place in the system if someone would actually ask it out loud — has it been picked up, is it in the wash, can we deliver it. Anything else is just decoration.",
    implication: 'A fixed pipeline — Pending → In Progress → Ready → Delivered / Cancelled — with every transition logged against an actor.',
    metaphor:    'pipeline',
  },
  {
    observation: 'Finding one customer\'s order history meant scrolling WhatsApp with one hand and a spreadsheet with the other.',
    statement:   <>Information should <em>flow</em>, not be searched for.</>,
    insight:     'Every minute spent looking for a fact that already existed somewhere was a minute not spent serving a customer. The system should bring the relevant history with the record, not make someone go get it.',
    implication: 'Customer search auto-fills order history; the record stays live everywhere instead of waiting to be manually refreshed.',
    metaphor:    'flow',
  },
  {
    observation: 'On the busiest afternoons, a blank order form meant a skipped field or a forgotten payment status.',
    statement:   <>Reduce decisions during <em>busy operational hours</em>.</>,
    insight:     "The busiest moment in a shift is the worst possible moment to ask someone to make a judgment call. Every optional field or open choice is a chance for the record to quietly go wrong.",
    implication: 'Order entry defaults from what\'s already known about a customer, so staff confirm instead of deciding from scratch.',
    metaphor:    'branch-prune',
  },
  {
    observation: "The worry was never about a missing feature — it was not knowing whether the last change to an order was even right.",
    statement:   <>Design for operational <em>confidence</em>, not feature richness.</>,
    insight:     'A small team trusts a system it can verify, not the one with the most buttons. Confidence comes from being able to check what happened, not from having more options.',
    implication: 'Role permissions (Staff: view and create; Admin/Manager: full access) plus an audit log recording actor, action, and before/after state.',
    metaphor:    'verify',
  },
  {
    observation: 'One store, a handful of staff, a few thousand garments a month — today. Not forever.',
    statement:   <>Build for today's workflow so it <em>scales naturally</em> tomorrow.</>,
    insight:     "The right system matches the size of the problem you actually have. But the record itself — customer, order, audit trail — has to be structured the same way it would be at ten times the size, so growth is additive, not a rebuild.",
    implication: 'A lightweight Google Sheets-backed data layer today, behind the same Customer / Order / Audit Log entities a heavier backend would use.',
    metaphor:    'ripple',
  },
]

export default function YouCleanPage() {
  return (
    <div className="theme-ops" style={{ background: 'var(--cs-bg)', minHeight: '100vh' }}>
      <ProgressBar />
      <Navbar />

      <StoryScene
        headline={<>The business wasn't broken.<br />The information was.</>}
        supportingCopy="Somewhere between doing the work and knowing what had been done, an entire business was quietly getting lost. This is the story of finding it again."
        steps={storySteps}
        renderComposition={(revealedIds, reduceMotion) => (
          <ArtifactComposition artifacts={storyArtifacts} revealedIds={revealedIds} reduceMotion={reduceMotion} />
        )}
        closingLine={<>The platform didn't begin with software.<br />It began with understanding how information moved.</>}
      />

      <SectionBlock
        index="01"
        label="The opening"
        title={<>The bottleneck wasn't laundry.<br /><em>It was information.</em></>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '68ch' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--cs-body)', lineHeight: 1.8 }}>
            I own YouClean, a laundry business in Hyderabad. For years, growth was the whole story — more customers, more orders, more staff. What ran underneath all of it was less impressive: WhatsApp threads, handwritten bills, a shared Google Sheet.
          </p>

          <PullQuote size="lg">
            The bottleneck wasn't laundry. <em>It was information.</em>
          </PullQuote>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--cs-body)', lineHeight: 1.8 }}>
            One evening, three orders were delayed at the same time — not because anything broke, but because payment status, garment tracking, and delivery assignments each lived somewhere different. We spent more time searching for information than serving customers.
          </p>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--cs-body)', lineHeight: 1.8 }}>
            It wasn't one bad night. It was every night — just less visible on the nights nothing went wrong.
          </p>

          <PullQuote size="md">
            Every missed order was a customer who didn't come back.
          </PullQuote>
        </div>
      </SectionBlock>

      <SectionBlock
        index="02"
        label="Understanding the business"
        title={<>Before I designed software,<br /><em>I had to understand a business.</em></>}
        alternate
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '0.95rem',
          color:      'var(--cs-body)',
          lineHeight: 1.8,
          maxWidth:   '68ch',
          marginBottom: '3.5rem',
        }}>
          YouClean looked simple from the outside — drop off clothes, get them back clean. Underneath, it was seven overlapping flows of people, garments, money, and trust, each with its own way of failing. This is the ecosystem I had to map before writing a single line of the platform.
        </p>

        <ScrollytellingScene
          steps={ecosystemSteps}
          renderVisual={(activeId) => (
            <EcosystemDiagram
              hubLabel="YouClean"
              nodes={ecosystemNodes}
              links={ecosystemLinks}
              activeId={ecosystemActiveId(activeId)}
            />
          )}
        />
      </SectionBlock>

      <SectionBlock
        index="03"
        label="Information becoming the bottleneck"
        title={<>The same record of truth,<br /><em>living in four different places.</em></>}
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '0.95rem',
          color:      'var(--cs-body)',
          lineHeight: 1.8,
          maxWidth:   '68ch',
          marginBottom: '3.5rem',
        }}>
          Ask where a single order stood on any given day, and the honest answer was: it depended who you asked. Part of it lived in a staff member's memory. Part of it was buried in a WhatsApp thread. Part of it was a handwritten bill in a drawer. Part of it was a row in a spreadsheet, updated whenever someone remembered to.
        </p>

        <div style={{ marginBottom: '3rem' }}>
          <ConvergenceDiagram fragments={convergenceFragments} />
        </div>

        <PullQuote size="md">
          None of these were wrong. There just wasn't one of them everyone could trust at once.
        </PullQuote>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '0.95rem',
          color:      'var(--cs-body)',
          lineHeight: 1.8,
          maxWidth:   '68ch',
          margin:     '3rem 0 3.5rem',
        }}>
          Growth didn't create a new problem — it just made an old one impossible to ignore. At five orders a day, four sources of truth is an inconvenience. At the volume YouClean had grown into, it was the reason orders got missed.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <DecisionCard
            number="01"
            tag="First Instinct"
            tagColor="amber"
            decision="Fix the spreadsheet — better templates, locked columns, clearer formulas."
            why="The spreadsheet was the newest, most structured of the four sources, so it looked like the natural place to tighten things up first."
            outcome="The columns got cleaner. The coordination problem didn't move."
          />
          <DecisionCard
            number="02"
            tag="The Shift"
            tagColor="green"
            decision="Stop managing tasks inside a spreadsheet. Start designing the system underneath them."
            why="A spreadsheet can hold data, but it can't enforce a process, log who changed what, or tell four different people the same true thing at the same time. That's not a formatting problem — it's a design problem."
            outcome="This is where the case study stops being about fixing a habit and starts being about building a platform."
          />
        </div>
      </SectionBlock>

      <SectionBlock
        index="04"
        label="Product principles"
        title={<>Six observations became<br /><em>the rules I designed by.</em></>}
        alternate
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '0.95rem',
          color:      'var(--cs-body)',
          lineHeight: 1.8,
          maxWidth:   '68ch',
          marginBottom: '1rem',
        }}>
          None of these started as principles. Each one started as something that went wrong on an ordinary day. Only in hindsight did they become the rules the platform was designed by.
        </p>

        <div>
          {principles.map((p, i) => (
            <PrincipleBlock
              key={i}
              index={String(i + 1).padStart(2, '0')}
              observation={p.observation}
              statement={p.statement}
              insight={p.insight}
              implication={p.implication}
              metaphor={p.metaphor}
              reverse={i % 2 === 1}
            />
          ))}
        </div>

        <div style={{ paddingTop: '3.5rem' }}>
          <PullQuote size="lg">
            Six principles. <em>One system.</em>
          </PullQuote>
        </div>
      </SectionBlock>

      <Footer />
    </div>
  )
}
