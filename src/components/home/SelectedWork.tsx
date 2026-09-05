import { useId, useRef, useState, KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '../Container'
import CaseStudyMedia from '../case-study/CaseStudyMedia'
import ConfidentialNotice from '../case-study/ConfidentialNotice'
import ConfidentialImageOverlay from '../case-study/ConfidentialImageOverlay'

interface Project {
  id: string
  number: string
  name: string
  route: string
  descriptor: string
  description: string
  scope: string
  role: string
  status: string
  image: string
  imageAlt: string
  /** Only set where the default center crop cuts into meaningful
   *  content — e.g. a source image wider than the 820:460 display
   *  ratio with text sitting right at one edge. Omit to get the
   *  browser's normal center crop. */
  imagePosition?: string
  /** True for NDA-restricted projects — swaps the featured visual for a
   *  confidential treatment instead of a real screenshot gallery. Two
   *  variants: no `image` → ConfidentialNotice (plain gradient card, no
   *  real asset exists); `image` set → ConfidentialImageOverlay (the
   *  real project image with a privacy-preserving overlay). */
  confidential?: boolean
}

// These five display titles and this exact order are an explicit,
// repeated instruction — not a naming choice made in this file.
//
// #02 "AI-Powered Search & Decision Optimization" is Cornerstone
// OnDemand's Content Manager — its own established framing (hero image
// literally named aisearch.jpeg, original site copy "search, context and
// intelligent assistance").
//
// #03 "Content Manager Metadata Generation" is a genuinely separate,
// NDA-restricted case study — confirmed distinct from #02. Its title,
// date range and summary below are exactly what was provided. Its
// `image` is a real screenshot (public/images/contentmanager.jpeg,
// sourced the same way as vet-rider.jpeg below — the original entry's
// own Figma MCP image URL is long dead, confirmed 404, but a local copy
// survived) shown under ConfidentialImageOverlay's privacy-preserving
// tint rather than hidden behind a plain gradient card — the image
// itself isn't sensitive (an already-published product screenshot with
// its own on-image marketing caption), only the underlying NDA work is.
const PROJECTS: Project[] = [
  {
    id: 'youclean',
    number: '01',
    name: 'YouClean',
    route: '/work/youclean',
    descriptor: 'Operational product experience',
    description:
      'Designing a connected system for managing laundry operations — from order intake to delivery status.',
    scope: 'Product strategy · UX',
    role: 'Founder / Product Designer',
    status: '0 → 1 · Live',
    image: '/images/case-studies/youclean-homepage-stage.png',
    imageAlt:
      'YouClean CRM operations dashboard, surrounded by supporting views: revenue trend, orders by type, order volume, a new-order form, recent activity, delayed pickups, and the mobile operations view.',
  },
  {
    id: 'cornerstone-search',
    number: '02',
    name: 'AI-Powered Search & Decision Optimization',
    route: '/work/cornerstone',
    descriptor: 'Enterprise AI assistant',
    description:
      'An AI assistant surfacing smart search and personalised suggestions inside Cornerstone OnDemand’s Content Manager.',
    scope: 'Product design · AI interaction',
    role: 'Lead Product Designer',
    status: 'Shipped',
    image: '/images/case-studies/aisearch.jpeg',
    imageAlt: 'AI assistant offering streamlined navigation via smart search and personalised suggestions',
    // Source is 1695×745 (2.28:1) — wider than the shared 820:460
    // (1.78:1) display ratio. A center crop (the default) cuts ~110px
    // from each side, slicing straight through the headline text
    // sitting in the image's left third. Anchoring left instead crops
    // only from the right, where the trailing edge of a UI screenshot
    // is lost rather than a sentence.
    imagePosition: 'left center',
  },
  {
    id: 'content-manager-metadata',
    number: '03',
    name: 'Content Manager Metadata Generation',
    route: '/work/content-manager-metadata',
    descriptor: 'Enterprise content metadata',
    description:
      'Improved search accuracy and content discoverability by introducing AI-powered metadata generation, strengthening taxonomy and information architecture across the platform.',
    scope: 'Metadata · Search · IA',
    role: 'Product Designer',
    status: 'Confidential · NDA',
    image: '/images/contentmanager.jpeg',
    imageAlt: 'Content Manager metadata generation and translation interface',
    confidential: true,
  },
  {
    id: 'flyin',
    number: '04',
    name: 'FlyIn Travel & Tourism',
    route: '/work/flyin',
    descriptor: 'AI-powered travel search',
    description:
      'Rebuilding travel search and trip planning around intent — from first search to final booking.',
    scope: 'Search · Trip planning · Personalisation',
    role: 'UX Lead',
    status: 'Shipped',
    // New high-res asset at public/images/flyincasestudy.jpeg — distinct
    // from the low-res one still at case-studies/flyin.jpeg, kept
    // untouched. A wide editorial mockup (laptop + phone on a desk, not
    // just the raw UI); its own 1677×938 (1.788:1) is within 0.3% of
    // the shared 820:460 (1.783:1) container, so a centered cover-fit
    // crops under 2px total — no object-position override needed.
    image: '/images/flyincasestudy.jpeg',
    imageAlt: 'Flyin.com editorial cover — "Travel made simpler," the website shown on a laptop and the app on a phone, styled with travel props on a desk',
  },
  {
    id: 'civtech',
    number: '05',
    name: 'Menopause Care',
    route: '/work/civtech',
    descriptor: 'Health / social-impact design sprint',
    description:
      'A 72-hour design sprint building menopause-care resources for the women typical healthcare products overlook.',
    scope: 'Research · UX · Prototype',
    role: 'UX Designer',
    status: 'Finalist · CivTech Scotland',
    // New high-res asset at public/images/civtech.jpeg (root — distinct
    // from the low-res one still at case-studies/civtech.jpeg, kept
    // untouched). A conceptual/editorial cover for a proposed solution,
    // not a shipped product screenshot — imageAlt is written to match;
    // no object-position override needed, its own 1672×941 (1.777:1)
    // is already within 0.3% of the shared 820:460 (1.783:1) container,
    // so a centered cover-fit crops under 2px total.
    image: '/images/civtech.jpeg',
    imageAlt: 'Editorial concept cover for Menopause Care — "Support through change": a proposed solution to help women understand, manage, and feel more in control during menopause',
  },
]

// "Vet & Rider Wellness Platform" — restored from history in the
// previous pass, now hidden again on request. Its data, real image
// (public/images/vet-rider.jpeg), ConfidentialImageOverlay treatment,
// dedicated page and /work/vet-rider route are all left fully intact —
// this constant is simply never spread into PROJECTS below, so it
// renders nowhere in the list or the keyboard rotation. Move it back
// into PROJECTS (as the last entry, #06) to reactivate; nothing else
// needs to change.
const VET_RIDER_PROJECT: Project = {
  id: 'vet-rider',
  number: '06',
  name: 'Vet & Rider Wellness Platform',
  route: '/work/vet-rider',
  descriptor: 'Website and app design',
  description:
    'Built a platform connecting veterinarians and horse riders through data-driven insights and remote healthcare, enabling smarter, more accessible care.',
  scope: 'Health tech · Cross-platform',
  role: 'Lead UX Designer',
  status: 'Confidential · NDA',
  image: '/images/vet-rider.jpeg',
  imageAlt: 'Vet & Rider Wellness Platform',
  confidential: true,
}
void VET_RIDER_PROJECT // referenced only to document/preserve the data above; intentionally unused while hidden

/** Scope / Role / Status — three columns on desktop, two on narrow phones. */
function MetaRow({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4 mt-6 pt-5 border-t" style={{ borderColor: 'var(--color-border)' }}>
      {([
        ['Scope', project.scope],
        ['Role', project.role],
        ['Status', project.status],
      ] as const).map(([label, value]) => (
        <div key={label}>
          <div className="type-eyebrow" style={{ fontSize: '10px' }}>{label}</div>
          <div className="type-small mt-1.5" style={{ color: 'var(--color-text)' }}>{value}</div>
        </div>
      ))}
    </div>
  )
}

/** The featured visual IS the case-study link — no separate "View case
 *  study" text underneath it. A small arrow badge fades in on hover/
 *  focus as the only affordance; the Link itself is natively keyboard-
 *  focusable and Enter-activates, and the shared global :focus-visible
 *  rule (index.css) still draws a visible ring on it, so removing the
 *  text CTA doesn't remove either the keyboard path or the visible
 *  focus state — just the redundant label. */
function FeaturedMedia({ project, priority }: { project: Project; priority: boolean }) {
  const reduceMotion = useReducedMotion()

  // Confidential projects link to a request-access page instead of a
  // screenshot gallery — same image-as-link pattern as every other
  // project, just a different destination. Two treatments depending on
  // whether a real asset exists: no `image` → the plain gradient
  // ConfidentialNotice card; `image` set → the real project image
  // under ConfidentialImageOverlay's privacy-preserving tint.
  if (project.confidential) {
    return (
      <Link
        to={project.route}
        aria-label={`${project.name}: confidential, case study available on request`}
        className="group/media relative block mt-6"
      >
        <motion.div whileHover="hover" initial="rest">
          <motion.div variants={{ rest: { scale: 1 }, hover: { scale: reduceMotion ? 1 : 1.015 } }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            {project.image ? (
              <ConfidentialImageOverlay src={project.image} title={project.name} />
            ) : (
              <ConfidentialNotice title={project.name} />
            )}
          </motion.div>
        </motion.div>
      </Link>
    )
  }

  return (
    <Link
      to={project.route}
      aria-label={`View case study: ${project.name}`}
      className="group/media relative block mt-6"
    >
      <motion.div className="relative overflow-hidden" style={{ background: 'var(--color-border)' }} whileHover="hover" initial="rest">
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: reduceMotion ? 1 : 1.015 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <CaseStudyMedia
            src={project.image}
            alt={project.imageAlt}
            loading={priority ? 'eager' : 'lazy'}
            objectFit="cover"
            objectPosition={project.imagePosition}
            aspectRatio="820 / 460"
            rounded={false}
          />
        </motion.div>
        <motion.span
          aria-hidden
          className="absolute bottom-4 right-4 flex items-center justify-center opacity-0 group-hover/media:opacity-100 group-focus-visible/media:opacity-100"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '999px',
            background: 'var(--color-bg)',
            color: 'var(--color-text)',
            transition: 'opacity 250ms ease',
          }}
        >
          →
        </motion.span>
      </motion.div>
    </Link>
  )
}

