import { useRef, ReactNode } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface AnimateInProps {
  children:  ReactNode
  className?: string
  delay?:    number
  /** Direction the element enters from. Default: 'up' */
  from?:     'up' | 'left' | 'right' | 'none'
  /** Distance in px for the enter translation. Default: 18 */
  distance?: number
}


export default function AnimateIn({
  children,
  className = '',
  delay = 0,
  from = 'up',
  distance = 18,
}: AnimateInProps) {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

//   const offset = OFFSET[from]
  const scaledOffset = from === 'up'    ? { y: distance }
                     : from === 'left'  ? { x: -distance }
                     : from === 'right' ? { x: distance }
                     : {}

  const variants: Variants = {
    hidden:  { opacity: 0, ...scaledOffset },
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
        duration: 0.55,
        delay:    delay / 1000,
        ease:     [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
