import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

interface NextProjectCTAProps {
  label:      string          // "Next case study →"
  title:      string
  href:       string
  bgColor?:   string          // dark card background
  textColor?: string
}

export default function NextProjectCTA({
  label,
  title,
  href,
  bgColor   = '#f2efe9',
  textColor = '#111110',
}: NextProjectCTAProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [20, -10])

  return (
    <Link to={href} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
      <motion.div
        ref={ref}
        style={{
          background:  bgColor,
          borderTop:   '0.5px solid rgba(17,17,16,0.09)',
          padding:     '5rem 4rem',
          display:     'flex',
          justifyContent: 'space-between',
          alignItems:  'center',
          flexWrap:    'wrap',
          gap:         '2rem',
          cursor:      'pointer',
        }}
        whileHover={{ backgroundColor: '#e8e4dc' }}
        transition={{ duration: 0.28 }}
      >
        <motion.div style={{ y }}>
          <div style={{
            fontFamily:    '"Instrument Sans", sans-serif',
            fontSize:      '0.62rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         `${textColor}70`,
            marginBottom:  '0.6rem',
          }}>
            {label}
          </div>
          <div style={{
            fontFamily:    '"Playfair Display", serif',
            fontSize:      'clamp(1.4rem, 2.5vw, 2rem)',
            letterSpacing: '-0.02em',
            lineHeight:    1.15,
            color:         textColor,
          }}>
            {title}
          </div>
        </motion.div>

        <motion.div
          style={{ fontSize: '1.8rem', color: `${textColor}60` }}
          whileHover={{ x: 6, color: textColor }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.div>
      </motion.div>
    </Link>
  )
}