/**
 * A curated project index (left) driving one large featured panel
 * (right) — real WAI-ARIA vertical tabs (roving tabindex, Up/Down/Home/
 * End), not a click handler on plain divs.
 *
 * The two-column composition holds from `md` (768px) upward. Below
 * `md`, every project renders as its own stacked block instead of
 * squeezing the desktop grid down.
 */
export default function SelectedWork() {
  const reduceMotion = useReducedMotion()
  const baseId = useId()
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const active = PROJECTS[activeIndex]

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null
    if (e.key === 'ArrowDown') next = (index + 1) % PROJECTS.length
    else if (e.key === 'ArrowUp') next = (index - 1 + PROJECTS.length) % PROJECTS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = PROJECTS.length - 1
    if (next === null) return
    e.preventDefault()
    setActiveIndex(next)
    tabRefs.current[PROJECTS[next].id]?.focus()
  }

  return (
    // Top padding uses the compact token, not standard — matches the
    // Work→Expertise and Expertise→About transitions below it. Hero→Work
    // was the single largest gap on the page (144px combined) and, once
    // actually viewed, read as a flat, undifferentiated pause rather than
    // "intentional breathing room" — no heading, no visual anchor, just
    // colour-shift and a hairline rule. Tightening it to match the rest
    // of the core narrative reads as one continuous page instead of a
    // hero floating above a separated block.
    //
    // background: measured — this section had no background of its own,
    // so it showed the page's --color-bg (#fafaf9, near-neutral) directly
    // under the Hero's full cream (--color-hero-bg, #f7f1ea), an abrupt
    // warm-to-neutral handoff that read as two different palettes.
    // --color-section-warm is a quiet bridge tone in the same warm
    // family, distinct enough to still register as its own section.
    <section
      id="work"
      className="pt-10 md:pt-[var(--space-section-compact)]"
      style={{ paddingBottom: 'var(--space-section-compact)', background: 'var(--color-section-warm)' }}
    >
      <Container>
        <div className="border-t pt-6" style={{ borderColor: 'var(--color-border)' }}>
          {/* "Case studies" — the eyebrow previously repeated "Selected
              work" right above a heading that says "Selected product
              work.", which read as saying the same thing twice. */}
          <span className="type-eyebrow">Case studies</span>
          <h2 className="type-heading mt-5 max-w-[520px]">Selected product work.</h2>
        </div>

        {/* md+: project index + featured panel */}
        <motion.div
          className="hidden md:grid grid-cols-12 gap-x-6 lg:gap-x-8 mt-8 lg:mt-10"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Selected projects"
            className="col-span-4 flex flex-col"
          >
            {PROJECTS.map((project, index) => {
              const selected = index === activeIndex
              return (
                <button
                  key={project.id}
                  ref={(el) => { tabRefs.current[project.id] = el }}
                  role="tab"
                  id={`${baseId}-tab-${project.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${project.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  type="button"
                  // py-6 (was py-4): more generous row breathing room now
                  // that each item carries three lines (number, title,
                  // descriptor) instead of one — each project should
                  // read as its own distinct block, not a dense line.
                  className="group text-left py-6 border-t"
                  style={{
                    borderTopColor: 'var(--color-border)',
                    borderLeft: selected ? '2px solid var(--color-accent)' : '2px solid transparent',
                    paddingLeft: '18px',
                    background: 'transparent',
                    cursor: 'pointer',
                    transition: 'border-color 250ms ease',
                  }}
                >
                  {/* Real grid, not flex — measured the previous flex
                      layout live and found title's left edge drifting
                      up to 2.4px per row ("01" is narrower than
                      "02"–"05" in a proportional sans; the gap-3 after
                      it then starts from a different x each time). A
                      grid's column tracks are sized once per row and
                      shared by every cell in that column, so as long as
                      the number column is a consistent width, title and
                      subtitle both land on the exact same x with no
                      manual offset. `tabular-nums` on the number is
                      what makes that column consistent — every 2-digit
                      number then renders at the identical width
                      regardless of which digits it contains. Row 2
                      (subtitle) reuses column 2, so it starts flush
                      with the title, not the number — the alignment
                      explicitly asked for.

                      alignItems: baseline (was `start`) — `start` put
                      the number's and title's boxes at the same top,
                      but their line-heights differ (number: 11px font
                      in a 15.4px line; title: 19px font in a 28.5px
                      line), so the actual glyphs sat at different
                      heights within those boxes — measured ~2.5px of
                      drift, visible as the number reading slightly high
                      against the title. `baseline` aligns by the real
                      text baseline instead of the box edge, so it's
                      independent of the two elements' different font
                      sizes/line-heights. It also only ever considers a
                      wrapped element's FIRST line for that baseline, so
                      a 2-line title ("AI-Powered Search & Decision
                      Optimization") still aligns the number to line 1,
                      not the wrapped block's center — exactly what a
                      manual per-project margin would have had to
                      reproduce by hand. */}
                  <div className="grid" style={{ gridTemplateColumns: 'auto 1fr auto', columnGap: '12px', rowGap: '6px', alignItems: 'baseline' }}>
                    {/* .type-mono is JetBrains Mono — a third font
                        family outside the locked two-family system
                        (Instrument Sans / Playfair Display). Same class
                        for its size/weight/tracking/uppercase,
                        fontFamily overridden inline to the shared sans
                        so the index numbers read as this site's
                        typography, not a code/mono accent. */}
                    <span
                      className="type-mono"
                      style={{
                        gridColumn: 1,
                        gridRow: 1,
                        fontFamily: 'var(--font-body)',
                        fontVariantNumeric: 'tabular-nums',
                        color: selected ? 'var(--color-accent)' : 'var(--color-text-faint)',
                        transition: 'color 250ms ease',
                      }}
                    >
                      {project.number}
                    </span>
                    {/* Title is the strongest element in the row — its
                        own inline size (18/19px desktop, per the
                        hierarchy this list is meant to establish)
                        rather than the shared .type-subheading token,
                        which tops out at 18px only at wide viewports.
                        Selected sets color inline (always wins); when
                        unselected, color/hover both come from the
                        Tailwind classes below so the group-hover tint
                        actually has something to override. Weight is
                        the only thing that changes on selection — never
                        size — so nothing shifts the row's height or the
                        arrow's position when switching projects. */}
                    <span
                      className={selected ? '' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]'}
                      style={{
                        gridColumn: 2,
                        gridRow: 1,
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(16px, 1.4vw, 19px)',
                        letterSpacing: '-0.01em',
                        color: selected ? 'var(--color-text)' : undefined,
                        fontWeight: selected ? 600 : 500,
                        transition: 'color 250ms ease',
                      }}
                    >
                      {project.name}
                    </span>
                    <span
                      aria-hidden
                      className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                      style={{
                        gridColumn: 3,
                        gridRow: 1,
                        color: 'var(--color-accent)',
                        opacity: selected ? 1 : undefined,
                        transition: 'opacity 250ms ease',
                      }}
                    >
                      →
                    </span>
                    {/* Descriptor — third tier of the number → title →
                        descriptor hierarchy; surfaces `project.descriptor`,
                        previously defined on every project but never
                        actually rendered anywhere. Same column as the
                        title (2), one row down. */}
                    <p className="type-small" style={{ gridColumn: 2, gridRow: 2, color: 'var(--color-text-faint)' }}>
                      {project.descriptor}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="col-span-8">
            {PROJECTS.map((project, i) => (
              <div
                key={project.id}
                role="tabpanel"
                id={`${baseId}-panel-${project.id}`}
                aria-labelledby={`${baseId}-tab-${project.id}`}
                hidden={project.id !== active.id}
                tabIndex={0}
              >
                {/* The name appears once in the list (left) and once here
                    — that's the only two times it appears on screen.
                    Sans, not the shared .type-heading serif — this panel
                    is "project information" (the same category as the
                    list's title/number/descriptor, all sans per the
                    typography pass), not a section-level editorial
                    heading like "Selected product work." above it.
                    Right label is `project.scope`, not `descriptor` —
                    the list's third line already shows descriptor, so
                    repeating it here read as the two sides saying the
                    same thing. scope is real, existing per-project data
                    (also shown in the Scope row below) but genuinely
                    different text from the left subtitle, and gives
                    this position a distinct job: quick discipline/
                    category positioning rather than a duplicated
                    caption. items-start keeps it pinned to the title's
                    top edge when the title wraps to two lines (e.g.
                    "Content Manager Metadata Generation"). */}
                <div className="flex items-start justify-between gap-6">
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '1.75rem',
                      letterSpacing: '-0.01em',
                      color: 'var(--color-text)',
                    }}
                  >
                    {project.name}
                  </h3>
                  <span
                    className="type-small"
                    style={{
                      flexShrink: 0,
                      maxWidth: '160px',
                      textAlign: 'right',
                      marginTop: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {project.scope}
                  </span>
                </div>
                <p className="type-body mt-3 max-w-[560px]" style={{ color: 'var(--color-text-muted)' }}>
                  {project.description}
                </p>

                <FeaturedMedia project={project} priority={i === 0} />
                <MetaRow project={project} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile/tablet-narrow: stacked, no tabs */}
        <div className="md:hidden mt-10 flex flex-col" style={{ gap: 'var(--space-section-standard)' }}>
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="type-mono" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-accent)' }}>{project.number}</span>
              <h3
                className="mt-2 max-w-[520px]"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.5rem', letterSpacing: '-0.01em', color: 'var(--color-text)' }}
              >
                {project.name}
              </h3>
              <p
                className="type-small mt-1"
                style={{ textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--color-accent)' }}
              >
                {project.descriptor}
              </p>
              <p className="type-body mt-3" style={{ color: 'var(--color-text-muted)' }}>{project.description}</p>

              <FeaturedMedia project={project} priority={i === 0} />
              <MetaRow project={project} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
