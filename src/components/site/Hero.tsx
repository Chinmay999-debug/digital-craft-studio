import { BrowserFrame } from "./BrowserFrame";
import { DashboardMock } from "./mocks";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ivory pt-28 pb-14 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60 [mask-image:radial-gradient(120%_80%_at_50%_0%,black,transparent)]" />
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-14">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="label-mono text-brand">Digital product studio</span>
              <span className="h-px w-12 bg-border" />
              <span className="label-mono text-muted-foreground">India · Remote</span>
            </div>

            <h1 className="headline mt-6 text-[clamp(2.4rem,3.85vw,3.7rem)]">
              The digital foundation your business
              <br />
              needs to <span className="text-brand">grow.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted-foreground lg:text-[17px]">
              We design and build custom websites and software that help businesses
              operate better, serve customers faster, and scale with confidence.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Start your project
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-md border border-input px-5 py-3 text-sm font-medium transition-colors hover:bg-ivory-3"
              >
                View our work
              </a>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border">
              {[
                ["Websites", "Design + build"],
                ["Software", "CRM & internal tools"],
                ["Automation", "Built into both"],
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
            <BrowserFrame
              tone="dark"
              url="app.northline.co/overview"
              live="live"
              className="lg:translate-y-2"
            >
              <DashboardMock />
            </BrowserFrame>
            <div className="float-slow absolute -bottom-5 -left-4 hidden rounded-lg border border-border bg-card px-3.5 py-2.5 shadow-panel md:block">
              <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
                Automation
              </p>
              <p className="mt-0.5 text-[12px] font-medium">
                Booking → WhatsApp confirmation
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
