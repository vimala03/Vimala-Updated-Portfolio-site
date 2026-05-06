import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from './Container'
import CaseStudyCard from './CaseStudyCard'
import SmallCaseStudyCard from './SmallCaseStudyCard'
import CTASection from './CTASection'
import AnimateIn from './AnimateIn'
import PasswordModal from './PasswordModal'

/* ─── Global password ─── */
const GLOBAL_PASSWORD = 'designedbyvimala'

/* ─── Contact info ─── */
const CONTACT_EMAIL    = 'vimalabanavath.design@gmail.com'
const CONTACT_WHATSAPP = '918886090063'

/* ─── Types ─── */
type InternalLargeStudy = {
  type:      'internal'
  route:     string
  nda?:      boolean
  title:     string
  date:      string
  description: string
  image:     string
  imageAlt:  string
  cardBg?:   string
}

type ExternalLargeStudy = {
  type:     'external'
  figmaUrl: string
  password: string
  nda?:     boolean
  title:    string
  date:     string
  description: string
  image:    string
  imageAlt: string
  cardBg?:  string
}

type LargeStudy = InternalLargeStudy | ExternalLargeStudy

type InternalSmallStudy = {
  type:     'internal'
  route:    string
  nda?:     boolean
  title:    string
  category: string
  description: string
  image:    string
  imageAlt: string
  cardBg?:  string
}

type ExternalSmallStudy = {
  type:     'external'
  figmaUrl: string
  password: string
  nda?:     boolean
  title:    string
  category: string
  description: string
  image:    string
  imageAlt: string
  cardBg?:  string
}

type SmallStudy = InternalSmallStudy | ExternalSmallStudy

/* ─── Large case study data ─── */
const largeCaseStudies: LargeStudy[] = [
  {
    type:     'internal',
    route:    '/work/cornerstone',
    title:    'AI-powered enterprise search redesign → enabling faster decision making at scale',
    date:     'July 2024 – Sept 2025',
    description:
      'Improved task efficiency across 4000+ pages by redesigning navigation with AI-powered, persona-based search and contextual pinning, reducing friction and enabling faster, action-oriented workflows.',
    image:    '/images/case-studies/aisearch.jpeg',
    imageAlt: 'AI-powered enterprise search redesign',
    cardBg:   '#dce8f5',
  },
  {
    type:     'internal',
    route:    '/work/ust',
    title:    'U&UST Intranet',
    date:     'July 2022 – May 2023',
    description:
      "Unified UST's fragmented intranet into a single, intuitive platform, eliminating silos and improving employee efficiency through research-driven workflows and seamless tool access.",
    image:    '/images/case-studies/ust.jpeg',
    imageAlt: 'U&UST Intranet',
    cardBg:   '#e8e6df',
  },
  {
    type:     'external',
    figmaUrl: 'PASTE_METADATA_FIGMA_LINK_HERE',
    password: GLOBAL_PASSWORD,
    nda:      true,
    title:    'Content Manager Metadata Generation, Translation',
    date:     'July 2024 – Sept 2025',
    description:
      'Improved search accuracy and content discoverability by introducing AI-powered metadata generation, strengthening taxonomy and information architecture across the platform.',
    image:    '/images/case-studies/csx.jpeg',
    imageAlt: 'Content Manager Metadata Generation',
    cardBg:   '#dce8f5',
  },
]

/* ─── Small case study data ─── */
const smallCaseStudies: SmallStudy[] = [
  {
    type:     'internal',
    route:    '/work/aptia',
    title:    'Aptia Website',
    category: 'Employee Pension and Health Benefits Administration',
    description:
      "Designed Aptia Group's website to deliver a seamless, intuitive experience, improving navigation clarity and driving stronger user engagement.",
    image:    '/images/case-studies/aptia.jpeg',
    imageAlt: 'Aptia Website',
    cardBg:   '#e3d8f2',
  },
  {
    type:     'internal',
    route:    '/work/flyin',
    title:    'Flyin Travel & Tourism',
    category: 'Website & App',
    description:
      "Revamped Flyin Travel's platform into a unified, user-centric experience. Improved usability and streamlined key user flows. Enabled seamless, personalized trip planning.",
    image:    '/images/case-studies/flyin.jpeg',
    imageAlt: 'Flyin Travel & Tourism',
    cardBg:   '#d4ece3',
  },
  {
    type:     'internal',
    route:    '/work/civtech',
    title:    'CivTech Menopause care',
    category: 'Concept Generation',
    description:
      'Built a comprehensive digital platform for menopause, offering personalized resources and community support for a more guided, user-centric experience.',
    image:    '/images/case-studies/civtech.jpeg',
    imageAlt: 'CivTech Menopause care',
    cardBg:   '#ede1d0',
  },
  {
    type:     'internal',
    route:    '/work/vet-rider',
    nda:      true,
    title:    'Vet & Rider Wellness Platform',
    category: 'Website and App design',
    description:
      'Built a platform connecting veterinarians and horse riders through data-driven insights and remote healthcare, enabling smarter, more accessible care.',
    image:    '/images/case-studies/consteed.jpeg',
    imageAlt: 'Vet & Rider Wellness Platform',
    cardBg:   '#d4e8f2',
  },
]

