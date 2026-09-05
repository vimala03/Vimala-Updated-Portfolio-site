import { motion } from 'framer-motion'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PasswordModal from '../components/PasswordModal'
import { MainContentAnchor } from '../components/SkipLink'
import { ProgressBar, NextProjectCTA, DecisionCard, ScrollReveal } from '../components/case-study'

const tags = ['UX Designer', 'Social Impact', 'Health Tech', 'Design Sprint', '2023']

const decisions = [
  {
    number: '01',
    decision: 'Ran a dual-track sprint: story first, features second',
    why: 'The CivTech brief required research, storytelling, and a working prototype within 72 hours. Most teams rushed to features. We invested the first 24 hours building a compelling narrative around the lived experience of menopause — which became the spine of the entire submission.',
    outcome: 'Finalist recognition from CivTech Scotland judges',
    tag: 'Strategic Framing',
    tagColor: 'amber' as const,
  },
  {
    number: '02',
    decision: 'Designed for underserved voices, not average users',
    why: 'Menopause UX is typically built for the clinical average. Research revealed that women in workplaces, women of colour, and women in perimenopause had radically different access needs. Designed personalisation flows that adapted to user-defined identity, not demographic assumptions.',
    outcome: 'Community support feature rated highest in user testing',
    tag: 'Research-Led',
    tagColor: 'green' as const,
  },
  {
    number: '03',
    decision: 'Built a modular resource system that scales with the user\'s journey',
    why: 'Menopause is a multi-year journey, not a single moment. Designed a content architecture that evolved with the user\'s stage — perimenopause, menopause, post-menopause — surfacing relevant resources contextually rather than dumping everything at onboarding.',
    outcome: 'Prototype completed and validated within 72-hour sprint window',
    tag: 'Systems Thinking',
    tagColor: 'blue' as const,
  },
]

const FIGMA_URL = 'https://www.figma.com/proto/DxM23ZXWyKbUcrz0i5ef90/Vimala-Banavath-Portfolio?page-id=50%3A2073&type=design&node-id=50-2077&t=ca7sjBKI6iJvyMCt-0&scaling=scale-down-width&starting-point-node-id=50%3A2077'
const PASSWORD = 'designedbyvimala'

export default function CivtechPage() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div style={{ background: 'radial-gradient(ellipse at 25% 0%, rgba(138,90,26,0.07) 0%, transparent 55%), radial-gradient(ellipse at 75% 80%, rgba(138,90,26,0.04) 0%, transparent 50%), #faf8f5', minHeight: '100vh' }}>
      {showModal && (
        <PasswordModal
          label="CivTech Menopause Care"
          figmaUrl={FIGMA_URL}
          password={PASSWORD}
          onClose={() => setShowModal(false)}
        />
      )}
      <ProgressBar color="#8a5a1a" />
      <Navbar />
      <MainContentAnchor />

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
          Designing{' '}
          <em style={{ fontStyle: 'italic', color: '#5a5954' }}>menopause care</em>
          {' '}for the women the system forgets.
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
          A 72-hour CivTech Scotland design sprint — building a personalised menopause support platform with community, resources, and adaptive content that evolves with the user's journey. Finalist-recognised.
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
            { label: 'Client',    value: 'CivTech Scotland' },
            { label: 'My role',   value: 'UX Designer' },
            { label: 'Format',    value: '72-hr Sprint' },
            { label: 'Outcome',   value: 'Finalist' },
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

      {/* Figma CTA */}
      <ScrollReveal>
        <div style={{ maxWidth: '1040px', margin: '0 auto 5rem', padding: '0 4rem' }}>
          <div style={{
            background: '#f7f2ec',
            border: '0.5px solid rgba(138,90,26,0.12)',
            borderRadius: '14px',
            padding: '2.5rem 3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontFamily: '"Instrument Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a5a1a', opacity: 0.7, marginBottom: '0.5rem' }}>
                Interactive prototype
              </div>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', color: '#111110', letterSpacing: '-0.02em' }}>
                View the full Figma prototype.
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn-sweep btn-sweep-primary"
              style={{ padding: '11px 22px', fontSize: '11px' }}
            >
              View prototype →
            </button>
          </div>
        </div>
      </ScrollReveal>

      <NextProjectCTA
        label="Next case study →"
        title="Cornerstone OnDemand · AI-Powered Content Manager"
        href="/work/cornerstone"
      />
      <Footer />
    </div>
  )
}
