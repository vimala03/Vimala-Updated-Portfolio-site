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

/* ─── Contact info (used in NDA mailto / WhatsApp) ─── */
const CONTACT_EMAIL    = 'vimalabanavath.design@gmail.com'
const CONTACT_WHATSAPP = '918886090063'

/* ─── Types ─── */
type InternalStudy = {
  type:      'internal'
  route:     string
  figmaUrl?: string   // when set → password modal instead of Link
  password?: string   // required when figmaUrl is set; defaults to GLOBAL_PASSWORD
  nda?:      boolean  // when true → bypass modal, show request-access overlay
  title:     string
  date:      string
  description: string
  image:     string
  imageAlt:  string
}

type ExternalStudy = {
  type:     'external'
  figmaUrl: string
  password: string
  nda?:     boolean   // when true → bypass modal, show request-access overlay
  title:    string
  date:     string
  description: string
  image:    string
  imageAlt: string
}

type LargeStudy = InternalStudy | ExternalStudy

type SmallExternalStudy = {
  type:     'external'
  figmaUrl: string
  password: string
  nda?:     boolean
  title:    string
  category: string
  description: string
  image:    string
  imageAlt: string
}

type SmallStudy = SmallExternalStudy

/* ─── Large case study data ─── */
const largeCaseStudies: LargeStudy[] = [
  {
    type:     'internal',
    route:    '/work/cornerstone',
    figmaUrl: 'PASTE_CORNERSTONE_FIGMA_URL_HERE', // ← replace with real Figma prototype link
    password: GLOBAL_PASSWORD,
    nda:      true,
    title:    'AI-powered enterprise search redesign → enabling faster decision making at scale',
    date:     'July 2022 - May 2023',
    description:
      'Improved task efficiency across 4000+ pages by redesigning navigation with AI-powered, persona-based search and contextual pinning, reducing friction and enabling faster, action-oriented workflows.',
    image:    'https://www.figma.com/api/mcp/asset/ffba970a-d029-4636-8336-63e4042892cb',
    imageAlt: 'AI-powered enterprise search redesign',
  },
  {
    type:     'external',
    figmaUrl: 'https://www.figma.com/proto/DxM23ZXWyKbUcrz0i5ef90/Vimala-Banavath-Portfolio?page-id=187%3A16344&node-id=187-19899&viewport=552%2C1569%2C0.11&t=7p323AFE3PhinXty-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=187%3A19899',
    password: GLOBAL_PASSWORD,
    title:    'U&UST Intranet',
    date:     'July 2022 - May 2023',
    description:
      "Unified UST's fragmented intranet into a single, intuitive platform, eliminating silos and improving employee efficiency through research-driven workflows and seamless tool access.",
    image:    'https://www.figma.com/api/mcp/asset/ca0563c4-80b2-40b2-9d64-f7cdb7ae2ab2',
    imageAlt: 'U&UST Intranet',
  },
  {
    type:     'external',
    figmaUrl: 'PASTE_METADATA_FIGMA_LINK_HERE',
    password: GLOBAL_PASSWORD,
    nda:      true,   // ← NDA: bypass modal, show request-access overlay
    title:    'Content Manager Metadata Generation, Translation',
    date:     'July 2022 - May 2023',
    description:
      'Improved search accuracy and content discoverability by introducing AI-powered metadata generation, strengthening taxonomy and information architecture across the platform.',
    image:    'https://www.figma.com/api/mcp/asset/8fedfefe-ebcf-4f20-a4f4-35d8762f0d0a',
    imageAlt: 'Content Manager Metadata Generation',
  },
]

