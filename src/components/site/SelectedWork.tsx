import { useState } from "react";
import { BrowserFrame } from "./BrowserFrame";
import { Pill } from "./mocks";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Project = {
  index: string;
  name: string;
  category: string;
  isPrivate: boolean;
  scope: string[];
  url?: string;
  note: string;
  description: string;
  visual: React.ReactNode;
};

/* Confidential — real dashboard can't be shown, so this is an original, */
/* illustrative recreation of the system's real workflow, not the actual UI. */
function SaralVidyaPreview() {
  const applications: {
    initials: string;
    name: string;
    detail: string;
    status: "Documents" | "Disbursed";
  }[] = [
    { initials: "RA", name: "R. Ahuja", detail: "MS CS · Canada", status: "Documents" },
    { initials: "KJ", name: "K. Joshi", detail: "MBA · UK", status: "Disbursed" },
  ];
  const statusTone: Record<"Documents" | "Disbursed", "brand" | "live"> = {
    Documents: "brand",
    Disbursed: "live",
  };
  return (
    <div className="flex h-full flex-col justify-between bg-white p-4 text-ink">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-semibold">Saral Vidya</p>
          <p className="font-mono text-[9px] tracking-wide text-muted-foreground uppercase">
            Study Loan CRM
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {applications.map((a) => (
          <div
            key={a.name}
            className="flex items-center gap-3 rounded-lg border border-border bg-ivory-2/60 px-3 py-2.5"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand/12 text-[10px] font-medium text-brand">
              {a.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium">{a.name}</p>
              <p className="truncate text-[9.5px] text-muted-foreground">{a.detail}</p>
            </div>
            <Pill tone={statusTone[a.status]}>{a.status}</Pill>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground">
        <span className="live-dot size-1.5 rounded-full bg-live" />
        Domestic & abroad loans, one pipeline
      </div>
    </div>
  );
}

/* Confidential — real dashboard can't be shown, so this is an original, */
/* illustrative recreation of the system's real workflow, not the actual UI. */
function RealfinservPreview() {
  const rows: {
    customer: string;
    detail: string;
    status: "Disbursed" | "Underwriting";
  }[] = [
    { customer: "Applicant R.K.", detail: "Personal Loan · HDFC Bank", status: "Disbursed" },
    { customer: "Applicant S.M.", detail: "Personal Loan · ICICI Bank", status: "Underwriting" },
  ];
  const statusTone: Record<"Disbursed" | "Underwriting", "live" | "brand"> = {
    Disbursed: "live",
    Underwriting: "brand",
  };
  return (
    <div className="flex h-full flex-col justify-between bg-white p-4 text-ink">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-semibold">Realfinserv</p>
          <p className="font-mono text-[9px] tracking-wide text-muted-foreground uppercase">
            Status Portal
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.customer}
            className="flex items-center justify-between gap-3 rounded-lg border border-border bg-ivory-2/60 px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium">{r.customer}</p>
              <p className="truncate text-[9.5px] text-muted-foreground">{r.detail}</p>
            </div>
            <Pill tone={statusTone[r.status]}>{r.status}</Pill>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground">
        <span className="live-dot size-1.5 rounded-full bg-live" />
        WhatsApp auto-notify on every status change
      </div>
    </div>
  );
}

/* Confidential — real dashboard can't be shown, so this is an original, */
/* illustrative recreation of the system's real workflow, not the actual UI. */
function StatementAnalyzerPreview() {
  const metrics = [
    { label: "Opening balance", value: "₹2,14,300" },
    { label: "Closing balance", value: "₹3,42,180" },
    { label: "Total credits", value: "₹4,86,000" },
    { label: "Total debits", value: "₹3,58,120" },
  ];
  return (
    <div className="flex h-full flex-col justify-between bg-white p-4 text-ink">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-semibold">Bank Statement Analyzer</p>
          <p className="font-mono text-[9px] tracking-wide text-muted-foreground uppercase">
            PDF → Financial summary
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg border border-border bg-ivory-2/60 px-3 py-2">
            <p className="font-mono text-[8.5px] tracking-wide text-muted-foreground uppercase">
              {m.label}
            </p>
            <p className="mt-0.5 text-[13px] font-semibold tracking-tight">{m.value}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground">
        <span className="live-dot size-1.5 rounded-full bg-live" />
        EMI detected · ₹18,400/mo · HDFC Bank
      </div>
    </div>
  );
}

const projects: Project[] = [
  {
    index: "01",
    name: "Arise Physiotherapy",
    category: "Public website · Healthcare",
    isPrivate: false,
    url: "arisephysiotherapy.com",
    scope: ["Custom design", "Appointment booking", "WhatsApp/Call", "Mobile-first"],
    note: "Live website",
    description:
      "A custom physiotherapy website built around patient journeys, clear treatment information and appointment conversion.",
    visual: (
      <img
        src={`${import.meta.env.BASE_URL}work/arise-physiotherapy.jpg`}
        alt="Arise Physiotherapy website"
        className="h-full w-full object-cover object-top"
      />
    ),
  },
  {
    index: "02",
    name: "Ilona Clinics",
    category: "Public website · Healthcare",
    isPrivate: false,
    url: "ilonaclinics.com",
    scope: ["Custom identity", "Consultation booking", "WhatsApp/Call", "Service discovery"],
    note: "Live website",
    description:
      "A dual-specialty clinic website for dermatology and endocrinology, structured around clear service discovery and consultation booking.",
    visual: (
      <img
        src={`${import.meta.env.BASE_URL}work/ilona-clinics.jpg`}
        alt="Ilona Clinics website"
        className="h-full w-full object-cover object-top"
      />
    ),
  },
  {
    index: "03",
    name: "PhysioZen",
    category: "Public website · Healthcare",
    isPrivate: false,
    url: "physiozenphysiotherapycentre.com",
    scope: ["Custom design", "Treatment pages", "WhatsApp/Call", "Contact"],
    note: "Live website",
    description:
      "A calm, conversion-focused website for a physiotherapy practice, built around treatment information and direct patient contact.",
    visual: (
      <img
        src={`${import.meta.env.BASE_URL}work/physiozen.jpg`}
        alt="PhysioZen website"
        className="h-full w-full object-cover object-top"
      />
    ),
  },
  {
    index: "04",
    name: "Saral Vidya",
    category: "Private business software",
    isPrivate: true,
    scope: [
      "Domestic & abroad loans",
      "Document tracking",
      "Stage-wise pipeline",
      "WhatsApp updates",
    ],
    note: "Education loan management system",
    description:
      "A custom system for managing education-loan enquiries, applications, documents, follow-ups and progress through to sanction and disbursal.",
    visual: <SaralVidyaPreview />,
  },
  {
    index: "05",
    name: "Realfinserv Status Portal",
    category: "Private business software",
    isPrivate: true,
    scope: [
      "Loan application pipeline",
      "Status tracking",
      "WhatsApp automation",
      "Zero manual follow-ups",
    ],
    note: "Loan application & status portal",
    description:
      "A custom portal for the team to manage loan applications, with automatic WhatsApp updates to customers on every status change.",
    visual: <RealfinservPreview />,
  },
  {
    index: "06",
    name: "AI Bank Statement Analyzer",
    category: "Private business software",
    isPrivate: true,
    scope: [
      "PDF statement parsing",
      "Automated financial summary",
      "Credit & debit analysis",
      "Loan & EMI detection",
    ],
    note: "AI-powered financial analysis tool",
    description:
      "A tool that reads bank statement PDFs and produces a structured summary of balances, credits, debits and detected EMI payments.",
    visual: <StatementAnalyzerPreview />,
  },
];

function ProjectCard({ p, delay }: { p: Project; delay: number }) {
  const [hover, setHover] = useState(false);
  const badgeLabel = p.isPrivate ? "Restricted" : p.url ? "Live" : "Reference";
  return (
    <Reveal delay={delay}>
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300",
          hover && "-translate-y-1 shadow-panel",
        )}
      >
        <div className="border-b border-border bg-ivory-3/50 p-3">
          <BrowserFrame
            url={p.url ?? (p.isPrivate ? "private-system.internal" : "reference-on-request")}
            tone="light"
            className="shadow-none"
            bodyClassName="h-[176px] overflow-hidden"
          >
            {p.visual}
          </BrowserFrame>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between">
            <span className="label-mono text-muted-foreground">
              {p.index} · {p.category}
            </span>
            <span
              className={cn(
                "label-mono",
                p.isPrivate ? "text-brand" : p.url ? "text-live" : "text-muted-foreground",
              )}
            >
              {badgeLabel}
            </span>
          </div>
          <h3 className="mt-2 text-lg font-medium tracking-tight">{p.name}</h3>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">{p.note}</p>
          <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted-foreground">
            {p.description}
          </p>

          <div
            className={cn(
              "grid transition-all duration-300",
              hover ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <ul className="flex flex-wrap gap-1.5">
                {p.scope.map((s) => (
                  <li
                    key={s}
                    className="rounded border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto pt-5">
            {p.url ? (
              <a
                href={`https://${p.url}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] text-brand"
              >
                {p.url}
                <span className="transition-transform group-hover:translate-x-0.5">↗</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                {p.isPrivate ? "Demo available on request" : "Reference available on request"}
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="bg-ivory py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <span className="label-mono text-brand">Selected work</span>
            <h2 className="headline mt-4 max-w-2xl text-[clamp(2rem,3.4vw,3.2rem)]">
              Digital experiences built for real businesses.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Here's what we've actually shipped: public websites and private business systems we
            can't publish, but can walk you through.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
