/**
 * Skip-to-content link + its landing target.
 *
 * `SkipLink` renders once, globally (see App.tsx) — visually hidden until
 * it receives keyboard focus (first Tab press on any page), then slides
 * into view. `MainContentAnchor` is a zero-footprint focus target dropped
 * right after <Navbar/> on every page that hasn't migrated to
 * `CaseStudyPageShell` yet (the shell sets the same id directly on its
 * <main>, so pages using it don't need this).
 *
 * One shared id constant keeps the href and the target in sync.
 */
export const MAIN_CONTENT_ID = 'main-content'

export function SkipLink() {
  return (
    <a href={`#${MAIN_CONTENT_ID}`} className="skip-link">
      Skip to content
    </a>
  )
}

export function MainContentAnchor() {
  return <div id={MAIN_CONTENT_ID} tabIndex={-1} style={{ outline: 'none' }} />
}
