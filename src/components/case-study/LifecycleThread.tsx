import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type OriginArtifact = 'ticket' | 'tag' | 'barcode' | 'seam'

interface LifecycleThreadProps {
  /** Ordered stages, e.g. ['Drop-off', 'Order Created', 'Wash', ...] */
  stages:       string[]
  aspectRatio?: string
  className?:   string
  /**
   * Optional physical operational artifact rendered at the first node,
   * which the thread appears to emerge from — communicates "physical
   * business becomes digital system" without any distressed/decorative
   * effects. Omit for a plain node (original behavior).
   */
  origin?: OriginArtifact
}

const VIEW_W      = 1000
const VIEW_H      = 400
const PAD_X       = 60
const AMPLITUDE   = 46
const ARTIFACT_W  = 46
const ARTIFACT_H  = 24

/** Clean, stroke-only physical-artifact motif — the thread's point of origin. */
function OriginMotif({ kind, point }: { kind: OriginArtifact; point: { x: number; y: number } }) {
  const { x: cx, y: cy } = point
  const left  = cx - ARTIFACT_W / 2
  const right = cx + ARTIFACT_W / 2
  const top   = cy - ARTIFACT_H / 2
  const bot   = cy + ARTIFACT_H / 2

  return (
    <g stroke="var(--cs-accent, #2f5c53)" strokeWidth="1.3" fill="none">
      {kind === 'tag' && (
        <>
          <line x1={left - 10} y1={cy} x2={left} y2={cy} strokeWidth="0.8" opacity="0.5" />
          <circle cx={left - 10} cy={cy} r="1.6" opacity="0.6" />
          <rect x={left} y={top} width={ARTIFACT_W} height={ARTIFACT_H} rx="3" opacity="0.75" />
          <circle cx={left + 7} cy={cy} r="2" opacity="0.55" fill="var(--cs-card-bg, #eef3f1)" />
          <line x1={left + 16} y1={cy - 4} x2={right - 6}  y2={cy - 4} strokeWidth="0.8" opacity="0.4" />
          <line x1={left + 16} y1={cy + 4} x2={right - 12} y2={cy + 4} strokeWidth="0.8" opacity="0.4" />
        </>
      )}
      {kind === 'ticket' && (
        <>
          <rect x={left} y={top} width={ARTIFACT_W} height={ARTIFACT_H} rx="2" opacity="0.75" />
          {[0, 1, 2].map((n) => (
            <circle
              key={n}
              cx={right}
              cy={top + 4 + n * 8}
              r="1.4"
              fill="var(--cs-card-bg, #eef3f1)"
              strokeWidth="0.8"
              opacity="0.5"
            />
          ))}
          <line x1={left + 6} y1={cy - 4} x2={right - 10} y2={cy - 4} strokeWidth="0.8" opacity="0.4" />
          <line x1={left + 6} y1={cy + 4} x2={right - 16} y2={cy + 4} strokeWidth="0.8" opacity="0.4" />
        </>
      )}
      {kind === 'barcode' && (
        <>
          <rect x={left} y={top} width={ARTIFACT_W} height={ARTIFACT_H} rx="2" opacity="0.5" />
          {[0, 1, 2, 3, 4, 5, 6].map((n) => (
            <line
              key={n}
              x1={left + 5 + n * 5.5}
              y1={top + 4}
              x2={left + 5 + n * 5.5}
              y2={bot - 4}
              strokeWidth={n % 2 === 0 ? 1.6 : 0.8}
              opacity="0.55"
            />
          ))}
        </>
      )}
      {kind === 'seam' && (
        <>
          <line x1={left} y1={cy}     x2={right} y2={cy}     strokeWidth="0.8" opacity="0.35" strokeDasharray="3 3" />
          <line x1={left} y1={cy - 6} x2={right} y2={cy - 6} strokeWidth="0.6" opacity="0.25" />
          <line x1={left} y1={cy + 6} x2={right} y2={cy + 6} strokeWidth="0.6" opacity="0.25" />
        </>
      )}
    </g>
  )
}

