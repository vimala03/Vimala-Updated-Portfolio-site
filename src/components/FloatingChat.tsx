import { useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

/* ─── Constants ─── */
const WHATSAPP_NUMBER = '918886090063'
const EMAIL_ADDRESS   = 'vimalabanavath.design@gmail.com'

const QUICK_PROMPTS = [
  { label: 'Hire me',             text: "I'm interested in hiring you for a product design role." },
  { label: 'Project discussion',  text: "I'd like to discuss a project I'm working on."           },
  { label: 'Portfolio feedback',  text: 'I have some feedback on your portfolio.'                  },
]

/* ─── Helpers ─── */
function getPageLabel(pathname: string): string {
  if (pathname === '/')                         return 'Home'
  if (pathname === '/about')                    return 'About'
  if (pathname.includes('/work/cornerstone'))   return 'Case Study: Cornerstone OnDemand'
  if (pathname.includes('/work/buildzar'))      return 'Case Study: Buildzar'
  if (pathname.includes('/work/moonraft'))      return 'Case Study: Moonraft'
  return 'Portfolio'
}

function getTimestamp(): string {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day:    'numeric',
    month:  'short',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  })
}

function buildFullMessage(userText: string, pageLabel: string): string {
  const ts = getTimestamp()
  const context = `Hi Vimala, I came from [${pageLabel}] on ${ts}.\n\n`
  return context + (userText.trim() || '...')
}

/* ─── SVG Icons ─── */
const IconMessage = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2C5.5 2 2.5 4.46 2.5 7.75c0 1.1.3 2.12.83 2.97L2.5 15l4.05-.84A6.6 6.6 0 009 14.5c3.5 0 6.5-2.46 6.5-6.75S12.5 2 9 2z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
    <circle cx="6.5" cy="8" r="1" fill="white"/>
    <circle cx="9"   cy="8" r="1" fill="white"/>
    <circle cx="11.5" cy="8" r="1" fill="white"/>
  </svg>
)

const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const IconWhatsApp = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const IconEmail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
)

