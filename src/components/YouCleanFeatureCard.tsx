import { motion, useReducedMotion } from 'framer-motion'

/* ─── Homepage-only preview of the YouClean project.
   This is a sibling to CaseStudyCard, not a replacement for it — every
   other project on the homepage still renders through CaseStudyCard,
   unchanged. YouClean gets its own presentation here because the visual
   itself is a single composed image rather than one product screenshot,
   so it needs its own aspect ratio/caption handling — but the header
   layout and hover/click interaction below are copied verbatim from
   CaseStudyCard's non-comingSoon branch (dark tint fade-in, image
   zoom-on-hover, "View case study →" chip sliding up from the bottom
   edge) so it still reads as one family of cards, per the brief.

   The visual is a single flat image (youclean-homepage-stage.png) — a
   pre-composed dashboard-and-widgets illustration, used directly rather
   than reconstructed from live components, per explicit instruction.
   It's cropped tight to just the dark stage rectangle from the source
   reference (no title/description baked in — this component renders
   that as real text above instead, matching every other case study;
   no bottom caption row either, so the hover chip below is the only
   "View case study →" affordance, exactly like the other cards — there
   is no permanently-visible duplicate). ─── */
const STAGE_IMAGE = '/images/case-studies/youclean-homepage-stage.png'
const STAGE_RATIO = '1607 / 898'

export default function YouCleanFeatureCard({
  title,
  date,
  description,
}: {
  title: string
  date: string
  description: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="flex w-full cursor-pointer flex-col gap-8 md:gap-10"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Header — identical structure/typography to CaseStudyCard's header. */}
      <div className="flex flex-col flex-wrap items-start justify-between gap-4 md:flex-row md:gap-8">
        <div className="flex flex-col gap-2 md:max-w-[46%] md:gap-2.5">
          <h3 className="type-card text-[#1c1917]">{title}</h3>
          <span className="type-meta text-rust">{date}</span>
        </div>
        <p className="font-instrument text-[13.5px] leading-[1.65] tracking-[-0.3px] text-[#555] md:max-w-[46%] md:text-[14.5px]">
          {description}
        </p>
      </div>

      {/* Visual — same container/hover treatment as CaseStudyCard's image. */}
      <div
        className="relative w-full overflow-hidden rounded-[4px]"
        style={{ aspectRatio: STAGE_RATIO, background: '#003648' }}
      >
        {/* Subtle tint on hover for contrast lift */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 bg-stone-ink/0"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.28 }}
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.14) 0%, transparent 60%)' }}
        />

        {/* Image zoom */}
        <motion.img
          src={STAGE_IMAGE}
          alt="YouClean CRM operations dashboard, surrounded by supporting views: revenue trend, orders by type, order volume, a new-order form, recent activity, delayed pickups, and the mobile operations view."
          className="h-full w-full object-cover"
          variants={{ rest: { scale: 1 }, hover: { scale: reduceMotion ? 1 : 1.04 } }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* "View case study →" chip — slides up from bottom edge, same as
            every other card. This is the only "View case study" affordance
            on the whole card, and it only appears on hover — nothing is
            permanently visible over the image. */}
        <motion.div
          className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5"
          variants={{ rest: { opacity: 0, y: 8 }, hover: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          <span
            className="type-meta rounded-full bg-white/90 px-3 py-1.5 text-stone-ink backdrop-blur-sm"
            style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.10)' }}
          >
            View case study →
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}
