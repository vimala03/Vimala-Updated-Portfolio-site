import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

interface ImageBlockProps {
  src:          string
  alt:          string
  caption?:     string
  parallax?:    boolean       // subtle parallax on scroll (default false — use sparingly)
  rounded?:     boolean
  aspectRatio?: string        // e.g. '16/9', '4/3' (default: auto)
  className?:   string
}

export default function ImageBlock({
  src, alt, caption, parallax = false, rounded = true, aspectRatio, className = '',
}: ImageBlockProps) {
  const ref          = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', parallax && !reduceMotion ? '10%' : '0%'])

  return (
    <ScrollReveal className={className}>
      <div
        ref={ref}
        style={{
          overflow: 'hidden',
          borderRadius: rounded ? 'var(--cs-radius-md)' : 0,
          border: '0.5px solid var(--cs-hairline-soft)',
          aspectRatio: aspectRatio ?? 'auto',
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: aspectRatio ? '100%' : 'auto',
            objectFit: aspectRatio ? 'cover' : 'contain',
            display: 'block',
            y: imgY,
          }}
          initial={{ scale: reduceMotion ? 1 : 1.02 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        />
      </div>
      {caption && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          letterSpacing: '0.04em',
          color: 'var(--cs-text-muted)',
          marginTop: '0.75rem',
          textAlign: 'center',
        }}>
          {caption}
        </p>
      )}
    </ScrollReveal>
  )
}
