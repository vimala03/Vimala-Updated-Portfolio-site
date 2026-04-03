import { useState, useEffect, useRef, useCallback } from 'react'

// ── Figma assets ─────────────────────────────────────────────
const IMG_EXP = 'https://www.figma.com/api/mcp/asset/60e8b3b3-69b6-4eae-9d96-082367a3196c'
const IMG_EDU = 'https://www.figma.com/api/mcp/asset/cc9279ac-1cc2-4fad-89e0-eb051d32fa4c'

// ── Types ────────────────────────────────────────────────────
type Tab = 'experience' | 'education'

interface Entry {
  date: string
  company: string
  role: string
  description?: string
  bullets?: string[]
  tags: string[]
}

// ── Data ─────────────────────────────────────────────────────
const experienceEntries: Entry[] = [
  {
    date: 'JULY 2024 – SEPT 2025 · HYDERABAD',
    company: 'Cornerstone OnDemand',
    role: 'Senior Product Designer',
    description:
      'Led AI-driven product design for enterprise LMS. Integrated Apollo AI for metadata generation, multilingual translation, and session continuity across 4,000+ admin pages. Reduced support cases by 15K annually and cut admin time by 91%.',
    tags: ['AI/ML UX', 'ENTERPRISE SAAS', 'DESIGN SYSTEMS', 'LMS/LXP/Galaxy AI'],
  },
  {
    date: 'OCT 2022 – JULY 2024 · BANGALORE',
    company: 'Moonraft – UST Global',
    role: 'Lead UX Designer',
    bullets: [
      'Led end-to-end UX for Vet & Rider apps in a product based project at Continental.',
      'Handled social impact competition deliverables, including research and storytelling.',
      'Aligned business strategy, research, and design to drive measurable outcomes.',
      'Partnered with stakeholders on IA, interactions, and system-level patterns.',
    ],
    tags: ['ENTERPRISE SAAS', 'FINTECH', 'DESIGN OPS', 'DESIGN SYSTEMS', 'HEALTH TECH', 'AGILE', 'AI'],
  },
  {
    date: '2022 – PRESENT · HYDERABAD',
    company: 'Youclean Laundry',
    role: 'Founder',
    description:
      'Built an eco-friendly laundry service with an emphasis on customer satisfaction, operational clarity, and repeatable experience design. Pioneered sustainable practices and cutting-edge technologies to revolutionise the sector.',
    tags: ['ENTREPRENEURSHIP', 'OPERATIONS', 'Brand/UX', 'SUSTAINABILITY'],
  },
  {
    date: '2020 – 2022 · HYDERABAD',
    company: 'Chandamama Group',
    role: 'Product Designer',
    description:
      'Orchestrated creation of user centered digital solutions and improved end-to-end patient experience. Designed intuitive interfaces adhering to healthcare regulatory requirements.',
    tags: ['HEALTHCARE UX', 'PATIENT EXPERIENCE', 'Visual Design'],
  },
  {
    date: '2016 – 2018 · HYDERABAD',
    company: 'Flyin',
    role: 'User Experience Lead',
    description:
      'Led redesign of search and discovery with AI-powered intent prediction. Reduced search abandonment by 35%, increased booking conversion by 28%, and drove App Store rating from 3.2★ to 4.4★.',
    tags: ['TRAVEL TECH', 'AI SEARCH', 'MOBILE UX'],
  },
  {
    date: 'Aug 2015 – Jul 2016 · HYDERABAD',
    company: 'Cyber Gaming Software Technologies',
    role: 'UX Designer',
    description:
      'Designed player-centric UI/UX, optimising gameplay flows to enhance engagement, usability, and overall user experience.',
    tags: ['Gaming TECH', 'Visual design', 'MOBILE UX'],
  },
  {
    date: 'Jun 2015 – Dec 2015 · Gurgaon',
    company: 'Buildzar',
    role: 'UX Design Trainee',
    description: 'Translated business needs into clear visual and functional requirements.',
    tags: ['Brand/Graphic Design', 'Construction UX'],
  },
]

