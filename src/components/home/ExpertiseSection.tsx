import { motion, useReducedMotion } from 'framer-motion'
import Container from '../Container'

// Three decision-oriented principles — deliberately not a generic
// five-step design-thinking process (Understand → Frame → Explore →
// Validate → Scale). These are meant to communicate product judgment —
// the trade-offs a senior/lead designer actually owns — not a process
// diagram. Copy is exactly what was specified, not rewritten.
const CAPABILITIES = [
  {
    number: '01',
    title: 'Frame the right problem',
    description: 'Not every request is the problem worth solving.',
  },
  {
    number: '02',
    title: 'Make the trade-off',
    description: 'Balance user needs, business goals, and technical constraints to make the right product decisions.',
  },
  {
    number: '03',
    title: 'Design for what’s next',
    description: 'Create solutions that work today without making tomorrow harder.',
  },
]

/**
 * "How I Think" (formerly "How I Work") — same editorial two-column
 * composition (headline + supporting copy left, principle index right)
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
          <span className="type-eyebrow">How I think</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-8 mt-8 lg:mt-10">
          {/* Left: eyebrow already sits above the grid; headline plus
              one supporting paragraph, matching the reference's "large
              statement, left" composition. lg:col-span-5 keeps it from
              stretching to an uncomfortable measure. */}
          <div className="lg:col-span-5">
            <h2 className="type-heading">
              I don&rsquo;t start with screens. I start{' '}
              <span style={{ color: 'var(--color-accent)' }}>with the problem.</span>
            </h2>
            <p className="type-body mt-5 max-w-[440px]" style={{ color: 'var(--color-text-muted)' }}>
              Complex products rarely have simple problems. I work across research, product
              strategy, UX, systems, and interaction design to understand what&rsquo;s actually
              getting in the way, then turn that complexity into experiences people can act on
              with confidence.
            </p>
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
