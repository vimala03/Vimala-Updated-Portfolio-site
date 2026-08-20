import { motion } from 'framer-motion'

export type ArtifactShape = 'tag' | 'care-tag' | 'receipt' | 'barcode' | 'note'

export interface StoryArtifact {
  id:              string
  shape:           ArtifactShape
  physicalLabel:   string
  structuredLabel: string
  /** Position as a percentage of the composition, anchored at the artifact's own center. */
  x:               number
  y:               number
  /** Flat-lay tilt in degrees — settles to 0 once revealed. */
  rotate:          number
  /** Stacking order for the overlapping flat-lay look. */
  z?:              number
}

interface ArtifactCompositionProps {
  artifacts:   StoryArtifact[]
  revealedIds: Set<string>
  reduceMotion: boolean
  className?:  string
}

const EASE = [0.22, 1, 0.36, 1] as const
const PAPER = 'var(--cs-bg, #faf9f6)'

const SIZES: Record<ArtifactShape, { w: number; h: number }> = {
  'tag':      { w: 76, h: 46 },
  'care-tag': { w: 42, h: 72 },
  'receipt':  { w: 56, h: 88 },
  'barcode':  { w: 68, h: 42 },
  'note':     { w: 72, h: 62 },
}

/** Decorative texture/detail unique to each artifact's *physical* state. Fades away on reveal. */
function PhysicalDetail({ shape }: { shape: ArtifactShape }) {
  const stroke = { stroke: 'var(--cs-accent, #2f5c53)', fill: 'none' } as const

  switch (shape) {
    case 'tag':
      return (
        <svg viewBox="0 0 76 46" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <line x1="-10" y1="0" x2="10" y2="18" strokeWidth="0.8" opacity="0.4" {...stroke} />
          <circle cx="12" cy="20" r="3.2" opacity="0.55" {...stroke} strokeWidth="1" />
          <line x1="26" y1="16" x2="62" y2="16" strokeWidth="0.7" opacity="0.35" {...stroke} />
          <line x1="26" y1="24" x2="52" y2="24" strokeWidth="0.7" opacity="0.35" {...stroke} />
          <line x1="26" y1="32" x2="58" y2="32" strokeWidth="0.7" opacity="0.35" {...stroke} />
        </svg>
      )
    case 'care-tag':
      return (
        <svg viewBox="0 0 42 72" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle cx="21" cy="20" r="7" opacity="0.5" {...stroke} strokeWidth="1" />
          <path d="M 21 34 L 30 48 L 12 48 Z" opacity="0.5" {...stroke} strokeWidth="1" />
          <line x1="10" y1="58" x2="32" y2="58" strokeWidth="0.7" opacity="0.4" {...stroke} />
          <line x1="10" y1="63" x2="26" y2="63" strokeWidth="0.7" opacity="0.4" {...stroke} />
        </svg>
      )
    case 'receipt':
      return (
        <svg viewBox="0 0 56 88" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {[14, 22, 30, 38, 46, 54, 62].map((y, i) => (
            <line key={i} x1="8" y1={y} x2={i % 2 === 0 ? 48 : 38} y2={y} strokeWidth="0.7" opacity="0.35" {...stroke} />
          ))}
        </svg>
      )
    case 'barcode':
      return (
        <svg viewBox="0 0 68 42" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {[6, 11, 14, 19, 24, 27, 32, 37, 42, 47, 52, 57, 62].map((x, i) => (
            <line
              key={i}
              x1={x} y1="8" x2={x} y2="34"
              strokeWidth={i % 3 === 0 ? 1.6 : 0.9}
              opacity="0.55"
              {...stroke}
            />
          ))}
        </svg>
      )
    case 'note':
      return (
        <svg viewBox="0 0 72 62" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M 12 20 Q 22 14, 32 20 T 58 19" strokeWidth="0.9" opacity="0.45" {...stroke} />
          <path d="M 12 32 Q 24 27, 36 32 T 60 31" strokeWidth="0.9" opacity="0.45" {...stroke} />
          <path d="M 12 44 Q 20 40, 30 44 T 48 43" strokeWidth="0.9" opacity="0.45" {...stroke} />
        </svg>
      )
  }
}

function ArtifactCard({
  artifact, revealed, reduceMotion,
}: {
  artifact:     StoryArtifact
  revealed:     boolean
  reduceMotion: boolean
}) {
  const { shape, physicalLabel, structuredLabel, x, y, rotate, z = 1 } = artifact
  const { w, h } = SIZES[shape]
  const tilt = reduceMotion ? 0 : rotate

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}px`,
        height: `${h}px`,
        zIndex: z,
        transformOrigin: 'center',
      }}
      initial={{ x: '-50%', y: '-50%', rotate: tilt }}
      animate={{ x: '-50%', y: '-50%', rotate: revealed ? 0 : tilt }}
      transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: EASE }}
    >
      {/* Card surface */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: shape === 'care-tag' || shape === 'receipt' ? '3px' : '6px',
          background: PAPER,
        }}
        animate={{
          boxShadow: revealed
            ? '0 1px 2px rgba(17,17,16,0.06)'
            : '0 6px 16px rgba(17,17,16,0.12), 0 1px 2px rgba(17,17,16,0.08)',
          border: revealed ? '0.5px solid var(--cs-hairline)' : '0.5px solid var(--cs-hairline)',
        }}
        transition={{ duration: reduceMotion ? 0.2 : 0.6, ease: EASE }}
      />

      {/* Physical texture — fades out on reveal */}
      <motion.div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0 }}
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
      >
        <PhysicalDetail shape={shape} />
      </motion.div>

      {/* Label — crossfades from the physical name to the structured one */}
      <div style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '0.6rem',
        width: '110px',
        textAlign: 'center',
      }}>
        <div style={{ position: 'relative', height: '2.4em' }}>
          <motion.span
            style={{
              position: 'absolute', inset: 0,
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--cs-text-muted)',
            }}
            animate={{ opacity: revealed ? 0 : 0.85 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.4, ease: EASE }}
          >
            {physicalLabel}
          </motion.span>
          <motion.span
            style={{
              position: 'absolute', inset: 0,
              fontFamily: 'var(--font-body)',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--cs-accent, #2f5c53)',
            }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.4, delay: reduceMotion ? 0 : 0.15, ease: EASE }}
          >
            {structuredLabel}
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * A flat-lay composition of real operational artifacts that individually
 * settle from a "just set down" physical state into a flat, structured one
 * as `revealedIds` grows. Content-agnostic — reused by passing a different
 * `artifacts` list (shape, labels, position, tilt) for another case study.
 * Purely decorative (aria-hidden internally); the outer wrapper carries one
 * accessible summary so the metaphor never depends on the animation.
 */
export default function ArtifactComposition({ artifacts, revealedIds, reduceMotion, className = '' }: ArtifactCompositionProps) {
  const summary = artifacts.map((a) => `${a.physicalLabel} becoming ${a.structuredLabel}`).join('; ')

  return (
    <div
      className={className}
      role="img"
      aria-label={`A physical order's paper trail — ${summary}`}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {artifacts.map((artifact) => (
        <ArtifactCard
          key={artifact.id}
          artifact={artifact}
          revealed={revealedIds.has(artifact.id)}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  )
}