const educationEntries: Entry[] = [
  {
    date: '2024 – 2025 · HYDERABAD',
    company: 'Indian School of Business (ISB)',
    role: 'Professional Certificate in Digital Marketing',
    bullets: [
      'Built a 360° understanding of digital marketing across SEO, SEM, content, social media, and analytics focusing on end-to-end customer journeys and growth funnels.',
      'Applied AI and Generative AI tools for campaign optimisation, content creation, and data-driven decision-making in modern marketing workflows.',
      'Worked on real-world projects and simulations to design performance-driven campaigns, improving conversion, engagement, and measurable business outcomes.',
    ],
    tags: ['Business Thinking', 'AI Relevance', 'Execution Ability'],
  },
  {
    date: '2022 – 2024 · HYDERABAD',
    company: 'Dr. B.R. Ambedkar Open University (BRAOU)',
    role: 'M.Sc. in Psychology',
    bullets: [
      'Building a deep understanding of human cognition, decision-making, and behavioral patterns to design more intuitive and user-centered digital experiences.',
      'Applying psychological principles such as cognitive load, motivation, and perception to improve usability, engagement, and interaction design.',
      'Bridging psychology with product design to create systems that are not only functional but also empathetic, persuasive, and aligned with real user needs.',
    ],
    tags: ['Behavioral Psychology', 'Decision Making', 'Cognitive Load', 'Mental Models', 'Persuasive Design'],
  },
  {
    date: '2013 – 2015 · New Delhi',
    company: 'IIT Delhi',
    role: 'M.Des (Industrial Design) · Teaching Assistant',
    bullets: [
      'Developed strong foundations in design thinking, systems design, and human-centered problem solving across physical and digital products.',
      'Explored end-to-end product development from research and ideation to prototyping and usability validation.',
      'Built the ability to design for complex systems by balancing functionality, usability, and real-world constraints.',
    ],
    tags: ['Industrial Design', 'Design Thinking', 'Prototyping', 'Human-Centered Design', 'Interaction Design'],
  },
  {
    date: '2020 – 2022 · HYDERABAD',
    company: 'IARE, JNTU',
    role: 'B.Tech (Aeronautical Engineering)',
    bullets: [
      'Built a strong analytical and problem-solving foundation through engineering principles, systems thinking, and complex problem modelling.',
      'Developed a structured approach to breaking down complex systems, optimising performance, and working within constraints.',
      'Gained discipline in precision, technical rigor, and logical thinking — now applied to designing scalable product systems.',
    ],
    tags: ['Engineering Fundamentals', 'Problem Solving', 'Analytical Thinking'],
  },
]

// ── Chip ─────────────────────────────────────────────────────
function Chip({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: '#f2efe9',
        padding: '8px 16px',
        borderRadius: '50px',
        boxShadow: '0px 4px 24px 0px rgba(0,0,0,0.05)',
        fontFamily: "'Inter', sans-serif",
        fontSize: '10px',
        fontWeight: 500,
        color: 'rgba(24,24,27,0.62)',
        letterSpacing: '0.13px',
        whiteSpace: 'nowrap',
        lineHeight: '1',
      }}
    >
      {label}
    </span>
  )
}

// ── Timeline Entry ────────────────────────────────────────────
interface TimelineEntryProps {
  entry: Entry
  isLast: boolean
  entryRef: (el: HTMLDivElement | null) => void
  isActive: boolean
}

