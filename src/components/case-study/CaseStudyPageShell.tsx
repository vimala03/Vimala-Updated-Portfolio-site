import { ReactNode } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import NextProjectCTA from './NextProjectCTA'
import { MAIN_CONTENT_ID } from '../SkipLink'

interface NextProjectProps {
  label: string
  title: string
  href: string
  bgColor?: string
  textColor?: string
}

interface CaseStudyPageShellProps {
  children: ReactNode
  /** e.g. <ProgressBar color="..." /> or a section-jump <ProgressNavigation />.
   *  Omit for a case study that doesn't want one — the shell doesn't assume. */
  progressNav?: ReactNode
  /** Omit to skip the "next case study" strip entirely. */
  nextProject?: NextProjectProps
  /** Applied to the wrapping <div> — e.g. a `theme-*` class from index.css
   *  so the case study's own --cs-accent/--cs-bg/--cs-card-bg take effect,
   *  or a background style string already used by the existing pages. */
  className?: string
  /** Applied to the <main> landmark itself, not the outer wrapper. */
  mainClassName?: string
}

/**
 * Shared shell for case-study pages: Navbar → optional progress nav →
 * <main> (the skip-link target) → optional NextProjectCTA → Footer.
 *
 * Deliberately thin — it only owns the parts every case study already
 * repeats verbatim (Navbar/Footer, the skip-link landing spot). Section
 * composition, copy, and layout inside `children` stay entirely up to
 * each page, per the brief: "only the global shell should be shared."
 *
 * Not yet wired into the existing 10 pages — those keep their current,
 * working Navbar/Footer composition. New and rebuilt case studies
 * (starting with Cornerstone in Phase 3) render into this instead.
 */
export default function CaseStudyPageShell({
  children,
  progressNav,
  nextProject,
  className = '',
  mainClassName = '',
}: CaseStudyPageShellProps) {
  return (
    <div className={className}>
      <Navbar />
      {progressNav}
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className={mainClassName} style={{ outline: 'none' }}>
        {children}
      </main>
      {nextProject && <NextProjectCTA {...nextProject} />}
      <Footer />
    </div>
  )
}
