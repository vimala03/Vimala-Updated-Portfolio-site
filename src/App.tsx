import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import HomePage from "./pages/HomePage";
import FloatingChat from "./components/FloatingChat";
import { SkipLink } from "./components/SkipLink";
import { useLenis, getLenis } from "./hooks/useLenis";

// Client-side route changes don't reload the document, so the browser's
// own "auto" scroll restoration can still try to snap back to whatever
// scrollY it last recorded for a history entry on back/forward — fighting
// the explicit reset below and reintroducing the "lands mid-page" bug via
// a different path. Opting out once, up front, makes ScrollToTop the only
// thing that ever moves the scroll position on navigation, in every
// direction (forward, back, and forward-again). Guarded for browsers
// without the API (older Safari).
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const AboutPage       = lazy(() => import("./pages/AboutPage"));
const CornerstonePage = lazy(() => import("./pages/CornerstonePage"));
const MoonraftPage    = lazy(() => import("./pages/MoonraftPage"));
const FlyinPage       = lazy(() => import("./pages/FlyinPage"));
const AptiaPage       = lazy(() => import("./pages/AptiaPage"));
const CivtechPage     = lazy(() => import("./pages/CivtechPage"));
const USTPage         = lazy(() => import("./pages/USTPage"));
const YouCleanPage    = lazy(() => import("./pages/YouCleanPage"));
const ContentManagerMetadataPage = lazy(() => import("./pages/ContentManagerMetadataPage"));
const VetRiderConfidentialPage = lazy(() => import("./pages/VetRiderConfidentialPage"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Two things fight a naive `window.scrollTo(0, 0)` reset here:
    //
    // 1. The site runs on Lenis (a JS-driven smooth-scroll layer on
    //    <html>) whenever the user hasn't asked for reduced motion — see
    //    useLenis.ts. Lenis continuously re-syncs the real scroll position
    //    against its own internal target/animated-scroll state every
    //    frame, so a plain native scrollTo() call races it and gets
    //    silently overwritten on whichever frames land after it — the
    //    exact "sometimes lands mid-page" symptom. Resetting through
    //    Lenis's own scrollTo() instead keeps its internal state in sync
    //    rather than fighting it (the same pattern already used for
    //    in-page scrolling in youclean-crm/sections.tsx); `immediate: true`
    //    skips its eased animation so the new page is already at the top
    //    rather than visibly animating up to it, and `force: true` makes
    //    sure the reset always applies even if Lenis is transiently
    //    stopped/locked (e.g. by a future modal) at the moment of
    //    navigation.
    //
    // 2. `html` also has `scroll-behavior: smooth` globally (index.css).
    //    That only matters for the native fallback below (used only under
    //    prefers-reduced-motion, when Lenis is never instantiated): the
    //    two-argument `window.scrollTo(0, 0)` form has no `behavior`
    //    option, so it defaults to "auto" and *honours* that CSS property,
    //    turning an intended instant reset into a slow animated scroll.
    //    The explicit options-object form with `behavior: "instant"`
    //    overrides CSS scroll-behavior for that call and jumps immediately.
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);
  return null;
}

function App() {
  useLenis();

  return (
    <>
      <SkipLink />
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work/cornerstone" element={<CornerstonePage />} />
          <Route path="/work/moonraft" element={<MoonraftPage />} />
          <Route path="/work/flyin" element={<FlyinPage />} />
          <Route path="/work/aptia" element={<AptiaPage />} />
          <Route path="/work/civtech" element={<CivtechPage />} />
          <Route path="/work/ust" element={<USTPage />} />
          <Route path="/work/youclean" element={<YouCleanPage />} />
          <Route path="/work/content-manager-metadata" element={<ContentManagerMetadataPage />} />
          <Route path="/work/vet-rider" element={<VetRiderConfidentialPage />} />
        </Routes>
      </Suspense>
      <FloatingChat />
    </>
  );
}

export default App;
