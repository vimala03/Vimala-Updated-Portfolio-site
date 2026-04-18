import { useState, useCallback, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { matchQuery } from '../data/assistantData'

/* ─── Constants ──────────────────────────────────────────────── */
const WHATSAPP  = '918886090063'
const EMAIL     = 'vimalabanavath.design@gmail.com'
const BOT_DELAY = 420 // ms — simulated thinking pause
const MAX_SNAPS = 6   // max Back steps

/* ─── Types ──────────────────────────────────────────────────── */
type Step = 'greeting' | 'typing' | 'explore' | 'ask' | 'ai-answer' | 'compose' | 'sent'

interface MsgLink {
  label:      string
  to:         string
  isInternal: boolean
}

interface Msg {
  id:    number
  role:  'bot' | 'user'
  text:  string
  link?: MsgLink
}

interface Snap {
  step:  Step
  msgs:  Msg[]
  draft: string
}

/* ─── Helpers ────────────────────────────────────────────────── */
function getPageLabel(pathname: string): string {
  if (pathname === '/')                        return 'Home'
  if (pathname === '/about')                   return 'About'
  if (pathname.includes('/work/cornerstone'))  return 'Case Study: Cornerstone'
  if (pathname.includes('/work/buildzar'))     return 'Case Study: Buildzar'
  if (pathname.includes('/work/moonraft'))     return 'Case Study: Moonraft'
  return 'Portfolio'
}

function buildMessage(text: string, page: string): string {
  const ts = new Date().toLocaleString('en-IN', {
    timeZone:  'Asia/Kolkata',
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
  return `Hi Vimala, I came from [${page}] on ${ts}.\n\n${text.trim() || '...'}`
}

const GREETING_MSG: Msg = {
  id:   0,
  role: 'bot',
  text: "Hi, I'm Vimala's assistant.\nAsk me anything about her work — or choose an option below.",
}

/* ─── Icons ──────────────────────────────────────────────────── */
const IcSparkle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
      stroke="white" strokeWidth="1.7" strokeLinejoin="round"
    />
  </svg>
)

const IcClose = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IcWhatsApp = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const IcEmail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
)

const IcPhone = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
)

const IcChat = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M9 2C5.5 2 2.5 4.46 2.5 7.75c0 1.1.3 2.12.83 2.97L2.5 15l4.05-.84A6.6 6.6 0 009 14.5c3.5 0 6.5-2.46 6.5-6.75S12.5 2 9 2z"
      stroke="white" strokeWidth="1.4" strokeLinejoin="round"
    />
    <circle cx="6.5" cy="8" r="1" fill="white" />
    <circle cx="9"   cy="8" r="1" fill="white" />
    <circle cx="11.5" cy="8" r="1" fill="white" />
  </svg>
)

/* ─── Sub-components ─────────────────────────────────────────── */

/** Single chat bubble — bot bubbles can include an optional link button */
function Bubble({ msg, onNavigate, onClose }: {
  msg:        Msg
  onNavigate: (to: string, isInternal: boolean) => void
  onClose:    () => void
}) {
  const isBot = msg.role === 'bot'
  return (
    <div className="fc-in" style={{ display: 'flex', justifyContent: isBot ? 'flex-start' : 'flex-end' }}>
      <div style={{ maxWidth: '88%', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: isBot ? 'flex-start' : 'flex-end' }}>
        <div style={{
          padding:      '9px 13px',
          borderRadius: isBot ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
          background:   isBot ? '#f4f3f0' : '#18181b',
          color:        isBot ? '#18181b' : '#ffffff',
          fontSize:     '13px',
          lineHeight:   1.55,
          letterSpacing: '-0.01em',
          whiteSpace:   'pre-line',
          fontFamily:   "'Inter', sans-serif",
        }}>
          {msg.text}
        </div>

        {/* Link button inside bot bubble */}
        {isBot && msg.link && (
          <button
            onClick={() => {
              onNavigate(msg.link!.to, msg.link!.isInternal)
              if (msg.link!.isInternal) onClose()
            }}
            style={{
              padding:      '7px 12px',
              borderRadius: '8px',
              border:       '1px solid rgba(24,24,27,0.14)',
              background:   'white',
              color:        '#18181b',
              fontSize:     '12px',
              fontWeight:   500,
              cursor:       'pointer',
              fontFamily:   "'Inter', sans-serif",
              letterSpacing: '-0.01em',
              transition:   'all 0.15s',
              display:      'flex',
              alignItems:   'center',
              gap:          '5px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background   = '#18181b'
              e.currentTarget.style.color        = 'white'
              e.currentTarget.style.borderColor  = '#18181b'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background   = 'white'
              e.currentTarget.style.color        = '#18181b'
              e.currentTarget.style.borderColor  = 'rgba(24,24,27,0.14)'
            }}
          >
            {msg.link.label}
          </button>
        )}
      </div>
    </div>
  )
}

