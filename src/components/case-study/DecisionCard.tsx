import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

interface DecisionCardProps {
  number:      string        // e.g. "01"
  decision:    string        // what was decided
  why:         string        // reasoning / tradeoff
  outcome?:    string        // measured or qualitative outcome
  tag?:        string        // e.g. "Tradeoff" | "Key Decision" | "Risk"
  tagColor?:   'amber' | 'blue' | 'green' | 'default'
  delay?:      number
}

const TAG_COLORS = {
  amber:   { bg: '#fdf0dc', text: '#7a4a10' },
  blue:    { bg: '#e8f0fa', text: '#1a4f8a' },
  green:   { bg: '#e4f2ea', text: '#1e6640' },
  default: { bg: '#f2efe9', text: '#5a5954' },
}

export default function DecisionCard({
  number, decision, why, outcome, tag, tagColor = 'default', delay = 0,
}: DecisionCardProps) {
  const tagStyle = TAG_COLORS[tagColor]

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        style={{
          background: '#fff',
          border: '0.5px solid rgba(17,17,16,0.08)',
          borderRadius: '14px',
          padding: '1.75rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
        whileHover={{ y: -3, boxShadow: '0 8px 28px rgba(17,17,16,0.08)' }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Number + optional tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.8rem',
            lineHeight: 1,
            color: '#d0cdc7',
          }}>
            {number}
          </span>
          {tag && (
            <span style={{
              fontSize: '0.58rem',
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              fontFamily: '"Instrument Sans", sans-serif',
              fontWeight: 500,
              ...tagStyle,
            }}>
              {tag}
            </span>
          )}
        </div>

        {/* Decision */}
        <p style={{
          fontFamily: '"Instrument Sans", sans-serif',
          fontSize: '0.88rem',
          fontWeight: 500,
          color: '#111110',
          lineHeight: 1.45,
          margin: 0,
        }}>
          {decision}
        </p>

        {/* Why */}
        <p style={{
          fontFamily: '"Instrument Sans", sans-serif',
          fontSize: '0.78rem',
          color: '#5a5954',
          lineHeight: 1.65,
          flexGrow: 1,
          margin: 0,
        }}>
          {why}
        </p>

        {/* Outcome */}
        {outcome && (
          <div style={{
            borderTop: '0.5px solid rgba(17,17,16,0.07)',
            paddingTop: '0.85rem',
            fontFamily: '"Instrument Sans", sans-serif',
            fontSize: '0.72rem',
            color: '#1e6640',
            lineHeight: 1.5,
          }}>
            → {outcome}
          </div>
        )}
      </motion.div>
    </ScrollReveal>
  )
}
