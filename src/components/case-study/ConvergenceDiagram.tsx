import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export type FragmentIcon = 'memory' | 'chat' | 'paper' | 'sheet' | 'person'

export interface ConvergenceFragment {
  id:    string
  label: string
  icon:  FragmentIcon
}

interface ConvergenceDiagramProps {
  /** Where the operational record currently lives, scattered — animates into one aligned row. */
  fragments:    ConvergenceFragment[]
  aspectRatio?: string
  className?:   string
}

const VIEW_W    = 900
const VIEW_H    = 380
const PAD_X     = 90
const ROW_Y     = 300
const SCATTER_X = 450
const SCATTER_Y = 140

// Hand-placed scatter offsets so the "before" state reads as genuine
// disorder rather than a repeating grid — cycles if there are more
// fragments than presets.
const SCATTER_OFFSETS = [
  { dx: -300, dy: -60, rot: -16 },
  { dx: -120, dy: 55,  rot: 11 },
  { dx: 40,   dy: -95, rot: -9 },
  { dx: 230,  dy: 40,  rot: 17 },
  { dx: 0,    dy: 115, rot: -7 },
  { dx: -240, dy: 120, rot: 13 },
]

const EASE = [0.22, 1, 0.36, 1] as const

function FragmentIconShape({ icon }: { icon: FragmentIcon }) {
  const common = { stroke: 'var(--cs-accent, #2f5c53)', strokeWidth: 1.3, fill: 'none' } as const
  switch (icon) {
    case 'memory':
      return (
        <g {...common}>
          <ellipse cx="0" cy="-4" rx="10" ry="7.5" />
          <circle cx="-11" cy="8" r="3" />
          <circle cx="-17" cy="14" r="1.8" />
        </g>
      )
    case 'chat':
      return (
        <g {...common}>
          <rect x="-14" y="-11" width="28" height="18" rx="6" />
          <path d="M -8 7 L -12 15 L -2 7 Z" />
        </g>
      )
    case 'paper':
      return (
        <g {...common}>
          <rect x="-12" y="-9" width="24" height="18" rx="1.5" />
          <line x1="-7" y1="-2" x2="7" y2="-2" strokeWidth="0.8" opacity="0.6" />
          <line x1="-7" y1="3" x2="4" y2="3" strokeWidth="0.8" opacity="0.6" />
        </g>
      )
    case 'sheet':
      return (
        <g {...common}>
          <rect x="-12" y="-10" width="24" height="20" rx="1.5" />
          <line x1="-4" y1="-10" x2="-4" y2="10" strokeWidth="0.8" opacity="0.6" />
          <line x1="4" y1="-10" x2="4" y2="10" strokeWidth="0.8" opacity="0.6" />
          <line x1="-12" y1="-2" x2="12" y2="-2" strokeWidth="0.8" opacity="0.6" />
          <line x1="-12" y1="4" x2="12" y2="4" strokeWidth="0.8" opacity="0.6" />
        </g>
      )
    case 'person':
      return (
        <g {...common}>
          <circle cx="0" cy="-9" r="5" />
          <path d="M -9 11 Q 0 -3 9 11" />
        </g>
      )
  }
}

/**
 * A single-trigger, reveal-on-scroll visual: fragments scattered across a
 * "before" zone animate into one evenly-spaced, connected row — a compact
 * metaphor for fragmented operational knowledge becoming a shared system.
 * Purely decorative (aria-hidden); real labels render as accessible text
 * beneath, so the metaphor never depends on the animation to be understood.
 */
export default function ConvergenceDiagram({ fragments, aspectRatio = '900 / 420', className = '' }: ConvergenceDiagramProps) {
  const ref          = useRef<HTMLDivElement>(null)
  const inView       = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduceMotion = Boolean(useReducedMotion())
  const n            = fragments.length

  const unifiedX = (i: number) => (n === 1 ? VIEW_W / 2 : PAD_X + (i / (n - 1)) * (VIEW_W - PAD_X * 2))

  const convergeDuration = reduceMotion ? 0.2 : 1.1
  const stagger          = reduceMotion ? 0 : 0.13
  const settleTime       = convergeDuration + (n - 1) * stagger
  const linesDelay       = settleTime + (reduceMotion ? 0 : 0.15)
  const frameDelay       = linesDelay + (reduceMotion ? 0 : 0.3)

  return (
    <div
      ref={ref}
      className={className}
      role="group"
      aria-label="Operational knowledge scattered across memory, WhatsApp, paper, and spreadsheets, converging into one shared system"
      style={{ position: 'relative', aspectRatio }}
    >
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        {/* Frame — settles in behind the unified row last, marking it as "one system" */}
        <motion.rect
          x={PAD_X - 28} y={ROW_Y - 28} width={VIEW_W - (PAD_X - 28) * 2} height={56}
          rx="10"
          fill="none"
          stroke="var(--cs-hairline)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.6, delay: frameDelay, ease: EASE }}
        />

        {/* Connecting chain — draws once every fragment has arrived */}
        {fragments.slice(1).map((f, i) => (
          <motion.line
            key={`link-${f.id}`}
            x1={unifiedX(i)} y1={ROW_Y} x2={unifiedX(i + 1)} y2={ROW_Y}
            stroke="var(--cs-accent, #2f5c53)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, delay: linesDelay + i * (reduceMotion ? 0 : 0.06), ease: EASE }}
          />
        ))}

        {/* Fragments — scattered, then converge into the row (or fade straight in, under reduced motion) */}
        {fragments.map((f, i) => {
          const offset = SCATTER_OFFSETS[i % SCATTER_OFFSETS.length]
          const from   = { x: SCATTER_X + offset.dx, y: SCATTER_Y + offset.dy, rotate: offset.rot }
          const to     = { x: unifiedX(i), y: ROW_Y, rotate: 0 }
          const start  = reduceMotion ? to : from

          return (
            <motion.g
              key={f.id}
              initial={{ ...start, opacity: 0 }}
              animate={inView ? { ...to, opacity: 1 } : { ...start, opacity: 0 }}
              transition={{ duration: convergeDuration, delay: i * stagger, ease: EASE }}
            >
              <circle r="19" fill="var(--cs-card-bg, #eef3f1)" stroke="var(--cs-hairline)" strokeWidth="1" />
              <FragmentIconShape icon={f.icon} />
            </motion.g>
          )
        })}
      </svg>

      {/* Real, accessible labels — always present, independent of animation state */}
      <ol style={{ position: 'absolute', inset: 0, listStyle: 'none', margin: 0, padding: 0 }}>
        {fragments.map((f, i) => {
          const leftPct = (unifiedX(i) / VIEW_W) * 100
          const topPct  = ((ROW_Y + 34) / VIEW_H) * 100
          return (
            <motion.li
              key={f.id}
              style={{
                position:      'absolute',
                left:          `${leftPct}%`,
                top:           `${topPct}%`,
                transform:     'translate(-50%, 0)',
                fontFamily:    'var(--font-body)',
                fontSize:      'clamp(8px, 1.2vw, 10px)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color:         'var(--cs-text-muted)',
                textAlign:     'center',
                width:         '92px',
                lineHeight:    1.35,
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.5, delay: settleTime + (reduceMotion ? 0 : 0.1), ease: EASE }}
            >
              {f.label}
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
