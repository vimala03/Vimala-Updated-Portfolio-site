import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { MainContentAnchor } from '../components/SkipLink'
import {
  ProgressBar,
  ScrollReveal,
  SectionBlock,
} from '../components/case-study'

/* ============================================================================
   CivTech · Menopause Care — Social Impact Design Sprint.

   FINAL POLISH PASS (this file). Structure carried over unchanged from the
   prior rebuild; this pass improves hierarchy, swaps in higher-quality real
   research images, redesigns the ideation section around real workshop
   photography, replaces numbered markers with icons in the concept, drops
   the My Role section, removes em dashes, and brings text contrast in line
   with FlyIn (same tokens as FlyIn throughout — var(--cs-ink) / var(--cs-body)
   / var(--cs-text-muted) — reserving the muted tone strictly for labels,
   meta and captions, never for primary narrative copy).

   SIX real research images, all supplied directly by the user this session
   (replacing lower-quality prior crops) or carried over verified-real from
   earlier Figma extraction — nothing generated or recreated:
     - civtech-journey-map.jpg            — the real service journey map.
     - civtech-structure-organisation.jpg — the real NHS Scotland structure/
       organisation research board (the "ecosystem" artifact).
     - civtech-journey-brainstorm.jpg     — the real HMW-clustering /
       concept-ideation matrix (goals → intervention areas → idea clusters).
     - civtech-sticky-1.jpg .. -5.jpg     — five real photographs from the
       two-day brainstorming session.
     - civtech-competitors.jpg            — the real competitor-analysis
       slide (Peppy, Bupa, Health & Her, Balance). Appears ONLY inside
       Competitive Landscape, clearly labelled "existing solutions" — never
       positioned near the proposed concept.

   No product UI exists for this project and none is fabricated here (an
   earlier pass in this session nearly used AI-generated "reference" phone
   screens as if real; the user corrected that explicitly). The proposed
   solution is a conceptual service model — icon-led capabilities and a
   flow of stages — labelled "PROPOSED CONCEPT · CONCEPTUAL SERVICE MODEL ·
   NOT A SHIPPED PRODUCT" throughout.

   .theme-civic (src/index.css) is this case study's established accent
   (#8a5a1a, amber) — applied to the page root so EcosystemDiagram and every
   --cs-* token resolve correctly.
============================================================================ */

const ACCENT   = '#8a5a1a'
const INK      = '#111110'
const BODY     = '#3a3a38'
const MUTED    = '#5a5954'
const HAIRLINE = 'rgba(17,17,16,0.09)'
const TEAL     = '#2f5c53'
const TINT_BG  = '#eef4f2'

const HERO_META = [
  { label: 'Role',     value: 'Design Lead' },
  { label: 'Duration', value: '15 days' },
  { label: 'Team',     value: '1 design lead · 1 XD · 2 researchers · 4 junior designers' },
  { label: 'Focus',    value: 'Healthcare · AI · Social Impact' },
]

const CHALLENGE_STATS = [
  { stat: 'Nearly 60%', label: 'lack of initial information', text: 'of women in Scotland feel unprepared for the impact of menopause on their life.' },
  { stat: '40%', label: 'dissatisfaction with medical services', text: 'of women who saw a medical professional were not satisfied with the care they received.' },
  { stat: '87.4%', label: 'advocate menopause policies at work', text: 'of Scottish women believe menopause policies should exist at work, to remove fear of judgement.' },
]

const COMPLEXITY = [
  {
    label: 'Lack of preparedness', text: 'Most women reach perimenopause with little warning of what to expect, or where to turn first.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="13" cy="13" r="9.5" />
        <path d="M13 8v5.5l3.5 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Holistic care', text: 'A purely medical, one-size-fits-all approach overlooks the psychological side of menopause.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M13 21S3.5 15 3.5 8.8A4.8 4.8 0 0 1 13 7a4.8 4.8 0 0 1 9.5 1.8C22.5 15 13 21 13 21Z" strokeLinejoin="round" />
        <path d="M9.5 12h2l1.2-2.2L14 14l1.3-2h1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Workplace impact', text: 'Stigma and a lack of policy affect professional lives, hindering career progression and causing skill shortages.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="4" y="9" width="18" height="12" rx="1.5" />
        <path d="M9.5 9V6.5A1.5 1.5 0 0 1 11 5h4a1.5 1.5 0 0 1 1.5 1.5V9" />
        <path d="M4 14h18" />
      </svg>
    ),
  },
  {
    label: 'Economic pressure', text: 'Reduced productivity and career progression carry wider workforce implications for the economy.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M5 21V13M12.5 21V7M20 21v-9" strokeLinecap="round" />
        <path d="M4 21h18" strokeLinecap="round" />
      </svg>
    ),
  },
]

