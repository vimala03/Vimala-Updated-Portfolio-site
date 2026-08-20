import { motion, useReducedMotion } from 'framer-motion'

interface CaseStudyCardProps {
  title:       string
  date:        string
  description: string
  image:       string
  imageAlt:    string
  tags?:       string[]
  cardBg?:     string   // themed image container bg, e.g. '#dce8f5'
  /** Renders the card as an intentionally non-interactive "Coming Soon" state —
   *  replaces the date/CTA affordances instead of adding a badge alongside them. */
  comingSoon?: boolean
  /** Second real product screenshot, shown as a blurred ambient layer behind
   *  `image` for a layered, art-directed showcase. Coming-soon cards only. */
  secondaryImage?: string
}

/* ─── Coming Soon mark — centred over the layered CRM showcase.
   Staggered, one-time entrance only (overlay → label → supporting line),
   each a plain opacity fade (label also settles its letter-spacing). No
   idle/looping motion — restrained per the brief. Skipped entirely, settled
   end-state rendered directly, under prefers-reduced-motion. ─── */
function ComingSoonMark({ reduceMotion }: { reduceMotion: boolean }) {
  const hairline = <span aria-hidden className="cs-coming-soon-hairline h-px w-7" />

  return (
    <motion.div
      className="flex flex-col items-center gap-3 px-6 text-center"
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={reduceMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {hairline}

      <motion.span
        style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '13px',
          fontWeight:    500,
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.92)',
        }}
        initial={reduceMotion ? false : { opacity: 0, letterSpacing: '0.14em' }}
        whileInView={reduceMotion ? undefined : { opacity: 1, letterSpacing: '0.28em' }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        Coming Soon
      </motion.span>

      {hairline}

      <motion.span
        style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '10.5px',
          letterSpacing: '0.05em',
          color:         'rgba(255,255,255,0.62)',
        }}
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        Case study in progress
      </motion.span>
    </motion.div>
  )
}

export default function CaseStudyCard({ title, date, description, image, imageAlt, tags, cardBg, comingSoon, secondaryImage }: CaseStudyCardProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`flex flex-col gap-5 md:gap-6 w-full ${comingSoon ? 'cursor-default' : 'cursor-pointer'}`}
      initial="rest"
      whileHover={comingSoon ? undefined : 'hover'}
      animate="rest"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-8 flex-wrap">
        <div className="flex flex-col gap-2 md:gap-2.5 md:max-w-[46%]">
          <h3 className="type-card text-[#1c1917]">{title}</h3>

          {comingSoon ? (
            /* Coming Soon replaces the date — same slot, no hover swap needed */
            <span className="type-meta text-rust">Coming soon</span>
          ) : (
            /* Tags replace date on hover — same space, clean swap */
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
          )}
        </div>

        <p className="font-instrument text-[13.5px] md:text-[14.5px] text-[#555] leading-[1.65] tracking-[-0.3px] md:max-w-[46%]">
          {description}
        </p>
      </div>

      {/* Image container — clip keeps zoom contained */}
      <div
        className={`relative w-full overflow-hidden rounded-[4px] ${comingSoon ? 'cs-coming-soon-visual' : ''}`}
        style={{ aspectRatio: '1229 / 550', background: cardBg || '#f5f4f2', transition: 'background 0.3s ease' }}
      >
        {comingSoon ? (
          <>
            {/* Ambient backdrop — second real CRM screenshot, full-bleed and
                heavily blurred so it reads as atmosphere/depth rather than a
                second competing focal image. Hover/entrance states live in
                index.css (.cs-coming-soon-*) as plain CSS — see note there on
                why this avoids Tailwind's composable filter/transform utilities. */}
            {secondaryImage && (
              <img
                src={secondaryImage}
                alt=""
                aria-hidden="true"
                className="cs-coming-soon-backdrop absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: 'top' }}
              />
            )}

            {/* Primary product card — inset, softly shadowed, a touch of
                asymmetric offset/tilt at tablet+ for an art-directed feel;
                near full-bleed and untilted on mobile to keep it legible. */}
            <div
              className="cs-coming-soon-primary absolute z-10 overflow-hidden rounded-[10px]
                top-[4%] left-[4%] right-[4%] bottom-[4%]
                md:top-[8%] md:left-[12%] md:right-[5%] md:bottom-[6%]"
              style={{ boxShadow: '0 20px 50px -15px rgba(0,0,0,0.42), inset 0 0 0 1px rgba(255,255,255,0.06)' }}
            >
              <img
                src={image}
                alt={imageAlt}
                className="cs-coming-soon-image w-full h-full object-cover"
                style={{ objectPosition: 'top' }}
              />
            </div>

            {/* Editorial vignette — dims/locks the whole showcase, fades in once on scroll */}
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none"
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="cs-coming-soon-gradient absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at 50% 45%, rgba(8,10,9,0.14) 0%, rgba(8,10,9,0.42) 62%, rgba(8,10,9,0.64) 100%)',
                }}
              />
            </motion.div>

            {/* Centred, staggered-reveal "Coming Soon" mark */}
            <div className="absolute inset-0 z-30 flex items-center justify-center">
              <ComingSoonMark reduceMotion={!!reduceMotion} />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </motion.div>
  )
}
