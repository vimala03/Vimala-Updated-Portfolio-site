import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ProgressBar, NextProjectCTA, DecisionCard, ScrollReveal } from '../components/case-study'

const tags = ['UX Designer', 'Employee Benefits', 'B2B Web', 'IA Redesign', '2022–2023']

const decisions = [
  {
    number: '01',
    decision: 'Led with information architecture before any visual design',
    why: 'Aptia\'s legacy site had grown organically — pension, health, and payroll content was scattered across inconsistent navigation. Card sorting with 12 HR managers revealed their actual mental model of benefit categories, which differed significantly from the existing structure.',
    outcome: 'Navigation task success rate improved from 54% → 91% in usability testing',
    tag: 'Research-Led',
    tagColor: 'green' as const,
  },
  {
    number: '02',
    decision: 'Designed for two distinct user types on a single platform',
    why: 'HR administrators and employees had fundamentally different goals on the same site. Created a clear entry-point split with adaptive navigation — admin paths surfaced compliance tools, employee paths surfaced self-service benefits — without requiring separate platforms.',
    outcome: 'Support ticket volume reduced by ~30% post-launch',
    tag: 'Systems Thinking',
    tagColor: 'blue' as const,
  },
  {
    number: '03',
    decision: 'Positioned trust and compliance clarity above feature marketing',
    why: 'Pension and health benefits administration is high-stakes and heavily regulated. User research showed that confusion about compliance caused drop-off. Reordered the content hierarchy to surface regulatory credentials, security certifications, and clear process flows ahead of product features.',
    outcome: 'Demo request conversion increased significantly post-launch',
    tag: 'Strategic Framing',
    tagColor: 'amber' as const,
  },
]

export default function AptiaPage() {
  return (
    <div style={{ background: 'radial-gradient(ellipse at 80% 0%, rgba(90,45,138,0.06) 0%, transparent 55%), radial-gradient(ellipse at 20% 75%, rgba(90,45,138,0.035) 0%, transparent 50%), #faf8f5', minHeight: '100vh' }}>
      <ProgressBar color="#5a2d8a" />
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
          Making employee benefits{' '}
          <em style={{ fontStyle: 'italic', color: '#5a5954' }}>clear, trusted,</em>
          {' '}and easy to navigate.
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
          Redesigning Aptia Group's website to deliver a seamless experience for HR administrators and employees — improving navigation clarity and building trust in a compliance-critical space.
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
            { label: 'Company',  value: 'Aptia Group' },
            { label: 'My role',  value: 'UX Designer' },
            { label: 'Timeline', value: '2022 – 2023' },
            { label: 'Platform', value: 'B2B Web' },
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
            background: '#f2eef8',
            border: '0.5px solid rgba(90,45,138,0.12)',
            borderRadius: '14px',
            padding: '2.5rem 3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontFamily: '"Instrument Sans", sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a2d8a', opacity: 0.7, marginBottom: '0.5rem' }}>
                Interactive prototype
              </div>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.3rem', color: '#111110', letterSpacing: '-0.02em' }}>
                View the full Figma prototype.
              </div>
            </div>
            <a
              href="https://www.figma.com/proto/DxM23ZXWyKbUcrz0i5ef90/Vimala-Banavath-Portfolio?page-id=50%3A2072&node-id=69-909&viewport=1542%2C13%2C0.07&t=gKJll47Zv6TSyzbl-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=69%3A909"
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
        title="CivTech · Social Impact Design Sprint"
        href="/work/civtech"
      />
      <Footer />
    </div>
  )
}
