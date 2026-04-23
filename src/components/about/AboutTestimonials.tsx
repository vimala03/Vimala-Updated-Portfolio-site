import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      'Vimala is creative, enthusiastic, passionate and committed — a UX designer with strong conceptualisation skills, great attention to detail, and a collaborative team player who consistently delivers beyond expectations.',
    name: 'Padamati Pramod Kumar',
    role: 'CEO',
    company: 'Czar Gaming Pvt Ltd',
    initial: 'P',
  },
  {
    quote:
      'Vimala has strong roots in UX design philosophy and is a very focused and thorough professional. Her ability to connect user needs with business goals is rare — and immediately felt in the work she produces.',
    name: 'Yasir Wani',
    role: 'Senior Designer',
    company: 'Delivery Hero',
    initial: 'Y',
  },
  {
    quote:
      'Vimala is an example of inspiration. Her analytical approach to problem-solving, combined with remarkable resilience under pressure, makes her someone teams genuinely rally around.',
    name: 'Kishor Chamua',
    role: 'Designer',
    company: 'Microsoft',
    initial: 'K',
  },
  {
    quote:
      'Her impact on junior colleagues is immediate and lasting. Her motivational presence and dedication to continuous learning raise the bar for everyone she works alongside.',
    name: 'Muskan Bachhuka',
    role: 'UX Designer',
    company: 'Moonraft Innovation Labs',
    initial: 'M',
  },
  {
    quote:
      "Vimala's approach goes far beyond aesthetics — she integrates user psychology, accessibility, and strategic thinking into every decision. Her ability to blend deep UX expertise with a genuine commitment to inclusive design makes her an invaluable designer and leader.",
    name: 'Abhijit Shirsath',
    role: 'UX Design Leader',
    company: 'Enterprise Products & Design Systems',
    initial: 'A',
  },
  {
    quote:
      "Over 10 months building a complex intranet portal together, Vimala's ability to think through every edge case while keeping the human experience central was consistently impressive. She's the rare designer who is both a rigorous thinker and a generous mentor.",
    name: 'Nikhil Nandanwar',
    role: 'Experience Designer',
    company: '',
    initial: 'N',
  },
  {
    quote:
      "What sets Vimala apart is her approach — she starts from the ground level of what a user actually experiences, then builds solutions methodically from there. Hiring her was one of the best decisions we made.",
    name: 'Tanya Sobti',
    role: 'Human Resource Professional',
    company: '',
    initial: 'T',
  },
]

export default function AboutTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback((idx: number) => {
    setActiveIdx(idx)
  }, [])

  // Auto-advance (pause on hover)
  useEffect(() => {
    if (isPaused) return
    timerRef.current = setTimeout(() => {
      setActiveIdx((i) => (i + 1) % testimonials.length)
    }, 5500)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeIdx, isPaused])

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  return (
    <section className="bg-[#18181b] pt-[80px] pb-[96px] relative overflow-hidden">

      {/* Faint grid texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.025,
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px] relative z-10">
        <div className="px-0 lg:px-[91px]">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 mb-16"
          >
            <p className="font-inter font-medium text-[12px] text-[rgba(255,255,255,0.25)] tracking-[1.68px] uppercase flex items-center gap-2">
              <span>—</span>
              <span>Voices</span>
            </p>
            <h2 className="font-cormorant font-medium text-[28px] sm:text-[38px] lg:text-[48px] text-white leading-[1.03] tracking-[-0.46px]">
              People who've{' '}
              <em className="italic text-[#797979]">worked with me.</em>
            </h2>
          </motion.div>

          {/* Testimonial display */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main quote area */}
            <div
              className="relative"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '56px',
              }}
            >
              {/* Large decorative quote mark */}
              <div
                style={{
                  position: 'absolute',
                  top: '40px',
                  left: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '120px',
                  lineHeight: 1,
                  color: 'rgba(255,255,255,0.06)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                "
              </div>

              {/* Quote text — layered CSS crossfade */}
              <div
                className="relative"
                style={{ minHeight: 'clamp(80px, 20vw, 140px)' }}
              >
                {testimonials.map((t, i) => (
                  <p
                    key={t.name}
                    style={{
                      position: i === 0 ? 'relative' : 'absolute',
                      top: i === 0 ? undefined : 0,
                      left: i === 0 ? undefined : 0,
                      right: i === 0 ? undefined : 0,
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(17px, 3vw, 28px)',
                      fontWeight: 400,
                      lineHeight: 1.45,
                      color: 'rgba(255,255,255,0.82)',
                      letterSpacing: '-0.01em',
                      maxWidth: '820px',
                      margin: 0,
                      opacity: activeIdx === i ? 1 : 0,
                      transform: activeIdx === i ? 'translateY(0)' : 'translateY(10px)',
                      transition: 'opacity 400ms ease, transform 400ms ease',
                      pointerEvents: activeIdx === i ? 'auto' : 'none',
                    }}
                  >
                    {t.quote}
                  </p>
                ))}
              </div>

              {/* Attribution — below quote */}
              <div
                style={{
                  marginTop: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '24px',
                }}
              >
                {/* Person info */}
                <div style={{ position: 'relative', height: '48px', minWidth: 'min(260px, 100%)' }}>
                  {testimonials.map((t, i) => (
                    <div
                      key={t.name}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        opacity: activeIdx === i ? 1 : 0,
                        transform: activeIdx === i ? 'translateY(0)' : 'translateY(6px)',
                        transition: 'opacity 350ms ease 80ms, transform 350ms ease 80ms',
                        pointerEvents: activeIdx === i ? 'auto' : 'none',
                      }}
                    >
                      {/* Avatar circle */}
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.55)',
                          }}
                        >
                          {t.initial}
                        </span>
                      </div>

                      <div>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13px',
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.82)',
                            margin: 0,
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {t.name}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '12px',
                            fontWeight: 400,
                            color: 'rgba(255,255,255,0.35)',
                            margin: '2px 0 0',
                          }}
                        >
                          {t.role}{t.company ? ` · ${t.company}` : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dot navigation */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      style={{
                        width: activeIdx === i ? '28px' : '6px',
                        height: '6px',
                        borderRadius: '999px',
                        background: activeIdx === i ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.18)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom rule */}
            <div
              style={{
                height: '1px',
                background: 'rgba(255,255,255,0.06)',
                marginTop: '56px',
              }}
            />

            {/* Compact name grid — hidden on mobile (dot nav is sufficient), 7-col on md+ */}
            <div
              className="hidden md:grid"
              style={{
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '1px',
                marginTop: '0',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '0 0 12px 12px',
                overflow: 'hidden',
              }}
            >
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => goTo(i)}
                  onMouseEnter={() => { setIsPaused(true); goTo(i) }}
                  onMouseLeave={() => setIsPaused(false)}
                  style={{
                    background: activeIdx === i ? 'rgba(255,255,255,0.04)' : '#18181b',
                    border: 'none',
                    padding: '18px 20px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.25s ease',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '12px',
                      fontWeight: 600,
                      color: activeIdx === i ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.28)',
                      margin: 0,
                      transition: 'color 0.25s ease',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {t.name.split(' ')[0]}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '10px',
                      fontWeight: 400,
                      color: activeIdx === i ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.14)',
                      margin: '2px 0 0',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {t.company || t.role}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
