import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ProgressBar, NextProjectCTA, DecisionCard, ScrollReveal } from '../components/case-study'

const tags = ['Lead UX Designer', 'Health Tech', 'Mobile & Web', 'Cross-Platform', '2022–2023']

const decisions = [
  {
    number: '01',
    decision: 'Ran dual-track research for two radically different user types',
    why: 'Veterinarians and equine riders have completely different workflows, vocabularies, and trust models. Rather than design for a blended persona, ran parallel research tracks — contextual inquiry with vets in clinic settings, diary studies with competitive riders — before finding the shared access patterns that informed the IA.',
    outcome: 'MVP shipped in 14 weeks with 0 major post-launch IA changes',
    tag: 'Research-Led',
    tagColor: 'green' as const,
  },
  {
    number: '02',
    decision: 'Designed a single data model that served two different interfaces',
    why: 'Horse health data needed to be entered by vets and read by riders — but in very different contexts. Designed a shared data layer with two distinct interface skins: a clinical-grade entry flow for vets and a simplified health dashboard for riders, reducing development effort and eliminating data silos.',
    outcome: 'Reduced build complexity by ~35% vs. separate app approach',
    tag: 'Systems Thinking',
    tagColor: 'blue' as const,
  },
  {
    number: '03',
    decision: 'Framed remote care as a trust product, not just a feature',
    why: 'Riders were sceptical of remote vet consultations — concerned about misdiagnosis and liability. Designed the remote care flow around transparency: clear session boundaries, recorded consultation summaries, and an explicit "in-person referral" CTA when the vet determined remote was insufficient.',
    outcome: 'Remote consultation adoption exceeded projections by 40% in beta',
    tag: 'Strategic Framing',
    tagColor: 'amber' as const,
  },
]

export default function VetRiderPage() {
  return (
    <div style={{ background: 'radial-gradient(ellipse at 70% 0%, rgba(26,90,138,0.065) 0%, transparent 55%), radial-gradient(ellipse at 15% 70%, rgba(26,90,138,0.035) 0%, transparent 50%), #faf8f5', minHeight: '100vh' }}>
      <ProgressBar color="#1a5a8a" />
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
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            color: '#111110',
            marginBottom: '1.25rem',
            fontWeight: 500,
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          Connecting vets and riders through{' '}
          <em style={{ fontStyle: 'italic', color: '#5a5954' }}>data-driven</em>
          {' '}equine health.
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
          End-to-end UX for Continental's Vet & Rider wellness platform — a cross-platform product connecting equine veterinarians and horse riders through smarter, more accessible remote healthcare.
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
            { label: 'Client',    value: 'Continental · via Moonraft' },
            { label: 'My role',   value: 'Lead UX Designer' },
            { label: 'Timeline',  value: '2022 – 2023' },
            { label: 'Platform',  value: 'Web & Mobile' },
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
              <div style={{ fontFamily: '"Instrument Sans", sans-serif', fontSize: '0.82rem', fontWeight: 500, color: '#111110' }}>
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

      {/* NDA note */}
      <ScrollReveal>
        <div style={{ maxWidth: '1040px', margin: '0 auto 5rem', padding: '0 4rem' }}>
          <div style={{
            background: '#edf4f8',
            border: '0.5px solid rgba(26,90,138,0.12)',
            borderRadius: '14px',
            padding: '2.5rem 3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontFamily: '"Instrument Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a5a8a', opacity: 0.7, marginBottom: '0.5rem' }}>
                Full case study
              </div>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', color: '#111110', letterSpacing: '-0.02em' }}>
                NDA-protected — available on request.
              </div>
            </div>
            <a
              href="mailto:vimalabanavath.design@gmail.com?subject=Vet %26 Rider Case Study Request"
              className="btn-sweep btn-sweep-primary"
              style={{ padding: '11px 22px', fontSize: '11px' }}
            >
              Request access →
            </a>
          </div>
        </div>
      </ScrollReveal>

      <NextProjectCTA
        label="Next case study →"
        title="Cornerstone OnDemand · AI Workflows"
        href="/work/cornerstone"
      />
      <Footer />
    </div>
  )
}
