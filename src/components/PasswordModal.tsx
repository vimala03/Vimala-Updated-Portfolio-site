import { useState, useEffect, useRef } from 'react'

interface PasswordModalProps {
  project: 'buildzar' | 'moonraft'
  onClose: () => void
}

const config: Record<string, { label: string; password: string; figmaUrl: string }> = {
  buildzar: {
    label: 'Buildzar',
    password: 'buildzar123',
    figmaUrl: 'https://www.figma.com/proto/buildzar-placeholder',
  },
  moonraft: {
    label: 'Moonraft – UST Global',
    password: 'moonraft123',
    figmaUrl: 'https://www.figma.com/proto/moonraft-placeholder',
  },
}

export default function PasswordModal({ project, onClose }: PasswordModalProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { label, password, figmaUrl } = config[project]

  useEffect(() => {
    inputRef.current?.focus()
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value === password) {
      window.open(figmaUrl, '_blank')
      onClose()
    } else {
      setError(true)
      setValue('')
      inputRef.current?.focus()
    }
  }

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          margin: '0 24px',
          position: 'relative',
          boxShadow: '0 24px 64px rgba(0,0,0,0.14)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(24,24,27,0.4)',
            fontSize: '20px',
            lineHeight: 1,
            padding: 0,
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Heading */}
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgba(24,24,27,0.35)', letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: '10px' }}>
          Protected
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 500, color: '#18181b', margin: '0 0 6px' }}>
          {label}
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(24,24,27,0.45)', margin: '0 0 28px', lineHeight: 1.5 }}>
          Enter the password to view this case study.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false) }}
            placeholder="Password"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '8px',
              border: error ? '1px solid #e74c3c' : '1px solid rgba(24,24,27,0.15)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#18181b',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s ease',
            }}
          />
          {error && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#e74c3c', margin: 0 }}>
              Incorrect password. Please try again.
            </p>
          )}
          <button
            type="submit"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#18181b',
              color: '#ffffff',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#2d2d30' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#18181b' }}
          >
            View case study →
          </button>
        </form>
      </div>
    </div>
  )
}
