import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Pricing } from "@/components/site/Pricing";

const title = "Pricing | Startup Setup";
const description = "Clear starting points for websites and custom software from Startup Setup.";
const siteUrl = "https://startupsetup.in/pricing";

export const Route = createFileRoute("/pricing")({
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
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <main>
        <Pricing />
      </main>
    </div>
  );
}
