import { useRef, ReactNode } from 'react'
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion'

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
  const ref            = useRef<HTMLDivElement>(null)
  const inView         = useInView(ref, { once, margin: '0px 0px -8% 0px' })
  const reduceMotion   = useReducedMotion()

  // Reduced motion: keep the fade (harmless), drop the travel distance that
  // causes vestibular discomfort, and settle near-instantly.
  const offset = reduceMotion ? { x: 0, y: 0 }
               : from === 'up'    ? { y: distance, x: 0 }
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
      transition={{
        duration: reduceMotion ? 0.2 : 0.6,
        delay: reduceMotion ? 0 : delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
