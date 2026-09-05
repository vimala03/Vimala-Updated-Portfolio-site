import { motion, useReducedMotion } from 'framer-motion'
import Container from '../Container'

// Exactly three capabilities — explicit instruction not to replace the
// removed fourth ("Design Systems") with anything else. #03 replaces
// "AI Experiences" with "Product + Business", the one new claim this
// pass adds: that the work spans product/business/engineering, not
// only UX craft. Copy is exactly what was specified, not rewritten.
const CAPABILITIES = [
  {
    number: '01',
    title: 'Product Design',
    description:
      'Framing the right problem before designing the solution — connecting user needs, business objectives, constraints, and measurable outcomes.',
  },
  {
    number: '02',
    title: 'Enterprise UX',
    description:
      'Designing dense, permission-heavy, high-stakes workflows so people can move quickly without losing context or control.',
  },
  {
    number: '03',
    title: 'Product + Business',
    description:
      'Working across product, business, engineering, and design to align priorities, make trade-offs, and turn complex requirements into clear product decisions.',
  },
]

/**
 * "How I Work" — replaces the old 4-up Expertise grid. Editorial
 * two-column composition (headline left, capability index right)
 * rather than a card/tile grid: no icons, no boxes, no arrows — these
 * rows are informational, not links, so nothing here should read as
 * clickable. Lighter than Selected Work above it (no section
 * background), so the case studies stay the visual focus of the page.
 */
export default function ExpertiseSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section style={{ paddingTop: 'var(--space-section-compact)', paddingBottom: 'var(--space-section-compact)' }}>
      <Container>
        <div className="border-t pt-6" style={{ borderColor: 'var(--color-border)' }}>
          <span className="type-eyebrow">How I work</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-8 mt-8 lg:mt-10">
          {/* Left: eyebrow already sits above the grid; headline is the
              only thing in this column, matching the reference's
              "large statement, left" composition. lg:col-span-5 keeps
              it from stretching to an uncomfortable measure. */}
          <div className="lg:col-span-5">
            <h2 className="type-heading">I design for complexity — and make it easier to act.</h2>
          </div>

          {/* Right: the capability index. col-start-7 (not 6) leaves a
              real gutter between headline and list rather than the
              columns touching — this is a two-column composition, not
              a headline bleeding into a list. */}
          <div className="lg:col-span-6 lg:col-start-7 mt-10 lg:mt-0 flex flex-col">
            {CAPABILITIES.map((area, i) => (
              <motion.div
                key={area.number}
                className="border-t py-6"
                style={{ borderColor: 'var(--color-border)' }}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: reduceMotion ? 0 : i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Same number/title baseline-alignment approach as
                    Selected Work's list: a grid (not flex) so the
                    number's fixed-width column keeps title and
                    description on one shared left edge, and
                    `alignItems: baseline` seats the number against the
                    title's actual text baseline rather than its box
                    top. tabular-nums + Instrument Sans on the number —
                    same reasoning as Selected Work: proportional
                    digits drift by digit, and a mono font would be a
                    second typeface outside the two-family system. */}
                <div className="grid" style={{ gridTemplateColumns: 'auto 1fr', columnGap: '20px', alignItems: 'baseline' }}>
                  <span
                    className="type-mono"
                    style={{ fontFamily: 'var(--font-body)', fontVariantNumeric: 'tabular-nums', color: 'var(--color-text-faint)' }}
                  >
                    {area.number}
                  </span>
                  <h3 className="type-subheading" style={{ color: 'var(--color-text)' }}>{area.title}</h3>
                  <p className="type-small" style={{ gridColumn: 2, marginTop: '8px', maxWidth: '440px', color: 'var(--color-text-muted)' }}>
                    {area.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
