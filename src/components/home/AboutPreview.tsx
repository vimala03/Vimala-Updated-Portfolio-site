import { motion, useReducedMotion } from 'framer-motion'
import Container from '../Container'

export default function AboutPreview() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      style={{
        // Compact top padding, not standard — Expertise → About is still
        // the same portfolio narrative, not a pivot; the bigger standard
        // gap is reserved for About → Contact just below.
        paddingTop: 'var(--space-section-compact)',
        paddingBottom: 'var(--space-section-compact)',
        // A very faint dot grid — CSS only, no image asset — so the
        // section reads as designed rather than empty white space,
        // without competing with the typography sitting on top of it.
        backgroundImage: 'radial-gradient(circle, rgba(17,17,16,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <Container>
        <motion.div
          className="border-t pt-6"
          style={{ borderColor: 'var(--color-border)' }}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label left, statement right — a real two-column split (not
              label-above-heading) so the section reads as the reference's
              "ABOUT | intro statement" composition rather than a stacked
              block. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-8">
            <span className="type-eyebrow lg:col-span-3">About</span>

            <div className="lg:col-span-8 lg:col-start-4 mt-6 lg:mt-0">
              <h2 className="type-heading">
                I design for the parts of a product that are hardest to make clear.
              </h2>

              <p className="type-body mt-6 max-w-[580px]" style={{ color: 'var(--color-text-muted)' }}>
                I&rsquo;m Vimala, a product designer focused on enterprise UX, SaaS, AI-powered
                products, and design systems. I&rsquo;m drawn to products where the problem is
                rarely a single screen — it&rsquo;s the workflow behind it: the rules, states,
                dependencies, and edge cases that determine whether a product actually works.
              </p>

              <p className="type-body mt-4 max-w-[580px]" style={{ color: 'var(--color-text-muted)' }}>
                My role is to bring structure to that complexity — understand the problem, align
                the right people, and turn decisions into experiences that are clear, usable, and
                scalable.
              </p>

              <a href="/about" className="nav-link inline-block mt-8" style={{ fontSize: '13px' }}>
                Read more about how I work →
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
