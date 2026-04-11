import { useState } from 'react'
import { motion } from "framer-motion";

const books = [
  {
    id: 1,
    title: 'Hooked',
    author: 'Nir Eyal',
    image: 'https://covers.openlibrary.org/b/isbn/9781591847786-L.jpg',
    note: 'Habit loops through the lens of product. Changed how I think about retention and the ethics of engagement design.',
    tag: 'Behaviour',
  },
  {
    id: 2,
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    image: 'https://covers.openlibrary.org/b/isbn/9780465050659-L.jpg',
    note: 'The book that made me realise good design is invisible — and bad design is everywhere. Norman gave me language for what I already felt.',
    tag: 'Foundational',
  },
  {
    id: 3,
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    image: 'https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg',
    note: "Two systems, one brain. This reframed how I think about every interface decision — System 1 is who you're actually designing for.",
    tag: 'Psychology',
  },
  {
    id: 4,
    title: 'Sprint',
    author: 'Jake Knapp',
    image: 'https://covers.openlibrary.org/b/isbn/9781501121746-L.jpg',
    note: "The only structured process that never makes me feel like I'm wasting time. Five steps that bring clarity and momentum.",
    tag: 'Process',
  },
  {
    id: 5,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    image: 'https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg',
    note: 'Nothing about money — everything about how humans make decisions under uncertainty. Every page applies to product decisions.',
    tag: 'Mental Models',
  },
  {
    id: 6,
    title: 'Prediction Machines',
    author: 'Agrawal, Gans & Goldfarb',
    image: 'https://covers.openlibrary.org/b/isbn/9781633695672-L.jpg',
    note: 'AI reduces the cost of prediction. That one reframe clarified every conversation I have had about AI in product and business.',
    tag: 'AI',
  },
  {
    id: 7,
    title: 'Inner Engineering',
    author: 'Sadhguru',
    image: 'https://covers.openlibrary.org/b/isbn/9780812997798-L.jpg',
    note: "Designing well requires knowing yourself first. This book shifted how I approach clarity, focus, and the work itself.",
    tag: 'Mindset',
  },
  {
    id: 8,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    image: 'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg',
    note: "A reminder that the journey is the answer. Every designer needs a book that reconnects them with why they started.",
    tag: 'Perspective',
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
              Books that shaped{' '}
              <em className="italic text-[#5a5954]">my thinking.</em>
            </h2>
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
                    background: '#1a1a1a',
                    backgroundImage: `url(${book.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: isActive ? 'center center' : 'left center',
                    borderRadius: '8px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                    opacity: isDimmed ? 0.45 : 1,
                    boxShadow: isActive
                      ? '6px 8px 32px rgba(0,0,0,0.28), 2px 2px 8px rgba(0,0,0,0.18)'
                      : '3px 4px 14px rgba(0,0,0,0.22), 1px 1px 4px rgba(0,0,0,0.14)',
                    transition: 'width 0.45s cubic-bezier(0.22,1,0.36,1), height 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease, box-shadow 0.35s ease',
                    transformOrigin: 'bottom center',
                  }}
                >
                  {/* SPINE — closed state only: solid color + vertical title */}
                  {!isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                      }}
                    >
                      <p
                        style={{
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '10px',
                          fontWeight: 500,
                          color: 'rgba(255,255,255,0.6)',
                          letterSpacing: '0.05em',
                          userSelect: 'none',
                          margin: 0,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          maxHeight: '280px',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {book.title}
                      </p>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>

          {/* Shelf surface */}
          <div
            style={{
              height: '3px',
              background: 'linear-gradient(to right, transparent, rgba(24,24,27,0.18) 10%, rgba(24,24,27,0.18) 90%, transparent)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
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
