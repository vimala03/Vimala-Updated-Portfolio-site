import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export interface ProgressNavItem {
  id: string      // must match the target section's element id
  label: string
}

interface ProgressNavigationProps {
  items: ProgressNavItem[]
  className?: string
  /** Accessible name for the nav landmark. */
  label?: string
}

/**
 * Sticky in-page section nav — replaces Cornerstone's current
 * `document.querySelectorAll('.sb-scene')`/`classList.toggle('active', …)`
 * scrollytelling wiring with a declarative IntersectionObserver and real
 * <nav><a href="#section-id"> links. Each link is a genuine same-page
 * anchor (works with JS disabled, keyboard-focusable, screen-reader
 * "current page" semantics via aria-current), and the active item
 * updates itself as sections cross the viewport — no manual class
 * juggling at every scroll tick.
 */
export default function ProgressNavigation({ items, className = '', label = 'Section navigation' }: ProgressNavigationProps) {
  const [activeId, setActiveId] = useState(items[0]?.id)
  const reduceMotion = useReducedMotion()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    elements.forEach((el) => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [items])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    // Keep the URL hash in sync without an extra history entry per click.
    history.replaceState(null, '', `#${id}`)
    setActiveId(id)
  }

  return (
    <nav aria-label={label} className={className}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? 'true' : undefined}
                onClick={(e) => handleClick(e, item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  color: active ? 'var(--color-text)' : 'var(--color-text-faint)',
                  fontWeight: active ? 600 : 400,
                  transition: 'color var(--duration-fast) ease',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: active ? 'var(--color-accent)' : 'var(--color-border)',
                    flexShrink: 0,
                    transition: 'background var(--duration-fast) ease',
                  }}
                />
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
