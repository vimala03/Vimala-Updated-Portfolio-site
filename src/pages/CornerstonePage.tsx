import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Container from '../components/Container'
import Footer from '../components/Footer'

/* ─── reused tokens from site design system ─── */
const heading1 = { fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: '#18181b' } as const
const label    = { fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgba(24,24,27,0.35)', letterSpacing: '1.4px', textTransform: 'uppercase' } as const
const body     = { fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'rgba(24,24,27,0.55)', lineHeight: 1.72 } as const
const divider  = { borderTop: '1px solid rgba(0,0,0,0.07)', width: '100%' } as const

/* ─── Image placeholder ─── */
function ImagePlaceholder({ aspectRatio = '16/9', label: alt = '' }: { aspectRatio?: string; label?: string }) {
  return (
    <div style={{ width: '100%', aspectRatio, background: '#f5f4f2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {alt && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(24,24,27,0.3)' }}>{alt}</span>}
    </div>
  )
}

/* ─── Stat card ─── */
function Stat({ value, desc }: { value: string; desc: string }) {
  return (
    <div style={{ padding: '24px 28px', background: '#ffffff', border: '1px solid rgba(24,24,27,0.08)', borderRadius: '12px', flex: '1 1 160px' }}>
      <p style={{ ...heading1, fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1, margin: '0 0 6px' }}>{value}</p>
      <p style={{ ...body, fontSize: '13px', margin: 0 }}>{desc}</p>
    </div>
  )
}

/* ─── Pain point ─── */
function PainPoint({ number, title, before, after }: { number: string; title: string; before: string; after: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', padding: '32px', background: '#fafaf9', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '12px' }}>
      <div>
        <p style={{ ...label, marginBottom: '10px' as any }}>Pain point {number} — {title}</p>
        <p style={{ ...label, color: 'rgba(24,24,27,0.25)', marginBottom: '10px' as any }}>Before</p>
        <p style={{ ...body, fontSize: '14px', margin: 0 }}>{before}</p>
      </div>
      <div>
        <p style={{ ...label, marginBottom: '10px' as any, color: 'rgba(24,24,27,0.35)' } as any}>After</p>
        <p style={{ ...body, fontSize: '14px', margin: 0 }}>{after}</p>
      </div>
    </div>
  )
}

