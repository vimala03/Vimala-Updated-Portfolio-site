import { ReactNode, useId, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

interface DisclosureProps {
  summary: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}

/**
 * Accessible show/hide panel — a real <button aria-expanded> controlling
 * a labelled region, animated height with framer-motion. Standalone
 * building block for FAQ-style or "read more" content; Accordion-style
 * groups compose this by rendering several with shared open-state logic
 * at the call site (kept out of this primitive on purpose — that's a
 * layout decision, not this component's job).
 */
export default function Disclosure({ summary, children, defaultOpen = false, className = '' }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const reduceMotion = useReducedMotion()

  return (
    <div className={className} style={{ borderBottom: '0.5px solid var(--color-border)' }}>
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1.25rem 0',
            background: 'transparent',
            border: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            font: 'inherit',
            color: 'var(--color-text)',
          }}
        >
          <span className="type-subheading">{summary}</span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            style={{ fontSize: '18px', flexShrink: 0, lineHeight: 1 }}
          >
            +
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="type-body" style={{ paddingBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
