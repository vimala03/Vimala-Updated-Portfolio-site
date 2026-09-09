import { useEffect, useRef, useState } from "react";
import {
  motion,
  Reveal,
  Eyebrow,
  StatusChip,
  WindowChrome,
  useTransform,
  DecisionNote,
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
} from "./icons";

/* ============================================================================
   Section shell
============================================================================ */
export function Section({
  id,
  dark = false,
  className = "",
  children,
  maxWidth = "1200",
}: {
  id?: string;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
  /* Optional override for the inner container width — every existing
     section keeps the default 1200px unchanged; only DashboardShowcase
     passes "1280" to match the hero's own container width. */
  maxWidth?: "1200" | "1280";
}) {
  return (
    <section
      id={id}
      className={`relative px-6 py-14 md:px-10 md:py-20 ${
        dark ? "bg-deep text-white" : "bg-paper text-ink"
      } ${className}`}
    >
      <div className={`mx-auto w-full ${maxWidth === "1280" ? "max-w-[1280px]" : "max-w-[1200px]"}`}>{children}</div>
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
            <span className="italic text-brand-700">everywhere</span>.
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
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-paper-100 text-deep-600 transition-colors group-hover:bg-brand-050 group-hover:text-brand-700">
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
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-paper-100 text-brand-700">
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
          <span className="italic text-brand-700">one cumbersome workflow</span>.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-mist">
          Every order moved through multiple manual touchpoints before it reached
          the customer.
        </p>
        {/* Why it mattered — the same real line used again as this
           section's own resolved-state callout, below, surfaced here
           too so the reasoning lands before the chain, not only after
           it. */}
        <p className="mt-3 text-[13px] font-500 italic leading-snug text-brand-700">
          Too many places to look. Too many places to update.
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
        <p className="mt-4 text-[clamp(1.15rem,2.1vw,1.7rem)] font-600 tracking-tight text-brand-700">
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
          tone === "green" ? "text-brand-700" : tone === "teal" ? "text-deep" : "text-ink"
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
          {/* Makes explicit that this is a product architecture decision,
             not just a timeline widget — customer/order/payment/delivery
             are the same real stage names used throughout the rest of
             the case study, not new vocabulary. */}
          <p className="mt-4 text-[13.5px] text-mist">
            Customer, order, payment and delivery, represented as one
            connected record instead of seven separate steps. Select any
            stage below to inspect it directly.
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
                        className={`font-mono text-[12px] ${on ? "text-brand-700" : "text-mist"}`}
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

          {/* Insight → Decision → Product response — the same real facts
             already stated above (Section 02's "a customer detail in one
             place, the order in another" / this section's own "single
             record" and "one profile"), made explicit as the product
             decision they are rather than left implicit in the paragraph. */}
          <DecisionNote
            insight="A customer detail in one place, the order in another, the payment remembered by whoever took the cash."
            decision="Make the customer record the one thread every order and interaction connects back to."
            response="Order history, payment standing and recent activity, in one profile."
          />
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

          {/* Insight → Decision → Product response — ties the six brittle
             hand-offs from Section 03 directly to this section's own real
             resolution, using that section's own words. */}
          <DecisionNote
            insight="Too many places to look. Too many places to update."
            decision="Give every order one real state change, not six separate hand-offs."
            response="Logged, timestamped and visible to the whole team — no more “let me check and call you back.”"
          />

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
                      className="ml-auto font-mono text-[11px] text-brand-700"
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

          {/* Insight → Decision → Product response — connects the operational
             problem (payments tracked separately, from Section 03's hand-off
             chain) to the design decision and its business/operational
             effect, using this section's own real copy throughout. */}
          <DecisionNote
            insight="Payments tracked separately, easy to lose."
            decision="Every order carries its own ledger: total, paid, pending."
            response="Balances update the moment cash or UPI lands, before outstanding amounts are forgotten."
          />

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
                  <IconCheck size={13} className="text-brand-700" /> ₹440 collected
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
          tone ? "text-brand-700" : warn ? "text-amber-600" : "text-deep"
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
/* the one worked example, referenced by the architecture diagram */
const ARCHITECTURE_CHAIN = [
  { layer: "Foundations", example: "Brand / 500" },
  { layer: "Semantic token", example: "color.action.primary" },
  { layer: "Component", example: "Button / Primary" },
  { layer: "Pattern", example: "Order workflow" },
  { layer: "Product", example: "YouClean CRM" },
];

/* small uppercase mono label reused across every foundation/section block */
function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">{children}</p>
  );
}

