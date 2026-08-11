import { useState } from "react";
import { BrowserFrame } from "./BrowserFrame";
import { ClinicSitePreview, PrivateSystemPreview } from "./mocks";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Project = {
  index: string;
  name: string;
  category: string;
  scope: string[];
  url?: string;
  note: string;
  visual: React.ReactNode;
  tagline?: string;
};

const projects: Project[] = [
  {
    index: "01",
    name: "Arise Physiotherapy",
    category: "Public website",
    url: "arisephysiotherapy.com",
    scope: ["Website", "Booking journey", "SEO structure"],
    note: "Live website",
    visual: (
      <ClinicSitePreview
        name="Arise Physiotherapy"
        tagline="Physiotherapy care built around your recovery."
      />
    ),
  },
  {
    index: "02",
    name: "Ilona Clinics",
    category: "Public website",
    url: "ilonaclinics.com",
    scope: ["Website", "Clinic services", "Enquiry flow"],
    note: "Live website",
    visual: (
      <ClinicSitePreview
        name="Ilona Clinics"
        tagline="Clinic services presented clearly, booked easily."
      />
    ),
  },
  {
    index: "03",
    name: "PhysioZen",
    category: "Public website",
    scope: ["Website", "Treatment pages", "Contact"],
    note: "Client project",
    visual: (
      <ClinicSitePreview
        name="PhysioZen"
        tagline="A calm, focused presence for a physiotherapy practice."
      />
    ),
  },
  {
    index: "04",
    name: "Saral Vidya",
    category: "Private business software",
    scope: ["Internal system", "Records", "Workflows"],
    note: "Demo available on request",
    visual: <PrivateSystemPreview kind="education" />,
  },
  {
    index: "05",
    name: "RealFinServ",
    category: "Private business software",
    scope: ["Internal system", "Client records", "Workflows"],
    note: "Demo available on request",
    visual: <PrivateSystemPreview kind="finance" />,
  },
];

function ProjectCard({ p, delay }: { p: Project; delay: number }) {
  const [hover, setHover] = useState(false);
  const isPrivate = p.category === "Private business software";
  return (
    <Reveal delay={delay}>
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300",
          hover && "-translate-y-1 shadow-panel",
        )}
      >
        <div className="border-b border-border bg-ivory-3/50 p-3">
          <BrowserFrame
            url={p.url ?? "private-system.internal"}
            tone={isPrivate ? "dark" : "light"}
            className="shadow-none"
            bodyClassName="h-[176px] overflow-hidden"
          >
            {p.visual}
          </BrowserFrame>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between">
            <span className="label-mono text-muted-foreground">
              {p.index} · {p.category}
            </span>
            {isPrivate ? (
              <span className="label-mono text-brand">Restricted</span>
            ) : (
              <span className="label-mono text-live">Live</span>
            )}
          </div>
          <h3 className="mt-2 text-lg font-medium tracking-tight">{p.name}</h3>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">{p.note}</p>

          <div
            className={cn(
              "grid transition-all duration-300",
              hover ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <ul className="flex flex-wrap gap-1.5">
                {p.scope.map((s) => (
                  <li
                    key={s}
                    className="rounded border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto pt-5">
            {p.url ? (
              <a
                href={`https://${p.url}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] text-brand"
              >
                {p.url}
                <span className="transition-transform group-hover:translate-x-0.5">↗</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                {isPrivate ? "Demo available on request" : "Reference on request"}
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="bg-ivory py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <span className="label-mono text-brand">Selected work</span>
            <h2 className="headline mt-4 max-w-2xl text-[clamp(2rem,3.4vw,3.2rem)]">
              Digital experiences built for real businesses.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Here's what we've actually shipped — public websites and private business
            systems we can't publish, but can walk you through.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} delay={i * 80} />
          ))}
          <Reveal delay={400}>
            <div className="flex h-full flex-col justify-between rounded-xl border border-dashed border-input bg-ivory-2 p-6">
              <div>
                <span className="label-mono text-muted-foreground">Next</span>
                <h3 className="headline mt-3 text-2xl">
                  Your project could be the next one here.
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  We take on a small number of projects at a time so each one gets
                  proper design and engineering attention.
                </p>
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-ink-fg transition-colors hover:bg-brand"
              >
                Start your project →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
