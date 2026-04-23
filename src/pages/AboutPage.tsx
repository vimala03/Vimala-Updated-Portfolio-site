import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlayfulBottom from "../components/PlayfulBottom";

import AboutHero from "../components/about/AboutHero";
import AboutMindset from "../components/about/AboutMindset";
import AboutJourney from "../components/about/AboutJourney";
import AboutSkills from "../components/about/AboutSkills";
import AboutBeliefs from "../components/about/AboutBeliefs";
import AboutGallery from "../components/about/AboutGallery";
import AboutToolkit from "../components/about/AboutToolkit";
import AboutReading from "../components/about/AboutReading";
import AboutTestimonials from "../components/about/AboutTestimonials";

export default function AboutPage() {
  return (
    <div>
      <Navbar />

      <AboutHero />
      <AboutMindset />
      <AboutJourney />
      <AboutSkills />
      <AboutBeliefs />
      <AboutGallery />
      <AboutToolkit />
      <AboutReading />
      <AboutTestimonials />
      <PlayfulBottom />
      <Footer />
    </div>
  );
}