/** Smooth flowing curve through a sequence of points — no external spline lib. */
function threadPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const midX = (prev.x + curr.x) / 2
    d += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`
  }
  return d
}

/**
 * A continuous "thread" connecting ordered lifecycle stages — built to
 * communicate systems thinking before any UI is shown. Swap `stages` to
 * reuse this pattern in another case study; the composition, motion, and
 * texture stay identical.
 */
export default function LifecycleThread({ stages, aspectRatio = '5 / 2', className = '', origin }: LifecycleThreadProps) {
  const ref          = useRef<HTMLDivElement>(null)
  const inView       = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduceMotion = Boolean(useReducedMotion())
  const n            = stages.length

  const points = stages.map((_, i) => {
    const x = n === 1 ? VIEW_W / 2 : PAD_X + (i / (n - 1)) * (VIEW_W - PAD_X * 2)
    const y = VIEW_H / 2 + Math.sin((i / Math.max(n - 1, 1)) * Math.PI * 1.4) * AMPLITUDE
    return { x, y }
  })
  const pathD         = threadPath(points)
  const drawDuration  = reduceMotion ? 0.2 : 1.8
  // When an origin artifact is present, let it settle first so the thread
  // reads as emerging from it rather than both appearing at once.
  const originSettle  = reduceMotion ? 0 : 0.3
  const pathDelay     = origin ? originSettle : 0

  return (
    <div
      ref={ref}
      className={className}
      role="group"
      aria-label={`The order lifecycle, from ${stages[0]} to ${stages[stages.length - 1]}`}
      style={{
        position: 'relative',
        aspectRatio,
        borderRadius: 'var(--cs-radius-md)',
        overflow: 'hidden',
        background: 'var(--cs-card-bg, #eef3f1)',
      }}
    >
      {/* Textile texture — kept faint so it never competes with the thread or type */}
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id="cs-weave" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="var(--cs-accent, #2f5c53)" strokeWidth="0.4" opacity="0.3" />
            <line x1="0" y1="0" x2="7" y2="0" stroke="var(--cs-accent, #2f5c53)" strokeWidth="0.4" opacity="0.18" />
          </pattern>
          <linearGradient id="cs-fold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="var(--cs-ink)" stopOpacity="0.03" />
            <stop offset="45%"  stopColor="var(--cs-ink)" stopOpacity="0" />
            <stop offset="55%"  stopColor="var(--cs-ink)" stopOpacity="0.025" />
            <stop offset="100%" stopColor="var(--cs-ink)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#cs-weave)" />
        <rect width="100%" height="100%" fill="url(#cs-fold)" />
      </svg>

      {/* The thread — purely decorative; labels below carry the accessible content */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <motion.path
          d={pathD}
          fill="none"
          stroke="var(--cs-accent, #2f5c53)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: drawDuration, delay: pathDelay, ease: [0.22, 1, 0.36, 1] }}
        />
        {points.map((p, i) => {
          if (origin && i === 0) return null // the origin artifact replaces the plain node
          return (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="5"
              fill="var(--cs-card-bg, #eef3f1)"
              stroke="var(--cs-accent, #2f5c53)"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0.2 : 0.4,
                delay: pathDelay + (reduceMotion ? 0 : (i / Math.max(n - 1, 1)) * drawDuration * 0.85),
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )
        })}
        {origin && (
          <motion.g
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: reduceMotion ? 1 : 0.92 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${points[0].x}px ${points[0].y}px` }}
          >
            <OriginMotif kind={origin} point={points[0]} />
          </motion.g>
        )}
      </svg>

      {/* Stage labels — real text, in reading order, positioned along the thread */}
      <ol style={{ position: 'absolute', inset: 0, listStyle: 'none', margin: 0, padding: 0 }}>
        {stages.map((stage, i) => {
          const p       = points[i]
          const above   = i % 2 === 0
          const leftPct = (p.x / VIEW_W) * 100
          const topPct  = (p.y / VIEW_H) * 100
          return (
            <motion.li
              key={stage}
              style={{
                position:      'absolute',
                left:          `${leftPct}%`,
                top:           `${topPct}%`,
                transform:     `translate(-50%, ${above ? 'calc(-100% - 14px)' : '14px'})`,
                fontFamily:    'var(--font-body)',
                fontSize:      'clamp(9px, 1.3vw, 11px)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:         'var(--cs-text-muted)',
                textAlign:     'center',
                width:         '86px',
                lineHeight:    1.35,
              }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : (above ? 6 : -6) }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : (above ? 6 : -6) }}
              transition={{
                duration: reduceMotion ? 0.2 : 0.5,
                delay: pathDelay + (reduceMotion ? 0 : (i / Math.max(n - 1, 1)) * drawDuration * 0.85 + 0.1),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {stage}
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
