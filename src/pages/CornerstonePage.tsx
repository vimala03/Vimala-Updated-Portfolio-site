import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { MainContentAnchor } from '../components/SkipLink'
import {
  ProgressBar,
  NextProjectCTA,
  ScrollReveal,
} from '../components/case-study'

/* ============================================================================
   Cornerstone — flagship case study rebuild.

   Ground-up rewrite (not a restyle of the old page): the previous
   implementation was a ~1,300-line hand-authored HTML string styled by its
   own bespoke stylesheet (a decorative serif display font, a generic SaaS
   blue, a full dark "TL;DR" section, and 15 hand-drawn SVG wireframes
   standing in for product evidence). None of that survives here — every fact below is
   carried over from that page's real content (verified against it directly:
   team, timeline, research numbers, the three shipped features, the three
   Key Decisions, and the impact metrics), but the SVG wireframes are gone.
   The only visual evidence used throughout is the one real, authorized
   Cornerstone/Apollo AI product screenshot — public/images/case-studies/
   aisearch.jpeg — reused deliberately at a few key moments rather than
   invented. Where a section has no dedicated real screenshot, it's carried
   by typography and the existing content instead of a fabricated mockup.

   Built entirely from the portfolio's own shared case-study components
   (the same library the YouClean rebuild uses) — no new design system,
   no decorative serif display font, no dark sections, homepage tokens
   throughout.
============================================================================ */

const HERO_IMAGE = '/images/case-studies/aisearch.jpeg'
const HERO_IMAGE_ALT =
  'Apollo AI panel inside Cornerstone Content Manager, suggesting a title, description and skill tags for a course, above the Content Manager catalog list.'

const ACCENT = '#bf6853' // homepage terracotta
const GREEN = '#1e6640' // existing muted-green token, used for positive/reduction outcomes
const INK = '#111110'
const INK_MUTED = '#5a5954'

