import { useEffect, useRef, useState } from "react";
import { getLenis } from "../../hooks/useLenis";
import {
  motion,
  Reveal,
  Eyebrow,
  StatusChip,
  WindowChrome,
  useTransform,
} from "./primitives";
import {
  useScroll,
  useInView,
  useReducedMotion,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  IconUsers,
  IconSheet,
  IconBag,
  IconRupee,
  IconChat,
  IconTruck,
  IconClock,
  IconArrow,
  IconCheck,
  IconBell,
  IconSearch,
} from "./icons";

/* ============================================================================
   Section shell
============================================================================ */
export function Section({
  id,
  dark = false,
  className = "",
  children,
}: {
  id?: string;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative px-6 py-14 md:px-10 md:py-20 ${
        dark ? "bg-deep text-white" : "bg-paper text-ink"
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
}

/* ============================================================================
   01 — THE PROBLEM · fragmented ecosystem
============================================================================ */
/* fragments scattered around a hollow centre — each drifts outward on view */
const FRAGMENTS = [
  { icon: IconUsers, label: "Customer", note: "Names in phones & memory", x: "4%", y: "6%", drift: [-14, -10] },
  { icon: IconChat, label: "WhatsApp", note: "Buried in chat threads", x: "56%", y: "0%", drift: [12, -14] },
  { icon: IconSheet, label: "Google Sheets", note: "Three versions, one truth?", x: "72%", y: "34%", drift: [18, 4], flag: "duplicate" },
  { icon: IconBag, label: "Orders", note: "Handwritten pickup slips", x: "2%", y: "44%", drift: [-16, 6] },
  { icon: IconRupee, label: "Payments", note: "Who paid? Who owes?", x: "60%", y: "66%", drift: [10, 16], flag: "mismatch" },
  { icon: IconTruck, label: "Delivery", note: "Verbal route planning", x: "10%", y: "78%", drift: [-8, 14] },
  { icon: IconClock, label: "Manual follow-ups", note: "If someone remembers", x: "34%", y: "40%", drift: [0, 2] },
];

export function ProblemSection() {
  return (
    <Section id="problem">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow index="02">The problem</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.75rem,3.2vw,2.5rem)] font-600 leading-[1.15] tracking-tight text-deep">
            The problem wasn&rsquo;t a lack of data. It was that the data lived{" "}
            <span className="italic text-brand-600">everywhere</span>.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist">
            Every part of the laundry operation worked — in isolation. A
            customer detail in one place, the order in another, the payment
            remembered by whoever took the cash. Nothing spoke to anything else.
          </p>
          <p className="mt-8 font-mono text-[11px] uppercase leading-relaxed tracking-[0.15em] text-mist">
            7 disconnected surfaces.
            <br />
            <span className="text-rose-500">0 shared source of truth.</span>
          </p>
        </div>

        {/* fragmented ecosystem */}
        <div className="lg:col-span-7">
          <div className="relative h-[440px] w-full overflow-hidden sm:h-[480px] sm:overflow-visible">
            {/* hollow centre — the missing single source of truth */}
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed border-line text-center">
              <span className="px-3 font-mono text-[10px] uppercase leading-tight tracking-[0.15em] text-mist">
                no single<br />record
              </span>
            </div>

            {FRAGMENTS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.9 }}
                whileInView={{
                  opacity: 1,
                  x: f.drift[0],
                  y: f.drift[1],
                  scale: 1,
                }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{
                  duration: 1,
                  delay: i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.04, zIndex: 20 }}
                style={{ left: f.x, top: f.y, rotate: `${(i % 3) - 1}deg` }}
                className="group absolute w-[160px] rounded-xl border border-line bg-white p-3.5 shadow-[0_12px_40px_-24px_rgba(0,54,72,0.5)]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-paper-100 text-deep-600 transition-colors group-hover:bg-brand-050 group-hover:text-brand-600">
                    <f.icon size={16} />
                  </span>
                  {f.flag && (
                    <span className="rounded-full bg-rose-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-rose-500">
                      {f.flag}
                    </span>
                  )}
                </div>
                <p className="mt-2.5 text-[13px] font-500 text-deep">{f.label}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-mist">
                  {f.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================================
   03 — SIX HAND-OFFS · one order, passed hand to hand through six surfaces
============================================================================ */
type HandOff = {
  key: string;
  icon: typeof IconUsers;
  label: string;
  note: string;
};

const HANDOFFS: HandOff[] = [
  { key: "customer",    icon: IconUsers, label: "Customer",    note: "A name and number — remembered, or not" },
  { key: "contact",     icon: IconChat,  label: "Contact",     note: "The request lands in a WhatsApp thread" },
  { key: "spreadsheet", icon: IconSheet, label: "Spreadsheet", note: "Re-typed into a shared sheet, sometimes" },
  { key: "order",       icon: IconBag,   label: "Order",       note: "Written up again on a paper slip" },
  { key: "payment",     icon: IconRupee, label: "Payment",     note: "Tracked separately — easy to lose" },
  { key: "delivery",    icon: IconTruck, label: "Delivery",    note: "Routed and confirmed by phone call" },
];

/* one hand-off in the chain */
function HandOffCard({ index, icon: Icon, label, note }: { index: number; icon: typeof IconUsers; label: string; note: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex w-[168px] shrink-0 flex-col gap-3 rounded-xl border border-line bg-white p-4"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-paper-100 text-brand-600">
          <Icon size={15} />
        </span>
        <span className="font-mono text-[10px] text-mist">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div>
        <p className="text-[13px] font-500 text-deep">{label}</p>
        <p className="mt-1 text-[11px] leading-snug text-mist">{note}</p>
      </div>
    </motion.div>
  );
}

/* the connector between two hand-offs — horizontal on desktop, vertical on mobile */
function HandOffConnector() {
  return (
    <div className="flex shrink-0 items-center justify-center py-1 lg:py-0">
      <IconArrow size={16} className="rotate-90 text-mist lg:rotate-0" />
    </div>
  );
}

export function TransformationSection() {
  return (
    <Section id="transformation" className="bg-paper-100/40">
      <div className="max-w-2xl">
        <Eyebrow index="03">The problem</Eyebrow>
        <h2 className="mt-6 text-[clamp(1.75rem,3.2vw,2.5rem)] font-600 leading-[1.15] tracking-tight text-deep">
          Six brittle hand-offs, locked into{" "}
          <span className="italic text-brand-600">one cumbersome workflow</span>.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-mist">
          Every order moved through multiple manual touchpoints before it reached
          the customer.
        </p>
      </div>

      {/* ---------- Desktop: six hand-offs in a single connected chain --------- */}
      <div className="mt-14 hidden flex-wrap items-center gap-y-6 lg:flex">
        {HANDOFFS.map((h, i) => (
          <div key={h.key} className="flex items-center">
            <HandOffCard index={i} icon={h.icon} label={h.label} note={h.note} />
            {i < HANDOFFS.length - 1 && <HandOffConnector />}
          </div>
        ))}
      </div>

      {/* ---------- Mobile: the same chain, stacked top to bottom --------------- */}
      <div className="mt-12 flex flex-col items-center lg:hidden">
        {HANDOFFS.map((h, i) => (
          <div key={h.key} className="flex flex-col items-center">
            <HandOffCard index={i} icon={h.icon} label={h.label} note={h.note} />
            {i < HANDOFFS.length - 1 && <HandOffConnector />}
          </div>
        ))}
      </div>

      {/* ---------- Calm editorial transition ----------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 border-t border-line pt-7 text-center"
      >
        <p className="mx-auto max-w-md text-[clamp(1rem,1.7vw,1.3rem)] font-500 leading-snug text-mist">
          Too many places to look. Too many places to update.
        </p>
        <p className="mt-4 text-[clamp(1.15rem,2.1vw,1.7rem)] font-600 tracking-tight text-brand-600">
          One connected system.
        </p>
      </motion.div>
    </Section>
  );
}

/* ============================================================================
   04 — THE COMPLETE CUSTOMER JOURNEY · sticky, scroll-driven
   Each stage activates its own CRM interface fragment.
============================================================================ */
const JOURNEY = [
  { n: "01", t: "First contact", d: "A message or walk-in becomes a logged request — no more lost enquiries." },
  { n: "02", t: "Customer created", d: "Matched to an existing profile, or a new record in one tap." },
  { n: "03", t: "Order placed", d: "Items, service type and price itemised against the customer." },
  { n: "04", t: "Payment", d: "Advance or full — the balance is tracked, never guessed." },
  { n: "05", t: "Processing", d: "Wash, iron, ready — each state visible to the whole floor." },
  { n: "06", t: "Delivery", d: "Routed, dispatched and confirmed against the same record." },
  { n: "07", t: "Repeat order", d: "History and follow-ups turn one order into a returning customer." },
];

function JourneyFragment({ i }: { i: number }) {
  const frag = [
    <>
      <FragRow label="Incoming" value="WhatsApp enquiry" tone="teal" />
      <FragLine w="70%" />
      <FragLine w="45%" />
      <FragChip tone="amber">Unassigned → logged</FragChip>
    </>,
    <>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-deep font-fraunces text-sm font-600 text-brand">
          PS
        </span>
        <div>
          <p className="text-[14px] font-600 text-deep">Priya Sharma</p>
          <p className="text-[11px] text-mist">New · +91 98765 XXXXX</p>
        </div>
      </div>
      <FragChip tone="green">Customer record created</FragChip>
    </>,
    <>
      <FragRow label="5 Shirts" value="Wash & Iron" />
      <FragRow label="2 Pants" value="Wash & Iron" />
      <FragRow label="1 Saree" value="Steam" />
      <FragRow label="Total" value="₹1,240" tone="teal" bold />
    </>,
    <>
      <FragRow label="Total" value="₹1,240" bold />
      <FragRow label="Advance" value="₹800" tone="green" />
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper-100">
        <div className="h-full w-[64%] rounded-full bg-brand" />
      </div>
      <FragChip tone="amber">₹440 pending</FragChip>
    </>,
    <>
      <div className="flex flex-wrap gap-1.5">
        <StatusChip tone="teal">Received</StatusChip>
        <StatusChip tone="amber">Washing</StatusChip>
        <StatusChip tone="muted">Ironing</StatusChip>
      </div>
      <FragLine w="80%" />
      <FragChip tone="green">On track · ready by 6 PM</FragChip>
    </>,
    <>
      <FragRow label="Route 4" value="Andheri" tone="teal" />
      <FragRow label="Driver" value="Dispatched" />
      <FragChip tone="green">Delivered · confirmed</FragChip>
    </>,
    <>
      <FragRow label="Lifetime" value="12 orders" bold />
      <FragRow label="Last order" value="4 days ago" />
      <FragChip tone="green">Follow-up scheduled</FragChip>
    </>,
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-3"
    >
      {frag[i]}
    </motion.div>
  );
}

function FragRow({ label, value, tone, bold }: { label: string; value: string; tone?: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-2 text-[13px]">
      <span className="text-mist">{label}</span>
      <span
        className={`${bold ? "font-600" : "font-500"} ${
          tone === "green" ? "text-brand-600" : tone === "teal" ? "text-deep" : "text-ink"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
function FragLine({ w }: { w: string }) {
  return <div className="h-2 rounded-full bg-paper-100" style={{ width: w }} />;
}
function FragChip({ tone, children }: { tone: string; children: React.ReactNode }) {
  return <StatusChip tone={tone}>{children}</StatusChip>;
}

export function WorkflowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Scroll remains an ambient enhancement — it never blocks or captures the
  // wheel/trackpad, it just narrates along as the section normally scrolls
  // past. Clicking a stage (below) writes to the exact same state and always
  // wins immediately; nothing here prevents or intercepts default scrolling.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(JOURNEY.length - 1, Math.floor(v * JOURNEY.length));
    setActive(idx < 0 ? 0 : idx);
  });

  return (
    <Section id="workflow" className="!py-0">
      <div ref={ref} className="relative py-14 md:py-20">
        <div className="max-w-xl">
          <Eyebrow index="04">The complete customer journey</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.75rem,3.2vw,2.5rem)] font-600 leading-[1.15] tracking-tight text-deep">
            One thread runs from first contact to repeat order.
          </h2>
          <p className="mt-4 text-[13.5px] text-mist">
            Select any stage to inspect it directly.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.05fr]">
          {/* stage list — every stage is a real, keyboard-accessible button */}
          <ol className="space-y-3">
            {JOURNEY.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.n}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    aria-label={`View ${s.t} stage`}
                    className={`w-full rounded-xl border p-5 text-left transition-all duration-500 ${
                      on
                        ? "border-brand/30 bg-white shadow-[0_20px_50px_-30px_rgba(0,54,72,0.5)]"
                        : "border-transparent opacity-45 hover:opacity-70"
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-mono text-[12px] ${on ? "text-brand-600" : "text-mist"}`}
                      >
                        {s.n}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-lg font-600 text-deep">{s.t}</p>
                        <motion.div
                          animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-2 text-[13.5px] leading-relaxed text-mist">{s.d}</p>

                          {/* Mobile/tablet: the CRM state lives inline under the stage
                              itself (no sticky panel below lg) — an accordion, not a
                              scroll-linked surface, so it never traps the viewport. */}
                          <div className="mt-4 overflow-hidden rounded-xl border border-line bg-paper-100/40 lg:hidden">
                            <WindowChrome title={`crm / journey · ${s.t.toLowerCase().replace(/ /g, "-")}`} />
                            <div className="p-4">
                              <JourneyFragment i={i} />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* sticky fragment panel — desktop only, crossfades between stages */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_80px_-40px_rgba(0,54,72,0.4)]">
                <WindowChrome title={`crm / journey · ${JOURNEY[active].t.toLowerCase().replace(/ /g, "-")}`} />
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                      Stage {JOURNEY[active].n}
                    </span>
                    <div className="flex gap-1">
                      {JOURNEY.map((_, j) => (
                        <button
                          key={j}
                          type="button"
                          onClick={() => setActive(j)}
                          aria-label={`View ${JOURNEY[j].t} stage`}
                          aria-current={j === active}
                          className={`h-1 w-4 rounded-full transition-colors ${
                            j <= active ? "bg-brand" : "bg-line hover:bg-mist"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <AnimatePresence mode="popLayout">
                    <JourneyFragment key={active} i={active} />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================================
   04 — CUSTOMER · progressive-reveal profile
============================================================================ */
export function CustomerSection() {
  const rows = [
    ["Phone", "+91 98765 XXXXX"],
    ["Customer type", "Premium · Monthly plan"],
    ["Total orders", "12"],
    ["Current order", "#YC1024 · Washing"],
    ["Outstanding", "₹1,240"],
    ["Last order", "4 days ago"],
  ];
  return (
    <Section id="customer" className="bg-paper-100/40">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow index="05">Customer</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.75rem,3.2vw,2.5rem)] font-600 leading-[1.15] tracking-tight text-deep">
            Every customer, finally a single record.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist">
            Order history, payment standing and recent activity in one profile —
            so anyone on the floor can pick up a conversation exactly where it
            was left.
          </p>
        </div>

        <Reveal y={40}>
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_80px_-40px_rgba(0,54,72,0.4)]">
            <WindowChrome title="customers / anaya-kulkarni" />
            <div className="p-6">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-deep font-fraunces text-xl font-600 text-brand">
                  PS
                </span>
                <div>
                  <p className="font-fraunces text-lg font-600 text-deep">
                    Priya Sharma
                  </p>
                  <div className="mt-1 flex gap-2">
                    <StatusChip tone="green">12 orders</StatusChip>
                    <StatusChip tone="amber">₹1,240 due</StatusChip>
                  </div>
                </div>
              </div>

              <dl className="mt-6 divide-y divide-line rounded-xl border border-line">
                {rows.map(([k, v], i) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12 }}
                    className="flex items-center justify-between px-4 py-3 text-[13.5px]"
                  >
                    <dt className="text-mist">{k}</dt>
                    <dd className="font-500 text-deep">{v}</dd>
                  </motion.div>
                ))}
              </dl>

              <p className="mt-5 mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                Recent activity
              </p>
              <ul className="space-y-2 text-[13px]">
                {[
                  ["Order #YC1024 moved to Washing", "2h ago"],
                  ["₹800 advance collected", "2h ago"],
                  ["Order received · 8 pieces", "5h ago"],
                ].map(([a, t], i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    <span className="text-ink">{a}</span>
                    <span className="ml-auto font-mono text-[11px] text-mist">
                      {t}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============================================================================
   05 — ORDER LIFECYCLE · animated status progression
============================================================================ */
const LIFECYCLE = ["Received", "Washing", "Ironing", "Ready", "Delivered"];

export function OrderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-30%" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setStep(LIFECYCLE.length - 1);
    setStep(0);
    const iv = setInterval(() => {
      setStep((s) => (s < LIFECYCLE.length - 1 ? s + 1 : s));
    }, 1100);
    return () => clearInterval(iv);
  }, [inView, reduce]);

  return (
    <Section id="order">
      <div ref={ref} className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow index="06">Order lifecycle</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.75rem,3.2vw,2.5rem)] font-600 leading-[1.15] tracking-tight text-deep">
            An order you can watch move.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist">
            Each stage is a real state change — logged, timestamped and visible
            to the whole team. No more &ldquo;let me check and call you back.&rdquo;
          </p>

          <div className="mt-8 space-y-1">
            {LIFECYCLE.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <div key={s} className="flex items-center gap-3 py-1.5">
                  <motion.span
                    animate={{
                      backgroundColor: done || active ? "#00d17c" : "#f4f2ec",
                      color: done || active ? "#003648" : "#93a4a8",
                      scale: active ? 1.1 : 1,
                    }}
                    className="grid h-7 w-7 place-items-center rounded-full text-[12px]"
                  >
                    {done ? <IconCheck size={13} /> : i + 1}
                  </motion.span>
                  <span
                    className={`text-[14px] transition-colors ${
                      done || active ? "text-deep" : "text-mist"
                    }`}
                  >
                    {s}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="order-live"
                      className="ml-auto font-mono text-[11px] text-brand-600"
                    >
                      in progress…
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_30px_80px_-40px_rgba(0,54,72,0.4)]">
          <WindowChrome title="orders / YC1024" />
          <div className="pt-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] text-mist">Order #YC1024</p>
                <p className="font-fraunces text-xl font-600 text-deep">Priya Sharma</p>
                <p className="text-[13px] text-mist">5 Shirts · 2 Pants · 1 Saree</p>
              </div>
              <motion.div key={step}>
                <StatusChip tone={step === LIFECYCLE.length - 1 ? "green" : "amber"}>
                  {LIFECYCLE[step]}
                </StatusChip>
              </motion.div>
            </div>

            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-paper-100">
              <motion.div
                className="h-full rounded-full bg-brand"
                animate={{ width: `${(step / (LIFECYCLE.length - 1)) * 100}%` }}
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-[13px]">
              {[
                ["Received", "9:40 AM"],
                ["Est. ready", "Today 6 PM"],
                ["Total", "₹1,240"],
                ["Paid", "₹800 advance"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-paper-100 px-3 py-3">
                  <p className="text-[11px] text-mist">{k}</p>
                  <p className="mt-0.5 font-500 text-deep">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================================
   06 — PAYMENTS · pending → paid
============================================================================ */
export function PaymentSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-30%" });
  const reduce = useReducedMotion();
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!inView) return setPaid(false);
    if (reduce) return setPaid(true);
    const t = setTimeout(() => setPaid(true), 1400);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  return (
    <Section id="payments" className="bg-paper-100/40">
      <div ref={ref} className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow index="07">Payments</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.75rem,3.2vw,2.5rem)] font-600 leading-[1.15] tracking-tight text-deep">
            Money stopped slipping through the cracks.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mist">
            Every order carries its own ledger — total, paid, pending. Balances
            update the moment cash or UPI lands, and outstanding amounts surface
            before they&rsquo;re forgotten.
          </p>
          <button
            onClick={() => setPaid((p) => !p)}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-deep/20 px-5 py-2.5 text-[13px] font-500 text-deep transition-colors hover:bg-deep hover:text-white"
          >
            {paid ? "Reset" : "Record payment"} <IconArrow size={14} />
          </button>
        </div>

        <Reveal y={30}>
          <div className="mx-auto max-w-sm rounded-2xl border border-line bg-white p-6 shadow-[0_30px_80px_-40px_rgba(0,54,72,0.4)]">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                Order #YC1024
              </p>
              <motion.div key={String(paid)}>
                <StatusChip tone={paid ? "green" : "amber"}>
                  {paid ? "Paid in full" : "Partially Paid"}
                </StatusChip>
              </motion.div>
            </div>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
              Total
            </p>
            <p className="font-fraunces text-4xl font-600 tracking-tight text-deep">
              ₹1,240
            </p>

            <div className="mt-6 space-y-3">
              <Ledger label="Paid" value={paid ? "₹1,240" : "₹800"} tone />
              <Ledger label="Pending" value={paid ? "₹0" : "₹440"} warn={!paid} />
            </div>

            <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-paper-100">
              <motion.div
                className="h-full rounded-full bg-brand"
                animate={{ width: paid ? "100%" : "64.5%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <motion.p
              animate={{ opacity: paid ? 1 : 0.5 }}
              className="mt-3 flex items-center gap-1.5 text-[12px] text-mist"
            >
              {paid ? (
                <>
                  <IconCheck size={13} className="text-brand-600" /> ₹440 collected
                  via UPI · 21 Aug
                </>
              ) : (
                <>
                  <IconClock size={13} /> Balance due on delivery
                </>
              )}
            </motion.p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Ledger({ label, value, tone, warn }: { label: string; value: string; tone?: boolean; warn?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-line px-4 py-3">
      <span className="text-[13px] text-mist">{label}</span>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`tnum font-fraunces text-lg font-600 ${
          tone ? "text-brand-600" : warn ? "text-amber-600" : "text-deep"
        }`}
      >
        {value}
      </motion.span>
    </div>
  );
}

/* ============================================================================
   08 — DESIGN SYSTEM
============================================================================ */
const SYSTEM_LAYERS = [
  {
    key: "foundations",
    label: "Foundations",
    role: "Visual & interaction primitives",
    kicker: "The raw primitives — colour, type, space and motion — before any of them carry meaning.",
  },
  {
    key: "tokens",
    label: "Tokens",
    role: "Primitive → semantic mapping",
    kicker: "Primitives given product meaning, then consumed by name — never by hex code.",
  },
  {
    key: "components",
    label: "Components",
    role: "Variants, states & a11y",
    kicker: "Tokens assembled into the reusable pieces every screen is built from, with a full state model.",
  },
  {
    key: "patterns",
    label: "Patterns",
    role: "Reusable product behaviours",
    kicker: "Components composed into the recurring workflows the CRM repeats — customer, order, payment, delivery.",
  },
  {
    key: "crm",
    label: "Applied in product",
    role: "Proof in a real product",
    kicker: "Selected CRM surfaces showing the system applied across operational workflows.",
  },
] as const;

type SystemLayerKey = (typeof SYSTEM_LAYERS)[number]["key"];

/* keyed lookup — the five stacked sections below read their own heading
   number/label/kicker from here, so the nav and the content can never
   drift out of sync. */
const LAYER_META = Object.fromEntries(SYSTEM_LAYERS.map((l) => [l.key, l])) as Record<
  SystemLayerKey,
  (typeof SYSTEM_LAYERS)[number]
>;

/* the one worked example, referenced by the architecture diagram */
const ARCHITECTURE_CHAIN = [
  { layer: "Foundations", example: "Brand / 500" },
  { layer: "Semantic token", example: "color.action.primary" },
  { layer: "Component", example: "Button / Primary" },
  { layer: "Pattern", example: "Order workflow" },
  { layer: "Product", example: "YouClean CRM" },
];

const COLOR_STEPS = ["50", "100", "300", "500", "700", "900"];
const COLOR_SCALES = [
  { name: "Brand", stops: ["#E6FAF1", "#C2F2DD", "#7EE3B3", "#00D17C", "#00A662", "#006B3F"] },
  { name: "Deep", stops: ["#E9EEF0", "#C7D3D7", "#6B8A93", "#003648", "#00232E", "#00141A"] },
  { name: "Amber", stops: ["#FEF3E2", "#FDE4B8", "#FBC363", "#F59E0B", "#B8760A", "#7A4E06"] },
  { name: "Rose", stops: ["#FDECEC", "#FAC9CB", "#F08286", "#E5484D", "#AD373B", "#742528"] },
  { name: "Neutral", stops: ["#FBFAF7", "#F4F2EC", "#E4E1D8", "#93A4A8", "#4A5457", "#0A1A1F"] },
];

const TYPE_SCALE = [
  { name: "Display", font: "Fraunces", weight: 600, size: "56 / 72px", lh: "1.0", ls: "-0.02em", purpose: "Hero headline only" },
  { name: "Heading 1", font: "Fraunces", weight: 600, size: "40 / 52px", lh: "1.05", ls: "-0.01em", purpose: "Section headline" },
  { name: "Heading 2", font: "Fraunces", weight: 600, size: "28 / 36px", lh: "1.1", ls: "0em", purpose: "Sub-section headline" },
  { name: "Heading 3", font: "Fraunces", weight: 600, size: "20 / 26px", lh: "1.15", ls: "0em", purpose: "Card / panel title" },
  { name: "Body large", font: "Instrument Sans", weight: 400, size: "16 / 24px", lh: "1.5", ls: "0em", purpose: "Lead paragraph" },
  { name: "Body", font: "Instrument Sans", weight: 400, size: "14 / 20px", lh: "1.5", ls: "0em", purpose: "Default UI text" },
  { name: "Body small", font: "Instrument Sans", weight: 400, size: "12.5 / 18px", lh: "1.45", ls: "0em", purpose: "Secondary UI text" },
  { name: "Label", font: "Instrument Sans", weight: 500, size: "13 / 16px", lh: "1.2", ls: "0.01em", purpose: "Form labels, buttons" },
  { name: "Caption", font: "Instrument Sans", weight: 500, size: "11 / 14px", lh: "1.3", ls: "0.02em", purpose: "Meta, timestamps" },
  { name: "Data", font: "JetBrains Mono", weight: 400, size: "12.5 / 18px", lh: "1.4", ls: "0em", purpose: "IDs, tokens, amounts" },
];

const SPACING_SCALE = [4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96];

const DENSITY_MODES = [
  { name: "Comfortable", pad: 14, note: "Marketing surfaces, onboarding" },
  { name: "Compact", pad: 9, note: "Default operational screens" },
  { name: "Dense", pad: 5, note: "High-volume tables, floor view" },
];

const RADIUS_SCALE = [
  { name: "radius.none", px: 0 },
  { name: "radius.sm", px: 4 },
  { name: "radius.md", px: 8 },
  { name: "radius.lg", px: 12 },
  { name: "radius.xl", px: 16 },
  { name: "radius.full", px: 999 },
];

const ELEVATION_SCALE = [
  { name: "none", shadow: "none" },
  { name: "raised", shadow: "0 1px 2px rgba(10,26,31,0.08), 0 1px 1px rgba(10,26,31,0.04)" },
  { name: "overlay", shadow: "0 20px 40px -16px rgba(10,26,31,0.35)" },
];

const MOTION_SCALE = [
  { name: "Instant", ms: "0–50ms", purpose: "Toggle, checkbox — no perceptible delay" },
  { name: "Fast", ms: "120–160ms", purpose: "Hover, focus, small state changes" },
  { name: "Standard", ms: "200–280ms", purpose: "Panel reveal, tab switch, crossfade" },
  { name: "Emphasis", ms: "400–600ms", purpose: "Entrance on scroll, first-load reveal" },
];

/* Computed from the actual token pairs used in the product (WCAG relative
   luminance formula) — not asserted. Amber/rose figures use the real chip
   background (a low-opacity tint over white), matching what renders on
   screen, not the flat primitive. */
const CONTRAST_CHECKS = [
  { pair: "Ink on Paper", use: "Body text", ratio: 17.04, target: 4.5, pass: true },
  { pair: "Deep on Paper", use: "Headings", ratio: 12.41, target: 4.5, pass: true },
  { pair: "Deep on Brand 500", use: "Button / Primary", ratio: 6.42, target: 4.5, pass: true },
  { pair: "White on Deep 500", use: "Button / Secondary", ratio: 12.95, target: 4.5, pass: true },
  { pair: "White on Rose 500", use: "Button / Destructive", ratio: 3.67, target: 3, pass: true },
  { pair: "Amber 700 on Amber tint", use: "Status / Warning badge", ratio: 4.58, target: 4.5, pass: true },
  { pair: "Rose 600 on Rose tint", use: "Status / Danger badge", ratio: 4.13, target: 3, pass: true },
  { pair: "Mist on Paper", use: "Caption / meta text", ratio: 2.48, target: 4.5, pass: false },
];

const ACCESSIBILITY_GUARANTEES = [
  "Visible keyboard focus on every interactive element",
  "Full keyboard navigability — no mouse-only paths",
  "Tab order follows visual and reading order",
  "Semantic HTML — real button, nav and table markup, not styled divs",
  "44×44px minimum touch target, including icon-only controls",
  "Every control has a meaningful, programmatic label",
  "Heading order matches visual hierarchy",
  "Errors state what went wrong and how to fix it — never by colour alone",
  "Respects prefers-reduced-motion",
  "UI remains usable at 200% text scaling",
];

/* The three-tier hierarchy, named exactly as the system would name them —
   this is the architecture; the worked examples below are the story. */
const PRIMITIVE_TOKENS = [
  { name: "color.green.500", hex: "#00D17C" },
  { name: "color.amber.500", hex: "#F59E0B" },
  { name: "color.rose.500", hex: "#F43F5E" },
  { name: "color.deep.900", hex: "#003648" },
  { name: "color.ink.950", hex: "#0A1A1F" },
  { name: "color.paper.50", hex: "#FBFAF7" },
];

const SEMANTIC_TOKENS = [
  { name: "color.action.primary", hex: "#00D17C" },
  { name: "color.text.primary", hex: "#0A1A1F" },
  { name: "color.text.secondary", hex: "#93A4A8" },
  { name: "color.surface.default", hex: "#FFFFFF" },
  { name: "color.surface.subtle", hex: "#F4F2EC" },
  { name: "color.border.default", hex: "#E4E1D8" },
  { name: "color.status.success", hex: "#00D17C" },
  { name: "color.status.warning", hex: "#F59E0B" },
  { name: "color.status.error", hex: "#F43F5E" },
  { name: "color.focus.ring", hex: "#00D17C" },
];

const COMPONENT_TOKENS = [
  { name: "button.primary.background", hex: "#00D17C" },
  { name: "button.primary.text", hex: "#003648" },
  { name: "badge.warning.background", hex: "#FEF3E2" },
  { name: "input.border.focus", hex: "#00D17C" },
  { name: "table.row.hover", hex: "#F4F2EC" },
];

const TOKEN_WORKED_EXAMPLES = [
  { primitive: "color.green.500", hex: "#00D17C", semantic: "action.primary", component: "Primary button" },
  { primitive: "color.amber.500", hex: "#F59E0B", semantic: "status.warning", component: "Pending badge" },
  { primitive: "color.rose.500", hex: "#E5484D", semantic: "status.error", component: "Error message" },
];

/* the six operational statuses the CRM actually uses, each composed as
   colour + icon + text — never colour alone. Reuses StatusChip, the real
   component every order/payment screen renders, with an icon prefix in
   front (the same composition pattern the live product already uses for
   payment status — see PaymentSection's IconCheck/IconClock rows). */
const STATUS_SET: {
  label: string;
  tone: "green" | "teal" | "amber" | "rose";
  icon: "check" | "clock" | "spin" | "error" | "bell" | "truck";
}[] = [
  { label: "Ready", tone: "green", icon: "check" },
  { label: "Processing", tone: "teal", icon: "spin" },
  { label: "Pending", tone: "amber", icon: "clock" },
  { label: "Error", tone: "rose", icon: "error" },
  { label: "Overdue", tone: "rose", icon: "bell" },
  { label: "Delivered", tone: "green", icon: "truck" },
];

/* Operational patterns — each one is a real decision made for this product,
   not a generic UI pattern description. Token → component → pattern →
   product is already told once, above, by the architecture chain; these
   are the judgment calls that sit underneath it. */
const PATTERN_CHAINS = [
  {
    name: "Order lifecycle",
    context: "Orders move through five operational states from intake to delivery.",
    decision: "Each state is a distinct token-driven status, not a free-text field.",
    interaction: "Staff advance the order by selecting the next state — no retyping.",
    result: "Every order's true state is visible without asking anyone.",
  },
  {
    name: "Search and filtering",
    context: "Staff need to find one order among hundreds without scrolling.",
    decision: "One search input narrows the same list every screen already shares.",
    interaction: "Typing a name or phone number filters live — no separate submit step.",
    result: "An order is found in seconds, not scrolled to.",
  },
  {
    name: "Payment states",
    context: "Orders can be paid in full, part-paid, or pending.",
    decision: "Payment status is its own token-driven state, separate from order status.",
    interaction: "A pending balance surfaces its own collection action inline.",
    result: "No payment goes uncollected because it wasn't visible.",
  },
  {
    name: "Delivery workflow",
    context: "A completed order needs to reach the right customer on the right route.",
    decision: "One order record carries state from counter to doorstep — no separate log.",
    interaction: "Marking an order Delivered closes the loop on the record it started on.",
    result: "Delivery confirmation is traceable to a single order, always.",
  },
  {
    name: "Loading / empty / error states",
    context: "Data is fetched live from a shared operational sheet — it can be slow or fail.",
    decision: "Every list defines a loading, empty and error state — never a blank screen.",
    interaction: "A failed fetch offers retry; an empty filter explains why nothing matched.",
    result: "Staff always know whether to wait, adjust their search, or retry.",
  },
  {
    name: "Destructive actions",
    context: "Deleting an order or customer record is rare, but permanent.",
    decision: "Delete is restricted to Admin/Manager roles and always requires confirmation.",
    interaction: "The confirming action names the consequence — not just “Yes”.",
    result: "No record is lost to a misclick, and every deletion is logged to who did it.",
  },
];

const BREAKPOINTS = [
  { name: "Desktop", w: "≥1024px", note: "Full table density, sticky panels, multi-column layout" },
  { name: "Tablet", w: "768–1023px", note: "Columns collapse to two, sticky panels stack inline" },
  { name: "Mobile", w: "<768px", note: "Single column, table rows become stacked cards, 44px touch targets" },
];

/* small uppercase mono label reused across every foundation/section block */
function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">{children}</p>
  );
}

export function DesignSystemSection() {
  // `active` drives the nav highlight only — all five sections below are
  // always mounted (this is real scrollspy over stacked content, not a
  // tab-click swap), so it's set both on click (instant feedback) and by
  // the IntersectionObserver below (as the reader scrolls manually).
  const [active, setActive] = useState<SystemLayerKey>("foundations");
  // Collapsed by default: a portfolio case study shows one strong,
  // representative fold of a design system (the architecture chain right
  // below), not the whole documentation surface. Nothing here is removed —
  // the five-layer scrollspy, tokens, patterns and everything else still
  // renders in full, just behind an explicit "view full design system"
  // action instead of being the page's default, dominant visual.
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();
  const tabRefs = useRef<Partial<Record<SystemLayerKey, HTMLButtonElement | null>>>({});
  const sectionRefs = useRef<Partial<Record<SystemLayerKey, HTMLDivElement | null>>>({});
  const navScrollRef = useRef<HTMLElement | null>(null);

  // Keep the active tab fully in view within the horizontally-scrollable
  // sticky rail (relevant on mobile, where all five tabs don't fit at
  // once). Scrolls the nav's own overflow-x-auto container directly by an
  // explicit computed delta, rather than button.scrollIntoView({block:
  // 'nearest'}) — that "nearest" calculation, on a button inside a
  // position: sticky ancestor, was misjudging whether the *page* also
  // needed to move and fighting goToLayer's own scroll below. Scrolling
  // only scrollLeft here can't touch vertical position at all.
  useEffect(() => {
    const container = navScrollRef.current;
    const btn = tabRefs.current[active];
    if (!container || !btn) return;
    const btnLeft = btn.offsetLeft;
    const btnRight = btnLeft + btn.offsetWidth;
    const viewLeft = container.scrollLeft;
    const viewRight = viewLeft + container.clientWidth;
    let target: number | null = null;
    if (btnLeft < viewLeft) target = btnLeft;
    else if (btnRight > viewRight) target = btnRight - container.clientWidth;
    if (target !== null) {
      container.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
    }
  }, [active, reduce]);

  // Manual scroll drives the active section too: whichever tracked section
  // sits highest in the viewport (below the sticky nav's own height) wins.
  useEffect(() => {
    const els = SYSTEM_LAYERS.map((l) => sectionRefs.current[l.key]).filter(
      (el): el is HTMLDivElement => el !== null && el !== undefined,
    );
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = visible[0]?.target.getAttribute("data-layer-id") as SystemLayerKey | null;
        if (id) setActive(id);
      },
      // Shrink the observed viewport to just below the sticky global nav +
      // layer selector (~140px) and ignore the bottom 55% — this is what
      // makes "active" track the section currently under the nav, not
      // whichever section merely has the most pixels on screen.
      { rootMargin: "-140px 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goToLayer(key: SystemLayerKey) {
    setActive(key);
    const el = sectionRefs.current[key];
    if (!el) return;
    // Deferred one frame: clicking a <button> also focuses it, and the
    // browser's own native "scroll the newly-focused element into view"
    // can run after this handler returns, fighting whatever we scroll to
    // here. Running on the next frame guarantees ours is the last word.
    requestAnimationFrame(() => {
      // The target Y is computed explicitly (rather than handed to
      // scrollIntoView) so both branches land at exactly the same,
      // correct position: the section's top minus 140px, clearing the
      // fixed global nav and this section's own sticky layer selector.
      const targetY = el.getBoundingClientRect().top + window.scrollY - 140;
      // The site runs on Lenis (a JS-driven smooth-scroll layer on
      // <html>), which continuously re-syncs the real scroll position
      // against its own virtual scroll state — a plain window.scrollTo()
      // gets fought and snapped back while Lenis is running. Lenis's own
      // scrollTo() keeps its internal state in sync, so it's the only
      // reliable way to scroll programmatically while it's active. Lenis
      // is never instantiated under prefers-reduced-motion, so the
      // fallback only runs in that already-reduced-motion case.
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(targetY);
      } else {
        window.scrollTo({ top: targetY, behavior: reduce ? "auto" : "smooth" });
      }
    });
  }

  return (
    <Section id="system" className="bg-paper-100/40">
      <div className="max-w-2xl">
        <Eyebrow index="09">YouClean / Design system</Eyebrow>
        <h2 className="mt-6 text-[clamp(1.75rem,3.2vw,2.5rem)] font-600 leading-[1.15] tracking-tight text-deep">
          Design infrastructure for an operational product.
        </h2>
        <p className="mt-4 max-w-md text-[14px] leading-relaxed text-mist">
          Foundations, tokens, components and interaction patterns built to
          support a growing CRM without sacrificing clarity, accessibility or
          consistency.
        </p>
      </div>

      {/* system architecture — the relationship, not decoration, comes first */}
      <div className="mt-10 rounded-lg border border-line bg-paper-100/60 p-6 md:p-8">
        <SubLabel>System architecture</SubLabel>
        <div className="flex flex-wrap items-center gap-2 text-[12px]">
          {["Foundations", "Primitive tokens", "Semantic tokens", "Components", "Patterns", "Product"].map(
            (s, i, arr) => (
              <div key={s} className="flex items-center gap-2">
                <span className="rounded-md border border-line bg-white px-2.5 py-1.5 text-deep">
                  {s}
                </span>
                {i < arr.length - 1 && <IconArrow size={12} className="text-mist" />}
              </div>
            ),
          )}
        </div>
        <div className="mt-6 grid gap-3 border-t border-line pt-6 sm:grid-cols-5">
          {ARCHITECTURE_CHAIN.map((step) => (
            <div key={step.layer} className="flex items-center gap-2 sm:flex-col sm:items-start sm:gap-1">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.15em] text-mist">
                {step.layer}
              </span>
              <span className="font-mono text-[12px] text-brand-600">{step.example}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Everything below (the five-layer scrollspy, tokens, patterns,
          responsive rules, decisions, design → code) is real, unedited
          content — collapsed behind one action so the design system reads
          as a portfolio showcase, not the page's dominant section. */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[13px] font-500 text-deep transition-colors hover:bg-deep hover:text-white"
        >
          {expanded ? "Hide full design system" : "View full design system"}
          <IconArrow size={14} className={expanded ? "-rotate-90" : "rotate-90"} />
        </button>
      </div>

      {expanded && (
      <>
      {/* layer selector — numbered like a system's own layer stack, not a
          decorative pill nav: the number + role name the architecture.
          Sticky so a reader deep in one layer's content never has to
          scroll back to the top to reach the next one — pinned just
          below the global nav's scrolled height (56px + 1px border). */}
      <div className="sticky z-30 mt-8 border-b border-line bg-paper" style={{ top: 57 }}>
        <nav
          ref={navScrollRef}
          aria-label="Design system sections"
          className="overflow-x-auto border-t border-line"
        >
          <div className="flex min-w-max">
            {SYSTEM_LAYERS.map((l, i) => (
              <button
                key={l.key}
                ref={(el) => {
                  tabRefs.current[l.key] = el;
                }}
                type="button"
                onClick={() => goToLayer(l.key)}
                aria-current={l.key === active ? "page" : undefined}
                aria-label={`${l.label} — ${l.role}`}
                className={`group -mt-px shrink-0 border-t-2 px-4 py-3 text-left transition-colors duration-300 ${
                  l.key === active ? "border-brand" : "border-transparent hover:border-line"
                }`}
              >
                <span
                  className={`block font-mono text-[10px] ${l.key === active ? "text-brand-600" : "text-mist"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`block whitespace-nowrap text-[13px] font-500 ${
                    l.key === active ? "text-deep" : "text-deep/45 group-hover:text-deep"
                  }`}
                >
                  {l.label}
                </span>
                <span className="block whitespace-nowrap text-[10px] text-mist">{l.role}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* five stacked, always-mounted sections — real scrollspy navigation,
          not a tab-click content swap. scroll-mt on each clears both the
          fixed global nav and the sticky layer selector above, so anchor
          and keyboard focus never lands hidden behind either. */}
      <div className="mt-6 rounded-lg border border-line bg-white p-6 md:p-8">
        <div
          id="foundations"
          ref={(el) => {
            sectionRefs.current.foundations = el;
          }}
          data-layer-id="foundations"
          className="scroll-mt-[140px]"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] text-mist">01</span>
            <h3 className="font-fraunces text-2xl font-600 text-deep">{LAYER_META.foundations.label}</h3>
          </div>
          <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-mist">
            {LAYER_META.foundations.kicker}
          </p>

          <div className="mt-6 [&>*+*]:mt-6 [&>*]:border-t [&>*]:border-line/60 [&>*]:pt-6 [&>*:first-child]:border-t-0 [&>*:first-child]:pt-0">
                {/* Colour */}
                <div>
                  <SubLabel>Colour — primitive scales</SubLabel>
                  <div className="space-y-2">
                    {COLOR_SCALES.map((scale) => (
                      <div key={scale.name} className="flex items-center gap-3">
                        <span className="w-16 shrink-0 text-[11px] font-500 text-deep">{scale.name}</span>
                        <div className="flex flex-1 overflow-hidden rounded-md">
                          {scale.stops.map((hex, i) => (
                            <div
                              key={i}
                              className="h-8 flex-1"
                              style={{ background: hex }}
                              title={`${scale.name} / ${COLOR_STEPS[i]}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-3 pl-[76px] font-mono text-[9px] text-mist">
                      {COLOR_STEPS.map((s) => (
                        <span key={s} className="flex-1 text-center">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-[11.5px] leading-relaxed text-mist">
                    Primitive palette = raw values. Product meaning — what a colour is
                    <em> for</em> — lives one layer up, in the semantic tokens.
                  </p>
                </div>

                {/* Typography */}
                <div>
                  <SubLabel>Typography scale</SubLabel>
                  <div className="divide-y divide-line/60">
                    {TYPE_SCALE.map((t) => (
                      <div key={t.name} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-2">
                        <span className="w-[84px] shrink-0 font-mono text-[9.5px] uppercase tracking-[0.1em] text-mist">
                          {t.name}
                        </span>
                        <span
                          className={`w-8 shrink-0 text-xl ${
                            t.font === "Fraunces" ? "font-fraunces" : t.font === "JetBrains Mono" ? "font-mono" : ""
                          }`}
                          style={{ fontWeight: t.weight }}
                        >
                          Aa
                        </span>
                        <span className="min-w-[190px] flex-1 font-mono text-[10px] text-mist">
                          {t.font} · {t.size} · {t.weight} · lh {t.lh} · {t.ls}
                        </span>
                        <span className="text-[11px] text-deep/70">{t.purpose}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[11.5px] leading-relaxed text-mist">
                    Fraunces carries editorial hierarchy. Instrument Sans runs every
                    operational surface. JetBrains Mono is reserved for IDs, tokens
                    and numerical data — never prose.
                  </p>
                </div>

                {/* Spacing + density */}
                <div>
                  <SubLabel>Spacing — 8pt rhythm</SubLabel>
                  <div className="flex items-end gap-2.5">
                    {SPACING_SCALE.map((v) => (
                      <div key={v} className="flex flex-col items-center gap-1">
                        <div className="w-2.5 rounded-sm bg-brand/70" style={{ height: Math.max(4, v * 0.7) }} />
                        <span className="font-mono text-[9px] text-mist">{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[11.5px] leading-relaxed text-mist">
                    8pt base rhythm, with controlled exceptions for typography and
                    dense operational data.
                  </p>

                  <p className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                    Density
                  </p>
                  <div className="space-y-2">
                    {DENSITY_MODES.map((d) => (
                      <div key={d.name} className="flex items-center gap-3">
                        <span className="w-24 shrink-0 text-[11.5px] font-500 text-deep">{d.name}</span>
                        <div
                          className="flex flex-1 items-center justify-between rounded-md border border-line bg-white text-[11px]"
                          style={{ paddingTop: d.pad, paddingBottom: d.pad, paddingLeft: 10, paddingRight: 10 }}
                        >
                          <span className="font-mono text-mist">YC-2481</span>
                          <StatusChip tone="amber" dot={false} className="px-1.5 py-0.5">
                            Washing
                          </StatusChip>
                        </div>
                        <span className="hidden w-40 shrink-0 text-[11px] text-mist md:block">{d.note}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] text-mist">
                    Applies identically to table rows, cards and form controls — only
                    the padding token changes.
                  </p>
                </div>

                {/* Grid */}
                <div>
                  <SubLabel>Grid</SubLabel>
                  <div className="grid grid-cols-12 gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-6 rounded-sm bg-brand/10" />
                    ))}
                  </div>
                  <p className="mt-2 text-[11.5px] text-mist">
                    12-column grid · 1200px max content width · 24px gutter, collapsing
                    to 4 columns / 16px gutter below 768px.
                  </p>
                </div>

                {/* Radius + elevation */}
                <div>
                  <SubLabel>Radius</SubLabel>
                  <div className="flex flex-wrap gap-4">
                    {RADIUS_SCALE.map((r) => (
                      <div key={r.name} className="flex flex-col items-center gap-1.5">
                        <div className="h-10 w-10 border border-line bg-white" style={{ borderRadius: r.px }} />
                        <span className="font-mono text-[9px] text-mist">{r.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                    Elevation
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {ELEVATION_SCALE.map((e) => (
                      <div key={e.name} className="flex flex-col items-center gap-1.5">
                        <div
                          className="h-10 w-16 rounded-lg border border-line bg-white"
                          style={{ boxShadow: e.shadow }}
                        />
                        <span className="font-mono text-[9px] text-mist">{e.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Iconography */}
                <div>
                  <SubLabel>Iconography</SubLabel>
                  <div className="flex items-end gap-6">
                    {[16, 20, 24].map((size) => (
                      <div key={size} className="flex flex-col items-center gap-1.5">
                        <span
                          className="grid place-items-center rounded-md bg-paper-100 text-deep-600"
                          style={{ width: size + 16, height: size + 16 }}
                        >
                          <IconTruck size={size} />
                        </span>
                        <span className="font-mono text-[9px] text-mist">{size}px</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-mist">
                    1.6px stroke at every size, optically centred to its label, 32×32px
                    minimum hit area regardless of visual size.
                  </p>
                </div>

                {/* Motion */}
                <div>
                  <SubLabel>Motion</SubLabel>
                  <div className="space-y-1.5">
                    {MOTION_SCALE.map((m) => (
                      <div key={m.name} className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px]">
                        <span className="w-16 shrink-0 font-500 text-deep">{m.name}</span>
                        <span className="w-24 shrink-0 font-mono text-[10.5px] text-mist">{m.ms}</span>
                        <span className="text-mist">{m.purpose}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-mist">
                    Motion communicates state change, feedback, continuity and
                    hierarchy — never decoration. Under{" "}
                    <code className="rounded bg-paper-100 px-1 py-0.5 font-mono text-[10.5px] text-deep">
                      prefers-reduced-motion
                    </code>
                    , transforms and long transitions are replaced with immediate
                    state changes or a short opacity fade.
                  </p>
                </div>

                {/* Accessibility */}
                <div>
                  <SubLabel>Accessibility — design contract</SubLabel>
                  <p className="text-[12px] text-mist">Target: WCAG 2.2 AA.</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    <div className="rounded-lg border border-line p-3">
                      <p className="font-mono text-[9.5px] text-mist">Normal text</p>
                      <p className="mt-1 font-fraunces text-lg font-600 text-deep">4.5 : 1</p>
                      <p className="text-[10.5px] text-mist">minimum contrast</p>
                    </div>
                    <div className="rounded-lg border border-line p-3">
                      <p className="font-mono text-[9.5px] text-mist">Large text</p>
                      <p className="mt-1 font-fraunces text-lg font-600 text-deep">3 : 1</p>
                      <p className="text-[10.5px] text-mist">minimum contrast</p>
                    </div>
                    <div className="rounded-lg border border-line p-3">
                      <p className="font-mono text-[9.5px] text-mist">UI &amp; graphical objects</p>
                      <p className="mt-1 font-fraunces text-lg font-600 text-deep">3 : 1</p>
                      <p className="text-[10.5px] text-mist">minimum contrast</p>
                    </div>
                  </div>

                  <p className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                    Contrast validation
                  </p>
                  <div className="divide-y divide-line/70 overflow-hidden rounded-lg border border-line">
                    {CONTRAST_CHECKS.map((c) => (
                      <div
                        key={c.pair}
                        className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 text-[11.5px]"
                      >
                        <span className="w-[160px] shrink-0 text-deep">{c.pair}</span>
                        <span className="min-w-[130px] flex-1 text-mist">{c.use}</span>
                        <span className="font-mono text-deep">{c.ratio.toFixed(2)} : 1</span>
                        <span
                          className={`rounded px-1.5 py-0.5 font-mono text-[9px] uppercase ${
                            c.pass ? "bg-brand-050 text-brand-600" : "bg-rose-500/10 text-rose-600"
                          }`}
                        >
                          {c.pass ? `Pass · ${c.target} : 1` : `Below ${c.target} : 1`}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-mist">
                    Calculated from the actual token pairs above, not asserted.
                    Rose 500 and the Danger badge clear the large-text/UI
                    threshold, not the normal-text one — reserved for short
                    labels, always paired with an icon. Caption text (Mist on
                    Paper) sits below target and is intentionally reserved for
                    non-essential metadata only, never for status or required
                    content.
                  </p>

                  <ul className="mt-5 grid gap-1.5 text-[12px] text-ink sm:grid-cols-2">
                    {ACCESSIBILITY_GUARANTEES.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <IconCheck size={13} className="mt-0.5 shrink-0 text-brand-600" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border border-line bg-paper-100/40 p-3">
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                        Status — icon and text, never colour alone
                      </p>
                      <div className="flex flex-wrap gap-4 text-[12px]">
                        <span className="flex items-center gap-1.5 text-brand-600">
                          <IconCheck size={13} /> Ready
                        </span>
                        <span className="flex items-center gap-1.5 text-amber-700">
                          <IconClock size={13} /> Pending
                        </span>
                        <span className="flex items-center gap-1.5 text-rose-600">
                          <span aria-hidden className="font-mono text-[13px] leading-none">
                            ×
                          </span>{" "}
                          Error
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-line bg-paper-100/40 p-3">
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                        Focus states
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-[11.5px]">
                        <span className="rounded-md border border-line bg-white px-2.5 py-1 text-deep">Default</span>
                        <span className="rounded-md border border-line bg-paper-100 px-2.5 py-1 text-deep">
                          Hover
                        </span>
                        <span className="rounded-md border-2 border-brand bg-white px-2.5 py-1 text-deep ring-2 ring-brand/30 ring-offset-2">
                          Focus-visible
                        </span>
                        <span className="scale-95 rounded-md border border-line bg-paper-100 px-2.5 py-1 text-deep">
                          Pressed
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-line bg-paper-100/40 p-3">
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                        Keyboard order
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-deep">
                        {["Search", "Filter", "Row", "Action"].map((s, i, arr) => (
                          <span key={s} className="flex items-center gap-1.5">
                            <span className="font-mono text-mist">{i + 1}</span>
                            {s}
                            {i < arr.length - 1 && <span className="text-mist">→</span>}
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-[11px] leading-relaxed text-mist">
                        Tab order always matches the visual reading order.
                      </p>
                    </div>
                    <div className="rounded-lg border border-line bg-paper-100/40 p-3">
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                        Minimum target size
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-dashed border-brand/50 text-deep">
                          <IconBell size={15} />
                        </span>
                        <span className="text-[11px] leading-relaxed text-mist">
                          44×44px minimum hit area, including icon-only controls.
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-line bg-paper-100/40 p-3">
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                        Icon-only controls, named
                      </p>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-label="View notifications"
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-deep"
                        >
                          <IconBell size={15} />
                        </button>
                        <span className="font-mono text-[10.5px] text-mist">
                          aria-label=&quot;View notifications&quot;
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg border border-line bg-paper-100/40 p-3">
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                        Disabled — not opacity alone
                      </p>
                      <span className="inline-block cursor-not-allowed rounded-lg bg-line px-3.5 py-1.5 text-[12px] font-500 text-mist">
                        Disabled
                      </span>
                      <p className="mt-2 text-[11px] leading-relaxed text-mist">
                        A distinct flat fill and lighter weight, not a faded
                        copy of the active colour.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
        </div>

        <div
          id="tokens"
          ref={(el) => {
            sectionRefs.current.tokens = el;
          }}
          data-layer-id="tokens"
          className="mt-12 scroll-mt-[140px] border-t border-line pt-12"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] text-mist">02</span>
            <h3 className="font-fraunces text-2xl font-600 text-deep">{LAYER_META.tokens.label}</h3>
          </div>
          <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-mist">{LAYER_META.tokens.kicker}</p>

          <div className="mt-6 space-y-8">
                <div>
                  <SubLabel>Token hierarchy</SubLabel>
                  <div className="grid gap-6 lg:grid-cols-3">
                    {[
                      { title: "Primitive", data: PRIMITIVE_TOKENS },
                      { title: "Semantic", data: SEMANTIC_TOKENS },
                      { title: "Component", data: COMPONENT_TOKENS },
                    ].map((col, i) => (
                      <div key={col.title} className="relative">
                        {i > 0 && (
                          <IconArrow
                            size={13}
                            className="absolute -top-5 left-0 -rotate-90 text-mist lg:-left-5 lg:top-1/2 lg:-translate-y-1/2 lg:rotate-0"
                          />
                        )}
                        <p className="mb-2 text-[11px] font-600 uppercase tracking-wide text-deep">{col.title}</p>
                        <div className="space-y-1.5">
                          {col.data.map((t) => (
                            <div key={t.name} className="flex items-center gap-2.5">
                              <span
                                className="h-3.5 w-3.5 shrink-0 rounded-sm border border-line"
                                style={{ background: t.hex }}
                              />
                              <span className="font-mono text-[10.5px] text-ink">{t.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-[11.5px] leading-relaxed text-mist">
                    Primitive tokens hold raw values. Semantic tokens give them
                    product meaning. Component tokens bind that meaning to one
                    specific part — nothing downstream ever references a hex
                    code directly.
                  </p>
                </div>

                <div>
                  <SubLabel>Named examples — brand, amber and rose in context</SubLabel>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {TOKEN_WORKED_EXAMPLES.map((row) => (
                      <div key={row.semantic} className="rounded-lg border border-line p-4">
                        <div className="flex items-center gap-2">
                          <span className="h-4 w-4 rounded-sm" style={{ background: row.hex }} />
                          <span className="font-mono text-[11px] text-deep">{row.primitive}</span>
                        </div>
                        <p className="my-1.5 pl-1 text-mist">↓</p>
                        <p className="font-mono text-[11px] text-brand-600">{row.semantic}</p>
                        <p className="my-1.5 pl-1 text-mist">↓</p>
                        <p className="text-[12.5px] font-500 text-deep">{row.component}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
        </div>

        <div
          id="components"
          ref={(el) => {
            sectionRefs.current.components = el;
          }}
          data-layer-id="components"
          className="mt-12 scroll-mt-[140px] border-t border-line pt-12"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] text-mist">03</span>
            <h3 className="font-fraunces text-2xl font-600 text-deep">{LAYER_META.components.label}</h3>
          </div>
          <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-mist">{LAYER_META.components.kicker}</p>

          <div className="mt-6 [&>*+*]:mt-8">
                {/* Actions */}
                <div>
                  <SubLabel>Actions — Button</SubLabel>
                  <p className="mb-3 text-[11.5px] text-mist">
                    Anatomy: container · icon · label · focus ring · loading indicator
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-brand px-4 py-2 text-[13px] font-600 text-deep">Primary</span>
                    <span className="rounded-lg bg-deep px-4 py-2 text-[13px] font-500 text-white">Secondary</span>
                    <span className="rounded-lg border border-line px-4 py-2 text-[13px] font-500 text-deep">
                      Ghost
                    </span>
                    <span className="rounded-lg bg-rose-500 px-4 py-2 text-[13px] font-600 text-white">
                      Destructive
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-line text-deep">
                      <IconBell size={15} />
                    </span>
                  </div>
                  <p className="mb-2 mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                    State model — Primary
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-brand px-3.5 py-1.5 text-[12px] font-600 text-deep">Default</span>
                    <span className="rounded-lg bg-brand-600 px-3.5 py-1.5 text-[12px] font-600 text-deep">Hover</span>
                    <span className="rounded-lg bg-brand px-3.5 py-1.5 text-[12px] font-600 text-deep ring-2 ring-deep/30 ring-offset-2">
                      Focus-visible
                    </span>
                    <span className="scale-95 rounded-lg bg-brand-600 px-3.5 py-1.5 text-[12px] font-600 text-deep">
                      Pressed
                    </span>
                    <span className="cursor-not-allowed rounded-lg bg-line px-3.5 py-1.5 text-[12px] font-500 text-mist">
                      Disabled
                    </span>
                    <span className="flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-1.5 text-[12px] font-600 text-deep opacity-70">
                      <span className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-deep/25 border-t-deep" />
                      Loading
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-mist">
                    Disabled is a distinct flat fill and drops the bold
                    weight — not just a faded copy of the active colour, so
                    the state still reads for low-vision and colour-vision
                    users.
                  </p>
                </div>

                {/* Inputs */}
                <div>
                  <SubLabel>Inputs</SubLabel>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <div className="rounded-lg border border-line bg-white px-3 py-2 text-[12.5px] text-deep">
                      Text field
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-[12.5px] text-mist">
                      <IconSearch size={13} /> Search
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2 text-[12.5px] text-deep">
                      Wash &amp; Fold <IconArrow size={12} className="rotate-90 text-mist" />
                    </div>
                    <div className="flex items-center gap-2 text-[12.5px] text-deep">
                      <span className="h-4 w-4 rounded border-2 border-brand bg-brand" /> Checkbox
                    </div>
                    <div className="flex items-center gap-2 text-[12.5px] text-deep">
                      <span className="h-4 w-4 rounded-full border-2 border-brand" /> Radio
                    </div>
                    <div className="rounded-lg border border-line bg-white px-3 py-2 text-[12.5px] text-deep">
                      21 Aug 2026
                    </div>
                  </div>

                  <p className="mb-2 mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                    Field states — Payment amount
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-mono text-[9.5px] uppercase tracking-[0.1em] text-mist">
                        Default
                      </label>
                      <div className="rounded-lg border border-line bg-white px-3 py-2 text-[13px] text-deep">
                        ₹1,240
                      </div>
                      <p className="mt-1 text-[11px] text-mist">Enter the amount collected from the customer.</p>
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-[9.5px] uppercase tracking-[0.1em] text-mist">
                        Error
                      </label>
                      <div className="rounded-lg border-2 border-rose-500 bg-white px-3 py-2 text-[13px] text-deep">
                        ₹—
                      </div>
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-600">
                        <span aria-hidden className="font-mono text-[12px] leading-none">
                          ×
                        </span>
                        Enter a valid payment amount.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <SubLabel>Feedback — status</SubLabel>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_SET.map((s) => (
                      <StatusChip key={s.label} tone={s.tone} dot={false}>
                        {s.icon === "check" && <IconCheck size={11} />}
                        {s.icon === "clock" && <IconClock size={11} />}
                        {s.icon === "bell" && <IconBell size={11} />}
                        {s.icon === "truck" && <IconTruck size={11} />}
                        {s.icon === "spin" && (
                          <span className="h-2 w-2 animate-spin rounded-full border-[1.5px] border-current/25 border-t-current" />
                        )}
                        {s.icon === "error" && (
                          <span aria-hidden className="font-mono text-[11px] leading-none">
                            ×
                          </span>
                        )}
                        {s.label}
                      </StatusChip>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-mist">
                    Ready/Delivered share a tone; so do Error/Overdue —
                    icon and label carry the distinction colour alone can't.
                  </p>
                  <p className="mb-2 mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                    One token, propagated everywhere
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-[11.5px]">
                    <span className="font-mono text-mist">color.status.warning</span>
                    <IconArrow size={12} className="text-mist" />
                    <StatusChip tone="amber">Warning</StatusChip>
                    <IconArrow size={12} className="text-mist" />
                    <span className="rounded-md border border-line px-2 py-1 font-mono text-[10.5px] text-deep">
                      Order row
                    </span>
                    <IconArrow size={12} className="text-mist" />
                    <span className="rounded-md border border-line px-2 py-1 text-[11px] text-deep">
                      Order detail
                    </span>
                    <IconArrow size={12} className="text-mist" />
                    <span className="rounded-md border border-line px-2 py-1 text-[11px] text-deep">
                      Notification
                    </span>
                  </div>
                </div>

                {/* Data display */}
                <div>
                  <SubLabel>Data display</SubLabel>
                  <div className="rounded-lg border border-line p-2.5 text-[11.5px]">
                    <p className="text-mist">Today&rsquo;s orders</p>
                    <p className="font-fraunces text-lg font-600 text-deep">34</p>
                  </div>
                  <p className="mb-2 mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
                    Table / card states
                  </p>
                  <div className="divide-y divide-line/70 overflow-hidden rounded-lg border border-line text-[11.5px]">
                    <div className="flex items-center justify-between px-2.5 py-1.5">
                      <span className="font-mono text-mist">Default</span>
                      <span className="text-deep">YC-2481 · Washing</span>
                    </div>
                    <div className="flex items-center justify-between bg-paper-100/60 px-2.5 py-1.5">
                      <span className="font-mono text-mist">Hover</span>
                      <span className="text-deep">YC-2481 · Washing</span>
                    </div>
                    <div className="flex items-center justify-between bg-brand-050 px-2.5 py-1.5 ring-1 ring-inset ring-brand/30">
                      <span className="font-mono text-mist">Selected</span>
                      <span className="text-deep">YC-2481 · Washing</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 text-mist">
                      <span className="font-mono">Empty</span>
                      <span>No orders match this filter</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5">
                      <span className="font-mono text-mist">Loading</span>
                      <span className="h-2 w-16 animate-pulse rounded-full bg-line" />
                    </div>
                    <div className="flex items-center justify-between bg-rose-500/5 px-2.5 py-1.5">
                      <span className="font-mono text-rose-600">Error</span>
                      <span className="text-rose-600">Couldn&rsquo;t load this order</span>
                    </div>
                  </div>
                </div>

                {/* Navigation + Overlays */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <SubLabel>Navigation</SubLabel>
                    <div className="flex gap-1 rounded-lg border border-line bg-paper-100/40 p-1 text-[11.5px]">
                      <span className="rounded-md bg-white px-2.5 py-1 font-500 text-deep shadow-sm">Orders</span>
                      <span className="px-2.5 py-1 text-mist">Customers</span>
                      <span className="px-2.5 py-1 text-mist">Payments</span>
                    </div>
                  </div>
                  <div>
                    <SubLabel>Overlays</SubLabel>
                    <div className="rounded-lg border border-line bg-white p-3 text-[11.5px] shadow-[0_20px_40px_-16px_rgba(10,26,31,0.35)]">
                      <p className="font-500 text-deep">Confirm dispatch?</p>
                      <p className="mt-1 text-mist">Route 4 · 3 orders ready</p>
                    </div>
                  </div>
                </div>
              </div>
        </div>

        <div
          id="patterns"
          ref={(el) => {
            sectionRefs.current.patterns = el;
          }}
          data-layer-id="patterns"
          className="mt-12 scroll-mt-[140px] border-t border-line pt-12"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] text-mist">04</span>
            <h3 className="font-fraunces text-2xl font-600 text-deep">{LAYER_META.patterns.label}</h3>
          </div>
          <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-mist">{LAYER_META.patterns.kicker}</p>

          <div className="mt-6 space-y-6">
                <div>
                  <SubLabel>Operational patterns</SubLabel>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {PATTERN_CHAINS.map((p) => (
                      <div key={p.name} className="rounded-lg border border-line p-4">
                        <p className="text-[13px] font-500 text-deep">{p.name}</p>
                        <div className="mt-3 space-y-1.5 text-[11px]">
                          <div className="flex gap-2">
                            <span className="w-20 shrink-0 font-mono uppercase tracking-wide text-mist">
                              Context
                            </span>
                            <span className="text-deep">{p.context}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="w-20 shrink-0 font-mono uppercase tracking-wide text-mist">
                              Decision
                            </span>
                            <span className="text-deep">{p.decision}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="w-20 shrink-0 font-mono uppercase tracking-wide text-mist">
                              Interaction
                            </span>
                            <span className="text-deep">{p.interaction}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="w-20 shrink-0 font-mono uppercase tracking-wide text-mist">
                              Result
                            </span>
                            <span className="text-mist">{p.result}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <SubLabel>Loading / error / empty</SubLabel>
                  <div className="grid gap-2 text-[11px] text-mist sm:grid-cols-3">
                    <div className="rounded-lg border border-line p-2.5">
                      <div className="h-2 w-2/3 animate-pulse rounded-full bg-line" />
                      <p className="mt-2">Loading</p>
                    </div>
                    <div className="rounded-lg border border-rose-200 bg-rose-500/5 p-2.5">
                      <p className="text-rose-600">Couldn&rsquo;t load orders — retry</p>
                      <p className="mt-1 text-[10px]">Error</p>
                    </div>
                    <div className="rounded-lg border border-line p-2.5">
                      <p>No orders match this filter</p>
                      <p className="mt-1 text-[10px]">Empty</p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => goToLayer("crm")}
                  className="inline-flex w-fit items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-brand-600 hover:text-deep"
                >
                  See the pattern applied in product <IconArrow size={12} />
                </button>
              </div>
        </div>

        <div
          id="crm"
          ref={(el) => {
            sectionRefs.current.crm = el;
          }}
          data-layer-id="crm"
          className="mt-12 scroll-mt-[140px] border-t border-line pt-12"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] text-mist">05</span>
            <h3 className="font-fraunces text-2xl font-600 text-deep">{LAYER_META.crm.label}</h3>
          </div>
          <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-mist">{LAYER_META.crm.kicker}</p>

          <div className="mt-6">
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-brand-050 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.15em] text-brand-600">
                  <IconCheck size={11} /> System in production
                </span>
                <p className="mt-3 font-fraunces text-lg font-600 text-deep">Where the system becomes product.</p>
                <div className="mt-5 max-w-sm rounded-lg border border-line">
                  <div className="border-b border-line bg-paper-100/60 px-3 py-2 font-mono text-[11px] text-mist">
                    orders / active
                  </div>
                  <div className="space-y-1.5 p-3">
                    <div className="flex items-center justify-between rounded-md bg-paper-100/60 px-2.5 py-1.5 text-[11.5px]">
                      <span className="text-mist">Priya S.</span>
                      <StatusChip tone="green" dot={false} className="px-1.5 py-0.5">
                        Ready
                      </StatusChip>
                    </div>
                    <div className="flex items-center justify-between rounded-md bg-paper-100/60 px-2.5 py-1.5 text-[11.5px]">
                      <span className="text-mist">Rohit M.</span>
                      <StatusChip tone="amber" dot={false} className="px-1.5 py-0.5">
                        Ironing
                      </StatusChip>
                    </div>
                    <div className="flex items-center justify-between rounded-md bg-paper-100/60 px-2.5 py-1.5 text-[11.5px]">
                      <span className="text-mist">Meera N.</span>
                      <StatusChip tone="rose" dot={false} className="px-1.5 py-0.5">
                        Overdue
                      </StatusChip>
                    </div>
                  </div>
                </div>
                <ul className="mt-4 grid gap-1 font-mono text-[10.5px] text-mist sm:grid-cols-2">
                  <li>Typography → dashboard hierarchy</li>
                  <li>Semantic tokens → order statuses</li>
                  <li>Components → search / buttons / badges</li>
                  <li>Patterns → active orders</li>
                  <li>Spacing → dense operational layouts</li>
                </ul>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <div className="mt-6 rounded-lg border border-line bg-white p-6 md:p-8">
        <SubLabel>Responsive</SubLabel>
        <div className="grid gap-4 sm:grid-cols-3">
          {BREAKPOINTS.map((bp) => (
            <div key={bp.name} className="rounded-lg border border-line p-3">
              <p className="text-[12.5px] font-500 text-deep">{bp.name}</p>
              <p className="font-mono text-[10.5px] text-mist">{bp.w}</p>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-mist">{bp.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-mist">
          Dense operational data reorganises rather than shrinks — a table row
          becomes a stacked card with the same fields, not a horizontally
          scrolling miniature of the desktop table.
        </p>
      </div>

      {/* Decisions — why, not what: the judgment calls behind the system,
          not another tokens→components→patterns explainer (that's already
          demonstrated by the five sections above). */}
      <div className="mt-6 rounded-lg border border-line bg-white p-6 md:p-8">
        <p className="font-fraunces text-xl font-600 text-deep">Decisions that shaped the system</p>
        <p className="mt-1.5 max-w-md text-[12.5px] leading-relaxed text-mist">
          The system is defined as much by its constraints as by its components.
        </p>

        <div className="mt-6 grid gap-x-8 gap-y-6 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] text-mist">01</p>
            <p className="mt-1 text-[12.5px] font-600 uppercase tracking-wide text-deep">
              Semantic states over visual colour
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-mist">
              Status isn&rsquo;t encoded by colour alone. Every operational
              state combines colour, iconography and text so meaning
              survives low-vision, colour-vision and monochrome contexts.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] text-mist">02</p>
            <p className="mt-1 text-[12.5px] font-600 uppercase tracking-wide text-deep">
              Data density without visual noise
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-mist">
              The CRM handles orders, payments and operational status in
              high-density views. Typography, spacing and hierarchy are
              therefore tuned for scanning rather than decoration.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] text-mist">03</p>
            <p className="mt-1 text-[12.5px] font-600 uppercase tracking-wide text-deep">
              Tokens become behaviour
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-mist">
              Primitive values are mapped to semantic roles before reaching
              components. This keeps changes to colour, status and
              interaction states controlled rather than locally overridden.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] text-mist">04</p>
            <p className="mt-1 text-[12.5px] font-600 uppercase tracking-wide text-deep">
              Accessibility is a system constraint
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-mist">
              Contrast, keyboard interaction, focus visibility, target size
              and reduced-motion behaviour are treated as component
              requirements rather than final-stage checks.
            </p>
          </div>
        </div>
      </div>

      {/* Design → code */}
      <div className="mt-6 rounded-lg border border-line bg-white p-6 md:p-8">
        <SubLabel>Design → code</SubLabel>
        <div className="space-y-2 font-mono text-[12px]">
          {[
            ["color.action.primary", "--color-action-primary"],
            ["space.200", "--space-200"],
            ["radius.md", "--radius-md"],
            ["Button / Primary", 'Button variant="primary"'],
          ].map(([a, b]) => (
            <div key={a} className="flex flex-wrap items-center gap-3">
              <span className="text-deep">{a}</span>
              <IconArrow size={12} className="text-mist" />
              <span className="text-brand-600">{b}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11.5px] text-mist">
          The system is written to be implemented, not just admired — every
          token and component name maps directly onto a build-time equivalent.
        </p>
      </div>
      </>
      )}
    </Section>
  );
}

/* ============================================================================
   09 — AI-ASSISTED WORKFLOW
============================================================================ */
export function AISection() {
  const flow = ["Problem", "UX reasoning", "Figma", "Claude", "Cursor", "Prototype", "Testing", "Iteration"];
  const human = new Set([0, 1, 2, 6]);
  return (
    <Section id="ai">
      <div className="max-w-2xl">
        <Eyebrow index="10">AI-assisted design + development</Eyebrow>
        <h2 className="mt-6 text-[clamp(1.75rem,3.2vw,2.5rem)] font-600 leading-[1.15] tracking-tight text-deep">
          AI accelerated execution.{" "}
          <span className="italic text-brand-600">Product judgment remained human.</span>
        </h2>
      </div>

      <div className="mt-14 flex flex-wrap items-stretch gap-3">
        {flow.map((f, i) => (
          <div key={f} className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`rounded-xl border px-4 py-3 text-[13px] font-500 ${
                human.has(i)
                  ? "border-brand/30 bg-brand-050 text-deep"
                  : "border-line bg-paper-100 text-mist"
              }`}
            >
              <span className="font-mono text-[10px] text-mist">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1">{f}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-mist">
                {human.has(i) ? "human" : "AI-assisted"}
              </p>
            </motion.div>
            {i < flow.length - 1 && (
              <IconArrow size={16} className="text-mist" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-6 font-mono text-[11px] text-mist">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-600" /> Human judgment
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-line" /> AI execution
        </span>
      </div>

      {/* artifact references */}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          {
            k: "Figma exploration",
            body: (
              <div className="grid grid-cols-3 gap-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-8 rounded-md bg-paper-100 ring-1 ring-line"
                  />
                ))}
              </div>
            ),
          },
          {
            k: "Claude prompt → code",
            body: (
              <pre className="overflow-hidden rounded-md bg-paper-100 p-3 font-mono text-[10.5px] leading-relaxed text-ink">
                <span className="text-brand-600">$</span> build OrderCard
                {"\n"}with status → chip mapping
                {"\n"}
                <span className="text-mist">// generating component…</span>
              </pre>
            ),
          },
          {
            k: "Working CRM",
            body: (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between rounded-md bg-paper-100 px-2.5 py-1.5 text-[11px]">
                  <span className="text-mist">YC1024</span>
                  <StatusChip tone="green" dot={false} className="px-1.5 py-0.5">
                    Ready
                  </StatusChip>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                  <div className="h-full w-3/4 rounded-full bg-brand" />
                </div>
              </div>
            ),
          },
        ].map((a, i, arr) => (
          <div
            key={a.k}
            className="relative rounded-2xl border border-line bg-white p-5"
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
              {a.k}
            </p>
            {a.body}
            {i < arr.length - 1 && (
              <IconArrow
                size={16}
                className="absolute -right-[13px] top-1/2 z-10 hidden -translate-y-1/2 text-brand-600 md:block"
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================================
   10 — ITERATION · V1/V2/V3 comparison
============================================================================ */
const VERSIONS = [
  {
    v: "V1",
    tag: "Information-heavy",
    note: "Everything visible at once. Powerful, but overwhelming for a busy counter.",
    density: 14,
    changed: ["Flat hierarchy", "All fields exposed", "Status hard to scan"],
  },
  {
    v: "V2",
    tag: "Simplified workflow",
    note: "Grouped by task. Cleaner, but a step-count problem crept in.",
    density: 4,
    changed: ["Task grouping", "Fewer fields", "Navigation added"],
  },
  {
    v: "V3",
    tag: "Operational system",
    note: "Progressive disclosure — glanceable first, detail on demand. Customer, order and payment finally read as one.",
    density: 5,
    changed: ["Glanceable first", "Status-led layout", "Customer ↔ order linked"],
  },
];

/* V1 — every field exposed at once, flat, uniform, status as plain text */
function V1Screen() {
  const fields = [
    ["Customer", "Priya Sharma"], ["Phone", "98765 XXXXX"],
    ["Address", "12, MG Road"], ["Order ID", "YC-1024"],
    ["Item 1", "Shirt × 5"], ["Item 2", "Pant × 2"],
    ["Item 3", "Saree × 1"], ["Subtotal", "₹1,240"],
    ["Discount", "₹0"], ["Tax", "Incl."],
    ["Payment method", "UPI"], ["Payment status", "Partially paid"],
    ["Pickup date", "20 Aug"], ["Delivery date", "22 Aug"],
  ];
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10.5px]">
      {fields.map(([k, v]) => (
        <div key={k} className="flex items-center justify-between border-b border-line/60 py-1.5">
          <span className="truncate text-mist">{k}</span>
          <span className="truncate font-500 text-ink">{v}</span>
        </div>
      ))}
    </div>
  );
}

/* V2 — grouped by task, but now behind a tab bar (the "step-count problem") */
function V2Screen() {
  const tabs = ["Customer", "Order", "Payment", "Delivery"];
  return (
    <div className="text-[12px]">
      <div className="mb-4 flex gap-1 border-b border-line pb-2">
        {tabs.map((t, i) => (
          <span
            key={t}
            className={`rounded-md px-2.5 py-1 text-[10.5px] ${
              i === 1 ? "bg-deep text-white" : "text-mist"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.15em] text-mist">
        Order details
      </p>
      <div className="space-y-2 rounded-lg border border-line p-3">
        <div className="flex items-center justify-between">
          <span className="text-mist">Items</span>
          <span className="font-500 text-ink">5 Shirts, 2 Pants, 1 Saree</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-mist">Total</span>
          <span className="font-500 text-ink">₹1,240</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-mist">Status</span>
          <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10.5px] text-amber-700">
            Washing
          </span>
        </div>
      </div>
    </div>
  );
}

/* V3 — glanceable, status-led, customer and order read as one record */
function V3Screen() {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] text-mist">YC-1024</p>
          <p className="font-fraunces text-xl font-600 text-deep">Priya Sharma</p>
          <p className="mt-0.5 text-[12px] text-mist">5 Shirts · 2 Pants · 1 Saree</p>
        </div>
        <StatusChip tone="amber">Washing</StatusChip>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-paper-100/60 px-3 py-2.5 text-[12.5px]">
        <span className="text-mist">₹1,240 total</span>
        <span className="font-500 text-brand-600">₹800 paid · ₹440 pending</span>
      </div>
    </div>
  );
}

export function IterationSection() {
  const [active, setActive] = useState(2);
  const cur = VERSIONS[active];
  return (
    <Section id="iteration" className="bg-paper-100/40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <Eyebrow index="11">Iteration & validation</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.75rem,3.2vw,2.5rem)] font-600 leading-[1.15] tracking-tight text-deep">
            The first version wasn&rsquo;t the answer. It was the question.
          </h2>
        </div>
        <div className="flex gap-2">
          {VERSIONS.map((v, i) => (
            <button
              key={v.v}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-2 font-mono text-[12px] transition-colors ${
                active === i
                  ? "bg-deep text-white"
                  : "border border-line text-mist hover:text-deep"
              }`}
            >
              {v.v}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <WindowChrome title={`counter-view / ${cur.v.toLowerCase()}`} />
          <div className="p-6">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {active === 0 && <V1Screen />}
                {active === 1 && <V2Screen />}
                {active === 2 && <V3Screen />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="font-mono text-[12px] text-brand-600">{cur.v}</span>
            <p className="mt-2 text-2xl font-600 text-deep">
              {cur.tag}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-mist">{cur.note}</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-mist">
                Fields on screen
              </span>
              <span className="tnum text-xl font-600 text-deep">
                {cur.density}
              </span>
            </div>
            <div className="mt-6 border-t border-line pt-5">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                What changed
              </p>
              <ul className="space-y-2">
                {cur.changed.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-[13.5px] text-deep">
                    <IconCheck size={14} className="text-brand-600" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================================
   11 — OUTCOMES
============================================================================ */
type Outcome = {
  title: string;
  body: string;
  evidence: () => React.ReactNode;
};

const OUTCOMES: Outcome[] = [
  {
    title: "One customer record",
    body: "Customer information is created once and stays connected to every order that follows.",
    evidence: () => (
      <div className="flex items-center gap-3 rounded-lg bg-paper-100 px-3 py-2.5 text-[12px]">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-deep font-fraunces text-[12px] font-600 text-brand">
          PS
        </span>
        <div className="min-w-0">
          <p className="truncate font-500 text-deep">Priya Sharma</p>
          <p className="truncate text-mist">12 orders · current: YC-1024</p>
        </div>
      </div>
    ),
  },
  {
    title: "Connected order lifecycle",
    body: "Customer → Order → Payment → Processing → Delivery are represented as one operational flow, not five separate records.",
    evidence: () => (
      <div className="flex flex-wrap items-center gap-1.5 text-[10.5px]">
        {["Received", "Washing", "Ironing", "Ready", "Delivered"].map((s, i) => (
          <span
            key={s}
            className={`rounded-full px-2 py-1 ${
              i === 1 ? "bg-brand text-deep" : "bg-paper-100 text-mist"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "Visible payment status",
    body: "Paid, pending and outstanding amounts are visible directly within the order — not in a separate note or memory.",
    evidence: () => (
      <div className="flex items-center justify-between rounded-lg bg-paper-100 px-3 py-2.5 text-[12px]">
        <span className="text-mist">₹1,240 total</span>
        <span className="font-500 text-brand-600">₹800 paid · ₹440 pending</span>
      </div>
    ),
  },
  {
    title: "Reduced spreadsheet dependency",
    body: "The CRM brings customer, order and payment information into one operational surface — not re-typed across a shared sheet.",
    evidence: () => (
      <div className="space-y-1.5 font-mono text-[10.5px]">
        <div className="flex gap-3 text-mist line-through decoration-rose-400/40">
          <span className="w-14">Priya</span>
          <span className="w-12">₹1,240</span>
          <span>status: —</span>
        </div>
        <div className="flex gap-3 text-brand-600">
          <span className="w-14">Priya</span>
          <span className="w-12">₹1,240</span>
          <span>Washing</span>
        </div>
      </div>
    ),
  },
  {
    title: "Foundation for future automation",
    body: "A structured customer / order / payment model creates a foundation for future automation and AI-assisted operations.",
    evidence: () => (
      <div className="flex flex-wrap items-center gap-1.5 text-[10.5px]">
        {["Customer", "Order", "Payment"].map((s) => (
          <span key={s} className="rounded-full bg-paper-100 px-2 py-1 text-mist">
            {s}
          </span>
        ))}
        <IconArrow size={12} className="text-mist" />
        <span className="rounded-full border border-dashed border-line px-2 py-1 text-mist">
          Automation →
        </span>
      </div>
    ),
  },
];

export function OutcomesSection() {
  return (
    <Section id="outcomes">
      <Eyebrow index="12">Outcomes</Eyebrow>
      <h2 className="mt-6 max-w-2xl text-[clamp(1.75rem,3.2vw,2.5rem)] font-600 leading-[1.15] tracking-tight text-deep">
        Built for the people running the business.
      </h2>
      <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-mist">
        Not measured metrics — the concrete, verifiable state the system is now
        in, with the interface that backs each one up.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {OUTCOMES.map((o, i) => (
          <motion.div
            key={o.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-line bg-white p-6"
          >
            <span className="font-mono text-[11px] text-brand-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 text-xl font-600 leading-snug tracking-tight text-deep">
              {o.title}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-mist">{o.body}</p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.08 + 0.15, duration: 0.5 }}
              className="mt-4"
            >
              {o.evidence()}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export { useScroll, useTransform };
