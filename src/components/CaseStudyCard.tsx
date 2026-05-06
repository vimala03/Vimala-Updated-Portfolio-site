import { motion } from 'framer-motion'

interface CaseStudyCardProps {
  title:       string
  date:        string
  description: string
  image:       string
  imageAlt:    string
  tags?:       string[]
  cardBg?:     string   // themed image container bg, e.g. '#dce8f5'
}

export default function CaseStudyCard({ title, date, description, image, imageAlt, tags, cardBg }: CaseStudyCardProps) {
  return (
    <motion.div
      className="flex flex-col gap-5 md:gap-6 w-full cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-8 flex-wrap">
        <div className="flex flex-col gap-2 md:gap-2.5 md:max-w-[46%]">
          <h3 className="type-card text-[#1c1917]">{title}</h3>

          {/* Tags replace date on hover — same space, clean swap */}
          <div className="relative h-[18px] overflow-hidden">
            <motion.span
              className="type-meta text-rust absolute inset-0"
              variants={{ rest: { opacity: 1, y: 0 }, hover: { opacity: 0, y: -8 } }}
              transition={{ duration: 0.2, ease: 'easeIn' }}
            >
              {date}
            </motion.span>
            {tags && tags.length > 0 && (
              <motion.div
                className="flex gap-2 flex-wrap absolute inset-0"
                variants={{ rest: { opacity: 0, y: 8 }, hover: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {tags.map(tag => (
                  <span key={tag} className="type-meta text-stone-mid bg-stone-ink/5 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        <p className="font-instrument text-[13.5px] md:text-[14.5px] text-[#555] leading-[1.65] tracking-[-0.3px] md:max-w-[46%]">
          {description}
        </p>
      </div>

      {/* Image container — clip keeps zoom contained */}
      <div
        className="relative w-full overflow-hidden rounded-[4px]"
        style={{ aspectRatio: '1229 / 550', background: cardBg || '#f5f4f2', transition: 'background 0.3s ease' }}
      >
        {/* Subtle tint on hover for contrast lift */}
        <motion.div
          className="absolute inset-0 bg-stone-ink/0 z-10 pointer-events-none"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.28 }}
          style={{ background: 'linear-gradient(to top, rgba(17,17,16,0.08) 0%, transparent 60%)' }}
        />

        {/* Image zoom */}
        <motion.img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
          variants={{
            rest:  { scale: 1 },
            hover: { scale: 1.04 },
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* "View →" chip — slides up from bottom edge */}
        <motion.div
          className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5"
          variants={{
            rest:  { opacity: 0, y: 8 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          <span
            className="type-meta bg-white/90 backdrop-blur-sm text-stone-ink px-3 py-1.5 rounded-full"
            style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.10)' }}
          >
            View case study →
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}
