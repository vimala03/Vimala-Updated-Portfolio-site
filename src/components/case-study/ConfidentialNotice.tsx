const WHATSAPP_NUMBER = '918886090063' // same real number used in Footer.tsx / FloatingChat.tsx

/**
 * The muted/locked treatment for an NDA-restricted case study.
 *
 * `interactive={false}` (the default) renders just the visual — lock
 * icon + "available on request" — meant to sit inside a `<Link>` on the
 * Selected Work homepage panel, matching how every other project's
 * image is itself the clickable element (no buttons nested inside a
 * link, which would be invalid/inaccessible).
 *
 * `interactive={true}` (used on the project's own page, where there's
 * no wrapping link to conflict with) adds the actual "Request access"
 * / WhatsApp actions.
 */
export default function ConfidentialNotice({
  title,
  interactive = false,
}: {
  title: string
  interactive?: boolean
}) {
  return (
    <div
      className="relative flex flex-col items-center justify-center text-center gap-4 px-6"
      style={{
        aspectRatio: '820 / 460',
        background: 'linear-gradient(135deg, #e9c9a8 0%, #ecd3ba 100%)',
      }}
    >
      <span aria-hidden style={{ fontSize: '22px' }}>🔒</span>
      <div>
        <p className="type-subheading" style={{ color: 'var(--color-text)' }}>
          Case study available on request
        </p>
        <p className="type-small mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
          Due to NDA, access to {title} is restricted.
        </p>
      </div>
      {interactive && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
          <a
            href={`mailto:vimalamdes13@gmail.com?subject=${encodeURIComponent('Case study access — ' + title)}`}
            className="inline-flex items-center gap-1.5"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              padding: '10px 18px',
              background: 'var(--color-text)',
              color: '#fff',
              textDecoration: 'none',
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
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              padding: '10px 18px',
              background: '#fff',
              color: 'var(--color-text)',
              textDecoration: 'none',
            }}
          >
            WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}
