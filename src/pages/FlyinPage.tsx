import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { MainContentAnchor } from '../components/SkipLink'
import {
  ProgressBar,
  ScrollReveal,
  PullQuote,
} from '../components/case-study'

/* ============================================================================
   Flyin — Travel & Tourism.

   Restored to the earlier, restrained editorial version — Hero → Problem →
   Design Response → Impact → Closing image → Next case study → Footer.
   The Key Product Screens section and the prototype CTA that existed in a
   later pass have been removed entirely (this version has no prototype
   button and no product-screen gallery). Every fact is unchanged, existing
   FlyIn content; nothing is invented.

   Hero visual: flyin-hero-devices.jpg (the real Flyin desktop + mobile
   product shots, on a desk with travel props — the same asset used in this
   earlier version, cropped from flyin-desktop-home.jpg with the marketing
   copy removed so it doesn't compete with this page's own headline).
   Closing image: flyin-closing-banner.jpg (Flyin's own real in-app Burj Al
   Arab / Dubai beach photo, cropped from flyin-mobile-home.jpg).
============================================================================ */

const ACCENT      = 'var(--color-accent)' // portfolio-wide terracotta — controlled emphasis only
const FLYIN_BLUE  = '#1a4f8a'              // Flyin's own real product blue — used sparingly
const INK         = '#111110'
const INK_MUTED   = '#5a5954'
const HAIRLINE    = 'rgba(17,17,16,0.09)'

const HERO_KICKER = 'UX Lead  ·  Travel Tech  ·  Mobile & Web  ·  AI Search  ·  2016–2018'

const HERO_META = [
  { label: 'Company',  value: 'Flyin' },
  { label: 'My Role',  value: 'UX Lead' },
  { label: 'Platform', value: 'Web & Mobile' },
  { label: 'Timeline', value: '2016 – 2018' },
]

const PROBLEMS = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={FLYIN_BLUE} strokeWidth="1.5">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    label: 'High search abandonment',
    text: 'Users dropped off when results didn’t match their intent.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={FLYIN_BLUE} strokeWidth="1.5">
        <rect x="3" y="4" width="8" height="16" rx="1.5" />
        <rect x="14" y="7" width="7" height="13" rx="1.5" />
      </svg>
    ),
    label: 'Disconnected experience',
    text: 'Web and app didn’t feel like the same journey.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={FLYIN_BLUE} strokeWidth="1.5">
        <path d="M4 19h16M7 15l3-4 3 3 4-6" />
      </svg>
    ),
    label: 'Lost conversions',
    text: 'Inconsistent patterns and drop-off points cost bookings.',
  },
]

const SOLUTIONS = [
  { title: 'Intent-based search', text: 'Understood requests like "beach trip for 4 in March," not just destinations.' },
  { title: 'Unified trip planning', text: 'Flights and hotels bridged into a single planning layer.' },
  { title: 'Personalised recommendations', text: 'Behavioural signals replaced generic popular-destination lists.' },
  { title: 'Simplified booking flow', text: 'Search-to-checkout rebuilt to reduce friction at drop-off steps.' },
]

