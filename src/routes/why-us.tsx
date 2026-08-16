import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { WhyUs } from "@/components/site/WhyUs";

const title = "Why Startup Setup";
const description = "Built for your business, not a template. Why teams choose Startup Setup.";
const siteUrl = "https://startupsetup.in/why-us/";
const ogImage = "https://startupsetup.in/og-image.png";

export const Route = createFileRoute("/why-us")({
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
  component: WhyUsPage,
});

function WhyUsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <main>
        <WhyUs headingLevel="h1" />
      </main>
    </div>
  );
}
