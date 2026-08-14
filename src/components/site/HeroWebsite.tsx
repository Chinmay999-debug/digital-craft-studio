import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { business, serviceById, services } from "./heroProductData";

/* ------------------------------------------------------------------ */
/*  Crestline Home Services — the customer-facing website.            */
/*  Real state: nav actually scrolls, a service card actually         */
/*  expands, and "Book a service" actually runs a booking flow with   */
/*  a real confirmation state. The timers below just play that same   */
/*  flow back automatically so the Hero can show it without a click.  */
/* ------------------------------------------------------------------ */

type Section = "home" | "services" | "about" | "reviews";

type BookingStep = "service" | "date" | "time" | "details" | "confirming" | "confirmed";

interface BookingState {
  step: BookingStep;
  serviceId: string;
  date?: string;
  time?: string;
}

const NAV: { id: Section; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "reviews", label: "Reviews" },
];

const dayOptions = [
  { id: "today", label: "Today", available: true },
  { id: "tomorrow", label: "Tomorrow", available: true },
  { id: "wed", label: "Wed 14", available: false },
  { id: "thu", label: "Thu 15", available: true },
];

const timeOptions = ["9:00 AM", "11:30 AM", "2:30 PM", "5:00 PM"];

function ServiceIcon({ id }: { id: string }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 } as const;
  switch (id) {
    case "electrical":
      return (
        <svg {...common} className="size-4">
          <polygon points="13 2 4 14 11 14 10 22 20 10 13 10 13 2" />
        </svg>
      );
    case "plumbing":
      return (
        <svg {...common} className="size-4">
          <path d="M12 3s6.5 7 6.5 11a6.5 6.5 0 1 1-13 0C5.5 10 12 3 12 3Z" />
        </svg>
      );
    case "ac":
      return (
        <svg {...common} className="size-4">
          <path d="M12 2v20M4.5 6.5l15 11M4.5 17.5l15-11" />
        </svg>
      );
    default:
      return (
        <svg {...common} className="size-4">
          <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
          <path d="M3 8l9 5 9-5M12 13v8" />
        </svg>
      );
  }
}

