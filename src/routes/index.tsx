import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { WhatWeBuild } from "@/components/site/WhatWeBuild";
import { SelectedWork } from "@/components/site/SelectedWork";
import { Process } from "@/components/site/Process";
import { WhyUs } from "@/components/site/WhyUs";
import { Pricing } from "@/components/site/Pricing";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";

const title = "Startup Setup — Custom Websites, Software & Digital Systems";
const description =
  "Startup Setup is a digital product studio building custom websites, business software, automation and AI-powered systems for growing businesses.";
const origin = "https://startupsetup.in";
const siteUrl = `${origin}/`;
const ogImage = `${origin}/og-image.png`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: siteUrl }],
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
        <Faq />
        <FinalCta />
      </main>
    </div>
  );
}
