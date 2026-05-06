import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CornerstonePage from "./pages/CornerstonePage";
import MoonraftPage from "./pages/MoonraftPage";
import FlyinPage from "./pages/FlyinPage";
import AptiaPage from "./pages/AptiaPage";
import CivtechPage from "./pages/CivtechPage";
import VetRiderPage from "./pages/VetRiderPage";
import USTPage from "./pages/USTPage";
import FloatingChat from "./components/FloatingChat";
import { useLenis } from "./hooks/useLenis";

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
      </Routes>
      <FloatingChat />
    </>
  );
}

export default App;
