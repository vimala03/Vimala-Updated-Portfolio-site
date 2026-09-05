import { useState, useId } from 'react'

interface ComparisonSliderProps {
  beforeSrc: string
  beforeAlt: string
  afterSrc: string
  afterAlt: string
  /** Accessible name for the slider control, e.g. "Before and after comparison". */
  label: string
  aspectRatio?: string
  className?: string
}

/**
 * Before/after image comparison — replaces Cornerstone's current
 * hand-rolled drag slider (mousedown/mousemove/mouseup + touchstart/
 * touchmove/touchend listeners wired imperatively onto a plain div,
 * mouse/touch only). Built on a native `<input type="range">`: dragging
 * still works exactly the same, but Left/Right-arrow, Home/End, and
 * screen-reader operation come for free from the browser, and the
 * current position is announced ("62%") without any extra ARIA plumbing.
 * The two images are stacked and the top one is clipped with a CSS
 * `clip-path` driven by the same value — no layout thrash on drag.
 */
export default function ComparisonSlider({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  label,
  aspectRatio = '16 / 10',
  className = '',
}: ComparisonSliderProps) {
  const [value, setValue] = useState(50)
  const id = useId()

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Base layer — "after" */}
      <img
        src={afterSrc}
        alt={afterAlt}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Clipped top layer — "before", revealed left of the handle */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 ${100 - value}% 0 0)`,
        }}
      >
        <img
          src={beforeSrc}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Divider line, purely visual */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${value}%`,
          width: '2px',
          background: '#fff',
          transform: 'translateX(-1px)',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.15)',
        }}
      />

      {/* Real, labelled, keyboard-operable control */}
      <label htmlFor={id} className="sr-only" style={srOnly}>
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={label}
        aria-valuetext={`${value}% ${beforeAlt} showing`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          margin: 0,
          opacity: 0,
          cursor: 'ew-resize',
        }}
      />

      {/* Visual handle — purely decorative, follows the (invisible) range input */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: `${value}%`,
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          color: 'var(--color-text)',
          pointerEvents: 'none',
        }}
      >
        ↔
      </div>
    </div>
  )
}

const srOnly: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
}
