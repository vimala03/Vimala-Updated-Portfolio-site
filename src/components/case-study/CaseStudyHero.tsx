import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

interface MetaItem {
  label: string
  value: string
}

interface Tag {
  label: string
  variant?: 'dark' | 'blue' | 'default'
}

interface CaseStudyHeroProps {
  tags:      Tag[]
  title:     string
  titleEm?:  string       // italicised portion at end of title
  subtitle:  string
  meta:      MetaItem[]
  image?:    string       // hero image path — takes priority over `visual`
  imageAlt?: string
  visual?:   ReactNode    // custom hero visual (e.g. LifecycleThread) — used when no `image` is set
  /**
   * 'centered' (default) preserves the original stacked/centered composition
   * used by every existing case study. 'editorial' is an opt-in asymmetric
   * layout — kicker + left-aligned title/subtitle beside a colophon-style
   * metadata rail — for case studies that want a more considered opening.
   */
  layout?:       'centered' | 'editorial'
  kicker?:       string   // editorial layout only — falls back to tags joined with " · "
  chapterIndex?: string   // editorial layout only, e.g. "00"
}

const TAG_STYLES: Record<NonNullable<Tag['variant']>, React.CSSProperties> = {
  dark:    { background: 'var(--cs-ink)', color: '#fff', borderColor: 'var(--cs-ink)' },
  blue:    { background: '#e8f0fa', color: '#1a4f8a', borderColor: 'rgba(26,79,138,0.2)' },
  default: { background: 'var(--cs-card-bg, #f2efe9)', color: 'var(--cs-text-muted)', borderColor: 'var(--cs-hairline)' },
}

/**
 * Themed abstract placeholder shown until a real hero photo/screenshot is
 * commissioned. Colors derive entirely from the active .theme-* class via
 * --cs-accent / --cs-card-bg, so every case study gets a matching visual
 * for free — nothing to configure per page.
 */
