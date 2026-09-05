import { ReactNode, useRef, useState, useEffect, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

interface HorizontalScrollerProps {
  children: ReactNode
  className?: string
  /** Accessible name for the scrolling region, e.g. "Screenshot gallery". */
  label: string
}

/**
 * A horizontally-scrolling row (gallery, filmstrip, card rail) with real
 * Previous/Next <button>s, native scroll-snap, and full keyboard support:
 * the region itself is focusable and Left/Right-arrow scrolls it, so
 * touch/trackpad/mouse-wheel and keyboard all work without any custom
 * drag-tracking code (the pattern Cornerstone's current comparison
 * slider hand-rolls with mousedown/mousemove/mouseup listeners).
 */
export default function HorizontalScroller({ children, className = '', label }: HorizontalScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const reduceMotion = useReducedMotion()

  const updateEdges = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateEdges()
    el.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      el.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [updateEdges])

  function scrollByStep(direction: 1 | -1) {
    const el = trackRef.current
    if (!el) return
    const step = el.clientWidth * 0.85
    el.scrollBy({ left: step * direction, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className={className} style={{ position: 'relative' }}>
      <div
        ref={trackRef}
        role="group"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); scrollByStep(1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByStep(-1) }
        }}
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          scrollSnapType: 'x proximity',
          scrollBehavior: reduceMotion ? 'auto' : 'smooth',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '4px',
        }}
      >
        {children}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
        <button
          type="button"
          aria-label={`Scroll ${label} left`}
          disabled={atStart}
          onClick={() => scrollByStep(-1)}
          style={navButtonStyle(atStart)}
        >
          ←
        </button>
        <button
          type="button"
          aria-label={`Scroll ${label} right`}
          disabled={atEnd}
          onClick={() => scrollByStep(1)}
          style={navButtonStyle(atEnd)}
        >
          →
        </button>
      </div>
    </div>
  )
}

function navButtonStyle(disabled: boolean): React.CSSProperties {
  return {
    width: '40px',
    height: '40px',
    minWidth: '44px',
    minHeight: '44px',
    borderRadius: '50%',
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface)',
    color: disabled ? 'var(--color-text-faint)' : 'var(--color-text)',
    cursor: disabled ? 'default' : 'pointer',
    fontSize: '15px',
    opacity: disabled ? 0.4 : 1,
    transition: 'opacity var(--duration-fast) ease',
  }
}
