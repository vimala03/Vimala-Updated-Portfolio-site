import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BuildzarPage from "./pages/BuildzarPage";
import CornerstonePage from "./pages/CornerstonePage";
import MoonraftPage from "./pages/MoonraftPage";
import FloatingChat from "./components/FloatingChat";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work/buildzar" element={<BuildzarPage />} />
        <Route path="/work/cornerstone" element={<CornerstonePage />} />
        <Route path="/work/moonraft" element={<MoonraftPage />} />
      </Routes>
      <FloatingChat />
    </>
  );
}

export default App;
