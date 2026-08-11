import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { WhatWeBuild } from "@/components/site/WhatWeBuild";
import { SelectedWork } from "@/components/site/SelectedWork";
import { Process } from "@/components/site/Process";
import { WhyUs } from "@/components/site/WhyUs";
import { Pricing, Proof } from "@/components/site/Pricing";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";

const title = "Startup Setup — Custom websites & business software studio";
const description =
  "Startup Setup is a digital product studio building custom business websites, CRMs, dashboards and automation for companies that need better digital infrastructure.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <main>
        <Hero />
        <WhatWeBuild />
        <SelectedWork />
        <Process />
        <WhyUs />
        <Pricing />
        <Proof />
        <Faq />
        <FinalCta />
      </main>
    </div>
  );
}