/* ─── Testimonial ─── */
function Testimonial({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div style={{ padding: '32px', background: '#ffffff', border: '1px solid rgba(24,24,27,0.08)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <p style={{ ...body, fontSize: '15px', fontStyle: 'italic', color: 'rgba(24,24,27,0.65)', margin: 0 }}>"{quote}"</p>
      <div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#18181b', margin: '0 0 2px' }}>{name}</p>
        <p style={{ ...body, fontSize: '12px', margin: 0 }}>{role}</p>
      </div>
    </div>
  )
}

export default function CornerstonePage() {
  return (
    <div>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ paddingTop: '72px', paddingBottom: '72px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <Container>
          <Link to="/" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(24,24,27,0.4)', textDecoration: 'none', display: 'inline-block', marginBottom: '40px' }}>
            ← All work
          </Link>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {['Senior Product Designer', 'AI Workflow · Apollo AI', 'Enterprise SaaS', 'Desktop', '2024–2025'].map(tag => (
              <span key={tag} style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: 'rgba(24,24,27,0.5)', padding: '4px 12px', border: '1px solid rgba(24,24,27,0.12)', borderRadius: '999px' }}>
                {tag}
              </span>
            ))}
          </div>

          <h1 style={{ ...heading1, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: '820px', margin: '0 0 24px' }}>
            Goodbye admin fatigue,<br />hello intelligent workflows.
          </h1>
          <p style={{ ...body, fontSize: '17px', maxWidth: '620px', margin: '0 0 48px' }}>
            Redesigning Cornerstone OnDemand's Content Manager with AI-powered metadata, seamless multilingual translation, and smart session continuity.
          </p>

          {/* Hero stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Stat value="91%" desc="Admin time saved on metadata" />
            <Stat value="−15K" desc="Support cases per year" />
            <Stat value="90%" desc="Translation time cut" />
            <Stat value="1-Click" desc="Any admin action" />
          </div>
        </Container>
      </section>

      {/* ── HERO SCREEN IMAGE ── */}
      <section style={{ paddingTop: '48px', paddingBottom: '48px', background: '#f5f4f2' }}>
        <Container>
          <ImagePlaceholder aspectRatio="16/8" label="Hero screen — Content Manager redesign" />
        </Container>
      </section>

      {/* ── TLDR ── */}
      <section style={{ paddingTop: '72px', paddingBottom: '72px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '48px', alignItems: 'start' }}>
            <div>
              <p style={label as any}>Got 30 seconds?</p>
              <p style={{ ...body, fontSize: '13px', marginTop: '6px' }}>For the time-pressed reader</p>
            </div>
            <p style={{ ...body, fontSize: '16px', maxWidth: '660px', margin: 0 }}>
              We redesigned Cornerstone OnDemand's Content Manager by embedding Apollo AI directly into the workflow. AI now auto-generates metadata, powers instant multilingual translation, and remembers exactly where admins left off. What once took 1,700 minutes per month now takes 160.
            </p>
          </div>
        </Container>
      </section>

      {/* ── OVERVIEW ── */}
      <section style={{ paddingTop: '72px', paddingBottom: '72px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <Container>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0' }}>
            {[
              { label: 'Company',  value: 'Cornerstone OnDemand' },
              { label: 'Product',  value: 'CSX Platform' },
              { label: 'My role',  value: 'Sr. Product Designer' },
              { label: 'Domain',   value: 'Workforce Agility' },
              { label: 'Timeline', value: 'July 2024 – Sept 2025' },
            ].map(({ label: l, value }) => (
              <div key={l} style={{ flex: '1 1 160px', padding: '24px 28px', borderRight: '1px solid rgba(24,24,27,0.07)' }}>
                <p style={{ ...label as any, marginBottom: '10px' }}>{l}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 500, color: '#18181b', margin: 0, lineHeight: 1.25 }}>{value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── TEAM ── */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <Container>
          <p style={{ ...label as any, marginBottom: '28px' }}>Meet the team — Four people, one shared mission</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {[
              { name: 'Akshay',           role: 'Gen AI Engineer' },
              { name: 'Yoni',             role: 'Engineering Director' },
              { name: 'Sailesh',          role: 'Product Manager' },
              { name: 'Vimala (Me)',       role: 'Discovering the problem, setting the vision, aligning stakeholders, and driving end-to-end execution — from research through final delivery.' },
            ].map(({ name, role }) => (
              <div key={name} style={{ flex: '1 1 200px', padding: '24px', background: '#fafaf9', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '10px' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: '#18181b', margin: '0 0 6px' }}>{name}</p>
                <p style={{ ...body, fontSize: '13px', margin: 0 }}>{role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PROBLEM ── */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <Container>
          <p style={{ ...label as any, marginBottom: '20px' }}>The problem</p>
          <h2 style={{ ...heading1, fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.015em', maxWidth: '700px', margin: '0 0 48px' }}>
            Two platforms, zero intelligence,<br />endless repetition.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '56px' }}>
            <div style={{ padding: '32px', background: '#fafaf9', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '12px' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: 'rgba(24,24,27,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Admin platform</p>
              <p style={{ ...body, fontSize: '14px', margin: 0 }}>
                Administrators face an unstructured catalog, duplicated data, and multiple disconnected touchpoints — making content management time-consuming and error-prone. No AI. No smart defaults. No scale.
              </p>
            </div>
            <div style={{ padding: '32px', background: '#fafaf9', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '12px' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: 'rgba(24,24,27,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Learner platform</p>
              <p style={{ ...body, fontSize: '14px', margin: 0 }}>
                Learners struggle with a cluttered catalog, repetitive content, and difficulty finding relevant resources. Poor admin tooling upstream creates a poor learner experience downstream.
              </p>
            </div>
          </div>

          {/* Priya's story */}
          <div style={{ padding: '40px', background: '#18181b', borderRadius: '12px', marginBottom: '48px' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '16px' }}>Context — Priya's Monday</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 500, color: '#ffffff', lineHeight: 1.35, margin: '0 0 16px' }}>
              Priya manages learning content for 6 business units across 4 languages at a 10,000-person enterprise.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: '0 0 24px' }}>
              Every week she opens Cornerstone to publish courses, tag metadata, and manage translations. The platform can do everything she needs. The problem? Everything is buried.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', borderLeft: '2px solid rgba(255,255,255,0.12)', paddingLeft: '16px', margin: 0 }}>
              "The platform can do everything. The problem is no one knows where anything is." — Recurring theme across admin research sessions
            </p>
          </div>
        </Container>
      </section>

      {/* ── RESEARCH ── */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <Container>
          <p style={{ ...label as any, marginBottom: '20px' }}>Research &amp; insights</p>
          <h2 style={{ ...heading1, fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1.12, letterSpacing: '-0.015em', margin: '0 0 48px' }}>
            What the data and the people behind it revealed.
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}>
            <Stat value="150K" desc="Support cases per year across Cornerstone customers" />
            <Stat value="1,700" desc="Admin minutes/month on metadata alone for 10 people" />
            <Stat value="5+" desc="Clicks minimum to reach any common admin action" />
            <Stat value="23" desc="Steps in old content creation flow — only 11 needed" />
          </div>

          <div style={{ padding: '32px', background: '#fafaf9', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '12px' }}>
            <p style={{ ...label as any, marginBottom: '16px' }}>How might we</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px, 2.8vw, 32px)', fontWeight: 500, color: '#18181b', lineHeight: 1.35, margin: 0 }}>
              Empower L&amp;D admins to create, translate, and manage enterprise learning content with the efficiency of AI — while preserving the control and trust that high-stakes enterprise workflows demand?
            </p>
          </div>
        </Container>
      </section>

      {/* ── PAIN POINTS ── */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <Container>
          <p style={{ ...label as any, marginBottom: '20px' }}>Pain points — Real friction. Real people. Real cost.</p>
          <h2 style={{ ...heading1, fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1.12, letterSpacing: '-0.015em', margin: '0 0 40px' }}>
            Each pain point is backed by research.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <PainPoint
              number="01"
              title="Content metadata"
              before="25–60 min per course — manually typing every field from scratch. 1,700 admin minutes/month across 10 people."
              after="Upload → Apollo AI drafts all metadata instantly → review &amp; publish in under 4 minutes."
            />
            <PainPoint
              number="02"
              title="Translation workflow"
              before="8 courses × 5 manual steps = 40 clicks, 5 minutes. Repeated every single week."
              after="Multi-select all languages → Translate All → done in under 1 minute with smart edge-case handling."
            />
            <PainPoint
              number="03"
              title="Session continuity"
              before="Close panel → interrupted by meeting → return → blank state → start from scratch. Every time."
              after="Reopen panel → 'Resume Smart Edit' appears → continue exactly where you left off."
            />
          </div>
        </Container>
      </section>

      {/* ── SOLUTION ── */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <Container>
          <p style={{ ...label as any, marginBottom: '20px' }}>Iteration &amp; solution</p>
          <h2 style={{ ...heading1, fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1.12, letterSpacing: '-0.015em', margin: '0 0 48px' }}>
            Three features that turned hours into minutes.
          </h2>

          {/* Feature 1 */}
          <div style={{ marginBottom: '64px' }}>
            <p style={{ ...label as any, marginBottom: '16px' }}>⚡ Apollo AI Metadata</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 500, color: '#18181b', margin: '0 0 16px' }}>
                  Streamlined content creation with Apollo AI
                </h3>
                <p style={{ ...body, margin: '0 0 14px' }}>Single starting point — removes confusion of multiple touchpoints. Drag &amp; drop uploads for large PDFs — no scattered document management.</p>
                <p style={{ ...body, margin: '0 0 14px' }}>When content is uploaded, Apollo AI extracts key topics using semantic parsing, maps terms to a structured skill taxonomy, and ranks metadata suggestions using relevance and prior tagging patterns.</p>
                <p style={{ ...body, margin: '0 0 20px' }}>AI identifies implicit relationships — suggests "conflict resolution" for negotiation content, adds "stakeholder management" based on historical tagging patterns. Review becomes confirmation, not analysis.</p>
                <div style={{ padding: '16px 20px', background: '#fafaf9', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '8px' }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: 'rgba(24,24,27,0.4)', margin: '0 0 4px' }}>Time saved on metadata entry</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, color: '#18181b', margin: 0 }}>1,700 → 160 min/month</p>
                </div>
              </div>
              <ImagePlaceholder aspectRatio="4/5" label="Apollo AI Metadata screen" />
            </div>
          </div>

          {/* Feature 2 */}
          <div style={{ marginBottom: '64px' }}>
            <p style={{ ...label as any, marginBottom: '16px' }}>🔄 Resume Smart Edit</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
              <ImagePlaceholder aspectRatio="4/5" label="Resume Smart Edit screen" />
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 500, color: '#18181b', margin: '0 0 16px' }}>
                  Continuity is a trust signal, not a convenience.
                </h3>
                <p style={{ ...body, margin: '0 0 14px' }}>When an admin closes a panel and returns later, Resume Smart Edit picks up exactly where they left off — preserving all in-progress edits and context.</p>
                <p style={{ ...body, margin: 0 }}>Scoped to the current session only. No persistent user profiling. Post-launch, it became the highest-cited improvement across the feature set.</p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div>
            <p style={{ ...label as any, marginBottom: '16px' }}>🌐 Translate All</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 500, color: '#18181b', margin: '0 0 16px' }}>
                  40 clicks to 1 — with smart edge-case handling.
                </h3>
                <p style={{ ...body, margin: '0 0 14px' }}>Multi-select all target languages, hit Translate All — done in under 1 minute. Previously: 8 courses × 5 manual steps = 40 clicks every week.</p>
                <p style={{ ...body, margin: 0 }}>Designed with data residency in mind — content does not leave configured regional boundaries.</p>
              </div>
              <ImagePlaceholder aspectRatio="4/5" label="Translate All screen" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── ENGINEERING COLLABORATION ── */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#fafaf9' }}>
        <Container>
          <p style={{ ...label as any, marginBottom: '20px' }}>Engineering collaboration</p>
          <h2 style={{ ...heading1, fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1.12, letterSpacing: '-0.015em', margin: '0 0 32px' }}>
            How design and engineering built trust together.
          </h2>
          <p style={{ ...body, maxWidth: '680px', margin: '0 0 48px' }}>
            Working closely with Akshay (Gen AI Engineer) and Yoni (Engineering Director) was central to making Apollo AI feel real — not just polished in Figma. I made it a priority to understand technical constraints early and design within them, rather than discovering limits at handoff.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
            {[
              {
                title: 'Weekly design-engineering syncs',
                body: 'I ran weekly 30-minute working sessions with Akshay to walk through Figma prototypes and immediately identify what was technically feasible vs. what needed to be reconsidered. This eliminated late-stage surprises entirely.',
              },
              {
                title: 'Annotated specs with edge cases',
                body: 'Every handoff included a Figma spec page covering loading states, empty states, error handling, and confidence-score thresholds for AI suggestions — reducing back-and-forth by removing ambiguity before a single line of code was written.',
              },
              {
                title: 'Constraint-first design decisions',
                body: "When the AI model couldn't generate skill tags with high confidence for non-English content, I redesigned the confidence indicator system with Akshay — turning a technical limitation into a feature that built user trust instead of eroding it.",
              },
            ].map(({ title, body: b }) => (
              <div key={title} style={{ padding: '28px', background: '#ffffff', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '10px' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: '#18181b', margin: '0 0 10px' }}>{title}</p>
                <p style={{ ...body, fontSize: '13px', margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: '28px 32px', background: '#ffffff', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '10px' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'rgba(24,24,27,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Design artefacts produced for engineering</p>
            <ul style={{ ...body, fontSize: '14px', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Figma component library with 40+ states and variants</li>
              <li>AI suggestion confidence UI spec (low / medium / high)</li>
              <li>Interaction flows covering 12 edge cases per feature</li>
              <li>Token-mapped design system aligned to existing Cornerstone component library</li>
            </ul>
          </div>
        </Container>
      </section>

      {/* ── BEFORE & AFTER ── */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <Container>
          <p style={{ ...label as any, marginBottom: '20px' }}>What changed</p>
          <h2 style={{ ...heading1, fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1.12, letterSpacing: '-0.015em', margin: '0 0 12px' }}>
            Before &amp; after.
          </h2>
          <p style={{ ...body, margin: '0 0 40px' }}>Annotated callouts explain the decisions, not just the differences.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div style={{ padding: '24px', background: '#fafaf9', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '10px' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: 'rgba(24,24,27,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Problems with the old design</p>
              {['Navigation maze', 'Empty fields by default', 'Three disconnected dropdowns', 'No AI panel, no context'].map(p => (
                <p key={p} style={{ ...body, fontSize: '13px', margin: '0 0 6px', display: 'flex', gap: '8px' as any }}>
                  <span style={{ color: '#e74c3c' }}>→</span> {p}
                </p>
              ))}
            </div>
            <div style={{ padding: '24px', background: '#fafaf9', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '10px' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: 'rgba(24,24,27,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Decisions made in the redesign</p>
              {['Apollo AI sidebar', 'AI-auto-populated chips', 'Resume Smart Edit', 'Green confirmation system'].map(p => (
                <p key={p} style={{ ...body, fontSize: '13px', margin: '0 0 6px', display: 'flex', gap: '8px' as any }}>
                  <span style={{ color: '#27ae60' }}>→</span> {p}
                </p>
              ))}
            </div>
          </div>
          <ImagePlaceholder aspectRatio="16/7" label="Before & after comparison — drag to compare" />
        </Container>
      </section>

      {/* ── IMPACT ── */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <Container>
          <p style={{ ...label as any, marginBottom: '20px' }}>Overall impact</p>
          <h2 style={{ ...heading1, fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1.12, letterSpacing: '-0.015em', margin: '0 0 48px' }}>
            Numbers that tell the real story.
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
            <Stat value="~15K" desc="Customer cases reduced per year (10% reduction)" />
            <Stat value="4,000+" desc="Pages navigable via AI-powered search" />
            <Stat value="16.6 days" desc="Avg. case resolution time — reduced" />
            <Stat value="1-Click" desc="Navigation for admins — replaces 5–6 click flows" />
            <Stat value="90%" desc="Time saved on translations (30% steps reduction)" />
            <Stat value="160 min" desc="Monthly metadata work — down from 1,700" />
          </div>
        </Container>
      </section>

      {/* ── ACCESSIBILITY ── */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#fafaf9' }}>
        <Container>
          <p style={{ ...label as any, marginBottom: '20px' }}>Accessibility &amp; compliance</p>
          <h2 style={{ ...heading1, fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1.12, letterSpacing: '-0.015em', margin: '0 0 32px' }}>
            Designed for everyone — and built to EU standards.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ padding: '28px', background: '#ffffff', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '10px' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#18181b', margin: '0 0 12px' }}>Accessibility — WCAG 2.1 AA</p>
              <ul style={{ ...body, fontSize: '13px', margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>All colour contrast ratios verified at ≥4.5:1 for text</li>
                <li>AI suggestion panels fully navigable by keyboard</li>
                <li>Screen reader labels added to all AI-generated content chips</li>
                <li>Focus indicators visible across all interactive states</li>
              </ul>
            </div>
            <div style={{ padding: '28px', background: '#ffffff', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '10px' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#18181b', margin: '0 0 12px' }}>GDPR &amp; Data Privacy — EU Compliant</p>
              <ul style={{ ...body, fontSize: '13px', margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>AI metadata suggestions clearly labelled as AI-generated</li>
                <li>One-click reject/override for every AI suggestion</li>
                <li>Session data scoped to current session only — no persistent user profiling</li>
                <li>Content does not leave configured regional boundaries</li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '20px', padding: '20px 24px', background: '#ffffff', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '10px' }}>
            <p style={{ ...body, fontSize: '14px', margin: 0 }}>
              The AI Assist panel passed Cornerstone's internal accessibility audit on the first submission — no remediation required. This was the first AI feature in the CSX platform to achieve this, and became the reference implementation for subsequent AI features in the product suite.
            </p>
          </div>
        </Container>
      </section>

      {/* ── LEARNINGS ── */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <Container>
          <p style={{ ...label as any, marginBottom: '20px' }}>Learnings &amp; way forward</p>
          <h2 style={{ ...heading1, fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1.12, letterSpacing: '-0.015em', margin: '0 0 40px' }}>
            What this taught me — and what comes next.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              {
                title: 'AI must preserve agency, not eliminate it',
                body: "The most trusted AI feature wasn't the most automated — it was the most transparent. Suggestions with confidence scores and easy override beats AI that simply acts.",
              },
              {
                title: 'Continuity is a trust signal, not a convenience',
                body: 'Resume Smart Edit was scoped as minor. Post-launch it became the highest-cited improvement. When a system remembers you, it communicates respect for your time.',
              },
              {
                title: 'AI workflows must be felt, not just functional',
                body: 'Streamlining content creation end-to-end while building user confidence at every step reduces anxiety, improves satisfaction, and cuts avoidable support cases at scale.',
              },
            ].map(({ title, body: b }) => (
              <div key={title} style={{ padding: '28px', background: '#fafaf9', border: '1px solid rgba(24,24,27,0.07)', borderRadius: '10px' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: '#18181b', margin: '0 0 12px', lineHeight: 1.35 }}>{title}</p>
                <p style={{ ...body, fontSize: '13px', margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <Container>
          <p style={{ ...label as any, marginBottom: '32px' }}>What collaborators say</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <Testimonial
              quote="Vimala brought a level of research rigour and user empathy that genuinely changed how our team thought about AI features. Her ability to balance technical constraints with user needs is rare at this level."
              name="Yoni Ben-David"
              role="Engineering Director · Cornerstone OnDemand"
            />
            <Testimonial
              quote="The specs Vimala delivered were the most thorough I've worked from as an engineer. Every edge case was documented. We shipped the AI Assist panel with zero design questions raised during implementation."
              name="Akshay Kumar"
              role="Gen AI Engineer · Cornerstone OnDemand"
            />
            <Testimonial
              quote="What stood out was how Vimala framed every design decision around measurable admin pain. She didn't just make things look better — she made the case for every change with data and user evidence."
              name="Sailesh Rao"
              role="Product Manager · Cornerstone OnDemand"
            />
          </div>
        </Container>
      </section>

      {/* ── NEXT ── */}
      <section style={{ paddingTop: '72px', paddingBottom: '72px' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <Link to="/" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(24,24,27,0.4)', textDecoration: 'none' }}>
              ← All work
            </Link>
            <div>
              <p style={{ ...label as any, marginBottom: '6px', textAlign: 'right' }}>Next case study</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 500, color: '#18181b', margin: 0 }}>AI Search &amp; Engagement Optimisation · Flyin Travel</p>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  )
}
