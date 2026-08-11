import { BrowserFrame } from "./BrowserFrame";
import { CrmMock, WebsiteMock } from "./mocks";
import { Reveal } from "./Reveal";

function Capabilities({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ink-line bg-ink-line sm:grid-cols-3 lg:grid-cols-2">
      {items.map((c) => (
        <li
          key={c}
          className="group flex items-center gap-2.5 bg-ink px-4 py-3 text-[13px] text-ink-fg transition-colors hover:bg-ink-2"
        >
          <span className="size-1 rounded-full bg-brand transition-transform group-hover:scale-150" />
          {c}
        </li>
      ))}
    </ul>
  );
}

export function WhatWeBuild() {
  return (
    <section id="services" className="relative overflow-hidden bg-ink py-20 text-ink-fg lg:py-24">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-70" />
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-ink-line pb-8">
          <div>
            <span className="label-mono text-brand">What we build</span>
            <h2 className="headline mt-4 max-w-3xl text-[clamp(2rem,3.4vw,3.2rem)]">
              Digital products built around the way your business actually works.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-muted">
            Two core things — websites and custom software — with automation and AI
            built in where they genuinely save time.
          </p>
        </Reveal>

        {/* WEBSITES */}
        <div className="grid items-center gap-8 border-b border-ink-line py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-14">
          <Reveal>
            <span className="label-mono text-ink-muted">01 / Websites</span>
            <h3 className="headline mt-3 text-[clamp(1.6rem,2.4vw,2.4rem)]">
              Business websites that convert attention into customers.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
              Custom-designed, fast, and structured around the actions that matter —
              booking, enquiring, calling, buying.
            </p>
            <div className="mt-7">
              <Capabilities
                items={[
                  "Custom design",
                  "Booking",
                  "WhatsApp",
                  "Lead capture",
                  "SEO-ready structure",
                  "Mobile-first",
                ]}
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <BrowserFrame url="westbrookphysio.com" live="published">
              <WebsiteMock />
            </BrowserFrame>
          </Reveal>
        </div>

        {/* SOFTWARE */}
        <div className="grid items-center gap-8 py-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal delay={120} className="order-2 lg:order-1">
            <BrowserFrame tone="dark" url="app.ledgerly.io/pipeline" live="live">
              <CrmMock />
            </BrowserFrame>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <span className="label-mono text-ink-muted">02 / Custom software</span>
            <h3 className="headline mt-3 text-[clamp(1.6rem,2.4vw,2.4rem)]">
              Software shaped to your operations, not a subscription you adapt to.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
              CRMs, dashboards and internal tools that hold your real data, your real
              statuses and your real follow-ups — with automation doing the repetitive part.
            </p>
            <div className="mt-7">
              <Capabilities
                items={[
                  "CRM",
                  "Dashboards",
                  "Business workflows",
                  "Integrations",
                  "Automation",
                  "Internal tools",
                ]}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
