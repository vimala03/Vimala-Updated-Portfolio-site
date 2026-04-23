import { useRef, useState } from 'react'

/* ─── Rotating badge text ─── */
function RotatingBadge() {
  const text = 'Available for work · Open to opportunities · Let\'s connect · '
  // removed unused chars
  const radius = 56

  return (
    <div
      style={{
        width: `${radius * 2 + 24}px`,
        height: `${radius * 2 + 24}px`,
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <svg
        width={radius * 2 + 24}
        height={radius * 2 + 24}
        viewBox={`0 0 ${radius * 2 + 24} ${radius * 2 + 24}`}
        style={{ animation: 'spin-slow 18s linear infinite' }}
      >
        <defs>
          <path
            id="circlePath"
            d={`M ${radius + 12} ${radius + 12} m -${radius} 0 a ${radius} ${radius} 0 1 1 ${radius * 2} 0 a ${radius} ${radius} 0 1 1 -${radius * 2} 0`}
          />
        </defs>
        <text
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '9.5px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fill: 'rgba(24,24,27,0.45)',
          }}
        >
          <textPath href="#circlePath">{text}</textPath>
        </text>
      </svg>

      {/* Center dot */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#18181b',
        }}
      />
    </div>
  )
}

/* ─── Word-hover heading ─── */
function PlayfulHeading() {
  const words = ['Let\'s', 'make', 'something', 'great.']
  const [hoveredWord, setHoveredWord] = useState<number | null>(null)

  return (
    <h2
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(48px, 6vw, 80px)',
        fontWeight: 500,
        lineHeight: 1.08,
        letterSpacing: '-0.02em',
        color: '#18181b',
        margin: 0,
        userSelect: 'none',
      }}
    >
      {words.map((word, i) => (
        <span
          key={word}
          onMouseEnter={() => setHoveredWord(i)}
          onMouseLeave={() => setHoveredWord(null)}
          style={{
            display: 'inline-block',
            marginRight: '0.25em',
            color:
              hoveredWord === i
                ? '#18181b'
                : hoveredWord !== null
                ? 'rgba(24,24,27,0.22)'
                : '#18181b',
            transform: hoveredWord === i ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'color 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
            cursor: 'default',
          }}
        >
          {i === 2 ? <em style={{ fontStyle: 'italic' }}>{word}</em> : word}
        </span>
      ))}
    </h2>
  )
}

/* ─── Magnetic button ─── */
function MagneticButton({
  href,
  children,
  variant = 'dark',
}: {
  href: string
  children: React.ReactNode
  variant?: 'dark' | 'outline'
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    setOffset({
      x: (e.clientX - cx) * 0.28,
      y: (e.clientY - cy) * 0.28,
    })
  }

  const handleLeave = () => setOffset({ x: 0, y: 0 })

  const isDark = variant === 'dark'

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 28px',
        borderRadius: '999px',
        background: isDark ? '#18181b' : 'transparent',
        border: isDark ? 'none' : '1.5px solid rgba(24,24,27,0.2)',
        color: isDark ? '#ffffff' : 'rgba(24,24,27,0.7)',
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        textDecoration: 'none',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease, border-color 0.25s ease',
        boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.16)' : 'none',
        cursor: 'pointer',
        willChange: 'transform',
      }}
      onMouseEnter={(e) => {
        if (!isDark) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(24,24,27,0.4)'
      }}
    >
      {children}
    </a>
  )
}

/* ─── Floating emoji ornaments ─── */
const ornaments = [
  { emoji: '✦', delay: '0s',  top: '20%', left: '8%',  size: '18px', duration: '6s'  },
  { emoji: '◆', delay: '1.2s', top: '60%', left: '15%', size: '12px', duration: '8s'  },
  { emoji: '✦', delay: '2.5s', top: '35%', left: '88%', size: '14px', duration: '7s'  },
  { emoji: '◇', delay: '0.8s', top: '75%', left: '82%', size: '10px', duration: '9s'  },
  { emoji: '·',  delay: '3s',   top: '15%', left: '55%', size: '22px', duration: '5s'  },
]

export default function PlayfulBottom() {
  return (
    <section
      className="bg-[#fafaf9]"
      style={{
        paddingTop: 'clamp(56px, 8vw, 96px)',
        paddingBottom: 'clamp(56px, 8vw, 96px)',
        borderTop: '1px solid rgba(24,24,27,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes float-bob {
          0%, 100% { transform: translateY(0px); opacity: 0.35; }
          50% { transform: translateY(-12px); opacity: 0.65; }
        }
      `}</style>

      {/* Floating ornaments */}
      {ornaments.map((o, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: 'absolute',
            top: o.top,
            left: o.left,
            fontSize: o.size,
            color: 'rgba(24,24,27,0.15)',
            animation: `float-bob ${o.duration} ${o.delay} ease-in-out infinite`,
            pointerEvents: 'none',
            userSelect: 'none',
            fontFamily: 'monospace',
          }}
        >
          {o.emoji}
        </div>
      ))}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        <div className="px-0 lg:px-[91px]">

          {/* Top row: rotating badge + subtitle — stacks on mobile */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '24px', marginBottom: '48px' }}>
            <RotatingBadge />
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: 'rgba(24,24,27,0.38)',
                lineHeight: 1.6,
                maxWidth: '260px',
                margin: 0,
              }}
            >
              Based in Hyderabad · Open to remote, hybrid, and relocation.
            </p>
          </div>

          {/* Main heading */}
          <PlayfulHeading />

          {/* Subtext + buttons row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '32px',
              marginTop: '40px',
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                color: 'rgba(24,24,27,0.45)',
                lineHeight: 1.7,
                maxWidth: '380px',
                margin: 0,
              }}
            >
              I'm looking for meaningful product design work — teams building things that matter, with people who care about the craft.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <MagneticButton href="mailto:vimala.banavath@gmail.com" variant="dark">
                Say hello →
              </MagneticButton>
              <MagneticButton href="/resume.pdf" variant="outline">
                View résumé ↗
              </MagneticButton>
            </div>
          </div>

          {/* Thin divider */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(24,24,27,0.1) 30%, rgba(24,24,27,0.1) 70%, transparent)',
              marginTop: '72px',
            }}
          />

        </div>
      </div>
    </section>
  )
}
