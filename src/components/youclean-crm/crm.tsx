import { motion, CountUp, StatusChip, WindowChrome } from "./primitives";
import {
  IconGrid,
  IconUsers,
  IconBag,
  IconRupee,
  IconTruck,
  IconBell,
  IconSearch,
  IconChart,
  IconClock,
  IconCheck,
} from "./icons";

/* ============================================================================
   DashboardMock — the oversized working-product composition
============================================================================ */
const NAV = [
  { icon: IconGrid, label: "Dashboard", active: true },
  { icon: IconUsers, label: "Customers" },
  { icon: IconBag, label: "Orders" },
  { icon: IconRupee, label: "Payments" },
  { icon: IconTruck, label: "Delivery" },
  { icon: IconChart, label: "Reports" },
];

const ORDERS = [
  { id: "YC-2481", name: "Anaya Kulkarni", items: "12 pcs · Wash & Fold", amt: "₹640", tone: "amber", status: "Washing" },
  { id: "YC-2480", name: "Rohit Menon", items: "1 Sherwani · Dry Clean", amt: "₹520", tone: "teal", status: "Ironing" },
  { id: "YC-2479", name: "Priya Sharma", items: "8 pcs · Wash & Iron", amt: "₹410", tone: "green", status: "Ready" },
  { id: "YC-2478", name: "Imran Qureshi", items: "Bedding Set", amt: "₹780", tone: "green", status: "Delivered" },
  { id: "YC-2477", name: "Meera Nair", items: "5 Sarees · Steam", amt: "₹950", tone: "rose", status: "Pickup due" },
];

const REV = [42, 55, 48, 63, 58, 74, 69, 88, 81, 96, 92, 108];

