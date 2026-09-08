import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ----------------------------------------------------------------------------
   Reveal — content settles up + fades as it enters the viewport
---------------------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------------------
   CountUp — numbers count up when scrolled into view
---------------------------------------------------------------------------- */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  duration = 1.6,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}
      {val.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ----------------------------------------------------------------------------
   Eyebrow — numbered mono section label
---------------------------------------------------------------------------- */
export function Eyebrow({
  index,
  children,
  dark = false,
}: {
  index: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em]">
      {/* Terracotta index — matches the portfolio-wide eyebrow accent used
         on the Homepage and Cornerstone (restrained accent, not the
         product's own brand green). The `dark` variant is unaffected —
         no section currently renders this against a dark background. */}
      <span className={dark ? "text-brand" : "text-rust"}>{index}</span>
      <span
        className={`h-px w-8 ${dark ? "bg-white/25" : "bg-line"}`}
        aria-hidden
      />
      <span className={dark ? "text-white/60" : "text-mist"}>{children}</span>
    </div>
  );
}

/* ----------------------------------------------------------------------------
   StatusChip — order/payment status pill
---------------------------------------------------------------------------- */
const CHIP: Record<string, string> = {
  green: "bg-brand-050 text-deep border-brand/30",
  teal: "bg-deep/8 text-deep border-deep/15",
  amber: "bg-amber-500/12 text-amber-700 border-amber-500/25",
  rose: "bg-rose-500/10 text-rose-600 border-rose-500/25",
  muted: "bg-paper-100 text-mist border-line",
};

export function StatusChip({
  tone = "muted",
  children,
  dot = true,
  className = "",
}: {
  tone?: keyof typeof CHIP | string;
  children: ReactNode;
  dot?: boolean;
  className?: string;
}) {
  const dotColor: Record<string, string> = {
    green: "bg-brand-600",
    teal: "bg-deep",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    muted: "bg-mist",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-tight ${CHIP[tone] ?? CHIP.muted} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColor[tone] ?? dotColor.muted}`}
        />
      )}
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------------------
   Parallax — subtle vertical drift bound to a scroll progress value
---------------------------------------------------------------------------- */
export function useParallax(
  progress: ReturnType<typeof useMotionValue<number>>,
  distance: number,
) {
  return useTransform(progress, [0, 1], [distance, -distance]);
}

/* ----------------------------------------------------------------------------
   DecisionNote — Insight → Decision → Product response, in three short
   labelled lines. Not a new UI system: same font-mono uppercase label
   treatment as SubLabel/Eyebrow, same border-t + 3-col grid rhythm already
   used by the hero's supporting points, ORDER_CALLOUTS and PROBLEM_POINTS —
   reused here to make the product-thinking behind a section explicit
   (what was wrong → what was decided → what got built) without introducing
   a card, badge, icon or new section of its own. Copy passed in is always
   drawn from what the section around it already states.
---------------------------------------------------------------------------- */
export function DecisionNote({
  insight,
  decision,
  response,
}: {
  insight: string;
  decision: string;
  response: string;
}) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 border-t border-line pt-6 sm:grid-cols-3">
      <div>
        <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-mist">
          Insight
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-mist">{insight}</p>
      </div>
      <div>
        <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-rust">
          Decision
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-deep">{decision}</p>
      </div>
      <div>
        <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-brand-700">
          Product response
        </p>
        <p className="mt-1.5 text-[13px] font-500 leading-relaxed text-ink">{response}</p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
   Cursor / device frame chrome
---------------------------------------------------------------------------- */
export function WindowChrome({
  title,
  dark = false,
}: {
  title: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 border-b px-4 py-3 ${
        dark ? "border-white/10 bg-white/[0.03]" : "border-line bg-paper-100/60"
      }`}
    >
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
      </div>
      <span
        className={`ml-2 font-mono text-[11px] tracking-tight ${
          dark ? "text-white/40" : "text-mist"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

export { motion, useSpring, useTransform, useMotionValue };
