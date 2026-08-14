import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Pill } from "./mocks";
import {
  automations,
  customerById,
  customers,
  initialJobs,
  serviceById,
  team,
  technicianById,
  type Job,
  type JobStatus,
} from "./heroProductData";

/* ------------------------------------------------------------------ */
/*  Crestline Ops — the internal application. One shared `jobs` state */
/*  drives Overview, Jobs, Customers and Team, so assigning a job in  */
/*  the Jobs screen is visible everywhere else too — because it's the */
/*  same record, not a separate mock per screen.                      */
/* ------------------------------------------------------------------ */

type Screen = "overview" | "jobs" | "customers" | "team" | "automations";

const NAV: { id: Screen; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "jobs", label: "Jobs" },
  { id: "customers", label: "Customers" },
  { id: "team", label: "Team" },
  { id: "automations", label: "Automations" },
];

const statusTone: Record<JobStatus, "live" | "brand" | "warn" | "muted"> = {
  Unassigned: "warn",
  Scheduled: "muted",
  "En route": "brand",
  "In progress": "brand",
  Completed: "live",
};

function NavIcon({ id }: { id: Screen }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 } as const;
  switch (id) {
    case "overview":
      return (
        <svg {...common} className="size-4">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
        </svg>
      );
    case "jobs":
      return (
        <svg {...common} className="size-4">
          <rect x="6" y="4" width="12" height="16" rx="2" />
          <rect x="9" y="2.5" width="6" height="3" rx="1" />
          <path d="M9 10.5h6M9 14h6M9 17.5h3" />
        </svg>
      );
    case "customers":
      return (
        <svg {...common} className="size-4">
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
        </svg>
      );
    case "team":
      return (
        <svg {...common} className="size-4">
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M14.7 20a4.2 4.2 0 0 1 6.3-3.6" />
        </svg>
      );
    case "automations":
      return (
        <svg {...common} className="size-4">
          <polygon points="13 2 4 14 11 14 10 22 20 10 13 10 13 2" />
        </svg>
      );
  }
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Toast({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="toast-pop absolute right-3 bottom-3 z-10 flex max-w-[260px] items-start gap-2.5 rounded-lg border border-ink-line bg-ink-3 px-3 py-2.5 shadow-panel-dark">
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-live/15 text-live">
        <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-ink-fg">{title}</p>
        <p className="mt-0.5 truncate text-[9px] text-ink-muted">{meta}</p>
      </div>
    </div>
  );
}

interface CursorState {
  x: number;
  y: number;
  visible: boolean;
  clicking: boolean;
}

