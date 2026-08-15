import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { WhyUs } from "@/components/site/WhyUs";

const title = "Why Startup Setup";
const description = "Built for your business, not a template — why teams choose Startup Setup.";
const siteUrl = "https://startupsetup.in/why-us";

export const Route = createFileRoute("/why-us")({
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
  component: WhyUsPage,
});

function WhyUsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <main>
        <WhyUs />
      </main>
    </div>
  );
}
