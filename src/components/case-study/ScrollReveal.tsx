import { useRef, ReactNode } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface ScrollRevealProps {
  children:   ReactNode
  className?: string
  delay?:     number
  from?:      'up' | 'left' | 'right' | 'none'
  distance?:  number
  once?:      boolean
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  from = 'up',
  distance = 24,
  once = true,
}: ScrollRevealProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '0px 0px -8% 0px' })

  const offset = from === 'up'    ? { y: distance, x: 0 }
               : from === 'left'  ? { x: -distance, y: 0 }
               : from === 'right' ? { x: distance, y: 0 }
               : { x: 0, y: 0 }

  const variants: Variants = {
    hidden:  { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
