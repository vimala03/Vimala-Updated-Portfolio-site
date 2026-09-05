import { motion, useReducedMotion } from 'framer-motion'
import Container from '../Container'

// The closing statement, plus one clear primary action — Email/
// LinkedIn/Résumé/WhatsApp themselves live in Footer.tsx directly below
// (now visually subordinate to this section, not its own dark panel),
// so this doesn't repeat the same links, just points at them.
export default function ContactSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="contact"
      // paddingTop/Bottom: measured the compact→compact rhythm from the
      // previous pass at ~143px total (How I Work's own 56px trailing
      // padding + this section's 56px + the 24px after the divider) —
      // still read as too much once About was removed. This explicit
      // pass asked for a 25–35% cut specifically here (not a change to
      // --space-section-compact itself, which Hero→Work and Work→How I
      // Work still rely on): a small dedicated clamp landing at ~20px
      // on desktop brings the total to ~100px, a ~30% reduction, while
      // keeping a true floor (16px) on narrow phones instead of
      // collapsing to nothing. paddingBottom mirrors it so Contact
      // doesn't read as lopsided against its own divider above.
      style={{ paddingTop: 'clamp(0.75rem, 1vw, 1.125rem)', paddingBottom: 'clamp(0.75rem, 1vw, 1.125rem)' }}
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
          <span className="type-eyebrow">Contact</span>
          <h2 className="type-hero mt-6" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
            Working on something <span style={{ color: 'var(--color-accent)' }}>complex?</span>
          </h2>
          <p className="type-body mt-5 max-w-[440px]" style={{ color: 'var(--color-text-muted)' }}>
            I&rsquo;m interested in products where thoughtful design can make a meaningful
            difference — for users, teams, and the business.
          </p>
          <a href="mailto:vimalamdes13@gmail.com" className="nav-link inline-block mt-8" style={{ fontSize: '13px' }}>
            Get in touch →
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