/* ─── Component ─── */
export default function FloatingChat() {
  const { pathname } = useLocation()
  const [open,    setOpen]    = useState(false)
  const [message, setMessage] = useState('')
  const [sent,    setSent]    = useState(false)

  const pageLabel = getPageLabel(pathname)

  const handleQuickPrompt = useCallback((text: string) => {
    setMessage(text)
  }, [])

  const handleWhatsApp = useCallback(() => {
    const full = buildFullMessage(message, pageLabel)
    const url  = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(full)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }, [message, pageLabel])

  const handleEmail = useCallback(() => {
    const full    = buildFullMessage(message, pageLabel)
    const subject = encodeURIComponent('Portfolio Inquiry')
    const body    = encodeURIComponent(full)
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }, [message, pageLabel])

  const handleToggle = useCallback(() => {
    setOpen((o) => !o)
    if (sent) setSent(false)
  }, [sent])

  return (
    <>
      {/* ── Panel ── */}
      {open && (
        <div
          role="dialog"
          aria-label="Contact Vimala"
          aria-modal="true"
          style={{
            position:     'fixed',
            bottom:       '88px',
            right:        '24px',
            width:        '320px',
            background:   '#ffffff',
            border:       '1px solid rgba(24,24,27,0.1)',
            borderRadius: '20px',
            boxShadow:    '0 24px 64px rgba(0,0,0,0.16), 0 4px 16px rgba(0,0,0,0.06)',
            zIndex:       9999,
            overflow:     'hidden',
            fontFamily:   "'Inter', sans-serif",
            animation:    'fcSlideUp 0.22s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <style>{`
            @keyframes fcSlideUp {
              from { opacity: 0; transform: translateY(12px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0)    scale(1);    }
            }
          `}</style>

          {/* Header */}
          <div style={{ background: '#18181b', padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="1.8"/>
                </svg>
              </div>
              <div>
                <p style={{ color: 'white', fontSize: '13px', fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>Say hello 👋</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: '2px 0 0', letterSpacing: '0.01em' }}>
                  From&nbsp;<span style={{ color: 'rgba(255,255,255,0.65)' }}>{pageLabel}</span>
                </p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              aria-label="Close contact widget"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', borderRadius: '6px', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              <IconClose />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '16px 18px 18px' }}>

            {/* Quick prompts */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {QUICK_PROMPTS.map(({ label, text }) => (
                <button
                  key={label}
                  onClick={() => handleQuickPrompt(text)}
                  aria-label={`Pre-fill: ${label}`}
                  style={{
                    padding:         '5px 11px',
                    borderRadius:    '999px',
                    border:          `1px solid ${message === text ? 'rgba(24,24,27,0.5)' : 'rgba(24,24,27,0.12)'}`,
                    background:      message === text ? '#18181b' : 'transparent',
                    color:           message === text ? 'white' : 'rgba(24,24,27,0.6)',
                    fontSize:        '11px',
                    fontWeight:      500,
                    cursor:          'pointer',
                    fontFamily:      "'Inter', sans-serif",
                    letterSpacing:   '0.01em',
                    transition:      'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (message !== text) {
                      e.currentTarget.style.borderColor = 'rgba(24,24,27,0.3)'
                      e.currentTarget.style.color = 'rgba(24,24,27,0.85)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (message !== text) {
                      e.currentTarget.style.borderColor = 'rgba(24,24,27,0.12)'
                      e.currentTarget.style.color = 'rgba(24,24,27,0.6)'
                    }
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project or requirement..."
              aria-label="Your message to Vimala"
              rows={4}
              style={{
                width:          '100%',
                padding:        '11px 13px',
                borderRadius:   '12px',
                border:         '1px solid rgba(24,24,27,0.12)',
                background:     '#fafaf9',
                fontSize:       '13px',
                lineHeight:     1.6,
                color:          '#18181b',
                fontFamily:     "'Inter', sans-serif",
                resize:         'none',
                outline:        'none',
                boxSizing:      'border-box',
                transition:     'border-color 0.15s',
              }}
              onFocus={(e)  => (e.currentTarget.style.borderColor = 'rgba(24,24,27,0.35)')}
              onBlur={(e)   => (e.currentTarget.style.borderColor = 'rgba(24,24,27,0.12)')}
            />

            {/* Context hint */}
            <p style={{ fontSize: '10px', color: 'rgba(24,24,27,0.32)', margin: '6px 0 14px', letterSpacing: '0.02em' }}>
              Page context &amp; timestamp will be appended automatically.
            </p>

            {/* CTAs */}
            {sent ? (
              <div style={{ textAlign: 'center', padding: '10px 0', fontSize: '13px', color: 'rgba(24,24,27,0.55)', letterSpacing: '-0.01em' }}>
                ✓ Opening — talk soon!
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleWhatsApp}
                  aria-label="Send message via WhatsApp"
                  style={{
                    flex:           1,
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    gap:            '6px',
                    padding:        '10px 12px',
                    borderRadius:   '10px',
                    border:         'none',
                    background:     '#25D366',
                    color:          'white',
                    fontSize:       '12px',
                    fontWeight:     600,
                    cursor:         'pointer',
                    fontFamily:     "'Inter', sans-serif",
                    letterSpacing:  '0.01em',
                    transition:     'opacity 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <IconWhatsApp />
                  WhatsApp
                </button>

                <button
                  onClick={handleEmail}
                  aria-label="Send message via Email"
                  style={{
                    flex:           1,
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    gap:            '6px',
                    padding:        '10px 12px',
                    borderRadius:   '10px',
                    border:         '1px solid rgba(24,24,27,0.14)',
                    background:     '#18181b',
                    color:          'white',
                    fontSize:       '12px',
                    fontWeight:     600,
                    cursor:         'pointer',
                    fontFamily:     "'Inter', sans-serif",
                    letterSpacing:  '0.01em',
                    transition:     'opacity 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <IconEmail />
                  Email
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Floating trigger ── */}
      <button
        onClick={handleToggle}
        aria-label={open ? 'Close contact widget' : 'Open contact widget'}
        style={{
          position:     'fixed',
          bottom:       '24px',
          right:        '24px',
          width:        '52px',
          height:       '52px',
          borderRadius: '50%',
          background:   '#18181b',
          border:       '1px solid rgba(255,255,255,0.1)',
          boxShadow:    '0 8px 24px rgba(0,0,0,0.2)',
          cursor:       'pointer',
          zIndex:       9999,
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          transition:   'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform  = 'scale(1.06)'
          e.currentTarget.style.boxShadow  = '0 12px 32px rgba(0,0,0,0.28)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform  = 'scale(1)'
          e.currentTarget.style.boxShadow  = '0 8px 24px rgba(0,0,0,0.2)'
        }}
      >
        {open ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        ) : (
          <IconMessage />
        )}
      </button>
    </>
  )
}
