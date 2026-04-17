import AnimateIn from '../AnimateIn'

const imgHero = '/images/heroimage.jpeg'

const chips = [
  { label: 'Product Designer', color: '#6366f1' },
  { label: 'Entrepreneur',     color: '#06d953' },
  { label: 'Mentor',           color: '#a130e8' },
  { label: 'Learner',          color: '#e98b55' },
]

export default function AboutHero() {
  return (
    <section className="bg-[#fafaf9] pt-16 pb-12 md:pt-[80px] md:pb-[96px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        <div className="px-0 lg:px-[91px]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-12">

            {/* Left — text content */}
            <div className="flex flex-col gap-9 w-full lg:max-w-[537px] lg:shrink-0">
              <AnimateIn delay={0}>
                <div className="flex flex-col gap-7 md:gap-9">
                  {/* Label */}
                  <div className="flex items-center gap-5">
                    <div className="w-5 h-px bg-[rgba(24,24,27,0.25)]" />
                    <span className="font-inter font-semibold text-[11px] text-[rgba(24,24,27,0.38)] tracking-[1.98px] uppercase">
                      ABOUT ME
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="font-cormorant font-medium text-[32px] sm:text-[40px] lg:text-[48px] text-[#18181b] leading-[1.05] tracking-[-0.63px]">
                    Designing products.{' '}
                    <em className="italic text-[#5a5954]">Building systems.</em>{' '}
                    Solving real problems.
                  </h1>

                  {/* Paragraph */}
                  <p className="font-inter font-normal text-[15px] md:text-[17px] text-[rgba(24,24,27,0.55)] leading-[1.7] md:leading-[28.9px] tracking-[-0.085px] max-w-full lg:max-w-[506px]">
                    A Product Designer with a background in Psychology and design from IIT Delhi, blending data, intuition, and execution to create scalable digital experiences.
                  </p>
                </div>
              </AnimateIn>

              {/* Chips */}
              <AnimateIn delay={80}>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {chips.map(({ label, color }) => (
                    <div
                      key={label}
                      className="bg-white flex items-center gap-[7px] px-4 py-2 rounded-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)] hover:-translate-y-px"
                    >
                      <div className="rounded-[3px] shrink-0 size-[6px]" style={{ backgroundColor: color }} />
                      <span className="font-inter font-medium text-[13px] text-[rgba(24,24,27,0.62)] tracking-[0.13px] whitespace-nowrap">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>

            {/* Right — hero image */}
            <AnimateIn delay={120} className="w-full lg:w-auto lg:shrink-0">
              <div className="border border-[rgba(24,24,27,0.08)] rounded-[20px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.07)] overflow-hidden w-full lg:w-[422px] h-[260px] sm:h-[320px] lg:h-[395px]">
                <img
                  src={imgHero}
                  alt="Vimala Banavath"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                />
              </div>
            </AnimateIn>

          </div>
        </div>
      </div>
    </section>
  )
}
