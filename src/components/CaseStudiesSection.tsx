import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from './Container'
import CaseStudyCard from './CaseStudyCard'
import SmallCaseStudyCard from './SmallCaseStudyCard'
import CTASection from './CTASection'
import AnimateIn from './AnimateIn'
import PasswordModal from './PasswordModal'

/* ─── Types ─── */
type InternalStudy = {
  type: 'internal'
  route: string
  title: string
  date: string
  description: string
  image: string
  imageAlt: string
}

type ExternalStudy = {
  type: 'external'
  figmaUrl: string
  title: string
  date: string
  description: string
  image: string
  imageAlt: string
}

type LargeStudy = InternalStudy | ExternalStudy

type SmallInternalStudy = {
  type: 'internal'
  route: string
  title: string
  category: string
  description: string
  image: string
  imageAlt: string
}

type SmallExternalStudy = {
  type: 'external'
  figmaUrl: string
  title: string
  category: string
  description: string
  image: string
  imageAlt: string
}

type SmallStudy = SmallInternalStudy | SmallExternalStudy

/* ─── Large case study data ─── */
const largeCaseStudies: LargeStudy[] = [
  {
    type: 'internal',
    route: '/work/cornerstone',
    title: 'AI-powered enterprise search redesign → enabling faster decision making at scale',
    date: 'July 2022 - May 2023',
    description:
      'Improved task efficiency across 4000+ pages by redesigning navigation with AI-powered, persona-based search and contextual pinning, reducing friction and enabling faster, action-oriented workflows.',
    image: 'https://www.figma.com/api/mcp/asset/8f726510-85a4-4c7e-a721-a874b4f434fc',
    imageAlt: 'AI-powered enterprise search redesign',
  },
  {
    type: 'external',
    figmaUrl: 'https://www.figma.com/proto/DxM23ZXWyKbUcrz0i5ef90/Vimala-Banavath-Portfolio?page-id=187%3A16344&node-id=187-19899&viewport=552%2C1569%2C0.11&t=7p323AFE3PhinXty-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=187%3A19899',
    title: 'U&UST Intranet',
    date: 'July 2022 - May 2023',
    description:
      "Unified UST's fragmented intranet into a single, intuitive platform, eliminating silos and improving employee efficiency through research-driven workflows and seamless tool access.",
    image: 'https://www.figma.com/api/mcp/asset/ec3b4a15-c4e6-4db1-98e3-925b630b19d1',
    imageAlt: 'U&UST Intranet',
  },
  {
    type: 'external',
    figmaUrl: 'PASTE_METADATA_FIGMA_LINK_HERE',
    title: 'Content Manager Metadata Generation, Translation',
    date: 'July 2022 - May 2023',
    description:
      'Improved search accuracy and content discoverability by introducing AI-powered metadata generation, strengthening taxonomy and information architecture across the platform.',
    image: 'https://www.figma.com/api/mcp/asset/50fbbeec-5dbd-4d1d-92fb-db1676ff6837',
    imageAlt: 'Content Manager Metadata Generation',
  },
]

