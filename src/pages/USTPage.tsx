import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ProgressBar, NextProjectCTA, DecisionCard, ScrollReveal } from '../components/case-study'

const tags = ['Lead UX Designer', 'Enterprise Intranet', 'Web & Mobile', 'Information Architecture', '2022–2023']

const decisions = [
  {
    number: '01',
    decision: 'Audited the fragmented intranet before designing anything new',
    why: 'UST\'s existing intranet had grown through years of tool additions without a unifying IA. Rather than jumping to solutions, ran a full content audit and stakeholder interviews across 6 departments — mapping where employees actually went versus where the IA said they should go. The gap was significant.',
    outcome: 'Reduced top-level navigation categories from 14 → 6 without losing any content',
    tag: 'Research-Led',
    tagColor: 'green' as const,
  },
  {
    number: '02',
    decision: 'Designed around tasks, not org-chart structure',
    why: 'Most intranets mirror internal org structures — HR content lives under HR, IT under IT. Employee research showed that tasks like "raise a ticket" or "submit expenses" required crossing 3–4 departments. Redesigned the IA around employee jobs-to-be-done, surfacing cross-functional workflows as first-class navigation items.',
    outcome: 'Time-on-task for key workflows reduced by ~40% in usability testing',
    tag: 'Systems Thinking',
    tagColor: 'blue' as const,
  },
  {
    number: '03',
    decision: 'Unified tool access under a single search layer',
    why: 'Employees were switching between 8+ tools daily with no central entry point. Rather than replace the tools, designed a unified search and quick-access layer that surfaced results from connected tools in context — reducing the cognitive cost of knowing which tool to open for which task.',
    outcome: 'Post-launch survey showed 78% of employees found tools faster than before',
    tag: 'Strategic Framing',
    tagColor: 'amber' as const,
  },
]

export default function USTPage() {
  return (
    <div style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(45,45,43,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 75%, rgba(45,45,43,0.03) 0%, transparent 50%), #faf8f5', minHeight: '100vh' }}>
      <ProgressBar color="#2d2d2b" />
      <Navbar />

      {/* Hero */}
      <motion.div
        style={{ padding: '6rem 4rem 4rem', maxWidth: '1040px', margin: '0 auto', textAlign: 'center' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Tags */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2.5rem' }}>
          {tags.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: '"Instrument Sans", sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '0.5px solid rgba(17,17,16,0.09)',
                padding: '0.22rem 0.7rem',
                borderRadius: '999px',
                color: '#5a5954',
                background: '#f2efe9',
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        <motion.h1
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.024em',
            color: '#111110',
            marginBottom: '1.4rem',
            fontWeight: 500,
            maxWidth: '820px',
            margin: '0 auto 1.4rem',
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Transforming a fragmented intranet into a{' '}
          <em style={{ fontStyle: 'italic', color: '#5a5954' }}>unified employee experience</em>
          {' '}across web and mobile.
        </motion.h1>

        <motion.p
          style={{
            fontFamily: '"Instrument Sans", sans-serif',
            fontSize: '0.92rem',
            color: '#5a5954',
            lineHeight: 1.8,
            maxWidth: '58ch',
            margin: '0 auto 2.5rem',
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Redesigning UST's enterprise intranet — unifying fragmented tools, siloed content, and disconnected workflows into a single, research-driven platform that gave employees faster access to everything they needed.
        </motion.p>

        {/* Meta strip */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            border: '0.5px solid rgba(17,17,16,0.09)',
            borderRadius: '14px',
            overflow: 'hidden',
            background: 'rgba(17,17,16,0.03)',
            maxWidth: '680px',
            margin: '0 auto',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            { label: 'Company',   value: 'UST Global · via Moonraft' },
            { label: 'My role',   value: 'Lead UX Designer (Team Lead)' },
            { label: 'Timeline',  value: '2022 – 2023' },
            { label: 'Platform',  value: 'Web & Mobile Applications' },
          ].map((item, i, arr) => (
            <div key={i} style={{
              background: '#fff',
              padding: '1.1rem 1.5rem',
              textAlign: 'center',
              flex: 1,
              minWidth: '120px',
              borderRight: i < arr.length - 1 ? '0.5px solid rgba(17,17,16,0.07)' : 'none',
            }}>
              <div style={{ fontFamily: '"Instrument Sans", sans-serif', fontSize: '0.58rem', letterSpacing: '0.11em', textTransform: 'uppercase', color: '#a09d97', marginBottom: '0.3rem' }}>
                {item.label}
              </div>
              <div style={{ fontFamily: '"Instrument Sans", sans-serif', fontSize: item.value.length > 22 ? '0.72rem' : '0.82rem', fontWeight: 500, color: '#111110', lineHeight: 1.3 }}>
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Divider */}
      <div style={{ borderTop: '0.5px solid rgba(17,17,16,0.08)', margin: '0 4rem' }} />

      {/* Key work section */}
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '5rem 4rem' }}>
        <ScrollReveal>
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: '"Instrument Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#d0cdc7', marginBottom: '0.4rem' }}>
              01
            </div>
            <div style={{ fontFamily: '"Instrument Sans", sans-serif', fontSize: '0.65rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: '#a09d97', paddingBottom: '1.25rem', borderBottom: '0.5px solid rgba(17,17,16,0.08)' }}>
              Key contributions
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.6rem, 3vw, 2rem)', letterSpacing: '-0.022em', lineHeight: 1.12, marginBottom: '3rem', color: '#111110', fontWeight: 400 }}>
            Three decisions that{' '}
            <em style={{ fontStyle: 'italic', color: '#5a5954' }}>shaped the work.</em>
          </h2>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {decisions.map((d, i) => (
            <DecisionCard key={i} delay={i * 80} {...d} />
          ))}
        </div>
      </div>

      {/* Figma CTA */}
      <ScrollReveal>
        <div style={{ maxWidth: '1040px', margin: '0 auto 5rem', padding: '0 4rem' }}>
          <div style={{
            background: '#f2f0ec',
            border: '0.5px solid rgba(45,45,43,0.12)',
            borderRadius: '14px',
            padding: '2.5rem 3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontFamily: '"Instrument Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2d2d2b', opacity: 0.6, marginBottom: '0.5rem' }}>
                Interactive prototype
              </div>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', color: '#111110', letterSpacing: '-0.02em' }}>
                View the full Figma prototype.
              </div>
            </div>
            <a
              href="https://www.figma.com/proto/DxM23ZXWyKbUcrz0i5ef90/Vimala-Banavath-Portfolio?page-id=187%3A16344&node-id=187-19899&viewport=552%2C1569%2C0.11&t=7p323AFE3PhinXty-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=187%3A19899"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep btn-sweep-primary"
              style={{ padding: '11px 22px', fontSize: '11px' }}
            >
              View prototype →
            </a>
          </div>
        </div>
      </ScrollReveal>

      <NextProjectCTA
        label="Next case study →"
        title="Moonraft · Interaction Design"
        href="/work/moonraft"
      />
      <Footer />
    </div>
  )
}
