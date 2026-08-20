import { ReactNode } from 'react'
import ScrollReveal from './ScrollReveal'

interface SectionBlockProps {
  index:       string          // e.g. "01"
  label:       string          // e.g. "The problem"
  title:       ReactNode       // can include <em> for italic portions
  children:    ReactNode
  className?:  string
  /** Alternate background — set true for every other section */
  alternate?:  boolean
}

export default function SectionBlock({
  index, label, title, children, className = '', alternate = false,
}: SectionBlockProps) {
  return (
    <section
      className={className}
      style={{
        padding: '5rem 0',
        borderBottom: '0.5px solid var(--cs-hairline)',
        background: alternate ? 'var(--cs-card-bg, #f2efe9)' : 'transparent',
      }}
    >
      <div className="max-w-[1040px] mx-auto px-6 lg:px-16">

        {/* Section eyebrow */}
        <ScrollReveal delay={0}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              fontSize: '0.58rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--cs-text-muted)',
              marginBottom: '0.3rem',
              fontFamily: 'var(--font-body)',
            }}>
              {index}
            </div>
            <div style={{
              fontSize: '0.65rem',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: 'var(--cs-text-muted)',
              paddingBottom: '1.25rem',
              borderBottom: '0.5px solid var(--cs-hairline)',
              fontFamily: 'var(--font-body)',
            }}>
              {label}
            </div>
          </div>
        </ScrollReveal>

        {/* Section title */}
        <ScrollReveal delay={60}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.7rem, 3vw, 2.2rem)',
            letterSpacing: '-0.022em',
            lineHeight: 1.12,
            marginBottom: '2.5rem',
            color: 'var(--cs-ink)',
            fontWeight: 400,
          }}>
            {title}
          </h2>
        </ScrollReveal>

        {/* Content */}
        {children}
      </div>
    </section>
  )
}
