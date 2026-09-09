import { motion, DecisionNote } from "./primitives";
import { MotionConfig } from "framer-motion";
import { NextProjectCTA } from "../case-study";
import { OperationsMock } from "./crm";
import { IconArrow } from "./icons";
import {
  ProblemSection,
  TransformationSection,
  WorkflowSection,
  CustomerSection,
  OrderSection,
  PaymentSection,
  DesignSystemSection,
  AISection,
  IterationSection,
  OutcomesSection,
  Section,
} from "./sections";

/* ----------------------------------------------------------------------------
   Ported from the Figma Make prototype's App.tsx. Two things were dropped on
   purpose, not simplified: the prototype's own in-page `Nav` (this case study
   now lives under the portfolio's shared Navbar, matching every other case
   study — no page gets its own bespoke nav) and the `Final` section's inline
   `<footer>` tag (replaced by the portfolio's shared Footer). Section 03
   (`TransformationSection`, imported unmodified from ./sections) is the
   locked composition and is not touched here.
---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------
   Hero
---------------------------------------------------------------------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-8 md:px-10 md:pt-12">
      <div className="relative mx-auto max-w-[1280px]">
        {/* Laundry-inspired background motif — a large sage field bleeding
           off the top-right corner, the same restrained shape language used
           on the Homepage and Cornerstone. Kept behind the CRM visual and
           text column, never competing with either. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-8 h-56 w-56 rounded-[55%_45%_60%_40%/48%_52%_48%_52%] bg-[rgba(158,196,163,0.22)] sm:h-72 sm:w-72 lg:-right-8 lg:-top-6 lg:h-[30rem] lg:w-[30rem]"
        />

        {/* Row 1 — the actual first-fold composition: metadata, section
           label, headline, supporting copy and the three problem points on
           the left; the CRM visual dominant on the right. Kept deliberately
           compact (tighter type scale, tighter gaps) so this whole row sits
           within one 1440×900 viewport alongside the nav — no absolute
           positioning or scroll-linked transforms are used to force the
           visual into place; it simply sits in its own grid track. */}
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-12">
          {/* Left — narrative column */}
          <div className="order-1 lg:col-start-1">
            {/* metadata — unchanged, real project byline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist"
            >
              <span className="text-brand-700">YouClean</span>
              <span className="hidden h-3 w-px bg-line sm:block" />
              <span>Product Design / UX / AI-Assisted Development</span>
            </motion.div>

            {/* numbered eyebrow — same structural device used from Section
               02 onward, extended to the hero for a consistent editorial
               opening. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-5 flex items-center gap-3"
            >
              <p className="shrink-0 text-[11px] font-500 uppercase tracking-[0.14em] text-rust">
                01 · The opportunity
              </p>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
            </motion.div>

            {/* headline — real, unchanged wording. Sized to wrap to 2–3
               tight lines within this column at 1440px, not 4+, so the row
               stays compact enough for the first-fold requirement. */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-[clamp(1.9rem,3.2vw,2.75rem)] font-600 leading-[1.12] tracking-tight text-ink"
            >
              From fragmented laundry operations to{" "}
              <em className="font-500 not-italic text-brand-700">one connected system.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-4 max-w-md text-[15px] leading-relaxed text-mist"
            >
              I designed and built YouClean CRM to bring customers, orders, payments
              and delivery into one operational workflow.
            </motion.p>

            {/* Three supporting points — condensed from the same real facts
               already established in Sections 02–03 (seven disconnected
               surfaces, hand-written paper slips, payments tracked
               separately), not new claims. */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {[
                {
                  title: "Multiple touchpoints",
                  body: "Customers, orders, payments and delivery, spread across seven disconnected surfaces.",
                },
                {
                  title: "Manual tracking",
                  body: "Orders written on paper slips; payments tracked separately, easy to lose.",
                },
                {
                  title: "No shared source of truth",
                  body: "Nothing spoke to anything else: the same detail retyped in three different places.",
                },
              ].map((p) => (
                <div key={p.title}>
                  <p className="text-[13px] font-600 text-ink">{p.title}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-mist">{p.body}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — the attached CRM dashboard visual. Illustrative, not a
             production screenshot (flagged plainly in the alt text), used
             here in place of hand-coding a dashboard mock-up. Framed at its
             own native 3:2 aspect ratio — no cropping — so the full
             interface stays legible. Two small laundry-inspired motifs — a
             washing-drum double-ring and a dashed motion path — sit behind
             the image at a lower z-index, peeking out only where they
             extend past its corners. */}
          <div className="relative order-2 lg:col-start-2">
            <svg
              aria-hidden="true"
              viewBox="0 0 200 200"
              className="pointer-events-none absolute -bottom-8 -left-8 z-0 hidden h-28 w-28 opacity-[0.35] lg:block"
            >
              <circle cx="100" cy="100" r="92" fill="none" stroke="#003648" strokeWidth="2" />
              <circle cx="100" cy="100" r="68" fill="none" stroke="#003648" strokeWidth="1.5" />
            </svg>
            <svg
              aria-hidden="true"
              viewBox="0 0 240 120"
              className="pointer-events-none absolute -right-6 -top-6 z-0 hidden h-14 w-28 opacity-50 lg:block"
            >
              <path
                d="M10,90 C60,10 180,10 230,60"
                fill="none"
                stroke="#00b86e"
                strokeWidth="1.5"
                strokeDasharray="3,5"
                strokeLinecap="round"
              />
            </svg>
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_30px_80px_-30px_rgba(10,26,31,0.3)]"
            >
              <img
                src="/images/case-studies/youclean-dashboard-real.png"
                alt="YouClean CRM Business Manager dashboard: today's total orders, revenue, in-progress and ready-for-pickup counts, monthly revenue trend, service distribution, today's schedule, low inventory and recent orders."
                className="block w-full"
              />
            </motion.div>
          </div>
        </div>

        {/* Row 2 — project facts and the opportunity callout. Not part of
           the first-fold requirement, so it sits below Row 1 rather than
           competing with it for vertical space; still visible with a small
           amount of natural scroll, not a second full screen. */}
        <div className="mt-10 flex flex-col gap-6 border-t border-line pt-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <motion.dl
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-x-6 gap-y-4 lg:max-w-md"
          >
            {[
              ["Role", "Founder · Product Designer · Builder"],
              ["Timeline", "Q2 2026 · 9 weeks"],
              ["Platform", "Web · Desktop-first"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-mist">
                  {k}
                </dt>
                <dd className="mt-2 text-[13px] font-500 leading-snug text-ink">
                  {v}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Insight callout — the same real "one connected system" /
             "first contact" language already used at the close of
             Section 03 and the head of Section 04, surfaced here as the
             hero's closing thought rather than new copy. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-xl bg-brand-050 px-5 py-4 lg:max-w-sm"
          >
            <p className="text-[14px] leading-relaxed text-ink">
              The opportunity:{" "}
              <span className="font-600 text-brand-700">one connected system</span>,
              from first contact to repeat order.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   07 — Dashboard showcase
---------------------------------------------------------------------------- */
function DashboardShowcase() {
  return (
    <Section id="dashboard" className="relative overflow-hidden" maxWidth="1280">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-16 hidden h-80 w-80 rounded-[55%_45%_60%_40%/48%_52%_48%_52%] bg-[rgba(158,196,163,0.2)] lg:block"
      />
      <div className="relative max-w-2xl">
        <div className="flex items-center gap-3">
          <p className="shrink-0 text-[11px] font-500 uppercase tracking-[0.14em] text-rust">
            08 · Operations dashboard
          </p>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-[clamp(1.9rem,3.2vw,2.75rem)] font-600 leading-[1.12] tracking-tight text-ink">
          The live floor,{" "}
          <em className="font-500 not-italic text-brand-700">on one screen.</em>
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-mist">
          Today&rsquo;s orders, revenue, pending payments, processing and
          delivery, plus the alerts that need a human, surfaced first.
        </p>

        {/* Insight → Decision → Product response — the same "7 disconnected
           surfaces" figure from Section 02's problem framing, resolved
           here as one shared operational view instead of restated as a
           new claim. */}
        <DecisionNote
          insight="7 disconnected surfaces, 0 shared source of truth."
          decision="One live operational view, not seven separate ones."
          response="The alerts that need a human, surfaced first."
        />
      </div>

      {/* Large, real-visual-led — the screenshot is the strongest visual
         moment in the case study, so the surrounding text stays minimal
         and two small annotations (both exact phrases from the paragraph
         above, not new claims) point at the regions they describe rather
         than restating them. */}
      <div className="relative mt-9">
        <p className="pointer-events-none absolute -top-7 right-0 hidden max-w-[190px] text-right text-[12px] italic leading-snug text-mist lg:block">
          Today&rsquo;s orders, revenue, pending payments.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl border border-line/70 shadow-[0_30px_80px_-30px_rgba(10,26,31,0.3)]">
            <OperationsMock />
          </div>
        </motion.div>
        <p className="pointer-events-none absolute -bottom-8 left-0 hidden max-w-[190px] text-[12px] italic leading-snug text-mist lg:block">
          The alerts that need a human, surfaced first.
        </p>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   Final / CTA
---------------------------------------------------------------------------- */
function Final() {
  return (
    <Section id="final" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-[55%_45%_60%_40%/48%_52%_48%_52%] bg-[rgba(158,196,163,0.2)]"
      />
      {/* Closing statement only — no repeated dashboard visual and no
         "Explore the live CRM" CTA, and no "More work" link either (removed
         in a later pass). The case study closes on its own content; the
         CRM/dashboard already appears earlier wherever it supports a
         specific part of the story (hero, order lifecycle, payments,
         operations dashboard), so it isn't repeated again here as a
         standalone closing moment, and the page flows straight into the
         shared NextProjectCTA / footer treatment below. */}
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-500 uppercase tracking-[0.14em] text-rust">
          Continuing the journey
        </p>
        <div className="mx-auto mt-3 h-px w-full max-w-2xl bg-line" aria-hidden="true" />

        {/* A four-word recap of the case study's own arc — each word is
           vocabulary already established earlier on this exact page
           (fragmented: the Hero/Problem framing; connected: "one
           connected system", Sections 01/03; visible: Section 06's "real
           state change... visible to the whole team" and Section 08's
           "live floor"; operating layer: this section's own real
           headline, below) — not a new claim, just the through-line made
           visible before the closing statement says it in full. */}
        <div className="mx-auto mt-7 flex max-w-md items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-mist">
          {["Fragmented", "Connected", "Visible", "Operating layer"].map((w, i, arr) => (
            <span key={w} className="flex items-center gap-2">
              <span className={i === arr.length - 1 ? "text-brand-700" : ""}>{w}</span>
              {i < arr.length - 1 && <IconArrow size={11} className="text-line" />}
            </span>
          ))}
        </div>

        {/* The strongest typographic moment in the case study — larger and
           bolder than every other headline on the page, since this is the
           line the whole story has been building toward. */}
        <h2 className="mt-6 text-[clamp(2.5rem,5vw,4rem)] font-600 leading-[1.05] tracking-tight text-ink">
          The CRM became the operating layer{" "}
          <em className="font-500 not-italic text-brand-700">connecting YouClean.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[16px] leading-relaxed text-mist">
          One record from first contact to repeat order, and a foundation
          steady enough to automate on next.
        </p>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   Assembled case-study body — mounted by YouCleanPage between the portfolio's
   shared Navbar and Footer.
---------------------------------------------------------------------------- */
export default function CaseStudyContent() {
  return (
    <MotionConfig reducedMotion="user">
      {/* overflow-x-clip (not -hidden): identical visual clipping of horizontal
          overflow, but — unlike `hidden` — it doesn't force the browser to
          also compute overflow-y as an implicit scroll container, which was
          silently breaking every `position: sticky` descendant on this page
          (the Design System section's layer nav in particular). */}
      <div className="crm-case-study min-h-screen overflow-x-clip bg-paper text-ink">
        <Hero />
        <ProblemSection />
        <TransformationSection />
        <WorkflowSection />
        <CustomerSection />
        <OrderSection />
        <PaymentSection />
        <DashboardShowcase />
        <DesignSystemSection />
        <AISection />
        <IterationSection />
        <OutcomesSection />
        <Final />
      </div>

      {/* Next case study — the same shared component every other case study
          already ends on (outside .crm-case-study so it uses the homepage's
          own --cs-* tokens, not the CRM's bespoke palette). Target follows
          the live homepage's own five-project order (SelectedWork.tsx):
          Cornerstone is 01, YouClean is 02, Content Manager Metadata
          Generation is 03 — so YouClean's next case study is 03, not back
          to Cornerstone (01). */}
      <NextProjectCTA
        label="Next case study →"
        title="Content Manager Metadata Generation"
        href="/work/content-manager-metadata"
      />
    </MotionConfig>
  );
}
