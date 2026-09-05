import { ReactNode, useId, useRef, useState, KeyboardEvent } from 'react'

export interface TabItem {
  id: string
  label: ReactNode
  panel: ReactNode
}

interface TabsProps {
  items: TabItem[]
  defaultTabId?: string
  className?: string
  /** Called whenever the active tab changes (click or arrow-key nav). */
  onChange?: (id: string) => void
}

/**
 * WAI-ARIA "Tabs (Automatic Activation)" pattern — replaces the
 * `document.querySelectorAll('.tab-panel')`/`classList` toggling in
 * Cornerstone's current raw-HTML block with real roving-tabindex
 * keyboard support (Left/Right/Home/End) and correct tab/tabpanel
 * semantics for screen readers.
 */
export default function Tabs({ items, defaultTabId, className = '', onChange }: TabsProps) {
  const baseId = useId()
  const [activeId, setActiveId] = useState(defaultTabId ?? items[0]?.id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  function activate(id: string) {
    setActiveId(id)
    onChange?.(id)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % items.length
    else if (e.key === 'ArrowLeft') nextIndex = (index - 1 + items.length) % items.length
    else if (e.key === 'Home') nextIndex = 0
    else if (e.key === 'End') nextIndex = items.length - 1
    if (nextIndex === null) return

    e.preventDefault()
    const next = items[nextIndex]
    activate(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <div className={className}>
      <div role="tablist" aria-orientation="horizontal" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {items.map((item, index) => {
          const selected = item.id === activeId
          return (
            <button
              key={item.id}
              ref={(el) => { tabRefs.current[item.id] = el }}
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => activate(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              type="button"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 500,
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill, 999px)',
                border: '1px solid var(--color-border)',
                background: selected ? 'var(--color-text)' : 'transparent',
                color: selected ? '#fff' : 'var(--color-text-muted)',
                cursor: 'pointer',
                transition: 'background var(--duration-fast) ease, color var(--duration-fast) ease',
              }}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== activeId}
          tabIndex={0}
        >
          {item.panel}
        </div>
      ))}
    </div>
  )
}
