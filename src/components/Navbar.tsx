import { NavLink, Link } from "react-router-dom";

/* ── VB monogram mark ── */
function VBLogo() {
  return (
    <Link to="/" aria-label="Vimala Banavath — Home">
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="19" cy="19" r="18.5" stroke="#18181b" strokeWidth="1" />
        {/* V stroke */}
        <path
          d="M10 12 L19 26 L28 12"
          stroke="#18181b"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </Link>
  );
}

export default function Navbar() {
  const linkStyle =
    "text-sm text-gray-600 hover:text-black transition-colors";

  const activeStyle = "font-semibold text-black";

  return (
    <nav className="w-full flex items-center justify-between px-8 py-6 border-b border-gray-200">
      {/* Logo */}
      <VBLogo />

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          Work
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          About
        </NavLink>

        {/* Resume (external) */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={linkStyle}
        >
          Resume ↗
        </a>

        <a href="#contact" className={linkStyle}>
          Contact
        </a>
      </div>
    </nav>
  );
}
