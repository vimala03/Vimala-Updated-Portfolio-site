import { useState } from 'react'
import { motion } from "framer-motion";

const imgIcon = 'https://www.figma.com/api/mcp/asset/004610ac-c36f-4db9-934f-228b1967967e'

const beliefs = [
  {
    num: '01',
    tag: 'Intentionality',
    heading: `Good design is not decoration — it's decision-making.`,
    body: `Every visual choice is a hypothesis about how someone will think, feel, or act. I treat each one seriously. Design that ignores this is just decoration waiting to be removed.`,
  },
  {
    num: '02',
    tag: 'Clarity',
    heading: `Complexity is the enemy of trust.`,
    body: `When people struggle to understand a product, they lose confidence in it. My job is to absorb the complexity on their behalf and surface only what matters, at the right moment, in the right form.`,
  },
  {
    num: '03',
    tag: 'Integrity',
    heading: `Design without accountability is decoration.`,
    body: `I believe designers should own outcomes, not just outputs. If the feature didn't help users do the thing they needed to do, the design wasn't good enough. Full stop.`,
  },
  {
    num: '04',
    tag: 'Collaboration',
    heading: `The best work lives in the space between disciplines.`,
    body: `Design doesn't happen in isolation. The most resilient products I've seen were built when designers, engineers, and product thinkers treated each other as equal partners — not handoff machines.`,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function AboutBeliefs() {
  const [activeCol, setActiveCol] = useState(0)

  return (
    <section className="bg-[#18181b] pt-[80px] pb-[80px] relative overflow-hidden">

      {/* Subtle dot pattern overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.04,
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-[60px] relative z-10">
        <div className="px-[91px]">

          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 mb-16"
          >
            <p className="font-inter font-semibold text-[11px] text-[rgba(255,255,255,0.22)] tracking-[1.98px] uppercase">
              PRINCIPLES
            </p>
            <h2 className="font-cormorant font-medium text-[45.72px] text-white leading-[1.08] tracking-[-0.46px]">
              What I{' '}
              <em className="italic text-[#797979]">believe.</em>
            </h2>
          </motion.div>

          {/* Content row */}
          <div className="flex items-start gap-[29px]">

            {/* Left — main belief card with stacked absolute content layers */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="flex-1 min-w-0"
            >
              <div className="border border-[rgba(217,119,6,0.25)] rounded-[14px] overflow-hidden h-[477px] relative">

                {/* Static header row — diamond icon always visible */}
                <div className="flex items-center justify-between px-7 py-6 border-b border-[rgba(217,119,6,0.12)] relative z-10">
                  {/* Dynamic num + tag — layered */}
                  <div className="relative h-[22px] flex items-center" style={{ minWidth: '180px' }}>
                    {beliefs.map((b, i) => (
                      <div
                        key={b.num}
                        className="absolute left-0 top-0 flex items-center gap-5"
                        style={{
                          opacity: activeCol === i ? 1 : 0,
                          transform: activeCol === i ? 'translateY(0px)' : 'translateY(4px)',
                          transition: 'opacity 220ms ease, transform 220ms ease',
                          pointerEvents: 'none',
                        }}
                      >
                        <span className="font-inter font-semibold text-[10px] text-[rgba(255,255,255,0.22)] tracking-[0.7px] uppercase">
                          {b.num}
                        </span>
                        <span className="bg-[rgba(217,119,6,0.1)] border border-[rgba(217,119,6,0.3)] font-inter font-semibold text-[10px] text-[#d97706] tracking-[0.7px] uppercase px-3 py-1 rounded-full">
                          {b.tag}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Diamond icon — static */}
                  <div className="bg-[rgba(217,119,6,0.12)] border border-[rgba(217,119,6,0.3)] flex items-center justify-center rounded-[14px] size-7 shrink-0">
                    <div className="rotate-45">
                      <img src={imgIcon} alt="" className="size-3 block" />
                    </div>
                  </div>
                </div>

                {/* Belief text layers — all rendered, CSS opacity crossfade */}
                <div className="relative flex-1" style={{ height: 'calc(477px - 73px)' }}>
                  {beliefs.map((b, i) => (
                    <div
                      key={b.num}
                      className="absolute inset-0 px-[47px] pt-12 pb-8"
                      style={{
                        opacity: activeCol === i ? 1 : 0,
                        transform: activeCol === i ? 'translateY(0px)' : 'translateY(8px)',
                        transition: 'opacity 260ms ease, transform 260ms ease',
                        pointerEvents: activeCol === i ? 'auto' : 'none',
                      }}
                    >
                      <h3 className="font-inter font-semibold text-[19px] text-white leading-[26.22px] tracking-[-0.34px] mb-6 max-w-[410px]">
                        {b.heading}
                      </h3>
                      <p className="font-inter font-normal text-[15px] text-[rgba(255,255,255,0.48)] leading-[26.7px] tracking-[-0.075px] max-w-[446px]">
                        {b.body}
                      </p>

                      {/* Bottom tag */}
                      <div className="absolute bottom-8 left-[47px]">
                        <span className="bg-[rgba(217,119,6,0.1)] border border-[rgba(217,119,6,0.3)] font-inter font-semibold text-[10px] text-[#d97706] tracking-[0.7px] uppercase px-3 py-1 rounded-full">
                          {b.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — accordion flex column panel */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              className="shrink-0"
              style={{ width: '360px' }}
            >
              <div
                className="border border-[rgba(217,119,6,0.2)] rounded-[14px] overflow-hidden h-[477px]"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  background: '#111111',
                }}
                onMouseLeave={() => setActiveCol(0)}
              >
                {beliefs.map((belief, i) => {
                  const isActive = activeCol === i

                  return (
                    <div
                      key={belief.num}
                      onMouseEnter={() => setActiveCol(i)}
                      style={{
                        flexGrow: isActive ? 1.8 : 0.73,
                        flexShrink: 1,
                        flexBasis: 0,
                        borderRight: i < beliefs.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '18px 0',
                        alignItems: 'center',
                        position: 'relative',
                        cursor: 'default',
                        background: isActive
                          ? 'rgba(217,119,6,0.04)'
                          : 'transparent',
                        transition: 'flex-grow 0.45s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Subtle pattern per column */}
                      <div
                        aria-hidden
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage:
                            i % 2 === 0
                              ? 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)'
                              : 'repeating-linear-gradient(45deg, rgba(255,255,255,1) 0, rgba(255,255,255,1) 1px, transparent 0, transparent 50%)',
                          backgroundSize: i % 2 === 0 ? '16px 16px' : '10px 10px',
                          opacity: 0.03,
                          pointerEvents: 'none',
                        }}
                      />

                      {/* Vertical label */}
                      <div
                        style={{
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '9px',
                          fontWeight: 600,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: isActive
                            ? 'rgba(217,119,6,0.85)'
                            : 'rgba(255,255,255,0.18)',
                          paddingTop: '12px',
                          userSelect: 'none',
                          transition: 'color 0.3s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {belief.tag}
                      </div>

                      {/* Number circle */}
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: isActive
                            ? '1px solid rgba(217,119,6,0.5)'
                            : '1px solid rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '12px',
                          flexShrink: 0,
                          transition: 'border-color 0.3s ease',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '9px',
                            fontWeight: 700,
                            color: isActive
                              ? 'rgba(217,119,6,0.9)'
                              : 'rgba(255,255,255,0.2)',
                            letterSpacing: '0.05em',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {belief.num}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Subtle hover hint */}
              <p
                className="font-inter text-[10px] text-[rgba(255,255,255,0.18)] tracking-[0.08em] mt-3 text-center"
                style={{ userSelect: 'none' }}
              >
                hover to explore
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
