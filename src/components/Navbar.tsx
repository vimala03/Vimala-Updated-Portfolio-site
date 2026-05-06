import { NavLink, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ROLES = ["Designer", "Entrepreneur", "Mentor"];

function VBLogo() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % ROLES.length);
        setVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }} style={{ display: 'inline-flex' }}>
    <Link
      to="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 16px",
        borderRadius: "999px",
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(17,17,16,0.06)",
        textDecoration: "none",
      }}
    >
      <span style={{
        fontFamily: "cursive",
        fontSize: "17px",
        flexShrink: 0,
        color: "#111110",
        background: "linear-gradient(135deg, #f5d0c5 0%, #f0b49a 100%)",
        padding: "3px 8px",
        borderRadius: "8px",
        fontWeight: 600,
      }}>VB</span>
      <span
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(5px)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
          whiteSpace: "nowrap",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "12px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#5a5954",
        }}
      >
        {ROLES[index]}
      </span>
    </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [hidden, setHidden]         = useState(false);

  const lastY    = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const VELOCITY_THRESHOLD = 0.3;   // px/ms — ignore slow drift
    const HIDE_THRESHOLD     = 120;   // px from top before hide kicks in

    function onScroll() {
      const y    = window.scrollY;
      const now  = Date.now();
      const dt   = now - lastTime.current;
      if (dt === 0) return;

      const velocity = (y - lastY.current) / dt;  // px/ms, signed

      setScrolled(y > 40);

      if (y > HIDE_THRESHOLD) {
        if (velocity > VELOCITY_THRESHOLD) {
          // Scrolling down fast → hide
          setHidden(true);
        } else if (velocity < -VELOCITY_THRESHOLD) {
          // Scrolling up fast → show
          setHidden(false);
        }
      } else {
        // Near top → always show
        setHidden(false);
      }

      lastY.current    = y;
      lastTime.current = now;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on nav hide
  useEffect(() => {
    if (hidden) setMobileOpen(false);
  }, [hidden]);

  return (
    <div
      style={{
        position:    "fixed",
        top:         0,
        left:        0,
        width:       "100%",
        zIndex:      1000,
        transform:   hidden ? "translateY(-100%)" : "translateY(0)",
        transition:  hidden
          ? "transform 0.25s cubic-bezier(0.64, 0, 0.78, 0)"   // fast disappear (ease-in)
          : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",    // gentle reappear (ease-out)
        backdropFilter: scrolled ? "blur(12px)" : "none",
        background:     scrolled
          ? "rgba(250,250,249,0.9)"
          : "transparent",
        borderBottom: scrolled ? "1px solid rgba(17,17,16,0.06)" : "none",
        willChange:   "transform",
      }}
    >
      <div
        className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full"
        style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          height:         scrolled ? "56px" : "72px",
          transition:     "height 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <VBLogo />

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: "32px", alignItems: "center" }}>
          <NavLink to="/"      className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}>Work</NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}>About</NavLink>
          <a href="/resume.pdf" className="nav-link">Resume</a>
          <a
            href="#contact"
            className="btn-sweep btn-sweep-primary"
            style={{ padding: "9px 20px", fontSize: "11px" }}
          >
            Contact
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2"
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span
            className="block w-5 h-[1.5px] bg-[#18181b] origin-center"
            style={{
              transition: "transform 0.22s ease",
              transform: mobileOpen ? "translateY(6.5px) rotate(45deg)" : undefined,
            }}
          />
          <span
            className="block w-5 h-[1.5px] bg-[#18181b]"
            style={{ transition: "opacity 0.22s ease", opacity: mobileOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-[1.5px] bg-[#18181b] origin-center"
            style={{
              transition: "transform 0.22s ease",
              transform: mobileOpen ? "translateY(-6.5px) rotate(-45deg)" : undefined,
            }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight:  mobileOpen ? "300px" : "0",
          opacity:    mobileOpen ? 1 : 0,
          transition: "max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease",
          background: "rgba(250,250,249,0.97)",
          borderTop:  "1px solid rgba(17,17,16,0.06)",
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          <NavLink to="/"      onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}>Work</NavLink>
          <NavLink to="/about" onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}>About</NavLink>
          <a href="/resume.pdf"  onClick={() => setMobileOpen(false)} className="nav-link">Resume</a>
          <a href="#contact"     onClick={() => setMobileOpen(false)} className="nav-link">Contact</a>
        </div>
      </div>
    </div>
  );
}
