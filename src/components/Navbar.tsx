import { NavLink, Link } from "react-router-dom";

function VBLogo() {
  return (
    <Link
      to="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 18px",
        borderRadius: "999px",
        background: "#d6e3ff",
      }}
    >
      <span style={{ fontFamily: "cursive", fontSize: "18px" }}>VB</span>
      <span className="role">Designer</span>
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
        background: "rgba(255,255,255,0.6)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 24px",
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
