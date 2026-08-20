import { ReactNode } from 'react'
import ScrollReveal from './ScrollReveal'

interface PullQuoteProps {
  children:  ReactNode      // can include <em> for emphasis
  size?:     'md' | 'lg'    // lg = thesis-level statement, md = supporting line
  attribution?: string
  className?: string
}

export default function PullQuote({ children, size = 'md', attribution, className = '' }: PullQuoteProps) {
  return (
    <ScrollReveal className={className}>
      <div style={{ textAlign: 'center', padding: size === 'lg' ? '4rem 1.5rem' : '2rem 1.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: size === 'lg' ? 'clamp(1.8rem, 4vw, 3rem)' : 'clamp(1.15rem, 2.2vw, 1.6rem)',
          lineHeight: size === 'lg' ? 1.22 : 1.4,
          letterSpacing: '-0.02em',
          color: 'var(--cs-ink)',
          maxWidth: size === 'lg' ? '20ch' : '32ch',
          margin: '0 auto',
        }}>
          {children}
        </p>
        {attribution && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--cs-text-muted)',
            marginTop: '1.25rem',
          }}>
            {attribution}
          </p>
        )}
      </div>
    </ScrollReveal>
  )
}