/* ─── Small case study data ─── */
const smallCaseStudies: SmallStudy[] = [
  {
    type: 'external',
    figmaUrl: 'https://www.figma.com/proto/DxM23ZXWyKbUcrz0i5ef90/Vimala-Banavath-Portfolio?page-id=50%3A2072&node-id=69-909&viewport=1542%2C13%2C0.07&t=gKJll47Zv6TSyzbl-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=69%3A909',
    title: 'Aptia Website',
    category: 'Employee Pension and Health Benefits Administration',
    description:
      "Designed Aptia Group's website to deliver a seamless, intuitive experience, improving navigation clarity and driving stronger user engagement.",
    image: 'https://www.figma.com/api/mcp/asset/41b378de-9847-4be4-a542-97827e20b61d',
    imageAlt: 'Aptia Website',
  },
  {
    type: 'external',
    figmaUrl: 'https://www.figma.com/proto/DxM23ZXWyKbUcrz0i5ef90/Vimala-Banavath-Portfolio?page-id=50%3A2075&type=design&node-id=83-29753&t=ca7sjBKI6iJvyMCt-0&scaling=scale-down-width',
    title: 'Flyin Travel & Tourism',
    category: 'Website & App',
    description:
      "Revamped Flyin Travel's platform into a unified, user-centric experience. Improved usability and streamlined key user flows. Enabled seamless, personalized trip planning.",
    image: 'https://www.figma.com/api/mcp/asset/82481d23-1c0c-4925-b045-28fe2f8e0cc6',
    imageAlt: 'Flyin Travel & Tourism',
  },
  {
    type: 'external',
    figmaUrl: 'https://www.figma.com/proto/DxM23ZXWyKbUcrz0i5ef90/Vimala-Banavath-Portfolio?page-id=50%3A2073&type=design&node-id=50-2077&t=ca7sjBKI6iJvyMCt-0&scaling=scale-down-width&starting-point-node-id=50%3A2077',
    title: 'CivTech Menopause care',
    category: 'Concept Generation',
    description:
      'Built a comprehensive digital platform for menopause, offering personalized resources and community support for a more guided, user-centric experience.',
    image: 'https://www.figma.com/api/mcp/asset/16d7377f-f6b8-4ab5-89db-271aa2253a91',
    imageAlt: 'CivTech Menopause care',
  },
  {
    type: 'external',
    figmaUrl: 'PASTE_VET_FIGMA_LINK_HERE',
    title: 'Vet & Rider Wellness Platform',
    category: 'Website and App design',
    description:
      'Built a platform connecting veterinarians and horse riders through data-driven insights and remote healthcare, enabling smarter, more accessible care.',
    image: 'https://www.figma.com/api/mcp/asset/6ab04822-f8c4-4739-8b76-a29b9c2d226f',
    imageAlt: 'Vet & Rider Wellness Platform',
  },
]

/* ─── Wrapper helpers ─── */
function LargeCardWrapper({ study, children, onOpenModal }: { study: LargeStudy; children: React.ReactNode; onOpenModal: (label: string, figmaUrl: string) => void }) {
  if (study.type === 'internal') {
    return (
      <Link to={study.route} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        {children}
      </Link>
    )
  }
  return (
    <div
      onClick={() => onOpenModal(study.title, study.figmaUrl)}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </div>
  )
}

function SmallCardWrapper({ study, children, onOpenModal }: { study: SmallStudy; children: React.ReactNode; onOpenModal: (label: string, figmaUrl: string) => void }) {
  if (study.type === 'internal') {
    return (
      <Link to={study.route} style={{ display: 'block', textDecoration: 'none', color: 'inherit', height: '100%' }}>
        {children}
      </Link>
    )
  }
  return (
    <div
      onClick={() => onOpenModal(study.title, study.figmaUrl)}
      style={{ cursor: 'pointer', height: '100%' }}
    >
      {children}
    </div>
  )
}

export default function CaseStudiesSection() {
  const [modal, setModal] = useState<{ label: string; figmaUrl: string } | null>(null)

  const openModal = (label: string, figmaUrl: string) => setModal({ label, figmaUrl })
  const closeModal = () => setModal(null)

  return (
    <section id="work" className="border-t border-black/5 pt-14 md:pt-20 xl:pt-24 pb-10 md:pb-14 xl:pb-16">
      {modal && <PasswordModal label={modal.label} figmaUrl={modal.figmaUrl} onClose={closeModal} />}
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
              <LargeCardWrapper study={study} onOpenModal={openModal}>
                <CaseStudyCard
                  title={study.title}
                  date={study.date}
                  description={study.description}
                  image={study.image}
                  imageAlt={study.imageAlt}
                />
              </LargeCardWrapper>
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
              <SmallCardWrapper study={study} onOpenModal={openModal}>
                <SmallCaseStudyCard
                  title={study.title}
                  category={study.category}
                  description={study.description}
                  image={study.image}
                  imageAlt={study.imageAlt}
                />
              </SmallCardWrapper>
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
