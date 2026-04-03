import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CaseStudiesSection from "../components/CaseStudiesSection";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CaseStudiesSection />
      <Footer />
    </div>
  );
}