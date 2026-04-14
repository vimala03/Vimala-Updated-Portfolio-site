import Container from './Container'
import StatItem from './StatItem'
import HeroCard from './HeroCard'

const imgProfile = 'https://www.figma.com/api/mcp/asset/cfc58b8e-5413-4628-a233-23c867c11e90'

export default function HeroSection() {
  return (
    <section className="border-b border-black/10 pt-10 md:pt-12 lg:pt-14">
      <Container className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-8 lg:gap-16">

        {/* LEFT: Intro */}
        <div className="flex flex-col w-full md:flex-1 md:min-w-0">

          {/* Role label */}
          <p
            className="font-instrument text-stone-muted text-[12px] md:text-[13px] tracking-[1.8px] uppercase"
            style={{ animation: 'fadeUp 500ms ease-out both', animationDelay: '0ms' }}
          >
            Product Designer · 8 Years
          </p>

          {/* Heading block: greeting → headline → sub-lines */}
          <div
            className="flex flex-col gap-3 md:gap-4 mt-[28px] md:mt-[32px] lg:mt-[36px]"
            style={{ animation: 'fadeUp 500ms ease-out both', animationDelay: '100ms' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] md:w-[50px] md:h-[50px] rounded-full border border-black/10 overflow-hidden bg-[#c3d8ed] shrink-0">
                <img src={imgProfile} alt="Vimala Banavath" className="w-full h-full object-cover" />
              </div>
              <p className="font-cormorant italic text-[18px] md:text-[22px] lg:text-[28px] text-black/60 leading-none">
                Hello, I'm Vimala!
              </p>
            </div>

            <h1 className="font-cormorant font-medium text-[26px] md:text-[34px] lg:text-[40px] text-stone-ink leading-[1.1] tracking-[-0.5px]">
              I design{' '}
              <em className="italic text-stone-mid">AI-powered product systems</em>
              {' '}that turn complex workflows into clear, confident decisions.
            </h1>

            <div className="font-cormorant flex flex-col gap-0">
              <p className="italic text-[17px] md:text-[19px] lg:text-[26px] text-black/55 leading-[1.55]">Reducing cognitive load.</p>
              <p className="font-medium text-[19px] md:text-[21px] lg:text-[30px] text-stone-ink leading-[1.55]">Increasing decision clarity.</p>
            </div>
          </div>

          {/* Body copy + Stats + CTAs — exact spacing per Figma */}
          <div
            className="flex flex-col mt-[8px]"
            style={{ animation: 'fadeUp 500ms ease-out both', animationDelay: '200ms' }}
          >
            <p className="font-instrument text-[13px] md:text-[16px] text-[rgba(24,24,27,0.55)] leading-[1.81] tracking-[-0.05px] max-w-[520px]">
              8+ years designing enterprise and SaaS products. Now focused on AI-assisted workflows, decision systems, and scalable product thinking.
            </p>

            {/* Stats — mobile: vertical stack, tablet: 2×2 grid, desktop: horizontal row */}
            <div className="mt-10 md:mt-[60px] flex flex-col items-start gap-5 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-5 xl:flex xl:flex-row xl:items-end xl:gap-0">
              <StatItem value="8+" label="Years Exp." />
              <StatItem value="40+" label="Products Shipped" />
              <StatItem value="6+" label="Cross industry solutions" />
              <StatItem value="3" label="0→1 builds" showSeparator={false} />
            </div>

            {/* CTAs */}
            <div className="mt-10 md:mt-[60px] mb-14 md:mb-[112px] flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="bg-stone-ink text-white font-instrument text-[12px] md:text-[13px] tracking-[1px] uppercase rounded-full px-5 md:px-6 py-3 md:py-3.5 hover:opacity-80 transition-opacity duration-200 whitespace-nowrap"
              >
                View case studies
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-stone-ink/20 text-stone-mid font-instrument text-[12px] md:text-[13px] tracking-[1px] uppercase rounded-full px-5 md:px-6 py-3 md:py-3.5 hover:border-stone-ink/40 hover:bg-stone-ink/5 transition-[border-color,background-color] duration-200 whitespace-nowrap"
              >
                View Resume →
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT: Featured Case Study Card */}
        <div style={{ animation: 'fadeUp 500ms ease-out both', animationDelay: '150ms' }}>
          <HeroCard />
        </div>
      </Container>
    </section>
  )
}
