import { useEffect, useState } from "react";
import { BrowserFrame } from "./BrowserFrame";
import { HeroSoftware } from "./HeroSoftware";
import { HeroWebsite } from "./HeroWebsite";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Hero product deck — crossfades between the two sides of Crestline  */
/*  Home Services: the website customers book from, and the ops       */
/*  software the business runs on. Each side is a real, interactive   */
/*  mini product (see HeroWebsite / HeroSoftware) — this file just    */
/*  frames it in a browser chrome and rotates between the two.        */
/* ------------------------------------------------------------------ */

const BODY_HEIGHT = "h-[518px]";
const DISPLAY_MS = 7400;
const FADE_MS = 380;

const PRODUCTS = [
  {
    id: "website",
    url: "crestlineservices.com",
    live: "published",
    tone: "light" as const,
  },
  {
    id: "software",
    url: "app.crestlineservices.com/jobs",
    live: "live",
    tone: "dark" as const,
  },
];

export function HeroProductDeck({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = () => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % PRODUCTS.length);
        setVisible(true);
      }, FADE_MS);
    };
    const id = window.setInterval(cycle, DISPLAY_MS + FADE_MS);
    return () => window.clearInterval(id);
  }, []);

  const active = PRODUCTS[index % PRODUCTS.length]!;

  return (
    <BrowserFrame tone={active.tone} url={active.url} live={active.live} className={className}>
      <div
        key={active.id}
        className={cn(
          BODY_HEIGHT,
          "overflow-hidden transition-all duration-[380ms] ease-out",
          visible ? "opacity-100 blur-0" : "opacity-0 blur-[3px]",
        )}
      >
        {active.id === "website" && <HeroWebsite />}
        {active.id === "software" && <HeroSoftware />}
      </div>
    </BrowserFrame>
  );
}
