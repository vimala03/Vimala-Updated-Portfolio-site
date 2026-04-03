import { useState, useRef, useEffect, useCallback } from 'react'
import AnimateIn from '../AnimateIn'

const photos = [
  {
    src: 'https://www.figma.com/api/mcp/asset/fef32f0b-dac8-4a85-9291-6a3a2f2b0eb2',
    alt: 'Family',
    category: 'FAMILY',
    caption: 'Where I am rooted. Everything I build, I build for people like these.',
  },
  {
    src: 'https://www.figma.com/api/mcp/asset/17679e06-a98e-48f4-a901-67df20c6f293',
    alt: 'Art & meditation',
    category: 'ART',
    caption: 'Meditation in motion. I draw when I need silence — and when words aren\'t enough.',
  },
  {
    src: 'https://www.figma.com/api/mcp/asset/d15761da-67c9-404d-856a-59d6a2e2b79b',
    alt: 'Travel',
    category: 'TRAVEL',
    caption: 'I travel to find new perspectives, not just places. Water calms the noise.',
  },
  {
    src: 'https://www.figma.com/api/mcp/asset/2b96b8d3-81f7-449e-95d4-b03dfcd5ee93',
    alt: 'Solitude',
    category: 'SOLITUDE',
    caption: 'Some of my best thinking happens in quiet, unhurried moments like this.',
  },
  {
    src: 'https://www.figma.com/api/mcp/asset/a9fad70f-c7ba-4ac9-a6db-763070c6dc07',
    alt: 'Nature',
    category: 'NATURE',
    caption: 'I find patterns outdoors that I bring back indoors — into systems and design.',
  },
  {
    src: 'https://www.figma.com/api/mcp/asset/9c470813-40ad-4886-bf6e-4dbfef4e0c3f',
    alt: 'Everyday',
    category: 'EVERYDAY',
    caption: 'Grounded in the ordinary. The everyday is where most of life actually happens.',
  },
  {
    src: 'https://www.figma.com/api/mcp/asset/ef760c85-fa3b-4795-85c9-5320101a000b',
    alt: 'Freedom',
    category: 'FREEDOM',
    caption: 'Momentum. On two wheels or on a blank canvas — I move best when I\'m moving.',
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

  const activePhoto = photos[activeIdx]

  return (
    <section className="bg-[#fafaf9] pt-[80px] pb-[96px]">
      <div className="max-w-[1440px] mx-auto px-[60px]">
        <div className="px-[91px]">

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
          <div className="flex flex-col items-center gap-3 mt-10 px-[91px]">
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
