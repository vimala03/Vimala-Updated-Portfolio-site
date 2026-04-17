import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MoonraftPage() {
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", padding: "120px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 500, color: "#18181b" }}>
          Moonraft – UST Global
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "rgba(24,24,27,0.5)" }}>
          Case study coming soon.
        </p>
        <Link to="/" style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#18181b", textDecoration: "underline", textUnderlineOffset: "4px" }}>
          ← Back to work
        </Link>
      </div>
      <Footer />
    </div>
  );
}