const RESEARCH_STEPS = [
  'Problem brief', 'Healthcare landscape', 'Journey mapping', 'Existing technologies',
  'Competitor benchmarking', 'Business ecosystem', 'NHS guidance', 'Government policy',
]

const SYNTHESIS_CLUSTERS = [
  { cluster: 'Access', themes: ['Lack of awareness', 'Prolonged appointment waiting periods', 'Insufficient training'] },
  { cluster: 'Personalisation', themes: ['Absence of personalisation', 'Exclusion of minorities', 'Inadequate family support'] },
  { cluster: 'Ecosystem', themes: ['Mis-alignment of partnerships', 'Limited engagement within community'] },
]

const ECOSYSTEM_STAKEHOLDERS = ['Women', 'Healthcare professionals', 'NHS / public healthcare', 'Specialists', 'Employers', 'Pharmacies', 'Community organisations']

const COMPETITORS = ['Peppy', 'Bupa', 'Health & Her', 'Balance']

const COMPETITOR_DIMENSIONS = ['Information', 'Personalisation', 'Clinical support', 'Community', 'Workplace', 'Ecosystem connection']

const COMPETITOR_GAPS = [
  'Existing solutions concentrate on transactional interactions: a booking, an article, a single consultation.',
  'Each addresses individual parts of menopause support, but none connects healthcare, workplace, pharmacy and community into one journey.',
]

const HMW_EMPHASIS = ['inclusive and personalised ecosystem', 'comprehensive menopause care', 'training initiatives', 'awareness and accessibility', 'holistic approach']

const IDEATION_STEPS = ['Explore', 'Cluster', 'Evaluate', 'Narrow', 'Direction']

/* Concept capabilities — icon-led, replacing numbered markers. */
const CAPABILITY_ICONS = {
  person: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="13" cy="8.5" r="4" />
      <path d="M4.5 21.5c1.3-4 4.6-6.5 8.5-6.5s7.2 2.5 8.5 6.5" strokeLinecap="round" />
    </svg>
  ),
  triage: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M3 14h4l2-5 3 9 2.5-6.5L16 14h7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  access: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M3.5 13h17" strokeLinecap="round" />
      <path d="M14.5 6.5 21 13l-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  specialist: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="13" cy="13" r="9.5" />
      <path d="M13 8.5v9M8.5 13h9" strokeLinecap="round" />
    </svg>
  ),
  monitor: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="3.5" y="5.5" width="19" height="12.5" rx="1.5" />
      <path d="M7 21.5h12M13 18v3.5" strokeLinecap="round" />
      <path d="M7 13l3-3.5 2.5 2.5L17 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  community: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="8.5" cy="9.5" r="3" />
      <circle cx="18" cy="9.5" r="3" />
      <path d="M3.5 20c.9-3 3-4.8 5.7-4.8M22.5 20c-.9-3-3-4.8-5.7-4.8" strokeLinecap="round" />
      <path d="M9.5 13.5c1-.5 2-.8 3.5-.8s2.5.3 3.5.8" strokeLinecap="round" />
    </svg>
  ),
}

const CONCEPT_CAPABILITIES = [
  { icon: CAPABILITY_ICONS.person, label: 'Personalised support', text: 'Care and information adapt to each woman’s stage and symptoms.' },
  { icon: CAPABILITY_ICONS.triage, label: 'Severity-based triage', text: 'Interventions mapped against a triage system, not a single queue.' },
  { icon: CAPABILITY_ICONS.access, label: 'Faster access', text: 'Seamless healthcare integration minimises prolonged waiting periods.' },
  { icon: CAPABILITY_ICONS.specialist, label: 'Specialist care', text: 'Routed to the right specialist or service, not the default one.' },
  { icon: CAPABILITY_ICONS.monitor, label: 'Post-appointment support', text: 'Symptoms tracked after the visit, where support today typically stops.' },
  { icon: CAPABILITY_ICONS.community, label: 'Community support', text: 'Families and communities engaged to reduce stigma and isolation.' },
]

const SERVICE_FLOW = ['Understand', 'Assess', 'Route', 'Support', 'Monitor', 'Connect']

const RESEARCH_RESPONSE = [
  { finding: 'Lack of awareness', response: 'Personalised information' },
  { finding: 'Long waiting periods', response: 'Severity-based triage' },
  { finding: 'Fragmented follow-up', response: 'Ongoing monitoring' },
  { finding: 'Insufficient training', response: 'Remote professional training' },
  { finding: 'Limited community engagement', response: 'Connected community support' },
]

const DESIGNED_VALUE = [
  'More personalised support', 'Earlier access to appropriate care', 'Reduced fragmentation',
  'Stronger stakeholder coordination', 'More inclusive support', 'Proactive rather than reactive care',
]