/** Animated typing indicator */
function TypingDots() {
  return (
    <div className="fc-in" style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div style={{
        display: 'flex', gap: '4px', alignItems: 'center',
        padding: '11px 15px', background: '#f4f3f0',
        borderRadius: '14px 14px 14px 4px',
      }}>
        {[0, 150, 300].map(d => (
          <span
            key={d}
            className="fc-dot"
            style={{
              display: 'block', width: '5px', height: '5px',
              borderRadius: '50%', background: 'rgba(24,24,27,0.28)',
              animationDelay: `${d}ms`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/** Full-width option button */
function ChoiceBtn({
  label,
  sublabel,
  onClick,
}: {
  label:     string
  sublabel?: string
  onClick:   () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', padding: '10px 14px',
        borderRadius: '10px', border: '1px solid rgba(24,24,27,0.1)',
        background: 'transparent', cursor: 'pointer',
        fontFamily: "'Inter', sans-serif", textAlign: 'left',
        transition: 'background 0.15s, border-color 0.15s',
        display: 'flex', flexDirection: 'column', gap: '1px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background  = '#18181b'
        e.currentTarget.style.borderColor = '#18181b'
        e.currentTarget.querySelectorAll('span').forEach(s => {
          (s as HTMLElement).style.color = s.dataset.sub ? 'rgba(255,255,255,0.45)' : 'white'
        })
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background  = 'transparent'
        e.currentTarget.style.borderColor = 'rgba(24,24,27,0.1)'
        e.currentTarget.querySelectorAll('span').forEach(s => {
          (s as HTMLElement).style.color = s.dataset.sub ? 'rgba(24,24,27,0.42)' : '#18181b'
        })
      }}
    >
      <span style={{ fontSize: '13px', fontWeight: 500, color: '#18181b', letterSpacing: '-0.01em', transition: 'color 0.15s' }}>
        {label}
      </span>
      {sublabel && (
        <span
          data-sub="1"
          style={{ fontSize: '11px', color: 'rgba(24,24,27,0.42)', transition: 'color 0.15s', letterSpacing: '0.01em' }}
        >
          {sublabel}
        </span>
      )}
    </button>
  )
}

/* ─── CSS injected once ──────────────────────────────────────── */
const CSS = `
  @keyframes fcUp {
    from { opacity:0; transform:translateY(16px) scale(0.96); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes fcIn {
    from { opacity:0; transform:translateY(7px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fcBounce {
    0%,80%,100% { transform:translateY(0); opacity:.35; }
    40%          { transform:translateY(-5px); opacity:1; }
  }
  .fc-panel  { animation: fcUp 0.26s cubic-bezier(0.22,1,0.36,1) both; }
  .fc-in     { animation: fcIn 0.22s cubic-bezier(0.22,1,0.36,1) both; }
  .fc-dot    { animation: fcBounce 1.1s ease-in-out infinite; }
  .fc-textarea:focus { outline: none; }
`

/* ─── Main Component ─────────────────────────────────────────── */
export default function FloatingChat() {
  const { pathname } = useLocation()
  const navigate     = useNavigate()

  const [open,    setOpen]    = useState(false)
  const [step,    setStep]    = useState<Step>('greeting')
  const [msgs,    setMsgs]    = useState<Msg[]>([GREETING_MSG])
  const [draft,   setDraft]   = useState('')
  const [history, setHistory] = useState<Snap[]>([])
  const bottomRef             = useRef<HTMLDivElement>(null)
  let   nextId                = useRef(1)

  /* ── Auto-scroll ── */
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, step, open])

  /* ── Core helpers ── */
  const makeId = () => nextId.current++

  const addMsg = useCallback((role: 'bot' | 'user', text: string, link?: MsgLink) => {
    setMsgs(prev => [...prev, { id: makeId(), role, text, link }])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** Save current state to history before a transition */
  const takeSnap = useCallback(() => {
    setHistory(h => {
      const snap: Snap = { step, msgs: [...msgs], draft }
      return [...h.slice(-(MAX_SNAPS - 1)), snap]
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, msgs, draft])

  /** Restore previous snapshot */
  const handleBack = useCallback(() => {
    setHistory(h => {
      if (h.length === 0) return h
      const prev = h[h.length - 1]
      setStep(prev.step)
      setMsgs(prev.msgs)
      setDraft(prev.draft)
      return h.slice(0, -1)
    })
  }, [])

  const handleReset = useCallback(() => {
    setStep('greeting')
    setMsgs([GREETING_MSG])
    setDraft('')
    setHistory([])
    nextId.current = 1
  }, [])

  const handleToggle = useCallback(() => setOpen(o => !o), [])

  /**
   * Core transition helper:
   * echo the user label, show typing, then after delay add bot reply + advance step.
   */
  const botReply = useCallback(
    (userLabel: string, botText: string, next: Step, link?: MsgLink) => {
      addMsg('user', userLabel)
      setStep('typing')
      setTimeout(() => {
        addMsg('bot', botText, link)
        setStep(next)
      }, BOT_DELAY)
    },
    [addMsg],
  )

  /* ── Intent selection (greeting step) ── */
  const handleIntent = useCallback(
    (intent: 'project' | 'explore' | 'ask') => {
      takeSnap()
      if (intent === 'project') {
        botReply(
          '🚀 Start a project',
          "Tell me what you're building — a product, a feature, or a whole new experience.",
          'compose',
        )
      } else if (intent === 'explore') {
        botReply(
          '🔍 Explore her work',
          "What would you like to know?",
          'explore',
        )
      } else {
        botReply(
          '🤖 Ask the AI',
          "Ask me anything — projects, process, skills, availability...",
          'ask',
        )
      }
    },
    [botReply, takeSnap],
  )

  /* ── Explore sub-options ── */
  const handleExplore = useCallback(
    (opt: 'cornerstone' | 'buildzar' | 'moonraft' | 'process' | 'outcomes' | 'freeask') => {
      takeSnap()

      if (opt === 'freeask') {
        botReply('💬 Ask me anything', "Go ahead — type your question.", 'ask')
        return
      }

      const map = {
        cornerstone: {
          label:    '📐 Cornerstone OnDemand',
          text:     `I redesigned Cornerstone's Content Manager with three AI-first features:\n\n· AI metadata generation — auto-fills title, description, keywords & skills\n· Bulk multilingual translation — 40-click workflow → 1 click\n· Smart session continuity — progress saved automatically\n\n📊 1,700+ admin mins/month saved · 4,000+ pages via AI-powered search`,
          link:     { label: 'View case study: Cornerstone →', to: '/work/cornerstone', isInternal: true },
          next:     'ai-answer' as Step,
        },
        buildzar: {
          label:    '🏗 Buildzar',
          text:     `Buildzar is a B2B construction materials marketplace:\n\n· Redesigned supplier discovery and bulk product browsing\n· Streamlined multi-line procurement and quote-request flows\n· Built to handle a large SKU catalogue without overwhelming buyers\n\n📊 Reduced procurement steps · Improved supplier–buyer matching`,
          link:     { label: 'View case study: Buildzar →', to: '/work/buildzar', isInternal: true },
          next:     'ai-answer' as Step,
        },
        moonraft: {
          label:    '🌐 Moonraft – UST Global',
          text:     `For UST Global, I led the UX redesign of their internal intranet:\n\n· Consolidated 40+ fragmented internal tools into one coherent experience\n· Research-led process — employee interviews, card sorting, JTBD mapping\n· Improved global navigation, unified search, cross-team task flows\n\n📊 Faster information access · Measurably reduced navigation steps`,
          link:     { label: 'View case study: Moonraft →', to: '/work/moonraft', isInternal: true },
          next:     'ai-answer' as Step,
        },
        process: {
          label:    '🔄 UX process',
          text:     `My UX process is research-first, always:\n\n1. Deep user interviews & JTBD framework\n2. Competitive benchmarking & heuristic analysis\n3. Lo-fi sketches → rapid wireframe iteration\n4. Prototype testing with real users\n5. Dev-ready handoff with annotated edge cases\n\nEvery project starts with "why does this matter to the user?" before touching Figma.`,
          link:     undefined,
          next:     'ai-answer' as Step,
        },
        outcomes: {
          label:    '📊 Project outcomes',
          text:     `Measurable impact across key projects:\n\n· 1,700+ admin mins/month saved — Cornerstone OnDemand\n· 40-click workflow → 1 click — Cornerstone\n· 4,000+ pages navigated via AI-powered search\n· Booking conversion improved — Flyin Travel\n· Cross-team collaboration increased — UST Global intranet`,
          link:     undefined,
          next:     'ai-answer' as Step,
        },
      }

      const { label, text, link, next } = map[opt]
      botReply(label, text, next, link)
    },
    [botReply, takeSnap],
  )

  /* ── AI free-text query submit ── */
  const handleAskSubmit = useCallback(() => {
    const q = draft.trim()
    if (!q) return
    takeSnap()
    addMsg('user', q)
    setDraft('')
    setStep('typing')
    setTimeout(() => {
      const result = matchQuery(q)
      if (result) {
        const link: MsgLink | undefined = result.linkTo
          ? {
              label:      result.linkLabel ?? 'View →',
              to:         result.linkTo,
              isInternal: result.isInternal ?? false,
            }
          : undefined
        addMsg('bot', `Got it — here's what I found:\n\n${result.response}`, link)
      } else {
        addMsg(
          'bot',
          "I didn't find an exact match — but Vimala would love to answer this directly.\n\nReach out below and she'll get back to you.",
        )
      }
      setStep('ai-answer')
    }, BOT_DELAY)
  }, [draft, addMsg, takeSnap])

  /* ── Transition from ai-answer → compose ── */
  const handleAiReachOut = useCallback(() => {
    takeSnap()
    botReply(
      '✉️ Reach out about this',
      "Perfect. Add any extra context and choose how you'd like to connect.",
      'compose',
    )
  }, [botReply, takeSnap])

  /* ── Navigate helper (for bubble link buttons) ── */
  const handleNavigate = useCallback((to: string, isInternal: boolean) => {
    if (isInternal) {
      navigate(to)
    } else {
      window.open(to, '_blank', 'noopener,noreferrer')
    }
  }, [navigate])

  /* ── Send handlers ── */
  const handleSend = useCallback(
    (channel: 'whatsapp' | 'email' | 'call') => {
      const page = getPageLabel(pathname)
      const full = buildMessage(draft, page)

      if (channel === 'whatsapp') {
        addMsg('bot', "Opening WhatsApp now... 💬")
        setStep('sent')
        setTimeout(() => {
          window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(full)}`, '_blank', 'noopener,noreferrer')
        }, 300)
      } else if (channel === 'email') {
        addMsg('bot', "Opening your email client... 📧")
        setStep('sent')
        setTimeout(() => {
          window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio Inquiry')}&body=${encodeURIComponent(full)}`
        }, 300)
      } else {
        addMsg('bot', "Calling now... 📞")
        setStep('sent')
        setTimeout(() => {
          window.location.href = `tel:+${WHATSAPP}`
        }, 300)
      }
    },
    [draft, pathname, addMsg],
  )

  /* ── Controls visibility ── */
  const showControls = !(['greeting', 'typing', 'sent'] as Step[]).includes(step)

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <>
      <style>{CSS}</style>

      {/* ── Panel ── */}
      {open && (
        <div
          role="dialog"
          aria-label="Portfolio Assistant"
          aria-modal="true"
          className="fc-panel"
          style={{
            position:      'fixed',
            bottom:        '88px',
            right:         '24px',
            width:         'min(348px, calc(100vw - 32px))',
            maxHeight:     '560px',
            display:       'flex',
            flexDirection: 'column',
            background:    '#ffffff',
            border:        '1px solid rgba(24,24,27,0.09)',
            borderRadius:  '20px',
            boxShadow:     '0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.05)',
            zIndex:        9999,
            overflow:      'hidden',
            fontFamily:    "'Inter', sans-serif",
          }}
        >
          {/* ── Header ── */}
          <div style={{
            background:     '#18181b',
            padding:        '14px 16px',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            flexShrink:      0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <IcSparkle />
              </div>
              <div>
                <p style={{ color: 'white', fontSize: '13px', fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>
                  Portfolio Assistant
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: '#4ade80', display: 'inline-block', flexShrink: 0,
                  }} />
                  <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '11px' }}>Powered by knowledge</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleToggle}
              aria-label="Close portfolio assistant"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px', color: 'rgba(255,255,255,0.38)',
                display: 'flex', alignItems: 'center',
                borderRadius: '6px', transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
            >
              <IcClose />
            </button>
          </div>

          {/* ── Messages ── */}
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: '14px 14px 6px',
            display: 'flex', flexDirection: 'column', gap: '8px',
          }}>
            {msgs.map(msg => (
              <Bubble
                key={msg.id}
                msg={msg}
                onNavigate={handleNavigate}
                onClose={() => setOpen(false)}
              />
            ))}
            {step === 'typing' && <TypingDots />}
            <div ref={bottomRef} />
          </div>

          {/* ── Input area ── */}
          <div style={{
            padding:    '10px 14px 16px',
            borderTop:  '1px solid rgba(24,24,27,0.06)',
            flexShrink: 0,
          }}>

            {/* GREETING — 3 intent choices */}
            {step === 'greeting' && (
              <div className="fc-in" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <ChoiceBtn
                  label="🚀 Start a project"
                  sublabel="Let's discuss what you're building"
                  onClick={() => handleIntent('project')}
                />
                <ChoiceBtn
                  label="🔍 Explore her work"
                  sublabel="Case studies, process & outcomes"
                  onClick={() => handleIntent('explore')}
                />
                <ChoiceBtn
                  label="🤖 Ask the AI"
                  sublabel="Any question about skills, projects or availability"
                  onClick={() => handleIntent('ask')}
                />
              </div>
            )}

            {/* EXPLORE — case study + topic choices */}
            {step === 'explore' && (
              <div className="fc-in" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <ChoiceBtn label="📐 Cornerstone OnDemand"  sublabel="AI metadata, bulk workflows" onClick={() => handleExplore('cornerstone')} />
                <ChoiceBtn label="🏗 Buildzar"              sublabel="B2B construction marketplace" onClick={() => handleExplore('buildzar')}    />
                <ChoiceBtn label="🌐 Moonraft – UST Global" sublabel="Enterprise intranet redesign" onClick={() => handleExplore('moonraft')}   />
                <ChoiceBtn label="🔄 UX process"            onClick={() => handleExplore('process')}  />
                <ChoiceBtn label="📊 Project outcomes"      onClick={() => handleExplore('outcomes')} />
                <ChoiceBtn label="💬 Ask me anything"       onClick={() => handleExplore('freeask')}  />
              </div>
            )}

            {/* ASK — free text AI input */}
            {step === 'ask' && (
              <div className="fc-in" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Textarea with inline send button */}
                <div style={{ position: 'relative' }}>
                  <textarea
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAskSubmit() }
                    }}
                    placeholder="Ask about projects, process, skills, availability..."
                    aria-label="Ask a question"
                    rows={3}
                    className="fc-textarea"
                    autoFocus
                    style={{
                      width:        '100%',
                      padding:      '10px 42px 10px 12px', // right pad for send btn
                      borderRadius: '10px',
                      border:       '1px solid rgba(24,24,27,0.12)',
                      background:   '#fafaf9',
                      fontSize:     '13px',
                      lineHeight:   1.6,
                      color:        '#18181b',
                      fontFamily:   "'Inter', sans-serif",
                      resize:       'none',
                      outline:      'none',
                      boxSizing:    'border-box',
                      transition:   'border-color 0.15s',
                    }}
                    onFocus={e  => (e.currentTarget.style.borderColor = 'rgba(24,24,27,0.32)')}
                    onBlur={e   => (e.currentTarget.style.borderColor = 'rgba(24,24,27,0.12)')}
                  />
                  {/* Inline send button — appears only when there's text */}
                  <button
                    onClick={handleAskSubmit}
                    disabled={!draft.trim()}
                    aria-label="Send question"
                    style={{
                      position:       'absolute',
                      bottom:         '8px',
                      right:          '8px',
                      width:          '28px',
                      height:         '28px',
                      borderRadius:   '7px',
                      border:         'none',
                      background:     draft.trim() ? '#18181b' : 'rgba(24,24,27,0.07)',
                      color:          draft.trim() ? 'white'   : 'rgba(24,24,27,0.22)',
                      cursor:         draft.trim() ? 'pointer' : 'default',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      fontSize:       '14px',
                      lineHeight:     1,
                      transition:     'all 0.15s',
                      flexShrink:     0,
                    }}
                    onMouseEnter={e => { if (draft.trim()) e.currentTarget.style.opacity = '0.8' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                  >
                    ↑
                  </button>
                </div>
                <p style={{ fontSize: '10px', color: 'rgba(24,24,27,0.26)', margin: 0, textAlign: 'center' }}>
                  Enter to send · Shift+Enter for new line
                </p>
              </div>
            )}

            {/* AI-ANSWER — offer to reach out */}
            {step === 'ai-answer' && (
              <div className="fc-in" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <ChoiceBtn
                  label="✉️ Reach out about this"
                  sublabel="Send Vimala a message via WhatsApp or email"
                  onClick={handleAiReachOut}
                />
                <ChoiceBtn
                  label="🤖 Ask something else"
                  sublabel="Ask another question"
                  onClick={() => { takeSnap(); setStep('ask'); setDraft('') }}
                />
              </div>
            )}

            {/* COMPOSE — textarea + 3 send CTAs */}
            {step === 'compose' && (
              <div className="fc-in" style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                <textarea
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  onKeyDown={e => {
                    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                      e.preventDefault()
                      handleSend('whatsapp')
                    }
                  }}
                  placeholder="Add any extra context or questions... (optional)"
                  aria-label="Your message to Vimala"
                  rows={3}
                  autoFocus
                  className="fc-textarea"
                  style={{
                    width:        '100%',
                    padding:      '10px 12px',
                    borderRadius: '10px',
                    border:       '1px solid rgba(24,24,27,0.12)',
                    background:   '#fafaf9',
                    fontSize:     '13px',
                    lineHeight:   1.6,
                    color:        '#18181b',
                    fontFamily:   "'Inter', sans-serif",
                    resize:       'none',
                    outline:      'none',
                    boxSizing:    'border-box',
                    transition:   'border-color 0.15s',
                  }}
                  onFocus={e  => (e.currentTarget.style.borderColor = 'rgba(24,24,27,0.32)')}
                  onBlur={e   => (e.currentTarget.style.borderColor = 'rgba(24,24,27,0.12)')}
                />

                {/* Primary CTA — WhatsApp (full width) */}
                <button
                  onClick={() => handleSend('whatsapp')}
                  aria-label="Send message via WhatsApp"
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                    padding: '10px', borderRadius: '10px', border: 'none',
                    background: '#25D366', color: 'white',
                    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <IcWhatsApp /> Send via WhatsApp
                </button>

                {/* Secondary CTAs — Email + Call (equal width) */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => handleSend('email')}
                    aria-label="Send via Email"
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                      padding: '9px 6px', borderRadius: '9px',
                      border: '1px solid rgba(24,24,27,0.12)', background: 'transparent',
                      color: 'rgba(24,24,27,0.56)',
                      fontSize: '11.5px', fontWeight: 500, cursor: 'pointer',
                      fontFamily: "'Inter', sans-serif", transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background   = '#18181b'
                      e.currentTarget.style.borderColor  = '#18181b'
                      e.currentTarget.style.color        = 'white'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background   = 'transparent'
                      e.currentTarget.style.borderColor  = 'rgba(24,24,27,0.12)'
                      e.currentTarget.style.color        = 'rgba(24,24,27,0.56)'
                    }}
                  >
                    <IcEmail /> Send via Email
                  </button>

                  <button
                    onClick={() => handleSend('call')}
                    aria-label="Call Vimala"
                    style={{
                      flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                      padding: '9px 14px', borderRadius: '9px',
                      border: '1px solid rgba(24,24,27,0.12)', background: 'transparent',
                      color: 'rgba(24,24,27,0.5)',
                      fontSize: '11.5px', fontWeight: 500, cursor: 'pointer',
                      fontFamily: "'Inter', sans-serif", transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(24,24,27,0.28)'
                      e.currentTarget.style.color       = '#18181b'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(24,24,27,0.12)'
                      e.currentTarget.style.color       = 'rgba(24,24,27,0.5)'
                    }}
                  >
                    <IcPhone /> Call
                  </button>
                </div>

                <p style={{
                  fontSize: '10px', color: 'rgba(24,24,27,0.26)',
                  margin: 0, textAlign: 'center', letterSpacing: '0.01em',
                }}>
                  ⌘/Ctrl+Enter to send via WhatsApp · Page &amp; time added automatically
                </p>
              </div>
            )}

            {/* SENT — restart */}
            {step === 'sent' && (
              <div className="fc-in" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4px' }}>
                <button
                  onClick={handleReset}
                  aria-label="Start the conversation over"
                  style={{
                    padding: '8px 22px', borderRadius: '999px',
                    border: '1px solid rgba(24,24,27,0.12)', background: 'transparent',
                    color: 'rgba(24,24,27,0.46)', fontSize: '12px', cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif", transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(24,24,27,0.28)'
                    e.currentTarget.style.color       = '#18181b'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(24,24,27,0.12)'
                    e.currentTarget.style.color       = 'rgba(24,24,27,0.46)'
                  }}
                >
                  ↺ &nbsp;Start over
                </button>
              </div>
            )}

            {/* TYPING — height spacer */}
            {step === 'typing' && <div style={{ height: '4px' }} />}

            {/* ── Controls: Back + Restart ── */}
            {showControls && (
              <div
                className="fc-in"
                style={{
                  display:        'flex',
                  justifyContent: 'space-between',
                  alignItems:     'center',
                  marginTop:      '10px',
                  paddingTop:     '8px',
                  borderTop:      '1px solid rgba(24,24,27,0.05)',
                }}
              >
                <button
                  onClick={handleBack}
                  disabled={history.length === 0}
                  aria-label="Go back one step"
                  style={{
                    background:   'none',
                    border:       'none',
                    cursor:       history.length > 0 ? 'pointer' : 'default',
                    fontSize:     '11px',
                    color:        history.length > 0 ? 'rgba(24,24,27,0.46)' : 'rgba(24,24,27,0.18)',
                    fontFamily:   "'Inter', sans-serif",
                    padding:      '2px 0',
                    letterSpacing: '0.01em',
                    transition:   'color 0.15s',
                  }}
                  onMouseEnter={e => { if (history.length > 0) e.currentTarget.style.color = '#18181b' }}
                  onMouseLeave={e => { if (history.length > 0) e.currentTarget.style.color = 'rgba(24,24,27,0.46)' }}
                >
                  ← Back
                </button>

                <button
                  onClick={handleReset}
                  aria-label="Restart conversation"
                  style={{
                    background:   'none',
                    border:       'none',
                    cursor:       'pointer',
                    fontSize:     '11px',
                    color:        'rgba(24,24,27,0.46)',
                    fontFamily:   "'Inter', sans-serif",
                    padding:      '2px 0',
                    letterSpacing: '0.01em',
                    transition:   'color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#18181b')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(24,24,27,0.46)')}
                >
                  ↻ Restart
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Floating trigger ── */}
      <button
        onClick={handleToggle}
        aria-label={open ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        style={{
          position:       'fixed',
          bottom:         '24px',
          right:          '24px',
          width:          '52px',
          height:         '52px',
          borderRadius:   '50%',
          background:     '#18181b',
          border:         '1px solid rgba(255,255,255,0.1)',
          boxShadow:      '0 8px 24px rgba(0,0,0,0.2)',
          cursor:         'pointer',
          zIndex:         9999,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          transition:     'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.07)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.26)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'
        }}
      >
        {open ? (
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          <IcChat />
        )}
      </button>
    </>
  )
}
