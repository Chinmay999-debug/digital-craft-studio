import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useEnquiryModal } from "./EnquiryModal";
import { cn } from "@/lib/utils";

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Work", "/work"],
  ["Process", "/process"],
  ["Why Us", "/why-us"],
  ["Pricing", "/pricing"],
  ["FAQ", "/faq"],
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const openEnquiry = useEnquiryModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-ivory/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="text-[15px] font-semibold tracking-tight">Startup Setup</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(([label, to]) => (
            <Link
              key={label}
              to={to}
              className="relative text-[13px] text-muted-foreground transition-colors hover:text-ink"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openEnquiry}
            className="group hidden items-center gap-2 rounded-md bg-ink px-4 py-2 text-[13px] font-medium text-ink-fg transition-colors hover:bg-brand sm:inline-flex"
          >
            Start a project
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-md border border-border lg:hidden"
          >
            <span className="space-y-1">
              <span className="block h-px w-4 bg-ink" />
              <span className="block h-px w-4 bg-ink" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-ivory px-6 py-4 lg:hidden">
          <div className="grid gap-1">
            {links.map(([label, to]) => (
              <Link
                key={label}
                to={to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-muted-foreground hover:bg-ivory-3 hover:text-ink"
              >
                {label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openEnquiry();
              }}
              className="mt-2 rounded-md bg-ink px-4 py-2.5 text-center text-sm font-medium text-ink-fg"
            >
              Start a project →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
