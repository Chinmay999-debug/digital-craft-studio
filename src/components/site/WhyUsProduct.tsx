import { cn } from "@/lib/utils";
import { Pill } from "./mocks";
import {
  activityLog,
  automations,
  business,
  leadById,
  leads,
  leadsByStage,
  modules,
  stages,
  team,
  teamById,
  todaysBookings,
  type Stage,
} from "./whyUsProductData";

/* ------------------------------------------------------------------ */
/*  The "Why Startup Setup" mini-product — Bloom Dental Studio's       */
/*  internal system. One persistent sidebar + topbar shell, six        */
/*  content states driven by `active` (0–5), each pulled from the      */
/*  same shared data in whyUsProductData.ts.                           */
/* ------------------------------------------------------------------ */

const SCREENS = ["pipeline", "customer", "modules", "growth", "today", "changelog"] as const;
export type ProductScreen = (typeof SCREENS)[number];

export const PRODUCT_SCREENS: readonly ProductScreen[] = SCREENS;

export const PRODUCT_URLS: string[] = [
  `${business.domain}/pipeline`,
  `${business.domain}/customers/priya-mehta`,
  `${business.domain}/overview`,
  `${business.domain}/overview`,
  `${business.domain}/bookings`,
  `${business.domain}/automations`,
];

type NavId =
  | "overview"
  | "pipeline"
  | "customers"
  | "bookings"
  | "team"
  | "automations"
  | "payments"
  | "reports";

const CORE_NAV: { id: NavId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "pipeline", label: "Pipeline" },
  { id: "customers", label: "Customers" },
  { id: "bookings", label: "Bookings" },
  { id: "team", label: "Team" },
  { id: "automations", label: "Automations" },
];

const GROWTH_NAV: { id: NavId; label: string }[] = [
  { id: "payments", label: "Payments" },
  { id: "reports", label: "Reports" },
];

const NAV_FOR_SCREEN: Record<ProductScreen, NavId> = {
  pipeline: "pipeline",
  customer: "customers",
  modules: "overview",
  growth: "overview",
  today: "bookings",
  changelog: "automations",
};

const stageTone: Record<Stage, "live" | "brand" | "warn" | "muted"> = {
  "New enquiry": "warn",
  Qualified: "muted",
  "Follow-up": "warn",
  Booked: "brand",
  Completed: "live",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function NavIcon({ id }: { id: NavId }) {
  const c = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
  } as const;
  switch (id) {
    case "overview":
      return (
        <svg {...c} className="size-4">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
        </svg>
      );
    case "pipeline":
      return (
        <svg {...c} className="size-4">
          <path d="M4 5h16" />
          <path d="M7 12h10" />
          <path d="M10.5 19h3" />
        </svg>
      );
    case "customers":
      return (
        <svg {...c} className="size-4">
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
        </svg>
      );
    case "bookings":
      return (
        <svg {...c} className="size-4">
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M4 10h16M8 3v4M16 3v4" />
        </svg>
      );
    case "team":
      return (
        <svg {...c} className="size-4">
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M14.7 20a4.2 4.2 0 0 1 6.3-3.6" />
        </svg>
      );
    case "automations":
      return (
        <svg {...c} className="size-4">
          <polygon points="13 2 4 14 11 14 10 22 20 10 13 10 13 2" />
        </svg>
      );
    case "payments":
      return (
        <svg {...c} className="size-4">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18" />
        </svg>
      );
    case "reports":
      return (
        <svg {...c} className="size-4">
          <path d="M5 20V10M12 20V4M19 20v-7" />
        </svg>
      );
  }
}