function StarRow() {
  return (
    <div className="flex gap-0.5 text-brand">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-3" fill="currentColor">
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export function HeroWebsite() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingState | null>(null);
  const [quickServiceId, setQuickServiceId] = useState("ac");

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Partial<Record<Section, HTMLDivElement | null>>>({});

  function goTo(section: Section) {
    setActiveSection(section);
    const el = sectionRefs.current[section];
    const scroller = scrollerRef.current;
    if (el && scroller) scroller.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  }

  function toggleService(id: string) {
    setExpandedServiceId((cur) => (cur === id ? null : id));
  }

  function openBooking(serviceId: string, step: BookingStep = "service") {
    setBooking({ serviceId, step });
  }

  function confirmBooking() {
    setBooking((b) => (b ? { ...b, step: "confirming" } : b));
    window.setTimeout(() => {
      setBooking((b) => (b && b.step === "confirming" ? { ...b, step: "confirmed" } : b));
    }, 450);
  }

  /* ---- passive showcase: just scroll through the real page, nothing more ---- */
  useEffect(() => {
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    at(600, () => goTo("services"));
    at(2400, () => goTo("about"));
    at(4200, () => goTo("reviews"));

    return () => timers.forEach((id) => window.clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRef = (id: Section) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="relative flex h-full flex-col bg-ivory-2 text-ink">
      <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-3">
        <span className="text-[13px] font-semibold tracking-tight">{business.name}</span>
        <nav className="hidden items-center gap-5 text-[12.5px] sm:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => goTo(n.id)}
              className={cn(
                "relative py-1 transition-colors",
                activeSection === n.id ? "text-ink" : "text-muted-foreground hover:text-ink",
              )}
            >
              {n.label}
              {activeSection === n.id && (
                <span className="absolute inset-x-0 -bottom-[3px] h-[1.5px] bg-brand" />
              )}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${business.phone}`}
            className="hidden items-center gap-1.5 text-[11px] text-muted-foreground transition-colors hover:text-ink sm:flex"
          >
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6.5 4h2.7l1.3 4-2 1.3a11 11 0 0 0 5.2 5.2l1.3-2 4 1.3v2.7a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
            </svg>
            {business.phone}
          </a>
          <button
            type="button"
            onClick={() => openBooking(expandedServiceId ?? "electrical")}
            className="rounded-md bg-brand px-2.5 py-1.5 text-[10.5px] font-medium text-primary-foreground"
          >
            Book a service
          </button>
        </div>
      </div>

      <div ref={scrollerRef} className="no-scrollbar min-h-0 flex-1 overflow-y-auto scroll-smooth">
        {/* Home */}
        <div ref={setRef("home")} className="grid gap-5 p-5 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="label-mono text-brand">Licensed & insured · {business.city}</span>
            <h4 className="mt-2 text-[24px] leading-[1.1] font-medium tracking-tight">
              Home repairs done properly, <br /> not just done fast.
            </h4>
            <p className="mt-2.5 max-w-sm text-[12.5px] text-muted-foreground">
              Electricians, plumbers and AC technicians for {business.city} homes. Upfront
              pricing, no callback fees.
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => openBooking("electrical")}
                className="rounded-md bg-ink px-3 py-1.5 text-[11px] font-medium text-ink-fg"
              >
                Book a service
              </button>
              <button
                type="button"
                onClick={() => goTo("services")}
                className="rounded-md border border-border px-3 py-1.5 text-[11px] font-medium"
              >
                View services
              </button>
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground">
              {business.hours} · Serving {business.areas.join(", ")}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-3.5">
            <p className="text-[11.5px] font-medium">Get a quote in 2 minutes</p>
            <p className="mt-1 text-[10.5px] text-muted-foreground">
              Tell us what you need and see today's open slots.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setQuickServiceId(s.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md border px-2 py-2 text-left transition-colors",
                    quickServiceId === s.id
                      ? "border-brand/50 bg-brand/6 text-ink"
                      : "border-border text-muted-foreground hover:border-ink/20",
                  )}
                >
                  <ServiceIcon id={s.id} />
                  <span className="truncate text-[10px]">{s.shortName}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => openBooking(quickServiceId, "date")}
              className="mt-3 w-full rounded-md bg-brand py-2 text-[11px] font-medium text-primary-foreground"
            >
              Check available times
            </button>
            <p className="mt-2.5 text-center text-[10px] text-muted-foreground">
              No account needed · confirmed by WhatsApp
            </p>
          </div>
        </div>

        {/* Services */}
        <div ref={setRef("services")} className="border-t border-border p-5">
          <p className="label-mono text-brand">Services</p>
          <h5 className="mt-1.5 text-[17px] font-medium tracking-tight">What we handle</h5>
          <div className="mt-3 space-y-2">
            {services.map((s) => {
              const expanded = expandedServiceId === s.id;
              return (
                <div
                  key={s.id}
                  className={cn(
                    "overflow-hidden rounded-lg border bg-card transition-colors",
                    expanded ? "border-brand/40" : "border-border",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleService(s.id)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-ivory-3/60"
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-md",
                        expanded ? "bg-brand/12 text-brand" : "bg-ivory-3 text-muted-foreground",
                      )}
                    >
                      <ServiceIcon id={s.id} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[11.5px] font-medium">{s.name}</span>
                      <span className="mt-0.5 block font-mono text-[9px] text-muted-foreground">
                        {s.duration} · {s.priceFrom}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "shrink-0 font-mono text-[10px] text-muted-foreground transition-transform",
                        expanded && "rotate-45 text-brand",
                      )}
                    >
                      +
                    </span>
                  </button>
                  {expanded && (
                    <div className="border-t border-border px-3 py-2.5">
                      <p className="text-[10.5px] leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {s.included.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-1.5 text-[10.5px] text-ink"
                          >
                            <span className="size-1 rounded-full bg-brand" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => openBooking(s.id, "date")}
                        className="mt-2.5 rounded-md bg-ink px-2.5 py-1.5 text-[10.5px] font-medium text-ink-fg"
                      >
                        Book this service
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* About */}
        <div ref={setRef("about")} className="border-t border-border bg-ivory-3/50 p-5">
          <p className="label-mono text-brand">About</p>
          <h5 className="mt-1.5 text-[17px] font-medium tracking-tight">Who's coming to your door</h5>
          <p className="mt-2 max-w-md text-[11px] leading-relaxed text-muted-foreground">
            Started in 2019 by two electricians tired of unreliable callouts. Crestline's
            technicians now cover electrical, plumbing, AC and appliance work, background-checked
            and trained on the brands they install.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(
              [
                ["Imran Shaikh", "Electrician"],
                ["Suresh Kumar", "Plumber"],
                ["Devika Rao", "Installation technician"],
              ] as const
            ).map(([n, r]) => (
              <div key={n} className="rounded-lg border border-border bg-card p-2.5">
                <span className="grid size-6 place-items-center rounded-full bg-brand/12 text-[9px] font-medium text-brand">
                  {n
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
                <p className="mt-1.5 text-[10.5px] font-medium">{n}</p>
                <p className="text-[10px] text-muted-foreground">{r}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div ref={setRef("reviews")} className="border-t border-border p-5">
          <p className="label-mono text-brand">Reviews</p>
          <h5 className="mt-1.5 text-[17px] font-medium tracking-tight">What homeowners say</h5>
          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              [
                "“Devika installed our new AC in under two hours and explained the maintenance schedule before she left.”",
                "Aarav S.",
                "Koramangala",
              ],
              [
                "“Booked electrical work for the next morning and Imran turned up on time with everything he needed.”",
                "Rina K.",
                "Whitefield",
              ],
            ].map(([quote, name, area]) => (
              <div key={name} className="rounded-lg border border-border bg-card p-3">
                <StarRow />
                <p className="mt-1.5 text-[10.5px] leading-relaxed text-ink">{quote}</p>
                <p className="mt-2 text-[10px] text-muted-foreground">
                  {name} · {area}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-ivory-3/50 px-5 py-3 text-[10.5px] text-muted-foreground">
          <span>{business.name}</span>
          <span>{business.phone} · {business.hours}</span>
        </div>
      </div>

      {/* Booking overlay */}
      {booking && (
        <div className="absolute inset-0 z-10 flex flex-col bg-ivory-2/98 backdrop-blur-[1px]">
          <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-3">
            <div>
              <p className="text-[11px] font-medium">Book a service</p>
              <p className="text-[10px] text-muted-foreground">
                {serviceById(booking.serviceId).name}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setBooking(null)}
              className="grid size-6 place-items-center rounded-md border border-border text-[11px] text-muted-foreground"
            >
              ✕
            </button>
          </div>

          <div key={booking.step} className="step-in min-h-0 flex-1 overflow-y-auto p-5">
            {booking.step === "service" && (
              <div className="space-y-1.5">
                <p className="text-[10.5px] text-muted-foreground">Choose a service</p>
                {services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setBooking({ serviceId: s.id, step: "date" })}
                    className="flex w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-left"
                  >
                    <span className="text-[11px]">{s.name}</span>
                    <span className="font-mono text-[9px] text-muted-foreground">{s.priceFrom}</span>
                  </button>
                ))}
              </div>
            )}

            {booking.step === "date" && (
              <div>
                <p className="text-[10.5px] text-muted-foreground">Pick a date</p>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {dayOptions.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      disabled={!d.available}
                      onClick={() => setBooking((b) => (b ? { ...b, date: d.label, step: "time" } : b))}
                      className={cn(
                        "rounded-md border px-1 py-2.5 text-center font-mono text-[10px]",
                        d.available
                          ? "border-border text-ink hover:border-brand"
                          : "cursor-not-allowed border-border text-muted-foreground/50",
                      )}
                    >
                      {d.label}
                      {!d.available && <span className="mt-1 block text-[8px]">Full</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {booking.step === "time" && (
              <div>
                <p className="text-[10.5px] text-muted-foreground">{booking.date} · pick a time</p>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {timeOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setBooking((b) => (b ? { ...b, time: t, step: "details" } : b))}
                      className="rounded-md border border-border px-1 py-2 text-center font-mono text-[10px] text-ink hover:border-brand"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {booking.step === "details" && (
              <div>
                <div className="rounded-md border border-border bg-card p-2.5 text-[10.5px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span>{serviceById(booking.serviceId).name}</span>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <span className="text-muted-foreground">When</span>
                    <span>
                      {booking.date} · {booking.time}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-[10.5px] text-muted-foreground">Your details</p>
                <div className="mt-1.5 space-y-1.5">
                  <div className="rounded-md border border-border bg-card px-2.5 py-2 text-[10.5px]">
                    Aarav Sharma
                  </div>
                  <div className="rounded-md border border-border bg-card px-2.5 py-2 text-[10.5px]">
                    +91 98••• ••42 · Koramangala
                  </div>
                </div>
                <button
                  type="button"
                  onClick={confirmBooking}
                  className="mt-3 w-full rounded-md bg-brand py-2 text-[11px] font-medium text-primary-foreground"
                >
                  Confirm booking
                </button>
              </div>
            )}

            {booking.step === "confirming" && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="grid size-9 place-items-center rounded-full bg-ink/5">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 animate-spin text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="9" strokeWidth="2" strokeOpacity="0.25" />
                    <path d="M21 12a9 9 0 0 0-9-9" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <p className="mt-3 text-[11.5px] text-muted-foreground">Confirming your booking…</p>
              </div>
            )}

            {booking.step === "confirmed" && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="grid size-9 place-items-center rounded-full bg-live/15 text-live">
                  <svg viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <p className="mt-3 text-[13px] font-medium">Booking confirmed</p>
                <p className="mt-1 text-[10.5px] text-muted-foreground">
                  {serviceById(booking.serviceId).name} · {booking.date} · {booking.time}
                </p>
                <p className="mt-2 font-mono text-[9px] text-muted-foreground">Ref CRS-2481</p>
                <p className="mt-3 max-w-[220px] text-[10px] text-muted-foreground">
                  We'll confirm your technician on WhatsApp shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
