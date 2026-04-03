import { useState } from 'react'
import { motion } from "framer-motion";

const books = [
  {
    id: 1,
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    spineColor: '#1e2d3d',
    accentBand: '#4a90d9',
    note: 'The book that made me realise good design is invisible — and bad design is everywhere. Norman gave me language for what I already felt.',
    tag: 'Currently Reading',
  },
  {
    id: 2,
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    spineColor: '#2d1e3d',
    accentBand: '#9b59b6',
    note: "Two systems, one brain. This reframed how I think about every interface decision — System 1 is who you're actually designing for.",
    tag: 'Foundational',
  },
  {
    id: 3,
    title: 'Sprint',
    author: 'Jake Knapp',
    spineColor: '#1a3a2a',
    accentBand: '#27ae60',
    note: "The only structured process that never makes me feel like I'm wasting time. Five steps that bring clarity and momentum.",
    tag: 'Process',
  },
  {
    id: 4,
    title: 'Hooked',
    author: 'Nir Eyal',
    spineColor: '#3d1e1a',
    accentBand: '#e74c3c',
    note: 'Habit loops through the lens of product. Changed how I think about retention and the ethics of engagement design.',
    tag: 'Behaviour',
  },
  {
    id: 5,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    spineColor: '#1a2a3d',
    accentBand: '#f39c12',
    note: 'Nothing about money — everything about how humans make decisions under uncertainty. Every page applies to product decisions.',
    tag: 'Mental Models',
  },
]

export default function AboutReading() {
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <section className="bg-[#fafaf9] pt-[80px] pb-[96px]">
      <div className="max-w-[1440px] mx-auto px-[60px]">
        <div className="px-[91px]">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 mb-16"
          >
            <p className="font-inter font-medium text-[12px] text-[rgba(24,24,27,0.35)] tracking-[1.68px] uppercase flex items-center gap-2">
              <span>—</span>
              <span>Reading</span>
            </p>
            <h2 className="font-cormorant font-medium text-[48px] text-[#18181b] leading-[1.03] tracking-[-0.46px]">
              What am I{' '}
              <em className="italic text-[#5a5954]">reading?</em>
            </h2>
            <p className="font-inter font-normal text-[15px] text-[rgba(24,24,27,0.45)] leading-[26px] mt-1">
              Books that shaped my thinking.
            </p>
          </motion.div>

          {/* Bookshelf */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex items-end gap-3"
            style={{ height: '380px' }}
            onMouseLeave={() => setActiveId(null)}
          >
            {books.map((book, i) => {
              const isActive = activeId === book.id
              const hasActive = activeId !== null
              const isDimmed = hasActive && !isActive

              return (
                <motion.div
                  key={book.id}
                  onMouseEnter={() => setActiveId(book.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 + i * 0.07 }}
                  style={{
                    width: isActive ? '260px' : '62px',
                    height: isActive ? '380px' : '340px',
                    flexShrink: 0,
                    background: book.spineColor,
                    borderRadius: '8px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                    opacity: isDimmed ? 0.45 : 1,
                    boxShadow: isActive
                      ? '6px 8px 32px rgba(0,0,0,0.28), 2px 2px 8px rgba(0,0,0,0.18)'
                      : '3px 4px 14px rgba(0,0,0,0.2), 1px 1px 4px rgba(0,0,0,0.12)',
                    transition: 'width 0.45s cubic-bezier(0.22,1,0.36,1), height 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease, box-shadow 0.35s ease',
                    transformOrigin: 'bottom center',
                  }}
                >
                  {/* Spine pseudo-border (book binding) */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '6px',
                      background: `linear-gradient(to right, rgba(255,255,255,0.06), transparent)`,
                      borderRadius: '8px 0 0 8px',
                    }}
                  />

                  {/* Accent band at top */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: isActive ? '6px' : '100%',
                      maxHeight: isActive ? '6px' : '100%',
                      background: isActive ? book.accentBand : 'transparent',
                      borderRadius: '8px 8px 0 0',
                      transition: 'height 0.45s cubic-bezier(0.22,1,0.36,1), max-height 0.45s cubic-bezier(0.22,1,0.36,1)',
                    }}
                  />

                  {/* ── SPINE STATE: vertical title ── */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px 8px',
                      opacity: isActive ? 0 : 1,
                      transition: 'opacity 0.2s ease',
                      pointerEvents: 'none',
                    }}
                  >
                    <p
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.75)',
                        letterSpacing: '0.06em',
                        textAlign: 'center',
                        userSelect: 'none',
                        lineHeight: 1.4,
                      }}
                    >
                      {book.title}
                    </p>
                    <p
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '9px',
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.38)',
                        marginTop: '12px',
                        userSelect: 'none',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {book.author}
                    </p>
                  </div>

                  {/* ── COVER STATE: full content ── */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      padding: '28px 24px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      gap: '10px',
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.25s ease 0.15s',
                      pointerEvents: 'none',
                    }}
                  >
                    {/* Tag */}
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '9px',
                        fontWeight: 700,
                        color: book.accentBand,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        background: 'rgba(255,255,255,0.08)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        border: `1px solid ${book.accentBand}55`,
                      }}
                    >
                      {book.tag}
                    </span>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '22px',
                        fontWeight: 500,
                        color: '#ffffff',
                        lineHeight: 1.2,
                        letterSpacing: '-0.01em',
                        margin: 0,
                      }}
                    >
                      {book.title}
                    </h3>

                    {/* Author */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '12px',
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.5)',
                        letterSpacing: '0.04em',
                        margin: 0,
                      }}
                    >
                      {book.author}
                    </p>

                    {/* Separator */}
                    <div
                      style={{
                        width: '32px',
                        height: '1px',
                        background: `${book.accentBand}66`,
                        margin: '2px 0',
                      }}
                    />

                    {/* Note */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.62)',
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {book.note}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Shelf surface */}
          <div
            style={{
              height: '3px',
              background: 'linear-gradient(to right, transparent, rgba(24,24,27,0.1) 10%, rgba(24,24,27,0.1) 90%, transparent)',
              marginTop: '0',
              borderRadius: '999px',
            }}
          />

          {/* Hint */}
          <p
            className="font-inter text-[10px] text-[rgba(24,24,27,0.28)] tracking-[0.08em] mt-4 text-center"
            style={{ userSelect: 'none' }}
          >
            hover to open
          </p>

        </div>
      </div>
    </section>
  )
}
