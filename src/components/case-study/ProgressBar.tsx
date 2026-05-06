import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface ProgressBarProps {
  color?: string
}

export default function ProgressBar({ color = '#1a4f8a' }: ProgressBarProps) {
  const raw    = useMotionValue(0)
  const smooth = useSpring(raw, { stiffness: 160, damping: 36 })
  const scaleX = useTransform(smooth, [0, 100], [0, 1])

  useEffect(() => {
    function onScroll() {
      const el  = document.documentElement
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight)
      raw.set(pct * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [raw])

  return (
    <motion.div
      className="pointer-events-none"
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        width:           '100%',
        height:          '2px',
        background:      color,
        zIndex:          9999,
        transformOrigin: 'left center',
        scaleX,
      }}
    />
  )
}
