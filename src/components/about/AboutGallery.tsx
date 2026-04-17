import { useState, useRef, useEffect, useCallback } from 'react'
import AnimateIn from '../AnimateIn'

const photos = [
  {
    src: '/images/travel.jpeg',
    alt: 'Travel',
    category: 'EXPLORATION',
    caption: 'Being in nature resets my thinking, it reminds me design should feel effortless.',
  },
  {
    src: '/images/meditation.jpeg',
    alt: 'Meditation',
    category: 'STILLNESS',
    caption: 'In quiet moments, I find clarity, where ideas simplify and intention becomes sharper.',
  },
  {
    src: '/images/tea.jpeg',
    alt: 'Tea',
    category: 'SLOW MOMENTS',
    caption: 'I value pauses as much as progress, they\'re where thoughts settle into meaningful ideas.',
  },
  {
    src: '/images/biking.jpeg',
    alt: 'Biking',
    category: 'RIDING',
    caption: 'On the road, I think in flows, balance, control, and moving with intent.',
  },
  {
    src: '/images/dance.jpeg',
    alt: 'Dance',
    category: 'EXPRESSION',
    caption: 'Dance taught me rhythm and presence, how movement and emotion shape experience.',
  },
  {
    src: '/images/photography.jpeg',
    alt: 'Photography',
    category: 'EVERYDAY',
    caption: 'Simple moments reveal patterns, timing, precision, and quiet observation.',
  },
  {
    src: '/images/carroms.jpeg',
    alt: 'Carroms',
    category: 'PERSPECTIVE',
    caption: 'Stepping into new places expands how I see, context shapes every experience we design.',
  },
]

const CENTER = 3
const TRANSITION_MS = 500