/* ─── Small case study data ─── */
const smallCaseStudies: SmallStudy[] = [
  {
    type:     'external',
    figmaUrl: 'https://www.figma.com/proto/DxM23ZXWyKbUcrz0i5ef90/Vimala-Banavath-Portfolio?page-id=50%3A2072&node-id=69-909&viewport=1542%2C13%2C0.07&t=gKJll47Zv6TSyzbl-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=69%3A909',
    password: GLOBAL_PASSWORD,
    title:    'Aptia Website',
    category: 'Employee Pension and Health Benefits Administration',
    description:
      "Designed Aptia Group's website to deliver a seamless, intuitive experience, improving navigation clarity and driving stronger user engagement.",
    image:    'https://www.figma.com/api/mcp/asset/40770304-9e43-4dab-baf6-091bd0a588ae',
    imageAlt: 'Aptia Website',
  },
  {
    type:     'external',
    figmaUrl: 'https://www.figma.com/proto/DxM23ZXWyKbUcrz0i5ef90/Vimala-Banavath-Portfolio?page-id=50%3A2075&type=design&node-id=83-29753&t=ca7sjBKI6iJvyMCt-0&scaling=scale-down-width',
    password: GLOBAL_PASSWORD,
    title:    'Flyin Travel & Tourism',
    category: 'Website & App',
    description:
      "Revamped Flyin Travel's platform into a unified, user-centric experience. Improved usability and streamlined key user flows. Enabled seamless, personalized trip planning.",
    image:    'https://www.figma.com/api/mcp/asset/ca51e43b-bc71-4234-93b8-28e0ba08d1c5',
    imageAlt: 'Flyin Travel & Tourism',
  },
  {
    type:     'external',
    figmaUrl: 'https://www.figma.com/proto/DxM23ZXWyKbUcrz0i5ef90/Vimala-Banavath-Portfolio?page-id=50%3A2073&type=design&node-id=50-2077&t=ca7sjBKI6iJvyMCt-0&scaling=scale-down-width&starting-point-node-id=50%3A2077',
    password: GLOBAL_PASSWORD,
    title:    'CivTech Menopause care',
    category: 'Concept Generation',
    description:
      'Built a comprehensive digital platform for menopause, offering personalized resources and community support for a more guided, user-centric experience.',
    image:    'https://www.figma.com/api/mcp/asset/a5faf91a-c522-4a43-8894-4c9eb1d42a0a',
    imageAlt: 'CivTech Menopause care',
  },
  {
    type:     'external',
    figmaUrl: 'PASTE_VET_FIGMA_LINK_HERE', // ← replace with real Figma prototype link
    password: GLOBAL_PASSWORD,
    nda:      true,
    title:    'Vet & Rider Wellness Platform',
    category: 'Website and App design',
    description:
      'Built a platform connecting veterinarians and horse riders through data-driven insights and remote healthcare, enabling smarter, more accessible care.',
    image:    'https://www.figma.com/api/mcp/asset/f81cf3d1-45c5-4800-be59-a1776457c47d',
    imageAlt: 'Vet & Rider Wellness Platform',
  },
]

