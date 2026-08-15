import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { WhatWeBuild } from "@/components/site/WhatWeBuild";

const title = "Services | Startup Setup";
const description =
  "Custom business websites and custom software, with automation and AI built in — from Startup Setup, a digital product studio.";
const siteUrl = "https://startupsetup.in/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <main>
        <WhatWeBuild />
      </main>
    </div>
  );
}
