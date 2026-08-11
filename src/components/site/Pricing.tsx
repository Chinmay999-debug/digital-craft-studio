import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Website",
    price: "Starting at ₹15,000",
    sub: "Custom business website",
    points: ["Custom design", "Mobile-first build", "Lead capture / WhatsApp", "SEO-ready structure"],
    cta: "Start your project",
    featured: false,
  },
  {
    name: "Website + Google Business Profile",
    price: "₹20,000",
    sub: "Website with local presence setup",
    points: [
      "Everything in Website",
      "Google Business Profile setup",
      "Local search structure",
      "Contact & directions",
    ],
    cta: "Start your project",
    featured: true,
  },
  {
    name: "Custom software",
    price: "Custom pricing",
    sub: "Scoped around your business.",
    points: ["CRM & internal tools", "Dashboards & reporting", "Workflow automation", "Integrations"],
    cta: "Talk about scope",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-ivory py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <span className="label-mono text-brand">Pricing</span>
            <h2 className="headline mt-4 text-[clamp(2rem,3.4vw,3.2rem)]">
              Clear starting points.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Final scope is agreed before work begins. No hidden add-ons, no retainer you
            didn't ask for.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-xl border p-7 transition-all duration-300 hover:-translate-y-1",
                  t.featured
                    ? "border-transparent bg-ink text-ink-fg shadow-panel-dark"
                    : "border-border bg-card hover:shadow-panel",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={cn(
                      "label-mono",
                      t.featured ? "text-brand" : "text-muted-foreground",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t.featured && <span className="label-mono text-ink-muted">Most chosen</span>}
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-tight">{t.name}</h3>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    t.featured ? "text-ink-muted" : "text-muted-foreground",
                  )}
                >
                  {t.sub}
                </p>
                <p className="mt-6 text-[clamp(1.5rem,2vw,2rem)] font-medium tracking-tight">
                  {t.price}
                </p>
                <ul
                  className={cn(
                    "mt-6 space-y-2.5 border-t pt-6 text-sm",
                    t.featured ? "border-ink-line text-ink-muted" : "border-border text-muted-foreground",
                  )}
                >
                  {t.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={cn(
                    "mt-8 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
                    t.featured
                      ? "bg-brand text-primary-foreground hover:opacity-90"
                      : "border border-input hover:bg-ivory-3",
                  )}
                >
                  {t.cta} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Proof() {
  const items = [
    ["Real client projects", "Five shipped projects across healthcare, education and financial services."],
    ["Public + private work", "Live websites you can visit, and internal systems we can demo on request."],
    ["Design and engineering", "The same team designs the interface and builds what sits behind it."],
    ["Modern technology", "Current frameworks, sensible architecture, room to extend later."],
    ["Direct collaboration", "You talk to the people writing the code, not an account layer."],
    ["Honest scope", "No invented statistics, no borrowed logos, no placeholder testimonials."],
  ];
  return (
    <section className="bg-ivory-3/60 py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <span className="label-mono text-brand">Proof</span>
            <h2 className="headline mt-4 text-[clamp(1.8rem,3vw,2.8rem)]">
              What we can actually stand behind.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            We'd rather show the work than quote made-up praise. Verified client
            testimonials will be added here as they come.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
          {items.map(([t, b], i) => (
            <div key={t} className="group bg-ivory-2 p-6 transition-colors hover:bg-card">
              <span className="label-mono text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[15px] font-medium tracking-tight">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