export default function CornerstonePage() {
  return (
    <div className="cornerstone-no-serif">
      {/* SectionBlock/PullQuote/DecisionCard (shared with every other case
          study) render their headings in var(--font-display) — the shared
          display font token — by design; correct for those pages, not for
          this one. Scoped override rather than touching the shared
          components: every other case study using them keeps that token
          untouched. */}
      <style>{`
        .cornerstone-no-serif [style*="var(--font-display)"] {
          font-family: var(--font-body) !important;
        }

        /* Mobile readability pass (390–430px), scoped to this page only.
           Round two: the first pass (0.7–0.78rem → 0.8/0.82rem) still left
           several priority blocks — Problem body copy, the journey row's
           captions, the decision cards, product/feature descriptions, the
           enterprise and outcome sections' supporting text, the closing
           POV copy — reading a little small at 390–430px, since a lot of
           that copy sits at 0.8/0.82rem, just above the first pass's
           ceiling. This raises the whole 0.7–0.82rem supporting-text band
           to one consistent ~0.86rem on mobile (a further +1–2px on top
           of round one, not a re-shrink), so the page no longer has a
           two-tier "some captions bigger than others" result.

           Still matched by the literal inline style string (same
           technique as the font-family override above) rather than
           editing every call site — but now qualified with
           [style*="font-family: var(--font-body)"] as well, so it can
           safely include 0.8rem/0.82rem without also catching the
           decorative handwritten annotations (font-family: "Segoe
           Script"…, several of them also literally 0.8rem) or the small
           icon glyphs inside circular badges (font-size only, no
           font-family of their own) — both explicitly meant to stay at
           their current size, not read as body copy.

           Still excludes the 0.58–0.68rem eyebrow/label tier and every
           clamp()-based heading — this remains a reading-text floor
           raise only, not a heading or label change. */
        @media (max-width: 480px) {
          .cornerstone-no-serif [style*="font-family: var(--font-body)"][style*="font-size: 0.7rem"],
          .cornerstone-no-serif [style*="font-family: var(--font-body)"][style*="font-size: 0.72rem"],
          .cornerstone-no-serif [style*="font-family: var(--font-body)"][style*="font-size: 0.74rem"],
          .cornerstone-no-serif [style*="font-family: var(--font-body)"][style*="font-size: 0.75rem"],
          .cornerstone-no-serif [style*="font-family: var(--font-body)"][style*="font-size: 0.76rem"],
          .cornerstone-no-serif [style*="font-family: var(--font-body)"][style*="font-size: 0.78rem"],
          .cornerstone-no-serif [style*="font-family: var(--font-body)"][style*="font-size: 0.8rem"] {
            font-size: 0.86rem !important;
          }
          .cornerstone-no-serif [style*="font-family: var(--font-body)"][style*="font-size: 0.82rem"] {
            font-size: 0.88rem !important;
          }
        }
      `}</style>
      <ProgressBar color={ACCENT} />
      <Navbar />
      <MainContentAnchor />

      {/* ====================================================================
         01 — THE TRANSFORMATION (hero)
         Custom-built rather than the shared CaseStudyHero component: that
         component's H1 always renders in the shared display font token
         (var(--font-display)), which this case study is required to avoid
         entirely.

         The one real, authorized product visual (aisearch.jpeg — the higher-
         resolution of the two authorized exports, 1695×745 vs csx.jpeg's
         1228×550, so it holds up at the large size this hero needs) is
         untouched pixel-for-pixel: no recolor, no overlay, no fake UI added.
         A generated visual reference was used only for the composition
         (two-column, large screen right, soft background shape, stat row
         below) — never as a source of UI or content.
      ==================================================================== */}
      <div style={{ padding: '1.25rem 1.5rem 0', maxWidth: '1280px', margin: '0 auto', overflow: 'hidden' }}>
        {/* Utility row — back link + category tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}
        >
          <Link
            to="/#work"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: INK_MUTED, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            ← Back to work
          </Link>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {['AI', 'Enterprise', 'SaaS'].map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: INK_MUTED }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Mobile order: headline → image → metadata (per spec, unchanged
            from the previous pass). Desktop: headline+metadata stacked in a
            tight left column beside a large image column, top-aligned (not
            centered) so the image sits flush with the headline instead of
            floating in the middle of a taller row — the main fix for "feels
            disconnected from the content". Every gap tightened throughout. */}
        <style>{`
          .cs-hero-grid { display: grid; gap: 1.25rem; grid-template-areas: "text" "image" "meta"; }
          @media (min-width: 1024px) {
            .cs-hero-grid { grid-template-columns: 0.85fr 1.15fr; column-gap: 2rem; row-gap: 0.5rem; grid-template-areas: "text image" "meta image"; align-items: start; }
          }
        `}</style>
        <div className="cs-hero-grid">
          <motion.div
            style={{ gridArea: 'text' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.85rem' }}>
              01 · The transformation
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(2.1rem, 3.4vw, 2.9rem)',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                fontWeight: 600,
                color: INK,
                marginBottom: '1rem',
              }}
            >
              Goodbye admin fatigue.{' '}
              <em style={{ fontStyle: 'italic', color: ACCENT, fontWeight: 500 }}>Hello intelligent workflows.</em>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: INK_MUTED, lineHeight: 1.65, maxWidth: '42ch' }}>
              Redesigning Cornerstone OnDemand's Content Manager with AI-powered metadata, seamless
              multilingual translation, and smart session continuity, embedding Apollo AI directly into
              the daily admin workflow.
            </p>
          </motion.div>

          {/* The real product visual, large and dominant — presentation
              treatment matches the approved reference (a larger, visible
              muted-green rounded shape peeking out behind a gently tilted
              screenshot with a soft shadow). The screenshot itself is the
              same real, unmodified aisearch.jpeg used throughout — only its
              surrounding presentation changed. */}
          <motion.div
            style={{ gridArea: 'image', position: 'relative', padding: '1.25rem 0.75rem 0.5rem' }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Soft background shape only — no decorative UI, no fake screens */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: '6%',
                right: '2%',
                bottom: '8%',
                background: 'rgba(30,102,64,0.22)',
                borderRadius: '2.5rem',
                transform: 'rotate(-3deg)',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                overflow: 'hidden',
                borderRadius: 'var(--cs-radius-lg)',
                border: '0.5px solid var(--cs-hairline)',
                boxShadow: '0 28px 60px -20px rgba(17,17,16,0.22)',
                transform: 'rotate(0.6deg)',
              }}
            >
              <img src={HERO_IMAGE} alt={HERO_IMAGE_ALT} style={{ width: '100%', display: 'block' }} />
            </div>
          </motion.div>

          <motion.div
            style={{ gridArea: 'meta' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-4" style={{ borderTop: '0.5px solid var(--cs-hairline)', paddingTop: '1.1rem', maxWidth: '30rem' }}>
              {[
                { label: 'My role', value: 'Senior Product Designer' },
                { label: 'Duration', value: 'Jul 2024 – Sep 2025' },
                { label: 'Team', value: 'Cross-functional · 4' },
                { label: 'Platform', value: 'Enterprise SaaS · Desktop' },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.11em', textTransform: 'uppercase', color: INK_MUTED, marginBottom: '0.3rem' }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 500, color: INK }}>{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Outcomes — supporting the transformation, not competing with the visual */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-5 md:grid-cols-4"
          style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '0.5px solid var(--cs-hairline)' }}
        >
          {[
            { value: '90%', label: 'Translation time cut', color: ACCENT },
            { value: '91%', label: 'Metadata time saved', color: ACCENT },
            { value: '−15K', label: 'Support cases / year', color: GREEN },
            { value: '1-Click', label: 'Any admin action', color: INK },
          ].map((m) => (
            <div key={m.label}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.35rem, 2vw, 1.65rem)', fontWeight: 600, color: m.color, marginBottom: '0.25rem' }}>
                {m.value}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: INK_MUTED, lineHeight: 1.35 }}>{m.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue — appears last */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.5rem 0 0' }}
        >
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: INK_MUTED }}>
            Scroll to explore
          </span>
          <span aria-hidden="true" style={{ color: INK_MUTED }}>↓</span>
        </motion.div>
      </div>

      {/* The transformation, in brief — a short bridge line into the rest of
          the story (the outcome numbers above already carry the metrics). */}
      <ScrollReveal>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: INK_MUTED,
            textAlign: 'center',
            maxWidth: '58ch',
            margin: 'clamp(2rem, 4vw, 3rem) auto clamp(1.5rem, 4vw, 2.5rem)',
            padding: '0 1.5rem',
            lineHeight: 1.7,
          }}
        >
          What once took 1,700 admin minutes a month now takes 160, by embedding an AI assistant
          directly into the workflow admins already used, instead of asking them to learn a new one.
        </p>
      </ScrollReveal>

      {/* ====================================================================
         02 — THE PROBLEM
         Custom-built (not SectionBlock) to match the approved reference's
         editorial composition: left column of headline + problem points,
         right column of layered REAL screenshots with numbered callouts.
         Content is unchanged from the previous version — the two platform
         descriptions and the pull-quote are the same approved facts, only
         restructured into three problem points + a closing banner to match
         the reference's density instead of two flat cards + a quote block.
         The two images (cornerstone-dashboard.jpeg, cornerstone-catalog.jpeg)
         are real, unmodified Cornerstone screenshots — only their framing
         (border, shadow, slight rotation, chrome bar) was added.
      ==================================================================== */}
      <style>{`
        .cs-problem-grid { display: grid; gap: 2rem; grid-template-areas: "text" "visual" "band"; padding: clamp(2.75rem, 6vw, 4rem) 0; }
        .cs-problem-desktop { display: none; }
        @media (min-width: 1024px) {
          .cs-problem-grid { display: none; }
          .cs-problem-desktop { display: block; padding: clamp(3rem, 6vw, 4.5rem) 0 clamp(2.5rem, 5vw, 3.5rem); }
        }
      `}</style>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', overflow: 'hidden' }}>
        <div className="cs-problem-grid">
          {/* Left — headline + problem points */}
          <ScrollReveal>
            <div style={{ gridArea: 'text' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.85rem' }}>
                02 · The problem
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  fontWeight: 600,
                  color: INK,
                  marginBottom: '1.1rem',
                }}
              >
                Two platforms, <em style={{ fontStyle: 'italic', color: ACCENT, fontWeight: 500 }}>zero intelligence, endless repetition.</em>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: INK_MUTED, lineHeight: 1.7, marginBottom: '2rem', maxWidth: '42ch' }}>
                Administrators faced an unstructured catalog, duplicated data, and multiple disconnected
                touchpoints. Poor admin tooling upstream created a poor learner experience downstream:
                a cluttered catalog and repetitive content that made relevant resources hard to find.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  {
                    icon: '◧',
                    color: ACCENT,
                    title: 'Scattered information',
                    body: 'An unstructured catalog and duplicated data lived across multiple disconnected touchpoints.',
                  },
                  {
                    icon: '⌘',
                    color: GREEN,
                    title: 'No intelligence, no defaults',
                    body: 'No AI. No smart defaults. No scale. Every task meant piecing information together by hand.',
                  },
                  {
                    icon: '↻',
                    color: '#7a4a10',
                    title: 'Repetitive for everyone',
                    body: 'A cluttered catalog and repetitive content made it just as hard for learners to find what they needed.',
                  },
                ].map((p) => (
                  <div key={p.title} style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        background: `${p.color}1a`,
                        color: p.color,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '0.95rem',
                      }}
                    >
                      {p.icon}
                    </span>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 500, color: INK, marginBottom: '0.2rem' }}>
                        {p.title}
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: INK_MUTED, lineHeight: 1.55 }}>
                        {p.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right — layered real screenshots with numbered callouts */}
          <div style={{ gridArea: 'visual', position: 'relative', padding: '1.5rem 1rem' }}>
            {/* Soft background shape — same visual language as Section 01 */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '4%',
                left: '4%',
                right: '10%',
                bottom: '6%',
                background: 'rgba(30,102,64,0.16)',
                borderRadius: '2.5rem',
                transform: 'rotate(-2deg)',
                zIndex: 0,
              }}
            />

            {/* Dashboard screenshot — back layer */}
            <ScrollReveal delay={80}>
              <div style={{ position: 'relative', zIndex: 1, maxWidth: '84%' }}>
                <div
                  style={{
                    borderRadius: 'var(--cs-radius-md)',
                    overflow: 'hidden',
                    border: '0.5px solid var(--cs-hairline)',
                    boxShadow: '0 20px 44px -18px rgba(17,17,16,0.22)',
                    transform: 'rotate(-1.2deg)',
                    background: '#fff',
                  }}
                >
                  <div style={{ display: 'flex', gap: '5px', padding: '0.55rem 0.7rem', borderBottom: '0.5px solid var(--cs-hairline)' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e0a08a' }} />
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e8cf8a' }} />
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#9dc4a3' }} />
                  </div>
                  <img
                    src="/images/case-studies/cornerstone-dashboard.jpeg"
                    alt="Cornerstone learning dashboard: completions, hours, badges, and a transcript with past-due items."
                    style={{ width: '100%', display: 'block' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.75rem' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: '1.6rem',
                      height: '1.6rem',
                      borderRadius: '50%',
                      background: GREEN,
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    01
                  </span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: INK_MUTED }}>
                    Start from the learning dashboard
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Catalog / navigation screenshot — front layer, overlapping */}
            <ScrollReveal delay={160}>
              <div style={{ position: 'relative', zIndex: 2, maxWidth: '84%', marginLeft: '16%', marginTop: '-5.5rem' }}>
                <div
                  style={{
                    borderRadius: 'var(--cs-radius-md)',
                    overflow: 'hidden',
                    border: '0.5px solid var(--cs-hairline)',
                    boxShadow: '0 24px 52px -18px rgba(17,17,16,0.26)',
                    transform: 'rotate(1deg)',
                    background: '#fff',
                  }}
                >
                  <div style={{ display: 'flex', gap: '5px', padding: '0.55rem 0.7rem', borderBottom: '0.5px solid var(--cs-hairline)' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e0a08a' }} />
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e8cf8a' }} />
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#9dc4a3' }} />
                  </div>
                  <img
                    src="/images/case-studies/cornerstone-catalog.jpeg"
                    alt="Cornerstone course catalog and navigation: course catalog, learning objects, general learning, and templates management."
                    style={{ width: '100%', display: 'block' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.75rem' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: '1.6rem',
                      height: '1.6rem',
                      borderRadius: '50%',
                      background: ACCENT,
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    02
                  </span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: INK_MUTED }}>
                    Navigate to the relevant catalog section
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Bottom — concluding statement (existing approved pull-quote) */}
          <ScrollReveal delay={220}>
            <div
              style={{
                gridArea: 'band',
                background: 'var(--cs-card-bg, #f2efe9)',
                border: '0.5px solid var(--cs-hairline)',
                borderRadius: 'var(--cs-radius-lg)',
                padding: '1.5rem 2rem',
                textAlign: 'center',
              }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: INK, lineHeight: 1.6 }}>
                "The platform can do everything. <em style={{ fontStyle: 'italic', color: ACCENT }}>The problem is no one knows where anything is.</em>"
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: INK_MUTED, letterSpacing: '0.04em', marginTop: '0.6rem' }}>
                Recurring theme across admin research sessions
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* ==================================================================
           Desktop-only composition (≥1024px) — a close reproduction of the
           approved reference: floating numbered callouts with connector
           arrows instead of captions-below-image, catalog screenshot as the
           back layer with the dashboard tucked in front-right, alternating
           accent/green problem-point icons, and two floating annotation
           notes. Uses the same real screenshots and the same locked copy as
           the stacked mobile/tablet version above — only the arrangement
           changes. Sized to fit one 1440×900 fold.
        ================================================================== */}
        <div className="cs-problem-desktop">
          <div style={{ display: 'grid', gridTemplateColumns: '0.86fr 1.14fr', columnGap: '3rem', alignItems: 'start' }}>
            {/* Left — headline + problem points (compact) */}
            <ScrollReveal>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.75rem' }}>
                  02 · The problem
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(1.7rem, 2.4vw, 2.15rem)',
                    lineHeight: 1.14,
                    letterSpacing: '-0.02em',
                    fontWeight: 600,
                    color: INK,
                    marginBottom: '0.85rem',
                  }}
                >
                  Two platforms, zero intelligence,<br />
                  <em style={{ fontStyle: 'italic', color: ACCENT, fontWeight: 500 }}>endless repetition.</em>
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: INK_MUTED, lineHeight: 1.65, marginBottom: '1.4rem', maxWidth: '38ch' }}>
                  Administrators faced an unstructured catalog, duplicated data, and multiple disconnected
                  touchpoints. Poor admin tooling upstream created a poor learner experience downstream:
                  a cluttered catalog and repetitive content that made relevant resources hard to find.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                  {[
                    {
                      icon: '◧',
                      color: ACCENT,
                      title: 'Scattered information',
                      body: 'An unstructured catalog and duplicated data lived across multiple disconnected touchpoints.',
                    },
                    {
                      icon: '⌘',
                      color: GREEN,
                      title: 'No intelligence, no defaults',
                      body: 'No AI. No smart defaults. No scale. Every task meant piecing information together by hand.',
                    },
                    {
                      icon: '↻',
                      color: ACCENT,
                      title: 'Repetitive for everyone',
                      body: 'A cluttered catalog and repetitive content made it just as hard for learners to find what they needed.',
                    },
                  ].map((p) => (
                    <div key={p.title} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          width: '1.9rem',
                          height: '1.9rem',
                          borderRadius: '50%',
                          background: `${p.color}1a`,
                          color: p.color,
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '0.88rem',
                        }}
                      >
                        {p.icon}
                      </span>
                      <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 500, color: INK, marginBottom: '0.18rem' }}>
                          {p.title}
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: INK_MUTED, lineHeight: 1.5 }}>
                          {p.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right — layered real screenshots, floating numbered callouts,
               connector arrows and two floating annotation notes. */}
            <div style={{ position: 'relative', height: 'clamp(440px, 40vw, 560px)' }}>
              {/* Soft background blobs — same sage-green language as Section 01 */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-6%',
                  right: '-4%',
                  width: '52%',
                  height: '56%',
                  background: 'rgba(158,196,163,0.38)',
                  borderRadius: '58% 42% 61% 39% / 45% 55% 45% 55%',
                  transform: 'rotate(8deg)',
                  zIndex: 0,
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '-4%',
                  left: '0%',
                  width: '44%',
                  height: '48%',
                  background: 'rgba(158,196,163,0.28)',
                  borderRadius: '52% 48% 40% 60% / 55% 45% 58% 42%',
                  transform: 'rotate(-10deg)',
                  zIndex: 0,
                }}
              />

              {/* Dashed connector arrows, numbered callout → screenshot */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }}
              >
                <defs>
                  <marker id="cs-problem-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
                    <path d="M0,0 L8,4 L0,8 Z" fill={INK} />
                  </marker>
                </defs>
                <path d="M15,16 Q24,7 34,12" stroke={INK} strokeWidth="0.5" strokeDasharray="1.6,1.8" fill="none" vectorEffect="non-scaling-stroke" markerEnd="url(#cs-problem-arrow)" />
                <path d="M66,58 Q62,56 59,54" stroke={INK} strokeWidth="0.5" strokeDasharray="1.6,1.8" fill="none" vectorEffect="non-scaling-stroke" markerEnd="url(#cs-problem-arrow)" />
                <path d="M15,87 Q18,82 21,78" stroke={INK} strokeWidth="0.5" strokeDasharray="1.6,1.8" fill="none" vectorEffect="non-scaling-stroke" markerEnd="url(#cs-problem-arrow)" />
              </svg>

              {/* Catalog / navigation screenshot — back layer, lower-left.
                 The position:absolute div is deliberately OUTSIDE ScrollReveal:
                 Framer Motion applies its own `transform` to ScrollReveal's
                 wrapper, and a transformed element becomes the containing
                 block for absolutely-positioned descendants — nesting it the
                 other way silently breaks the left/top percentages below. */}
              <div style={{ position: 'absolute', left: '4%', top: '38%', width: '58%', zIndex: 1 }}>
                <ScrollReveal delay={120}>
                  <div
                    style={{
                      borderRadius: 'var(--cs-radius-md)',
                      overflow: 'hidden',
                      border: '0.5px solid var(--cs-hairline)',
                      boxShadow: '0 20px 44px -18px rgba(17,17,16,0.22)',
                      background: '#fff',
                      transform: 'rotate(1.5deg)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '5px', padding: '0.5rem 0.65rem', borderBottom: '0.5px solid var(--cs-hairline)' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e0a08a' }} />
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e8cf8a' }} />
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#9dc4a3' }} />
                    </div>
                    <img
                      src="/images/case-studies/cornerstone-catalog.jpeg"
                      alt="Cornerstone course catalog and navigation: course catalog, learning objects, general learning, and templates management."
                      style={{ width: '100%', display: 'block' }}
                    />
                  </div>
                </ScrollReveal>
              </div>

              {/* Dashboard screenshot — front layer, upper-right. Same
                 absolute-outside-ScrollReveal structure as above. */}
              <div style={{ position: 'absolute', left: '30%', top: '0%', width: '60%', zIndex: 2 }}>
                <ScrollReveal delay={60}>
                  <div
                    style={{
                      borderRadius: 'var(--cs-radius-md)',
                      overflow: 'hidden',
                      border: '0.5px solid var(--cs-hairline)',
                      boxShadow: '0 24px 52px -18px rgba(17,17,16,0.26)',
                      background: '#fff',
                      transform: 'rotate(-1.5deg)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '5px', padding: '0.5rem 0.65rem', borderBottom: '0.5px solid var(--cs-hairline)' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e0a08a' }} />
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e8cf8a' }} />
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#9dc4a3' }} />
                    </div>
                    <img
                      src="/images/case-studies/cornerstone-dashboard.jpeg"
                      alt="Cornerstone learning dashboard: completions, hours, badges, and a transcript with past-due items."
                      style={{ width: '100%', display: 'block' }}
                    />
                  </div>
                </ScrollReveal>
              </div>

              {/* Floating numbered callouts */}
              {[
                { n: '01', label: 'Start from the learning dashboard', left: '0%', top: '6%' },
                { n: '02', label: 'Navigate to the relevant catalog section', left: '64%', top: '52%' },
                { n: '03', label: 'Open and manage individual items', left: '0%', top: '88%' },
              ].map((c) => (
                <div
                  key={c.n}
                  style={{
                    position: 'absolute',
                    left: c.left,
                    top: c.top,
                    width: '150px',
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#fff',
                    border: '0.5px solid var(--cs-hairline)',
                    borderRadius: '0.9rem',
                    padding: '0.5rem 0.7rem',
                    boxShadow: '0 10px 24px -12px rgba(17,17,16,0.18)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: '1.4rem',
                      height: '1.4rem',
                      borderRadius: '50%',
                      border: `1.5px solid ${INK}`,
                      color: INK,
                      display: 'grid',
                      placeItems: 'center',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.62rem',
                      fontWeight: 600,
                    }}
                  >
                    {c.n}
                  </span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.66rem', color: INK, lineHeight: 1.25 }}>
                    {c.label}
                  </p>
                </div>
              ))}

              {/* Floating annotation notes — approved reference reproduced verbatim */}
              <p
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  right: '0.5rem',
                  top: '-1%',
                  width: '120px',
                  zIndex: 4,
                  fontFamily: '"Segoe Script", "Bradley Hand", "Comic Sans MS", cursive',
                  fontSize: '0.8rem',
                  color: INK_MUTED,
                  lineHeight: 1.3,
                  transform: 'rotate(-3deg)',
                }}
              >
                ↗ Find the right section
              </p>
              <p
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  right: '0.25rem',
                  top: '68%',
                  width: '128px',
                  zIndex: 4,
                  fontFamily: '"Segoe Script", "Bradley Hand", "Comic Sans MS", cursive',
                  fontSize: '0.8rem',
                  color: INK_MUTED,
                  lineHeight: 1.3,
                  transform: 'rotate(2deg)',
                }}
              >
                So many options.<br />Where do I start? ↙
              </p>
            </div>
          </div>

          {/* Bottom — concluding statement (existing approved pull-quote),
             compacted to a single-line insight bar to keep the whole
             composition inside one desktop fold. */}
          <ScrollReveal delay={220}>
            <div
              style={{
                marginTop: '1.5rem',
                background: 'var(--cs-card-bg, #f2efe9)',
                border: '0.5px solid var(--cs-hairline)',
                borderRadius: 'var(--cs-radius-lg)',
                padding: '0.85rem 1.75rem',
                textAlign: 'center',
              }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: INK, lineHeight: 1.5 }}>
                "The platform can do everything. <em style={{ fontStyle: 'italic', color: ACCENT }}>The problem is no one knows where anything is.</em>"
                <span style={{ fontSize: '0.68rem', color: INK_MUTED, letterSpacing: '0.03em', marginLeft: '0.6rem' }}>
                  — Recurring theme across admin research sessions
                </span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ====================================================================
         03 — THE COMPLEXITY — final pass.
         The attached reference is, on close inspection, an evenly-aligned
         five-column composition (same baseline, same height, generous
         whitespace and color) rather than an overlapping/staggered one —
         the previous pass's stagger was a misreading of an earlier, purely
         verbal description of the same reference. This pass matches what
         the image actually shows: five equal-width columns, each with a
         number+label pair, then its real screenshot, then a short icon+
         description — aligned on one baseline, connected by short curved
         arcs between consecutive numbers.

         Built with flexbox (five `flex: 1 1 0%` columns), not CSS Grid's
         `repeat(5, …)` — that exact syntax was ruled out in an earlier
         round; flexbox reaches the same even-column result the reference
         shows without using it. The synthetic 3-dot "browser chrome" bar
         used in every earlier pass is removed — the reference shows each
         screenshot's own real header directly under a plain rounded
         corner, and that fake chrome strip was itself a small invented UI
         element this round's "no invented UI" instruction rules out.
         Screenshots use object-fit: cover at a fixed height so the row
         reads as one clean baseline like the reference (the underlying
         image files are untouched — this only affects on-screen framing).

         Same five real assets and same honest, content-accurate captions
         as the previous two passes (see git history for why they don't
         reuse the reference's literal "search and filter" / "content
         details" labels — two of the five real assets don't depict those
         things). No stats, no "How might we", no invented copy.

         The bottom insight again keeps the one real, already-approved
         sentence used in every pass — split across a divider to match the
         reference's two-part bar shape — rather than the reference's own
         placeholder line ("The complexity wasn't in a single feature…"),
         which still does not appear anywhere in the approved case study.
      ==================================================================== */}
      <div style={{ background: 'var(--cs-card-bg, #f2efe9)', borderBottom: '0.5px solid var(--cs-hairline)', padding: 'clamp(3rem, 7vw, 5.5rem) 0', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          .cs-journey5-row { display: flex; flex-direction: column; gap: 2.5rem; position: relative; margin-top: 2rem; }
          .cs-journey5-arrows { display: none; }
          .cs-journey5-note { display: none; }
          @media (min-width: 1024px) {
            .cs-journey5-row { flex-direction: row; align-items: flex-start; gap: 1.4rem; margin-top: 2.75rem; }
            .cs-journey5-row > * { flex: 1 1 0%; min-width: 0; }
            .cs-journey5-arrows { display: block; }
            .cs-journey5-note { display: block; }
          }
        `}</style>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '4%',
            right: '2%',
            width: '26%',
            height: '46%',
            background: 'rgba(158,196,163,0.20)',
            borderRadius: '55% 45% 60% 40% / 48% 52% 48% 52%',
            transform: 'rotate(6deg)',
            zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '2%',
            left: '4%',
            width: '20%',
            height: '34%',
            background: 'rgba(158,196,163,0.15)',
            borderRadius: '48% 52% 44% 56% / 56% 44% 58% 42%',
            transform: 'rotate(-8deg)',
            zIndex: 0,
          }}
        />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.7rem' }}>
              03 · The complexity
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontWeight: 600,
                color: INK,
                marginBottom: '0.9rem',
                maxWidth: '20ch',
              }}
            >
              A multi-layered journey<br />
              <em style={{ fontStyle: 'italic', color: ACCENT, fontWeight: 500 }}>across many surfaces.</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: INK_MUTED, lineHeight: 1.7, maxWidth: '62ch' }}>
              Priya manages learning content for 6 business units across 4 languages at a 10,000-person
              enterprise: publishing courses, tagging metadata, and managing translations every week,
              across a long chain of separate admin screens.
            </p>
          </ScrollReveal>

          {/* Floating annotation — desktop only, clear of the headline and site nav */}
          <p
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.75rem',
              width: '150px',
              fontFamily: '"Segoe Script", "Bradley Hand", "Comic Sans MS", cursive',
              fontSize: '0.8rem',
              color: INK_MUTED,
              lineHeight: 1.3,
              transform: 'rotate(-2deg)',
            }}
            className="cs-journey5-note"
          >
            Not just one screen,<br />but a connected journey<br />with many decisions.
          </p>

          {/* Five equal columns, one baseline — number+label, real screen,
             short icon+insight. Curved arcs connect consecutive numbers. */}
          <div style={{ position: 'relative' }}>
            <svg
              className="cs-journey5-arrows"
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ position: 'absolute', top: '-1.15rem', left: 0, right: 0, width: '100%', height: '1rem', zIndex: 3, pointerEvents: 'none' }}
            >
              <defs>
                <marker id="cs-journey5-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
                  <path d="M0,0 L8,4 L0,8 Z" fill={INK} />
                </marker>
              </defs>
              {['M9,100 Q19,10 29,100', 'M29,100 Q39,10 49,100', 'M49,100 Q59,10 69,100', 'M69,100 Q79,10 89,100'].map((d) => (
                <path key={d} d={d} stroke={INK} strokeWidth="0.45" strokeDasharray="1.4,1.7" fill="none" vectorEffect="non-scaling-stroke" markerEnd="url(#cs-journey5-arrow)" />
              ))}
            </svg>

            <div className="cs-journey5-row">
              {[
                {
                  n: '01', color: ACCENT,
                  src: '/images/case-studies/cornerstone-catalog.jpeg',
                  alt: 'Cornerstone admin sidebar and course catalog navigation.',
                  label: 'Find the right section',
                  icon: '⌕',
                  title: 'Scattered across tools',
                  desc: 'Every task began in the same long sidebar.',
                },
                {
                  n: '02', color: GREEN,
                  src: '/images/case-studies/cornerstone-search.png',
                  alt: 'Cornerstone Administrative Tool with its account and navigation menu open.',
                  label: 'One long settings menu',
                  icon: '☰',
                  title: 'Everything, one menu',
                  desc: 'Every setting sat behind a single expandable menu.',
                },
                {
                  n: '03', color: ACCENT,
                  src: '/images/case-studies/cornerstone-content-details.png',
                  alt: 'Cornerstone Administrative Tool grid of configuration areas.',
                  label: 'A screen per function',
                  icon: '▤',
                  title: 'Split by function',
                  desc: 'Core functions, recruiting, learning: each its own screen.',
                },
                {
                  n: '04', color: GREEN,
                  src: '/images/case-studies/cornerstone-licenses.png',
                  alt: 'Cornerstone home-page layout management screen.',
                  label: 'Configure and manage',
                  icon: '✎',
                  title: 'One setting at a time',
                  desc: 'Even a layout needed its own screen to edit or create.',
                },
                {
                  n: '05', color: ACCENT,
                  src: '/images/case-studies/cornerstone-dashboard.jpeg',
                  alt: 'Cornerstone learning dashboard: completions, hours, badges, and a transcript with past-due items.',
                  label: 'Track and keep updated',
                  icon: '↻',
                  title: 'Tracked, not automated',
                  desc: 'Completions and past-due items, kept up by hand.',
                },
              ].map((s, i) => (
                <div key={s.n} style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', marginBottom: '0.9rem' }}>
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: '1.7rem',
                        height: '1.7rem',
                        borderRadius: '50%',
                        background: `${s.color}1a`,
                        color: s.color,
                        display: 'grid',
                        placeItems: 'center',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.66rem',
                        fontWeight: 600,
                      }}
                    >
                      {s.n}
                    </span>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', fontWeight: 500, color: INK, lineHeight: 1.3, marginTop: '0.15rem' }}>
                      {s.label}
                    </p>
                  </div>

                  <ScrollReveal delay={i * 70}>
                    <div
                      style={{
                        borderRadius: 'var(--cs-radius-md)',
                        overflow: 'hidden',
                        border: '0.5px solid var(--cs-hairline)',
                        boxShadow: '0 16px 34px -16px rgba(17,17,16,0.2)',
                        background: '#fff',
                        height: 'clamp(140px, 13vw, 176px)',
                      }}
                    >
                      <img
                        src={s.src}
                        alt={s.alt}
                        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top' }}
                      />
                    </div>
                  </ScrollReveal>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.85rem' }}>
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: '1.6rem',
                        height: '1.6rem',
                        borderRadius: '50%',
                        background: `${s.color}1a`,
                        color: s.color,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '0.8rem',
                      }}
                    >
                      {s.icon}
                    </span>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', fontWeight: 500, color: INK, marginBottom: '0.15rem' }}>
                        {s.title}
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: INK_MUTED, lineHeight: 1.4 }}>
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom — the same real sentence used in every pass, split
             across a divider to match the reference's two-part bar shape. */}
          <ScrollReveal delay={420}>
            <div
              style={{
                marginTop: '2.75rem',
                background: `${ACCENT}0f`,
                borderRadius: 'var(--cs-radius-lg)',
                border: `0.5px solid ${ACCENT}30`,
                padding: '1.2rem 1.75rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" style={{ flexShrink: 0, color: ACCENT }}>
                <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <path d="M10 5.5V10L13 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: INK, lineHeight: 1.6, flex: '1 1 220px' }}>
                The friction wasn't one broken screen,
              </p>
              <div style={{ width: '1px', alignSelf: 'stretch', background: `${ACCENT}30` }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: INK, lineHeight: 1.6, flex: '1 1 220px' }}>
                <em style={{ fontStyle: 'italic', color: ACCENT }}>it was the accumulation of small, repeated, manual steps across the whole workflow.</em>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ====================================================================
         04 — THE DESIGN SHIFT
         Custom-built (not SectionBlock/PullQuote) to match the approved
         reference's composition: eyebrow + full-width hairline, a large
         two-line headline, a Before/After comparison with colored rules,
         a large centered transformation statement with a floating
         handwritten annotation, and a supporting metric line — plus the
         reference's own background flourishes (a soft sage blob and a
         thin decorative squiggle, bottom-left). Content is identical to
         the previous implementation, word for word — only the visual
         treatment changed (SectionBlock's own title used var(--font-
         display) with no accent color on "everything changes."; this
         reproduces the reference's actual terracotta-italic treatment
         using the same accent-em pattern already used in Sections 01–03).
      ==================================================================== */}
      <div style={{ padding: 'clamp(2.75rem, 6vw, 4.5rem) 0', borderBottom: '0.5px solid var(--cs-hairline)', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-6%',
            left: '-8%',
            width: '30%',
            height: '58%',
            background: 'rgba(158,196,163,0.26)',
            borderRadius: '55% 45% 60% 40% / 48% 52% 48% 52%',
            transform: 'rotate(-4deg)',
            zIndex: 0,
          }}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 400 160"
          style={{ position: 'absolute', bottom: '2%', left: '0', width: 'min(30%, 340px)', height: 'auto', zIndex: 0, opacity: 0.6 }}
        >
          <path
            d="M0,120 C40,60 80,150 130,90 C170,42 200,110 240,70 C270,40 300,80 330,45"
            fill="none"
            stroke={GREEN}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.85rem' }}>
              04 · The insight
            </p>
            <div style={{ height: '0.5px', background: 'var(--cs-hairline)', marginBottom: '2.25rem' }} />
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(2.1rem, 3.6vw, 2.9rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontWeight: 600,
                color: INK,
                marginBottom: '2.5rem',
              }}
            >
              From fragmented and manual,<br />
              to <em style={{ fontStyle: 'italic', color: ACCENT, fontWeight: 500 }}>connected and intelligent.</em>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="grid gap-6 md:grid-cols-2" style={{ marginBottom: '3.5rem' }}>
              <div style={{ borderLeft: '2px solid #d06050', paddingLeft: '1.25rem' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a2a1a', marginBottom: '0.6rem' }}>
                  Before
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: INK_MUTED, lineHeight: 1.75 }}>
                  For each of 10 courses a month, Priya manually typed the title, description, keywords,
                  subjects and skill tags from scratch, no suggestions, no pre-population. Translating 8
                  courses meant opening each one, selecting a language, triggering translation, and
                  repeating: 40 clicks for something that should take 30 seconds.
                </p>
              </div>
              <div style={{ borderLeft: `2px solid ${GREEN}`, paddingLeft: '1.25rem' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: GREEN, marginBottom: '0.6rem' }}>
                  After
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: INK_MUTED, lineHeight: 1.75 }}>
                  Upload → Apollo AI drafts every metadata field instantly → review and publish in under 4
                  minutes. Multi-select every language → "Translate All" → done in under a minute, with
                  partial fills labelled and completed languages hidden automatically.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Extra vertical breathing room here specifically — this is
             the one purely typographic beat in a page otherwise full of
             UI screenshots and evidence rows, so it's given more air on
             both sides rather than reading as a compressed transition
             between the Before/After block above and the metric line
             below. */}
          <ScrollReveal delay={160}>
            <div style={{ position: 'relative', textAlign: 'center', padding: 'clamp(1.5rem, 4vw, 2.5rem) 1.5rem 0' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: INK,
                  maxWidth: '22ch',
                  margin: '0 auto',
                }}
              >
                After Apollo AI,{' '}
                <em style={{ fontStyle: 'italic', color: ACCENT, fontWeight: 500 }}>everything changes.</em>
              </p>

              {/* Floating annotation — desktop only, same treatment used since Section 02 */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-1.25rem',
                  right: '-1rem',
                  width: '170px',
                }}
                className="cs-shift-note"
              >
                <p
                  style={{
                    fontFamily: '"Segoe Script", "Bradley Hand", "Comic Sans MS", cursive',
                    fontSize: '0.8rem',
                    color: INK_MUTED,
                    lineHeight: 1.3,
                    textAlign: 'left',
                    transform: 'rotate(-2deg)',
                  }}
                >
                  Less manual work.<br />More time for what<br />really matters.
                </p>
                <svg viewBox="0 0 60 40" style={{ width: '52px', height: '35px', marginLeft: '0.5rem' }}>
                  <path
                    d="M52,6 C40,10 24,14 12,26 L8,20 M12,26 L18,24"
                    fill="none"
                    stroke={INK_MUTED}
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: INK_MUTED, textAlign: 'center', maxWidth: '52ch', margin: '1.75rem auto 0' }}>
              From 1,700 to 160 minutes a month. 91% of the time cost, gone.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        .cs-shift-note { display: none; }
        @media (min-width: 1024px) {
          .cs-shift-note { display: block; }
        }
      `}</style>

      {/* ====================================================================
         05 — KEY DESIGN DECISIONS
         Custom-built (not SectionBlock/DecisionCard) to match the approved
         reference's editorial three-card composition, reusing the same
         eyebrow/divider/blob/squiggle/handwritten-note language established
         in Sections 02–04. Content is the same three decisions, the same
         "why", and the same outcomes already in the repository — nothing
         added. Per this round's explicit "reduce text" instruction, each
         card's long "decision" and "why" sentences are condensed into a
         short headline + short explanation: the headline is a verbatim
         phrase lifted directly from the existing "decision" text (not new
         wording), and the explanation trims the existing "why" text down to
         its core fact, dropping only the part that already duplicates the
         outcome line below it (e.g. card 1's "why" repeats "1,700 admin
         minutes a month," which the outcome line already states). Every
         outcome is split into the same two clauses it already had (on its
         existing "—" delimiter) into a two-line primary/secondary outcome,
         matching the reference's outcome treatment — no metric changed,
         added, or reworded.
      ==================================================================== */}
      <div style={{ padding: 'clamp(2.75rem, 6vw, 4.5rem) 0', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-8%',
            right: '-6%',
            width: '26%',
            height: '52%',
            background: 'rgba(158,196,163,0.24)',
            borderRadius: '55% 45% 60% 40% / 48% 52% 48% 52%',
            transform: 'rotate(6deg)',
            zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-4%',
            left: '-6%',
            width: '20%',
            height: '30%',
            background: 'rgba(158,196,163,0.16)',
            borderRadius: '48% 52% 44% 56% / 56% 44% 58% 42%',
            transform: 'rotate(-8deg)',
            zIndex: 0,
          }}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 400 160"
          style={{ position: 'absolute', bottom: '0', left: '0', width: 'min(28%, 320px)', height: 'auto', zIndex: 0, opacity: 0.55 }}
        >
          <path
            d="M0,120 C40,60 80,150 130,90 C170,42 200,110 240,70 C270,40 300,80 330,45"
            fill="none"
            stroke={GREEN}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.85rem' }}>
              05 · Key design decisions
            </p>
            <div style={{ height: '0.5px', background: 'var(--cs-hairline)', marginBottom: '2.25rem' }} />
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                fontWeight: 600,
                color: INK,
                marginBottom: '2.5rem',
                maxWidth: '46ch',
              }}
            >
              Three problems. Three decisions.{' '}
              <em style={{ fontStyle: 'italic', color: ACCENT, fontWeight: 500 }}>Measured outcomes.</em>
            </h2>
          </ScrollReveal>

          {/* Floating annotation — same real note reused from Section 04, desktop only */}
          <p
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-1.75rem',
              right: '0.5rem',
              width: '160px',
              fontFamily: '"Segoe Script", "Bradley Hand", "Comic Sans MS", cursive',
              fontSize: '0.8rem',
              color: INK_MUTED,
              lineHeight: 1.3,
              textAlign: 'right',
              transform: 'rotate(-2deg)',
            }}
            className="cs-decisions-note"
          >
            Less manual work.<br />More time for what<br />really matters.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1.5rem',
            }}
            className="cs-decisions-grid"
          >
            {[
              {
                num: '01',
                tag: 'AI Augmentation',
                problem: '25–60 minutes per course, typed entirely by hand — no suggestions, no pre-population.',
                decision: 'Let AI draft every field. Admins review and finalize.',
                outcomePrimary: '91% metadata time saved',
                outcomeSecondary: '1,700 → 160 admin min/month',
              },
              {
                num: '02',
                tag: 'Workflow Compression',
                problem: 'Translating 8 courses meant repeating the same steps for each: 40 clicks total.',
                decision: "Consolidate every language into one 'Translate All' action.",
                outcomePrimary: '90% translation time saved',
                outcomeSecondary: '5 min → under 1 min',
              },
              {
                num: '03',
                tag: 'Trust by Design',
                problem: 'Closing the panel reset everything — every suggestion lost, forcing a restart.',
                decision: 'Persist the full AI session with Resume Smart Edit.',
                // No specific measured outcome exists for this decision in
                // the source case study (unlike #1 and #2) — stated
                // qualitatively rather than invented as a number or a
                // competitive claim.
                outcomePrimary: 'Preserved context across sessions',
                outcomeSecondary: 'Less repeated work for admins',
              },
            ].map((c, i) => (
              <ScrollReveal key={c.num} delay={i * 80}>
                <div
                  style={{
                    background: '#fff',
                    border: '0.5px solid var(--cs-hairline)',
                    borderRadius: 'var(--cs-radius-lg)',
                    padding: '1.75rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '2.4rem', lineHeight: 1, color: INK_MUTED }}>
                      {c.num}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: INK_MUTED, textAlign: 'right' }}>
                      {c.tag}
                    </span>
                  </div>

                  {/* Problem — the evidence, stated first so the reader
                     sees what prompted the decision before the decision
                     itself. */}
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: INK_MUTED, opacity: 0.75, marginBottom: '0.4rem' }}>
                      Problem
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: INK_MUTED, lineHeight: 1.55 }}>
                      {c.problem}
                    </p>
                  </div>

                  {/* Decision — the product judgment call, visually the
                     strongest text in the card (this is the point of the
                     section: these were decisions, not just features). */}
                  <div style={{ borderTop: '0.5px solid var(--cs-hairline-soft, var(--cs-hairline))', paddingTop: '1rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.4rem' }}>
                      Decision
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 600, color: INK, lineHeight: 1.35 }}>
                      {c.decision}
                    </p>
                  </div>

                  {/* Outcome — third and final tier, same tiny-label
                     treatment as Problem/Decision above so the card reads
                     as one explicit Problem → Decision → Outcome flow at
                     a glance, not two labeled beats and an unlabeled
                     third. Green, matching the existing outcome-text
                     color, rather than the muted grey used for Problem —
                     this is the payoff, not another neutral fact. */}
                  <div style={{ borderTop: '0.5px solid var(--cs-hairline-soft, var(--cs-hairline))', paddingTop: '1rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: GREEN, marginBottom: '0.4rem' }}>
                      Outcome
                    </p>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <span aria-hidden="true" style={{ color: GREEN, fontSize: '0.85rem', lineHeight: 1.4 }}>→</span>
                      <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 500, color: GREEN, lineHeight: 1.4 }}>
                          {c.outcomePrimary}
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.74rem', color: INK_MUTED, lineHeight: 1.4, marginTop: '0.1rem' }}>
                          {c.outcomeSecondary}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cs-decisions-note { display: none; }
        @media (min-width: 1024px) {
          .cs-decisions-note { display: block; }
          .cs-decisions-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>

      {/* ====================================================================
         06 — THE SOLUTION (custom-built, not SectionBlock, to match the
         approved reference's 2-column editorial composition)

         Content is unchanged real Cornerstone fact — same headline, same
         paragraph. The previous 4-item Input/Understand/Act/Outcome flow
         is condensed into the three rows this composition calls for by
         reusing the same three real Key Design Decisions from Section 05
         (verbatim titles, condensed supporting sentences, no new claims,
         no repeated stats — those already live in Section 05). The primary
         visual is the real screenshot at
         public/images/case-studies/cornerstone/section-06-reference.png —
         note this is NOT the exact path/filename given in this round's
         instructions (public/images/cornerstone/section-06/cornerstone-ai-
         content-manager.png); that file, and the two other named
         screenshots (cornerstone-ai-assist.png, cornerstone-ai-
         translation.png), don't exist anywhere in the repo. This file
         appears to be what was actually meant — it's a genuine, full
         Content Manager + Apollo AI screenshot with no composite graphics
         or caption overlays, matching the described content exactly.
         Flagged to the user rather than silently assumed.
      ==================================================================== */}
      <div style={{ padding: 'clamp(3rem, 7vw, 5.5rem) 0', borderBottom: '0.5px solid var(--cs-hairline)', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          .cs-solution-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
          .cs-solution-note { display: none; }
          @media (min-width: 1024px) {
            .cs-solution-grid { grid-template-columns: 0.82fr 1.18fr; gap: 3.5rem; align-items: center; }
            .cs-solution-note { display: block; }
          }
        `}</style>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-6%',
            right: '-6%',
            width: '40%',
            height: '72%',
            background: 'rgba(158,196,163,0.24)',
            borderRadius: '55% 45% 60% 40% / 48% 52% 48% 52%',
            transform: 'rotate(5deg)',
            zIndex: 0,
          }}
        />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <div className="cs-solution-grid">
            <ScrollReveal>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.85rem' }}>
                  06 · The product
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    fontWeight: 600,
                    color: INK,
                    marginBottom: '1.1rem',
                  }}
                >
                  One assistant,<br />
                  <em style={{ fontStyle: 'italic', color: ACCENT, fontWeight: 500 }}>reading, suggesting and remembering, in place.</em>
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: INK_MUTED, lineHeight: 1.7, maxWidth: '46ch' }}>
                  The three decisions above only work as one connected system: Apollo AI stays in the
                  same panel from the moment content is uploaded to the moment it's translated and published.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', marginTop: '2rem' }}>
                  {[
                    {
                      icon: '▤',
                      color: ACCENT,
                      title: 'Auto-generate every metadata field.',
                      body: 'Apollo AI reads uploaded content and drafts every field: title, description, keywords, subjects and skill tags.',
                    },
                    {
                      icon: '⇄',
                      color: GREEN,
                      title: "A single 'Translate All' action.",
                      body: 'Multi-select every language, with smart prioritisation and automatic edge-case handling.',
                    },
                    {
                      icon: '↩',
                      color: ACCENT,
                      title: 'Persist the full AI session state.',
                      body: 'Pick up exactly where you left off, even after an interruption, no restart, no lost work.',
                    },
                  ].map((f) => (
                    <div key={f.title} style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '50%',
                          background: `${f.color}1a`,
                          color: f.color,
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '0.95rem',
                        }}
                      >
                        {f.icon}
                      </span>
                      <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 600, color: INK, marginBottom: '0.25rem', lineHeight: 1.35 }}>
                          {f.title}
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: INK_MUTED, lineHeight: 1.55 }}>
                          {f.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <div style={{ position: 'relative' }}>
              <ScrollReveal delay={100}>
                <figure style={{ margin: 0, position: 'relative', zIndex: 1 }}>
                  <div style={{ borderRadius: 'var(--cs-radius-lg)', overflow: 'hidden', boxShadow: '0 28px 64px -26px rgba(17,17,16,0.24)' }}>
                    <img
                      src="/images/case-studies/cornerstone/section-06-reference.png"
                      alt="Cornerstone Content Manager with the Apollo AI panel open, suggesting a title, description, subjects, keywords and skills tagging for a course."
                      style={{ width: '100%', display: 'block' }}
                    />
                  </div>
                  <figcaption
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.72rem',
                      color: INK_MUTED,
                      textAlign: 'center',
                      marginTop: '1rem',
                    }}
                  >
                    Apollo AI inside the Content Manager, suggesting title, description and skill tags
                    the moment content is uploaded.
                  </figcaption>
                </figure>
              </ScrollReveal>

              {/* Floating annotation — desktop only, same treatment used
                 since Section 02. Condenses the real "same panel, start to
                 finish" fact from the paragraph above; no new claim. */}
              <p
                aria-hidden="true"
                className="cs-solution-note"
                style={{
                  position: 'absolute',
                  top: '-1.75rem',
                  right: '0.25rem',
                  width: '140px',
                  fontFamily: '"Segoe Script", "Bradley Hand", "Comic Sans MS", cursive',
                  fontSize: '0.8rem',
                  color: INK_MUTED,
                  lineHeight: 1.3,
                  textAlign: 'right',
                  transform: 'rotate(-2deg)',
                }}
              >
                One panel,<br />start to finish.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
         07 — THE FINAL EXPERIENCE
         Custom-built (not SectionBlock) to match the approved reference's
         "how it works" composition: eyebrow + headline + a clean numbered
         sequence on the left, one real screenshot dominant on the right.
         Content unchanged — same three features, same real descriptions,
         just presented as a numbered sequence (they already read as
         chronological: draft metadata → interrupt/resume → translate)
         instead of three flat, visual-less columns. The real screenshot is
         aisearch.jpeg — the same authorized Apollo AI / Content Manager
         asset already used once in the Section 01 hero, reused here
         deliberately (per this file's own established practice) rather
         than fabricated, since no other real screenshot in the repo shows
         the Apollo AI assistant interface itself.
      ==================================================================== */}
      <div style={{ padding: 'clamp(3rem, 7vw, 5.5rem) 0', borderBottom: '0.5px solid var(--cs-hairline)', background: 'var(--cs-card-bg, #f2efe9)', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          .cs-howworks-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
          @media (min-width: 1024px) {
            /* Sections 06 and 08 (either side of this one) both run
               text-left/visual-right — reversing the column order here
               only, via CSS order rather than swapping the JSX, breaks
               that three-in-a-row repetition on desktop while leaving
               the mobile stacking order (text, then image — the natural
               reading order) completely untouched. */
            .cs-howworks-grid { grid-template-columns: 1.18fr 0.82fr; gap: 3.5rem; align-items: center; }
            .cs-howworks-text { order: 2; }
            .cs-howworks-visual { order: 1; }
          }
          .cs-howworks-tick { display: block; width: 0; height: 1.1rem; margin: 0.5rem 0 0.5rem 0.95rem; border-left: 1.5px dashed var(--cs-hairline); }
        `}</style>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-8%',
            right: '-6%',
            width: '36%',
            height: '68%',
            background: 'rgba(158,196,163,0.2)',
            borderRadius: '55% 45% 60% 40% / 48% 52% 48% 52%',
            transform: 'rotate(-4deg)',
            zIndex: 0,
          }}
        />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <div className="cs-howworks-grid">
            <ScrollReveal className="cs-howworks-text">
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.85rem' }}>
                  07 · The workflow
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    fontWeight: 600,
                    color: INK,
                    marginBottom: '2rem',
                  }}
                >
                  Three features.{' '}
                  <em style={{ fontStyle: 'italic', color: ACCENT, fontWeight: 500 }}>One workflow.</em>
                </h2>

                <div>
                  {[
                    {
                      title: 'Apollo AI Metadata',
                      body: 'A single starting point, drag-and-drop uploads, and auto-generated titles, descriptions, keywords, subjects and skill tags, reviewed and published in one flow.',
                    },
                    {
                      title: 'Resume Smart Edit',
                      body: 'Close the panel, get interrupted, come back: the system restores exactly where you left off, so translation can continue from the same restored state.',
                    },
                    {
                      title: 'Translate All',
                      body: 'A prioritised language list, "view more" for the rest, and a single action that handles every available language: completed ones hidden, partial fills clearly labelled.',
                    },
                  ].map((f, i, arr) => (
                    <div key={f.title}>
                      <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                        <span
                          aria-hidden="true"
                          style={{
                            flexShrink: 0,
                            width: '1.9rem',
                            height: '1.9rem',
                            borderRadius: '50%',
                            background: i % 2 === 0 ? `${ACCENT}1a` : `${GREEN}1a`,
                            color: i % 2 === 0 ? ACCENT : GREEN,
                            display: 'grid',
                            placeItems: 'center',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                          }}
                        >
                          {i + 1}
                        </span>
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 600, color: INK, marginBottom: '0.3rem' }}>
                            {f.title}
                          </p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: INK_MUTED, lineHeight: 1.6 }}>
                            {f.body}
                          </p>
                        </div>
                      </div>
                      {i < arr.length - 1 && <span className="cs-howworks-tick" aria-hidden="true" />}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100} className="cs-howworks-visual">
              {/* Real asset is a narrow, portrait crop of the Apollo AI
                 panel itself (559×934) — not a landscape screenshot — so
                 it's presented at its own natural proportions, centered in
                 the visual column, rather than stretched to fill a wide
                 landscape slot (which would exaggerate its height ~1.7x). */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '380px', borderRadius: 'var(--cs-radius-lg)', overflow: 'hidden', boxShadow: '0 28px 64px -26px rgba(17,17,16,0.22)' }}>
                  <img
                    src="/images/case-studies/cornerstone/cornerstone-section-07-workflow.png"
                    alt="Apollo AI assistant panel: Resume smart edit, Add translations and suggested actions like Navigate the product and Manage compliance."
                    style={{ width: '100%', display: 'block' }}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* ====================================================================
         08 — DESIGNED TO SCALE
         Custom-built (not SectionBlock/MetricsHighlight) to match the
         approved reference's "real impact" composition: eyebrow + headline
         + paragraph + left-aligned, uncarded, large-number metrics on the
         left; one real screenshot on the right. Same three real metrics,
         same real values and labels, same real closing paragraph — only
         the metric presentation changed (from MetricsHighlight's centered,
         dark-background-oriented styling to a left-aligned stack matching
         this section's actual light background). The screenshot is
         cornerstone-catalog.jpeg — the real admin catalog/navigation
         screen, chosen because it's the one real asset that actually
         depicts what these metrics describe (search navigation, admin
         navigation), rather than the reference's own suggestion of a
         translation screenshot, which wouldn't match this section's real
         content.
      ==================================================================== */}
      <div style={{ padding: 'clamp(3rem, 7vw, 5.5rem) 0', borderBottom: '0.5px solid var(--cs-hairline)', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          .cs-scale-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
          @media (min-width: 1024px) {
            .cs-scale-grid { grid-template-columns: 0.85fr 1.15fr; gap: 3.5rem; align-items: center; }
          }
        `}</style>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-8%',
            width: '30%',
            height: '60%',
            background: 'rgba(158,196,163,0.18)',
            borderRadius: '48% 52% 44% 56% / 56% 44% 58% 42%',
            transform: 'rotate(8deg)',
            zIndex: 0,
          }}
        />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <div className="cs-scale-grid">
            <ScrollReveal>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.85rem' }}>
                  08 · The constraint
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    fontWeight: 600,
                    color: INK,
                    marginBottom: '1.1rem',
                  }}
                >
                  Built for an enterprise catalog,{' '}
                  <em style={{ fontStyle: 'italic', color: ACCENT, fontWeight: 500 }}>not a demo.</em>
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: INK_MUTED, lineHeight: 1.7, maxWidth: '46ch', marginBottom: '2.25rem' }}>
                  Persona-based, secure access replaced multi-step click flows across the catalog: the
                  same system that drafts metadata also cut how far admins have to travel to act on it.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    { value: '4,000+', label: 'Pages reached via search navigation', color: ACCENT },
                    { value: '16.6', label: 'Days, average case resolution time', color: INK },
                    { value: '1-Click', label: 'Navigation for admins (was 5–6 clicks)', color: GREEN },
                  ].map((m) => (
                    <div key={m.label} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '2rem', fontWeight: 600, color: m.color, lineHeight: 1, minWidth: '5.5ch' }}>
                        {m.value}
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: INK_MUTED, lineHeight: 1.4 }}>
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              {/* Real asset is a narrow, portrait crop of the Apollo AI
                 panel (525×936) mid-conversation — same treatment as
                 Section 07's panel: natural proportions, centered, not
                 stretched to a landscape width. */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '380px', borderRadius: 'var(--cs-radius-lg)', overflow: 'hidden', border: '0.5px solid var(--cs-hairline)', boxShadow: '0 24px 56px -24px rgba(17,17,16,0.2)' }}>
                  <img
                    src="/images/case-studies/cornerstone/cornerstone-section-08-impact.png"
                    alt="Apollo AI panel confirming metadata was applied, then offering translation into 8 enabled languages."
                    style={{ width: '100%', display: 'block' }}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* ====================================================================
         09 — THE OUTCOME
         Custom-built (not SectionBlock) — same "impact" typographic
         language as Section 08 (large number, short label, short detail,
         no card/background boxes), continuing that visual rhythm since
         this section is also evidence, not a new topic. Same real values,
         labels, before/after detail text and closing paragraph as before.
      ==================================================================== */}
      <div style={{ padding: 'clamp(2.75rem, 6vw, 4.5rem) 0', borderBottom: '0.5px solid var(--cs-hairline)', background: 'var(--cs-card-bg, #f2efe9)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.85rem' }}>
              09 · The outcome
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontWeight: 600,
                color: INK,
                marginBottom: '2.25rem',
                maxWidth: '32ch',
              }}
            >
              What actually got faster,{' '}
              <em style={{ fontStyle: 'italic', color: ACCENT, fontWeight: 500 }}>and why it matters.</em>
            </h2>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2" style={{ marginBottom: '2.5rem' }}>
            <ScrollReveal>
              <div style={{ borderTop: `2px solid ${GREEN}`, paddingTop: '1.25rem' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '2.6rem', fontWeight: 600, color: GREEN, lineHeight: 1, marginBottom: '0.5rem' }}>91%</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: INK, marginBottom: '0.5rem' }}>
                  Time saved on metadata entry
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: INK_MUTED, lineHeight: 1.6 }}>
                  Before: manual entry took 1,700 minutes/month across 10 admins. After: AI suggestions
                  applied: reduced to 160 minutes/month.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div style={{ borderTop: `2px solid ${ACCENT}`, paddingTop: '1.25rem' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '2.6rem', fontWeight: 600, color: ACCENT, lineHeight: 1, marginBottom: '0.5rem' }}>90%</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: INK, marginBottom: '0.5rem' }}>
                  Time saved on translation (30% fewer steps)
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: INK_MUTED, lineHeight: 1.6 }}>
                  Before: 8 translations took 5 minutes with repetitive steps. After: AI multi-select +
                  auto-translation in under 1 minute.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={140}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: INK_MUTED, lineHeight: 1.8, maxWidth: '62ch' }}>
              Zooming out: 150K customer cases are logged yearly across Cornerstone's customer base. Better
              self-service through this work reduced that by roughly 10% (~15K cases), alongside faster
              resolution times and higher post-launch satisfaction scores.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* ====================================================================
         10 — THE POINT OF VIEW (eyebrow; section content still "What I
         Learned" internally)
         Custom-built (not SectionBlock) — deliberately quieter and more
         reflective than Sections 07–09: restrained icon row instead of
         text-only columns. Same three lessons, same real wording as
         before. The closing "Looking ahead" paragraph (agentic pipelines,
         predictive surfaces, a skills graph — none of it shipped) was
         removed in this pass: an explicit instruction not to end on a
         future AI roadmap, since the shipped work above already
         demonstrates the AI expertise on its own. The section now ends on
         the three lessons directly under "Judgment doesn't get
         automated." — no new closing line was written in to replace it,
         since inventing one risked exactly the kind of fabricated
         reflection this pass is not allowed to introduce.
      ==================================================================== */}
      <div style={{ padding: 'clamp(2.75rem, 6vw, 4.5rem) 0', borderBottom: '0.5px solid var(--cs-hairline)', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '10%',
            right: '-10%',
            width: '26%',
            height: '50%',
            background: 'rgba(158,196,163,0.16)',
            borderRadius: '55% 45% 60% 40% / 48% 52% 48% 52%',
            transform: 'rotate(6deg)',
            zIndex: 0,
          }}
        />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <ScrollReveal>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: '0.85rem' }}>
              10 · The point of view
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontWeight: 600,
                color: INK,
                marginBottom: '2.25rem',
                maxWidth: '28ch',
              }}
            >
              Judgment doesn't{' '}
              <em style={{ fontStyle: 'italic', color: ACCENT, fontWeight: 500 }}>get automated.</em>
            </h2>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3" style={{ marginBottom: '3rem' }}>
            {[
              {
                icon: '◎',
                title: 'AI must preserve agency, not eliminate it',
                body: "The most trusted AI feature wasn't the most automated. It was the most transparent. Suggestions with easy override beat AI that simply acts.",
              },
              {
                icon: '↺',
                title: 'Continuity is a trust signal, not a convenience',
                body: 'Resume Smart Edit was scoped as minor. Post-launch it became the highest-cited improvement: a system remembering you communicates respect for your time.',
              },
              {
                icon: '✦',
                title: 'AI workflows must be felt, not just functional',
                body: 'Streamlining content creation while building confidence at every step reduces anxiety, improves satisfaction, and cuts avoidable support cases at scale.',
              },
            ].map((l, i) => (
              <ScrollReveal key={l.title} delay={i * 80}>
                <div>
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-grid',
                      placeItems: 'center',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      background: `${GREEN}14`,
                      color: GREEN,
                      fontSize: '0.95rem',
                      marginBottom: '0.85rem',
                    }}
                  >
                    {l.icon}
                  </span>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 600, color: INK, marginBottom: '0.5rem', lineHeight: 1.35 }}>
                    {l.title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: INK_MUTED, lineHeight: 1.6 }}>
                    {l.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================================
         11 — NEXT PROJECT
      ==================================================================== */}
      <NextProjectCTA
        label="Next case study →"
        title="YouClean CRM"
        href="/work/youclean"
      />
      <Footer />
    </div>
  )
}
