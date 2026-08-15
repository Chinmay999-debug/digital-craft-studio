import { useEffect, useRef, useState } from "react";
import { BrowserFrame } from "./BrowserFrame";
import { Reveal } from "./Reveal";
import { PRODUCT_URLS, WhyUsProduct } from "./WhyUsProduct";
import { cn } from "@/lib/utils";

const principles = [
  [
    "01",
    "Built around your workflow",
    "Enquiries, bookings and follow-ups move through the stages your business already uses, not stages we invented.",
  ],
  [
    "02",
    "The system behind the screen",
    "Every website enquiry becomes a real customer record, not just an email that gets missed.",
  ],
  [
    "03",
    "One team, end to end",
    "Website, CRM, bookings and automation live in one connected system, not four separate vendors.",
  ],
  [
    "04",
    "Designed to grow with you",
    "New modules like payments and reporting slot into the same system as your business needs them.",
  ],
  [
    "05",
    "Practical over complicated",
    "The interface only shows what someone actually needs to act on today.",
  ],
  [
    "06",
    "Built to keep improving",
    "We keep refining the workflow, automations and details after launch, not just at handoff.",
  ],
] as const;

const DESKTOP_HEIGHT = "h-[460px]";
const MOBILE_HEIGHT = "h-[340px]";

export function WhyUs({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" } = {}) {
  const Heading = headingLevel;
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const els = itemRefs.current.filter((el): el is HTMLButtonElement => el !== null);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = itemRefs.current.indexOf(entry.target as HTMLButtonElement);
          if (idx !== -1) setActive(idx);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="why" className="relative overflow-hidden bg-ink py-20 text-ink-fg lg:py-24">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-60" />
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal className="grid grid-cols-1 gap-6 border-b border-ink-line pb-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <span className="label-mono text-brand">Why Startup Setup</span>
            <Heading className="headline mt-4 text-[clamp(2rem,3.4vw,3.2rem)]">
              Built for your business. Not a template.
            </Heading>
          </div>
          <p className="text-sm leading-relaxed text-ink-muted">
            We don't start with a template and ask your business to fit it. We start with how your
            business works, then build the digital system around it.
          </p>
        </Reveal>

        {/* Desktop: principles grid + sticky live product */}
        <div className="mt-12 hidden gap-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="grid gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line sm:grid-cols-2">
            {principles.map(([n, title, body], i) => (
              <button
                key={n}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
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
            <BrowserFrame tone="dark" url={PRODUCT_URLS[active] ?? PRODUCT_URLS[0]!} live="yours">
              <div className={DESKTOP_HEIGHT}>
                <WhyUsProduct active={active} />
              </div>
            </BrowserFrame>
          </Reveal>
        </div>

        {/* Mobile: each principle followed by its own product state */}
        <div className="mt-10 space-y-10 lg:hidden">
          {principles.map(([n, title, body], i) => (
            <Reveal key={n} className="space-y-4">
              <div>
                <span className="font-mono text-[11px] text-brand">{n}</span>
                <p className="mt-2 text-[16px] leading-snug font-medium">{title}</p>
                <p className="mt-1 text-[13px] text-ink-muted">{body}</p>
              </div>
              <BrowserFrame tone="dark" url={PRODUCT_URLS[i] ?? PRODUCT_URLS[0]!} live="yours">
                <div className={MOBILE_HEIGHT}>
                  <WhyUsProduct active={i} />
                </div>
              </BrowserFrame>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
