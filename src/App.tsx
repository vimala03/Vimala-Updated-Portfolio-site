import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import MarqueeBar from './components/MarqueeBar'
import CaseStudiesSection from './components/CaseStudiesSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeBar />
        <CaseStudiesSection />
      </main>
      <Footer />
    </div>
  )
}
