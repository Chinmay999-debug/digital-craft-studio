import { useState } from "react";
import { BrowserFrame } from "./BrowserFrame";
import { Pill } from "./mocks";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const principles = [
  ["01", "Built around your workflow", "Your business doesn't have to adapt to the software."],
  ["02", "Real software, not just pretty screens", "We build the thing behind the interface too."],
  ["03", "Modern, adaptable technology", "Built with technology that can evolve."],
  ["04", "Practical over complicated", "We build what your business needs."],
  ["05", "Direct collaboration", "You work directly with the people building it."],
  ["06", "Built for what comes next", "The system should grow with your business."],
] as const;

function SystemVisual({ active }: { active: number }) {
  const layers = [
    ["Interface", "Web · mobile · internal console"],
    ["Business logic", "Rules, roles, workflows"],
    ["Data", "Customers, bookings, records"],
    ["Automation", "Notifications, follow-ups, reports"],
    ["Integrations", "Payments, WhatsApp, email, sheets"],
    ["Foundation", "Hosting, backups, monitoring"],
  ];
  return (
    <div className="p-5 text-ink-fg">
      <div className="flex items-center justify-between">
        <p className="text-xs">System architecture</p>
        <Pill tone="live">operational</Pill>
      </div>
      <div className="mt-4 space-y-1.5">
        {layers.map(([name, desc], i) => (
          <div
            key={name}
            className={cn(
              "flex items-center justify-between rounded-md border px-3 py-3 transition-all duration-300",
              i === active
                ? "border-brand bg-brand/10 translate-x-1"
                : "border-ink-line bg-ink-2/50",
            )}
          >
            <span className="text-[12px]">{name}</span>
            <span className="hidden font-mono text-[10px] text-ink-muted sm:block">
              {desc}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[10px] text-ink-muted">
        <span className="rounded border border-ink-line px-2 py-1.5 text-center">
          Role-based
        </span>
        <span className="rounded border border-ink-line px-2 py-1.5 text-center">
          Audit trail
        </span>
        <span className="rounded border border-ink-line px-2 py-1.5 text-center">
          Extensible
        </span>
      </div>
    </div>
  );
}

export function WhyUs() {
  const [active, setActive] = useState(0);
  return (
    <section id="why" className="relative overflow-hidden bg-ink py-20 text-ink-fg lg:py-24">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-60" />
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal className="grid gap-6 border-b border-ink-line pb-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <span className="label-mono text-brand">Why Startup Setup</span>
            <h2 className="headline mt-4 text-[clamp(2rem,3.4vw,3.2rem)]">
              Built for your business. Not a template.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-ink-muted">
            We combine thoughtful design, modern development and practical technology to
            build digital products that fit the way your business actually works.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="grid gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line sm:grid-cols-2">
            {principles.map(([n, title, body], i) => (
              <button
                key={n}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "group flex flex-col items-start gap-2 p-6 text-left transition-colors",
                  active === i ? "bg-ink-2" : "bg-ink hover:bg-ink-2/70",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[11px] transition-colors",
                    active === i ? "text-brand" : "text-ink-muted",
                  )}
                >
                  {n}
                </span>
                <span className="text-[15px] leading-snug font-medium">{title}</span>
                <span className="text-[13px] text-ink-muted">{body}</span>
              </button>
            ))}
          </div>

          <Reveal delay={120} className="lg:sticky lg:top-24 lg:self-start">
            <BrowserFrame tone="dark" url="app.yourbusiness.com/system" live="yours">
              <SystemVisual active={active} />
            </BrowserFrame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
