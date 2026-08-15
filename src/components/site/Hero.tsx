import { Link } from "@tanstack/react-router";
import { useEnquiryModal } from "./EnquiryModal";
import { HeroProductDeck } from "./HeroProductDeck";
import { Reveal } from "./Reveal";

export function Hero() {
  const openEnquiry = useEnquiryModal();
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ivory pt-28 pb-14 lg:flex lg:min-h-screen lg:items-center lg:pt-24 lg:pb-16"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60 [mask-image:radial-gradient(120%_80%_at_50%_0%,black,transparent)]" />
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] xl:gap-14">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="label-mono text-brand">Digital product studio</span>
              <span className="h-px w-12 bg-border" />
              <span className="label-mono text-muted-foreground">India · Remote</span>
            </div>

            <h1 className="headline mt-6 text-[1.875rem] sm:text-[clamp(2.1rem,2.75vw,2.85rem)]">
              The digital foundation your business needs to{" "}
              <span className="text-brand">grow.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted-foreground lg:text-[17px]">
              We design and build custom websites, software and automation that help businesses
              operate better, serve customers faster, and scale with confidence.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openEnquiry}
                className="group inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Start your project
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium transition-colors hover:bg-ivory-3"
              >
                View our work
              </Link>
            </div>

            <dl className="mt-10 hidden max-w-xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid lg:grid-cols-4">
              {[
                ["Websites", "Design + build"],
                ["Software", "CRM & internal tools"],
                ["Automation", "Built into both"],
                ["AI systems", "Agents that do real work"],
              ].map(([t, s]) => (
                <div key={t} className="bg-ivory-2 px-4 py-3.5">
                  <dt className="text-[13px] font-medium">{t}</dt>
                  <dd className="mt-0.5 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                    {s}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={140} className="relative">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-brand/8 blur-2xl" />
            <HeroProductDeck className="lg:translate-y-2" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
