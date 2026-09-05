import { motion, useReducedMotion } from 'framer-motion'
import Container from '../Container'
import Button from '../Button'
import HeroCharacterSlot from './HeroCharacterSlot'

const METADATA = ['Enterprise UX', 'SaaS', 'AI', 'Design Systems']

// From the old portfolio's credibility strip — real, not fabricated.
// Ported as plain number/label pairs (no icons, no cards) so it reads as
// an editorial detail sitting under the paragraph, not a dashboard
// widget competing with the headline.
const STATS = [
  { value: '8+', label: 'Years experience' },
  { value: '40+', label: 'Products shipped' },
  { value: '6+', label: 'Cross-industry solutions' },
  { value: '3', label: '0 → 1 builds' },
]

export default function Hero() {
  const reduceMotion = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0.01 : 0.7, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section
      // background: --color-hero-bg (sampled from the illustration's own
      // wall) instead of the page's --color-bg — the hero's own surface
      // carries the artwork's warm tone everywhere, not just where the
      // image sits, so there's nothing for the image's edges to
      // visually cut against. Scoped to this section only.
      // paddingTop: measured at 122.4px of nav→content gap at 1440
      // (50.4px of actual padding, since body already reserves the
      // fixed nav's own height) — short of the 52–64px audit target.
      // 4.5vw (was 3.5vw) lands on the existing 3.5rem/56px cap at both
      // 1440 and 1280 instead of falling short of it, without raising
      // the cap itself.
      className="relative overflow-hidden pb-6 md:pb-[var(--space-section-compact)]"
      style={{ paddingTop: 'clamp(2rem, 4.5vw, 3.5rem)', background: 'var(--color-hero-bg)' }}
    >
      <Container>
        {/* One grid for the whole hero, not "full-width headline, then a
            row below" — this is what lets the illustration start at the
            same top edge as the eyebrow (grid default alignment, not a
            margin hack) instead of being pushed below the headline.
            6/6: col-span-5 for text was tried first and forced the
            headline to 5 lines (too narrow for "products that feel" at
            this font size) — widened to 6/6 and re-measured until it
            landed on the reference's 3-line break, rather than assumed.
            Column gap matches the standard 32px used elsewhere in this
            pattern — now that the illustration is sized to be a real
            visual counterweight to the headline rather than a small
            inset image, it reads as an integrated second half of one
            composition at normal spacing; the earlier tightened gap was
            compensating for the image reading as too small/separate. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-8 items-start">
          <div className="lg:col-span-6">
            {/* Specialization eyebrow now leads the column (previously
                this same copy sat as a "metadata" line between the
                paragraph and the CTAs, in a spot that read as an
                afterthought). Establishing it first — before the name,
                before the headline — matches the old portfolio's
                stronger information order: what she does, then who she
                is, then the headline. */}
            <motion.p {...fadeUp(0)} className="type-eyebrow">
              {METADATA.join('   ·   ')}
            </motion.p>

            {/* "Hello, I'm Vimala." replaces the old "Vimala Banavath —
                Product Designer" identity eyebrow — the name is already
                in the navbar, and stacking a full name+role line, this
                greeting, AND the headline would be three identity beats
                in a row. One restrained editorial greeting carries it.
                Reuses the same italic-serif treatment as the footer's
                "and make an impact" line rather than inventing a new
                type style. */}
            <motion.p
              {...fadeUp(0.05)}
              className="mt-5"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.15rem', color: 'var(--color-text-muted)' }}
            >
              Hello, I&rsquo;m Vimala.
            </motion.p>

            {/* Exactly 3 lines at lg+ via two manual <br>s, each hidden
                below `lg` (display:none — a <br> that doesn't render
                doesn't break) so mobile/tablet fall back to natural
                wrapping of the same unbroken sentence; the trailing
                {' '} before each keeps a real word-space when the <br>
                disappears. Only "experiences." carries the accent color.
                Size: the shared .type-hero clamp only at <lg (inline,
                below); a lg+-only override (.hero-headline-lg,
                index.css) takes over above that, calibrated so this
                exact 3-line break fits the real column width at both
                1024px and 1280px+ without spilling to a 4th line.

                Font: Instrument Sans, not the shared .type-hero's
                Playfair Display — the one deliberate exception to
                "this is the hero, don't touch it," per an explicit,
                separate typography-system pass consolidating the site
                on one sans (body/nav/buttons/labels, all already
                Instrument Sans) + one serif reserved for secondary
                editorial moments (kept right below, on "Hello, I'm
                Vimala."). `type-hero` is dropped from the className
                since every property it would set is overridden here
                anyway — weight 600 and tighter -0.02em tracking than
                the serif's -0.03em (tuned for Playfair's proportions,
                not this font's).
                line-height 1.05 (was 1.1): visually checked against the
                audit's 0.98–1.05 range — 1.05 keeps clear separation
                between the 3 lines (0.98–1.0 read visibly tighter/more
                cramped for mixed-case text at this weight) while
                trimming ~13px off the block's total height versus 1.1,
                which is the actual source of the hero's few unexplained
                px of extra height (not padding or the image — measured:
                content already governs the section's height, not the
                image, at 1.1 line-height it did so by more than
                necessary). */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-[var(--color-text)] mt-6 hero-headline-lg"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                fontSize: 'clamp(2.375rem, calc(4vw - 3.2px), 3rem)',
              }}
            >
              I turn complex{' '}
              <br className="hidden lg:inline" />
              products into clear,{' '}
              <br className="hidden lg:inline" />
              confident <span style={{ color: 'var(--color-accent)' }}>experiences.</span>
            </motion.h1>

            {/* .type-body's own clamp caps at 16px (measured 15.84px
                rendered at 1440) — under the 17–18px desktop target
                given for this specific paragraph. A local override
                (not a change to the shared token, which is also used
                in every other section below the hero) brings it to
                ~17px at 1440/1280 without touching .type-body itself;
                max-w-[480px] is unchanged and still what keeps the
                measure controlled, not the font-size. */}
            <motion.p
              {...fadeUp(0.2)}
              className="type-body mt-7 max-w-[480px]"
              style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(15px, 1.18vw, 17px)' }}
            >
              Product designer focused on enterprise UX, SaaS, AI-powered products, and
              design systems—turning complex workflows, information, and constraints into
              products people can understand and use with confidence.
            </motion.p>

            {/* Credibility strip from the old portfolio, ported as plain
                number/label pairs behind one top rule — no icons, no
                per-stat cards, so it reads as one restrained editorial
                detail rather than a stats dashboard competing with the
                headline. A 2-col/4-col grid (not a flex row with
                dividers) so it never produces a stray border on wrap at
                narrower widths. */}
            <motion.div
              {...fadeUp(0.3)}
              className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 mt-9 pt-6 border-t max-w-[520px]"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.75rem', lineHeight: 1, color: 'var(--color-text)' }}>
                    {stat.value}
                  </div>
                  <div className="type-small mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs — "About me" is now the existing outline Button
                variant (transparent, thin border, sweep-to-dark hover)
                instead of a plain text link, so it reads as a real
                secondary action next to the filled primary rather than
                a footnote beside it. Same component, same height/shape
                system already used elsewhere — no new button style. */}
            <motion.div {...fadeUp(0.4)} className="mt-9 flex flex-wrap items-center gap-6">
              <Button href="#work" variant="primary">
                View selected work →
              </Button>
              <Button href="/about" variant="outline">
                About me →
              </Button>
            </motion.div>
          </div>

          {/* The illustrated portrait — see HeroCharacterSlot.tsx. Desktop
              (lg+) only; completely absent on mobile, not hidden in
              place. Default grid alignment (no self-end, no negative
              margin) means it starts at the same top edge as the
              eyebrow — the row's height is set by whichever column is
              taller (the image), and both columns share that same top.

              No separate CSS/SVG floaters here — an earlier pass added a
              small decorative layer (ring, leaf sprig, paper card)
              because the previous asset was just the seated portrait on
              a plain desk. The asset has since been replaced with a
              version that bakes its own floating callouts, arrows,
              botanical elements and handwritten accent text directly
              into the artwork — reproducing them again in CSS would
              duplicate what's already in the image, so that layer is
              gone. The only other change from the old asset: its
              background region has been hard-replaced (flood-fill, zero
              px touched outside that region — verified byte-identical
              elsewhere) to the site's exact --color-hero-bg, the same
              one-time treatment already documented on the display file
              itself, so it drops onto this section with no visible
              seam. */}
          <motion.div
            // max-width of 650px is intentionally generous — at every
            // desktop breakpoint the grid cell itself (≤600px) is the
            // real, tighter constraint, so this just lets the image fill
            // its full column rather than sitting inset within it. Square
            // aspect ratio means "wide" and "tall" scale together, and
            // the section padding above already accounts for the
            // resulting height at every breakpoint down to 1024.
            className="hidden lg:block lg:col-span-6 max-w-[650px]"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.9, delay: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroCharacterSlot />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
