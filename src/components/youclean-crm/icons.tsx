/* Minimal stroked icon set — inline SVG, currentColor, no dependency. */
type P = { className?: string; size?: number };
const base = (size = 16) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const IconGrid = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
export const IconUsers = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
    <path d="M16 3.5a3 3 0 0 1 0 5.8M18 20c0-2.4-1.2-4.2-3-4.8" />
  </svg>
);
export const IconBag = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
export const IconRupee = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M7 5h10M7 9h10M15 5c0 4-3 5-6 5l6 8" />
  </svg>
);
export const IconTruck = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="2" y="7" width="12" height="9" rx="1" />
    <path d="M14 10h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
);
export const IconBell = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);
export const IconChart = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 20V4M4 20h16" />
    <path d="M8 16l3-4 3 2 4-6" />
  </svg>
);
export const IconSearch = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
export const IconArrow = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconCheck = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m5 12 5 5L20 6" />
  </svg>
);
export const IconSheet = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="4" y="3" width="16" height="18" rx="1.5" />
    <path d="M4 9h16M4 15h16M10 3v18" />
  </svg>
);
export const IconChat = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 5h16v11H9l-5 4V5Z" />
  </svg>
);
export const IconSpark = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </svg>
);
export const IconClock = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </svg>
);
