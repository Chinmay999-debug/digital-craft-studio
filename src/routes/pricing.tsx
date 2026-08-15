import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Pricing } from "@/components/site/Pricing";

const title = "Pricing | Startup Setup";
const description = "Clear starting points for websites and custom software from Startup Setup.";
const siteUrl = "https://startupsetup.in/pricing";
const ogImage = "https://startupsetup.in/og-image.png";

export const Route = createFileRoute("/pricing")({
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
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <main>
        <Pricing headingLevel="h1" />
      </main>
    </div>
  );
}
