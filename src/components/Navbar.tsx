import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
    <Link
      to="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 18px",
        borderRadius: "999px",
        background: "rgba(255,255,255,0.85)",
        textDecoration: "none",
      }}
    >
      <span style={{ fontFamily: "cursive", fontSize: "18px", flexShrink: 0 }}>VB</span>
      <span
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(6px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          whiteSpace: "nowrap",
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: "14px",
          color: "#18181b",
        }}
      >
        {ROLES[index]}
      </span>
    </Link>
  );
}

export default function Navbar() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.85)",
      }}
    >
      <div
        className="max-w-[1280px] mx-auto px-6 w-full"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "14px",
          paddingBottom: "14px",
        }}
      >
        <VBLogo />

        <div className="flex" style={{ gap: '32px', alignItems: 'center' }}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-active" : ""}`
            }
          >
            Work
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-active" : ""}`
            }
          >
            About
          </NavLink>

          <a href="/resume.pdf" className="nav-link">
            Resume
          </a>

          <a href="#contact" className="nav-link">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
