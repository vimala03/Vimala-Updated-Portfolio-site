import { useRef } from "react";
import { motion, Eyebrow } from "./primitives";
import { useScroll, useTransform, MotionConfig } from "framer-motion";
import { NextProjectCTA } from "../case-study";
import { DashboardMock, OperationsMock } from "./crm";
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
import { IconArrow } from "./icons";

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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden px-6 pt-16 md:px-10 md:pt-24">
      <div className="mx-auto max-w-[1200px]">
        {/* metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-mist"
        >
          <span className="text-brand-600">YouClean</span>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <span>Product Design / UX / AI-Assisted Development</span>
        </motion.div>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-4xl text-[clamp(2.5rem,5.2vw,4.5rem)] font-600 leading-[1.02] tracking-tight text-deep"
        >
          From fragmented laundry operations to{" "}
          <span className="italic text-brand-600">one connected system.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-8 max-w-xl text-[17px] leading-relaxed text-mist"
        >
          I designed and built YouClean CRM to bring customers, orders, payments
          and delivery into one operational workflow.
        </motion.p>

        {/* meta table */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-3"
        >
          {[
            ["Role", "Lead product designer & builder"],
            ["Timeline", "Q2 2026 · 9 weeks"],
            ["Platform", "Web · Desktop-first"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                {k}
              </dt>
              <dd className="mt-2 text-[14px] font-500 leading-snug text-deep">
                {v}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* oversized dashboard, emerging from the hero, extends beyond viewport */}
      <div className="relative mt-16 md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 110, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ y, scale }}
          className="mx-auto w-full max-w-[1720px] px-0 md:-mx-6 md:pl-10 lg:-mr-[8vw] lg:pl-[6vw] xl:-mr-[10vw]"
        >
          <DashboardMock />
        </motion.div>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
          Illustrative interface data — not verified business results
        </p>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   07 — Dashboard showcase
---------------------------------------------------------------------------- */
function DashboardShowcase() {
  return (
    <Section id="dashboard">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <Eyebrow index="08">Operations dashboard</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.75rem,3.2vw,2.5rem)] font-600 leading-[1.15] tracking-tight text-deep">
            The live floor, on one screen.
          </h2>
        </div>
        <p className="max-w-xs text-[14px] leading-relaxed text-mist">
          Today&rsquo;s orders, revenue, pending payments, processing and
          delivery — plus the alerts that need a human, surfaced first.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12"
      >
        <OperationsMock />
      </motion.div>
      <p className="mt-4 text-right font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
        Illustrative interface data
      </p>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   Final / CTA
---------------------------------------------------------------------------- */
function Final() {
  return (
    <Section id="final">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow index="—">
          <span className="mx-auto">The operating layer</span>
        </Eyebrow>
        <h2 className="mt-8 text-[clamp(1.75rem,3.2vw,2.5rem)] font-600 leading-[1.15] tracking-tight text-deep">
          The CRM became the operating layer connecting{" "}
          <span className="italic text-brand-600">YouClean.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[16px] leading-relaxed text-mist">
          One record from first contact to repeat order — and a foundation
          steady enough to automate on next.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[14px] font-600 text-deep transition-transform hover:-translate-y-0.5"
          >
            Explore the live CRM <IconArrow size={15} />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-deep/20 px-6 py-3 text-[14px] font-500 text-deep transition-colors hover:bg-deep hover:text-white"
          >
            More work
          </a>
        </div>
      </div>

      <div className="mx-auto mt-20 w-full max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <DashboardMock />
        </motion.div>
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
          the live homepage's own project order (SelectedWork.tsx): YouClean
          is 01, Cornerstone — "AI-Powered Search & Decision Optimization" —
          is 02. */}
      <NextProjectCTA
        label="Next case study →"
        title="AI-Powered Search & Decision Optimization"
        href="/work/cornerstone"
      />
    </MotionConfig>
  );
}
