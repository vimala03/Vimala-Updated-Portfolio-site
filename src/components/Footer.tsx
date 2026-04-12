import Container from './Container'

export default function Footer() {
  return (
    <footer className="border-t border-black/8">
      <Container className="py-6 md:py-7 flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-6">
        <span className="font-instrument text-stone-muted text-[11.5px]">
          © 2026 Vimala Banavath
        </span>
        <div className="flex items-center gap-4 md:gap-6">
          <a href="#work" className="font-instrument text-stone-muted text-[10.9px] tracking-[0.76px] uppercase hover:text-stone-mid transition-colors">
            Work
          </a>
          <a href="#about" className="font-instrument text-stone-muted text-[10.9px] tracking-[0.76px] uppercase hover:text-stone-mid transition-colors">
            About
          </a>
          <a href="#" className="font-instrument text-stone-muted text-[10.9px] tracking-[0.76px] uppercase hover:text-stone-mid transition-colors">
            LinkedIn ↗
          </a>
          <a href="https://medium.com/@yourusername" target="_blank" rel="noreferrer" className="font-instrument text-stone-muted text-[10.9px] tracking-[0.76px] uppercase hover:text-stone-mid transition-colors">
            Medium ↗
          </a>
        </div>
      </Container>
    </footer>
  )
}
