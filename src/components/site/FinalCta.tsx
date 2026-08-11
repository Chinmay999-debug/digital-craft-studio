import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink py-24 text-ink-fg lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-70" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[100px]" />
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <span className="label-mono text-brand">Start a project</span>
            <h2 className="headline mt-5 max-w-3xl text-[clamp(2.2rem,4vw,3.8rem)]">
              Let's build software your business deserves.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-muted">
              Tell us what you're trying to improve. We'll figure out the right digital
              system for it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="mailto:hello@startupsetup.in"
                className="group inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Start your project
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-md border border-ink-line px-5 py-3 text-sm font-medium text-ink-fg transition-colors hover:bg-ink-2"
              >
                View our work
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line">
              {[
                ["Websites", "From ₹15,000"],
                ["Website + GBP", "₹20,000"],
                ["Custom software", "Scoped around your business"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between bg-ink px-5 py-4 transition-colors hover:bg-ink-2"
                >
                  <span className="text-sm">{k}</span>
                  <span className="font-mono text-[11px] text-ink-muted">{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <footer className="mt-20 flex flex-col gap-4 border-t border-ink-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-[6px] bg-ink-fg font-mono text-[11px] text-ink">
              SS
            </span>
            <span className="text-sm font-medium tracking-tight">Startup Setup</span>
          </div>
          <p className="font-mono text-[10px] tracking-wider text-ink-muted uppercase">
            Digital product studio · Websites · Custom software · Automation
          </p>
          <p className="font-mono text-[10px] tracking-wider text-ink-muted uppercase">
            © {new Date().getFullYear()} Startup Setup
          </p>
        </footer>
      </div>
    </section>
  );
}
