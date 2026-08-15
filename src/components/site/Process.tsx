import { useEffect, useRef, useState } from "react";
import { BrowserFrame } from "./BrowserFrame";
import { BuildMock, DesignMock, DiscoverMock, LaunchMock, SupportMock } from "./mocks";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "Understand the business, users and workflow.",
    url: "studio.startupsetup.in/discovery",
    visual: <DiscoverMock />,
  },
  {
    n: "02",
    title: "Plan & Design",
    body: "Map the experience, screens and system before development.",
    url: "studio.startupsetup.in/design",
    visual: <DesignMock />,
  },
  {
    n: "03",
    title: "Build",
    body: "Develop the website, software and integrations in focused milestones.",
    url: "studio.startupsetup.in/build",
    visual: <BuildMock />,
  },
  {
    n: "04",
    title: "Launch",
    body: "Test, deploy and put the product into real use.",
    url: "studio.startupsetup.in/release",
    visual: <LaunchMock />,
  },
  {
    n: "05",
    title: "Support & Improve",
    body: "Continue improving the system as the business grows.",
    url: "studio.startupsetup.in/health",
    visual: <SupportMock />,
  },
];

export function Process({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" } = {}) {
  const Heading = headingLevel;
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset["index"]);
            setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className="bg-ivory-2 py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <span className="label-mono text-brand">How we work</span>
            <Heading className="headline mt-4 max-w-3xl text-[1.75rem] sm:text-[clamp(2rem,3.4vw,3.2rem)]">
              From idea to something your business can actually use.
            </Heading>
          </div>
          <p className="max-w-xs font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            Five stages · milestone based · no black boxes
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="relative">
            <span className="absolute top-2 bottom-2 left-[13px] hidden w-px bg-border lg:block" />
            <span
              className="absolute left-[13px] hidden w-px bg-brand transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block"
              style={{ top: 8, height: `${((active + 1) / steps.length) * 92}%` }}
            />
            <div className="space-y-2">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 70}>
                  <div
                    data-index={i}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "relative cursor-default rounded-lg py-5 pr-4 pl-5 transition-colors lg:pl-12",
                      active === i ? "bg-card shadow-panel" : "lg:hover:bg-ivory-3/60",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-7 left-[7px] hidden size-3.5 rounded-full border-2 transition-colors lg:block",
                        active === i ? "border-brand bg-brand" : "border-border bg-ivory-2",
                      )}
                    />
                    <div className="flex items-baseline gap-3">
                      <span
                        className={cn(
                          "font-mono text-[11px]",
                          active === i ? "text-brand" : "text-muted-foreground",
                        )}
                      >
                        {s.n}
                      </span>
                      <h3 className="text-lg font-medium tracking-tight">{s.title}</h3>
                    </div>
                    <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{s.body}</p>

                    {/* Below lg there's no room for a synced sticky pane, so each step carries its own visual. */}
                    <div className="mt-4 lg:hidden">
                      <BrowserFrame tone="dark" url={s.url} live={s.title.toLowerCase()}>
                        {s.visual}
                      </BrowserFrame>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <div className="relative">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  aria-hidden={active !== i}
                  className={cn(
                    "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    active === i
                      ? "relative z-10 translate-y-0 opacity-100"
                      : "pointer-events-none absolute inset-0 translate-y-3 opacity-0",
                  )}
                >
                  <BrowserFrame tone="dark" url={s.url} live={s.title.toLowerCase()}>
                    {s.visual}
                  </BrowserFrame>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              <span>Stage {steps[active]?.n} of 05</span>
              <span>{steps[active]?.title}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
