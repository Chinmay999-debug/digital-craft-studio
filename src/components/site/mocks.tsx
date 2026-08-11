import { cn } from "@/lib/utils";

/* ---------------- shared atoms ---------------- */

function Dot({ tone = "live" }: { tone?: "live" | "brand" | "warn" | "muted" }) {
  const map = {
    live: "bg-live",
    brand: "bg-brand",
    warn: "bg-warn",
    muted: "bg-ink-muted",
  } as const;
  return <span className={cn("size-1.5 rounded-full", map[tone])} />;
}

export function Pill({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "live" | "brand" | "warn" | "muted";
}) {
  const map = {
    live: "text-live bg-live/10",
    brand: "text-brand bg-brand/12",
    warn: "text-warn bg-warn/12",
    muted: "text-ink-muted bg-ink-fg/8",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase",
        map[tone],
      )}
    >
      <Dot tone={tone} />
      {children}
    </span>
  );
}

function Spark({ values, className }: { values: number[]; className?: string }) {
  const max = Math.max(...values);
  return (
    <div className={cn("flex h-16 items-end gap-1", className)}>
      {values.map((v, i) => (
        <span
          key={i}
          style={{
            height: `${(v / max) * 100}%`,
            animationDelay: `${i * 55}ms`,
          }}
          className="flex-1 origin-bottom rounded-[2px] bg-brand/25 [animation:ss-bar_.7s_cubic-bezier(.16,1,.3,1)_both] last:bg-brand"
        />
      ))}
    </div>
  );
}

function SideNav({
  items,
  active,
  brand,
}: {
  items: string[];
  active: string;
  brand: string;
}) {
  return (
    <aside className="hidden w-44 shrink-0 flex-col gap-1 border-r border-ink-line p-3 sm:flex">
      <div className="mb-4 flex items-center gap-2 px-2">
        <span className="grid size-6 place-items-center rounded bg-brand font-mono text-[10px] text-ink-fg">
          {brand.slice(0, 2).toUpperCase()}
        </span>
        <span className="text-xs font-medium text-ink-fg">{brand}</span>
      </div>
      {items.map((it) => (
        <span
          key={it}
          className={cn(
            "rounded-md px-2 py-1.5 text-xs transition-colors",
            it === active
              ? "bg-ink-fg/8 text-ink-fg"
              : "text-ink-muted hover:text-ink-fg",
          )}
        >
          {it}
        </span>
      ))}
      <div className="mt-auto rounded-md border border-ink-line p-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-ink-muted">SYNC</span>
          <Pill tone="live">live</Pill>
        </div>
      </div>
    </aside>
  );
}

/* ---------------- hero: business dashboard ---------------- */

const heroActivity = [
  ["Payment received", "Meera Kulkarni", "₹4,500", "live"],
  ["Appointment booked", "Rahul Desai", "Tue 11:30", "brand"],
  ["Follow-up due", "Sana Qureshi", "Today", "warn"],
  ["New enquiry", "Website form", "2m ago", "muted"],
] as const;

