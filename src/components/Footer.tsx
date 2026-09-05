import Container from './Container'

// Shared across every page (homepage, /about, every case study) — this
// is the one footer, not a homepage-only component. Previously a dark,
// rounded, centered "closing panel" with its own headline ("Let's
// design products that scale and make an impact") duplicating the
// homepage Contact section's own message right above it. Rebuilt as a
// quiet, left-aligned continuation of whatever section precedes it —
// no card, no dark background, no second headline — so on the homepage
// specifically it now reads as one continuous flow with Contact rather
// than a second, separate closing statement. Content is unchanged:
// same real email, LinkedIn, WhatsApp, résumé, copyright — nothing
// added or removed, only how it's presented.
const WHATSAPP_NUMBER = '918886090063' // same real number FloatingChat.tsx already uses

export default function Footer() {
  return (
    // paddingTop tightened alongside ContactSection's own bottom padding
    // (same small clamp) — on the homepage this was the second gap
    // flagged as making Contact feel disconnected from the footer below
    // it; same fix, same reasoning, on the one shared footer.
    <footer className="pb-10 md:pb-14" style={{ paddingTop: 'clamp(0.75rem, 1vw, 1.125rem)' }}>
      <Container>
        <div className="border-t pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" style={{ borderColor: 'var(--color-border)' }}>
          {/* Subordinate to Contact's headline/CTA above — type-body,
              not the type-heading size used before, and no accent
              color; it's the detail, not the invitation. */}
          <a
            href="mailto:vimalamdes13@gmail.com"
            className="type-body"
            style={{ color: 'var(--color-text)', textDecoration: 'none', borderBottom: '1px solid var(--color-border)', paddingBottom: '2px' }}
          >
            vimalamdes13@gmail.com
          </a>

          {/* inline-block py-2.5 -my-2.5: grows each link's tap target from
              a ~17px text line to ~37px (clearing the ~24px touch-target
              floor) via padding cancelled by an equal negative margin, so
              the row's visible spacing is unchanged. */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href="https://www.linkedin.com/in/vimalabanavath/"
              target="_blank"
              rel="noopener noreferrer"
              className="type-eyebrow inline-block py-2.5 -my-2.5"
              style={{ color: 'var(--color-text-muted)' }}
            >
              LinkedIn ↗
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="type-eyebrow inline-block py-2.5 -my-2.5"
              style={{ color: 'var(--color-text-muted)' }}
            >
              WhatsApp ↗
            </a>
            <a href="/resume.pdf" className="type-eyebrow inline-block py-2.5 -my-2.5" style={{ color: 'var(--color-text-muted)' }}>
              Résumé ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-8">
          <span className="type-small" style={{ color: 'var(--color-text-faint)' }}>
            © 2026 Vimala Banavath
          </span>
          <span className="type-small" style={{ color: 'var(--color-text-faint)' }}>
            Product Designer
          </span>
        </div>
      </Container>
    </footer>
  )
}
