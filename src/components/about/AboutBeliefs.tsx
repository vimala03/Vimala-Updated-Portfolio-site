import { useState } from "react";
import { motion } from "framer-motion";
const beliefs = [
  {
    num: "01",
    tag: "Clarity",
    heading: "Design for clarity in complex systems.",
    body: "Complexity is the starting point, never the excuse. The harder the system, the more important it is to distill it into something a human can act on confidently. Clarity isn't simplification — it's the hardest kind of design work.",
  },
  {
    num: "02",
    tag: "Intelligence",
    heading: "Balance human intuition with AI-driven workflows.",
    body: "AI augments but does not replace design judgment. The best outcomes happen when machine speed meets human empathy and context. Knowing when to trust the model — and when to override it — is itself a design skill.",
  },
  {
    num: "03",
    tag: "Alignment",
    heading: "Connect user experience with business outcomes.",
    body: "Design that doesn't move a needle isn't design — it's decoration. Every interface decision sits inside a business context. Understanding that context is what separates good designers from great ones.",
  },
  {
    num: "04",
    tag: "Systems",
    heading: "Build scalable, decision-driven systems.",
    body: "The best products aren't built around moments — they're built around systems that hold up as the product, team, and user base grow. Does this scale? Is it consistent? Does it reduce future cognitive load?",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function DiamondIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 2V10M2 6H10"
        stroke="#D97706"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AboutBeliefs() {
  const [activeCol, setActiveCol] = useState<number | null>(0);

  const handleClick = (i: number) => {
    setActiveCol((prev) => (prev === i ? null : i));
  };

  return (
    <section
      style={{
        background: "#18181b",
        paddingTop: "80px",
        paddingBottom: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot pattern overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 60px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ padding: "0 91px" }}>

          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "64px" }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "11px",
                color: "rgba(255,255,255,0.22)",
                letterSpacing: "1.98px",
                textTransform: "uppercase",
              }}
            >
              PRINCIPLES
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: "45.72px",
                color: "#ffffff",
                lineHeight: 1.08,
                letterSpacing: "-0.46px",
              }}
            >
              What I{" "}
              <em style={{ fontStyle: "italic", color: "#797979" }}>believe.</em>
            </h2>
          </motion.div>

          {/* Full-width accordion panel */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                border: "1px solid rgba(217,119,6,0.2)",
                borderRadius: "14px",
                overflow: "hidden",
                height: "477px",
                background: "#111111",
              }}
            >
              {beliefs.map((belief, i) => {
                const isActive = activeCol === i;
                const anyActive = activeCol !== null;

                /*
                 * Direction-aware transition timings:
                 *
                 * OPENING (isActive = true):
                 *   – Collapsed layer fades OUT fast (0.15s, no delay) → clears immediately
                 *   – Expanded content fades IN late (0.28s, delay 0.38s) → only after column is wide
                 *
                 * CLOSING (isActive = false):
                 *   – Expanded content fades OUT fast (0.15s, no delay) → disappears before shrink
                 *   – Collapsed layer fades IN after content gone (0.2s, delay 0.18s)
                 */
                const collapsedLayerTransition = isActive
                  ? "opacity 0.15s ease 0s"                   // hide fast on open
                  : "opacity 0.22s ease 0.18s";               // appear after content gone

                const expandedContentTransition = isActive
                  ? "opacity 0.28s ease 0.38s"                // appear after column expanded
                  : "opacity 0.14s ease 0s";                  // hide immediately on close

                return (
                  <div
                    key={belief.num}
                    onClick={() => handleClick(i)}
                    style={{
                      flex: anyActive
                        ? isActive ? "4 1 0%" : "0.55 1 0%"
                        : "1 1 0%",
                      borderRight:
                        i < beliefs.length - 1
                          ? "1px solid rgba(255,255,255,0.06)"
                          : "none",
                      position: "relative",
                      cursor: "pointer",
                      overflow: "hidden",
                      // Single transition string — no layout-affecting props mixed in
                      transition: "flex 0.55s cubic-bezier(0.22, 1, 0.36, 1), background 0.35s ease",
                      background: isActive ? "rgba(217,119,6,0.035)" : "transparent",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Per-column texture */}
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                          i % 2 === 0
                            ? "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)"
                            : "repeating-linear-gradient(45deg, rgba(255,255,255,1) 0, rgba(255,255,255,1) 1px, transparent 0, transparent 50%)",
                        backgroundSize: i % 2 === 0 ? "16px 16px" : "10px 10px",
                        opacity: 0.03,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Amber glow — pure opacity, no layout effect */}
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "radial-gradient(ellipse 70% 50% at 20% 0%, rgba(217,119,6,0.09) 0%, transparent 70%)",
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 0.4s ease",
                        pointerEvents: "none",
                      }}
                    />

                    {/* ── EXPANDED CONTENT (opacity-only, no transforms) ─────── */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        opacity: isActive ? 1 : 0,
                        transition: expandedContentTransition,
                        pointerEvents: isActive ? "auto" : "none",
                        // Content is fixed-width inside the column; clipped by parent overflow:hidden
                        // No transforms — avoids compound-motion jerk
                      }}
                    >
                      {/* Header row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "22px 28px",
                          // Always 1px solid — only color transitions, no layout shift
                          borderBottom: "1px solid rgba(217,119,6,0.12)",
                          flexShrink: 0,
                          whiteSpace: "nowrap",
                          minWidth: 0,
                          overflow: "hidden",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0 }}>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 600,
                              fontSize: "10px",
                              color: "rgba(255,255,255,0.22)",
                              letterSpacing: "0.7px",
                              textTransform: "uppercase",
                              flexShrink: 0,
                            }}
                          >
                            {belief.num}
                          </span>
                          <span
                            style={{
                              background: "rgba(217,119,6,0.1)",
                              border: "1px solid rgba(217,119,6,0.3)",
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 600,
                              fontSize: "10px",
                              color: "#d97706",
                              letterSpacing: "0.7px",
                              textTransform: "uppercase",
                              padding: "4px 12px",
                              borderRadius: "999px",
                              flexShrink: 0,
                            }}
                          >
                            {belief.tag}
                          </span>
                        </div>

                        <div
                          style={{
                            background: "rgba(217,119,6,0.12)",
                            border: "1px solid rgba(217,119,6,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "10px",
                            width: "28px",
                            height: "28px",
                            flexShrink: 0,
                          }}
                        >
                          <DiamondIcon />
                        </div>
                      </div>

                      {/* Body */}
                      <div
                        style={{
                          flex: 1,
                          padding: "32px 28px 28px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minWidth: 0,
                          overflow: "hidden",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 600,
                              fontSize: "19px",
                              color: "#ffffff",
                              lineHeight: 1.38,
                              letterSpacing: "-0.34px",
                              marginBottom: "16px",
                            }}
                          >
                            {belief.heading}
                          </h3>
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 400,
                              fontSize: "15px",
                              color: "rgba(255,255,255,0.48)",
                              lineHeight: 1.78,
                              letterSpacing: "-0.075px",
                            }}
                          >
                            {belief.body}
                          </p>
                        </div>

                        {/* Bottom tag */}
                        <div style={{ marginTop: "20px" }}>
                          <span
                            style={{
                              background: "rgba(217,119,6,0.1)",
                              border: "1px solid rgba(217,119,6,0.3)",
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 600,
                              fontSize: "10px",
                              color: "#d97706",
                              letterSpacing: "0.7px",
                              textTransform: "uppercase",
                              padding: "4px 12px",
                              borderRadius: "999px",
                            }}
                          >
                            {belief.tag}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ── COLLAPSED STATE (opacity-only, no transforms) ─────── */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "18px 0",
                        opacity: isActive ? 0 : anyActive ? 0.55 : 1,
                        transition: collapsedLayerTransition,
                        pointerEvents: isActive ? "none" : "auto",
                      }}
                    >
                      {/* Vertical tag label */}
                      <div
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "9px",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.28)",
                          paddingTop: "12px",
                          userSelect: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {belief.tag}
                      </div>

                      {/* Number circle */}
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          border: "1px solid rgba(255,255,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "12px",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "9px",
                            fontWeight: 700,
                            color: "rgba(255,255,255,0.2)",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {belief.num}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Hint */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.08em",
                marginTop: "12px",
                textAlign: "center",
                userSelect: "none",
              }}
            >
              click to explore
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