/* ─── Shared URL builder ─── */
function ndaUrls(title: string) {
  const requestUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Case Study Access Request — ${title}`,
  )}&body=${encodeURIComponent(
    `Hi Vimala,\n\nI'd like to view your NDA-protected case study: "${title}".\n\nLooking forward to connecting.`,
  )}`
  const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(
    `Hi Vimala, I'd like to view your NDA case study: "${title}"`,
  )}`
  return { requestUrl, whatsappUrl }
}

/* ─── Mobile NDA strip ─── */
function MobileNdaStrip({ title }: { title: string }) {
  const { requestUrl, whatsappUrl } = ndaUrls(title)
  return (
    <div
      className="flex md:hidden items-center justify-between flex-wrap gap-3 mt-3 px-4 py-3 rounded-lg"
      style={{ background: 'rgba(24,24,27,0.03)', border: '1px solid rgba(24,24,27,0.07)' }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span aria-hidden style={{ fontSize: '13px', flexShrink: 0 }}>🔒</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(24,24,27,0.48)', lineHeight: 1.4 }}>
          Case study available on request
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a href={requestUrl} style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: '#ffffff', textDecoration: 'none', padding: '6px 14px', borderRadius: '5px', background: '#18181b', display: 'inline-block', whiteSpace: 'nowrap' }}>
          Request →
        </a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: 'rgba(24,24,27,0.55)', textDecoration: 'none', padding: '6px 14px', borderRadius: '5px', border: '1px solid rgba(24,24,27,0.14)', display: 'inline-block', whiteSpace: 'nowrap' }}>
          WhatsApp
        </a>
      </div>
    </div>
  )
}

/* ─── NDA hover overlay ─── */
function NdaHoverOverlay({ title }: { title: string }) {
  const { requestUrl, whatsappUrl } = ndaUrls(title)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '32px 24px', textAlign: 'center' }}>
      <span style={{ fontSize: '22px', lineHeight: 1 }} aria-hidden>🔒</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, color: '#18181b', margin: 0, letterSpacing: '-0.01em' }}>
          Case study available on request
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(24,24,27,0.48)', margin: 0 }}>
          Due to NDA, access is restricted
        </p>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '4px' }}>
        <a href={requestUrl} style={{ padding: '9px 18px', borderRadius: '6px', background: '#18181b', color: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, cursor: 'pointer', letterSpacing: '-0.01em', textDecoration: 'none', display: 'inline-block', transition: 'opacity 0.15s', border: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          Request access →
        </a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '9px 18px', borderRadius: '6px', border: '1px solid rgba(24,24,27,0.16)', background: 'transparent', color: 'rgba(24,24,27,0.58)', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, cursor: 'pointer', letterSpacing: '-0.01em', textDecoration: 'none', display: 'inline-block', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(24,24,27,0.30)'; e.currentTarget.style.color = '#18181b' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(24,24,27,0.16)'; e.currentTarget.style.color = 'rgba(24,24,27,0.58)' }}>
          WhatsApp
        </a>
      </div>
    </div>
  )
}

/* ─── Click wrappers ─── */
type ModalPayload = { label: string; figmaUrl: string; password: string }
type OpenModal    = (payload: ModalPayload) => void

function LargeCardWrapper({ study, children, onOpenModal }: { study: LargeStudy; children: React.ReactNode; onOpenModal: OpenModal }) {
  // External NDA → hover overlay, no modal
  if (study.nda && study.type === 'external') {
    return (
      <div>
        <div className="group relative" style={{ cursor: 'default' }}>
          <div style={{ transition: 'opacity 300ms ease' }} className="md:group-hover:opacity-20">{children}</div>
          <div className="hidden md:flex absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto items-center justify-center" style={{ transition: 'opacity 300ms ease' }}>
            <NdaHoverOverlay title={study.title} />
          </div>
        </div>
        <MobileNdaStrip title={study.title} />
      </div>
    )
  }
  // Internal → navigate directly to page (overview page has the CTA for Figma/password)
  if (study.type === 'internal') {
    return (
      <Link to={study.route} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        {children}
      </Link>
    )
  }
  // External → password modal
  return (
    <div onClick={() => onOpenModal({ label: study.title, figmaUrl: study.figmaUrl, password: study.password })} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  )
}

function SmallCardWrapper({ study, children, onOpenModal }: { study: SmallStudy; children: React.ReactNode; onOpenModal: OpenModal }) {
  // Internal → navigate to page directly
  if (study.type === 'internal') {
    return (
      <Link to={study.route} style={{ display: 'block', height: '100%', textDecoration: 'none', color: 'inherit' }}>
        {children}
      </Link>
    )
  }
  // External NDA → overlay
  if (study.nda) {
    return (
      <div className="h-full flex flex-col">
        <div className="group relative flex-1" style={{ cursor: 'default' }}>
          <div style={{ transition: 'opacity 300ms ease', height: '100%' }} className="md:group-hover:opacity-20">{children}</div>
          <div className="hidden md:flex absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto items-center justify-center" style={{ transition: 'opacity 300ms ease' }}>
            <NdaHoverOverlay title={study.title} />
          </div>
        </div>
        <MobileNdaStrip title={study.title} />
      </div>
    )
  }
  // External → modal
  return (
    <div onClick={() => onOpenModal({ label: study.title, figmaUrl: study.figmaUrl, password: study.password })} style={{ cursor: 'pointer', height: '100%' }}>
      {children}
    </div>
  )
}

/* ─── Section ─── */
export default function CaseStudiesSection() {
  const [modal, setModal] = useState<ModalPayload | null>(null)

  const openModal  = (payload: ModalPayload) => setModal(payload)
  const closeModal = () => setModal(null)

  return (
    <section id="work" className="border-t border-black/5 pt-14 md:pt-20 xl:pt-24 pb-10 md:pb-14 xl:pb-16">

      {modal && (
        <PasswordModal
          label={modal.label}
          figmaUrl={modal.figmaUrl}
          password={modal.password}
          onClose={closeModal}
        />
      )}

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
                  cardBg={study.cardBg}
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

        {/* Small cards 2×2 grid */}
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
                  cardBg={study.cardBg}
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
