import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import HomePage from "./pages/HomePage";
import FloatingChat from "./components/FloatingChat";
import { useLenis } from "./hooks/useLenis";

const AboutPage       = lazy(() => import("./pages/AboutPage"));
const CornerstonePage = lazy(() => import("./pages/CornerstonePage"));
const MoonraftPage    = lazy(() => import("./pages/MoonraftPage"));
const FlyinPage       = lazy(() => import("./pages/FlyinPage"));
const AptiaPage       = lazy(() => import("./pages/AptiaPage"));
const CivtechPage     = lazy(() => import("./pages/CivtechPage"));
const VetRiderPage    = lazy(() => import("./pages/VetRiderPage"));
const USTPage         = lazy(() => import("./pages/USTPage"));
const YouCleanPage    = lazy(() => import("./pages/YouCleanPage"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  useLenis();

  return (
    <>
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
          <Route path="/work/vet-rider" element={<VetRiderPage />} />
          <Route path="/work/ust" element={<USTPage />} />
          <Route path="/work/youclean" element={<YouCleanPage />} />
        </Routes>
      </Suspense>
      <FloatingChat />
    </>
  );
}

export default App;
