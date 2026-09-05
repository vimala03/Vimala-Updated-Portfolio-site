import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import ConfidentialImageOverlay from '../components/case-study/ConfidentialImageOverlay'
import { MainContentAnchor } from '../components/SkipLink'

// A restored, NDA-restricted case study — dropped from the homepage list
// during an earlier pass along with its old detailed page. Title and
// description here are exactly what the original (pre-redesign) source
// recorded for it (git history, commit "case study NDA settings"); no
// facts are invented. This page intentionally carries none of the old
// page's project detail (decisions, outcomes, tags) — only the same
// request-access notice already used for the site's other confidential
// case study, so nothing sensitive is exposed via a public route.
export default function VetRiderConfidentialPage() {
  return (
    <>
      <Navbar />
      <MainContentAnchor />
      <section style={{ paddingTop: 'var(--space-section-hero)', paddingBottom: 'var(--space-section-large)' }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-8">
            <div className="lg:col-span-7">
              <h1 className="type-heading">Vet &amp; Rider Wellness Platform</h1>
              <p className="type-eyebrow mt-3" style={{ color: 'var(--color-accent)' }}>
                Health tech · Cross-platform
              </p>
            </div>
            <p className="lg:col-span-5 type-body" style={{ color: 'var(--color-text-muted)' }}>
              Built a platform connecting veterinarians and horse riders through data-driven
              insights and remote healthcare, enabling smarter, more accessible care.
            </p>
          </div>

          <div className="mt-12">
            <ConfidentialImageOverlay src="/images/vet-rider.jpeg" title="Vet & Rider Wellness Platform" interactive />
          </div>
        </Container>
      </section>
      <Footer />
    </>
  )
}