function HeroPlaceholder({ reduceMotion }: { reduceMotion: boolean }) {
  const nodes: [number, number][] = [[20, 140], [110, 90], [200, 120], [290, 60], [380, 100]]

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        aspectRatio: '21 / 9',
        borderRadius: 'var(--cs-radius-md)',
        overflow: 'hidden',
        background: `
          radial-gradient(120% 140% at 15% 0%, color-mix(in srgb, var(--cs-accent, #2f5c53) 22%, transparent) 0%, transparent 55%),
          radial-gradient(100% 120% at 85% 100%, color-mix(in srgb, var(--cs-accent, #2f5c53) 14%, transparent) 0%, transparent 60%),
          var(--cs-card-bg, #eef3f1)
        `,
      }}
    >
      {/* Fine grain — keeps the gradient from looking flat/digital */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3, mixBlendMode: 'overlay' }}>
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      {/* Connected-nodes motif — a quiet nod to "the system underneath" */}
      <svg viewBox="0 0 400 180" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path
          d={`M${nodes.map(([x, y]) => `${x} ${y}`).join(' L')}`}
          stroke="var(--cs-accent, #2f5c53)"
          strokeWidth="0.75"
          opacity="0.45"
          fill="none"
        />
        {nodes.map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill="var(--cs-accent, #2f5c53)"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0 }}
            animate={{ opacity: 0.75, scale: 1 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, delay: reduceMotion ? 0 : 0.4 + i * 0.08 }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function CaseStudyHero({
  tags, title, titleEm, subtitle, meta, image, imageAlt, visual,
  layout = 'centered', kicker, chapterIndex,
}: CaseStudyHeroProps) {
  const ref          = useRef<HTMLDivElement>(null)
  const reduceMotion = Boolean(useReducedMotion())
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Subtle parallax on the hero visual — disabled under reduced motion
  const imgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['0%', '14%'])

  const staggerDelay = (i: number) => (reduceMotion ? 0 : i * 0.07)
  const riseY        = (distance: number) => (reduceMotion ? 0 : distance)

  const isEditorial = layout === 'editorial'
  const kickerText  = kicker ?? tags.map((t) => t.label).join('  ·  ')

  return (
    <div ref={ref} className="overflow-hidden">
      {isEditorial ? (
        <>
          {/* Kicker row — replaces pill tags with a quieter, editorial mark */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: riseY(10) }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, delay: reduceMotion ? 0 : 0.05 }}
          >
            {chapterIndex && (
              <>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.66rem', letterSpacing: '0.12em', color: 'var(--cs-text-muted)' }}>
                  {chapterIndex}
                </span>
                <span style={{ width: '1px', height: '0.7em', background: 'var(--cs-hairline)', display: 'inline-block' }} />
              </>
            )}
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cs-text-muted)' }}>
              {kickerText}
            </span>
          </motion.div>

          <motion.div
            style={{ height: '1px', background: 'var(--cs-hairline)', marginBottom: '3.5rem', transformOrigin: 'left' }}
            initial={{ scaleX: reduceMotion ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.7, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Asymmetric grid — title/subtitle beside a colophon-style meta rail */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-20 items-start">
            <div>
              <motion.h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.6rem, 5.5vw, 4.6rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                  fontWeight: 500,
                  textAlign: 'left',
                  color: 'var(--cs-ink)',
                  marginBottom: '1.5rem',
                }}
                initial={{ opacity: 0, y: riseY(18) }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.25 : 0.65, delay: reduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
              >
                {title}
                {titleEm && (
                  <em style={{ fontStyle: 'italic', color: 'var(--cs-text-muted)' }}> {titleEm}</em>
                )}
              </motion.h1>

              <motion.p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--cs-text-muted)',
                  lineHeight: 1.8,
                  maxWidth: '52ch',
                  textAlign: 'left',
                }}
                initial={{ opacity: 0, y: riseY(14) }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.55, delay: reduceMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
              >
                {subtitle}
              </motion.p>
            </div>

            {/* Colophon — quiet label/value rail, no boxes or backgrounds */}
            <div>
              {meta.map((item, i) => (
                <motion.div
                  key={item.label}
                  style={{
                    padding: '0.9rem 0',
                    borderTop: i > 0 ? '0.5px solid var(--cs-hairline-soft)' : 'none',
                  }}
                  initial={{ opacity: 0, y: riseY(10) }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0.2 : 0.5, delay: staggerDelay(i) + (reduceMotion ? 0 : 0.36), ease: [0.22, 1, 0.36, 1] }}
                >
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--cs-text-muted)', marginBottom: '0.35rem' }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 500, color: 'var(--cs-ink)' }}>
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Tags row */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0, y: riseY(14) }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, delay: reduceMotion ? 0 : 0.05 }}
          >
            {tags.map((tag, i) => (
              <motion.span
                key={tag.label}
                initial={{ opacity: 0, y: riseY(8) }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.4, delay: staggerDelay(i) + (reduceMotion ? 0 : 0.05) }}
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: '0.5px solid',
                  padding: '0.22rem 0.7rem',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-body)',
                  ...TAG_STYLES[tag.variant ?? 'default'],
                }}
              >
                {tag.label}
              </motion.span>
            ))}
          </motion.div>

          {/* H1 */}
          <motion.h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              fontWeight: 500,
              textAlign: 'center',
              color: 'var(--cs-ink)',
              marginBottom: '1.25rem',
            }}
            initial={{ opacity: 0, y: riseY(18) }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.25 : 0.65, delay: reduceMotion ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
            {titleEm && (
              <em style={{ fontStyle: 'italic', color: 'var(--cs-text-muted)' }}> {titleEm}</em>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              color: 'var(--cs-text-muted)',
              lineHeight: 1.8,
              maxWidth: '60ch',
              margin: '0 auto 2.5rem',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: riseY(14) }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.55, delay: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtitle}
          </motion.p>

          {/* Meta strip */}
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              border: '0.5px solid var(--cs-hairline)',
              borderRadius: 'var(--cs-radius-lg)',
              overflow: 'hidden',
              background: 'rgba(17,17,16,0.04)',
              maxWidth: '760px',
              margin: '0 auto 0',
            }}
            initial={{ opacity: 0, y: riseY(12) }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.55, delay: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            {meta.map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  padding: '1.1rem 1.75rem',
                  textAlign: 'center',
                  flex: 1,
                  minWidth: '120px',
                  borderRight: i < meta.length - 1 ? '0.5px solid var(--cs-hairline-soft)' : 'none',
                }}
              >
                <div style={{ fontSize: '0.58rem', letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--cs-text-muted)', marginBottom: '0.3rem', fontFamily: 'var(--font-body)' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--cs-ink)', fontFamily: 'var(--font-body)' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </motion.div>
        </>
      )}

      {/* Hero visual — real image, custom visual (e.g. LifecycleThread), or themed placeholder */}
      <motion.div
        style={{
          marginTop: '3rem',
          overflow: 'hidden',
          borderRadius: 'var(--cs-radius-md) var(--cs-radius-md) 0 0',
        }}
        initial={{ opacity: 0, y: riseY(20) }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.25 : 0.7, delay: reduceMotion ? 0 : 0.44, ease: [0.22, 1, 0.36, 1] }}
      >
        {image ? (
          <motion.img
            src={image}
            alt={imageAlt ?? ''}
            style={{ width: '100%', display: 'block', y: imgY }}
          />
        ) : visual ? (
          visual
        ) : (
          <HeroPlaceholder reduceMotion={reduceMotion} />
        )}
      </motion.div>
    </div>
  )
}
