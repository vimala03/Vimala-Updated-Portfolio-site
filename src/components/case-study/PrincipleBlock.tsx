import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

export type PrincipleMetaphor = 'single-source' | 'pipeline' | 'flow' | 'branch-prune' | 'verify' | 'ripple'

interface PrincipleBlockProps {
  index:        string        // e.g. "01"
  /** A short, concrete anecdote — the operational moment that surfaced this principle. */
  observation:  string
  /** The memorable editorial line — the principle itself. Can include <em>. */
  statement:    ReactNode
  /** One sentence bridging the observation to the principle. */
  insight:      string
  /** One line naming the concrete product implication. */
  implication:  string
  metaphor:     PrincipleMetaphor
  /** Flips the visual to the opposite side on wide screens. */
  reverse?:     boolean
  className?:   string
}

const EASE = [0.22, 1, 0.36, 1] as const

/** Shared inView/reduced-motion wiring so each glyph only defines its own marks. */
function GlyphFrame({
  viewBox = '0 0 200 200',
  children,
}: {
  viewBox?: string
  children: (inView: boolean, reduceMotion: boolean) => ReactNode
}) {
  const ref          = useRef<HTMLDivElement>(null)
  const inView       = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <div ref={ref} aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
        <g stroke="var(--cs-accent, #2f5c53)" strokeWidth="1.3" fill="none">
          {children(inView, reduceMotion)}
        </g>
      </svg>
    </div>
  )
}

function SingleSourceGlyph() {
  const ghosts = [{ x: 62, y: 66 }, { x: 148, y: 62 }, { x: 100, y: 152 }]
  return (
    <GlyphFrame>
      {(inView, reduceMotion) => {
        const lineDur   = reduceMotion ? 0.2 : 0.6
        const fadeDelay = lineDur + 0.2
        const centerDelay = fadeDelay + (reduceMotion ? 0 : 0.15)
        return (
          <>
            {ghosts.map((g, i) => (
              <motion.line
                key={`l-${i}`}
                x1={g.x} y1={g.y} x2={100} y2={100}
                strokeDasharray="3 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.45 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: lineDur, delay: i * (reduceMotion ? 0 : 0.1), ease: EASE }}
              />
            ))}
            {ghosts.map((g, i) => (
              <motion.circle
                key={`g-${i}`}
                cx={g.x} cy={g.y} r="8"
                fill="var(--cs-bg, #eef3f1)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0, 0.55, 0.55, 0.15] } : { opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0.2 : fadeDelay + 0.4,
                  delay: i * (reduceMotion ? 0 : 0.1),
                  times: reduceMotion ? undefined : [0, 0.25, 0.75, 1],
                  ease: EASE,
                }}
              />
            ))}
            <motion.circle
              cx="100" cy="100" r="17"
              fill="var(--cs-accent, #2f5c53)"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.5, delay: centerDelay, ease: EASE }}
              style={{ transformOrigin: '100px 100px' }}
            />
          </>
        )
      }}
    </GlyphFrame>
  )
}

function PipelineGlyph() {
  const xs = [30, 77, 124, 171]
  return (
    <GlyphFrame viewBox="0 0 200 140">
      {(inView, reduceMotion) => {
        const fillDur = reduceMotion ? 0.2 : 1.1
        return (
          <>
            <line x1={xs[0]} y1={70} x2={xs[3]} y2={70} strokeWidth="1" opacity="0.28" />
            <motion.line
              x1={xs[0]} y1={70} x2={xs[3]} y2={70}
              strokeWidth="2.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: fillDur, ease: EASE }}
            />
            {xs.map((x, i) => (
              <motion.circle
                key={i}
                cx={x} cy={70} r="9"
                strokeWidth="1.4"
                initial={{ fill: 'var(--cs-bg, #eef3f1)' }}
                animate={inView ? { fill: 'var(--cs-accent, #2f5c53)' } : { fill: 'var(--cs-bg, #eef3f1)' }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.01,
                  delay: (i / (xs.length - 1)) * fillDur * 0.85,
                }}
              />
            ))}
          </>
        )
      }}
    </GlyphFrame>
  )
}

function FlowGlyph() {
  const marks = [55, 95, 135]
  return (
    <GlyphFrame viewBox="0 0 200 120">
      {(inView, reduceMotion) => (
        <>
          <line x1="20" y1="60" x2="165" y2="60" strokeWidth="1" opacity="0.28" />
          {marks.map((x, i) => (
            <motion.path
              key={i}
              d={`M ${x - 6} ${52} L ${x + 6} ${60} L ${x - 6} ${68}`}
              strokeWidth="1.6"
              initial={{ opacity: 0, x: reduceMotion ? 0 : -8 }}
              animate={inView ? { opacity: 0.85, x: 0 } : { opacity: 0, x: reduceMotion ? 0 : -8 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.4, delay: i * (reduceMotion ? 0 : 0.18), ease: EASE }}
            />
          ))}
          <motion.rect
            x="168" y="46" width="20" height="28" rx="3"
            initial={{ opacity: 0, scale: 0.7, fill: 'var(--cs-bg, #eef3f1)' }}
            animate={inView ? { opacity: 1, scale: 1, fill: 'var(--cs-accent, #2f5c53)' } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, delay: reduceMotion ? 0 : 0.6, ease: EASE }}
            style={{ transformOrigin: '178px 60px' }}
          />
        </>
      )}
    </GlyphFrame>
  )
}