function TintWrap({ bg, children }: { bg: string; children: ReactNode }) {
  return <div style={{ background: bg }}>{children}</div>
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span style={{
      fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.04em',
      color: MUTED, border: `0.5px solid ${HAIRLINE}`, borderRadius: '999px',
      padding: '0.35rem 0.85rem', display: 'inline-block',
    }}>
      {children}
    </span>
  )
}

/** Horizontal step sequence with a connecting hairline. */
function StepFlow({ steps, tone = ACCENT }: { steps: string[]; tone?: string }) {
  return (
    <div className="flex flex-wrap items-center" style={{ gap: '0.4rem', rowGap: '0.9rem' }}>
      {steps.map((s, i) => (
        <ScrollReveal key={s} delay={i * 40} className="flex items-center" from="none">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: tone, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: INK, whiteSpace: 'nowrap' }}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <span style={{ width: 'clamp(14px, 2.4vw, 34px)', height: '0.5px', background: HAIRLINE, flexShrink: 0 }} />
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}

/** Numbered annotation marker, absolutely positioned over a research
 *  artifact by percentage coordinates (so it scales with the image). */
function Annotation({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)',
        width: '24px', height: '24px', borderRadius: '50%', background: ACCENT, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600,
        boxShadow: '0 2px 10px rgba(0,0,0,0.28)', border: '1.5px solid #fff',
      }}
    >
      {n}
    </div>
  )
}

/** Marker + thin connector + small label, anchored at a percentage point
 *  on a research artifact — used for the Research Evidence section's
 *  restrained callouts, extending toward `side` so the label never sits
 *  over the image edge. */
function JourneyCallout({ n, x, y, label, side }: { n: number; x: number; y: number; label: string; side: 'left' | 'right' }) {
  const reversed = side === 'left'
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', left: `${x}%`, top: `${y}%`,
        transform: reversed ? 'translate(-100%, -50%)' : 'translate(0, -50%)',
        display: 'flex', flexDirection: reversed ? 'row-reverse' : 'row', alignItems: 'center', gap: '6px',
        zIndex: 2,
      }}
    >
      <span style={{
        width: '20px', height: '20px', borderRadius: '50%', background: ACCENT, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)', border: '1.5px solid #fff',
      }}>
        {n}
      </span>
      <span style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.85)', flexShrink: 0 }} />
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: '#fff', background: 'rgba(17,17,16,0.82)',
        padding: '0.25rem 0.55rem', borderRadius: '4px', whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  )
}

/** Very small, restrained source indicator for a research artifact — a
 *  replacement for the longer captions previously repeated under images. */
function ArtifactTag({ children }: { children: ReactNode }) {
  return (
    <span style={{
      fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
      color: MUTED,
    }}>
      {children}
    </span>
  )
}

