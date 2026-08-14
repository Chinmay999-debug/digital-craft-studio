import { SiFacebook, SiInstagram, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Mail, Phone } from "lucide-react";
import { useEnquiryModal } from "./EnquiryModal";
import { Reveal } from "./Reveal";

const contactLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/917425044822",
    icon: SiWhatsapp,
    external: true,
  },
  {
    label: "Call +91 74250 44822",
    href: "tel:+917425044822",
    icon: Phone,
    external: false,
  },
  {
    label: "Email contact@startupsetup.in",
    href: "mailto:contact@startupsetup.in",
    icon: Mail,
    external: false,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/startupsetup.in?utm_source=qr",
    icon: SiInstagram,
    external: true,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61577756885015",
    icon: SiFacebook,
    external: true,
  },
] as const;

export function FinalCta() {
  const openEnquiry = useEnquiryModal();
  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 text-ink-fg lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-70" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[100px]" />
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <span className="label-mono text-brand">Start a project</span>
            <h2 className="headline mt-5 max-w-3xl text-[2.0625rem] sm:text-[clamp(2.2rem,4vw,3.8rem)]">
              Let's build software your business deserves.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-muted">
              Tell us what you're trying to improve. We'll figure out the right digital system for
              it.
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

        <footer className="mt-16 border-t border-ink-line pt-8 lg:mt-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6">
            <div className="flex flex-wrap items-center gap-5">
              <span className="text-sm font-medium tracking-tight">Startup Setup</span>
              <div className="flex items-center gap-3.5">
                {contactLinks.map(({ label, href, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    title={label}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="text-ink-muted transition-colors hover:text-ink-fg"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <p className="font-mono text-[10px] tracking-wider text-ink-muted uppercase sm:text-center">
              <span className="block sm:inline">Digital product studio</span>
              <span className="hidden sm:inline"> · </span>
              <span className="block sm:inline">
                Websites · Custom software · Automation · AI tools
              </span>
            </p>

            <p className="-mt-3 font-mono text-[10px] tracking-wider text-ink-muted uppercase sm:mt-0 sm:text-right">
              © {new Date().getFullYear()} Startup Setup
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
