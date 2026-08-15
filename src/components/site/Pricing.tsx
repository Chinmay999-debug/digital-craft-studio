import { useEnquiryModal } from "./EnquiryModal";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Website",
    price: "Starting at ₹15,000",
    sub: "Custom business website designed around what your customers need to see and do.",
    includes: [
      "Custom UI/UX design",
      "Mobile-first responsive build",
      "Business pages & content structure",
      "WhatsApp / enquiry integration",
      "SEO-ready structure",
    ],
    cta: "Start your project",
    featured: false,
  },
  {
    name: "Website + Google Business Profile",
    price: "₹20,000",
    sub: "Everything in the website package, plus a stronger local business presence.",
    includes: [
      "Everything in Website",
      "Google Business Profile setup",
      "Local business information",
      "Location & directions",
      "Local-search-ready structure",
    ],
    cta: "Start your project",
    featured: true,
  },
  {
    name: "Custom Software",
    price: "Custom pricing",
    sub: "Software built around how your business runs — CRM, customer portal, dashboard, or something else entirely.",
    includes: [
      "Business systems & internal tools",
      "Customer-facing platforms",
      "Dashboards & reporting",
      "Workflow automation",
      "Integrations & custom functionality",
    ],
    tagline: "From a single workflow to a complete business platform.",
    cta: "Talk about your project",
    featured: false,
  },
];

export function Pricing({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" } = {}) {
  const Heading = headingLevel;
  const openEnquiry = useEnquiryModal();
  return (
    <section id="pricing" className="bg-ivory py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <span className="label-mono text-brand">Pricing</span>
            <Heading className="headline mt-4 text-[clamp(2rem,3.4vw,3.2rem)]">
              Clear starting points.
            </Heading>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Tell us about your business and the problem you're solving. We'll scope the right
            website or software and quote it clearly.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 90} className="h-full">
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
                  {t.featured && (
                    <span className="label-mono text-ink-muted">Recommended starting point</span>
                  )}
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

                <div
                  className={cn(
                    "mt-6 border-t pt-6",
                    t.featured ? "border-ink-line" : "border-border",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] tracking-wider uppercase",
                      t.featured ? "text-ink-muted" : "text-muted-foreground",
                    )}
                  >
                    Includes
                  </span>
                  <ul
                    className={cn(
                      "mt-3 space-y-2.5 text-sm",
                      t.featured ? "text-ink-muted" : "text-muted-foreground",
                    )}
                  >
                    {t.includes.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {"tagline" in t && t.tagline && (
                  <p
                    className={cn(
                      "mt-5 text-sm font-medium",
                      t.featured ? "text-ink-fg" : "text-ink",
                    )}
                  >
                    {t.tagline}
                  </p>
                )}

                <div className="flex-1" />
                <button
                  type="button"
                  onClick={openEnquiry}
                  className={cn(
                    "mt-8 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
                    t.featured
                      ? "bg-brand text-primary-foreground hover:opacity-90"
                      : "border border-input hover:bg-ivory-3",
                  )}
                >
                  {t.cta} →
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280} className="mt-10 border-t border-border pt-6">
          <p className="max-w-2xl text-xs text-muted-foreground">
            Project pricing covers the agreed scope. Domain, hosting, paid third-party services and
            ongoing work outside the agreed scope are separate and communicated upfront.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
