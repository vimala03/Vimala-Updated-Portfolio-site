import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlayfulBottom from "../components/PlayfulBottom";

import AboutHero from "../components/about/AboutHero";
import AboutMindset from "../components/about/AboutMindset";
import AboutJourney from "../components/about/AboutJourney";
import AboutSkills from "../components/about/AboutSkills";
import AboutBeliefs from "../components/about/AboutBeliefs";
import AboutGallery from "../components/about/AboutGallery";
import AboutReading from "../components/about/AboutReading";
import AboutTestimonials from "../components/about/AboutTestimonials";
import AboutToolkit from "../components/about/AboutToolkit";

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
      <AboutReading />
      <AboutTestimonials />
      <AboutToolkit />
      <PlayfulBottom />
      <Footer />
    </div>
  );
}
