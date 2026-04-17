import { motion } from 'framer-motion'

/* ─── SVG icons ─── */
const Icons = {
  Figma: () => (
    <svg width="14" height="16" viewBox="0 0 12 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="6" height="6" rx="3" opacity="0.9"/>
      <rect x="6" y="0" width="6" height="6" rx="3" opacity="0.55"/>
      <rect x="0" y="6" width="6" height="6" rx="3" opacity="0.55"/>
      <circle cx="9" cy="11" r="3" opacity="0.9"/>
    </svg>
  ),
  FigJam: () => (
    <svg width="15" height="15" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="1.4" opacity="0.8"/>
      <path d="M4 6.5h5M6.5 4v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.8"/>
    </svg>
  ),
  Cursor: () => (
    <svg width="14" height="15" viewBox="0 0 12 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L5.5 12L7.2 7.2L12 5.5L1 1Z" opacity="0.9"/>
    </svg>
  ),
  Claude: () => (
    <svg width="15" height="15" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 1L12 6.5L6.5 12L1 6.5L6.5 1Z" stroke="currentColor" strokeWidth="1.4" opacity="0.9"/>
      <circle cx="6.5" cy="6.5" r="1.8" fill="currentColor" opacity="0.8"/>
    </svg>
  ),
  Vercel: () => (
    <svg width="15" height="14" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 1L12.5 11H0.5L6.5 1Z" opacity="0.9"/>
    </svg>
  ),
  Framer: () => (
    <svg width="14" height="16" viewBox="0 0 12 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H12L6 7H12L6 14V7H0V0Z" opacity="0.85"/>
    </svg>
  ),
  GitHub: () => (
    <svg width="15" height="15" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6.5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.3" opacity="0.9"/>
      <path d="M3.5 8.5C2.5 9.5 2 11 2 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
      <path d="M9.5 8.5C10.5 9.5 11 11 11 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
      <path d="M5 10.5C5 11.5 5 12 6.5 12C8 12 8 11.5 8 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.9"/>
    </svg>
  ),
  Notion: () => (
    <svg width="14" height="15" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="10" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" opacity="0.9"/>
      <path d="M3.5 4.5H8.5M3.5 6.5H7M3.5 8.5H7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    </svg>
  ),
  Midjourney: () => (
    <svg width="15" height="15" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6.5" cy="6.5" r="5.2" stroke="currentColor" strokeWidth="1.3" opacity="0.9"/>
      <path d="M6.5 2.5V6.5L9.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.8"/>
    </svg>
  ),
  Perplexity: () => (
    <svg width="14" height="15" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 1L11 4.5V8.5L6 12L1 8.5V4.5L6 1Z" stroke="currentColor" strokeWidth="1.3" opacity="0.9"/>
      <circle cx="6" cy="6.5" r="1.5" fill="currentColor" opacity="0.8"/>
    </svg>
  ),
  Miro: () => (
    <svg width="15" height="15" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.3" opacity="0.8"/>
      <path d="M3.5 6.5C3.5 6.5 4.5 4 6.5 6.5C8.5 9 9.5 6.5 9.5 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.9"/>
    </svg>
  ),
  ChatGPT: () => (
    <svg width="15" height="15" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6.5" cy="6.5" r="5.2" stroke="currentColor" strokeWidth="1.3" opacity="0.85"/>
      <path d="M4 6.5h5M6.5 4v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    </svg>
  ),
  Storybook: () => (
    <svg width="14" height="15" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="1" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" opacity="0.8"/>
      <path d="M5 4.5h3M5 7h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  Loom: () => (
    <svg width="15" height="15" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6.5" cy="6.5" r="5.2" stroke="currentColor" strokeWidth="1.3" opacity="0.8"/>
      <circle cx="6.5" cy="6.5" r="2" fill="currentColor" opacity="0.7"/>
    </svg>
  ),
}

type IconName = keyof typeof Icons

/* ─── A single tool item: icon + label, no background ─── */
function ToolItem({ label, icon }: { label: string; icon?: IconName }) {
  const IconComp = icon ? Icons[icon] : null
  return (
    <span className="inline-flex items-center gap-2 font-inter font-medium text-[14px] text-[rgba(24,24,27,0.72)] whitespace-nowrap">
      {IconComp && (
        <span className="text-[rgba(24,24,27,0.45)] flex-shrink-0 flex items-center">
          <IconComp />
        </span>
      )}
      {label}
    </span>
  )
}

