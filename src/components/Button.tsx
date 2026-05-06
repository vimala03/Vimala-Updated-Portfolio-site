import { AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'outline'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  as?: 'a' | 'button'
}

/**
 * Anchor-based button with fill-sweep hover interaction.
 * Uses pure CSS (btn-sweep classes from index.css) — no JS overhead.
 */
export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base    = 'btn-sweep'
  const variant_ = variant === 'primary' ? 'btn-sweep-primary' : 'btn-sweep-outline'

  return (
    <a className={`${base} ${variant_} ${className}`} {...props}>
      {children}
    </a>
  )
}
