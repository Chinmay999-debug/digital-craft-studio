import { useState } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const faqs = [
  [
    "What does Startup Setup build?",
    "We design and build custom business websites and custom business software (CRMs, dashboards and internal tools), with automation and AI capabilities built in where useful.",
  ],
  [
    "How much does a website cost?",
    "Websites start at ₹15,000. A website with Google Business Profile setup is ₹20,000. Custom software is scoped and priced around your requirements.",
  ],
  [
    "Can you build custom software for an existing business?",
    "Yes. Most of our software work starts with an existing business and existing processes. We map how you work today, then build a system around it.",
  ],
  [
    "Can I see the private software you've built?",
    "Systems like Saral Vidya and RealFinServ are private client systems, so we don't publish links. We can walk you through a demo on request.",
  ],
  [
    "How long does a project take?",
    "It depends on scope. Websites are typically the faster track; software is delivered in focused milestones so you see working pieces as we go. We commit to a timeline after the discovery stage.",
  ],
  [
    "Do you provide support after launch?",
    "Yes. Launch is a stage, not the end. We continue supporting and improving the system as your business grows.",
  ],
] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-ivory py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <Reveal>
            <span className="label-mono text-brand">FAQ</span>
            <h2 className="headline mt-4 text-[clamp(1.8rem,3vw,2.8rem)]">
              Questions we get before we start.
            </h2>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Anything else, ask directly. We answer scope and pricing questions before you commit
              to anything.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {faqs.map(([q, a], i) => (
                <div key={q} className="border-b border-border last:border-0">
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-ivory-2"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] font-medium tracking-tight">{q}</span>
                    </span>
                    <span
                      className={cn(
                        "shrink-0 text-lg text-muted-foreground transition-transform duration-300",
                        open === i && "rotate-45 text-brand",
                      )}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300",
                      open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl px-6 pb-5 pl-[4.25rem] text-sm leading-relaxed text-muted-foreground">
                        {a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
