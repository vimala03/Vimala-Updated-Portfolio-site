import { useState } from 'react'
import { motion } from "framer-motion";

/* ─── Skills data ─── */
const skills = [
  {
    id: 1,
    number: '01',
    title: 'Systems Thinking',
    description:
      'Trained in actuarial science to model complexity, see downstream effects, and design for scale — not just the current moment.',
    context: 'I model cause-and-effect before picking a solution.',
    tag: 'Foundations',
    accent: '#6366f1',
    accentLight: 'rgba(99,102,241,0.07)',
    pattern: 'dots',
  },
  {
    id: 2,
    number: '02',
    title: 'UX + Business Alignment',
    description:
      'Design that earns its place. Every decision I make is tied to an outcome — for users, and for the business that serves them.',
    context: 'Every design choice maps to a measurable outcome.',
    tag: 'Strategy',
    accent: '#0ea5e9',
    accentLight: 'rgba(14,165,233,0.07)',
    pattern: 'grid',
  },
  {
    id: 3,
    number: '03',
    title: '0 → 1 Product Building',
    description:
      'Comfortable in ambiguity. I can move from a blank canvas to a working product concept — with structure, speed, and clarity.',
    context: "I've shipped from napkin sketch to live product.",
    tag: 'Execution',
    accent: '#10b981',
    accentLight: 'rgba(16,185,129,0.07)',
    pattern: 'diagonal',
  },
  {
    id: 4,
    number: '04',
    title: 'Startup Execution',
    description:
      'Founded and operated Youclean. I know what it means to ship under constraints, make fast decisions, and iterate on real feedback.',
    context: 'Real operations, real constraints, real feedback.',
    tag: 'Operations',
    accent: '#d97706',
    accentLight: 'rgba(217,119,6,0.07)',
    pattern: 'dots',
  },
  {
    id: 5,
    number: '05',
    title: 'AI-Augmented Workflows',
    description:
      'Fluent in modern AI tools for research synthesis, content generation, and rapid prototyping — without compromising design integrity.',
    context: 'Speed without sacrificing design integrity.',
    tag: 'Modern Tools',
    accent: '#8b5cf6',
    accentLight: 'rgba(139,92,246,0.07)',
    pattern: 'grid',
  },
  {
    id: 6,
    number: '06',
    title: 'Cross-functional Communication',
    description:
      'Equally comfortable speaking to engineers, founders, or users. I translate between context layers and keep everyone aligned.',
    context: 'I translate between engineering, product, and business.',
    tag: 'Collaboration',
    accent: '#ef4444',
    accentLight: 'rgba(239,68,68,0.07)',
    pattern: 'diagonal',
  },
]

const patterns: Record<string, string> = {
  dots: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
  grid: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
  diagonal: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)',
}
const patternSizes: Record<string, string> = {
  dots: '18px 18px',
  grid: '20px 20px',
  diagonal: '8px 8px',
}

function SkillCard({ skill, index }: { skill: (typeof skills)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * -8,
      y: ((e.clientX - r.left) / r.width - 0.5) * 8,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      onMouseMove={handleMouseMove}
      style={{
        padding: '34px',
        borderRadius: '20px',
        border: hovered ? `1px solid ${skill.accent}44` : '1px solid rgba(24,24,27,0.08)',
        background: hovered ? skill.accentLight : '#ffffff',
        boxShadow: hovered
          ? `0 16px 48px ${skill.accent}18, 0 2px 8px rgba(0,0,0,0.04)`
          : '0 1.2px 4.7px rgba(0,0,0,0.04)',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.35s',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
          : 'perspective(900px) rotateX(0) rotateY(0) translateY(0)',
        willChange: 'transform',
        transitionDuration: hovered ? '0.06s, 0.3s, 0.35s' : '0.45s',
        transitionProperty: 'transform, background, box-shadow',
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: patterns[skill.pattern],
          backgroundSize: patternSizes[skill.pattern],
          color: skill.accent,
          opacity: hovered ? 0.15 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Corner radial accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '130px',
          height: '130px',
          background: `radial-gradient(circle at top right, ${skill.accent}22 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Top row: number + tag */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            color: hovered ? skill.accent : 'rgba(24,24,27,0.22)',
            letterSpacing: '0.1em',
            transition: 'color 0.3s',
          }}
        >
          {skill.number}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: 600,
            color: hovered ? skill.accent : 'rgba(24,24,27,0.32)',
            padding: '3px 10px',
            borderRadius: '999px',
            border: hovered ? `1px solid ${skill.accent}44` : '1px solid rgba(24,24,27,0.1)',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            transition: 'all 0.3s',
            background: hovered ? `${skill.accent}10` : 'transparent',
          }}
        >
          {skill.tag}
        </span>
      </div>

      {/* Accent line — expands on hover */}
      <div
        style={{
          width: hovered ? '42px' : '22px',
          height: '2.3px',
          borderRadius: '999px',
          background: hovered ? skill.accent : 'rgba(24,24,27,0.1)',
          transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '17px',
          fontWeight: 600,
          color: '#18181b',
          letterSpacing: '-0.02em',
          lineHeight: 1.28,
          position: 'relative',
          zIndex: 1,
          margin: 0,
        }}
      >
        {skill.title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          lineHeight: 1.72,
          color: hovered ? 'rgba(24,24,27,0.6)' : 'rgba(24,24,27,0.48)',
          transition: 'color 0.3s',
          position: 'relative',
          zIndex: 1,
          margin: 0,
        }}
      >
        {skill.description}
      </p>

      {/* Hover metadata row — "CORE STRENGTH" label + context text */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(-10px)',
          transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: 600,
            color: 'rgba(24,24,27,0.38)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Core strength
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: 400,
            color: 'rgba(24,24,27,0.42)',
            lineHeight: 1.5,
          }}
        >
          {skill.context}
        </span>
      </div>
    </motion.div>
  )
}

export default function AboutSkills() {
  return (
    <section className="bg-[#fafaf9]" style={{ paddingTop: 'clamp(56px,8vw,96px)', paddingBottom: 'clamp(56px,8vw,96px)' }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        <div className="px-0 lg:px-[91px]">

          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '56px',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  color: 'rgba(24,24,27,0.35)',
                  fontWeight: 600,
                  marginBottom: '14px',
                  textTransform: 'uppercase',
                }}
              >
                What I Bring
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(34px, 4vw, 52px)',
                  fontWeight: 500,
                  lineHeight: 1.08,
                  letterSpacing: '-0.01em',
                  color: '#18181b',
                  margin: 0,
                }}
              >
                Skills &amp; Strengths
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                lineHeight: 1.68,
                color: 'rgba(24,24,27,0.45)',
                maxWidth: '340px',
                textAlign: 'right',
                margin: 0,
              }}
              className="bring-subtext"
            >
              Not just design craft — analytical thinking, product instinct, and real execution experience.
            </motion.p>
          </div>

          {/* 3-column grid */}
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}
            className="bring-grid"
          >
            {skills.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} />
            ))}
          </div>

          <style>{`
            @media (max-width: 1024px) {
              .bring-grid { grid-template-columns: repeat(2,1fr) !important; }
              .bring-subtext { text-align: left !important; }
            }
            @media (max-width: 640px) {
              .bring-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

        </div>
      </div>
    </section>
  )
}
