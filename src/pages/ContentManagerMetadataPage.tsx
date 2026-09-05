import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'
import ConfidentialNotice from '../components/case-study/ConfidentialNotice'
import { MainContentAnchor } from '../components/SkipLink'

// A genuinely separate, NDA-restricted case study (distinct from the
// Cornerstone case study) — title, date range and summary are exactly
// what was provided as factual; no interface screenshots are shown
// since the underlying work is under NDA. See ConfidentialNotice.tsx.
export default function ContentManagerMetadataPage() {
  return (
    <>
      <Navbar />
      <MainContentAnchor />
      <section style={{ paddingTop: 'var(--space-section-hero)', paddingBottom: 'var(--space-section-large)' }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-8">
            <div className="lg:col-span-7">
              <h1 className="type-heading">Content Manager Metadata Generation, Translation</h1>
              <p className="type-eyebrow mt-3" style={{ color: 'var(--color-accent)' }}>
                July 2024 – Sept 2025
              </p>
            </div>
            <p className="lg:col-span-5 type-body" style={{ color: 'var(--color-text-muted)' }}>
              Improved search accuracy and content discoverability by introducing AI-powered
              metadata generation, strengthening taxonomy and information architecture across
              the platform.
            </p>
          </div>

          <div className="mt-12">
            <ConfidentialNotice title="Content Manager Metadata Generation, Translation" interactive />
          </div>
        </Container>
      </section>
      <Footer />
    </>
  )
}