export function DashboardMock() {
  return (
    <div className="flex min-h-[420px] text-ink-fg">
      <SideNav
        brand="Northline"
        active="Overview"
        items={["Overview", "Customers", "Bookings", "Invoices", "Reports"]}
      />
      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Overview</p>
            <p className="font-mono text-[10px] text-ink-muted">
              LAST 30 DAYS · ALL CHANNELS
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-md border border-ink-line px-2 py-1 font-mono text-[10px] text-ink-muted sm:block">
              ⌘K
            </span>
            <span className="rounded-md bg-brand px-2.5 py-1 text-[11px] font-medium text-ink-fg">
              New booking
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            ["Revenue", "₹8,42,300", "+12.4%"],
            ["Active clients", "184", "+9"],
            ["Bookings", "312", "+23"],
          ].map(([label, value, delta]) => (
            <div
              key={label}
              className="rounded-lg border border-ink-line bg-ink-2/60 p-3"
            >
              <p className="font-mono text-[10px] tracking-wider text-ink-muted uppercase">
                {label}
              </p>
              <p className="mt-1 text-base font-medium tracking-tight sm:text-lg">
                {value}
              </p>
              <p className="font-mono text-[10px] text-live">{delta}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-lg border border-ink-line bg-ink-2/60 p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs">Bookings per week</p>
              <Pill tone="brand">real-time</Pill>
            </div>
            <Spark
              className="mt-3"
              values={[18, 26, 21, 34, 29, 41, 38, 52, 47, 61, 55, 68]}
            />
            <div className="mt-2 flex justify-between font-mono text-[9px] text-ink-muted">
              <span>W1</span>
              <span>W6</span>
              <span>W12</span>
            </div>
          </div>
          <div className="rounded-lg border border-ink-line bg-ink-2/60 p-3">
            <p className="text-xs">Capacity</p>
            <div className="mt-3 space-y-2.5">
              {[
                ["Clinic A", 82],
                ["Clinic B", 64],
                ["Online", 41],
              ].map(([n, p]) => (
                <div key={n as string}>
                  <div className="flex justify-between font-mono text-[10px] text-ink-muted">
                    <span>{n}</span>
                    <span>{p}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-ink-fg/8">
                    <span
                      className="block h-full rounded-full bg-brand transition-all duration-1000"
                      style={{ width: `${p}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 overflow-hidden rounded-lg border border-ink-line">
          <div className="flex items-center justify-between border-b border-ink-line bg-ink-2/60 px-3 py-2">
            <p className="text-xs">Activity</p>
            <span className="font-mono text-[10px] text-ink-muted">AUTO-UPDATING</span>
          </div>
          {heroActivity.map(([title, who, meta, tone], i) => (
            <div
              key={title}
              className="flex items-center justify-between gap-3 border-b border-ink-line px-3 py-2 last:border-0"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <Dot tone={tone as "live"} />
                <span className="truncate text-xs">{title}</span>
                <span className="hidden truncate font-mono text-[10px] text-ink-muted sm:block">
                  {who}
                </span>
              </div>
              <span className="shrink-0 font-mono text-[10px] text-ink-muted">
                {meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- website product mock ---------------- */

export function WebsiteMock() {
  return (
    <div className="min-h-[420px] bg-ivory-2 text-ink">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="text-sm font-semibold tracking-tight">Westbrook Physio</span>
        <div className="hidden items-center gap-5 font-mono text-[10px] tracking-wider text-muted-foreground uppercase md:flex">
          <span>Treatments</span>
          <span>Team</span>
          <span>Pricing</span>
          <span>Contact</span>
        </div>
        <span className="rounded-md bg-brand px-2.5 py-1 text-[11px] font-medium text-primary-foreground">
          Book online
        </span>
      </div>

      <div className="grid gap-4 p-5 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <span className="label-mono text-brand">Clinic in Pune</span>
          <h4 className="mt-2 text-2xl leading-[1.05] font-medium tracking-tight sm:text-[28px]">
            Move better. <br />
            Recover faster.
          </h4>
          <p className="mt-2 max-w-sm text-[13px] text-muted-foreground">
            Personalised physiotherapy programmes, same-week appointments and
            recovery plans you can actually follow.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-md bg-ink px-3 py-1.5 text-[11px] font-medium text-ink-fg">
              Book an appointment
            </span>
            <span className="rounded-md border border-border px-3 py-1.5 text-[11px] font-medium">
              WhatsApp us
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["Sports injury", "Post-surgery", "Back & neck"].map((s) => (
              <div key={s} className="rounded-lg border border-border bg-card p-2.5">
                <div className="h-1 w-6 rounded-full bg-brand" />
                <p className="mt-2 text-[11px] font-medium">{s}</p>
                <p className="font-mono text-[9px] text-muted-foreground">
                  45 MIN · ₹900
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">Book a slot</p>
            <span className="label-mono text-live">Open today</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {["Mon", "Tue", "Wed", "Thu"].map((d, i) => (
              <div
                key={d}
                className={cn(
                  "rounded-md border px-1 py-2 text-center",
                  i === 1 ? "border-brand bg-brand/8" : "border-border",
                )}
              >
                <p className="font-mono text-[9px] text-muted-foreground">{d}</p>
                <p className="text-[13px] font-medium">{10 + i}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {["09:30", "11:00", "12:30", "15:00", "16:30", "18:00"].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "rounded-md border px-1 py-1.5 text-center font-mono text-[10px]",
                  i === 3
                    ? "border-brand bg-brand text-primary-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-2 rounded-md bg-ivory-3/70 p-2">
            <p className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase">
              Lead capture
            </p>
            <div className="mt-1.5 space-y-1.5">
              <div className="h-6 rounded border border-border bg-card" />
              <div className="h-6 rounded border border-border bg-card" />
              <div className="h-6 rounded bg-ink" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border px-5 py-2.5 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
        <span>Core Web Vitals · Pass</span>
        <span>Schema markup</span>
        <span>Mobile-first</span>
        <span className="text-live">SSL secured</span>
      </div>
    </div>
  );
}

/* ---------------- CRM mock ---------------- */

const rows = [
  ["Anita Sharma", "Retainer", "Active", "live", "₹42,000", "Call Thu"],
  ["Vikram Rao", "New lead", "Proposal sent", "brand", "₹1,20,000", "Follow-up 2d"],
  ["Kiran Patel", "Referral", "Onboarding", "brand", "₹65,000", "Docs pending"],
  ["Deepa Nair", "Website form", "Qualifying", "warn", "—", "Call today"],
  ["Imran Shaikh", "Retainer", "Active", "live", "₹28,500", "Invoice sent"],
  ["Ravi Menon", "Cold outreach", "Paused", "muted", "—", "Revisit Q3"],
] as const;

export function CrmMock() {
  return (
    <div className="flex min-h-[440px] text-ink-fg">
      <SideNav
        brand="Ledgerly"
        active="Pipeline"
        items={["Dashboard", "Pipeline", "Customers", "Tasks", "Automations", "Settings"]}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3 border-b border-ink-line px-4 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-ink-line px-2.5 py-1.5">
            <svg viewBox="0 0 24 24" className="size-3.5 text-ink-muted" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="font-mono text-[10px] text-ink-muted">
              Search customers, deals, notes…
            </span>
          </div>
          <div className="hidden gap-1.5 sm:flex">
            {["All", "Active", "Overdue"].map((f, i) => (
              <span
                key={f}
                className={cn(
                  "rounded-md px-2 py-1 font-mono text-[10px]",
                  i === 0 ? "bg-brand text-ink-fg" : "border border-ink-line text-ink-muted",
                )}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-px bg-ink-line">
          {[
            ["Open deals", "24"],
            ["This month", "₹6.4L"],
            ["Follow-ups", "9"],
            ["Won rate", "38%"],
          ].map(([l, v]) => (
            <div key={l} className="bg-ink px-3 py-2.5">
              <p className="font-mono text-[9px] tracking-wider text-ink-muted uppercase">
                {l}
              </p>
              <p className="text-sm font-medium">{v}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-px bg-ink-line lg:grid-cols-[1.6fr_1fr]">
          <div className="bg-ink">
            <div className="grid grid-cols-[1.3fr_1fr_.9fr_.8fr] gap-2 border-b border-ink-line px-4 py-2 font-mono text-[9px] tracking-wider text-ink-muted uppercase">
              <span>Customer</span>
              <span>Source</span>
              <span>Status</span>
              <span className="text-right">Value</span>
            </div>
            {rows.map(([name, src, status, tone, value]) => (
              <div
                key={name}
                className="grid grid-cols-[1.3fr_1fr_.9fr_.8fr] items-center gap-2 border-b border-ink-line px-4 py-2.5 transition-colors last:border-0 hover:bg-ink-fg/4"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ink-fg/8 font-mono text-[9px]">
                    {(name as string)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span className="truncate text-xs">{name}</span>
                </div>
                <span className="truncate font-mono text-[10px] text-ink-muted">{src}</span>
                <Pill tone={tone as "live"}>{status}</Pill>
                <span className="text-right font-mono text-[10px] text-ink-muted">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 bg-ink p-4">
            <div>
              <p className="font-mono text-[9px] tracking-wider text-ink-muted uppercase">
                Today's follow-ups
              </p>
              <div className="mt-2 space-y-1.5">
                {rows.slice(0, 4).map(([name, , , tone, , task]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-md border border-ink-line px-2.5 py-1.5"
                  >
                    <span className="flex items-center gap-2 text-[11px]">
                      <Dot tone={tone as "live"} />
                      {name}
                    </span>
                    <span className="font-mono text-[9px] text-ink-muted">{task}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-ink-line p-2.5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[9px] tracking-wider text-ink-muted uppercase">
                  Automation
                </p>
                <Pill tone="live">running</Pill>
              </div>
              <div className="mt-2 space-y-1.5 font-mono text-[10px] text-ink-muted">
                <p>→ New form entry creates lead</p>
                <p>→ No reply in 48h · nudge</p>
                <p>→ Deal won · invoice + welcome</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- process visuals ---------------- */

export function DiscoverMock() {
  const nodes = [
    ["Enquiry", "brand"],
    ["Qualify", "muted"],
    ["Book", "brand"],
    ["Deliver", "muted"],
    ["Invoice", "live"],
  ] as const;
  return (
    <div className="p-5 text-ink-fg">
      <div className="flex items-center justify-between">
        <p className="text-xs">Workflow map · current state</p>
        <Pill tone="warn">3 gaps found</Pill>
      </div>
      <div className="mt-5 flex items-center gap-2 overflow-hidden">
        {nodes.map(([n, tone], i) => (
          <div key={n} className="flex min-w-0 flex-1 items-center gap-2">
            <div className="min-w-0 flex-1 rounded-lg border border-ink-line bg-ink-2/60 px-2 py-3 text-center">
              <p className="truncate text-[11px]">{n}</p>
              <span className="mt-1 inline-block">
                <Dot tone={tone as "live"} />
              </span>
            </div>
            {i < nodes.length - 1 && (
              <span className="h-px w-4 shrink-0 bg-ink-line" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-2">
        {[
          ["Manual re-entry between form and sheet", "warn"],
          ["No follow-up owner after day 2", "warn"],
          ["Payments reconciled by hand", "warn"],
        ].map(([t, tone]) => (
          <div
            key={t}
            className="flex items-center gap-2.5 rounded-md border border-ink-line px-3 py-2"
          >
            <Dot tone={tone as "warn"} />
            <span className="text-[11px] text-ink-muted">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DesignMock() {
  return (
    <div className="p-5 text-ink-fg">
      <div className="flex items-center justify-between">
        <p className="text-xs">Screen flow · v3</p>
        <span className="font-mono text-[10px] text-ink-muted">12 SCREENS</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={cn(
              "space-y-1.5 rounded-lg border p-2.5",
              i === 1 ? "border-brand bg-brand/8" : "border-ink-line bg-ink-2/50",
            )}
          >
            <div className="h-1.5 w-8 rounded-full bg-ink-fg/25" />
            <div className="h-6 rounded bg-ink-fg/8" />
            <div className="h-1.5 w-full rounded-full bg-ink-fg/12" />
            <div className="h-1.5 w-2/3 rounded-full bg-ink-fg/12" />
            <div className="flex gap-1 pt-1">
              <span className="h-3 w-8 rounded-sm bg-brand/70" />
              <span className="h-3 w-6 rounded-sm bg-ink-fg/12" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px] text-ink-muted">
        {["Tokens", "Grid 12", "States", "Empty states", "Errors"].map((t) => (
          <span key={t} className="rounded border border-ink-line px-2 py-1">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BuildMock() {
  const lines = [
    ["export const bookSlot", "= createServerFn()"],
    ["  .inputValidator(", "slotSchema)"],
    ["  .handler(async ({ data })", "=> {"],
    ["    await notifyClinic(", "data.slot)"],
    ["  })", ""],
  ];
  return (
    <div className="grid gap-px bg-ink-line lg:grid-cols-2">
      <div className="bg-ink p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-ink-muted">bookings.ts</span>
          <Pill tone="live">tests pass</Pill>
        </div>
        <pre className="mt-3 overflow-hidden font-mono text-[10px] leading-6 text-ink-muted">
          {lines.map(([a, b], i) => (
            <div key={i} className="flex gap-3">
              <span className="w-4 shrink-0 text-right text-ink-fg/20">{i + 1}</span>
              <span>
                <span className="text-brand">{a}</span> {b}
              </span>
            </div>
          ))}
        </pre>
      </div>
      <div className="space-y-2 bg-ink p-4">
        <p className="font-mono text-[10px] tracking-wider text-ink-muted uppercase">
          Milestone 3
        </p>
        {[
          ["Booking engine", 100],
          ["Payments", 78],
          ["Admin console", 46],
        ].map(([n, p]) => (
          <div key={n as string} className="rounded-md border border-ink-line p-2.5">
            <div className="flex justify-between text-[11px] text-ink-fg">
              <span>{n}</span>
              <span className="font-mono text-[10px] text-ink-muted">{p}%</span>
            </div>
            <div className="mt-1.5 h-1 rounded-full bg-ink-fg/8">
              <span
                className="block h-full rounded-full bg-brand"
                style={{ width: `${p}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LaunchMock() {
  const steps = [
    ["Build", "done"],
    ["Smoke tests", "done"],
    ["Content check", "done"],
    ["DNS + SSL", "done"],
    ["Deploy production", "running"],
    ["Post-launch review", "queued"],
  ] as const;
  return (
    <div className="p-5 text-ink-fg">
      <div className="flex items-center justify-between">
        <p className="text-xs">Deployment checklist</p>
        <span className="font-mono text-[10px] text-ink-muted">RELEASE 1.0.0</span>
      </div>
      <div className="mt-4 space-y-1.5">
        {steps.map(([s, state]) => (
          <div
            key={s}
            className="flex items-center justify-between rounded-md border border-ink-line px-3 py-2"
          >
            <span className="flex items-center gap-2.5 text-[11px]">
              <span
                className={cn(
                  "grid size-4 place-items-center rounded-full border",
                  state === "done"
                    ? "border-live bg-live/15 text-live"
                    : state === "running"
                      ? "border-brand bg-brand/15 text-brand"
                      : "border-ink-line text-ink-muted",
                )}
              >
                {state === "done" ? "✓" : "•"}
              </span>
              {s}
            </span>
            <span className="font-mono text-[9px] tracking-wider text-ink-muted uppercase">
              {state}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-ink-fg/8">
        <span className="absolute inset-y-0 left-0 w-1/3 bg-brand [animation:ss-sweep_2.4s_linear_infinite]" />
      </div>
    </div>
  );
}

export function SupportMock() {
  return (
    <div className="p-5 text-ink-fg">
      <div className="flex items-center justify-between">
        <p className="text-xs">System health</p>
        <Pill tone="live">all systems normal</Pill>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          ["Uptime", "99.98%"],
          ["Avg response", "212ms"],
          ["Errors 24h", "0"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-lg border border-ink-line bg-ink-2/60 p-3">
            <p className="font-mono text-[9px] tracking-wider text-ink-muted uppercase">
              {l}
            </p>
            <p className="text-sm font-medium">{v}</p>
          </div>
        ))}
      </div>
      <Spark className="mt-4" values={[22, 30, 26, 38, 33, 44, 40, 55, 49, 58, 52, 64]} />
      <div className="mt-4 space-y-1.5 font-mono text-[10px] text-ink-muted">
        <p>→ v1.4 shipped · reporting module</p>
        <p>→ Backup verified · 04:00 IST</p>
        <p>→ Next improvement cycle scheduled</p>
      </div>
    </div>
  );
}

/* ---------------- work previews ---------------- */

export function ClinicSitePreview({ name, tagline }: { name: string; tagline: string }) {
  return (
    <div className="h-full bg-ivory-2 text-ink">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="text-[11px] font-semibold tracking-tight">{name}</span>
        <span className="rounded bg-ink px-2 py-0.5 font-mono text-[9px] text-ink-fg">
          Book
        </span>
      </div>
      <div className="grid grid-cols-[1.2fr_1fr] gap-3 p-3">
        <div>
          <p className="text-[15px] leading-tight font-medium tracking-tight">{tagline}</p>
          <div className="mt-2 flex gap-1.5">
            <span className="rounded bg-brand px-2 py-1 font-mono text-[9px] text-primary-foreground">
              Appointments
            </span>
            <span className="rounded border border-border px-2 py-1 font-mono text-[9px]">
              WhatsApp
            </span>
          </div>
        </div>
        <div className="space-y-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded border border-border bg-card px-2 py-1.5">
              <div className="h-1 w-5 rounded-full bg-brand" />
              <div className="mt-1.5 h-1 w-full rounded-full bg-ink/10" />
              <div className="mt-1 h-1 w-2/3 rounded-full bg-ink/10" />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-px border-t border-border bg-border">
        {["Treatments", "Team", "Contact"].map((s) => (
          <div key={s} className="bg-ivory-2 px-2 py-1.5 text-center font-mono text-[9px] text-muted-foreground">
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PrivateSystemPreview({ kind }: { kind: "education" | "finance" }) {
  const cols =
    kind === "education"
      ? ["Batch", "Students", "Attendance", "Fees"]
      : ["Client", "Portfolio", "Status", "Renewal"];
  const data =
    kind === "education"
      ? [
          ["Grade 9 · A", "42", "94%", "Cleared"],
          ["Grade 10 · B", "38", "89%", "Partial"],
          ["Grade 11 · A", "31", "97%", "Cleared"],
        ]
      : [
          ["Account 1042", "Balanced", "Active", "Mar 2027"],
          ["Account 1088", "Growth", "Review", "Nov 2026"],
          ["Account 1123", "Income", "Active", "Aug 2027"],
        ];
  return (
    <div className="h-full bg-ink p-3 text-ink-fg">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-widest text-ink-muted uppercase">
          Private client system
        </span>
        <Pill tone="brand">restricted</Pill>
      </div>
      <div className="mt-2.5 overflow-hidden rounded-md border border-ink-line">
        <div className="grid grid-cols-4 gap-2 border-b border-ink-line bg-ink-2/60 px-2.5 py-1.5 font-mono text-[9px] text-ink-muted uppercase">
          {cols.map((c) => (
            <span key={c} className="truncate">
              {c}
            </span>
          ))}
        </div>
        {data.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-2 border-b border-ink-line px-2.5 py-1.5 text-[10px] last:border-0"
          >
            {row.map((cell, j) => (
              <span key={j} className={cn("truncate", j > 0 && "font-mono text-ink-muted")}>
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-ink-muted">
        <span>ROLE-BASED ACCESS</span>
        <span className="text-live">● SECURED</span>
      </div>
    </div>
  );
}
