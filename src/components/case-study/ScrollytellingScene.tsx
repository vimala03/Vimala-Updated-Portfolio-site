import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

export interface ScrollytellingStep {
  id:      string
  kicker?: string
  title:   string
  body:    string
}

interface ScrollytellingSceneProps {
  steps:        ScrollytellingStep[]
  /** Renders the pinned visual for whichever step is currently active. */
  renderVisual: (activeId: string, reduceMotion: boolean) => ReactNode
  className?:   string
}

/**
 * Generic "pinned visual + scrolling narrative steps" shell — a reusable
 * scrollytelling pattern. No scroll-jacking: the visual pane is CSS
 * `position: sticky`, and step activation is driven by useInView on each
 * step's own block, so native scrolling, keyboard nav, and screen readers
 * all keep working exactly as they would on plain text. Swap `steps` and
 * `renderVisual` to reuse this shell for a different diagram/product reveal
 * in another chapter or case study.
 */
export default function ScrollytellingScene({ steps, renderVisual, className = '' }: ScrollytellingSceneProps) {
  const reduceMotion            = Boolean(useReducedMotion())
  const [activeId, setActiveId] = useState(steps[0]?.id ?? '')
  const handleActive            = useCallback((id: string) => setActiveId(id), [])

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${className}`}>
      <div
        style={{
          position:     'sticky',
          top:          '12vh',
          border:       '0.5px solid var(--cs-hairline)',
          borderRadius: 'var(--cs-radius-md)',
          background:   'var(--cs-bg)',
          aspectRatio:  '1 / 1',
          maxHeight:    '56vh',
          padding:      '1.5rem',
        }}
      >
        {renderVisual(activeId, reduceMotion)}
      </div>

      <div>
        {steps.map((step) => (
          <StepBlock key={step.id} step={step} onActive={handleActive} />
        ))}
      </div>
    </div>
  )
}

function StepBlock({ step, onActive }: { step: ScrollytellingStep; onActive: (id: string) => void }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })

  useEffect(() => {
    if (inView) onActive(step.id)
  }, [inView, step.id, onActive])

  return (
    <div
      ref={ref}
      style={{
        minHeight:      '56vh',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        paddingBottom:  '2rem',
      }}
    >
      <ScrollReveal>
        {step.kicker && (
          <div style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '0.62rem',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            color:         'var(--cs-text-muted)',
            marginBottom:  '0.6rem',
          }}>
            {step.kicker}
          </div>
        )}
        <h3 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.3rem, 2.4vw, 1.7rem)',
          letterSpacing: '-0.015em',
          lineHeight:    1.2,
          color:         'var(--cs-ink)',
          marginBottom:  '0.85rem',
        }}>
          {step.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '0.95rem',
          lineHeight: 1.8,
          color:      'var(--cs-body)',
          maxWidth:   '52ch',
        }}>
          {step.body}
        </p>
      </ScrollReveal>
    </div>
  )
}
