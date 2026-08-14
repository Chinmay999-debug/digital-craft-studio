import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  url,
  tone = "light",
  children,
  className,
  bodyClassName,
  live,
}: {
  url: string;
  tone?: "light" | "dark";
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  live?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border",
        dark
          ? "border-ink-line bg-ink-2 shadow-panel-dark"
          : "border-border bg-card shadow-panel",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-3 py-2.5",
          dark ? "border-ink-line bg-ink-3" : "border-border bg-ivory-2",
        )}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "size-2.5 rounded-full",
                dark ? "bg-ink-fg/15" : "bg-ink/15",
              )}
            />
          ))}
        </div>
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2 rounded-md px-2.5 py-1",
            dark ? "bg-ink/70" : "bg-ivory-3/70",
          )}
        >
          <svg viewBox="0 0 24 24" className={cn("size-3 shrink-0", dark ? "text-ink-muted" : "text-muted-foreground")} fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 1 1 8 0v3" />
          </svg>
          <span
            className={cn(
              "truncate font-mono text-[11px]",
              dark ? "text-ink-muted" : "text-muted-foreground",
            )}
          >
            {url}
          </span>
        </div>
        {live ? (
          <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-live uppercase">
            <span className="live-dot size-1.5 rounded-full bg-live" />
            {live}
          </span>
        ) : null}
      </div>
      <div className={cn(dark ? "bg-ink" : "bg-card", bodyClassName)}>{children}</div>
    </div>
  );
}