export default function AboutGallery() {
  const [activeIdx, setActiveIdx] = useState(CENTER)
  const isTransitioning = useRef(false)
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback((idx: number) => {
    if (idx === activeIdx) return
    if (isTransitioning.current) return

    isTransitioning.current = true
    setActiveIdx(idx)

    if (transitionTimer.current) clearTimeout(transitionTimer.current)
    transitionTimer.current = setTimeout(() => {
      isTransitioning.current = false
    }, TRANSITION_MS)
  }, [activeIdx])

  const handlePhotoHover = (i: number) => {
    if (i === activeIdx) return
    goTo(i)
  }

  const prev = useCallback(() => goTo(Math.max(0, activeIdx - 1)), [activeIdx, goTo])
  const next = useCallback(() => goTo(Math.min(photos.length - 1, activeIdx + 1)), [activeIdx, goTo])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [prev, next])

  // Clean up timer on unmount
  useEffect(() => () => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current)
  }, [])

  // removed unused activePhoto

  return (
    <section className="bg-[#fafaf9] pt-12 pb-14 md:pt-[80px] md:pb-[96px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        <div className="px-0 lg:px-[91px]">

          {/* Header */}
          <AnimateIn delay={0}>
            <div className="flex flex-col gap-4 mb-14">
              <p className="font-inter font-medium text-[12px] text-[rgba(24,24,27,0.35)] tracking-[1.68px] uppercase">
                BEYOND WORK
              </p>
              <h2 className="font-cormorant font-medium text-[48px] text-[#18181b] leading-[1.03] tracking-[-0.46px]">
                The rest of me
              </h2>
            </div>
          </AnimateIn>

        </div>

        {/* Carousel */}
        <AnimateIn delay={60}>
          <div
            className="relative overflow-hidden"
            style={{ height: '380px' }}
            aria-label="Personal photo gallery"
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ perspective: '1200px' }}
            >
              {photos.map((photo, i) => {
                const offset = i - activeIdx
                const absOffset = Math.abs(offset)

                if (absOffset > 3) return null

                const isCenter = offset === 0
                const sign = offset < 0 ? -1 : offset > 0 ? 1 : 0

                const width  = isCenter ? 260 : absOffset === 1 ? 200 : absOffset === 2 ? 160 : 130
                const height = isCenter ? 340 : absOffset === 1 ? 280 : absOffset === 2 ? 230 : 180
                const xBase  = isCenter ? 0 : sign * (absOffset === 1 ? 290 : absOffset === 2 ? 510 : 690)
                const rotation = isCenter ? 0 : sign * (absOffset === 1 ? 3 : absOffset === 2 ? 6 : 9)
                const opacity  = isCenter ? 1 : absOffset === 1 ? 0.75 : absOffset === 2 ? 0.45 : 0.2
                const zIndex   = 10 - absOffset

                return (
                  <div
                    key={photo.src}
                    onMouseEnter={() => handlePhotoHover(i)}
                    style={{
                      position: 'absolute',
                      width: `${width}px`,
                      height: `${height}px`,
                      transform: `translateX(${xBase}px) rotate(${rotation}deg)`,
                      opacity,
                      zIndex,
                      transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
                      cursor: isCenter ? 'default' : 'pointer',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: isCenter
                        ? '1px solid rgba(24,24,27,0.1)'
                        : '1px solid rgba(24,24,27,0.06)',
                      boxShadow: isCenter
                        ? '0 16px 48px rgba(0,0,0,0.12)'
                        : '0 4px 16px rgba(0,0,0,0.06)',
                    }}
                    onMouseOver={(e) => {
                      if (!isCenter) {
                        const el = e.currentTarget
                        el.style.transform = `translateX(${xBase}px) rotate(${rotation}deg) scale(1.04) translateY(-4px)`
                        el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.14)'
                        el.style.transition = 'transform 280ms ease, box-shadow 280ms ease'
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isCenter) {
                        const el = e.currentTarget
                        el.style.transform = `translateX(${xBase}px) rotate(${rotation}deg)`
                        el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'
                        el.style.transition = 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
                      }
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Caption area — fixed height container, all captions stacked, CSS crossfade */}
          <div className="flex flex-col items-center gap-3 mt-10 px-0 lg:px-[91px]">
            {/* Fixed height wrapper so layout doesn't shift */}
            <div className="relative w-full flex justify-center" style={{ height: '72px' }}>
              {photos.map((photo, i) => (
                <div
                  key={photo.src}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    opacity: activeIdx === i ? 1 : 0,
                    transform: activeIdx === i ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'opacity 300ms ease, transform 300ms ease',
                    textAlign: 'center',
                    pointerEvents: activeIdx === i ? 'auto' : 'none',
                  }}
                >
                  <p className="font-inter font-semibold text-[10px] text-[rgba(24,24,27,0.28)] tracking-[1.4px] uppercase mb-2">
                    {photo.category}
                  </p>
                  <p className="font-inter font-normal text-[15px] text-[rgba(24,24,27,0.52)] leading-[26px] max-w-[540px] mx-auto">
                    {photo.caption}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-5 mt-4">
              <button
                onClick={prev}
                disabled={activeIdx === 0}
                aria-label="Previous photo"
                className="w-8 h-8 rounded-full border border-[rgba(24,24,27,0.12)] flex items-center justify-center transition-all duration-150 disabled:opacity-25 hover:border-[rgba(24,24,27,0.28)] hover:bg-[rgba(24,24,27,0.04)]"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M8 2L4 6l4 4" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    style={{
                      width: i === activeIdx ? '20px' : '6px',
                      height: '6px',
                      borderRadius: '999px',
                      background: i === activeIdx ? '#18181b' : 'rgba(24,24,27,0.18)',
                      transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                disabled={activeIdx === photos.length - 1}
                aria-label="Next photo"
                className="w-8 h-8 rounded-full border border-[rgba(24,24,27,0.12)] flex items-center justify-center transition-all duration-150 disabled:opacity-25 hover:border-[rgba(24,24,27,0.28)] hover:bg-[rgba(24,24,27,0.04)]"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4 2l4 4-4 4" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