export function DashboardMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_40px_120px_-40px_rgba(0,54,72,0.45)]">
      <WindowChrome title="app.youclean.crm / operations" />
      <div className="flex min-h-[520px] text-ink">
        {/* Sidebar */}
        <aside className="hidden w-52 shrink-0 flex-col border-r border-line bg-paper-100/50 p-4 md:flex">
          <div className="mb-6 flex items-center gap-2 px-1">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-deep text-brand">
              <IconBag size={15} />
            </span>
            <span className="font-fraunces text-[15px] font-600 tracking-tight text-deep">
              YouClean
            </span>
          </div>
          <nav className="flex flex-col gap-0.5">
            {NAV.map((n) => (
              <div
                key={n.label}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${
                  n.active
                    ? "bg-white font-500 text-deep shadow-sm ring-1 ring-line"
                    : "text-mist"
                }`}
              >
                <n.icon size={16} />
                {n.label}
              </div>
            ))}
          </nav>
          <div className="mt-auto rounded-xl border border-brand/25 bg-brand-050 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-600">
              Ops health
            </p>
            <p className="mt-1 font-fraunces text-2xl font-600 text-deep">98%</p>
            <p className="text-[11px] text-deep-600">On-time delivery, 7d</p>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 p-5 md:p-6">
          {/* topbar */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                Thursday, 21 Aug
              </p>
              <h3 className="font-fraunces text-xl font-600 tracking-tight text-deep">
                Operations overview
              </h3>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex items-center gap-2 rounded-lg border border-line bg-paper-100/60 px-3 py-2 text-[12px] text-mist">
                <IconSearch size={14} /> Search orders, customers…
              </div>
              <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-line text-deep">
                <IconBell size={16} />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-600" />
              </button>
            </div>
          </div>

          {/* stat tiles */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatTile label="Today's orders" value={<CountUp to={34} />} sub="+6 vs yest." tone />
            <StatTile
              label="Revenue"
              value={<CountUp to={41280} prefix="₹" />}
              sub="Collected today"
            />
            <StatTile
              label="Pending payments"
              value={<CountUp to={9640} prefix="₹" />}
              sub="7 orders"
              warn
            />
            <StatTile label="In processing" value={<CountUp to={18} />} sub="Ready: 5" />
          </div>

          {!compact && (
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {/* orders table */}
              <div className="rounded-xl border border-line bg-white lg:col-span-2">
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <p className="text-[13px] font-500 text-deep">Active orders</p>
                  <span className="font-mono text-[11px] text-mist">Live</span>
                </div>
                <div className="divide-y divide-line">
                  {ORDERS.map((o) => (
                    <div
                      key={o.id}
                      className="flex items-center gap-3 px-4 py-2.5 text-[12.5px] transition-colors hover:bg-paper-100/50"
                    >
                      <span className="font-mono text-[11px] text-mist">{o.id}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-500 text-ink">{o.name}</p>
                        <p className="truncate text-[11px] text-mist">{o.items}</p>
                      </div>
                      <span className="tnum hidden font-500 text-deep sm:block">
                        {o.amt}
                      </span>
                      <StatusChip tone={o.tone} dot>
                        {o.status}
                      </StatusChip>
                    </div>
                  ))}
                </div>
              </div>

              {/* revenue + activity */}
              <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-line bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-500 text-deep">Revenue · 12d</p>
                    <span className="text-[11px] font-500 text-brand-600">▲ 21%</span>
                  </div>
                  <div className="mt-4 flex h-20 items-end gap-1.5">
                    {REV.map((v, i) => (
                      <motion.span
                        key={i}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-brand/30 to-brand"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(v / 108) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: i * 0.04,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-line bg-white p-4">
                  <p className="mb-3 text-[13px] font-500 text-deep">Activity</p>
                  <ul className="space-y-2.5 text-[12px]">
                    {[
                      ["Priya S.", "marked order Ready", IconClock],
                      ["₹640", "collected · YC-2472", IconRupee],
                      ["Route 4", "3 deliveries dispatched", IconTruck],
                    ].map(([a, b, Ic], i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <span className="grid h-6 w-6 place-items-center rounded-md bg-paper-100 text-deep-600">
                          <Ic size={13} />
                        </span>
                        <span className="text-ink">
                          <b className="font-600">{a as string}</b>{" "}
                          <span className="text-mist">{b as string}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  sub,
  tone = false,
  warn = false,
}: {
  label: string;
  value: React.ReactNode;
  sub: string;
  tone?: boolean;
  warn?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3.5 ${
        tone
          ? "border-brand/30 bg-brand-050"
          : warn
            ? "border-amber-500/25 bg-amber-500/[0.06]"
            : "border-line bg-white"
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
        {label}
      </p>
      <p className="mt-1.5 font-fraunces text-2xl font-600 tracking-tight text-deep">
        {value}
      </p>
      <p className="mt-0.5 text-[11px] text-mist">{sub}</p>
    </div>
  );
}

/* ============================================================================
   OperationsMock — a distinct floor-operations view (not the hero dashboard)
   Queue-driven: processing columns · ready-for-delivery · live alerts
============================================================================ */
const PROCESSING = [
  { stage: "Received", count: 6, tone: "teal" },
  { stage: "Washing", count: 9, tone: "amber" },
  { stage: "Ironing", count: 4, tone: "teal" },
];

const READY_QUEUE = [
  { id: "YC-2471", name: "Rohit Menon", route: "Route 2 · Bandra", pcs: "6 pcs" },
  { id: "YC-2469", name: "Priya Sharma", route: "Route 4 · Andheri", pcs: "8 pcs" },
  { id: "YC-2466", name: "Sana Shaikh", route: "Route 2 · Bandra", pcs: "3 pcs" },
];

const ALERTS = [
  { icon: IconRupee, tone: "rose", text: "₹440 overdue · YC-2477", meta: "3 days" },
  { icon: IconClock, tone: "amber", text: "Pickup window closing · Meera Nair", meta: "40 min" },
  { icon: IconBag, tone: "teal", text: "Capacity at 82% · washing line B", meta: "now" },
];

export function OperationsMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_40px_120px_-40px_rgba(0,54,72,0.45)]">
      <WindowChrome title="app.youclean.crm / operations — live floor" />
      <div className="p-5 text-ink md:p-6">
        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatTile label="Today's orders" value={<CountUp to={34} />} sub="12 pickups left" tone />
          <StatTile label="In processing" value={<CountUp to={19} />} sub="Across 3 stages" />
          <StatTile label="Ready for delivery" value={<CountUp to={7} />} sub="2 routes" />
          <StatTile label="Pending payments" value={<CountUp to={9640} prefix="₹" />} sub="7 orders" warn />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          {/* Processing columns */}
          <div className="rounded-xl border border-line bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[13px] font-500 text-deep">Processing pipeline</p>
              <span className="font-mono text-[11px] text-mist">Live</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {PROCESSING.map((p, ci) => (
                <div key={p.stage} className="rounded-lg bg-paper-100/50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-500 text-deep">{p.stage}</span>
                    <StatusChip tone={p.tone} dot={false} className="px-1.5 py-0.5">
                      {p.count}
                    </StatusChip>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + ci * 0.1 + i * 0.06 }}
                        className="rounded-md border border-line bg-white px-2 py-1.5"
                      >
                        <div className="h-1.5 w-2/3 rounded-full bg-line" />
                        <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-line/60" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ready queue + alerts */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-brand/30 bg-brand-050 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[13px] font-500 text-deep">Ready for delivery</p>
                <span className="flex items-center gap-1 font-mono text-[11px] text-brand-600">
                  <IconTruck size={13} /> Dispatch all
                </span>
              </div>
              <div className="space-y-2">
                {READY_QUEUE.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex items-center gap-3 rounded-lg border border-brand/20 bg-white px-3 py-2 text-[12.5px]"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-md bg-brand text-deep">
                      <IconCheck size={13} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-500 text-deep">{r.name}</p>
                      <p className="truncate text-[11px] text-mist">
                        {r.pcs} · {r.route}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-mist">{r.id}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-line bg-white p-4">
              <p className="mb-3 flex items-center gap-1.5 text-[13px] font-500 text-deep">
                <IconBell size={14} /> Operational alerts
              </p>
              <ul className="space-y-2.5 text-[12.5px]">
                {ALERTS.map((a, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-2.5"
                  >
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-md ${
                        a.tone === "rose"
                          ? "bg-rose-500/10 text-rose-600"
                          : a.tone === "amber"
                            ? "bg-amber-500/12 text-amber-700"
                            : "bg-deep/8 text-deep-600"
                      }`}
                    >
                      <a.icon size={13} />
                    </span>
                    <span className="flex-1 text-ink">{a.text}</span>
                    <span className="font-mono text-[11px] text-mist">{a.meta}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
