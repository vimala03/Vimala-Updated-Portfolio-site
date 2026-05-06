import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimateIn from '../AnimateIn'

/* ─── Segment type ─── */
type Segment = { text: string; highlight?: boolean }
type Paragraph = Segment[]

/* ─── Builder (Professional) tab content ─── */
const builderContent = {
  heading: `I design products that don't just look good, they work, scale, and last.`,
  paragraphs: [
    [
      { text: 'My foundation in Engineering trained me to ' },
      { text: 'think in systems, data, and long-term consequences', highlight: true },
      { text: ' — a mindset I carry into every design decision. I\'ve worked across the full product spectrum: from early stage discovery and ' },
      { text: '0→1 building to scaling systems', highlight: true },
      { text: ' with real users and business constraints.' },
    ],
    [
      { text: 'At Youclean, I applied product thinking to real world service operations, bridging the gap between design intent and execution reality. I\'m fluent in modern tooling and ' },
      { text: 'AI-augmented workflows', highlight: true },
      { text: ', which means I move fast without cutting corners on quality or user clarity.' },
    ],
  ] as Paragraph[],
  cards: [
    {
      label: 'Design philosophy',
      text: 'Every interface is a decision. I design with intent, where each choice serves a purpose.',
    },
    {
      label: 'Work style',
      text: 'I connect design, business, and execution. Clarity of outcome drives everything.',
    },
    {
      label: 'Differentiator',
      text: `Analytical roots + creative execution. I don't just make it look good, I make it work.`,
    },
  ],
}

/* ─── Human tab content ─── */
const humanContent = {
  heading: `I'm driven by the simple urge to create something that matters.`,
  paragraphs: [
    [
      { text: 'I enjoy ' },
      { text: 'building things, ideas, systems', highlight: true },
      { text: ', or small everyday improvements. It\'s less about perfection and more about starting and shaping something into existence.' },
    ],
    [
      { text: '' },
      { text: 'Curiosity is my default mode', highlight: true },
      { text: '. ' },
      { text: 'I ask \'why\' too often', highlight: true },
      { text: ', read things I probably don\'t need to, and find patterns where others see noise.' },
    ],
    [
      { text: 'Outside work, I find energy in exploring new tools, thinking through problems on walks, and occasionally trying to cook something ambitious.' },
    ],
  ] as Paragraph[],
  cards: [
    {
      label: 'Core values',
      text: `Honesty, simplicity, and intent. I'd rather say something real than something polished.`,
    },
    {
      label: 'How I think',
      text: `I'm a systems thinker at heart, always looking for the root cause, not just the symptom.`,
    },
    {
      label: 'What I believe',
      text: `Great work comes from environments with trust and openness. Culture is a design problem too.`,
    },
  ],
}

type Tab = 'builder' | 'human'

function renderParagraph(segments: Paragraph) {
  return segments.map((seg, i) =>
    seg.highlight ? (
      <span
        key={i}
        className="font-semibold text-[rgba(24,24,27,0.78)]"
      >
        {seg.text}
      </span>
    ) : (
      <span key={i}>{seg.text}</span>
    )
  )
}

export default function AboutMindset() {
  const [active, setActive] = useState<Tab>('builder')
  const content = active === 'builder' ? builderContent : humanContent

  return (
    <section className="bg-lavender pt-12 pb-12 md:pt-[80px] md:pb-[80px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        <div className="px-0 lg:px-[91px]">

          {/* Header row */}
          <AnimateIn delay={0}>
            <div className="flex flex-col gap-4 mb-16">
              <p className="font-inter font-medium text-[12px] text-[rgba(24,24,27,0.35)] tracking-[1.68px] uppercase">
                A MIX OF LOGIC AND INSTINCT
              </p>

              {/* Toggle pill */}
              <div className="flex items-center gap-[2px] bg-[#f4f3f0] border border-[rgba(24,24,27,0.1)] rounded-full p-[5px] w-fit h-[47.5px]" style={{ position: 'relative' }}>
                {(['builder', 'human'] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className="h-[37.5px] px-6 rounded-full text-[13px] font-semibold font-inter capitalize tracking-[0.26px] whitespace-nowrap"
                    style={{ position: 'relative', zIndex: 1, color: active === tab ? '#fff' : 'rgba(24,24,27,0.45)', transition: 'color 0.2s ease' }}
                  >
                    {active === tab && (
                      <motion.span
                        layoutId="mindset-pill"
                        style={{
                          position: 'absolute', inset: 0,
                          borderRadius: '999px',
                          background: '#18181b',
                          boxShadow: '0px 2px 8px 0px rgba(24,24,27,0.18)',
                          zIndex: -1,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {tab === 'builder' ? 'Builder' : 'Human'}
                  </button>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Content row — AnimatePresence swaps content on tab change */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="flex flex-col lg:flex-row items-start gap-10 lg:gap-[132px]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Left — heading + body */}
              <div className="flex flex-col gap-9 w-full lg:max-w-[535px] lg:shrink-0">
                <h2 className="type-section text-[#18181b]">
                  {content.heading}
                </h2>
                <div className="flex flex-col gap-0 type-body text-[rgba(24,24,27,0.58)]">
                  {content.paragraphs.map((para, i) => (
                    <p key={i} className={i > 0 ? 'mt-4' : ''}>
                      {renderParagraph(para)}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right — cards */}
              <div className="flex flex-col gap-4 flex-1 min-w-0">
                {content.cards.map(({ label, text }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                    className="bg-white border border-[rgba(24,24,27,0.08)] rounded-[14px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] px-[25px] py-[23px] transition-all duration-200 hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] hover:-translate-y-px"
                  >
                    <div className="flex flex-col gap-2">
                      <p className="type-meta text-[rgba(24,24,27,0.35)]">{label}</p>
                      <p className="type-body text-[rgba(24,24,27,0.62)] max-w-[282px]">{text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