function Cursor({ x, y, visible, clicking }: CursorState) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-50 transition-all duration-500 ease-out",
        visible ? "opacity-100" : "opacity-0",
      )}
      style={{ left: x, top: y }}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn(
          "size-5 -translate-x-1 -translate-y-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-150",
          clicking && "scale-90",
        )}
        fill="white"
        stroke="#0f172a"
        strokeWidth="1.1"
        strokeLinejoin="round"
      >
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      </svg>
      {clicking && (
        <span className="absolute top-0 left-0 size-5 -translate-x-1 -translate-y-1 animate-ping rounded-full bg-white/40" />
      )}
    </div>
  );
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function HeroSoftware() {
  const [screen, setScreen] = useState<Screen>("overview");
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [assigningJobId, setAssigningJobId] = useState<string | null>(null);
  const [jobFilter, setJobFilter] = useState<"All" | "Unassigned" | "Active" | "Completed">("All");
  const [toast, setToast] = useState<{ title: string; meta: string } | null>(null);
  const [activity, setActivity] = useState<{ text: string; time: string }[]>([
    { text: "Rina Kapoor's electrical job marked complete", time: "8:15 AM" },
    { text: "Suresh Kumar started plumbing job · Farhan Ali", time: "9:40 AM" },
    { text: "New booking received · Appliance installation · Meera Iyer", time: "Yesterday, 6:48 PM" },
  ]);
  const [justTriggered, setJustTriggered] = useState<string | null>(null);
  const [cursor, setCursor] = useState<CursorState>({ x: 0, y: 0, visible: false, clicking: false });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorTargets = useRef<Record<string, HTMLElement | null>>({});
  const cancelledRef = useRef(false);

  const registerTarget = (id: string) => (el: HTMLElement | null) => {
    cursorTargets.current[id] = el;
  };

  async function clickTarget(id: string, action: () => void) {
    if (cancelledRef.current) return;
    const el = cursorTargets.current[id];
    const container = containerRef.current;
    if (!el || !container) {
      action();
      return;
    }
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const x = elRect.left - containerRect.left + elRect.width / 2;
    const y = elRect.top - containerRect.top + elRect.height / 2;
    setCursor({ x, y, visible: true, clicking: false });
    await sleep(600);
    if (cancelledRef.current) return;
    setCursor((c) => ({ ...c, clicking: true }));
    await sleep(150);
    if (cancelledRef.current) return;
    action();
    await sleep(250);
    if (cancelledRef.current) return;
    setCursor((c) => ({ ...c, clicking: false }));
  }

  function assign(jobId: string, techId: string) {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;
    const tech = technicianById(techId)!;
    const customer = customerById(job.customerId);
    setJobs((js) =>
      js.map((j) => (j.id === jobId ? { ...j, technicianId: techId, status: "Scheduled" } : j)),
    );
    setAssigningJobId(null);
    setToast({ title: "Technician assigned", meta: `${tech.name} → ${customer.name} notified on WhatsApp` });
    setActivity((a) =>
      [
        { text: `${tech.name} assigned to ${serviceById(job.serviceId).name} · ${customer.name} notified`, time: "Just now" },
        ...a,
      ].slice(0, 4),
    );
    setJustTriggered("booking");
    window.setTimeout(() => setToast(null), 1900);
    window.setTimeout(() => setJustTriggered(null), 3000);
  }

  /* ---- a cursor clicks through the real UI, using the same handlers above ---- */
  useEffect(() => {
    cancelledRef.current = false;

    async function run() {
      await sleep(500);
      if (cancelledRef.current) return;
      await clickTarget("nav-jobs", () => setScreen("jobs"));
      await sleep(500);
      if (cancelledRef.current) return;
      await clickTarget("assign-job4", () => setAssigningJobId("job4"));
      await sleep(450);
      if (cancelledRef.current) return;
      await clickTarget("tech-job4-devika", () => assign("job4", "devika"));
      await sleep(700);
      if (cancelledRef.current) return;
      await clickTarget("nav-team", () => setScreen("team"));
    }

    run();

    return () => {
      cancelledRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleJobs = jobs.filter((j) => {
    if (jobFilter === "All") return true;
    if (jobFilter === "Unassigned") return j.status === "Unassigned";
    if (jobFilter === "Completed") return j.status === "Completed";
    return j.status === "En route" || j.status === "In progress" || j.status === "Scheduled";
  });

  const todaysJobs = jobs.filter((j) => !j.time.startsWith("Tomorrow"));
  const unassignedCount = jobs.filter((j) => j.status === "Unassigned").length;

  return (
    <div ref={containerRef} className="relative flex h-full text-ink-fg">
      <aside className="hidden w-44 shrink-0 flex-col border-r border-ink-line p-3 lg:flex">
        <div className="mb-5 flex items-center gap-2 px-1">
          <span className="grid size-6.5 place-items-center rounded-md bg-brand font-mono text-[10px] font-medium text-ink-fg">
            C
          </span>
          <span className="text-[12.5px] font-medium">Crestline Ops</span>
        </div>
        <nav className="flex flex-col gap-0.5">
          {NAV.slice(0, 4).map((n) => (
            <button
              key={n.id}
              ref={registerTarget(`nav-${n.id}`)}
              type="button"
              onClick={() => setScreen(n.id)}
              className={cn(
                "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-[12px] transition-colors",
                screen === n.id ? "bg-ink-fg/8 text-ink-fg" : "text-ink-muted hover:text-ink-fg",
              )}
            >
              <NavIcon id={n.id} />
              {n.label}
            </button>
          ))}
          <p className="mt-3.5 mb-0.5 px-2.5 font-mono text-[9px] tracking-wider text-ink-muted/50 uppercase">
            System
          </p>
          {NAV.slice(4).map((n) => (
            <button
              key={n.id}
              ref={registerTarget(`nav-${n.id}`)}
              type="button"
              onClick={() => setScreen(n.id)}
              className={cn(
                "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-[12px] transition-colors",
                screen === n.id ? "bg-ink-fg/8 text-ink-fg" : "text-ink-muted hover:text-ink-fg",
              )}
            >
              <NavIcon id={n.id} />
              {n.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2 border-t border-ink-line px-1 pt-3">
          <span className="grid size-6.5 shrink-0 place-items-center rounded-full bg-brand/15 text-[10px] font-medium text-brand">
            AK
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium">Arjun Khanna</p>
            <p className="truncate text-[8.5px] text-ink-muted">Admin</p>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-ink-line px-4 py-2.5">
          <div className="flex min-w-0 max-w-2xs flex-1 items-center gap-2 rounded-md border border-ink-line px-2.5 py-1.5">
            <svg viewBox="0 0 24 24" className="size-3.5 shrink-0 text-ink-muted" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="truncate text-[10.5px] text-ink-muted">Search jobs, customers…</span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="relative grid size-7 place-items-center rounded-md text-ink-muted transition-colors hover:text-ink-fg">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 8a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 12 6 8Z" />
                <path d="M9.5 17a2.5 2.5 0 0 0 5 0" />
              </svg>
              {unassignedCount > 0 && (
                <span className="live-dot absolute top-0.5 right-0.5 size-1.5 rounded-full bg-warn" />
              )}
            </span>
          </div>
        </div>

        <div key={screen} className="step-in relative min-h-0 flex-1 overflow-hidden">
          {screen === "overview" && (
            <div className="h-full overflow-hidden p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[13px] font-medium">Good morning, Arjun</p>
                  <p className="mt-0.5 text-[10.5px] text-ink-muted">
                    Tuesday, 12 Aug · {todaysJobs.length} jobs today
                    {unassignedCount > 0 && (
                      <span className="text-warn">
                        {" "}
                        · {unassignedCount} needs a technician
                      </span>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setScreen("jobs")}
                  className="shrink-0 rounded-md bg-brand px-2.5 py-1.5 text-[10.5px] font-medium text-ink-fg"
                >
                  + New job
                </button>
              </div>

              <div className="mt-4 border-t border-ink-line pt-3">
                <p className="text-[11px] text-ink-muted">Today's schedule</p>
                {todaysJobs.map((j) => {
                  const customer = customerById(j.customerId);
                  const service = serviceById(j.serviceId);
                  const tech = technicianById(j.technicianId);
                  return (
                    <div
                      key={j.id}
                      className="flex items-center justify-between gap-3 border-b border-ink-line py-2.5 transition-colors last:border-0 hover:bg-ink-fg/[0.03]"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[11px]">{service.name}</p>
                        <p className="truncate text-[10px] text-ink-muted">
                          {customer.name} · {tech ? tech.name : "Unassigned"}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Pill tone={statusTone[j.status]}>{j.status}</Pill>
                        <span className="font-mono text-[9px] text-ink-muted">{j.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-ink-line pt-3">
                <p className="text-[11px] text-ink-muted">Recent activity</p>
                <div className="mt-1.5 space-y-1.5">
                  {activity.map((a) => (
                    <div key={a.text} className="flex items-center justify-between gap-3">
                      <p className="min-w-0 flex-1 truncate text-[10.5px] text-ink-muted">
                        <span className="text-ink-muted/50">·</span> {a.text}
                      </p>
                      <span className="shrink-0 font-mono text-[9px] text-ink-muted/60">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {screen === "jobs" && (
            <div className="flex h-full flex-col overflow-hidden p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[13px] font-medium">Jobs</p>
                  <p className="font-mono text-[9px] text-ink-muted">{jobs.length} total · synced 1m ago</p>
                </div>
              </div>
              <div className="mt-2.5 flex gap-1.5">
                {(["All", "Unassigned", "Active", "Completed"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setJobFilter(f)}
                    className={cn(
                      "rounded-md px-2 py-1 text-[10.5px] transition-colors",
                      jobFilter === f
                        ? "bg-brand text-ink-fg"
                        : "border border-ink-line text-ink-muted hover:border-ink-fg/25 hover:text-ink-fg",
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="mt-2.5 min-h-0 flex-1 overflow-hidden rounded-lg border border-ink-line">
                <div className="grid grid-cols-[1.3fr_.85fr_.75fr_.85fr] gap-2 border-b border-ink-line bg-ink-2/60 px-3 py-1.5 font-mono text-[9px] tracking-wider text-ink-muted uppercase">
                  <span>Customer / service</span>
                  <span>Technician</span>
                  <span>Status</span>
                  <span className="text-right">Time</span>
                </div>
                {visibleJobs.map((j) => {
                  const customer = customerById(j.customerId);
                  const service = serviceById(j.serviceId);
                  const tech = technicianById(j.technicianId);
                  return (
                    <div
                      key={j.id}
                      className="relative grid grid-cols-[1.3fr_.85fr_.75fr_.85fr] items-center gap-2 border-b border-ink-line px-3 py-2 transition-colors last:border-0 hover:bg-ink-fg/[0.03]"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="grid size-6.5 shrink-0 place-items-center rounded-full bg-ink-fg/8 text-[9px] font-medium">
                          {initials(customer.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[11px] leading-tight">{customer.name}</p>
                          <p className="truncate text-[10px] leading-tight text-ink-muted">
                            {service.shortName}
                          </p>
                        </div>
                      </div>

                      {tech ? (
                        <span className="truncate text-[10.5px]">{tech.name}</span>
                      ) : assigningJobId === j.id ? (
                        <div className="flex items-center gap-1">
                          {team.map((t) => (
                            <button
                              key={t.id}
                              ref={registerTarget(`tech-${j.id}-${t.id}`)}
                              type="button"
                              title={`Assign ${t.name} · ${t.role}`}
                              onClick={() => assign(j.id, t.id)}
                              className="grid size-6 shrink-0 place-items-center rounded-full border border-ink-line bg-ink-2 text-[9px] font-medium text-ink-muted transition-colors hover:border-brand hover:text-ink-fg"
                            >
                              {initials(t.name)}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <button
                          ref={registerTarget(`assign-${j.id}`)}
                          type="button"
                          onClick={() => setAssigningJobId(j.id)}
                          className="w-fit rounded-md border border-ink-line px-2 py-1 text-[10.5px] font-medium text-ink-muted transition-colors hover:border-warn/50 hover:text-warn"
                        >
                          Assign
                        </button>
                      )}

                      <span>
                        <Pill tone={statusTone[j.status]}>{j.status}</Pill>
                      </span>
                      <span className="truncate text-right font-mono text-[9px] text-ink-muted">{j.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {screen === "customers" && (
            <div className="h-full overflow-hidden p-4">
              <p className="text-[13px] font-medium">Customers</p>
              <p className="font-mono text-[9px] text-ink-muted">{customers.length} records</p>
              <div className="mt-3 overflow-hidden rounded-lg border border-ink-line">
                {customers.map((c) => {
                  const job = jobs.find((j) => j.customerId === c.id);
                  return (
                    <div
                      key={c.id}
                      className="flex items-center justify-between gap-3 border-b border-ink-line px-3 py-2.5 transition-colors last:border-0 hover:bg-ink-fg/[0.03]"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink-fg/8 text-[9px] font-medium">
                          {initials(c.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[11px]">{c.name}</p>
                          <p className="truncate text-[10px] text-ink-muted">
                            {c.area} · {c.phone} · Customer since {c.since}
                          </p>
                        </div>
                      </div>
                      <div className="max-w-[120px] shrink-0 text-right">
                        {job ? (
                          <>
                            <p className="truncate text-[10px] text-ink-muted">
                              {serviceById(job.serviceId).shortName}
                            </p>
                            <span className="mt-0.5 inline-block">
                              <Pill tone={statusTone[job.status]}>{job.status}</Pill>
                            </span>
                          </>
                        ) : (
                          <span className="text-[10px] text-ink-muted">No active job</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {screen === "team" && (
            <div className="flex h-full flex-col overflow-hidden p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-medium">Team</p>
                <span className="font-mono text-[9px] text-ink-muted">{team.length} technicians</span>
              </div>
              <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-lg border border-ink-line">
                <div className="grid grid-cols-[1fr_.65fr_1.85fr] gap-2 border-b border-ink-line bg-ink-2/60 px-3 py-1.5 font-mono text-[9px] tracking-wider text-ink-muted uppercase">
                  <span>Technician</span>
                  <span>Status</span>
                  <span>Current / next job</span>
                </div>
                {team.map((t) => {
                  const activeJob = jobs.find(
                    (j) => j.technicianId === t.id && (j.status === "En route" || j.status === "In progress"),
                  );
                  const upcoming = jobs.find((j) => j.technicianId === t.id && j.status === "Scheduled");
                  return (
                    <div
                      key={t.id}
                      className="grid grid-cols-[1fr_.65fr_1.85fr] items-center gap-2 border-b border-ink-line px-3 py-2.5 transition-colors last:border-0 hover:bg-ink-fg/[0.03]"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="grid size-6.5 shrink-0 place-items-center rounded-full bg-brand/12 text-[9px] font-medium text-brand">
                          {initials(t.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[11px] leading-tight">{t.name}</p>
                          <p className="truncate text-[10px] leading-tight text-ink-muted">{t.role}</p>
                        </div>
                      </div>
                      <span>
                        <Pill tone={activeJob ? statusTone[activeJob.status] : "live"}>
                          {activeJob ? activeJob.status : "Available"}
                        </Pill>
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[10px] text-ink-muted">
                          {activeJob
                            ? `${serviceById(activeJob.serviceId).shortName} · ${customerById(activeJob.customerId).name}`
                            : "No active job"}
                        </p>
                        {upcoming && (
                          <p className="truncate text-[10px] text-brand">
                            Next: {serviceById(upcoming.serviceId).shortName} ·{" "}
                            {customerById(upcoming.customerId).name}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {screen === "automations" && (
            <div className="h-full overflow-hidden p-4">
              <p className="text-[13px] font-medium">Automations</p>
              <p className="font-mono text-[9px] text-ink-muted">{automations.length} active workflows</p>
              <div className="mt-3 space-y-2.5">
                {automations.map((flow) => {
                  const triggered = justTriggered === flow.id;
                  return (
                    <div
                      key={flow.id}
                      className={cn(
                        "rounded-lg border p-3 transition-colors",
                        triggered ? "border-brand/50 bg-brand/6" : "border-ink-line",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[11px] font-medium">{flow.name}</p>
                        {triggered ? (
                          <Pill tone="brand">Triggered just now</Pill>
                        ) : (
                          <Pill tone="live">Active</Pill>
                        )}
                      </div>
                      <p className="mt-1 text-[10px] text-ink-muted">{flow.trigger}</p>
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        {flow.steps.map((step, i) => (
                          <span key={step} className="flex items-center gap-1.5">
                            <span className="rounded-md border border-ink-line px-2 py-1 text-[10px] text-ink-muted">
                              {step}
                            </span>
                            {i < flow.steps.length - 1 && (
                              <span className="text-[10px] text-ink-muted">→</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast title={toast.title} meta={toast.meta} />}
      <Cursor {...cursor} />
    </div>
  );
}
