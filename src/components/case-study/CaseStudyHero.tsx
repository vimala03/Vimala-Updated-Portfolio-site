import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface MetaItem {
  label: string
  value: string
}

interface Tag {
  label: string
  variant?: 'dark' | 'blue' | 'default'
}

interface CaseStudyHeroProps {
  tags:        Tag[]
  title:       string
  titleEm?:    string       // italicised portion at end of title
  subtitle:    string
  meta:        MetaItem[]
  image?:      string       // hero image path (optional)
  imageAlt?:   string
  accentColor?: string      // progress bar / accent (default: #1a4f8a)
}

const TAG_STYLES: Record<NonNullable<Tag['variant']>, React.CSSProperties> = {
  dark:    { background: '#111110', color: '#fff', borderColor: '#111110' },
  blue:    { background: '#e8f0fa', color: '#1a4f8a', borderColor: 'rgba(26,79,138,0.2)' },
  default: { background: '#f2efe9', color: '#5a5954', borderColor: 'rgba(17,17,16,0.09)' },
}

export default function CaseStudyHero({
  tags, title, titleEm, subtitle, meta, image, imageAlt,
//   accentColor = '#1a4f8a',
}: CaseStudyHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Subtle parallax on the hero visual
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  const staggerDelay = (i: number) => i * 0.07

  return (
    <div ref={ref} className="overflow-hidden">
      {/* Tags row */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-8"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {tags.map((tag, i) => (
          <motion.span
            key={tag.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: staggerDelay(i) + 0.05 }}
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border: '0.5px solid',
              padding: '0.22rem 0.7rem',
              borderRadius: '999px',
              fontFamily: 'var(--font-instrument, "Instrument Sans", sans-serif)',
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
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
          lineHeight: 1.04,
          letterSpacing: '-0.025em',
          fontWeight: 500,
          textAlign: 'center',
          color: '#111110',
          marginBottom: '1.25rem',
        }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
        {titleEm && (
          <em style={{ fontStyle: 'italic', color: '#5a5954' }}> {titleEm}</em>
        )}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        style={{
          fontFamily: '"Instrument Sans", sans-serif',
          fontSize: '0.92rem',
          color: '#5a5954',
          lineHeight: 1.8,
          maxWidth: '60ch',
          margin: '0 auto 2.5rem',
          textAlign: 'center',
        }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        {subtitle}
      </motion.p>

      {/* Meta strip */}
      <motion.div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          border: '0.5px solid rgba(17,17,16,0.09)',
          borderRadius: '14px',
          overflow: 'hidden',
          background: 'rgba(17,17,16,0.04)',
          maxWidth: '760px',
          margin: '0 auto 0',
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
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
              borderRight: i < meta.length - 1 ? '0.5px solid rgba(17,17,16,0.07)' : 'none',
            }}
          >
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.11em', textTransform: 'uppercase', color: '#a09d97', marginBottom: '0.3rem', fontFamily: '"Instrument Sans", sans-serif' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#111110', fontFamily: '"Instrument Sans", sans-serif' }}>
              {item.value}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Hero image with parallax */}
      {image && (
        <motion.div
          style={{
            marginTop: '3rem',
            overflow: 'hidden',
            borderRadius: '12px 12px 0 0',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={image}
            alt={imageAlt ?? ''}
            style={{
              width: '100%',
              display: 'block',
              y: imgY,
            }}
          />
        </motion.div>
      )}
    </div>
  )
}
