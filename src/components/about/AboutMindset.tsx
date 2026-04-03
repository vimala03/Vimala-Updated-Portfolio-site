import { useState } from 'react'
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
    <section className="bg-lavender pt-[80px] pb-[80px]">
      <div className="max-w-[1440px] mx-auto px-[60px]">
        <div className="px-[91px]">

          {/* Header row */}
          <AnimateIn delay={0}>
            <div className="flex flex-col gap-4 mb-16">
              <p className="font-inter font-medium text-[12px] text-[rgba(24,24,27,0.35)] tracking-[1.68px] uppercase">
                A MIX OF LOGIC AND INSTINCT
              </p>

              {/* Toggle pill */}
              <div className="flex items-center gap-[2px] bg-[#f4f3f0] border border-[rgba(24,24,27,0.1)] rounded-full p-[5px] w-fit h-[47.5px]">
                {(['builder', 'human'] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`h-[37.5px] px-6 rounded-full text-[13px] font-semibold font-inter capitalize tracking-[0.26px] transition-all duration-200 whitespace-nowrap ${
                      active === tab
                        ? 'bg-[#18181b] text-white shadow-[0px_2px_8px_0px_rgba(24,24,27,0.18)]'
                        : 'text-[rgba(24,24,27,0.45)] hover:text-[rgba(24,24,27,0.65)]'
                    }`}
                  >
                    {tab === 'builder' ? 'Builder' : 'Human'}
                  </button>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Content row */}
          <div className="flex items-start gap-[132px]">

            {/* Left — heading + body */}
            <AnimateIn delay={50} className="flex flex-col gap-9 max-w-[535px] shrink-0">
              <h2 className="font-cormorant font-medium text-[34px] text-[#18181b] leading-[1.14] tracking-[-0.34px]">
                {content.heading}
              </h2>
              <div className="flex flex-col gap-0 font-inter font-normal text-[16px] text-[rgba(24,24,27,0.58)] leading-[28px]">
                {content.paragraphs.map((para, i) => (
                  <p key={i} className={i > 0 ? 'mt-4' : ''}>
                    {renderParagraph(para)}
                  </p>
                ))}
              </div>
            </AnimateIn>

            {/* Right — cards */}
            <AnimateIn delay={100} className="flex flex-col gap-4 flex-1 min-w-0">
              {content.cards.map(({ label, text }, i) => (
                <div
                  key={i}
                  className="bg-white border border-[rgba(24,24,27,0.08)] rounded-[14px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] px-[25px] py-[23px] transition-all duration-200 hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] hover:-translate-y-px"
                >
                  <div className="flex flex-col gap-2">
                    <p className="font-inter font-semibold text-[11px] text-[rgba(24,24,27,0.35)] tracking-[1.32px] uppercase">
                      {label}
                    </p>
                    <p className="font-inter font-normal text-[14px] text-[rgba(24,24,27,0.62)] leading-[23.1px] max-w-[282px]">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </AnimateIn>

          </div>
        </div>
      </div>
    </section>
  )
}