/* ─── Plain text list with interpunct separators ─── */
function PlainList({ items }: { items: string[] }) {
  return (
    <p className="font-inter font-normal text-[14px] text-[rgba(24,24,27,0.48)] leading-[26px]">
      {items.map((item, i) => (
        <span key={item}>
          {item}
          {i < items.length - 1 && (
            <span className="mx-2 text-[rgba(24,24,27,0.2)]">·</span>
          )}
        </span>
      ))}
    </p>
  )
}

/* ─── Section group ─── */
function ToolGroup({
  label,
  tools,
  plainItems,
  delay = 0,
}: {
  label: string
  tools?: { label: string; icon?: IconName }[]
  plainItems?: string[]
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className="flex flex-col gap-4"
    >
      <p className="font-inter font-semibold text-[10px] text-[rgba(24,24,27,0.32)] tracking-[1.5px] uppercase">
        {label}
      </p>

      {tools && tools.length > 0 && (
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {tools.map(({ label: l, icon }) => (
            <ToolItem key={l} label={l} icon={icon} />
          ))}
        </div>
      )}

      {plainItems && plainItems.length > 0 && (
        <PlainList items={plainItems} />
      )}
    </motion.div>
  )
}

export default function AboutToolkit() {
  return (
    <section className="bg-[#fafaf9] pt-12 pb-14 md:pt-[80px] md:pb-[96px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[60px]">
        <div className="px-0 lg:px-[91px]">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 mb-14"
          >
            <p className="font-inter font-medium text-[12px] text-[rgba(24,24,27,0.35)] tracking-[1.68px] uppercase flex items-center gap-2">
              <span>—</span>
              <span>Toolkit</span>
            </p>
            <h2 className="font-cormorant font-medium text-[48px] text-[#18181b] leading-[1.03] tracking-[-0.46px]">
              Tools &amp;{' '}
              <em className="italic text-[#5a5954]">methods.</em>
            </h2>
          </motion.div>

          {/* Two-column grid */}
          <div className="grid grid-cols-2 gap-x-[80px] gap-y-12 toolkit-grid">

            {/* LEFT column */}
            <div className="flex flex-col gap-12">
              <ToolGroup
                label="Core Skills"
                plainItems={[
                  'UX Research',
                  'Product Design',
                  'Design Strategy',
                  'Applied Psychology',
                  'Information Architecture',
                  'Interaction Design',
                  'User Testing',
                  'Journey Mapping',
                  'Design Systems',
                  'Prototyping',
                ]}
                delay={0.05}
              />

              <ToolGroup
                label="AI & Vibe Coding +"
                tools={[
                  { label: 'Cursor', icon: 'Cursor' },
                  { label: 'Claude (Anthropic)', icon: 'Claude' },
                  { label: 'ChatGPT', icon: 'ChatGPT' },
                  { label: 'v0 by Vercel', icon: 'Vercel' },
                  { label: 'Midjourney', icon: 'Midjourney' },
                  { label: 'Framer AI', icon: 'Framer' },
                  { label: 'GitHub Copilot', icon: 'GitHub' },
                  { label: 'Perplexity', icon: 'Perplexity' },
                  { label: 'Figma AI', icon: 'Figma' },
                ]}
                plainItems={['Lovable.dev', 'Bolt.new', 'Galileo AI']}
                delay={0.15}
              />
            </div>

            {/* RIGHT column */}
            <div className="flex flex-col gap-12">
              <ToolGroup
                label="Design & Prototyping"
                tools={[
                  { label: 'Figma', icon: 'Figma' },
                  { label: 'FigJam', icon: 'FigJam' },
                  { label: 'Framer', icon: 'Framer' },
                  { label: 'Miro', icon: 'Miro' },
                  { label: 'Notion', icon: 'Notion' },
                  { label: 'Storybook', icon: 'Storybook' },
                  { label: 'Loom', icon: 'Loom' },
                ]}
                plainItems={['Maze', 'Dovetail', 'Hotjar']}
                delay={0.1}
              />

              <ToolGroup
                label="Industries"
                plainItems={[
                  'Enterprise SaaS',
                  'AI / ML Products',
                  'Healthcare',
                  'Fintech',
                  'Travel Tech',
                  'EdTech / LMS',
                  'Gaming',
                  'B2B Platforms',
                ]}
                delay={0.2}
              />

              <ToolGroup
                label="Leadership"
                plainItems={[
                  'Stakeholder Alignment',
                  'Design Critique',
                  'Cross-functional Leadership',
                  'Mentorship',
                  'Entrepreneurship',
                  'Design Ops',
                  'Agile / Scrum',
                ]}
                delay={0.25}
              />
            </div>

          </div>

          <style>{`
            @media (max-width: 900px) {
              .toolkit-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

        </div>
      </div>
    </section>
  )
}