export function DesignSystemSection() {
  return (
    <Section id="system" className="relative overflow-hidden bg-paper-100/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-[48%_52%_44%_56%/56%_44%_58%_42%] bg-[rgba(158,196,163,0.16)]"
      />
      <div className="relative max-w-2xl">
        <div className="flex items-center gap-3">
          <p className="shrink-0 text-[11px] font-500 uppercase tracking-[0.14em] text-rust">
            09 · YouClean / Design system
          </p>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-[clamp(1.9rem,3.2vw,2.75rem)] font-600 leading-[1.12] tracking-tight text-ink">
          Design infrastructure for{" "}
          <em className="font-500 not-italic text-brand-700">an operational product.</em>
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-mist">
          Foundations, tokens, components and interaction patterns built to
          support a growing CRM without sacrificing clarity, accessibility or
          consistency.
        </p>
        {/* One line making explicit what the architecture chain and the
           patterns below it (role permissions, audit logging, status
           states) already demonstrate — visibility as the design
           material, not a new claim. */}
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-mist">
          Visibility was the design material: every status, permission and
          logged action exists to make an operational fact visible and
          attributable, not just to fill a screen.
        </p>
      </div>

      {/* System architecture — the relationship the whole section exists to
         make legible (primitives → semantic tokens → components →
         patterns → product), sized to feel like the section's own
         substantial artifact rather than a small reference table. */}
      <div className="relative mt-7 rounded-2xl border border-line/70 bg-white p-6 shadow-[0_20px_50px_-32px_rgba(10,26,31,0.2)] sm:p-7">
        <SubLabel>System architecture</SubLabel>
        <div className="flex flex-wrap items-center gap-2.5 text-[13px]">
          {["Foundations", "Primitive tokens", "Semantic tokens", "Components", "Patterns", "Product"].map(
            (s, i, arr) => (
              <div key={s} className="flex items-center gap-2.5">
                <span className="rounded-md border border-line bg-paper-100/60 px-3 py-2 text-deep">
                  {s}
                </span>
                {i < arr.length - 1 && <IconArrow size={13} className="text-mist" />}
              </div>
            ),
          )}
        </div>
        <div className="mt-5 grid gap-4 border-t border-line pt-5 sm:grid-cols-5">
          {ARCHITECTURE_CHAIN.map((step) => (
            <div key={step.layer} className="flex items-center gap-2 sm:flex-col sm:items-start sm:gap-1.5">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.15em] text-mist">
                {step.layer}
              </span>
              <span className="font-mono text-[13px] text-brand-700">{step.example}</span>
            </div>
          ))}
        </div>
      </div>
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
          <span className="italic text-brand-700">Product judgment remained human.</span>
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
                <span className="text-brand-700">$</span> build OrderCard
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
                className="absolute -right-[13px] top-1/2 z-10 hidden -translate-y-1/2 text-brand-700 md:block"
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
/* Each version's `note` from before is split at its own existing sentence
   break into `assumption` (what V1/V2 started from) and `learned` (what
   using it surfaced) — no new wording, just the same sentence labelled as
   the two things it already was. */
const VERSIONS = [
  {
    v: "V1",
    tag: "Information-heavy",
    assumption: "Everything visible at once.",
    learned: "Powerful, but overwhelming for a busy counter.",
    density: 14,
    changed: ["Flat hierarchy", "All fields exposed", "Status hard to scan"],
  },
  {
    v: "V2",
    tag: "Simplified workflow",
    assumption: "Grouped by task.",
    learned: "Cleaner, but a step-count problem crept in.",
    density: 4,
    changed: ["Task grouping", "Fewer fields", "Navigation added"],
  },
  {
    v: "V3",
    tag: "Operational system",
    assumption: "Progressive disclosure — glanceable first, detail on demand.",
    learned: "Customer, order and payment finally read as one.",
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
        <span className="font-500 text-brand-700">₹800 paid · ₹440 pending</span>
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
            <span className="font-mono text-[12px] text-brand-700">{cur.v}</span>
            <p className="mt-2 text-2xl font-600 text-deep">
              {cur.tag}
            </p>

            {/* V1 assumption → what I learned → what changed: the version
               wasn't just an early visual draft, it was a hypothesis that
               generated a specific, real piece of learning. */}
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
              {cur.v} assumption
            </p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-deep">{cur.assumption}</p>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
              What I learned
            </p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-mist">{cur.learned}</p>

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
                    <IconCheck size={14} className="text-brand-700" />
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
        <span className="font-500 text-brand-700">₹800 paid · ₹440 pending</span>
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
        <div className="flex gap-3 text-brand-700">
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
            <span className="font-mono text-[11px] text-brand-700">
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
