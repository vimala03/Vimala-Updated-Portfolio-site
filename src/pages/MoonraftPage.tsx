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

      {/* Next Case Study — loops back to first */}
      <Link
        to="/work/cornerstone"
        aria-label="Go to next case study: Cornerstone OnDemand · AI Workflows"
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
      >
        <div style={{ padding: "4rem", background: "var(--bg2, #f4f3f0)", borderTop: "0.5px solid rgba(24,24,27,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", cursor: "pointer" }}>
          <div>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(24,24,27,0.45)", marginBottom: "0.5rem" }}>Next case study →</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", letterSpacing: "-0.02em", color: "#18181b" }}>Cornerstone OnDemand · AI Workflows</div>
          </div>
          <div style={{ fontSize: "1.5rem", color: "rgba(24,24,27,0.45)" }}>→</div>
        </div>
      </Link>

      <Footer />
    </div>
  );
}
