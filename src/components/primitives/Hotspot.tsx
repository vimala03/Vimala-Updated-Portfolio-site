import { ReactNode, useId, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface HotspotProps {
  /** Position as a percentage of the containing (relatively-positioned) element. */
  x: number
  y: number
  label: string
  children: ReactNode
  className?: string
}

/**
 * An annotation marker on a screenshot/mockup — a real, labelled
 * <button> (not a positioned <div>) that toggles a popover on click
 * *and* on Enter/Space, closes on Escape or an outside click, and is
 * reachable by Tab like any other control. Multiple hotspots on one
 * image are just siblings; each manages its own open state.
 */
export default function Hotspot({ x, y, label, children, className = '' }: HotspotProps) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className={className}
      style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-popover`}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '28px',
          height: '28px',
          minWidth: '44px',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          border: '2px solid #fff',
          background: 'var(--color-accent)',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <span aria-hidden style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
          +
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={`${id}-popover`}
            role="dialog"
            aria-label={label}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 6 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'max-content',
              maxWidth: '260px',
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              padding: '14px 16px',
              zIndex: 20,
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              lineHeight: 1.5,
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