/* ─── NDA hover overlay ────────────────────────────────────────
   Rendered inside a `group relative` wrapper. Invisible by
   default; fades in on hover while the card content fades out.
   Pointer-events are disabled until hover so the card beneath
   can still be scrolled past normally.
─────────────────────────────────────────────────────────────── */
function NdaHoverOverlay({ title }: { title: string }) {
  const requestUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Case Study Access Request — ${title}`,
  )}&body=${encodeURIComponent(
    `Hi Vimala,\n\nI'd like to view your NDA-protected case study: "${title}".\n\nLooking forward to connecting.`,
  )}`

  const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(
    `Hi Vimala, I'd like to view your NDA case study: "${title}"`,
  )}`

  return (
    <div
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '14px',
        padding:        '32px 24px',
        textAlign:      'center',
      }}
    >
      {/* Lock icon */}
      <span style={{ fontSize: '22px', lineHeight: 1 }} aria-hidden>🔒</span>

      {/* NDA notice */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={{
          fontFamily:    "'Inter', sans-serif",
          fontSize:      '14px',
          fontWeight:    600,
          color:         '#18181b',
          margin:        0,
          letterSpacing: '-0.01em',
        }}>
          Case study available on request
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize:   '12px',
          color:      'rgba(24,24,27,0.48)',
          margin:     0,
        }}>
          Due to NDA, access is restricted
        </p>
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '4px' }}>
        <a
          href={requestUrl}
          style={{
            padding:        '9px 18px',
            borderRadius:   '6px',
            background:     '#18181b',
            color:          '#ffffff',
            fontFamily:     "'Inter', sans-serif",
            fontSize:       '12px',
            fontWeight:     500,
            cursor:         'pointer',
            letterSpacing:  '-0.01em',
            textDecoration: 'none',
            display:        'inline-block',
            transition:     'opacity 0.15s',
            border:         'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Request access →
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding:        '9px 18px',
            borderRadius:   '6px',
            border:         '1px solid rgba(24,24,27,0.16)',
            background:     'transparent',
            color:          'rgba(24,24,27,0.58)',
            fontFamily:     "'Inter', sans-serif",
            fontSize:       '12px',
            fontWeight:     500,
            cursor:         'pointer',
            letterSpacing:  '-0.01em',
            textDecoration: 'none',
            display:        'inline-block',
            transition:     'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(24,24,27,0.30)'
            e.currentTarget.style.color       = '#18181b'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(24,24,27,0.16)'
            e.currentTarget.style.color       = 'rgba(24,24,27,0.58)'
          }}
        >
          WhatsApp
        </a>
      </div>
    </div>
  )
}

/* ─── Click wrappers ─────────────────────────────────────────── */
type ModalPayload = { label: string; figmaUrl: string; password: string }
type OpenModal    = (payload: ModalPayload) => void

function LargeCardWrapper({
  study, children, onOpenModal,
}: { study: LargeStudy; children: React.ReactNode; onOpenModal: OpenModal }) {
  // NDA: show card normally; fade + reveal CTA overlay on hover; no click action
  if (study.nda) {
    return (
      <div className="group relative" style={{ cursor: 'default' }}>
        {/* Card fades on hover */}
        <div style={{ transition: 'opacity 300ms ease' }} className="group-hover:opacity-20">
          {children}
        </div>
        {/* Overlay: invisible + inert by default, visible + interactive on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
          style={{ transition: 'opacity 300ms ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <NdaHoverOverlay title={study.title} />
        </div>
      </div>
    )
  }
  // Internal + figmaUrl → password modal → Figma prototype
  if (study.type === 'internal' && study.figmaUrl) {
    return (
      <div
        onClick={() => onOpenModal({ label: study.title, figmaUrl: study.figmaUrl!, password: study.password ?? GLOBAL_PASSWORD })}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </div>
    )
  }
  // Internal, no figmaUrl → direct navigation (fallback)
  if (study.type === 'internal') {
    return (
      <Link to={study.route} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        {children}
      </Link>
    )
  }
  // External → password modal → Figma prototype
  return (
    <div
      onClick={() => onOpenModal({ label: study.title, figmaUrl: study.figmaUrl, password: study.password })}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </div>
  )
}

function SmallCardWrapper({
  study, children, onOpenModal,
}: { study: SmallStudy; children: React.ReactNode; onOpenModal: OpenModal }) {
  // NDA: hover reveals CTA overlay, no click action
  if (study.nda) {
    return (
      <div className="group relative h-full" style={{ cursor: 'default' }}>
        <div style={{ transition: 'opacity 300ms ease', height: '100%' }} className="group-hover:opacity-20">
          {children}
        </div>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
          style={{ transition: 'opacity 300ms ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <NdaHoverOverlay title={study.title} />
        </div>
      </div>
    )
  }
  return (
    <div
      onClick={() => onOpenModal({ label: study.title, figmaUrl: study.figmaUrl, password: study.password })}
      style={{ cursor: 'pointer', height: '100%' }}
    >
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
