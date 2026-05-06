import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

interface Metric {
  value:    string      // e.g. "91%" or "−15K"
  label:    string
  detail?:  string
  /** If set, counter animates from 0 to this number on enter */
  animateTo?: number
  suffix?:  string      // e.g. "%" appended to counter
  color?:   string      // e.g. "#1a4f8a"
}

interface MetricsHighlightProps {
  metrics:   Metric[]
  layout?:   'row' | 'hero'  // hero = one big stat above others
  headline?: string
}

function AnimatedNumber({ target, suffix = '', color }: { target: number; suffix: string; color?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const steps    = 60
    const inc      = target / steps
    let   current  = 0
    const timer = setInterval(() => {
      current = Math.min(current + inc, target)
      setDisplay(Math.round(current))
      if (current >= target) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} style={{ color }}>
      {display}{suffix}
    </span>
  )
}

export default function MetricsHighlight({ metrics, layout = 'row', headline }: MetricsHighlightProps) {
  return (
    <ScrollReveal>
      {headline && (
        <p style={{
          fontFamily: '"Instrument Sans", sans-serif',
          fontSize: '0.72rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          marginBottom: '0.75rem',
          textAlign: 'center',
        }}>
          {headline}
        </p>
      )}

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: layout === 'hero' ? '4rem' : '1.25rem',
      }}>
        {metrics.map((m, i) => (
          <ScrollReveal key={i} delay={i * 80} from="up">
            <div
              style={{
                textAlign: 'center',
                cursor: 'default',
                minWidth: layout === 'hero' ? 'unset' : '140px',
              }}
            >
              {/* Value */}
              <div style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: layout === 'hero' ? '3.2rem' : '2.8rem',
                lineHeight: 1,
                color: m.color ?? '#fff',
                marginBottom: '0.4rem',
              }}>
                {m.animateTo != null
                  ? <AnimatedNumber target={m.animateTo} suffix={m.suffix ?? ''} color={m.color} />
                  : m.value}
              </div>

              {/* Label */}
              <div style={{
                fontFamily: '"Instrument Sans", sans-serif',
                fontSize: '0.72rem',
                color: m.color ? `${m.color}99` : 'rgba(255,255,255,0.5)',
                lineHeight: 1.5,
                maxWidth: '18ch',
                margin: '0 auto',
                letterSpacing: '0.02em',
              }}>
                {m.label}
              </div>

              {/* Optional detail */}
              {m.detail && (
                <div style={{
                  fontFamily: '"Instrument Sans", sans-serif',
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.3)',
                  marginTop: '0.25rem',
                }}>
                  {m.detail}
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </ScrollReveal>
  )
}