/** Page container — one consistent measure used throughout the page. */
function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[1280px] mx-auto px-4 sm:px-6 ${className}`}>{children}</div>
}

/** Numbered section eyebrow — matches the pattern used across the already-
 *  redesigned case studies (Cornerstone, YouClean, CivTech). */
function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.14em', color: ACCENT, fontWeight: 600 }}>
        {index}
      </span>
      <span style={{ height: '0.5px', flex: 1, background: HAIRLINE }} />
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: INK_MUTED }}>
        {label}
      </span>
    </div>
  )
}

export default function FlyinPage() {
  return (
    <div style={{ background: '#faf8f5', minHeight: '100vh' }}>
      <ProgressBar color="#bf6853" />
      <Navbar />
      <MainContentAnchor />

      {/* ====================================================================
         HERO
      ==================================================================== */}
      <Container className="pt-12 sm:pt-16">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-6">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.66rem', letterSpacing: '0.12em', color: INK_MUTED }}>00</span>
            <span style={{ width: '1px', height: '0.7em', background: HAIRLINE, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: INK_MUTED }}>
              {HERO_KICKER}
            </span>
          </div>
        </ScrollReveal>

        <div style={{ height: '1px', background: HAIRLINE, marginBottom: '2.75rem' }} />

        <ScrollReveal delay={60}>
          <h1
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              margin: '0 0 1.5rem',
              maxWidth: '18ch',
              fontSize: 'clamp(2.1rem, 5.2vw, 3.5rem)',
              color: INK,
            }}
          >
            Making travel feel{' '}
            <em style={{ fontStyle: 'italic', color: ACCENT }}>effortless,</em>{' '}
            from first search to final booking.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={110}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: INK_MUTED, lineHeight: 1.75, maxWidth: '58ch', marginBottom: '2.25rem' }}>
            Led UX redesign of Flyin&rsquo;s search and discovery with AI-powered intent prediction, reducing abandonment and increasing conversion across web and mobile.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="flex flex-wrap gap-x-10 gap-y-4" style={{ borderTop: `0.5px solid ${HAIRLINE}`, paddingTop: '1.25rem', marginBottom: '2.5rem' }}>
            {HERO_META.map((item) => (
              <div key={item.label}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', letterSpacing: '0.11em', textTransform: 'uppercase', color: INK_MUTED, marginBottom: '0.3rem' }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', fontWeight: 500, color: INK }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={190}>
          <div style={{ overflow: 'hidden', borderRadius: '10px', border: `0.5px solid ${HAIRLINE}`, boxShadow: '0 20px 48px -24px rgba(17,17,16,0.18)' }}>
            <img
              src="/images/case-studies/flyin/flyin-hero-devices.jpg"
              alt="The real Flyin desktop search homepage open on a laptop beside the real Flyin mobile app home screen on a phone, on a travel-themed desk."
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </ScrollReveal>
      </Container>

      {/* ====================================================================
         01 — KEY CONTRIBUTION (the problem)
      ==================================================================== */}
      <Container className="mt-20 sm:mt-24">
        <Eyebrow index="01" label="Key contribution" />
        <ScrollReveal>
          <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)', letterSpacing: '-0.022em', lineHeight: 1.18, color: INK, fontWeight: 500, marginBottom: '1rem', maxWidth: '32ch' }}>
            A fragmented booking experience{' '}
            <em style={{ fontStyle: 'italic', color: ACCENT }}>was costing real bookings.</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: INK_MUTED, lineHeight: 1.7, maxWidth: '58ch', marginBottom: '2.25rem' }}>
            Search, flight selection, hotel booking and checkout had inconsistent patterns across mobile and desktop — users abandoned search when results didn&rsquo;t match their intent, and conversion was lost at multiple drop-off points.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
          {PROBLEMS.map((p, i) => (
            <ScrollReveal key={p.label} delay={i * 60}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <span style={{ marginTop: '0.15rem', flexShrink: 0 }} aria-hidden="true">{p.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500, color: INK, marginBottom: '0.2rem' }}>
                    {p.label}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', color: INK_MUTED, lineHeight: 1.5, margin: 0 }}>
                    {p.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>

      <div style={{ padding: '4rem 0 0' }}>
        <PullQuote size="md">
          &ldquo;Users switched between platforms mid-journey: discovering on web, booking on mobile.&rdquo;
        </PullQuote>
      </div>

      {/* ====================================================================
         02 — DESIGN RESPONSE
      ==================================================================== */}
      <Container className="mt-20 sm:mt-24">
        <Eyebrow index="02" label="Design response" />
        <ScrollReveal>
          <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)', letterSpacing: '-0.022em', lineHeight: 1.18, color: INK, fontWeight: 500, marginBottom: '1rem', maxWidth: '28ch' }}>
            Redesigned around{' '}
            <em style={{ fontStyle: 'italic', color: ACCENT }}>intent, not forms.</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: INK_MUTED, lineHeight: 1.7, maxWidth: '58ch', marginBottom: '2.25rem' }}>
            Rebuilt search and discovery with AI-powered intent prediction and a consistent experience across devices, so planning, comparing and booking took fewer steps.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {SOLUTIONS.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 60}>
              <div style={{ borderTop: `0.5px solid ${HAIRLINE}`, paddingTop: '0.85rem' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500, color: INK, marginBottom: '0.3rem' }}>
                  {s.title}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', color: INK_MUTED, lineHeight: 1.5, margin: 0 }}>
                  {s.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>

      {/* ====================================================================
         03 — IMPACT
      ==================================================================== */}
      <Container className="mt-20 sm:mt-24">
        <Eyebrow index="03" label="Impact" />
        <ScrollReveal>
          <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)', letterSpacing: '-0.022em', lineHeight: 1.18, color: INK, fontWeight: 500, marginBottom: '1rem', maxWidth: '30ch' }}>
            The redesign translated into{' '}
            <em style={{ fontStyle: 'italic', color: ACCENT }}>measurable</em> product outcomes.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: INK_MUTED, lineHeight: 1.7, maxWidth: '58ch', marginBottom: '2.5rem' }}>
            By aligning the experience with how people actually plan and book travel, we improved satisfaction and drove higher conversion across key touchpoints.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-8 sm:gap-10">
          <ScrollReveal>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(191,104,83,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 16l6-6 4 4 6-8" />
                  <path d="M16 6h4v4" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.7rem', fontWeight: 500, color: INK, letterSpacing: '-0.02em', marginBottom: '0.3rem' }}>
                  3.2 to 4.4
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK_MUTED, fontWeight: 600, marginBottom: '0.5rem' }}>
                  App Store Rating
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: INK_MUTED, lineHeight: 1.5, margin: 0 }}>
                  User rating improved significantly after launch.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="hidden sm:block" style={{ width: '1px', background: HAIRLINE }} />

          <ScrollReveal delay={80}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(191,104,83,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 20v-6M12 20V8M18 20v-10" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.7rem', fontWeight: 500, color: INK, letterSpacing: '-0.02em', marginBottom: '0.3rem' }}>
                  28%
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK_MUTED, fontWeight: 600, marginBottom: '0.5rem' }}>
                  Booking Conversion
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: INK_MUTED, lineHeight: 1.5, margin: 0 }}>
                  Increase in booking conversion across web and mobile.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>

      <Container className="mt-16 sm:mt-20">
        <div style={{ borderTop: `0.5px solid ${HAIRLINE}` }} />
      </Container>

      {/* ====================================================================
         04 — REFLECTION
      ==================================================================== */}
      <Container className="mt-16 sm:mt-20">
        <div style={{ position: 'relative' }}>
          <Eyebrow index="04" label="Reflection" />

          <ScrollReveal>
            <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)', letterSpacing: '-0.022em', lineHeight: 1.18, color: INK, fontWeight: 500, marginBottom: '1rem', maxWidth: '32ch', position: 'relative', zIndex: 1 }}>
              Designing for real travel behaviour creates{' '}
              <em style={{ fontStyle: 'italic', color: ACCENT }}>lasting impact.</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: INK_MUTED, lineHeight: 1.7, maxWidth: '56ch', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
              The biggest shift wasn&rsquo;t adding more features. It was listening to how people actually plan, discover and book travel — and designing an experience that adapts to their intent, context and journey.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: INK_MUTED, lineHeight: 1.7, maxWidth: '56ch', marginBottom: '2.25rem', position: 'relative', zIndex: 1 }}>
              This project reinforced my belief that thoughtful, user-centred design can simplify complex journeys and make everyday experiences more meaningful.
            </p>
          </ScrollReveal>

          {/* Decorative flight-path — extremely subtle, desktop only, purely
             ornamental (aria-hidden) and never overlaps the reflection text
             (positioned to the right, z-index below the copy above). */}
          <svg
            aria-hidden="true"
            className="hidden lg:block"
            style={{ position: 'absolute', right: '-2rem', top: '-1.5rem', width: '260px', height: '420px', pointerEvents: 'none', zIndex: 0 }}
            viewBox="0 0 260 420"
            fill="none"
          >
            <path d="M20 20 C 150 50, 30 170, 190 210" stroke={ACCENT} strokeWidth="1" opacity="0.08" />
            <path d="M0 70 C 130 100, 10 240, 170 280" stroke={ACCENT} strokeWidth="1" opacity="0.06" />
            <path d="M40 40 C 170 90, 60 270, 205 365" stroke={ACCENT} strokeWidth="1.25" strokeDasharray="3 6" opacity="0.4" />
            <g transform="translate(197, 356) rotate(52)">
              <path d="M0 -7 L2.5 -1 L8 0 L2.5 1 L0 7 L-1 2 L-7 1 L-1 -1 Z" fill={ACCENT} opacity="0.55" />
            </g>
          </svg>
        </div>
      </Container>

      {/* ====================================================================
         NEXT CASE STUDY — restrained editorial treatment matching the
         reference: label, title, one descriptive line, circular arrow.
         Route is unchanged (/work/civtech) — only the displayed title/
         description reflect the Menopause Care framing requested here.
      ==================================================================== */}
      <ScrollReveal>
        <Link to="/work/civtech" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <div style={{ background: '#f2efe9', borderTop: `0.5px solid ${HAIRLINE}`, marginTop: '5rem' }}>
            <Container className="py-14">
              <div className="flex items-center justify-between gap-8 flex-wrap">
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: INK_MUTED, marginBottom: '0.6rem' }}>
                    Next case study →
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', color: INK, letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>
                    Menopause Care · Social Impact Design Sprint
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: INK_MUTED }}>
                    Designing for stronger, more inclusive communities.
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  style={{ width: '52px', height: '52px', borderRadius: '50%', border: `1px solid ${HAIRLINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: INK, fontSize: '1.1rem' }}
                >
                  →
                </div>
              </div>
            </Container>
          </div>
        </Link>
      </ScrollReveal>

      <Footer />
    </div>
  )
}