function BranchPruneGlyph() {
  const origin = { x: 100, y: 168 }
  const ends   = [{ x: 42, y: 48 }, { x: 82, y: 26 }, { x: 122, y: 26 }, { x: 162, y: 48 }]
  const KEEP   = 1

  return (
    <GlyphFrame>
      {(inView, reduceMotion) => (
        <>
          {ends.map((e, i) => (
            <motion.line
              key={i}
              x1={origin.x} y1={origin.y} x2={e.x} y2={e.y}
              strokeWidth={i === KEEP ? 1.4 : 1.4}
              initial={{ opacity: 0 }}
              animate={inView
                ? { opacity: i === KEEP ? [0, 0.4, 0.9] : [0, 0.4, 0], strokeWidth: i === KEEP ? [1.4, 1.4, 2.6] : 1.4 }
                : { opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0.2 : 1,
                delay: reduceMotion ? 0 : 0.15,
                times: reduceMotion ? undefined : [0, 0.5, 1],
                ease: EASE,
              }}
            />
          ))}
          {ends.map((e, i) => (
            <motion.circle
              key={`d-${i}`}
              cx={e.x} cy={e.y} r={i === KEEP ? 6 : 4}
              fill={i === KEEP ? 'var(--cs-accent, #2f5c53)' : 'var(--cs-bg, #eef3f1)'}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: i === KEEP ? 1 : 0 } : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.5, delay: reduceMotion ? 0 : 0.9, ease: EASE }}
            />
          ))}
        </>
      )}
    </GlyphFrame>
  )
}

function VerifyGlyph() {
  const ticks = [128, 144, 160]
  return (
    <GlyphFrame>
      {(inView, reduceMotion) => (
        <>
          <motion.circle
            cx="100" cy="82" r="26"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 0.9, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
            style={{ transformOrigin: '100px 82px' }}
          />
          <motion.path
            d="M 88 82 L 97 91 L 114 71"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, delay: reduceMotion ? 0 : 0.35, ease: EASE }}
          />
          {ticks.map((y, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.6 } : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.4, delay: reduceMotion ? 0 : 0.75 + i * 0.14, ease: EASE }}
            >
              <circle cx="66" cy={y} r="2.2" strokeWidth="1.1" />
              <line x1="76" y1={y} x2="134" y2={y} strokeWidth="1" opacity="0.7" />
            </motion.g>
          ))}
        </>
      )}
    </GlyphFrame>
  )
}

function RippleGlyph() {
  const rings = [30, 45, 60]
  return (
    <GlyphFrame>
      {(inView, reduceMotion) => (
        <>
          {rings.map((r, i) => (
            <motion.circle
              key={i}
              cx="100" cy="100" r={r}
              strokeDasharray="3 4"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={inView ? { opacity: [0, 0.5, 0], scale: 1 } : { opacity: 0, scale: 0.4 }}
              transition={{
                duration: reduceMotion ? 0.2 : 1.6,
                delay: i * (reduceMotion ? 0 : 0.3),
                times: reduceMotion ? undefined : [0, 0.4, 1],
                ease: EASE,
              }}
              style={{ transformOrigin: '100px 100px' }}
            />
          ))}
          <motion.circle
            cx="100" cy="100" r="11"
            fill="var(--cs-accent, #2f5c53)"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
            style={{ transformOrigin: '100px 100px' }}
          />
        </>
      )}
    </GlyphFrame>
  )
}

const GLYPHS: Record<PrincipleMetaphor, () => ReactNode> = {
  'single-source': () => <SingleSourceGlyph />,
  'pipeline':      () => <PipelineGlyph />,
  'flow':          () => <FlowGlyph />,
  'branch-prune':  () => <BranchPruneGlyph />,
  'verify':        () => <VerifyGlyph />,
  'ripple':        () => <RippleGlyph />,
}

/**
 * A single "principle spread" — reusable across case studies for any chapter
 * that argues from observation to product implication. Alternates side via
 * `reverse`; the metaphor is purely decorative, so text order in the DOM
 * never changes and reading order stays identical for screen readers.
 */
export default function PrincipleBlock({
  index, observation, statement, insight, implication, metaphor, reverse = false, className = '',
}: PrincipleBlockProps) {
  return (
    <ScrollReveal className={className}>
      <div
        style={{
          padding: '3.25rem 0',
          borderBottom: '0.5px solid var(--cs-hairline)',
        }}
      >
        <div className={`grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 items-center`}>
          <div className={reverse ? 'lg:order-2' : 'lg:order-1'}>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--cs-text-muted)',
              marginBottom: '1rem',
            }}>
              Principle {index}
            </div>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: '0.85rem',
              color: 'var(--cs-text-muted)',
              lineHeight: 1.6,
              marginBottom: '1.1rem',
              maxWidth: '46ch',
            }}>
              {observation}
            </p>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
              fontWeight: 500,
              letterSpacing: '-0.015em',
              lineHeight: 1.28,
              color: 'var(--cs-ink)',
              marginBottom: '1.25rem',
              maxWidth: '20ch',
            }}>
              {statement}
            </h3>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              color: 'var(--cs-body)',
              lineHeight: 1.75,
              maxWidth: '48ch',
              marginBottom: '1.5rem',
            }}>
              {insight}
            </p>

            <div style={{
              borderTop: '0.5px solid var(--cs-hairline-soft)',
              paddingTop: '0.85rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              color: '#1e6640',
              lineHeight: 1.5,
              maxWidth: '48ch',
            }}>
              → {implication}
            </div>
          </div>

          <div
            className={reverse ? 'lg:order-1' : 'lg:order-2'}
            style={{
              border: '0.5px solid var(--cs-hairline)',
              borderRadius: 'var(--cs-radius-md)',
              background: 'var(--cs-bg)',
              aspectRatio: '4 / 3',
              padding: '1.5rem',
            }}
          >
            {GLYPHS[metaphor]()}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
