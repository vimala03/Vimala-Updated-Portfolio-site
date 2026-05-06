import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', parallax ? '10%' : '0%'])

  return (
    <ScrollReveal className={className}>
      <div
        ref={ref}
        style={{
          overflow: 'hidden',
          borderRadius: rounded ? '12px' : 0,
          border: '0.5px solid rgba(17,17,16,0.07)',
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
          initial={{ scale: 1.02 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        />
      </div>
      {caption && (
        <p style={{
          fontFamily: '"Instrument Sans", sans-serif',
          fontSize: '0.72rem',
          letterSpacing: '0.04em',
          color: '#a09d97',
          marginTop: '0.75rem',
          textAlign: 'center',
        }}>
          {caption}
        </p>
      )}
    </ScrollReveal>
  )
}
