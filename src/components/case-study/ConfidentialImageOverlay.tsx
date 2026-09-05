const WHATSAPP_NUMBER = '918886090063' // same real number used in Footer.tsx / FloatingChat.tsx / ConfidentialNotice.tsx

/**
 * The confidential treatment for a project that DOES have a real image
 * (unlike ConfidentialNotice, used where no screenshot exists at all).
 * The image stays visible under a constant dark tint — never hidden —
 * so the project reads as real work rather than an empty placeholder,
 * while nothing sensitive is ever exposed as text.
 *
 * `interactive={false}` (default): embedded inside the homepage's
 * `<Link>` (see SelectedWork.tsx's `group/media` pattern) — a small
 * "Confidential" marker shows by default; hover/focus (both, via
 * `group-focus-visible/media` — keyboard gets the identical state as a
 * mouse) fades in the fuller "Case study available on request" line.
 * No buttons here: a `<Link>` can't contain nested interactive
 * elements.
 *
 * `interactive={true}`: used on the project's own dedicated page,
 * where there's no wrapping link and no hover gesture to wait for — the
 * full message and the real request-access actions show immediately.
 */
export default function ConfidentialImageOverlay({
  src,
  title,
  interactive = false,
}: {
  src: string
  title: string
  interactive?: boolean
}) {
  const revealClass = interactive
    ? ''
    : 'opacity-0 group-hover/media:opacity-100 group-focus-visible/media:opacity-100'

  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: '820 / 460' }}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center gap-2 px-6"
        style={{ background: 'rgba(17, 17, 16, 0.55)' }}
      >
        <span aria-hidden style={{ fontSize: '20px' }}>🔒</span>
        <p className="type-eyebrow" style={{ color: '#fff' }}>Confidential</p>

        <div className={`transition-opacity duration-300 ${revealClass}`}>
          <p className="type-small" style={{ color: 'rgba(255,255,255,0.92)' }}>
            Case study available on request
          </p>
          {interactive && (
            <p className="type-small mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Due to NDA, access to {title} is restricted.
            </p>
          )}
        </div>

        {interactive && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <a
              href={`mailto:vimalamdes13@gmail.com?subject=${encodeURIComponent('Case study access — ' + title)}`}
              className="inline-flex items-center gap-1.5"
              style={{
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
                padding: '10px 18px', background: '#fff', color: 'var(--color-text)', textDecoration: 'none',
              }}
            >
              Request access →
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Vimala — could I get access to the ' + title + ' case study?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
              style={{
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
                padding: '10px 18px', background: 'transparent', color: '#fff',
                border: '1px solid rgba(255,255,255,0.5)', textDecoration: 'none',
              }}
            >
              WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
