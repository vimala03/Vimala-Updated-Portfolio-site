import { useState, useEffect, useRef } from 'react'

// ── Figma assets ─────────────────────────────────────────────
// removed unused IMG_EXP
// removed unused IMG_EDU

// ── Types ────────────────────────────────────────────────────
type Tab = 'experience' | 'education'

interface Entry {
  date: string
  company: string
  role: string
  description?: string
  bullets?: string[]
  tags: string[]
  image?: string
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
    image: '/images/cornerstone.jpeg',
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
    image: '/images/moonraft.jpeg',
  },
  {
    date: '2022 – PRESENT · HYDERABAD',
    company: 'Youclean Laundry',
    role: 'Founder',
    description:
      'Built an eco-friendly laundry service with an emphasis on customer satisfaction, operational clarity, and repeatable experience design. Pioneered sustainable practices and cutting-edge technologies to revolutionise the sector.',
    tags: ['ENTREPRENEURSHIP', 'OPERATIONS', 'Brand/UX', 'SUSTAINABILITY'],
    image: '/images/youclean.jpg',
  },
  {
    date: '2020 – 2022 · HYDERABAD',
    company: 'Chandamama Group',
    role: 'Product Designer',
    description:
      'Orchestrated creation of user centered digital solutions and improved end-to-end patient experience. Designed intuitive interfaces adhering to healthcare regulatory requirements.',
    tags: ['HEALTHCARE UX', 'PATIENT EXPERIENCE', 'Visual Design'],
    image: '/images/chandamama.jpg',
  },
  {
    date: '2016 – 2018 · HYDERABAD',
    company: 'Flyin',
    role: 'User Experience Lead',
    description:
      'Led redesign of search and discovery with AI-powered intent prediction. Reduced search abandonment by 35%, increased booking conversion by 28%, and drove App Store rating from 3.2★ to 4.4★.',
    tags: ['TRAVEL TECH', 'AI SEARCH', 'MOBILE UX'],
    image: '/images/flyin.jpeg',
  },
  {
    date: 'Aug 2015 – Jul 2016 · HYDERABAD',
    company: 'Cyber Gaming Software Technologies',
    role: 'UX Designer',
    description:
      'Designed player-centric UI/UX, optimising gameplay flows to enhance engagement, usability, and overall user experience.',
    tags: ['Gaming TECH', 'Visual design', 'MOBILE UX'],
    image: '/images/cybergaming.jpeg',
  },
  {
    date: 'Jun 2015 – Dec 2015 · Gurgaon',
    company: 'Buildzar',
    role: 'UX Design Trainee',
    description: 'Translated business needs into clear visual and functional requirements.',
    tags: ['Brand/Graphic Design', 'Construction UX'],
    image: '/images/buildzar.jpeg',
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
    image: '/images/isb.jpeg',
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
    image: '/images/drbraou.jpeg',
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
    image: '/images/iitdelhi.jpeg',
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
    image: '/images/iare.jpeg',
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
      className="relative experience-item"
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
const getObjectPosition = (company: string) => {
  switch (company) {
    case 'Cornerstone OnDemand':             return 'center 20%'
    case 'Moonraft – UST Global':            return 'center 30%'
    case 'Flyin':                            return 'center 25%'
    case 'Cyber Gaming Software Technologies': return 'center 20%'
    case 'Chandamama Group':                 return 'center center'
    case 'Youclean Laundry':                 return 'center 30%'
    case 'Buildzar':                         return 'center 35%'
    case 'IIT Delhi':                        return 'center 30%'
    case 'Indian School of Business (ISB)':  return 'center 30%'
    case 'IARE, JNTU':                       return 'center center'
    case 'Dr. B.R. Ambedkar Open University (BRAOU)': return 'center center'
    default:                                 return 'center center'
  }
}

export default function AboutJourney() {
  const [active, setActive] = useState<Tab>('experience')
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const entryRefsRef = useRef<(HTMLDivElement | null)[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeTabRef = useRef<Tab>('experience')

  const entries = active === 'experience' ? experienceEntries : educationEntries

  // ── Scroll-based detection via itemRefs ───────────────────────
  useEffect(() => {
    const handleScroll = () => {
      let closestIndex = 0
      let minDistance = Infinity

      itemRefs.current.forEach((el, index) => {
        if (!el) return

        const rect = el.getBoundingClientRect()
        const distance = Math.abs(rect.top - window.innerHeight * 0.4)

        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      })

      setActiveIndex(closestIndex)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Tab change ───────────────────────────────────────────────
  const handleTabChange = (tab: Tab) => {
    if (tab === active) return
    activeTabRef.current = tab
    setActive(tab)
    setActiveIndex(0)

    requestAnimationFrame(() => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top: sectionTop - 80, behavior: 'smooth' })
      }
    })
  }

  const currentEntry = entries[activeIndex] ?? entries[0]

  return (
    <section
      ref={sectionRef}
      style={{ background: '#fafaf9', paddingTop: '80px', paddingBottom: '96px', scrollMarginTop: '80px' }}
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
                <div style={{ paddingTop: "40px" }}></div>
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
                  isActive={activeIndex === i}
                  entryRef={(el) => {
                    entryRefsRef.current[i] = el
                    itemRefs.current[i] = el
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
              top: '200px',
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
                key={`${active}-${activeIndex}`}
                src={entries[activeIndex]?.image}
                alt={entries[activeIndex]?.company}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: getObjectPosition(entries[activeIndex]?.company),
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
              {activeIndex + 1} / {entries.length}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
