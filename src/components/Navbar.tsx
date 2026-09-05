import { NavLink, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// The rotating role label from the original wordmark (see git history:
// commit 77001b8, "VBLogo") — same words, same 2200ms/300ms cross-fade
// timing and hover scale, restored per explicit request. Only the
// container styling changed: the original wore a pill/gradient chip,
// which the plain-text wordmark direction (Phase 1/2 of this redesign)
// deliberately dropped — "no chip/pill/glass treatment" is a standing
// decision from that pass, and this round separately asks for the
// opposite of decorative chrome, so the animation is restored onto the
// existing plain-text lockup rather than reintroducing the badge shell.
const ROLES = ["Product Designer", "Entrepreneur", "Builder"];

function RotatingRole() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ROLES.length);
        setVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        marginLeft: "10px",
        paddingLeft: "10px",
        borderLeft: "1px solid var(--color-border)",
        opacity: reduceMotion ? 1 : visible ? 1 : 0,
        transform: reduceMotion ? undefined : visible ? "translateY(0px)" : "translateY(4px)",
        transition: "opacity 0.22s ease, transform 0.22s ease",
        whiteSpace: "nowrap",
        fontFamily: "var(--font-body)",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--color-text-faint)",
      }}
    >
      {ROLES[index]}
    </span>
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
        // Flat, solid background once scrolled — no blur/glass. Fully
        // transparent at the top so it reads as part of the page, not
        // a floating panel.
        background: scrolled ? "var(--color-bg)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
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
          transition:     "height 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Wordmark — plain text, no chip/pill/glass treatment — with the
            original rotating-role animation restored alongside it (see
            RotatingRole above). whileHover on the wrapper reproduces the
            original's scale-on-hover on the whole lockup. */}
        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }} style={{ display: "inline-flex" }}>
          <Link
            to="/"
            style={{
              display:       "inline-flex",
              alignItems:    "baseline",
              fontFamily:    "var(--font-body)",
              fontSize:      "13px",
              fontWeight:    600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color:         "var(--color-text)",
              textDecoration: "none",
            }}
          >
            Vimala Banavath
            <RotatingRole />
          </Link>
        </motion.div>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: "32px", alignItems: "center" }}>
          <NavLink to="/"      className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}>Work</NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}>About</NavLink>
          <a href="/resume.pdf" className="nav-link">Résumé</a>
          {/* Plain anchor, same as Résumé — Navbar is global, and this is
              the homepage's #contact section (ContactSection.tsx), not a
              route. "/#contact" works from any page (a real navigation
              to "/" that lands on the anchor) and, on the homepage
              itself, behaves as a same-document hash jump with no
              reload — same pattern already used for Résumé's PDF link,
              no new cross-page-scroll logic needed. */}
          <a href="/#contact" className="nav-link">Contact</a>
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
          background: "var(--color-bg)",
          borderTop:  "1px solid var(--color-border)",
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          <NavLink to="/"      onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}>Work</NavLink>
          <NavLink to="/about" onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-link ${isActive ? "nav-active" : ""}`}>About</NavLink>
          <a href="/resume.pdf" onClick={() => setMobileOpen(false)} className="nav-link">Résumé</a>
          <a href="/#contact" onClick={() => setMobileOpen(false)} className="nav-link">Contact</a>
        </div>
      </div>
    </div>
  );
}
