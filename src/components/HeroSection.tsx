import Container from './Container'
import StatItem from './StatItem'
import HeroCard from './HeroCard'
import Button from './Button'

const imgProfile = "/images/case-studies/profile.jpeg"

export default function HeroSection() {
  return (
    <section className="border-b border-black/10 pt-6 md:pt-8 lg:pt-10">
      <Container className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-8 lg:gap-14">

        {/* LEFT: Intro */}
        <div className="flex flex-col w-full md:flex-1 md:min-w-0">

          {/* Role label */}
          <p
            className="type-meta text-stone-muted"
            style={{ animation: 'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '0ms' }}
          >
            Product Designer · 8 Years
          </p>

          {/* Greeting + headline */}
          <div
            className="flex flex-col gap-3 mt-5 md:mt-6"
            style={{ animation: 'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '80ms' }}
          >
            {/* Greeting row */}
            <div className="flex items-center gap-3">
              <div className="w-[38px] h-[38px] md:w-[44px] md:h-[44px] rounded-full border border-black/10 overflow-hidden bg-[#c3d8ed] shrink-0">
                <img src={imgProfile} alt="Vimala Banavath" className="w-full h-full object-cover" />
              </div>
              <p className="font-cormorant italic text-[17px] md:text-[20px] lg:text-[24px] text-black/55 leading-none">
                Hello, I'm Vimala!
              </p>
            </div>

            {/* H1 — Playfair Display for premium editorial weight */}
            <h1 className="type-display text-stone-ink max-w-[580px]">
              I design{' '}
              <em className="italic" style={{ color: '#5a5954' }}>AI-powered product systems</em>
              {' '}that turn complex workflows into clear, confident decisions.
            </h1>

            <div className="flex flex-col gap-0 mt-0.5">
              <p className="font-cormorant italic text-[16px] md:text-[18px] lg:text-[22px] text-black/50 leading-[1.5]">
                Reducing cognitive load.
              </p>
              <p className="font-cormorant font-medium text-[17px] md:text-[20px] lg:text-[26px] text-stone-ink leading-[1.5]">
                Increasing decision clarity.
              </p>
            </div>
          </div>

          {/* Body + Stats + CTAs */}
          <div
            className="flex flex-col mt-1"
            style={{ animation: 'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '160ms' }}
          >
            <p className="type-body text-[rgba(24,24,27,0.52)] max-w-[480px] mt-3">
              8+ years designing enterprise and SaaS products. Now focused on AI-assisted workflows,
              decision systems, and scalable product thinking.
            </p>

            {/* Stats */}
            <div className="mt-6 md:mt-8 flex flex-col items-start gap-4 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-4 xl:flex xl:flex-row xl:items-end xl:gap-0">
              <StatItem value="8+"  label="Years Exp." />
              <StatItem value="40+" label="Products Shipped" />
              <StatItem value="6+"  label="Cross industry solutions" />
              <StatItem value="3"   label="0→1 builds" showSeparator={false} />
            </div>

            {/* CTAs */}
            <div className="mt-6 md:mt-8 mb-8 md:mb-14 flex flex-wrap items-center gap-3">
              <Button href="#work" variant="primary">
                View case studies
              </Button>
              <Button href="/resume.pdf" target="_blank" rel="noopener noreferrer" variant="outline">
                View Resume →
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT: Featured Case Study Card */}
        <div style={{ animation: 'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '120ms' }}>
          <HeroCard />
        </div>
      </Container>
    </section>
  )
}
