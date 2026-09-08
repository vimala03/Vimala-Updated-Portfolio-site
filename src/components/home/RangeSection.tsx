import { motion, useReducedMotion } from 'framer-motion'
import Container from '../Container'

// Five areas of range — deliberately light: a horizontal editorial row
// (5-up desktop, 2-up tablet, stacked mobile) with a hairline top rule
// per item, matching the same number/label-row language already used in
// Selected Work and How I Think. No cards, no shadows, no icons — meant
// to be scannable in a few seconds, not another feature-grid section.
const RANGE = [
  { label: 'Enterprise', text: 'Complex workflows, permissions, and systems' },
  { label: 'AI', text: 'Intelligent products and human-AI workflows' },
  { label: '0 → 1', text: 'From problem framing to working product' },
  { label: 'Consumer', text: 'Travel, discovery, and conversion' },
  { label: 'Social Impact', text: 'Healthcare and civic challenges' },
]

export default function RangeSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section style={{ paddingTop: 'var(--space-section-compact)', paddingBottom: 'var(--space-section-compact)' }}>
      <Container>
        <div className="border-t pt-6" style={{ borderColor: 'var(--color-border)' }}>
          <span className="type-eyebrow">Designing across complexity</span>
          <h2 className="type-heading mt-5 max-w-[620px]">
            Enterprise products. AI systems. 0 → 1 builds. Consumer experiences.
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6 mt-8 lg:mt-10">
          {RANGE.map((area, i) => (
            <motion.div
              key={area.label}
              className="border-t pt-4"
              style={{ borderColor: 'var(--color-border)' }}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.45, delay: reduceMotion ? 0 : i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="type-small" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, color: 'var(--color-text)' }}>
                {area.label}
              </div>
              <p className="type-small mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
                {area.text}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