function TimelineEntry({ entry, isLast, entryRef, isActive }: TimelineEntryProps) {
  return (
    <div
      ref={entryRef}
      className="relative"
      style={{ paddingLeft: '32px', paddingBottom: isLast ? 0 : '52px' }}
    >
      {/* Dot */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '6px',
          width: '9px',
          height: '9px',
          borderRadius: '50%',
          background: isActive ? '#18181b' : '#e8e7e4',
          border: isActive ? '2px solid rgba(24,24,27,0.2)' : '2px solid #f4f3f0',
          transition: 'background 0.3s ease, border-color 0.3s ease',
          zIndex: 1,
        }}
      />
      {/* Vertical line */}
      {!isLast && (
        <div
          style={{
            position: 'absolute',
            left: '4px',
            top: '18px',
            bottom: 0,
            width: '1px',
            background: 'rgba(24,24,27,0.08)',
          }}
        />
      )}

      {/* Date */}
      <p
        style={{
          fontFamily: "'Work Sans', sans-serif",
          fontWeight: 400,
          fontSize: '10px',
          lineHeight: '13px',
          color: 'rgba(24,24,27,0.28)',
          letterSpacing: '0.52px',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}
      >
        {entry.date}
      </p>

      {/* Company */}
      <p
        style={{
          fontFamily: "'Work Sans', sans-serif",
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '20.8px',
          letterSpacing: '-0.32px',
          color: '#18181b',
          marginBottom: '4px',
        }}
      >
        {entry.company}
      </p>

      {/* Role */}
      {entry.role && (
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: '15px',
            lineHeight: '20px',
            color: '#787368',
            marginBottom: '10px',
          }}
        >
          {entry.role}
        </p>
      )}

      {/* Description */}
      {entry.description && (
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '13.5px',
            lineHeight: '23px',
            color: 'rgba(24,24,27,0.42)',
            marginBottom: '14px',
            maxWidth: '520px',
          }}
        >
          {entry.description}
        </p>
      )}

      {/* Bullets */}
      {entry.bullets && entry.bullets.length > 0 && (
        <ul
          style={{
            listStyleType: 'disc',
            paddingLeft: '18px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '13.5px',
            lineHeight: '23px',
            color: 'rgba(24,24,27,0.42)',
            marginBottom: '14px',
            maxWidth: '520px',
          }}
        >
          {entry.bullets.map((b, i) => (
            <li key={i} style={{ marginBottom: '4px' }}>{b}</li>
          ))}
        </ul>
      )}

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {entry.tags.map((tag) => (
          <Chip key={tag} label={tag} />
        ))}
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────
export default function AboutJourney() {
  const [active, setActive] = useState<Tab>('experience')
  const [activeIdx, setActiveIdx] = useState(0)
  const [imgSrc, setImgSrc] = useState(IMG_EXP)
  const [imgOpacity, setImgOpacity] = useState(1)

  const sectionRef = useRef<HTMLElement>(null)
  const entryRefsRef = useRef<(HTMLDivElement | null)[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)
  const activeTabRef = useRef<Tab>('experience')

  const entries = active === 'experience' ? experienceEntries : educationEntries

  // ── Image crossfade ──────────────────────────────────────────
  const updateImage = useCallback((newSrc: string) => {
    setImgOpacity(0)
    setTimeout(() => {
      setImgSrc(newSrc)
      setImgOpacity(1)
    }, 220)
  }, [])

  // ── IntersectionObserver ─────────────────────────────────────
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    const currentEntries = activeTabRef.current === 'experience' ? experienceEntries : educationEntries
    entryRefsRef.current = entryRefsRef.current.slice(0, currentEntries.length)

    observerRef.current = new IntersectionObserver(
      (observations) => {
        const intersecting = observations
          .filter((o) => o.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (intersecting.length > 0) {
          const idx = entryRefsRef.current.indexOf(intersecting[0].target as HTMLDivElement)
          if (idx !== -1) {
            setActiveIdx((prev) => {
              if (prev !== idx) return idx
              return prev
            })
          }
        }
      },
      { rootMargin: '-80px 0px -40% 0px', threshold: 0.1 }
    )

    entryRefsRef.current.forEach((el) => {
      if (el) observerRef.current!.observe(el)
    })

    return () => observerRef.current?.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // ── Sync image with activeIdx ────────────────────────────────
  useEffect(() => {
    // Only show one image per tab (the Figma panel image)
    // The image stays consistent per tab
  }, [activeIdx])

  // ── Tab change ───────────────────────────────────────────────
  const handleTabChange = (tab: Tab) => {
    if (tab === active) return
    activeTabRef.current = tab
    setActive(tab)
    setActiveIdx(0)
    updateImage(tab === 'experience' ? IMG_EXP : IMG_EDU)

    requestAnimationFrame(() => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top: sectionTop - 80, behavior: 'smooth' })
      }
    })
  }

  const currentEntry = entries[activeIdx] ?? entries[0]

  return (
    <section
      ref={sectionRef}
      style={{ background: '#fafaf9', paddingTop: '80px', paddingBottom: '96px' }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', paddingLeft: '91px', paddingRight: '91px' }}>

        {/* Two-column layout — sticky header lives inside left column only */}
        <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }}>

          {/* LEFT COLUMN — sticky header + timeline */}
          <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>

            {/* Sticky header — gradient fade, no solid background */}
            <div
              style={{
                position: 'sticky',
                top: '0',
                zIndex: 20,
                background: 'linear-gradient(to bottom, rgba(250,250,249,0.92) 0%, rgba(250,250,249,0.72) 65%, transparent 100%)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                paddingTop: '20px',
                paddingBottom: '28px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '11px',
                  letterSpacing: '1.98px',
                  textTransform: 'uppercase',
                  color: 'rgba(24,24,27,0.35)',
                  marginBottom: '12px',
                }}
              >
                JOURNEY
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: '45.72px',
                  lineHeight: '1.08',
                  letterSpacing: '-0.46px',
                  color: '#18181b',
                  marginBottom: '28px',
                }}
              >
                How I got{' '}
                <em style={{ fontStyle: 'italic', color: '#797979' }}>here.</em>
              </h2>

              {/* Toggle */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#f4f3f0',
                  borderRadius: '50px',
                  padding: '4px',
                  border: '1px solid #e7e5e4',
                  gap: '2px',
                }}
              >
                {(['experience', 'education'] as Tab[]).map((tab) => {
                  const isActive = active === tab
                  return (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      style={{
                        padding: '8px 20px',
                        borderRadius: '50px',
                        fontSize: '13px',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        background: isActive ? '#18181b' : 'transparent',
                        color: isActive ? '#ffffff' : '#78716c',
                        boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.15)' : 'none',
                      }}
                    >
                      {tab === 'experience' ? 'Experience' : 'Education'}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Timeline entries — padded below sticky header */}
            <div style={{ paddingTop: '24px' }}>
              {entries.map((entry, i) => (
                <TimelineEntry
                  key={`${active}-${i}`}
                  entry={entry}
                  isLast={i === entries.length - 1}
                  isActive={activeIdx === i}
                  entryRef={(el) => {
                    entryRefsRef.current[i] = el
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — image, sticky at top of viewport */}
          <div
            style={{
              width: '400px',
              flexShrink: 0,
              position: 'sticky',
              top: '24px',
              alignSelf: 'flex-start',
            }}
          >
            {/* Image */}
            <div
              style={{
                width: '400px',
                height: '480px',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#e8e7e4',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
              }}
            >
              <img
                src={imgSrc}
                alt={currentEntry.company}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: imgOpacity,
                  transition: 'opacity 0.35s ease',
                }}
              />
              {/* Overlay label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.88)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  border: '1px solid rgba(255,255,255,0.6)',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: '13px',
                    color: '#18181b',
                    marginBottom: '2px',
                    letterSpacing: '-0.2px',
                  }}
                >
                  {currentEntry.company}
                </p>
                {currentEntry.role && (
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 500,
                      fontSize: '13px',
                      color: '#787368',
                    }}
                  >
                    {currentEntry.role}
                  </p>
                )}
              </div>
            </div>

            {/* Entry counter */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                color: 'rgba(24,24,27,0.3)',
                marginTop: '16px',
                textAlign: 'center',
                letterSpacing: '0.5px',
              }}
            >
              {activeIdx + 1} / {entries.length}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
