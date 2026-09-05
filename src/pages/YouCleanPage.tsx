import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CaseStudyContent from '../components/youclean-crm/CaseStudyContent'
import { MainContentAnchor } from '../components/SkipLink'

export default function YouCleanPage() {
  return (
    <>
      <Navbar />
      <MainContentAnchor />
      <CaseStudyContent />
      <Footer />
    </>
  )
}