export default function CivtechPage() {
  return (
    <div className="theme-civic" style={{ background: 'var(--cs-bg, #f7f2ec)', minHeight: '100vh' }}>
      <ProgressBar color={ACCENT} />
      <Navbar />
      <MainContentAnchor />

      {/* ====================================================================
         HERO
      ==================================================================== */}
      <div className="max-w-[1100px] mx-auto px-6 lg:px-16 pt-12 sm:pt-16">
        <ScrollReveal>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: '1.5rem' }}>
            CivTech · Social Impact Design Sprint
          </div>
          <h1 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(2.1rem, 4.8vw, 3.4rem)', lineHeight: 1.08, letterSpacing: '-0.025em', color: INK, fontWeight: 500, marginBottom: '1.1rem', maxWidth: '21ch' }}>
            Designing better support for a life stage that&rsquo;s{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--cs-accent)' }}>often overlooked.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.98rem', color: BODY, lineHeight: 1.7, maxWidth: '52ch', marginBottom: '2.25rem' }}>
            An AI-powered concept for inclusive, accessible and connected menopause care.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4" style={{ borderTop: `0.5px solid ${HAIRLINE}`, paddingTop: '1.25rem', marginBottom: '2.5rem' }}>
            {HERO_META.map((item) => (
              <div key={item.label}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.11em', textTransform: 'uppercase', color: MUTED, marginBottom: '0.3rem' }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 500, color: INK, lineHeight: 1.4 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={140}>
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div style={{ overflow: 'hidden', borderRadius: '12px', border: `0.5px solid ${HAIRLINE}`, boxShadow: '0 32px 72px -30px rgba(17,17,16,0.24)' }}>
            <img
              src="/images/civtech.jpeg"
              alt="The real CivTech Menopause Care cover slide: 'Support through change', with the four support pillars: reliable information, personalised guidance, supportive community, a healthier tomorrow."
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>
      </ScrollReveal>

      {/* ====================================================================
         02 — THE CHALLENGE — white, oversized stat strip
      ==================================================================== */}
      <TintWrap bg="#ffffff">
        <SectionBlock index="02" label="The challenge" title="How can technology help empower women to better understand menopause and access the right support for their individual needs, at the right time?">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-8" style={{ marginTop: '1rem' }}>
            {CHALLENGE_STATS.map((p, i) => (
              <ScrollReveal key={p.label} delay={i * 60}>
                <div style={{ borderTop: `1px solid ${HAIRLINE}`, paddingTop: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(2.4rem, 4.6vw, 3.2rem)', fontWeight: 600, color: ACCENT, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '0.7rem' }}>
                    {p.stat}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 500, color: INK, marginBottom: '0.4rem' }}>
                    {p.label}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: BODY, lineHeight: 1.55, margin: 0 }}>
                    {p.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </SectionBlock>
      </TintWrap>

      {/* ====================================================================
         03 — WHY THIS PROBLEM IS COMPLEX — compact 2×2, icon markers
      ==================================================================== */}
      <SectionBlock index="03" label="Why this problem is complex" title="Menopause touches more than healthcare." alternate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-9">
          {COMPLEXITY.map((t, i) => (
            <ScrollReveal key={t.label} delay={i * 60}>
              <div style={{ display: 'flex', gap: '1.1rem' }}>
                <div style={{ color: ACCENT, flexShrink: 0, marginTop: '0.1rem' }}>{t.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 500, color: INK, marginBottom: '0.4rem' }}>
                    {t.label}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: BODY, lineHeight: 1.65, margin: 0, maxWidth: '38ch' }}>
                    {t.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionBlock>

      {/* ====================================================================
         04 — RESEARCH JOURNEY (cream, compact process → transitions to map)
      ==================================================================== */}
      <SectionBlock index="04" label="Research journey" title="Eight inputs, one investigation.">
        <ScrollReveal>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: BODY, lineHeight: 1.75, maxWidth: '58ch', marginBottom: '2rem' }}>
            Understanding the problem meant looking beyond a single app or clinical touchpoint: across existing guidance, the businesses already involved, and how women actually move through the system today.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={60}>
          <StepFlow steps={RESEARCH_STEPS} />
        </ScrollReveal>
      </SectionBlock>

      {/* ====================================================================
         05 — RESEARCH EVIDENCE — asymmetric editorial composition: left
         narrative + findings, right the real Journey Map, large and crisp.
      ==================================================================== */}
      <div style={{ padding: 'clamp(3rem, 6vw, 4.5rem) 0', background: '#ffffff', borderBottom: `0.5px solid ${HAIRLINE}` }}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, marginBottom: '0.3rem' }}>05</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, paddingBottom: '1.25rem', borderBottom: `0.5px solid ${HAIRLINE}`, marginBottom: '2rem' }}>
              Research evidence
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-[0.62fr_1fr] gap-10 lg:gap-12">
            {/* LEFT — narrative weight: headline, framing, three findings */}
            <ScrollReveal className="min-w-0">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 2.8vw, 2.15rem)', letterSpacing: '-0.022em', lineHeight: 1.18, color: INK, fontWeight: 400, marginBottom: '1.1rem', maxWidth: '15ch' }}>
                A fragmented journey, with friction at every turn.
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: BODY, lineHeight: 1.7, marginBottom: '2.25rem', maxWidth: '42ch' }}>
                Mapping the end-to-end menopause experience revealed multiple points of friction across awareness, access, diagnosis, treatment and ongoing support.
              </p>

              <div className="flex flex-col" style={{ gap: '1.5rem' }}>
                {[
                  { n: '01', title: 'Awareness gaps', text: 'Understanding begins alone, often before any service or professional is involved.' },
                  { n: '02', title: 'Long waiting periods', text: 'Waits recur at treatment and specialist stages, not only at diagnosis.' },
                  { n: '03', title: 'Fragmented follow-up', text: 'Support tapers off after treatment, right when continuity matters most.' },
                ].map((f) => (
                  <div key={f.n} style={{ display: 'flex', gap: '1rem', borderTop: `0.5px solid ${HAIRLINE}`, paddingTop: '1rem' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem', fontWeight: 600, color: ACCENT, letterSpacing: '-0.02em', lineHeight: 1.1, flexShrink: 0 }}>
                      {f.n}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', fontWeight: 500, color: INK, marginBottom: '0.3rem' }}>
                        {f.title}
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: BODY, lineHeight: 1.55, margin: 0 }}>
                        {f.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* RIGHT — the real artifact, large and crisp */}
            <ScrollReveal delay={80} className="min-w-0">
              <div style={{ position: 'relative', overflowX: 'auto', overflowY: 'hidden', borderRadius: '8px', border: `0.5px solid ${HAIRLINE}`, WebkitOverflowScrolling: 'touch' }}>
                <div className="min-w-[900px] lg:min-w-0" style={{ position: 'relative' }}>
                  <img
                    src="/images/case-studies/civtech/civtech-journey-map.jpg"
                    alt="The real menopause-care service journey map from CivTech research: swimlanes for Realisation and Awareness, Consultation with GP, Diagnosis, Prescription, Treatment, Monitoring and Adjustments, Consultation with Specialist, and Post Menopause / After Treatment, with decision points and highlighted wait-time friction points along the way."
                    style={{ width: '100%', display: 'block' }}
                  />
                  <JourneyCallout n={1} x={5} y={58} label="Awareness" side="right" />
                  <JourneyCallout n={2} x={46} y={61} label="Waiting" side="right" />
                  <JourneyCallout n={3} x={88} y={55} label="Follow-up" side="left" />
                </div>
              </div>
              <div className="flex items-center justify-between" style={{ marginTop: '0.6rem' }}>
                <ArtifactTag>Research artifact</ArtifactTag>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.66rem', color: MUTED }}>Scroll to inspect on smaller screens</span>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={140}>
            <div style={{ marginTop: '2.25rem', paddingTop: '1.75rem', borderTop: `0.5px solid ${HAIRLINE}` }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: '0.7rem' }}>
                Key insight
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)', color: INK, lineHeight: 1.55, maxWidth: '68ch', margin: 0, fontWeight: 500 }}>
                The experience was not one continuous healthcare journey. It was a series of disconnected stages, hand-offs and waiting periods.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ====================================================================
         06 — RESEARCH SYNTHESIS (tinted teal, clustered taxonomy)
      ==================================================================== */}
      <TintWrap bg={TINT_BG}>
        <SectionBlock index="06" label="Research synthesis" title="Eight recurring gaps, grouped by root cause.">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-8">
            {SYNTHESIS_CLUSTERS.map((c, i) => (
              <ScrollReveal key={c.cluster} delay={i * 70}>
                <div style={{ borderTop: `1.5px solid ${TEAL}`, paddingTop: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: TEAL, marginBottom: '1rem' }}>
                    {c.cluster}
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    {c.themes.map((t) => (
                      <li key={t} style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: INK, lineHeight: 1.5 }}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={220}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.2rem, 2.4vw, 1.6rem)', color: INK, lineHeight: 1.5, maxWidth: '46ch', marginTop: '3.25rem' }}>
              The opportunity was not another menopause information product. It was{' '}
              <em style={{ fontStyle: 'italic', color: ACCENT }}>a connected support ecosystem.</em>
            </p>
          </ScrollReveal>
        </SectionBlock>
      </TintWrap>

      {/* ====================================================================
         07 — ECOSYSTEM / STRUCTURE & ORGANISATION — real artifact, large
      ==================================================================== */}
      <div style={{ padding: 'clamp(3.5rem, 7vw, 5.5rem) 0', background: '#ffffff', borderBottom: `0.5px solid ${HAIRLINE}` }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, marginBottom: '0.3rem' }}>07</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: MUTED, paddingBottom: '1.25rem', borderBottom: `0.5px solid ${HAIRLINE}`, marginBottom: '1.5rem' }}>
              Ecosystem
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', letterSpacing: '-0.022em', lineHeight: 1.15, color: INK, fontWeight: 400, marginBottom: '1rem', maxWidth: '34ch' }}>
              Menopause care sits inside a much larger system.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: BODY, lineHeight: 1.75, maxWidth: '62ch', marginBottom: '2.5rem' }}>
              Mapping who actually holds responsibility for menopause care in Scotland surfaced a structure a woman never sees: national policy, regional health boards and dozens of partnerships, all above the single care provider she meets.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div style={{ position: 'relative', overflowX: 'auto', overflowY: 'hidden', borderRadius: '10px', border: `0.5px solid ${HAIRLINE}`, WebkitOverflowScrolling: 'touch' }}>
              <div style={{ position: 'relative', minWidth: '640px' }}>
                <img
                  src="/images/case-studies/civtech/civtech-structure-organisation.jpg"
                  alt="The real NHS Scotland structure-and-organisation research board: national policy through the Scottish Government, regional health boards, health and social care partnerships and the Mental Welfare Commission, down to individual care providers, with real NHS Scotland web pages referenced alongside."
                  style={{ width: '100%', display: 'block' }}
                />
                <Annotation n={1} x={51} y={22} />
                <Annotation n={2} x={51} y={42} />
                <Annotation n={3} x={89} y={90} />
              </div>
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <ArtifactTag>Research artifact</ArtifactTag>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-4" style={{ marginTop: '2rem' }}>
              {[
                'National policy: the Scottish Government sets direction from the top.',
                'Regional health boards and health and social care partnerships sit beneath it.',
                'Individual care providers, at the bottom, are the only layer most women ever actually see.',
              ].map((t, i) => (
                <div key={t} style={{ display: 'flex', gap: '0.75rem' }}>
                  <span style={{ flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%', background: ACCENT, color: '#fff', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {i + 1}
                  </span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: BODY, lineHeight: 1.55, margin: 0 }}>{t}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: INK, lineHeight: 1.65, marginTop: '2rem', fontStyle: 'italic', maxWidth: '68ch' }}>
              The solution could not succeed as an isolated app. It needed to connect the people, services and support systems surrounding the woman.
            </p>
            <div className="flex flex-wrap gap-2" style={{ marginTop: '1.5rem' }}>
              {ECOSYSTEM_STAKEHOLDERS.map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ====================================================================
         08 — COMPETITIVE LANDSCAPE — real screenshot, clearly separated
      ==================================================================== */}
      <SectionBlock index="08" label="Competitive landscape · existing solutions" title="Existing solutions focus on transactions, not comprehensive care." alternate>
        <ScrollReveal>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px', border: `0.5px solid ${HAIRLINE}`, marginBottom: '1.5rem' }}>
            <img
              src="/images/case-studies/civtech/civtech-competitors.jpg"
              alt="The real competitor-analysis slide from CivTech research, with the real screens benchmarked from Peppy, Health & Her and Bupa's menopause services, shown strictly as existing-market evidence, not as the proposed CivTech concept."
              style={{ width: '100%', display: 'block' }}
            />
            <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(17,17,16,0.82)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.35rem 0.75rem', borderRadius: '999px' }}>
              Existing solutions, not our concept
            </div>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16">
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: BODY, lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Benchmarked against real dimensions of menopause support:
            </p>
            <div className="flex flex-wrap gap-2" style={{ marginBottom: '1.5rem' }}>
              {COMPETITOR_DIMENSIONS.map((d) => <Pill key={d}>{d}</Pill>)}
            </div>
            <div className="flex flex-wrap gap-2">
              {COMPETITORS.map((c) => <Pill key={c}>{c}</Pill>)}
            </div>
          </ScrollReveal>
          <div className="flex flex-col gap-4">
            {COMPETITOR_GAPS.map((g, i) => (
              <ScrollReveal key={g} delay={i * 50}>
                <div style={{ display: 'flex', gap: '0.85rem', borderTop: `0.5px solid ${HAIRLINE}`, paddingTop: '0.85rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: ACCENT, flexShrink: 0, paddingTop: '0.1rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: BODY, lineHeight: 1.6, margin: 0 }}>{g}</p>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={110}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: INK, lineHeight: 1.6, marginTop: '0.5rem', fontStyle: 'italic' }}>
                The opportunity was to connect what already exists into one ecosystem, not to build one more isolated part of it.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </SectionBlock>

      {/* ====================================================================
         09 — HOW MIGHT WE — turning point, tinted, full statement
      ==================================================================== */}
      <div style={{ padding: 'clamp(4rem, 9vw, 7rem) 0', background: TINT_BG }}>
        <div className="max-w-[940px] mx-auto px-6 text-center">
          <ScrollReveal>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: TEAL, marginBottom: '1.5rem' }}>
              09 · How might we
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.35rem, 3.1vw, 2.1rem)', lineHeight: 1.5, letterSpacing: '-0.015em', color: INK, fontWeight: 500 }}>
              How might we craft an{' '}
              <em style={{ fontStyle: 'italic', color: ACCENT }}>{HMW_EMPHASIS[0]}</em>{' '}
              that seamlessly delivers{' '}
              <em style={{ fontStyle: 'italic', color: ACCENT }}>{HMW_EMPHASIS[1]}</em>, tailored for women while fostering connections with specialist support and a nurturing community, as well as collaborating on{' '}
              <em style={{ fontStyle: 'italic', color: ACCENT }}>{HMW_EMPHASIS[2]}</em>, engaging healthcare professionals, employers, and pharmacies, aiming to elevate{' '}
              <em style={{ fontStyle: 'italic', color: ACCENT }}>{HMW_EMPHASIS[3]}</em>, ensuring a{' '}
              <em style={{ fontStyle: 'italic', color: ACCENT }}>{HMW_EMPHASIS[4]}</em> for women navigating perimenopause, menopause and post menopause.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* ====================================================================
         10 — IDEATION / BRAINSTORM (white, two real artifacts, restrained)
      ==================================================================== */}
      <TintWrap bg="#ffffff">
        <SectionBlock index="10" label="Research evidence" title="From fragmented research to a clearer direction.">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-14 items-start" style={{ marginBottom: '4rem' }}>
            <ScrollReveal>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: BODY, lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Before narrowing to one concept, the team explored four alternative framings, each pairing a goal with a barrier surfaced in research, then clustering ideas around it. Every cluster carried a tag through to synthesis: awareness, personalisation, community, training.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: BODY, lineHeight: 1.75 }}>
                This structured divergence, rather than a single brainstorm, is what surfaced the eight recurring themes behind the research synthesis.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <ArtifactTag>Research artifact</ArtifactTag>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div style={{ overflow: 'hidden', borderRadius: '10px', border: `0.5px solid ${HAIRLINE}` }}>
                <img
                  src="/images/case-studies/civtech/civtech-journey-brainstorm.jpg"
                  alt="The real concept-clustering matrix from CivTech research: four alternative framings, each with goals, intervention areas and clustered idea diagrams tagged by theme."
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: BODY, lineHeight: 1.75, maxWidth: '62ch', marginBottom: '1.75rem' }}>
              Two days of intensive brainstorming followed, across storyboarding, mind-mapping, Crazy 8s, SCAMPER and Six Thinking Hats, generating a wide spread of directions before a deliberate narrowing.
            </p>
          </ScrollReveal>

          {/* Sticky-note composition: one larger image, four smaller, offset */}
          <ScrollReveal delay={60}>
            <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_1fr] gap-5" style={{ marginBottom: '1rem' }}>
              <div style={{ overflow: 'hidden', borderRadius: '8px', border: `0.5px solid ${HAIRLINE}`, aspectRatio: '4 / 3' }}>
                <img
                  src="/images/case-studies/civtech/civtech-sticky-5.jpg"
                  alt="Real photograph from the CivTech brainstorming workshop: sticky notes clustered on a table with red-thread affinity dividers."
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div style={{ overflow: 'hidden', borderRadius: '8px', border: `0.5px solid ${HAIRLINE}`, aspectRatio: '1 / 1' }}>
                  <img src="/images/case-studies/civtech/civtech-sticky-1.jpg" alt="Real photograph of sticky notes from the CivTech brainstorming session, pinned to a wall." style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ overflow: 'hidden', borderRadius: '8px', border: `0.5px solid ${HAIRLINE}`, aspectRatio: '1 / 1', marginTop: '1.5rem' }}>
                  <img src="/images/case-studies/civtech/civtech-sticky-2.jpg" alt="Real photograph of sticky notes from the CivTech brainstorming session, pinned to a wall." style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ overflow: 'hidden', borderRadius: '8px', border: `0.5px solid ${HAIRLINE}`, aspectRatio: '1 / 1' }}>
                  <img src="/images/case-studies/civtech/civtech-sticky-3.jpg" alt="Real photograph of sticky notes from the CivTech brainstorming session, pinned to a wall." style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ overflow: 'hidden', borderRadius: '8px', border: `0.5px solid ${HAIRLINE}`, aspectRatio: '1 / 1', marginTop: '1.5rem' }}>
                  <img src="/images/case-studies/civtech/civtech-sticky-4.jpg" alt="Real photograph of sticky notes from the CivTech brainstorming session, pinned to a wall." style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            </div>
            <ArtifactTag>Workshop photography</ArtifactTag>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div style={{ marginTop: '2.5rem' }}>
              <StepFlow steps={IDEATION_STEPS} tone={TEAL} />
            </div>
          </ScrollReveal>
        </SectionBlock>
      </TintWrap>

      {/* ====================================================================
         11 — PROPOSED CONCEPT — icon-led capabilities
      ==================================================================== */}
      <SectionBlock index="11" label="Proposed concept" title="An AI-powered healthcare solution for proactive, personalised menopause care." alternate>
        <ScrollReveal>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: '1.25rem' }}>
            Proposed concept · conceptual service model · not a shipped product
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: BODY, lineHeight: 1.75, maxWidth: '64ch', marginBottom: '3rem' }}>
            No product UI was designed for this challenge; the submission is a research-and-strategy proposal. Predictive, AI-assisted capability would move a woman through personalised information, appropriate care and ongoing support.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-9">
          {CONCEPT_CAPABILITIES.map((c, i) => (
            <ScrollReveal key={c.label} delay={i * 50}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ color: ACCENT, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500, color: INK, marginBottom: '0.35rem' }}>
                    {c.label}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: BODY, lineHeight: 1.55, margin: 0 }}>
                    {c.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionBlock>

      {/* ====================================================================
         12 — CONCEPTUAL SERVICE MODEL — dominant flow diagram
      ==================================================================== */}
      <TintWrap bg="#ffffff">
        <SectionBlock index="12" label="Conceptual service model" title="How a woman would move through the proposed model.">
          <ScrollReveal>
            <div className="flex flex-wrap items-center" style={{ gap: '0', rowGap: '2rem' }}>
              {SERVICE_FLOW.map((s, i) => (
                <div key={s} className="flex items-center">
                  <div style={{
                    minWidth: '112px', height: '112px', borderRadius: '50%', border: `1.5px solid ${ACCENT}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.2rem',
                    padding: '0 0.5rem',
                  }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: MUTED }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 500, color: INK, textAlign: 'center' }}>{s}</span>
                  </div>
                  {i < SERVICE_FLOW.length - 1 && (
                    <span aria-hidden="true" style={{ width: 'clamp(16px, 3vw, 44px)', height: '1px', background: HAIRLINE, flexShrink: 0 }} />
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </SectionBlock>
      </TintWrap>

      {/* ====================================================================
         13 — RESEARCH → RESPONSE — the strategic mapping
      ==================================================================== */}
      <TintWrap bg={TINT_BG}>
        <SectionBlock index="13" label="Research → response" title="The solution came directly from the research.">
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-x-4 gap-y-0" style={{ marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: TEAL, paddingBottom: '0.75rem', borderBottom: `1.5px solid ${TEAL}` }}>
                Research finding
              </div>
              <div />
              <div className="hidden sm:block" style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: ACCENT, paddingBottom: '0.75rem', borderBottom: `1.5px solid ${ACCENT}` }}>
                Design response
              </div>
            </div>
            {RESEARCH_RESPONSE.map((r, i) => (
              <ScrollReveal key={r.finding} delay={i * 50}>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-x-4 gap-y-1 items-center" style={{ padding: '1rem 0', borderBottom: `0.5px solid ${HAIRLINE}` }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: INK }}>{r.finding}</div>
                  <div aria-hidden="true" style={{ color: MUTED, fontSize: '0.85rem', textAlign: 'center' }}>→</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 500, color: ACCENT }}>{r.response}</div>
                </div>
              </ScrollReveal>
            ))}
          </ScrollReveal>
        </SectionBlock>
      </TintWrap>

      {/* ====================================================================
         14 — DESIGNED VALUE
      ==================================================================== */}
      <SectionBlock index="14" label="Designed value" title="What the concept was designed to change.">
        <ScrollReveal>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600, marginBottom: '1.5rem' }}>
            Designed value · concept · outcomes not measured in production
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
          {DESIGNED_VALUE.map((t, i) => (
            <ScrollReveal key={t} delay={i * 40}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', paddingTop: '0.5rem', borderTop: `0.5px solid ${HAIRLINE}` }}>
                <span style={{ color: ACCENT, fontFamily: 'var(--font-body)', fontSize: '0.78rem', flexShrink: 0 }}>→</span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: BODY, margin: 0 }}>{t}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={260}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: MUTED, lineHeight: 1.6, maxWidth: '52ch', marginTop: '1.75rem' }}>
            This was a 15-day CivTech design-sprint concept, not a shipped product; there is no launch, adoption or usage data to report. The finalist recognition from CivTech Scotland judges is the concept&rsquo;s validated outcome.
          </p>
        </ScrollReveal>
      </SectionBlock>

      {/* ====================================================================
         15 — REFLECTION (white, closing)
      ==================================================================== */}
      <TintWrap bg="#ffffff">
        <SectionBlock index="15" label="Reflection" title="Designing for healthcare means designing across systems, not screens.">
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: BODY, lineHeight: 1.8, maxWidth: '62ch', marginBottom: '1.25rem' }}>
              The hardest part of this sprint wasn&rsquo;t generating ideas. It was synthesising a broad, messy problem space and connecting that research directly to strategy, rather than jumping straight to a single app.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: BODY, lineHeight: 1.8, maxWidth: '62ch' }}>
              In fifteen days, leading a multidisciplinary team meant constantly balancing inclusion against feasibility, turning wide-ranging research into a connected service model the team could actually design, defend and submit within a hard constraint on time.
            </p>
          </ScrollReveal>
        </SectionBlock>
      </TintWrap>

      {/* ====================================================================
         NEXT CASE STUDY — Cornerstone (closes the five-project cycle:
         Cornerstone → YouClean → Content Manager Metadata → FlyIn →
         CivTech → back to Cornerstone)
      ==================================================================== */}
      <ScrollReveal>
        <Link to="/work/cornerstone" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <div style={{ background: 'var(--cs-card-bg, #ede1d0)', borderTop: `0.5px solid ${HAIRLINE}` }}>
            <div className="max-w-[1040px] mx-auto px-6 lg:px-16 py-14">
              <div className="flex items-center justify-between gap-8 flex-wrap">
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, marginBottom: '0.6rem' }}>
                    Next case study →
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', color: INK, letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
                    Cornerstone
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: MUTED }}>
                    Enterprise Product Design
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  style={{ width: '52px', height: '52px', borderRadius: '50%', border: `1px solid ${HAIRLINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: INK, fontSize: '1.1rem' }}
                >
                  →
                </div>
              </div>
            </div>
          </div>
        </Link>
      </ScrollReveal>

      <Footer />
    </div>
  )
}
