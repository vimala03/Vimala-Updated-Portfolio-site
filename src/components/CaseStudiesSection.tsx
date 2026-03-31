import Container from './Container'
import CaseStudyCard from './CaseStudyCard'
import SmallCaseStudyCard from './SmallCaseStudyCard'
import CTASection from './CTASection'
import AnimateIn from './AnimateIn'

const largeCaseStudies = [
  {
    title: 'AI-powered enterprise search redesign → enabling faster decision making at scale',
    date: 'July 2022 - May 2023',
    description:
      'Improved task efficiency across 4000+ pages by redesigning navigation with AI-powered, persona-based search and contextual pinning, reducing friction and enabling faster, action-oriented workflows.',
    image: 'https://www.figma.com/api/mcp/asset/8f726510-85a4-4c7e-a721-a874b4f434fc',
    imageAlt: 'AI-powered enterprise search redesign',
  },
  {
    title: 'U&UST Intranet',
    date: 'July 2022 - May 2023',
    description:
      "Unified UST's fragmented intranet into a single, intuitive platform, eliminating silos and improving employee efficiency through research-driven workflows and seamless tool access.",
    image: 'https://www.figma.com/api/mcp/asset/ec3b4a15-c4e6-4db1-98e3-925b630b19d1',
    imageAlt: 'U&UST Intranet',
  },
  {
    title: 'Content Manager Metadata Generation, Translation',
    date: 'July 2022 - May 2023',
    description:
      'Improved search accuracy and content discoverability by introducing AI-powered metadata generation, strengthening taxonomy and information architecture across the platform.',
    image: 'https://www.figma.com/api/mcp/asset/50fbbeec-5dbd-4d1d-92fb-db1676ff6837',
    imageAlt: 'Content Manager Metadata Generation',
  },
]

const smallCaseStudies = [
  {
    title: 'Aptia Website',
    category: 'Employee Pension and Health Benefits Administration',
    description:
      "Designed Aptia Group's website to deliver a seamless, intuitive experience, improving navigation clarity and driving stronger user engagement.",
    image: 'https://www.figma.com/api/mcp/asset/41b378de-9847-4be4-a542-97827e20b61d',
    imageAlt: 'Aptia Website',
  },
  {
    title: 'Flyin Travel & Tourism',
    category: 'Website & App',
    description:
      "Revamped Flyin Travel's platform into a unified, user-centric experience. Improved usability and streamlined key user flows. Enabled seamless, personalized trip planning.",
    image: 'https://www.figma.com/api/mcp/asset/82481d23-1c0c-4925-b045-28fe2f8e0cc6',
    imageAlt: 'Flyin Travel & Tourism',
  },
  {
    title: 'CivTech Menopause care',
    category: 'Concept Generation',
    description:
      'Built a comprehensive digital platform for menopause, offering personalized resources and community support for a more guided, user-centric experience.',
    image: 'https://www.figma.com/api/mcp/asset/16d7377f-f6b8-4ab5-89db-271aa2253a91',
    imageAlt: 'CivTech Menopause care',
  },
  {
    title: 'Vet & Rider Wellness Platform',
    category: 'Website and App design',
    description:
      'Built a platform connecting veterinarians and horse riders through data-driven insights and remote healthcare, enabling smarter, more accessible care.',
    image: 'https://www.figma.com/api/mcp/asset/6ab04822-f8c4-4739-8b76-a29b9c2d226f',
    imageAlt: 'Vet & Rider Wellness Platform',
  },
]

export default function CaseStudiesSection() {
  return (
    <section id="work" className="border-t border-black/5 pt-14 md:pt-20 xl:pt-24 pb-10 md:pb-14 xl:pb-16">
      <Container className="flex flex-col gap-12 md:gap-16 xl:gap-20">

        {/* Section heading */}
        <AnimateIn>
          <div className="flex items-start md:items-end justify-between border-b border-black/8 pb-4 md:pb-5 gap-4">
            <h2 className="font-cormorant font-medium text-[22px] md:text-[26px] xl:text-[30px] text-stone-ink leading-[1.2] tracking-[-0.6px]">
              Selected work solving complex product and AI-driven challenges
            </h2>
            <span className="font-instrument text-stone-muted text-[10px] md:text-[11px] tracking-[1.2px] uppercase shrink-0 md:mb-1">
              03 case studies
            </span>
          </div>
        </AnimateIn>

        {/* Large case study cards */}
        <div className="flex flex-col gap-14 md:gap-16 xl:gap-20">
          {largeCaseStudies.map((study, i) => (
            <AnimateIn key={study.title} delay={i * 75}>
              <CaseStudyCard {...study} />
            </AnimateIn>
          ))}
        </div>

        {/* More Work divider */}
        <AnimateIn>
          <div className="border-t border-black/8 pt-6 md:pt-8">
            <span className="font-instrument font-medium text-[12px] text-stone-mid tracking-[1px] uppercase">
              More Work →
            </span>
          </div>
        </AnimateIn>

        {/* Small cards 2×2 grid — 1 col mobile, 2 col md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-16">
          {smallCaseStudies.map((study, i) => (
            <AnimateIn key={study.title} className="h-full" delay={i * 75}>
              <SmallCaseStudyCard {...study} />
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn>
          <CTASection />
        </AnimateIn>
      </Container>
    </section>
  )
}
