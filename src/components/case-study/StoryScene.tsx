import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

export interface StorySceneStep {
  id:       string
  /** Optional lower-third caption shown while this step is the most recent one revealed, e.g. "Receipt → Payment". */
  caption?: string
}

interface StorySceneProps {
  /** Huge editorial opening statement — the only thing on screen for the first beat. */
  headline:          ReactNode
  /** Curiosity-building copy under the headline. Keep it short — this is not an explainer. */
  supportingCopy:    ReactNode
  /** One trigger zone per transformation. Order matters — reveals are cumulative and one-way. */
  steps:             StorySceneStep[]
  /** Renders the pinned visual for the current set of revealed step ids. */
  renderComposition: (revealedIds: Set<string>, reduceMotion: boolean) => ReactNode
  /** The single sentence that hands off to the next scene. */
  closingLine:       ReactNode
  className?:        string
}

const EASE = [0.22, 1, 0.36, 1] as const

function ScrollCue({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.55 }}
      transition={{ duration: reduceMotion ? 0.3 : 0.8, delay: reduceMotion ? 0 : 1.4, ease: EASE }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        marginTop: '3.5rem',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.6rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--cs-text-muted)',
      }}>
        Scroll
      </span>
      <motion.span
        style={{ width: '1px', height: '28px', background: 'var(--cs-hairline)', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: reduceMotion ? 0.3 : 0.6, delay: reduceMotion ? 0 : 1.7, ease: EASE }}
      />
    </motion.div>
  )
}

/** Invisible scroll-distance spacer — reports when it crosses the reveal band. */
function StepMarker({ index, onReach }: { index: number; onReach: (i: number) => void }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })

  useEffect(() => {
    if (inView) onReach(index)
  }, [inView, index, onReach])

  return <div ref={ref} style={{ minHeight: '62vh' }} aria-hidden="true" />
}

/**
 * A generic "documentary opening" shell, reusable across case studies:
 * a still, text-only first beat; a pinned visual that reveals itself
 * step by step as the reader scrolls past a sequence of spacer zones
 * (position: sticky — no scroll-jacking, native scroll throughout); and
 * a closing beat that hands off to whatever comes next. Content-agnostic —
 * swap `headline`, `steps`, and `renderComposition` to reuse this for a
 * different story.
 */
export default function StoryScene({
  headline, supportingCopy, steps, renderComposition, closingLine, className = '',
}: StorySceneProps) {
  const reduceMotion              = Boolean(useReducedMotion())
  const [revealedCount, setCount] = useState(0)
  const handleReach                = useCallback((i: number) => {
    setCount((c) => Math.max(c, i + 1))
  }, [])

  const revealedIds = useMemo(
    () => new Set(steps.slice(0, revealedCount).map((s) => s.id)),
    [steps, revealedCount],
  )

  const activeCaption = revealedCount > 0 ? steps[revealedCount - 1]?.caption : undefined

  return (
    <section className={className} aria-label="Opening scene">
      {/* Beat 1 — still, silent, text only */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '6rem 1.5rem 3rem',
      }}>
        <motion.h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 7.5vw, 5.6rem)',
            fontWeight: 500,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            color: 'var(--cs-ink)',
            maxWidth: '18ch',
          }}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.3 : 0.85, ease: EASE }}
        >
          {headline}
        </motion.h1>

        <motion.p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
            color: 'var(--cs-text-muted)',
            lineHeight: 1.7,
            maxWidth: '38ch',
            marginTop: '2rem',
          }}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.3 : 0.7, delay: reduceMotion ? 0 : 0.35, ease: EASE }}
        >
          {supportingCopy}
        </motion.p>

        <ScrollCue reduceMotion={reduceMotion} />
      </div>

      {/* Beat 2 — pinned visual, scroll-revealed transformations */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'sticky',
          top: '10vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}>
          <div style={{ width: 'min(560px, 88vw)', aspectRatio: '5 / 4' }}>
            {renderComposition(revealedIds, reduceMotion)}
          </div>

          <div style={{ height: '1.1rem' }}>
            {activeCaption && (
              <motion.p
                key={activeCaption}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: EASE }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--cs-text-muted)',
                  margin: 0,
                }}
              >
                {activeCaption}
              </motion.p>
            )}
          </div>
        </div>

        {steps.map((step, i) => (
          <StepMarker key={step.id} index={i} onReach={handleReach} />
        ))}
      </div>

      {/* Beat 3 — closing line, handoff to next scene */}
      <ScrollReveal>
        <div style={{
          minHeight: '46vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '3rem 1.5rem 5rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 2.8vw, 1.9rem)',
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
            color: 'var(--cs-ink)',
            maxWidth: '26ch',
          }}>
            {closingLine}
          </p>
        </div>
      </ScrollReveal>
    </section>
  )
}
