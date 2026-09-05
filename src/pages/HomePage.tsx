import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MainContentAnchor } from "../components/SkipLink";
import Hero from "../components/home/Hero";
import SelectedWork from "../components/home/SelectedWork";
import ExpertiseSection from "../components/home/ExpertiseSection";
import ContactSection from "../components/home/ContactSection";

// AboutPreview (heading, body copy, background, image, "Read more about
// me" CTA) removed from the homepage on request, to keep the page
// focused on Hero → Selected Work → How I Work → Contact for recruiters.
// The component file itself is untouched and unused, not deleted — easy
// to restore. The actual /about page and its content are unaffected;
// it's a completely separate set of components, still reachable via
// the nav.
export default function HomePage() {
  return (
    <div>
      <Navbar />
      <MainContentAnchor />
      <Hero />
      <SelectedWork />
      <ExpertiseSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