function PipelineBoard() {
  const priya = leadById("priya");
  return (
    <div className="h-full overflow-hidden p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[13px] font-medium">Pipeline</p>
          <p className="font-mono text-[9px] text-ink-muted">
            {leads.length} active leads · synced just now
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {stages.map((stage) => {
          const items = leadsByStage(stage);
          return (
            <div
              key={stage}
              className="min-w-0 rounded-lg border border-ink-line bg-ink-2/40 p-1.5"
            >
              <div className="flex items-center justify-between gap-1 px-0.5">
                <span className="truncate font-mono text-[7.5px] tracking-wider text-ink-muted uppercase">
                  {stage}
                </span>
                <span className="shrink-0 font-mono text-[8.5px] text-ink-muted">
                  {items.length}
                </span>
              </div>
              <div className="mt-1.5 space-y-1.5">
                {items.map((lead) => (
                  <div
                    key={lead.id}
                    className={cn(
                      "rounded-md border px-1.5 py-1.5",
                      lead.id === priya.id
                        ? "border-brand/40 bg-brand/6"
                        : "border-ink-line bg-ink-2/60",
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {lead.id === priya.id && (
                        <span className="live-dot size-1.5 shrink-0 rounded-full bg-brand" />
                      )}
                      <p className="truncate text-[9.5px] leading-tight">{lead.name}</p>
                    </div>
                    <p className="mt-0.5 truncate font-mono text-[7.5px] text-ink-muted">
                      {lead.service}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CustomerRecord() {
  const priya = leadById("priya");
  const owner = teamById(priya.assignedTo);
  const flow = ["Website enquiry", "Customer record", "Booking", "Follow-up", "Activity"];
  const activeFlowIndex = 3;
  return (
    <div className="h-full overflow-hidden p-4">
      <p className="text-[13px] font-medium">Customer record</p>
      <p className="font-mono text-[9px] text-ink-muted">What one website enquiry becomes</p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {flow.map((step, i) => (
          <div key={step} className="flex items-center gap-1.5">
            <span
              className={cn(
                "rounded-md border px-2 py-1.5 font-mono text-[9px] whitespace-nowrap",
                i === activeFlowIndex
                  ? "border-brand bg-brand/10 text-ink-fg"
                  : i < activeFlowIndex
                    ? "border-ink-line text-ink-muted"
                    : "border-ink-line/60 text-ink-muted/50",
              )}
            >
              {step}
            </span>
            {i < flow.length - 1 && <span className="text-[10px] text-ink-muted/50">→</span>}
          </div>
        ))}
      </div>

      <div className="mt-3.5 rounded-lg border border-ink-line">
        <div className="flex items-center gap-2.5 border-b border-ink-line px-3 py-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/15 text-[10px] font-medium text-brand">
            {initials(priya.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-medium">{priya.name}</p>
            <p className="truncate text-[10px] text-ink-muted">{priya.service}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 px-3 py-3">
          {[
            ["Source", priya.source],
            ["Status", null],
            ["Booking", priya.bookingTime ?? "—"],
            ["Assigned to", owner?.name ?? "Unassigned"],
            ["WhatsApp", null],
            ["Email", null],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="font-mono text-[8.5px] tracking-wider text-ink-muted uppercase">
                {label}
              </p>
              {label === "Status" ? (
                <span className="mt-1 inline-block">
                  <Pill tone={stageTone[priya.stage]}>{priya.stage}</Pill>
                </span>
              ) : label === "WhatsApp" ? (
                <span className="mt-1 inline-block">
                  <Pill tone={priya.whatsapp === "Sent" ? "live" : "muted"}>{priya.whatsapp}</Pill>
                </span>
              ) : label === "Email" ? (
                <span className="mt-1 inline-block">
                  <Pill tone={priya.email === "Sent" ? "live" : "muted"}>{priya.email}</Pill>
                </span>
              ) : (
                <p className="mt-0.5 truncate text-[11px]">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModuleGrid({ growth }: { growth: boolean }) {
  return (
    <div className="h-full overflow-hidden p-4">
      <p className="text-[13px] font-medium">Overview</p>
      <p className="font-mono text-[9px] text-ink-muted">
        {business.name} · {business.city}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ink-line bg-ink-line">
        {modules.map((m) => (
          <div key={m.id} className="bg-ink-2/40 p-3">
            <p className="text-[11px] font-medium">{m.label}</p>
            <p className="mt-1.5 text-[13px] tracking-tight">{m.stat}</p>
            <p className="mt-0.5 font-mono text-[8.5px] text-ink-muted">{m.detail}</p>
          </div>
        ))}
        {growth && (
          <div className="col-span-2 bg-brand/6 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-medium">Payments</p>
              <Pill tone="brand">Just added</Pill>
            </div>
            <p className="mt-1.5 text-[13px] tracking-tight">₹18,400 this week</p>
            <p className="mt-0.5 font-mono text-[8.5px] text-ink-muted">Invoicing & receipts</p>
          </div>
        )}
      </div>
      <p className="mt-3 font-mono text-[8.5px] tracking-wider text-ink-muted/60 uppercase">
        {growth ? "5 modules · same system" : "4 modules · one system"}
      </p>
    </div>
  );
}

function TodaysBookings() {
  const activeFlow = automations[1]!;
  return (
    <div className="h-full overflow-hidden p-4">
      <p className="text-[13px] font-medium">Today's bookings</p>
      <p className="font-mono text-[9px] text-ink-muted">
        13 Aug · {todaysBookings.length} scheduled
      </p>

      <div className="mt-3 overflow-hidden rounded-lg border border-ink-line">
        <div className="grid grid-cols-[1.3fr_.7fr_1fr_.9fr] gap-2 border-b border-ink-line bg-ink-2/60 px-3 py-1.5 font-mono text-[8.5px] tracking-wider text-ink-muted uppercase">
          <span>Customer</span>
          <span>Time</span>
          <span>Assigned to</span>
          <span className="text-right">Status</span>
        </div>
        {todaysBookings.map((lead) => {
          const tech = teamById(lead.assignedTo);
          return (
            <div
              key={lead.id}
              className="grid grid-cols-[1.3fr_.7fr_1fr_.9fr] items-center gap-2 border-b border-ink-line px-3 py-2.5 last:border-0"
            >
              <div className="min-w-0">
                <p className="truncate text-[11px] leading-tight">{lead.name}</p>
                <p className="truncate text-[10px] leading-tight text-ink-muted">{lead.service}</p>
              </div>
              <span className="truncate font-mono text-[10px] text-ink-muted">
                {lead.bookingTime?.split("· ")[1]}
              </span>
              <span className="truncate text-[10.5px]">{tech?.name}</span>
              <span className="text-right">
                <Pill tone={stageTone[lead.stage]}>{lead.stage}</Pill>
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 rounded-lg border border-ink-line p-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10.5px]">{activeFlow.name} automation</p>
          <Pill tone="live">running</Pill>
        </div>
      </div>
    </div>
  );
}

function ChangeLog() {
  return (
    <div className="h-full overflow-hidden p-4">
      <p className="text-[13px] font-medium">Activity</p>
      <p className="font-mono text-[9px] text-ink-muted">System changes · {business.name}</p>
      <div className="mt-3 space-y-0">
        {activityLog.map((entry, i) => (
          <div
            key={entry.text}
            className="flex items-center gap-3 border-b border-ink-line py-2.5 last:border-0"
          >
            <span
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                i === 0 ? "live-dot bg-brand" : "bg-ink-fg/15",
              )}
            />
            <span className="w-16 shrink-0 font-mono text-[9px] text-ink-muted">{entry.time}</span>
            <span className="min-w-0 truncate text-[11px]">{entry.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhyUsProduct({ active }: { active: number }) {
  const screen: ProductScreen = SCREENS[Math.min(Math.max(active, 0), SCREENS.length - 1)]!;
  const activeNav = NAV_FOR_SCREEN[screen];
  const showGrowth = active >= 3;
  const unassignedCount = leadsByStage("New enquiry").length;

  return (
    <div className="flex h-full text-ink-fg">
      <aside className="hidden w-40 shrink-0 flex-col border-r border-ink-line p-3 lg:flex">
        <div className="mb-4 flex items-center gap-2 px-1">
          <span className="grid size-6.5 place-items-center rounded-md bg-brand font-mono text-[10px] font-medium text-ink-fg">
            B
          </span>
          <span className="text-[12px] font-medium">Bloom Ops</span>
        </div>
        <nav className="flex flex-col gap-0.5">
          {CORE_NAV.map((n) => (
            <span
              key={n.id}
              className={cn(
                "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[11.5px] transition-colors",
                activeNav === n.id ? "bg-ink-fg/8 text-ink-fg" : "text-ink-muted",
              )}
            >
              <NavIcon id={n.id} />
              {n.label}
            </span>
          ))}
          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-out",
              showGrowth ? "mt-2 max-h-20 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <p className="mb-0.5 px-2.5 font-mono text-[8.5px] tracking-wider text-ink-muted/50 uppercase">
              New
            </p>
            {GROWTH_NAV.map((n) => (
              <span
                key={n.id}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[11.5px] transition-colors",
                  activeNav === n.id ? "bg-ink-fg/8 text-ink-fg" : "text-ink-muted",
                )}
              >
                <NavIcon id={n.id} />
                {n.label}
              </span>
            ))}
          </div>
        </nav>

        <div className="mt-auto flex items-center gap-2 border-t border-ink-line px-1 pt-3">
          <span className="grid size-6.5 shrink-0 place-items-center rounded-full bg-brand/15 text-[10px] font-medium text-brand">
            {initials(team[2]!.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium">{team[2]!.name}</p>
            <p className="truncate text-[8.5px] text-ink-muted">{team[2]!.role}</p>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-ink-line px-4 py-2.5">
          <div className="flex min-w-0 max-w-2xs flex-1 items-center gap-2 rounded-md border border-ink-line px-2.5 py-1.5">
            <svg
              viewBox="0 0 24 24"
              className="size-3.5 shrink-0 text-ink-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="truncate text-[10.5px] text-ink-muted">Search leads, customers…</span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="relative grid size-7 place-items-center rounded-md text-ink-muted">
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 8a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 12 6 8Z" />
                <path d="M9.5 17a2.5 2.5 0 0 0 5 0" />
              </svg>
              {unassignedCount > 0 && (
                <span className="live-dot absolute top-0.5 right-0.5 size-1.5 rounded-full bg-warn" />
              )}
            </span>
          </div>
        </div>

        <div key={screen} className="step-in min-h-0 flex-1 overflow-hidden">
          {screen === "pipeline" && <PipelineBoard />}
          {screen === "customer" && <CustomerRecord />}
          {screen === "modules" && <ModuleGrid growth={false} />}
          {screen === "growth" && <ModuleGrid growth />}
          {screen === "today" && <TodaysBookings />}
          {screen === "changelog" && <ChangeLog />}
        </div>
      </div>
    </div>
  );
}
