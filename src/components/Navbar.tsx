import { useState } from 'react'
import Container from './Container'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinkClass =
    'font-instrument text-stone-mid text-[14.5px] tracking-[1px] uppercase hover:text-stone-ink transition-colors'

  return (
    <header className="bg-[#faf8f5] border-b border-black/5 sticky top-0 z-50">
      <Container className="py-5 md:py-6 flex items-center justify-between">
        <span className="font-instrument font-medium text-stone-ink text-[13px] md:text-[14.5px] tracking-[1.16px] uppercase">
          Vimala Banavath
        </span>

        {/* Desktop / tablet nav */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          <li>
            <a href="#work" className={navLinkClass}>Work</a>
          </li>
          <li>
            <a href="#about" className={navLinkClass}>About</a>
          </li>
          <li>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="font-instrument text-stone-mid text-[14.5px] tracking-[0.87px] uppercase hover:text-stone-ink transition-colors">
              Resume ↗
            </a>
          </li>
          <li>
            <a href="#contact" className={navLinkClass}>Contact</a>
          </li>
        </ul>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[1.5px] bg-stone-ink origin-center transition-all duration-200 ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-stone-ink transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-stone-ink origin-center transition-all duration-200 ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </Container>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden border-t border-black/5 bg-[#faf8f5]">
          <Container className="py-5 flex flex-col gap-5">
            {([
              { href: '#work', label: 'Work' },
              { href: '#about', label: 'About' },
              { href: '/resume.pdf', label: 'Resume ↗', target: '_blank', rel: 'noopener noreferrer' },
              { href: '#contact', label: 'Contact' },
            ] as { href: string; label: string; target?: string; rel?: string }[]).map(({ href, label, target, rel }) => (
              <a
                key={label}
                href={href}
                target={target}
                rel={rel}
                onClick={() => setOpen(false)}
                className="font-instrument text-stone-mid text-[14px] tracking-[1px] uppercase hover:text-stone-ink transition-colors"
              >
                {label}
              </a>
            ))}
          </Container>
        </div>
      )}
    </header>
  )
}
