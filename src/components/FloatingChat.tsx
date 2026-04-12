import { useEffect, useRef, useState } from 'react'

/**
 * Chatbase floating chat widget.
 *
 * To activate:
 * 1. Create a chatbot at https://www.chatbase.co
 * 2. Replace CHATBASE_BOT_ID below with your chatbot ID
 * 3. The widget renders automatically — no other changes needed
 */
const CHATBASE_BOT_ID = 'YOUR_CHATBOT_ID' // ← replace this

export default function FloatingChat() {
  const injected = useRef(false)
  const [open, setOpen] = useState(false)
  // removed unused ready state

  useEffect(() => {
    // Only inject the real Chatbase script when a real ID is provided
    if (CHATBASE_BOT_ID === 'YOUR_CHATBOT_ID') {
      setReady(true) // show custom fallback UI
      return
    }

    if (injected.current) return
    injected.current = true

    // Config object Chatbase reads on load
    ;(window as any).embeddedChatbotConfig = {
      chatbotId: CHATBASE_BOT_ID,
      domain: 'www.chatbase.co',
    }

    const script = document.createElement('script')
    script.src = 'https://www.chatbase.co/embed.min.js'
    script.setAttribute('chatbotId', CHATBASE_BOT_ID)
    script.setAttribute('domain', 'www.chatbase.co')
    script.defer = true
    document.body.appendChild(script)

    // Chatbase renders its own bubble — nothing more needed
  }, [])

  // If real Chatbase is configured, it renders its own bubble
  if (CHATBASE_BOT_ID !== 'YOUR_CHATBOT_ID') return null

  // ── Fallback: custom minimal chat trigger ──
  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '24px',
            width: '320px',
            background: '#ffffff',
            border: '1px solid rgba(24,24,27,0.1)',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06)',
            zIndex: 9999,
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#18181b',
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1.5C4 1.5 1.5 3.7 1.5 6.5c0 .9.25 1.74.68 2.47L1.5 12l3.19-.66A5.42 5.42 0 007 11.5c3 0 5.5-2.2 5.5-5s-2.5-5-5.5-5z" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p style={{ color: 'white', fontSize: '13px', fontWeight: 600, margin: 0 }}>Chat with Vimala's AI</p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', margin: '1px 0 0' }}>Ask me anything about my work</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'rgba(255,255,255,0.5)' }}
              aria-label="Close chat"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Body — prompt to set up Chatbase */}
          <div style={{ padding: '24px 20px' }}>
            <p style={{ fontSize: '13px', color: 'rgba(24,24,27,0.55)', lineHeight: 1.65, margin: 0 }}>
              To activate this assistant, add your Chatbase chatbot ID in{' '}
              <code style={{ fontSize: '12px', background: '#f4f3f0', padding: '1px 5px', borderRadius: '4px' }}>FloatingChat.tsx</code>
              .
            </p>
            <a
              href="mailto:vimala@example.com"
              style={{
                display: 'inline-block',
                marginTop: '16px',
                padding: '10px 18px',
                background: '#18181b',
                color: 'white',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              Send me an email instead →
            </a>
          </div>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#18181b',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.06)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.28)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'
        }}
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2C5.5 2 2.5 4.5 2.5 7.75c0 1.1.3 2.1.83 2.96L2.5 15l4.05-.84A6.6 6.6 0 009 14.5c3.5 0 6.5-2.5 6.5-6.75S12.5 2 9 2z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
            <circle cx="6.5" cy="8" r="1" fill="white"/>
            <circle cx="9" cy="8" r="1" fill="white"/>
            <circle cx="11.5" cy="8" r="1" fill="white"/>
          </svg>
        )}
      </button>
    </>
  )
}
