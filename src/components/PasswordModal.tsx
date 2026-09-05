import { useState, useEffect, useRef, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PasswordModalProps {
  label:    string
  figmaUrl: string
  password: string
  onClose:  () => void
}

export default function PasswordModal({ label, figmaUrl, password, onClose }: PasswordModalProps) {
  const [value,   setValue]   = useState('')
  const [error,   setError]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [show,    setShow]    = useState(true)
  const inputRef  = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId   = useId()

  useEffect(() => {
    // Focus trap + return: capture whatever had focus before the modal
    // opened (the card/button that triggered it) so it gets focus back
    // on close, and keep Tab cycling inside the dialog while it's open —
    // previously Tab could escape into the page behind it.
    const triggerEl = document.activeElement as HTMLElement | null
    inputRef.current?.focus()

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { handleClose(); return }
      if (e.key !== 'Tab' || !dialogRef.current) return

      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last  = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      triggerEl?.focus?.()
    }
  }, [])

  const handleClose = () => {
    setShow(false)
    setTimeout(onClose, 240)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    if (value.trim() === password.trim()) {
      setLoading(true)
      setTimeout(() => {
        window.open(figmaUrl, '_blank', 'noopener,noreferrer')
        handleClose()
      }, 150)
    } else {
      setError(true)
      setValue('')
      inputRef.current?.focus()
    }
  }

  const isEmpty    = !value.trim()
  const isDisabled = isEmpty || loading

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="modal-backdrop"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <motion.div
            key="modal-card"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '40px',
              width: '100%',
              maxWidth: '400px',
              margin: '0 24px',
              position: 'relative',
              boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)',
            }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              aria-label="Close"
              style={{
                position: 'absolute', top: '16px', right: '16px',
                width: '30px', height: '30px',
                border: 'none', background: 'rgba(24,24,27,0.05)',
                borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(24,24,27,0.4)', fontSize: '18px', lineHeight: 1, padding: 0,
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(24,24,27,0.10)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(24,24,27,0.05)')}
            >
              ×
            </button>

            {/* Lock mark */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '22px' }}>🔒</span>
            </div>

            {/* Heading */}
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '10px', fontWeight: 600, color: 'rgba(24,24,27,0.35)', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Protected
            </p>
            <h2 id={titleId} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 500, color: '#18181b', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
              {label}
            </h2>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '13.5px', color: 'rgba(24,24,27,0.45)', margin: '0 0 26px', lineHeight: 1.5 }}>
              Enter the password to view this case study.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                ref={inputRef}
                type="password"
                value={value}
                onChange={(e) => { setValue(e.target.value); setError(false) }}
                placeholder="Password"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: error ? '1.5px solid #e74c3c' : '1px solid rgba(24,24,27,0.14)',
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: '14px',
                  color: '#18181b',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
                  background: error ? '#fef9f9' : '#fafaf9',
                  boxShadow: error ? '0 0 0 3px rgba(231,76,60,0.08)' : 'none',
                  opacity: loading ? 0.6 : 1,
                }}
                onFocus={e => { if (!error) e.currentTarget.style.borderColor = 'rgba(24,24,27,0.35)' }}
                onBlur={e => { if (!error) e.currentTarget.style.borderColor = 'rgba(24,24,27,0.14)' }}
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '12px', color: '#e74c3c', margin: 0 }}
                >
                  Incorrect password. Please try again.
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isDisabled}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isDisabled ? 'rgba(24,24,27,0.08)' : '#18181b',
                  color: isDisabled ? 'rgba(24,24,27,0.28)' : '#ffffff',
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: isDisabled ? 'default' : 'pointer',
                  letterSpacing: '0.03em',
                  transition: 'background 0.2s ease, color 0.2s ease, transform 0.15s ease',
                  marginTop: '2px',
                }}
                onMouseEnter={(e) => { if (!isDisabled) { e.currentTarget.style.background = '#2d2d30'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                onMouseLeave={(e) => { if (!isDisabled) { e.currentTarget.style.background = '#18181b'; e.currentTarget.style.transform = 'translateY(0)' } }}
              >
                {loading ? 'Opening…' : 'View case study →'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
