import { motion } from 'framer-motion'

interface SmallCaseStudyCardProps {
  title:       string
  category:    string
  description: string
  image:       string
  imageAlt:    string
  cardBg?:     string
}

export default function SmallCaseStudyCard({ title, category, description, image, imageAlt, cardBg }: SmallCaseStudyCardProps) {
  return (
    <motion.div
      className="h-full flex flex-col gap-4 cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Text block */}
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-1.5">
          <h4 className="type-card text-[#1c1917]">{title}</h4>
          <span className="type-meta text-rust">{category}</span>
        </div>
        <p className="font-instrument text-[14px] text-[#555] leading-[1.65] tracking-[-0.3px]">
          {description}
        </p>
      </div>

      {/* Image */}
      <div
        className="relative w-full overflow-hidden rounded-[4px] shrink-0"
        style={{ aspectRatio: '498 / 246', background: cardBg || '#f5f4f2', transition: 'background 0.3s ease' }}
      >
        {/* Bottom-fade lift on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.25 }}
          style={{ background: 'linear-gradient(to top, rgba(17,17,16,0.07) 0%, transparent 55%)' }}
        />

        <motion.img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
          variants={{
            rest:  { scale: 1 },
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* "View →" chip */}
        <motion.div
          className="absolute bottom-3 right-3 z-20"
          variants={{
            rest:  { opacity: 0, y: 6 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
        >
          <span
            className="type-meta bg-white/90 backdrop-blur-sm text-stone-ink px-2.5 py-1 rounded-full"
            style={{ boxShadow: '0 1px 5px rgba(0,0,0,0.10)' }}
          >
            View →
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}
