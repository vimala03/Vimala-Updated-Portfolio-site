import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MainContentAnchor } from "../components/SkipLink";
import Hero from "../components/home/Hero";
import SelectedWork from "../components/home/SelectedWork";
import ExpertiseSection from "../components/home/ExpertiseSection";
import ContactSection from "../components/home/ContactSection";

// AboutPreview (heading, body copy, background, image, "Read more about
// me" CTA) removed from the homepage on request, to keep the page
// focused on Hero → Selected Work → How I Think → Contact for recruiters.
// RangeSection ("Designing across complexity") — added in an earlier
// positioning pass, then explicitly removed in a later one ("REMOVE the
// current 'DESIGNING ACROSS COMPLEXITY'... do NOT replace it with
// another large section — the five projects already demonstrate
// Vimala's range") — is unmounted the same way: file left on disk,
// unused, not deleted, easy to restore. Both component files themselves
// are untouched; the actual /about page and its content are unaffected
// — completely separate components, still reachable via the nav.
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
