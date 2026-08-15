import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { WhatWeBuild } from "@/components/site/WhatWeBuild";

const title = "Services | Startup Setup";
const description =
  "Custom business websites and custom software, with automation and AI built in — from Startup Setup, a digital product studio.";
const siteUrl = "https://startupsetup.in/services/";
const ogImage = "https://startupsetup.in/og-image.png";

export const Route = createFileRoute("/services")({
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
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <main>
        <WhatWeBuild headingLevel="h1" />
      </main>
    </div>
  );
}
